import React from 'react';
import { History, ShieldCheck, ExternalLink, CheckCircle2, Zap } from 'lucide-react';
import { PaymentTransaction } from '../../types/api';

interface TransactionHistoryTableProps {
  transactions: PaymentTransaction[];
}

export const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({ transactions }) => {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2.5">
          <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400">
            <Zap className="w-4 h-4 fill-amber-400/20" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">x402 Agent Commerce Ledger</h3>
            <span className="text-xs text-zinc-400">Algorand TestNet & GoPlausible settlement receipts</span>
          </div>
        </div>

        <span className="text-xs text-zinc-500 font-mono">
          {transactions.length} total settled
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-10 text-xs text-zinc-500 font-mono">
          No x402 transactions recorded yet. Unlock any premium service above to test settlement on LoRA Algorand TestNet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900/80 border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Service</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Facilitator</th>
                <th className="py-3 px-4">LoRA TestNet Tx</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-r-xl">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono">
              {transactions.map(tx => {
                const explorerUrl = tx.loraExplorerUrl || `https://lora.algokit.io/testnet/transaction/${tx.txHash}`;
                return (
                  <tr key={tx.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-sans font-bold text-white">
                      {tx.serviceTitle}
                    </td>
                    <td className="py-3.5 px-4 text-amber-400 font-bold">
                      {tx.amountAlgo} <span className="text-[10px] text-zinc-500 font-normal">(₹{tx.amountInr})</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
                        GoPlausible (x402-avm)
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 underline font-semibold"
                        title="View on LoRA Algorand Testnet Explorer"
                      >
                        <span>{tx.txHash.substring(0, 10)}...</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Settled</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500 text-[11px]">
                      {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryTable;
