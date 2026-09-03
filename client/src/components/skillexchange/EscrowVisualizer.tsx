import React from 'react';
import { Coins, Lock, CheckCircle2, Award, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export const EscrowVisualizer: React.FC = () => {
  const STEPS = [
    {
      num: '01',
      title: 'Peer Requests Session',
      desc: 'Learner selects a peer mentor and specifies their learning goal or code blocker.',
      icon: Users
    },
    {
      num: '02',
      title: 'Credits Locked in Escrow',
      desc: 'SkillCredits are deducted from the learner and held safely in platform escrow.',
      icon: Lock
    },
    {
      num: '03',
      title: '1-on-1 Pairing Conducted',
      desc: 'Mentor and learner meet live to debug code, explain concepts, and resolve blockers.',
      icon: CheckCircle2
    },
    {
      num: '04',
      title: 'Credits Released & Ranked',
      desc: 'Session verified, SkillCredits released to mentor, and reputation endorsements minted.',
      icon: Award
    }
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Escrow Protocol</span>
          </div>
          <h3 className="text-xl font-black text-white">
            How Peer SkillCredits Escrow Works
          </h3>
        </div>
        <span className="text-xs text-zinc-500 font-mono">
          Decentralized &bull; Non-monetary reputation exchange
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3 relative group hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white group-hover:text-amber-400 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-black text-zinc-600 font-mono">{s.num}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white mb-1">{s.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EscrowVisualizer;
