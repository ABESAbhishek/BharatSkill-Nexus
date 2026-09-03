import React from 'react';
import { Star, Clock, Coins, User, ArrowRight, BookOpen, HelpCircle, CheckCircle2 } from 'lucide-react';
import { SkillExchangeItem } from '../../types/api';

interface SkillExchangeCardProps {
  item: SkillExchangeItem;
  onBook: (item: SkillExchangeItem) => void;
}

export const SkillExchangeCard: React.FC<SkillExchangeCardProps> = ({ item, onBook }) => {
  const isOffer = item.type === 'offer';

  return (
    <div className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all hover:-translate-y-0.5 group">
      <div>
        {/* Top Header Strip */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-xs font-mono">
              {item.authorAvatar}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
                {item.author}
              </h4>
              <span className="text-[11px] text-zinc-400 block -mt-0.5">
                {item.authorRole}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider border ${
              isOffer 
                ? 'bg-zinc-900 text-white border-zinc-700' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {isOffer ? 'Skill Offer' : 'Help Bounty'}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.map((t, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800/80 text-[10px] text-zinc-400 font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-4 border-t border-zinc-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-1 text-amber-400 font-bold">
            <Coins className="w-3.5 h-3.5 fill-amber-400/20" />
            <span>{item.rate} {item.rateUnit}</span>
          </div>

          <div className="flex items-center space-x-1 text-zinc-400 text-[11px]">
            <Clock className="w-3 h-3 text-zinc-500" />
            <span>{item.sessionDuration}</span>
          </div>
        </div>

        <button
          onClick={() => onBook(item)}
          className={`w-full py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md ${
            isOffer
              ? 'bg-white hover:bg-zinc-200 text-black'
              : 'bg-amber-400 hover:bg-amber-300 text-black'
          }`}
        >
          <span>{isOffer ? 'Request 1-on-1 Session' : 'Claim Help Bounty'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default SkillExchangeCard;
