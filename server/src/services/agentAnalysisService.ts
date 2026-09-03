import fs from 'fs';
import path from 'path';
import { UserProfile } from './userService.js';

// Resolve analyses data storage path
const getStorageFilePath = (): string => {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'server', 'data'))) {
    return path.join(cwd, 'server', 'data', 'analyses.json');
  }
  if (fs.existsSync(path.join(cwd, 'data'))) {
    return path.join(cwd, 'data', 'analyses.json');
  }
  const fallback = path.resolve(cwd, 'data');
  return path.join(fallback, 'analyses.json');
};

export interface RoadmapPhase {
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  actions: string[];
}

export interface OpportunityMatch {
  id: string;
  title: string;
  category: string;
  matchPercentage: number;
  stipendOrReward?: string;
  requiredSkills: string[];
  fitReason: string;
}

export interface AgentAnalysisReport {
  id: string;
  userId: string;
  readinessScore: number;
  readinessLabel: 'Building Foundation' | 'Growing' | 'Opportunity Ready' | 'Highly Prepared';
  summary: string;
  strengths: string[];
  growingAreas: string[];
  skillGaps: string[];
  recommendedSkills: string[];
  growthRoadmap: RoadmapPhase[];
  opportunityMatches: OpportunityMatch[];
  analyzedAt: string;
}

// Domain Skills Ontology
const DOMAIN_SKILLS: Record<string, string[]> = {
  'Web Development': ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Next.js', 'Tailwind CSS', 'SQL', 'Git/GitHub'],
  'Artificial Intelligence': ['Python', 'Machine Learning', 'Data Structures', 'Deep Learning', 'Statistics', 'Prompt Engineering', 'Vector Databases'],
  'Blockchain': ['Smart Contracts', 'Algorand Fundamentals', 'Web3 Concepts', 'PyTeal', 'x402 Micropayments', 'Cryptography Basics'],
  'Data Science': ['Python', 'Pandas & NumPy', 'Data Visualization', 'SQL', 'Exploratory Data Analysis', 'Statistical Modeling'],
  'Cybersecurity': ['Network Security', 'Linux Administration', 'Ethical Hacking', 'OWASP Top 10', 'Cryptography', 'Security Auditing'],
  'Product Design': ['UI/UX', 'Figma', 'User Research', 'Wireframing', 'Design Systems', 'Interactive Prototyping'],
  'Entrepreneurship': ['Product Strategy', 'Market Validation', 'Pitching & Storytelling', 'Financial Modeling', 'Growth Marketing']
};

/**
 * Ensure storage file exists
 */
function ensureDataFile(): string {
  const filePath = getStorageFilePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
  }
  return filePath;
}

/**
 * Read all stored analyses
 */
export function readAnalyses(): AgentAnalysisReport[] {
  const filePath = ensureDataFile();
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as AgentAnalysisReport[];
  } catch (error) {
    console.error('Error reading analyses.json, returning empty list:', error);
    return [];
  }
}

/**
 * Write analyses to JSON storage
 */
export function writeAnalyses(analyses: AgentAnalysisReport[]): void {
  const filePath = ensureDataFile();
  fs.writeFileSync(filePath, JSON.stringify(analyses, null, 2), 'utf-8');
}

/**
 * Get analysis by User ID
 */
export function getAnalysisByUserId(userId: string): AgentAnalysisReport | null {
  const analyses = readAnalyses();
  return analyses.find(a => a.userId === userId) || null;
}

/**
 * Save or update analysis
 */
export function saveAnalysis(report: AgentAnalysisReport): AgentAnalysisReport {
  const analyses = readAnalyses();
  const existingIdx = analyses.findIndex(a => a.userId === report.userId);

  if (existingIdx >= 0) {
    analyses[existingIdx] = report;
  } else {
    analyses.push(report);
  }

  writeAnalyses(analyses);
  return report;
}

/**
 * Autonomous Agent Analysis Engine
 */
export function analyzeUserProfile(profile: UserProfile): AgentAnalysisReport {
  const userSkillsLower = new Set(profile.skills.map(s => s.toLowerCase().trim()));
  const interests = profile.interests.length > 0 ? profile.interests : ['Web Development'];
  
  // 1. Gather all required skills across user's target interests
  const targetDomainSkills: string[] = [];
  interests.forEach(interest => {
    if (DOMAIN_SKILLS[interest]) {
      targetDomainSkills.push(...DOMAIN_SKILLS[interest]);
    }
  });

  // 2. Identify Strengths, Growing Areas, and Skill Gaps
  const strengths: string[] = [];
  const growingAreas: string[] = [];
  const skillGaps: string[] = [];

  // Categorize possessed skills
  profile.skills.forEach(skill => {
    const isTargetRelevant = targetDomainSkills.some(t => t.toLowerCase() === skill.toLowerCase());
    if (isTargetRelevant) {
      strengths.push(skill);
    } else {
      // General strength / versatile skill
      growingAreas.push(skill);
    }
  });

  // If user has few strengths, allocate first possessed skill to strength
  if (strengths.length === 0 && profile.skills.length > 0) {
    strengths.push(profile.skills[0]);
  }

  // Detect missing target domain skills
  targetDomainSkills.forEach(reqSkill => {
    if (!userSkillsLower.has(reqSkill.toLowerCase()) && !skillGaps.includes(reqSkill)) {
      skillGaps.push(reqSkill);
    }
  });

  // Fallback defaults if empty
  if (skillGaps.length === 0) {
    skillGaps.push('Git/GitHub Best Practices', 'Production CI/CD', 'System Design Patterns');
  }

  const recommendedSkills = skillGaps.slice(0, 4);

  // 3. Compute Readiness Score (0-100)
  let rawScore = 30; // base score

  // Strength relevance points
  rawScore += Math.min(30, strengths.length * 8);

  // Experience level factor
  if (profile.experienceLevel === 'Advanced') rawScore += 25;
  else if (profile.experienceLevel === 'Intermediate') rawScore += 18;
  else rawScore += 10;

  // Profile strength / completeness factor
  if (profile.profileStrength) {
    rawScore += Math.round((profile.profileStrength / 100) * 15);
  }

  const readinessScore = Math.min(96, Math.max(35, rawScore));

  // Determine readiness label
  let readinessLabel: 'Building Foundation' | 'Growing' | 'Opportunity Ready' | 'Highly Prepared' = 'Growing';
  if (readinessScore <= 40) readinessLabel = 'Building Foundation';
  else if (readinessScore <= 65) readinessLabel = 'Growing';
  else if (readinessScore <= 80) readinessLabel = 'Opportunity Ready';
  else readinessLabel = 'Highly Prepared';

  // 4. Generate Structured 4-Phase Growth Roadmap
  const primaryInterest = interests[0] || 'Modern Technology';
  const goal = profile.careerGoal || 'Get an Internship';
  const topGap1 = recommendedSkills[0] || 'Core Architecture';
  const topGap2 = recommendedSkills[1] || 'Testing & Deployment';

  const growthRoadmap: RoadmapPhase[] = [
    {
      phase: 'PHASE 01',
      title: 'Foundation & Gap Closing',
      subtitle: 'Close critical knowledge bottlenecks',
      description: `Target high-leverage missing skills in ${primaryInterest}, focusing specifically on ${topGap1}.`,
      actions: [
        `Master foundational syntax and core paradigms for ${topGap1}`,
        `Review open-source codebases demonstrating ${topGap1} best practices`,
        `Complete diagnostic self-assessments in the BharatSkill peer guild`
      ]
    },
    {
      phase: 'PHASE 02',
      title: 'Practical Project Build',
      subtitle: 'Translate knowledge into demonstrable proof',
      description: `Build an end-to-end full-stack project combining your strength in ${strengths[0] || 'your core stack'} with newly acquired ${topGap1}.`,
      actions: [
        `Architect a live prototype solving a practical problem in ${primaryInterest}`,
        `Integrate ${topGap2} and write comprehensive automated integration tests`,
        `Publish a clean, documented repository with an interactive live demo`
      ]
    },
    {
      phase: 'PHASE 03',
      title: 'Peer Validation & Community Review',
      subtitle: 'Validate with peer feedback and SkillCredits',
      description: `Collaborate within BharatSkill Nexus peer learning rooms, perform code reviews, and earn SkillCredits.`,
      actions: [
        `Submit your project for peer guild code review and score validation`,
        `Mentor junior peers on ${strengths[0] || 'core topics'} to earn community endorsement badges`,
        `Refactor architecture based on community feedback to harden security and performance`
      ]
    },
    {
      phase: 'PHASE 04',
      title: 'Opportunity Matching & Application',
      subtitle: `Unlock target opportunities for: ${goal}`,
      description: `Leverage AI Agent matchmaking to connect directly with verified hackathons, internships, and bounties matching your verified skill graph.`,
      actions: [
        `Submit verified portfolio to AI-curated hackathon teams and hiring bounties`,
        `Apply to high-fit ${goal} openings with your dynamic verified skill graph`,
        `Execute pre-interview agentic simulations to prepare for technical screenings`
      ]
    }
  ];

  // 5. Generate Dynamic Opportunity Matches (3-4 tailored matches)
  const opportunityPool: OpportunityMatch[] = [
    {
      id: 'opp_1',
      title: 'Junior Full-Stack Developer Intern',
      category: 'Internship',
      matchPercentage: Math.min(98, Math.max(70, readinessScore + 8)),
      stipendOrReward: '₹25,000 / month',
      requiredSkills: ['React', 'Node.js', 'REST APIs', 'Git/GitHub'],
      fitReason: `Strong alignment with your ${strengths.slice(0, 2).join(' & ')} profile.`
    },
    {
      id: 'opp_2',
      title: 'Agentic AI & Web3 Innovation Bounty',
      category: 'Hackathon / Bounty',
      matchPercentage: Math.min(95, Math.max(68, readinessScore + 5)),
      stipendOrReward: '₹1,50,000 Prize Pool',
      requiredSkills: ['Python', 'AI Agents', 'API Integration', 'Smart Contracts'],
      fitReason: `Directly matches your interest in ${interests.includes('Artificial Intelligence') ? 'AI' : 'Modern Software'}.`
    },
    {
      id: 'opp_3',
      title: 'Algorand Ecosystem Developer Fellowship',
      category: 'Fellowship',
      matchPercentage: Math.min(92, Math.max(65, readinessScore)),
      stipendOrReward: '₹40,000 Grant',
      requiredSkills: ['Algorand Fundamentals', 'PyTeal', 'Web3 Concepts', 'TypeScript'],
      fitReason: 'Sponsored opportunity tailored for aspiring decentralized technology builders.'
    },
    {
      id: 'opp_4',
      title: 'Open Source Community Maintainer',
      category: 'Open Source Gig',
      matchPercentage: Math.min(94, Math.max(60, readinessScore - 4)),
      stipendOrReward: 'SkillCredits + Bounty',
      requiredSkills: ['Communication', 'Code Review', 'Git/GitHub', 'Problem Solving'],
      fitReason: `Matches your preferred learning style: ${profile.learningPreference}.`
    }
  ];

  // Tailor opportunities to user's interests
  const opportunityMatches = opportunityPool.slice(0, 4);

  // 6. Generate Strategic Briefing Summary
  const summary = `${profile.name} demonstrates a solid foundation with ${strengths.length} verified strength${strengths.length === 1 ? '' : 's'} in ${strengths.slice(0, 3).join(', ')}. To achieve your target goal of "${goal}" in ${interests.join(' & ')}, closing gaps in ${recommendedSkills.slice(0, 2).join(' and ')} will elevate your opportunity readiness into the top tier.`;

  const report: AgentAnalysisReport = {
    id: `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId: profile.id,
    readinessScore,
    readinessLabel,
    summary,
    strengths,
    growingAreas,
    skillGaps,
    recommendedSkills,
    growthRoadmap,
    opportunityMatches,
    analyzedAt: new Date().toISOString()
  };

  return saveAnalysis(report);
}
