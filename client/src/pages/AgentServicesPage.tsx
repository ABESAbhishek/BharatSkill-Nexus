import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sparkles, RefreshCw, Cpu, ShieldCheck, ArrowRight, Layers, Coins, ExternalLink } from 'lucide-react';
import { AgentServiceItem, PaymentTransaction, PremiumReportResult, UserProfile } from '../types/api';
import { fetchAgentServices } from '../services/api';
import PremiumServiceCard from '../components/payments/PremiumServiceCard';
import PaymentModal from '../components/payments/PaymentModal';
import AgenticCommerceVisualizer from '../components/payments/AgenticCommerceVisualizer';
import EconomicsComparison from '../components/payments/EconomicsComparison';
import TransactionHistoryTable from '../components/payments/TransactionHistoryTable';
import PremiumResultModal from '../components/payments/PremiumResultModal';

const UNLOCKED_KEY = 'bsn_unlocked_services';
const HISTORY_KEY = 'bsn_payment_history';

export const AgentServicesPage: React.FC = () => {
  const [services, setServices] = useState<AgentServiceItem[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mode Toggle: 'demo' | 'testnet'
  const [paymentMode, setPaymentMode] = useState<'demo' | 'testnet'>('demo');

  // Unlocked service IDs
  const [unlockedServiceIds, setUnlockedServiceIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(UNLOCKED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Transaction history
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Modal states
  const [selectedService, setSelectedService] = useState<AgentServiceItem | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [activeResult, setActiveResult] = useState<PremiumReportResult | null>(null);
  const [resultModalOpen, setResultModalOpen] = useState(false);

  useEffect(() => {
    // 1. Read profile from local storage
    const saved = localStorage.getItem('bsn_user_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing profile:', e);
      }
    }

    // 2. Fetch services catalog
    setIsLoading(true);
    fetchAgentServices()
      .then(res => {
        if (res.data) {
          setServices(res.data);
        }
      })
      .catch(err => console.error('Failed to load agent services:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleUnlockService = (service: AgentServiceItem) => {
    setSelectedService(service);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (transaction: PaymentTransaction, result: PremiumReportResult) => {
    // 1. Update unlocked IDs
    setUnlockedServiceIds(prev => {
      const updated = prev.includes(transaction.serviceId) ? prev : [...prev, transaction.serviceId];
      localStorage.setItem(UNLOCKED_KEY, JSON.stringify(updated));
      return updated;
    });

    // 2. Update transaction history
    setTransactions(prev => {
      const updated = [transaction, ...prev];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });

    // 3. Save result and open result modal
    setActiveResult(result);
    setPaymentModalOpen(false);
    setResultModalOpen(true);
  };

  const handleViewExistingReport = (service: AgentServiceItem) => {
    setSelectedService(service);
    const mockRes: PremiumReportResult = {
      serviceId: service.id,
      serviceTitle: service.title,
      generatedAt: new Date().toISOString(),
      executiveBriefing: `Unlocked strategic capability report for ${profile?.name || 'Candidate'}. Verified candidate graph synthesized via x402 settlement on Algorand TestNet.`,
      keyInsights: [
        {
          heading: 'Competitive Domain Positioning',
          detail: 'Verified competencies in modern web and agentic workflows position you in the 94th percentile of applicant pools.'
        },
        {
          heading: 'Algorand & AI Ecosystem Synergy',
          detail: 'Pairing smart contracts with multi-agent reasoning creates significant hackathon prize potential.'
        }
      ],
      strategicChecklist: [
        'Deploy testnet micro-escrow smart contract via GoPlausible facilitator',
        'Publish verified project demo to community GitHub',
        'Apply to priority hackathon sponsor tracks'
      ],
      competitiveEdgeRating: '94th Percentile',
      estimatedStipendRange: '₹30,000 - ₹50,000 / month',
      txHash: 'ALGORANDTESTNETSETTLED9999999999999999999999999999',
      loraExplorerUrl: 'https://lora.algokit.io/testnet'
    };
    setActiveResult(mockRes);
    setResultModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-black text-white min-h-screen">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
                <Zap className="w-3.5 h-3.5 fill-amber-400/20" />
                <span>GoPlausible Facilitator &bull; x402 on Algorand TestNet</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Power Your Growth With{' '}
                <span className="text-zinc-300">
                  Agent Intelligence.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Unlock specialized AI agent services through transparent, pay-per-use micropayments verified on LoRA Algorand TestNet.
              </p>
              
              <div className="pt-1 flex items-center space-x-3 text-xs text-zinc-500 font-mono">
                <span>Explorer:</span>
                <a 
                  href="https://lora.algokit.io/testnet" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 underline"
                >
                  <span>lora.algokit.io/testnet</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Mode Switch: Demo vs Testnet */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 flex items-center space-x-1.5 shadow-xl flex-shrink-0">
              <button
                onClick={() => setPaymentMode('demo')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  paymentMode === 'demo'
                    ? 'bg-white text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Demo Evaluation Mode
              </button>

              <button
                onClick={() => setPaymentMode('testnet')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  paymentMode === 'testnet'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Live TestNet Node
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-10">
        
        {/* 2. Services Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Premium Agent Catalog</h2>
              <p className="text-xs text-zinc-400">On-demand inference pricing settled via GoPlausible Facilitator</p>
            </div>
            <span className="text-xs text-amber-400 font-mono font-semibold">
              {unlockedServiceIds.length} of {services.length} Unlocked
            </span>
          </div>

          {isLoading ? (
            <div className="min-h-[30vh] flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-white animate-spin" />
              <p className="text-xs text-zinc-400 font-mono">Loading x402 Agent Catalog...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map(service => (
                <PremiumServiceCard
                  key={service.id}
                  service={service}
                  isUnlocked={unlockedServiceIds.includes(service.id)}
                  onUnlock={handleUnlockService}
                  onViewReport={handleViewExistingReport}
                />
              ))}
            </div>
          )}
        </div>

        {/* 3. Interactive Agentic Commerce Visualizer */}
        <AgenticCommerceVisualizer />

        {/* 4. SkillCredits vs x402 Payments Comparison */}
        <EconomicsComparison />

        {/* 5. Transaction History Table */}
        <TransactionHistoryTable transactions={transactions} />

      </div>

      {/* 6. Payment Execution Modal */}
      <PaymentModal
        service={selectedService}
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        userProfile={profile}
        mode={paymentMode}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 7. Premium Intelligence Report Modal */}
      <PremiumResultModal
        result={activeResult}
        isOpen={resultModalOpen}
        onClose={() => setResultModalOpen(false)}
      />

    </div>
  );
};

export default AgentServicesPage;
