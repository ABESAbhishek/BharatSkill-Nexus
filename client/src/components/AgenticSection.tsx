import React from 'react';
import { 
  Bot, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Terminal,
  Check
} from 'lucide-react';

export const AgenticSection: React.FC = () => {
  const transactionSteps = [
    { label: 'User', sub: 'Action request', icon: Cpu, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'AI Agent Service', sub: 'Autonomous analysis', icon: Bot, color: 'text-cyan-400 bg-cyan-500/10' },
    { label: 'x402 Payment', sub: 'Micro-escrow token', icon: Zap, color: 'text-orange-400 bg-orange-500/10' },
    { label: 'Algorand Testnet', sub: 'Settlement protocol', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Result', sub: 'Verified output', icon: Check, color: 'text-purple-400 bg-purple-500/10' },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <span>Architecture & Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Intelligence That{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              Can Act.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            BharatSkill Nexus doesn't just recommend opportunities. Agentic AI can analyze your skill profile, identify gaps, and perform specialized actions for your growth journey.
          </p>
        </div>

        {/* 2 Highlighted Architecture Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          
          {/* Card 1: AI Agents */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-7 sm:p-8 relative overflow-hidden shadow-2xl backdrop-blur-sm group hover:border-cyan-500/40 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI Agents</h3>
                <span className="text-xs text-cyan-400 font-mono">Autonomous Execution Engine</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Autonomous agents analyze skills, opportunities, eligibility, and learning gaps. They simulate candidate evaluations and provide targeted optimization paths before you ever apply.
            </p>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Context-aware eligibility scoring across bounties & jobs</span>
              </div>
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Multi-step roadmap generation tailored to target roles</span>
              </div>
            </div>
          </div>

          {/* Card 2: x402 + Algorand */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-7 sm:p-8 relative overflow-hidden shadow-2xl backdrop-blur-sm group hover:border-orange-500/40 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/25 text-orange-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">x402 + Algorand</h3>
                <span className="text-xs text-orange-400 font-mono">Decentralized Value Rail</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Specialized agent services can be unlocked through instant micropayments using x402 on Algorand Testnet. Pay strictly per analysis with transparent, verifiable settlement.
            </p>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-friction HTTP-402 micropayments powered by @x402-avm</span>
              </div>
              <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Sub-second settlement on Algorand Testnet with ₹0 gas overhead</span>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Transaction Architecture Flow */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Architectural Execution Lifecycle
              </h4>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Planned Protocol Flow (Phase 2)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
            {transactionSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="relative flex flex-col justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                  <div className="flex flex-col items-center">
                    <div className={`p-2.5 rounded-xl mb-3 ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white mb-1">{step.label}</div>
                    <div className="text-[11px] text-slate-400">{step.sub}</div>
                  </div>
                  
                  {idx < transactionSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AgenticSection;
