import fs from 'fs';
import path from 'path';
import { UserProfile } from './userService.js';
import { getAnalysisByUserId, AgentAnalysisReport } from './agentAnalysisService.js';

const getOpportunitiesFilePath = (): string => {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'server', 'data', 'opportunities.json'))) {
    return path.join(cwd, 'server', 'data', 'opportunities.json');
  }
  if (fs.existsSync(path.join(cwd, 'data', 'opportunities.json'))) {
    return path.join(cwd, 'data', 'opportunities.json');
  }
  return path.resolve(cwd, 'data', 'opportunities.json');
};

export interface OpportunityPrerequisites {
  requiredCount?: number;
  skills?: string[];
  phaseRequired?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: 'Hackathon' | 'Internship' | 'Open Source' | 'Bounty' | 'Fellowship' | string;
  description: string;
  fullDescription: string;
  requiredSkills: string[];
  preferredSkills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | string;
  location: string;
  deadline: string;
  stipendOrReward: string;
  spotsAvailable: number;
  featured: boolean;
  trending: boolean;
  unlockPrerequisites?: OpportunityPrerequisites;
}

export interface WhyThisMatch {
  strongMatches: string[];
  skillsToImprove: string[];
  aiRecommendation: string;
  scoreBreakdown: {
    skillMatchScore: number;
    goalAlignmentScore: number;
    interestFitScore: number;
    experienceScore: number;
  };
}

export interface OpportunityMatchResult extends Opportunity {
  matchPercentage: number;
  matchTier: 'Elite Match' | 'Strong Match' | 'Good Match' | 'Developing Fit';
  isLocked: boolean;
  unlockCondition?: string;
  skillsAway: number;
  whyThisMatch: WhyThisMatch;
}

/**
 * Read all base opportunities
 */
export function readOpportunities(): Opportunity[] {
  const filePath = getOpportunitiesFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw) as Opportunity[];
    }
  } catch (error) {
    console.error('Error reading opportunities.json:', error);
  }
  return [];
}

/**
 * Get opportunity by ID
 */
export function getOpportunityById(id: string): Opportunity | null {
  const opps = readOpportunities();
  return opps.find(o => o.id === id) || null;
}

/**
 * Deterministic AI Matching Algorithm
 */
export function calculateMatchForOpportunity(
  opp: Opportunity,
  profile: UserProfile,
  analysis?: AgentAnalysisReport | null
): OpportunityMatchResult {
  const userSkillsLower = new Set((profile.skills || []).map(s => s.toLowerCase().trim()));
  const userInterestsLower = new Set((profile.interests || []).map(i => i.toLowerCase().trim()));
  const userGoal = (profile.careerGoal || '').toLowerCase();
  const userLevel = (profile.experienceLevel || 'Intermediate').toLowerCase();

  // 1. Skill Match Calculation (0 - 45 pts)
  const strongMatches: string[] = [];
  const skillsToImprove: string[] = [];

  let matchedReqCount = 0;
  opp.requiredSkills.forEach(skill => {
    if (userSkillsLower.has(skill.toLowerCase())) {
      matchedReqCount++;
      strongMatches.push(skill);
    } else {
      skillsToImprove.push(skill);
    }
  });

  let matchedPrefCount = 0;
  opp.preferredSkills.forEach(skill => {
    if (userSkillsLower.has(skill.toLowerCase())) {
      matchedPrefCount++;
      if (!strongMatches.includes(skill)) {
        strongMatches.push(skill);
      }
    }
  });

  const reqRatio = opp.requiredSkills.length > 0 ? matchedReqCount / opp.requiredSkills.length : 1;
  const prefBonus = opp.preferredSkills.length > 0 ? (matchedPrefCount / opp.preferredSkills.length) * 10 : 5;
  const skillMatchScore = Math.round(reqRatio * 35 + prefBonus);

  // 2. Goal Alignment Score (0 - 20 pts)
  let goalAlignmentScore = 8;
  const cat = opp.category.toLowerCase();
  if (userGoal.includes('intern') && cat.includes('intern')) goalAlignmentScore = 20;
  else if (userGoal.includes('project') && (cat.includes('hackathon') || cat.includes('bounty'))) goalAlignmentScore = 20;
  else if (userGoal.includes('job') && (cat.includes('intern') || cat.includes('fellowship'))) goalAlignmentScore = 19;
  else if (userGoal.includes('freelance') && (cat.includes('bounty') || cat.includes('open source'))) goalAlignmentScore = 20;
  else if (userGoal.includes('learn') && (cat.includes('open source') || cat.includes('fellowship'))) goalAlignmentScore = 19;
  else if (userGoal.includes('explore')) goalAlignmentScore = 16;
  else goalAlignmentScore = 12;

  // 3. Interest Fit Score (0 - 15 pts)
  let interestFitScore = 5;
  const oppDomainText = `${opp.title} ${opp.category} ${opp.description} ${opp.requiredSkills.join(' ')}`.toLowerCase();
  userInterestsLower.forEach(interest => {
    if (oppDomainText.includes(interest.replace('development', '').trim())) {
      interestFitScore = Math.min(15, interestFitScore + 5);
    }
  });

  // 4. Experience Compatibility Score (0 - 10 pts)
  let experienceScore = 7;
  const oppLevel = opp.experienceLevel.toLowerCase();
  if (oppLevel.includes('all') || oppLevel === userLevel) {
    experienceScore = 10;
  } else if (userLevel === 'advanced') {
    experienceScore = 10;
  } else if (userLevel === 'intermediate' && oppLevel === 'beginner') {
    experienceScore = 10;
  } else if (userLevel === 'beginner' && oppLevel === 'advanced') {
    experienceScore = 4;
  } else {
    experienceScore = 7;
  }

  // 5. Readiness Factor from Analysis (0 - 10 pts)
  let readinessBonus = 6;
  if (analysis?.readinessScore) {
    readinessBonus = Math.round((analysis.readinessScore / 100) * 10);
  } else if (profile.profileStrength) {
    readinessBonus = Math.round((profile.profileStrength / 100) * 8);
  }

  // Calculate Total Raw Match Score (0 - 100%)
  let totalScore = skillMatchScore + goalAlignmentScore + interestFitScore + experienceScore + readinessBonus;

  // Penalize heavily if missing multiple core mandatory skills
  if (skillsToImprove.length >= 3) {
    totalScore -= 8;
  }

  const matchPercentage = Math.min(97, Math.max(30, Math.round(totalScore)));

  // Match Tier Label
  let matchTier: 'Elite Match' | 'Strong Match' | 'Good Match' | 'Developing Fit' = 'Developing Fit';
  if (matchPercentage >= 88) matchTier = 'Elite Match';
  else if (matchPercentage >= 75) matchTier = 'Strong Match';
  else if (matchPercentage >= 60) matchTier = 'Good Match';
  else matchTier = 'Developing Fit';

  // Lock / Unlock Logic
  const skillsAway = skillsToImprove.length;
  let isLocked = false;
  let unlockCondition = '';

  if (opp.unlockPrerequisites) {
    const minRequired = opp.unlockPrerequisites.requiredCount || 2;
    if (matchedReqCount < minRequired && matchPercentage < 65) {
      isLocked = true;
      const missingPrereq = opp.unlockPrerequisites.skills?.find(s => !userSkillsLower.has(s.toLowerCase())) || skillsToImprove[0] || 'core skills';
      unlockCondition = `Master ${missingPrereq} or advance to ${opp.unlockPrerequisites.phaseRequired || 'Phase 2'} in your roadmap`;
    }
  } else if (matchPercentage < 55 && skillsAway >= 2) {
    isLocked = true;
    unlockCondition = `Add ${skillsToImprove[0] || 'relevant skills'} to unlock this opportunity`;
  }

  // AI Recommendation Text Generation
  let aiRecommendation = '';
  if (strongMatches.length >= 3) {
    aiRecommendation = `Your verified strengths in ${strongMatches.slice(0, 2).join(' and ')} give you a competitive edge. Apply early to secure an interview.`;
  } else if (skillsToImprove.length > 0) {
    aiRecommendation = `Acquiring ${skillsToImprove[0]} through your Phase 1 roadmap will boost your match score to ${Math.min(98, matchPercentage + 14)}%.`;
  } else {
    aiRecommendation = `Highly aligned with your ${profile.careerGoal} goal. Review project portfolio requirements before applying.`;
  }

  return {
    ...opp,
    matchPercentage,
    matchTier,
    isLocked,
    unlockCondition: isLocked ? unlockCondition : undefined,
    skillsAway,
    whyThisMatch: {
      strongMatches: strongMatches.length > 0 ? strongMatches : [profile.skills[0] || 'General Aptitude'],
      skillsToImprove: skillsToImprove.slice(0, 3),
      aiRecommendation,
      scoreBreakdown: {
        skillMatchScore,
        goalAlignmentScore,
        interestFitScore,
        experienceScore,
      }
    }
  };
}

/**
 * Get all opportunities matched and ranked for a user
 */
export function getMatchedOpportunities(profile: UserProfile): OpportunityMatchResult[] {
  const allOpps = readOpportunities();
  const analysis = profile.id ? getAnalysisByUserId(profile.id) : null;

  const matched = allOpps.map(opp => calculateMatchForOpportunity(opp, profile, analysis));

  // Sort by matchPercentage descending
  return matched.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
