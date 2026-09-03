import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, Plus, Minus, ArrowRight, ArrowUpRight, History } from 'lucide-react';
import { SkillCreditActivity } from '../../types/api';

interface SkillCreditsCardProps {
  balance: number;
  history: SkillCreditActivity[];
}

export const SkillCreditsCard: React.FC<SkillCreditsCardProps> = ({ balance, history }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">SkillCredits Economy</h3>
              <span className="text-[11px] text-slate-400">Micro-incentive balance</span>
            </div>
          </div>

          <Link
            to="/skill-exchange"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center space-x-1"
          >
            <span>Exchange</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Balance Display Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950 border border-amber-500/20 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block mb-0.5">Available Balance</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono flex items-center space-x-1.5">
              <span>{balance}</span>
              <span className="text-xs text-slate-400 font-normal">Credits</span>
            </div>
          </div>

          <div className="text-right">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] font-mono font-bold">
              Ready for P2P Escrow
            </span>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center space-x-1">
            <History className="w-3 h-3" />
            <span>Recent Activity</span>
          </span>

          {history.slice(0, 3).map(tx => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
            >
              <div className="overflow-hidden pr-2">
                <span className="text-slate-200 font-medium truncate block">
                  {tx.title}
                </span>
                <span className="text-[10px] text-slate-500">
                  {tx.category} &bull; {tx.timestamp}
                </span>
              </div>

              <span className={`font-mono font-bold whitespace-nowrap ${
                tx.type === 'earned' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {tx.type === 'earned' ? `+${tx.amount}` : `-${tx.amount}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-5 border-t border-slate-800">
        <Link
          to="/skill-exchange"
          className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
        >
          <span>Explore Peer Skill Exchange</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </Link>
      </div>
    </div>
  );
};

export default SkillCreditsCard;
