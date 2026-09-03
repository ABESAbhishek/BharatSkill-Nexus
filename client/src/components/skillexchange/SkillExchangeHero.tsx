import React from 'react';
import { Users, Coins, Sparkles, CheckCircle2, Award, PlusCircle, HelpCircle } from 'lucide-react';

interface SkillExchangeHeroProps {
  onOpenCreateModal: (type: 'offer' | 'request') => void;
  totalListings: number;
}

export const SkillExchangeHero: React.FC<SkillExchangeHeroProps> = ({ onOpenCreateModal, totalListings }) => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800 pt-10 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono">
              <Coins className="w-3.5 h-3.5 fill-amber-400/20" />
              <span>Layer 01 &bull; SkillCredits Peer Economy</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Peer Skill Exchange &{' '}
              <span className="text-zinc-400">
                Collaborative Guilds.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Connect with fellow student builders for 1-on-1 pairing, code reviews, and problem-solving. Earn SkillCredits by teaching or spend credits to unlock mentorship.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenCreateModal('offer')}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-lg transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Offer Your Skill (Teach & Earn)</span>
              </button>

              <button
                onClick={() => onOpenCreateModal('request')}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Post Help Bounty (Get Mentored)</span>
              </button>
            </div>
          </div>

          {/* Right Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-96">
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400 text-xs font-mono">
                <Users className="w-3.5 h-3.5 text-white" />
                <span>Active Peers</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">142+</div>
              <span className="text-[10px] text-emerald-400 font-mono">Online in guilds</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400 text-xs font-mono">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>Credits Circulated</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">12,450</div>
              <span className="text-[10px] text-zinc-500 font-mono">SkillCredits</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sessions Done</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">890+</div>
              <span className="text-[10px] text-zinc-500 font-mono">Completed pairings</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400 text-xs font-mono">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reputation</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">4.9 / 5.0</div>
              <span className="text-[10px] text-zinc-500 font-mono">Peer satisfaction</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SkillExchangeHero;
