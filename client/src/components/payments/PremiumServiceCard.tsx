import React from 'react';
import { Brain, Target, Map, Zap, Check, ArrowRight, Clock, Sparkles, Unlock } from 'lucide-react';
import { AgentServiceItem } from '../../types/api';

interface PremiumServiceCardProps {
  service: AgentServiceItem;
  isUnlocked: boolean;
  onUnlock: (service: AgentServiceItem) => void;
  onViewReport?: (service: AgentServiceItem) => void;
}

export const PremiumServiceCard: React.FC<PremiumServiceCardProps> = ({
  service,
  isUnlocked,
  onUnlock,
  onViewReport
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Brain': return Brain;
      case 'Target': return Target;
      case 'Map': return Map;
      case 'Zap': return Zap;
      default: return Sparkles;
    }
  };

  const Icon = getIcon(service.iconName);

  return (
    <div className={`relative bg-zinc-950 border rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
      isUnlocked 
        ? 'border-emerald-500/40 shadow-emerald-500/5' 
        : 'border-zinc-800 hover:border-zinc-700 hover:shadow-zinc-800/40 hover:-translate-y-0.5'
    }`}>
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-amber-400">
            <Icon className="w-5 h-5" />
          </div>

          <div className="flex items-center space-x-2">
            {isUnlocked ? (
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlocked ✓</span>
              </span>
            ) : (
              <div className="text-right">
                <div className="text-sm font-extrabold text-white font-mono">₹{service.priceInr}</div>
                <div className="text-[10px] text-amber-400 font-mono font-bold">{service.priceAlgo}</div>
              </div>
            )}
          </div>
        </div>

        {/* Category & Title */}
        <div className="mb-2">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
            {service.category}
          </span>
          <h3 className="text-lg font-bold text-white leading-snug mt-0.5">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-300 leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Key Features List */}
        <div className="space-y-2 mb-6">
          {service.features.map((feat, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-300">
              <Check className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Details & Action Button */}
      <div className="pt-4 border-t border-zinc-800/80 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center space-x-1 font-mono">
            <Clock className="w-3 h-3 text-zinc-500" />
            <span>Execution: {service.executionTime}</span>
          </span>
          <span className="text-amber-400 font-mono font-semibold">GoPlausible x402</span>
        </div>

        {isUnlocked ? (
          <button
            onClick={() => onViewReport && onViewReport(service)}
            className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>View Unlocked Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => onUnlock(service)}
            className="w-full py-3 rounded-2xl bg-white hover:bg-zinc-200 text-black text-xs font-extrabold shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Unlock with x402 ({service.priceAlgo})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PremiumServiceCard;
