import React, { useState } from 'react';
import { Bot, Cpu, ShieldCheck, Zap, ArrowRight, Layers, Lock, Unlock, Database } from 'lucide-react';

export const AgenticCommerceVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const STAGES = [
    {
      id: 'agent_request',
      title: '1. Autonomous Agent Request',
      icon: Bot,
      shortLabel: 'Client Agent',
      color: 'border-white bg-zinc-900 text-white',
      description: 'Your browser or autonomous agent requests a high-compute intelligence report from the BharatSkill Resource Server.'
    },
    {
      id: 'http_402',
      title: '2. HTTP 402 Payment Required',
      icon: Lock,
      shortLabel: 'HTTP 402 Header',
      color: 'border-amber-400 bg-zinc-900 text-amber-400',
      description: 'The server returns an HTTP 402 header specifying the GoPlausible Facilitator endpoint and micro-pricing (0.10 ALGO).'
    },
    {
      id: 'algorand_settle',
      title: '3. Algorand TestNet Settlement',
      icon: Cpu,
      shortLabel: 'Algorand Rails',
      color: 'border-white bg-zinc-900 text-white',
      description: 'The agent signs and broadcasts a micro-ALGO transaction via GoPlausible. Algorand finalizes the block in ~2.8 seconds on LoRA TestNet.'
    },
    {
      id: 'state_proof',
      title: '4. LoRA Cryptographic Proof',
      icon: ShieldCheck,
      shortLabel: 'LoRA Explorer',
      color: 'border-cyan-400 bg-zinc-900 text-cyan-400',
      description: 'The transaction hash is verified on LoRA Algorand TestNet (https://lora.algokit.io/testnet) for cryptographic settlement proof.'
    },
    {
      id: 'ai_unlock',
      title: '5. AI Inference Delivery',
      icon: Unlock,
      shortLabel: 'Capability Unlocked',
      color: 'border-emerald-400 bg-zinc-900 text-emerald-400',
      description: 'The premium agentic report is generated, decrypted, and streamed back to the candidate with zero subscription overhead.'
    }
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5 fill-amber-400/20" />
            <span>GoPlausible &bull; x402 Architecture</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            How x402 + Algorand Micropayments Work
          </h3>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Click stages to inspect protocol mechanics
        </span>
      </div>

      {/* Interactive Visual Node Sequence */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isSelected = activeStep === idx;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 ${
                isSelected
                  ? `${stage.color} shadow-lg scale-102`
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <div className={`p-2.5 rounded-xl border ${isSelected ? stage.color : 'bg-zinc-950 border-zinc-800'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold block">{stage.shortLabel}</span>
                <span className="text-[10px] text-zinc-500 font-mono">Step 0{idx + 1}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Explanation Box */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 animate-fadeIn">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>{STAGES[activeStep].title}</span>
          </h4>
          <span className="text-[11px] text-amber-400 font-mono">Protocol Stage 0{activeStep + 1} of 05</span>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          {STAGES[activeStep].description}
        </p>
      </div>
    </div>
  );
};

export default AgenticCommerceVisualizer;
