import fs from 'fs';
import path from 'path';
import { UserProfile, getUserById } from './userService.js';
import { verifyAndSettlePayment, X402VerificationResult } from './x402Service.js';

const getServicesFilePath = (): string => {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'server', 'data', 'services.json'))) {
    return path.join(cwd, 'server', 'data', 'services.json');
  }
  if (fs.existsSync(path.join(cwd, 'data', 'services.json'))) {
    return path.join(cwd, 'data', 'services.json');
  }
  return path.resolve(cwd, 'data', 'services.json');
};

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
  facilitator: string;
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

/**
 * Read all available premium agent services
 */
export function readServices(): AgentServiceItem[] {
  const filePath = getServicesFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw) as AgentServiceItem[];
    }
  } catch (error) {
    console.error('Error reading services.json:', error);
  }
  return [];
}

/**
 * Get single service by ID
 */
export function getServiceById(id: string): AgentServiceItem | null {
  const services = readServices();
  return services.find(s => s.id === id) || null;
}

/**
 * Process x402 payment settlement (Algorand TestNet / GoPlausible Facilitator)
 */
export async function processX402Payment(req: X402PaymentRequest): Promise<PaymentTransaction> {
  const service = getServiceById(req.serviceId);
  const title = service ? service.title : 'Agent Intelligence Service';
  const priceInr = service ? service.priceInr : 5;
  const priceAlgo = service ? service.priceAlgo : '0.10 ALGO';

  const mode = req.mode || 'demo';
  const verification = await verifyAndSettlePayment(req.serviceId, priceAlgo, mode, req.providedTxId);

  return {
    id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    serviceId: req.serviceId,
    serviceTitle: title,
    amountInr: priceInr,
    amountAlgo: priceAlgo,
    protocol: verification.protocol,
    network: verification.network,
    status: 'settled',
    txHash: verification.txId,
    blockRound: verification.blockRound,
    facilitator: verification.facilitator,
    loraExplorerUrl: verification.loraExplorerUrl,
    timestamp: verification.confirmedAt,
    userId: req.userId
  };
}

/**
 * Generate premium report for an unlocked service
 */
export function generatePremiumResult(serviceId: string, profileInput?: UserProfile, txData?: PaymentTransaction): PremiumReportResult {
  const service = getServiceById(serviceId);
  const title = service ? service.title : 'Deep Career Intelligence Report';

  const name = profileInput?.name || 'Candidate';
  const skills = profileInput?.skills?.join(', ') || 'React, Python, TypeScript';
  const goal = profileInput?.careerGoal || 'Internship';

  const txHash = txData?.txHash;
  const loraExplorerUrl = txData?.loraExplorerUrl;

  switch (serviceId) {
    case 'srv_opp_optimization':
      return {
        serviceId,
        serviceTitle: title,
        generatedAt: new Date().toISOString(),
        txHash,
        loraExplorerUrl,
        executiveBriefing: `Tailored pitch synthesis for ${name}. Your candidate profile ranks in the top 12% for full-stack and agentic hackathon challenges.`,
        keyInsights: [
          {
            heading: 'Custom Pitch Formulation',
            detail: `“Proven builder with verified competencies in ${skills}. Deployed full-stack applications with modular TypeScript architectures and autonomous agentic workflows.”`
          },
          {
            heading: 'Interview Simulation Edge',
            detail: 'Expect technical drill-downs on state management isolation, REST micro-escrow handling, and asynchronous event loops.'
          }
        ],
        strategicChecklist: [
          'Highlight GitHub repository stars and merged pull requests in initial application form',
          'Include 3-minute video walk-through demonstrating local component rendering',
          'Anchor application on problem-solving versatility rather than just tool familiarity'
        ],
        competitiveEdgeRating: '92nd Percentile',
        estimatedStipendRange: '₹30,000 - ₹45,000 / month'
      };

    case 'srv_adv_roadmap':
      return {
        serviceId,
        serviceTitle: title,
        generatedAt: new Date().toISOString(),
        txHash,
        loraExplorerUrl,
        executiveBriefing: `Specialized project repository blueprints for ${name} targeting ${goal} in modern software engineering.`,
        keyInsights: [
          {
            heading: 'Capstone Architecture: x402 Micro-Escrow Gateway',
            detail: 'Build an Express middleware intercepting HTTP 402 headers, validating testnet transactions, and issuing stateless JSON web tokens.'
          },
          {
            heading: 'Multi-Agent Skill Match Engine',
            detail: 'Construct vector embedding cosine similarity matching between candidate skills and live GitHub opportunity issues.'
          }
        ],
        strategicChecklist: [
          'Week 1-2: Implement Algorand testnet account creation & transaction broadcast scripts',
          'Week 3-4: Build React interactive frontend with real-time SSE payment verification stream',
          'Week 5-6: Write automated integration test suite with >80% coverage'
        ],
        competitiveEdgeRating: '95th Percentile',
        estimatedStipendRange: '₹35,000 - ₹50,000 / month'
      };

    case 'srv_instant_diagnostic':
      return {
        serviceId,
        serviceTitle: title,
        generatedAt: new Date().toISOString(),
        txHash,
        loraExplorerUrl,
        executiveBriefing: `Instant re-calibration complete for ${name}. Recalculated 14 opportunities with fresh weights.`,
        keyInsights: [
          {
            heading: 'Opportunity Readiness Recalibration',
            detail: 'Readiness index boosted to 84% following recent project graph verification.'
          },
          {
            heading: 'Unlocked Tier Status',
            detail: 'Unlocked 2 additional hackathon challenges in Web3 & Agentic AI domains.'
          }
        ],
        strategicChecklist: [
          'Apply immediately to AI Innovation Challenge to secure early submission review',
          'Share SkillCredits contribution badge on social profiles'
        ],
        competitiveEdgeRating: '88th Percentile',
        estimatedStipendRange: '₹25,000 - ₹35,000 / month'
      };

    case 'srv_deep_intelligence':
    default:
      return {
        serviceId,
        serviceTitle: title,
        generatedAt: new Date().toISOString(),
        txHash,
        loraExplorerUrl,
        executiveBriefing: `Deep multi-dimensional positioning analysis for ${name}. Verified strengths in ${skills} position you exceptionally well for high-growth tech ecosystems.`,
        keyInsights: [
          {
            heading: 'Competitive Domain Positioning',
            detail: 'Candidates with paired frontend (React/TypeScript) and AI foundation skills represent only 14% of applicants, granting significant leverage in hackathon team formation.'
          },
          {
            heading: 'Ecosystem Value Capture',
            detail: 'Transitioning from learning consumer to peer contributor increases hiring manager outreach by 4.1x.'
          }
        ],
        strategicChecklist: [
          'Publish 1 open-source component kit to BharatSkill community repository',
          'Complete 2 peer code reviews to achieve Community Contributor badge',
          'Deploy capstone project on live testnet environment'
        ],
        competitiveEdgeRating: '94th Percentile',
        estimatedStipendRange: '₹30,000 - ₹50,000 / month'
      };
  }
}
