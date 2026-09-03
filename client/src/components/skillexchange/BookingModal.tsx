import React, { useState } from 'react';
import { X, CheckCircle2, Coins, Calendar, Clock, Video, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { SkillExchangeItem, BookingReceipt, UserProfile } from '../../types/api';
import { bookPeerSession } from '../../services/api';

interface BookingModalProps {
  item: SkillExchangeItem | null;
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  onBookingSuccess: (receipt: BookingReceipt) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  item,
  isOpen,
  onClose,
  userProfile,
  onBookingSuccess
}) => {
  const [scheduledDate, setScheduledDate] = useState('Today @ 5:00 PM IST');
  const [topicDetails, setTopicDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);

  if (!isOpen || !item) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const res = await bookPeerSession(item.id, userProfile?.name || 'You', scheduledDate);
      if (res.receipt) {
        setReceipt(res.receipt);
        onBookingSuccess(res.receipt);
      }
    } catch (e: any) {
      console.error('Booking failed:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {receipt ? (
          <div className="space-y-6 text-center animate-fadeIn py-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                SkillCredits Escrow Locked &bull; Confirmed
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Session Successfully Booked!
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Session:</span>
                <span className="text-white font-bold">{receipt.exchangeTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Mentor:</span>
                <span className="text-white">{receipt.mentorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Escrow Locked:</span>
                <span className="text-amber-400 font-bold">{receipt.creditsEscrowed} SkillCredits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Scheduled Time:</span>
                <span className="text-white">{receipt.sessionTime}</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
                <span className="text-zinc-500">Video Room:</span>
                <a 
                  href={receipt.meetingLink}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline font-sans"
                >
                  Join Meeting Room &rarr;
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono mb-2">
                <Coins className="w-3.5 h-3.5" />
                <span>Peer Escrow Booking</span>
              </div>
              <h3 className="text-xl font-black text-white">
                {item.type === 'offer' ? 'Book 1-on-1 Mentorship' : 'Claim Help Bounty'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {item.title} &bull; With <strong className="text-white">{item.author}</strong>
              </p>
            </div>

            {/* Rate & Escrow Summary Box */}
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">Session Rate</span>
                <span className="text-base font-black text-amber-400">{item.rate} SkillCredits</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 block uppercase">Duration</span>
                <span className="text-sm font-bold text-white">{item.sessionDuration}</span>
              </div>
            </div>

            {/* Session Scheduling Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono block">
                Preferred Time Slot
              </label>
              <select
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600 font-mono"
              >
                <option value="Today @ 5:00 PM IST">Today @ 5:00 PM IST</option>
                <option value="Today @ 8:00 PM IST">Today @ 8:00 PM IST</option>
                <option value="Tomorrow @ 11:00 AM IST">Tomorrow @ 11:00 AM IST</option>
                <option value="Tomorrow @ 6:00 PM IST">Tomorrow @ 6:00 PM IST</option>
                <option value="This Saturday @ 4:00 PM IST">This Saturday @ 4:00 PM IST</option>
              </select>
            </div>

            {/* Goal/Blocker Details */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono block">
                What blocker or goal do you want to tackle?
              </label>
              <textarea
                rows={3}
                placeholder="E.g., Review my React state structure or explain x402 header verification..."
                value={topicDetails}
                onChange={(e) => setTopicDetails(e.target.value)}
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 resize-none font-mono"
              />
            </div>

            {/* Escrow Guarantee Note */}
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center space-x-2 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>SkillCredits remain locked in escrow until the session is completed and verified.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black text-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Locking Escrow...</span>
                  </>
                ) : (
                  <>
                    <span>Lock {item.rate} SC & Confirm Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default BookingModal;
