import React from 'react';
import { Target, Sparkles, TrendingUp, Unlock, Zap, Layers } from 'lucide-react';
import { OpportunityStats } from '../../types/api';

interface OpportunityHeroProps {
  stats: OpportunityStats;
  userName?: string;
}

export const OpportunityHero: React.FC<OpportunityHeroProps> = ({ stats, userName }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80 pt-10 pb-12">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 w-[400px] h-[250px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>AI Opportunity Matching Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Unlock Your Next{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Opportunity.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            BharatSkill Nexus analyzes your skills, growth journey, and career goals to surface opportunities built for your potential.
          </p>
        </div>

        {/* Dynamic Metric Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Card 1: Total Available */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shadow-lg backdrop-blur-sm">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {stats.totalOpportunities}
              </div>
              <div className="text-xs text-slate-400 font-medium">Opportunities Available</div>
            </div>
          </div>

          {/* Card 2: Best Match */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shadow-lg backdrop-blur-sm">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {stats.bestMatchScore}%
              </div>
              <div className="text-xs text-slate-400 font-medium">Top Match Fit</div>
            </div>
          </div>

          {/* Card 3: Unlocked Count */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shadow-lg backdrop-blur-sm">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Unlock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                {stats.unlockedCount}
              </div>
              <div className="text-xs text-slate-400 font-medium">Opportunities Unlocked</div>
            </div>
          </div>

          {/* Card 4: Top Skills In Demand */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shadow-lg backdrop-blur-sm">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                In-Demand Skills
              </div>
              <div className="flex items-center space-x-1 overflow-x-auto text-[11px] text-slate-300 font-mono truncate">
                {stats.topInDemandSkills.slice(0, 3).join(', ')}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OpportunityHero;
