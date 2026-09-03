import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Coins, 
  Zap, 
  Lock, 
  Unlock, 
  Cpu, 
  FileCode, 
  Layers,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { AgentServiceItem, PaymentTransaction, PremiumReportResult, UserProfile } from '../../types/api';
import { getPaymentProvider, PaymentFlowStep } from '../../services/paymentProviders';

interface PaymentModalProps {
  service: AgentServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  mode: 'demo' | 'testnet';
  onPaymentSuccess: (transaction: PaymentTransaction, result: PremiumReportResult) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  service,
  isOpen,
  onClose,
  userProfile,
  mode,
  onPaymentSuccess
}) => {
  const [currentStep, setCurrentStep] = useState<PaymentFlowStep>('idle');
  const [stepMessage, setStepMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedTx, setCompletedTx] = useState<PaymentTransaction | null>(null);
  const [completedResult, setCompletedResult] = useState<PremiumReportResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep('idle');
      setStepMessage('');
      setIsProcessing(false);
      setCompletedTx(null);
      setCompletedResult(null);
    }
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const handleStartPayment = async () => {
    setIsProcessing(true);
    const provider = getPaymentProvider(mode);

    try {
      const { transaction, result } = await provider.executePayment(
        service,
        userProfile,
        (step, msg) => {
          setCurrentStep(step);
          setStepMessage(msg);
        }
      );

      setCompletedTx(transaction);
      setCompletedResult(result);
      onPaymentSuccess(transaction, result);
    } catch (err: any) {
      console.error('Payment execution failed:', err);
      setStepMessage('Payment execution failed: ' + (err?.message || 'Network error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const STEPS: { key: PaymentFlowStep; label: string; number: string; icon: any }[] = [
    { key: 'request_resource', label: 'HTTP 402 Request', number: '01', icon: Lock },
    { key: 'authorizing', label: 'GoPlausible Header', number: '02', icon: FileCode },
    { key: 'settling_blockchain', label: 'Algorand TestNet', number: '03', icon: Cpu },
    { key: 'verifying_proof', label: 'Lora Proof Verify', number: '04', icon: ShieldCheck },
    { key: 'unlocked', label: 'AI Inference Unlocked', number: '05', icon: Unlock },
  ];

  const getStepIndex = (step: PaymentFlowStep) => {
    switch (step) {
      case 'request_resource': return 0;
      case 'authorizing': return 1;
      case 'settling_blockchain': return 2;
      case 'verifying_proof': return 3;
      case 'unlocked': return 4;
      default: return -1;
    }
  };

  const activeIndex = getStepIndex(currentStep);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer disabled:opacity-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 mb-6">
          <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-amber-400 shadow-md">
            <Zap className="w-6 h-6 fill-amber-400/20" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                x402 &bull; GoPlausible Facilitator
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-900 text-zinc-300 border border-zinc-700">
                Algorand TestNet
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Pricing Strip */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs mb-6 font-mono">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-sans">Service Cost</span>
            <span className="text-sm font-extrabold text-white">₹{service.priceInr} INR</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-sans">Algorand Rate</span>
            <span className="text-sm font-extrabold text-amber-400">{service.priceAlgo}</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-sans">Latency</span>
            <span className="text-sm font-extrabold text-emerald-400">{service.executionTime}</span>
          </div>
        </div>

        {/* 5-Step Protocol Visualization */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            <span>x402 Protocol Execution Sequence</span>
            <span className="text-zinc-500 font-mono">Facilitator: GoPlausible</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {STEPS.map((s, idx) => {
              const isPast = activeIndex > idx || currentStep === 'unlocked';
              const isCurrent = activeIndex === idx;
              const Icon = s.icon;

              return (
                <div
                  key={s.key}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    isPast
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : isCurrent
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10 animate-pulse'
                      : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-600'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold block leading-tight font-mono">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Activity Log / Status Message */}
          {stepMessage && (
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center space-x-2 font-mono">
              {isProcessing && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400 flex-shrink-0" />}
              {!isProcessing && currentStep === 'unlocked' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
              <span className="truncate">{stepMessage}</span>
            </div>
          )}
        </div>

        {/* Completed State vs Initial State */}
        {completedTx ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settled via GoPlausible Facilitator</span>
                </span>
                <span className="font-mono text-white">{completedTx.amountAlgo}</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-300 font-mono pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Transaction ID:</span>
                  <span className="text-white truncate max-w-[280px]">{completedTx.txHash}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Network:</span>
                  <span className="text-zinc-300">Algorand TestNet</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Facilitator:</span>
                  <span className="text-amber-400">GoPlausible (x402-avm)</span>
                </div>
                
                {/* Lora Algorand Testnet Link */}
                <div className="pt-2">
                  <a
                    href={completedTx.loraExplorerUrl || `https://lora.algokit.io/testnet/transaction/${completedTx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold"
                  >
                    <span>View on LoRA Algorand Testnet Explorer</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-lg"
              >
                <span>View Unlocked Intelligence Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <div className="text-[11px] text-zinc-500">
              Zero subscription lock-in &bull; Pure pay-per-use x402
            </div>

            <button
              onClick={handleStartPayment}
              disabled={isProcessing}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs shadow-xl transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Settling on Algorand...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Authorize & Settle {service.priceAlgo}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentModal;
