import React from 'react';
import { Coins, Zap, CheckCircle2 } from 'lucide-react';

export const EconomicsComparison: React.FC = () => {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md mb-8">
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          Dual Economic Layers. Zero Subscriptions.
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400">
          Understanding the difference between peer SkillCredits and Algorand TestNet x402 micropayments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Layer 1: SkillCredits */}
        <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-zinc-950 text-white border border-zinc-700">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                Layer 01 &bull; Community Economy
              </span>
              <h4 className="text-lg font-bold text-white">SkillCredits</h4>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Non-monetary reputation points earned through positive actions inside the ecosystem. Used for peer reviews, mentorship escrow, and community bounties.
          </p>

          <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs text-zinc-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span>Earned by reviewing code & mentoring peers</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span>Free to earn through effort & contributions</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0" />
              <span>Locked to internal platform value exchange</span>
            </div>
          </div>
        </div>

        {/* Layer 2: x402 Micropayments */}
        <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-zinc-950 text-amber-400 border border-zinc-700">
              <Zap className="w-5 h-5 fill-amber-400/20" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                Layer 02 &bull; Compute & Inference
              </span>
              <h4 className="text-lg font-bold text-white">x402 via Algorand</h4>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Internet-native micropayments settling directly on Algorand through GoPlausible Facilitator. Enables pay-per-use access to specialized AI agents and deep career intelligence with zero subscription lock-in.
          </p>

          <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs text-zinc-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Sub-second settlement verified on LoRA TestNet</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Fractional micro-pricing (₹2 - ₹5 equivalent)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>No recurring credit card charges or commitments</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EconomicsComparison;
