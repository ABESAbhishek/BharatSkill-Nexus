import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ArrowRight, Award, Lock, Unlock, ArrowUpRight } from 'lucide-react';
import { OpportunityMatchResult } from '../../types/api';

interface OpportunityRadarCardProps {
  opportunities: OpportunityMatchResult[];
}

export const OpportunityRadarCard: React.FC<OpportunityRadarCardProps> = ({ opportunities }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Opportunity Radar</h3>
              <span className="text-[11px] text-slate-400">High-fit AI matches</span>
            </div>
          </div>

          <Link
            to="/opportunities"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center space-x-1"
          >
            <span>Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Opportunity Mini Cards */}
        <div className="space-y-3">
          {opportunities.slice(0, 3).map(opp => (
            <Link
              key={opp.id}
              to="/opportunities"
              className="group p-3.5 rounded-2xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all block"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="overflow-hidden">
                  <span className="text-[10px] text-cyan-400 font-semibold block uppercase tracking-wider">
                    {opp.organization} &bull; {opp.category}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {opp.title}
                  </h4>
                </div>

                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                    {opp.matchPercentage}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="text-amber-400 flex items-center space-x-1">
                  <Award className="w-3 h-3 flex-shrink-0" />
                  <span>{opp.stipendOrReward}</span>
                </span>

                <span className="flex items-center space-x-1 text-slate-500">
                  {opp.isLocked ? (
                    <span className="text-amber-400 flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <Unlock className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-5 border-t border-slate-800">
        <Link
          to="/opportunities"
          className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
        >
          <span>View All Matched Opportunities</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </Link>
      </div>
    </div>
  );
};

export default OpportunityRadarCard;
