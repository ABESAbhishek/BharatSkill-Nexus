import React from 'react';
import { Bot, Users, Coins, Zap, ShieldCheck } from 'lucide-react';

export const TechStrip: React.FC = () => {
  const badges = [
    { name: 'AI-Powered', icon: Bot, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { name: 'Peer Learning', icon: Users, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { name: 'Skill Economy', icon: Coins, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { name: 'x402 Payments', icon: Zap, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
    { name: 'Algorand', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  ];

  return (
    <section className="border-y border-slate-800/60 bg-slate-950/40 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold text-center md:text-left">
            Built for the next generation of talent
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.name}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${b.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{b.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStrip;
