import { getUserById, UserProfile } from './userService.js';
import { getAnalysisByUserId, analyzeUserProfile, AgentAnalysisReport } from './agentAnalysisService.js';
import { getMatchedOpportunities, OpportunityMatchResult } from './opportunityService.js';

export interface NextBestAction {
  title: string;
  category: 'Skill Gap' | 'Project Build' | 'Peer Exchange' | 'Opportunity Apply';
  description: string;
  rationale: string;
  expectedReadinessGain: string;
  skillsImpacted: string[];
  estimatedEffort: string;
  targetRoute: string;
  ctaText: string;
}

export interface SkillCreditActivity {
  id: string;
  title: string;
  category: 'Contribution' | 'Peer Review' | 'Milestone' | 'Mentorship';
  amount: number;
  type: 'earned' | 'spent';
  timestamp: string;
}

export interface GrowthStreak {
  currentStreakDays: number;
  bestStreakDays: number;
  activeDaysThisWeek: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  lastActiveDate: string;
}

export interface SmartNotification {
  id: string;
  type: 'match' | 'gap' | 'credit' | 'system';
  title: string;
  message: string;
  route?: string;
  createdAt: string;
}

export interface JourneyMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
  date?: string;
}

export interface DashboardData {
  user: UserProfile;
  analysis: AgentAnalysisReport;
  stats: {
    skillsMappedCount: number;
    readinessScore: number;
    readinessLabel: string;
    skillCreditsBalance: number;
    unlockedOpportunitiesCount: number;
    totalOpportunitiesCount: number;
  };
  nextBestAction: NextBestAction;
  topOpportunities: OpportunityMatchResult[];
  skillCreditsHistory: SkillCreditActivity[];
  growthStreak: GrowthStreak;
  smartNotifications: SmartNotification[];
  journeyMilestones: JourneyMilestone[];
  communityActivities: {
    id: string;
    author: string;
    action: string;
    domain: string;
    timeAgo: string;
    avatarInitials: string;
  }[];
}

/**
 * Generate deterministic Next Best Action based on user profile and gaps
 */
export function generateNextBestAction(
  profile: UserProfile,
  analysis: AgentAnalysisReport,
  matchedOpps: OpportunityMatchResult[]
): NextBestAction {
  const topGap = analysis.recommendedSkills?.[0] || 'Node.js';
  const secondGap = analysis.recommendedSkills?.[1] || 'REST APIs';
  const readiness = analysis.readinessScore || 75;

  // Check if any high-tier opportunity is 1 skill away
  const lockedOpp = matchedOpps.find(o => o.isLocked && o.skillsAway <= 2);

  if (lockedOpp) {
    return {
      title: `Master ${lockedOpp.unlockPrerequisites?.skills?.[0] || topGap} to Unlock ${lockedOpp.title}`,
      category: 'Skill Gap',
      description: `You are only 1 key prerequisite away from qualifying for ${lockedOpp.organization}'s opportunity with a ${Math.min(96, lockedOpp.matchPercentage + 18)}% match score.`,
      rationale: `Completing this target skill closes a primary gap diagnosed in your candidate graph.`,
      expectedReadinessGain: `${readiness}% → ${Math.min(98, readiness + 9)}% (+9%)`,
      skillsImpacted: [topGap, secondGap],
      estimatedEffort: '~3-4 Days',
      targetRoute: '/analysis',
      ctaText: 'View Skill Gap Roadmap'
    };
  }

  if (readiness < 70) {
    return {
      title: `Complete Phase 01: ${analysis.growthRoadmap?.[0]?.title || 'Foundation Milestones'}`,
      category: 'Project Build',
      description: `Solidify core principles and build your initial milestone checklist to elevate your profile from ${analysis.readinessLabel} to Opportunity Ready.`,
      rationale: `Foundational mastery significantly boosts matching weight across all hackathon and internship algorithms.`,
      expectedReadinessGain: `${readiness}% → ${Math.min(98, readiness + 12)}% (+12%)`,
      skillsImpacted: [profile.skills[0] || 'Core Language', topGap],
      estimatedEffort: '~5 Days',
      targetRoute: '/analysis',
      ctaText: 'Resume Phase 1 Actions'
    };
  }

  // If high readiness, recommend applying to top match
  const topMatch = matchedOpps[0];
  if (topMatch && topMatch.matchPercentage >= 75) {
    return {
      title: `Submit Prepared Application to ${topMatch.title}`,
      category: 'Opportunity Apply',
      description: `Your verified profile has a strong ${topMatch.matchPercentage}% fit score with ${topMatch.organization}. Prepare your portfolio and submit today.`,
      rationale: `Early verified applicants have 3.2x higher interview conversion rates in community hackathons and internships.`,
      expectedReadinessGain: `${readiness}% → ${Math.min(99, readiness + 5)}% (+5%)`,
      skillsImpacted: topMatch.whyThisMatch.strongMatches.slice(0, 3),
      estimatedEffort: '~30 Mins',
      targetRoute: '/opportunities',
      ctaText: 'Prepare to Apply Now'
    };
  }

  // Default next best move
  return {
    title: `Build a Full-Stack Project with ${topGap}`,
    category: 'Project Build',
    description: `Your current profile has strong foundations. Building a standalone prototype with ${topGap} and ${secondGap} will prove hands-on proficiency.`,
    rationale: `Hands-on proof of work is the highest weighted factor across all technical evaluations.`,
    expectedReadinessGain: `${readiness}% → ${Math.min(98, readiness + 8)}% (+8%)`,
    skillsImpacted: [topGap, secondGap],
    estimatedEffort: '~3-4 Days',
    targetRoute: '/analysis',
    ctaText: 'Start Growth Task'
  };
}

/**
 * Consolidate full dashboard payload
 */
export function getUnifiedDashboardData(userId?: string, profileInput?: UserProfile): DashboardData {
  let profile: UserProfile | null = null;
  if (userId) {
    profile = getUserById(userId);
  }

  if (!profile && profileInput) {
    profile = profileInput;
  }

  // Fallback demo user
  if (!profile) {
    profile = {
      id: 'usr_aarav',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.edu',
      location: 'Bengaluru, India',
      education: 'B.Tech in Computer Science',
      skills: ['Python', 'React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Git/GitHub', 'REST APIs', 'Problem Solving'],
      interests: ['Artificial Intelligence', 'Web Development'],
      careerGoal: 'Get an Internship',
      experienceLevel: 'Intermediate',
      learningPreference: 'Build Projects',
      profileStrength: 92,
      createdAt: '2026-09-01T10:00:00.000Z',
      updatedAt: '2026-09-01T10:00:00.000Z'
    };
  }

  // Get or compute agent analysis
  let analysis = profile.id ? getAnalysisByUserId(profile.id) : null;
  if (!analysis) {
    analysis = analyzeUserProfile(profile);
  }

  // Get matched opportunities
  const matchedOpps = getMatchedOpportunities(profile);
  const unlockedCount = matchedOpps.filter(o => !o.isLocked).length;

  // Generate Next Best Action
  const nextBestAction = generateNextBestAction(profile, analysis, matchedOpps);

  // SkillCredits History
  const skillCreditsHistory: SkillCreditActivity[] = [
    {
      id: 'tx_1',
      title: 'Submitted Verified Opportunity Application',
      category: 'Contribution',
      amount: 25,
      type: 'earned',
      timestamp: 'Today'
    },
    {
      id: 'tx_2',
      title: 'Peer Review on React & Tailwind Component',
      category: 'Peer Review',
      amount: 30,
      type: 'earned',
      timestamp: 'Yesterday'
    },
    {
      id: 'tx_3',
      title: 'Completed Phase 01: Foundation Diagnostic',
      category: 'Milestone',
      amount: 50,
      type: 'earned',
      timestamp: '2 days ago'
    },
    {
      id: 'tx_4',
      title: 'Claimed 1-on-1 Mentorship Session with Senior Peer',
      category: 'Mentorship',
      amount: 15,
      type: 'spent',
      timestamp: '3 days ago'
    }
  ];

  // Growth Streak
  const growthStreak: GrowthStreak = {
    currentStreakDays: 4,
    bestStreakDays: 12,
    activeDaysThisWeek: [true, true, true, true, false, false, false], // Mon - Thu active
    lastActiveDate: new Date().toISOString().split('T')[0]
  };

  // Smart Notifications
  const smartNotifications: SmartNotification[] = [
    {
      id: 'notif_1',
      type: 'match',
      title: 'High Opportunity Fit',
      message: `You have an 86% match with ${matchedOpps[0]?.title || 'Full-Stack Frontend Developer Intern'}.`,
      route: '/opportunities',
      createdAt: '1 hour ago'
    },
    {
      id: 'notif_2',
      type: 'gap',
      title: 'Skill Gap Milestone',
      message: `Mastering ${analysis.recommendedSkills[0] || 'Node.js'} will unlock 3 additional ecosystem bounties.`,
      route: '/analysis',
      createdAt: '3 hours ago'
    },
    {
      id: 'notif_3',
      type: 'credit',
      title: 'Credits Received',
      message: 'You earned +25 SkillCredits from your recent platform activity.',
      route: '/skill-exchange',
      createdAt: 'Yesterday'
    }
  ];

  // Journey Milestones
  const journeyMilestones: JourneyMilestone[] = [
    {
      id: 'm_1',
      title: 'Skill Identity Minted',
      description: 'Profile created and verified into candidate graph.',
      completed: true,
      active: false,
      date: 'Aug 30'
    },
    {
      id: 'm_2',
      title: 'Autonomous AI Diagnosis',
      description: `Identified strengths, growing areas, and ${analysis.readinessScore}% readiness score.`,
      completed: true,
      active: false,
      date: 'Aug 31'
    },
    {
      id: 'm_3',
      title: 'Roadmap Phase 01 Active',
      description: 'Engaging foundational skills and project build exercises.',
      completed: false,
      active: true,
      date: 'In Progress'
    },
    {
      id: 'm_4',
      title: 'Opportunity Unlocks & Bounties',
      description: 'Qualify for 100% unlocked catalog and submit capstone applications.',
      completed: false,
      active: false
    }
  ];

  // Community Activities
  const communityActivities = [
    {
      id: 'comm_1',
      author: 'Rahul Sharma',
      action: 'offered peer mentorship in',
      domain: 'Python & PyTeal',
      timeAgo: '10m ago',
      avatarInitials: 'RS'
    },
    {
      id: 'comm_2',
      author: 'Priya Patel',
      action: 'shared open-source project',
      domain: 'UI/UX Design Kit',
      timeAgo: '25m ago',
      avatarInitials: 'PP'
    },
    {
      id: 'comm_3',
      author: 'Karan Mehra',
      action: 'earned 50 SkillCredits for',
      domain: 'Smart Contract Escrow Audit',
      timeAgo: '1h ago',
      avatarInitials: 'KM'
    },
    {
      id: 'comm_4',
      author: 'Ananya Gupta',
      action: 'joined peer study group for',
      domain: 'Agentic AI Architecture',
      timeAgo: '2h ago',
      avatarInitials: 'AG'
    }
  ];

  return {
    user: profile,
    analysis,
    stats: {
      skillsMappedCount: profile.skills.length,
      readinessScore: analysis.readinessScore,
      readinessLabel: analysis.readinessLabel,
      skillCreditsBalance: 240,
      unlockedOpportunitiesCount: unlockedCount,
      totalOpportunitiesCount: matchedOpps.length
    },
    nextBestAction,
    topOpportunities: matchedOpps.slice(0, 3),
    skillCreditsHistory,
    growthStreak,
    smartNotifications,
    journeyMilestones,
    communityActivities
  };
}
