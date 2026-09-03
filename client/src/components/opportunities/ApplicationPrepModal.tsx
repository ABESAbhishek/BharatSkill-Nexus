import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  FileText, 
  ShieldCheck, 
  Coins, 
  Check, 
  ArrowRight,
  Loader2,
  Trophy
} from 'lucide-react';
import { OpportunityMatchResult, UserProfile } from '../../types/api';

interface ApplicationPrepModalProps {
  opportunity: OpportunityMatchResult | null;
  userProfile: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationPrepModal: React.FC<ApplicationPrepModalProps> = ({
  opportunity,
  userProfile,
  isOpen,
  onClose
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState('https://github.com/ABESAbhishek/BharatSkill-Nexus');
  const [applicantNote, setApplicantNote] = useState('');

  if (!isOpen || !opportunity) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Application Preparation Mode
                </span>
                <h3 className="text-xl font-bold text-white">
                  {opportunity.title}
                </h3>
                <span className="text-xs text-slate-400 font-medium">
                  {opportunity.organization} &bull; {opportunity.category}
                </span>
              </div>
            </div>

            {/* Preparation Checklist */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 mb-6">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Eligibility & Verification Checklist</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Skill Graph Verification</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">{opportunity.matchPercentage}% Fit</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Candidate Experience Level</span>
                  </div>
                  <span className="text-slate-300 font-medium">{userProfile?.experienceLevel || 'Intermediate'}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-200">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span>Community Contribution Clearance</span>
                  </div>
                  <span className="text-amber-400 font-bold font-mono">150 SkillCredits</span>
                </div>
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Portfolio / GitHub Project Link
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Applicant Statement / Key Contributions
                </label>
                <textarea
                  rows={3}
                  placeholder={`Hi ${opportunity.organization}, I am excited to apply with my verified strengths in ${opportunity.whyThisMatch.strongMatches.join(', ')}...`}
                  value={applicantNote}
                  onChange={(e) => setApplicantNote(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2 px-3 text-xs text-white placeholder:text-slate-500 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting to Ecosystem...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-white">
                Application Successfully Submitted!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your verified Skill Identity has been submitted to <strong className="text-white">{opportunity.organization}</strong> with a <strong className="text-emerald-400">{opportunity.matchPercentage}% fit score</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-sm mx-auto text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-amber-400 font-semibold">
                <span className="flex items-center space-x-1.5">
                  <Coins className="w-4 h-4" />
                  <span>Contribution Reward</span>
                </span>
                <span>+25 SkillCredits</span>
              </div>
              <p className="text-[11px] text-slate-400 text-left">
                You earned 25 SkillCredits for submitting a verified opportunity application.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Return to Opportunities Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicationPrepModal;
