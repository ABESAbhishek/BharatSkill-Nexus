export interface HealthResponse {
  status: 'success' | 'error';
  message: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  education: string;
  skills: string[];
  interests: string[];
  careerGoal: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  learningPreference: string;
  profileStrength: number;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingFormData {
  name: string;
  email: string;
  location: string;
  education: string;
  skills: string[];
  interests: string[];
  careerGoal: string;
  experienceLevel: string;
  learningPreference: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  actions: string[];
}

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

export interface OpportunityStats {
  totalOpportunities: number;
  bestMatchScore: number;
  unlockedCount: number;
  topInDemandSkills: string[];
}

export interface OpportunityMatchResponse {
  status: 'success' | 'error';
  stats: OpportunityStats;
  data: OpportunityMatchResult[];
}

export interface OpportunityFilterState {
  searchQuery: string;
  category: string;
  minMatchScore: number;
  experienceLevel: string;
  location: string;
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
  opportunityMatches: OpportunityMatchResult[] | any[];
  analyzedAt: string;
}

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
  activeDaysThisWeek: boolean[];
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

export interface AgentServiceItem {
  id: string;
  title: string;
  iconName: string;
  category: string;
  description: string;
  priceInr: number;
  priceAlgo: string;
  executionTime: string;
  features: string[];
  samplePrompt: string;
}

export interface PaymentTransaction {
  id: string;
  serviceId: string;
  serviceTitle: string;
  amountInr: number;
  amountAlgo: string;
  protocol: string;
  network: string;
  status: 'settled' | 'pending' | 'failed';
  txHash: string;
  blockRound?: number;
  facilitator?: string;
  loraExplorerUrl: string;
  timestamp: string;
  userId?: string;
}

export interface X402PaymentRequest {
  serviceId: string;
  userId?: string;
  profile?: UserProfile;
  mode?: 'demo' | 'testnet';
  providedTxId?: string;
}

export interface PremiumReportResult {
  serviceId: string;
  serviceTitle: string;
  generatedAt: string;
  executiveBriefing: string;
  keyInsights: {
    heading: string;
    detail: string;
  }[];
  strategicChecklist: string[];
  competitiveEdgeRating: string;
  estimatedStipendRange: string;
  txHash?: string;
  loraExplorerUrl?: string;
}

export interface SkillExchangeItem {
  id: string;
  type: 'offer' | 'request';
  title: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  rate: number;
  rateUnit: string;
  rating: number;
  reviewsCount: number;
  description: string;
  availability: string;
  sessionDuration: string;
  createdAt?: string;
}

export interface BookingReceipt {
  bookingId: string;
  exchangeId: string;
  exchangeTitle: string;
  mentorName: string;
  learnerName: string;
  creditsEscrowed: number;
  sessionTime: string;
  status: 'escrow_locked' | 'completed';
  meetingLink: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  transaction?: PaymentTransaction;
  result?: PremiumReportResult;
  receipt?: BookingReceipt;
  stats?: any;
  count?: number;
}
