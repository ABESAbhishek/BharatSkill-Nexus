import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, Coins, Unlock, ArrowUpRight } from 'lucide-react';
import { DashboardData } from '../../types/api';

interface DashboardStatsProps {
  stats: DashboardData['stats'];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      {/* Stat 1: Skill Identity */}
      <Link
        to="/profile"
        className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1">
          {stats.skillsMappedCount}
        </div>
        <div className="text-xs text-slate-400 font-medium">Skills Mapped &bull; Graph Active</div>
      </Link>

      {/* Stat 2: Opportunity Readiness */}
      <Link
        to="/analysis"
        className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 font-mono">
            {stats.readinessLabel}
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mb-1">
          {stats.readinessScore}%
        </div>
        <div className="text-xs text-slate-400 font-medium">Opportunity Readiness Score</div>
      </Link>

      {/* Stat 3: SkillCredits */}
      <Link
        to="/skill-exchange"
        className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
            <Coins className="w-5 h-5" />
          </div>
          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 font-mono">
            +55 this week
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono mb-1">
          {stats.skillCreditsBalance}
        </div>
        <div className="text-xs text-slate-400 font-medium">SkillCredits &bull; Peer Economy</div>
      </Link>

      {/* Stat 4: Opportunities Unlocked */}
      <Link
        to="/opportunities"
        className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
            <Unlock className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500 font-mono">
            of {stats.totalOpportunitiesCount} total
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mb-1">
          {stats.unlockedOpportunitiesCount}
        </div>
        <div className="text-xs text-slate-400 font-medium">Opportunities Unlocked</div>
      </Link>

    </div>
  );
};

export default DashboardStats;
