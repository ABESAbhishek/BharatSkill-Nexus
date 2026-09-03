import React from 'react';
import { X, Sparkles, ShieldCheck, Award, CheckCircle2, TrendingUp, ExternalLink } from 'lucide-react';
import { PremiumReportResult } from '../../types/api';

interface PremiumResultModalProps {
  result: PremiumReportResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumResultModal: React.FC<PremiumResultModalProps> = ({ result, isOpen, onClose }) => {
  if (!isOpen || !result) return null;

  const explorerUrl = result.loraExplorerUrl || (result.txHash ? `https://lora.algokit.io/testnet/transaction/${result.txHash}` : 'https://lora.algokit.io/testnet');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2.5 mb-2">
          <div className="p-2 rounded-xl bg-zinc-900 text-amber-400 border border-zinc-800">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
            Unlocked Premium Intelligence &bull; x402 Settled on Algorand
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          {result.serviceTitle}
        </h2>
        
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-6 font-mono">
          <span>Generated: {new Date(result.generatedAt).toLocaleString()}</span>
          {result.txHash && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 underline font-semibold"
            >
              <span>Verify on LoRA Algorand TestNet Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-zinc-950 text-white border border-zinc-800">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Competitive Edge</span>
              <span className="text-sm font-extrabold text-white font-mono">{result.competitiveEdgeRating}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-zinc-950 text-amber-400 border border-zinc-800">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Estimated Bracket</span>
              <span className="text-sm font-extrabold text-amber-400 font-mono">{result.estimatedStipendRange}</span>
            </div>
          </div>
        </div>

        {/* Executive Briefing */}
        <div className="space-y-2 mb-6">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
            Executive Briefing
          </h3>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed">
            {result.executiveBriefing}
          </div>
        </div>

        {/* Key Strategic Insights */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
            Key Strategic Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.keyInsights.map((insight, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                <h4 className="text-xs font-bold text-white">
                  {insight.heading}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {insight.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Action Checklist */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
            Tactical Action Checklist
          </h3>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2.5">
            {result.strategicChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end pt-4 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

export default PremiumResultModal;
