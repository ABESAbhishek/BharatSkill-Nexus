import React from 'react';
import { Link } from 'react-router-dom';
import { Map, CheckCircle2, Circle, ArrowRight, Sparkles } from 'lucide-react';
import { RoadmapPhase } from '../../types/api';

interface RoadmapProgressCardProps {
  phases: RoadmapPhase[];
}

export const RoadmapProgressCard: React.FC<RoadmapProgressCardProps> = ({ phases }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Map className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">4-Phase Growth Roadmap</h3>
              <span className="text-[11px] text-slate-400">Milestone progression</span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold">
            Phase 1 Active
          </span>
        </div>

        {/* 4 Phases List */}
        <div className="space-y-3 mb-4">
          {phases.map((phase, index) => {
            const isCompleted = index === 0 && false; // First phase is currently active
            const isActive = index === 0;

            return (
              <div
                key={phase.phase}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-slate-950 border-cyan-500/40 shadow-md shadow-cyan-500/5'
                    : 'bg-slate-950/50 border-slate-800/80 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isActive ? (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      </div>
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-600" />
                    )}
                    <span className="text-xs font-bold text-white">
                      {phase.phase}: {phase.title}
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-cyan-500/15 text-cyan-300 font-bold' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {isActive ? 'In Progress' : 'Queued'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 pl-5.5 leading-snug line-clamp-1">
                  {phase.actions[0] || phase.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-slate-800">
        <Link
          to="/analysis"
          className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
        >
          <span>Continue Roadmap Phases</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </Link>
      </div>
    </div>
  );
};

export default RoadmapProgressCard;
