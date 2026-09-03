import React, { useState } from 'react';
import { X, PlusCircle, Coins, BookOpen, HelpCircle, Loader2, ArrowRight } from 'lucide-react';
import { SkillExchangeItem, UserProfile } from '../../types/api';
import { postNewSkillExchange } from '../../services/api';

interface CreateExchangeModalProps {
  initialType: 'offer' | 'request';
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  onCreated: (item: SkillExchangeItem) => void;
}

export const CreateExchangeModal: React.FC<CreateExchangeModalProps> = ({
  initialType,
  isOpen,
  onClose,
  userProfile,
  onCreated
}) => {
  const [type, setType] = useState<'offer' | 'request'>(initialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [tagsInput, setTagsInput] = useState('');
  const [rate, setRate] = useState(25);
  const [sessionDuration, setSessionDuration] = useState('45 mins');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      const res = await postNewSkillExchange({
        type,
        title,
        author: userProfile?.name || 'Peer Builder',
        authorRole: userProfile?.careerGoal || 'Student Contributor',
        authorAvatar: (userProfile?.name || 'PB').substring(0, 2).toUpperCase(),
        category,
        tags: tags.length > 0 ? tags : [category],
        rate: Number(rate),
        rateUnit: type === 'offer' ? 'SC / session' : 'SC Reward',
        description,
        availability: 'Available Now',
        sessionDuration
      });

      if (res.data) {
        onCreated(res.data);
        onClose();
      }
    } catch (err: any) {
      console.error('Failed to post exchange:', err);
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

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-amber-400 text-xs font-semibold uppercase tracking-wider font-mono mb-2">
            <Coins className="w-3.5 h-3.5" />
            <span>Peer Guild Marketplace</span>
          </div>
          <h3 className="text-xl font-black text-white">
            {type === 'offer' ? 'Offer a Skill to Teach' : 'Post a Help Bounty'}
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {type === 'offer'
              ? 'Share your strengths, mentor peers, and earn SkillCredits.'
              : 'Allocate SkillCredits from your balance to get 1-on-1 assistance.'}
          </p>
        </div>

        {/* Type Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 mb-5">
          <button
            type="button"
            onClick={() => setType('offer')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              type === 'offer'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>I Want to Teach (Offer)</span>
          </button>

          <button
            type="button"
            onClick={() => setType('request')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              type === 'request'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>I Need Help (Bounty)</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
              Listing Title *
            </label>
            <input
              type="text"
              required
              placeholder={type === 'offer' ? "E.g., Master React 19 State Patterns 1-on-1" : "E.g., Need assistance debugging Algorand Smart Contract"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
            />
          </div>

          {/* Category & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600 font-mono"
              >
                <option value="Web Development">Web Development</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Backend Engineering">Backend Engineering</option>
                <option value="Product Design">Product Design</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                Duration
              </label>
              <select
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-600 font-mono"
              >
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="60 mins">60 mins</option>
              </select>
            </div>
          </div>

          {/* SkillCredits Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
              {type === 'offer' ? 'Credit Rate (SC earned per session)' : 'Bounty Reward (SC allocated from balance)'}
            </label>
            <input
              type="number"
              min={5}
              max={100}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-amber-400 font-bold focus:outline-none focus:border-zinc-600 font-mono"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              placeholder="React, TypeScript, Algorand, x402..."
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Outline what you will cover or what technical blocker you need resolved..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 resize-none font-mono"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black text-xs transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish {type === 'offer' ? 'Skill Offer' : 'Help Bounty'}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateExchangeModal;
