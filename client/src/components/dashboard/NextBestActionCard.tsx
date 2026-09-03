import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, TrendingUp, Clock, Zap, Target } from 'lucide-react';
import { NextBestAction } from '../../types/api';

interface NextBestActionCardProps {
  action: NextBestAction;
}

export const NextBestActionCard: React.FC<NextBestActionCardProps> = ({ action }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-cyan-950/60 border border-cyan-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-md mb-8">
      {/* Glow accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Info Column */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              Deterministic Next Best Move &bull; {action.category}
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
              {action.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              {action.description}
            </p>
          </div>

          {/* Metrics Pill Grid */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Readiness: {action.expectedReadinessGain}</span>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Effort: {action.estimatedEffort}</span>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-xs font-medium">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Skills: {action.skillsImpacted.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Right CTA Column */}
        <div className="flex-shrink-0 flex flex-col justify-center">
          <button
            onClick={() => navigate(action.targetRoute || '/analysis')}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-xl shadow-blue-600/30 transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{action.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default NextBestActionCard;
