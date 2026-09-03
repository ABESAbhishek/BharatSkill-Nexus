import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowLeft, Coins, Award, Clock } from 'lucide-react';

export const SkillExchangePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center flex-1 flex flex-col justify-center items-center">
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-6 shadow-lg shadow-cyan-500/10">
        <Users className="w-8 h-8" />
      </div>

      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
        <Clock className="w-3.5 h-3.5" />
        <span>Coming in Next Phase</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
        Peer Skill Exchange & Economy
      </h1>

      <p className="text-slate-300 text-base max-w-xl leading-relaxed mb-8">
        Collaborative student guilds where you can mentor peers, teach technical skills, earn SkillCredits, and request 1-on-1 pairing sessions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md text-left mb-8">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs mb-1">
            <Coins className="w-4 h-4" />
            <span>SkillCredits Rewards</span>
          </div>
          <p className="text-xs text-slate-400">Earn credits every time you resolve a peer blocker or review code.</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs mb-1">
            <Award className="w-4 h-4" />
            <span>Reputation Badges</span>
          </div>
          <p className="text-xs text-slate-400">On-chain verified contribution ratings and endorsement ranks.</p>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default SkillExchangePage;
