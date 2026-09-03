import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Heart, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Users, 
  Check, 
  AlertCircle,
  Briefcase
} from 'lucide-react';
import { OpportunityMatchResult } from '../../types/api';

interface OpportunityDetailModalProps {
  opportunity: OpportunityMatchResult | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onPrepareApply: (opportunity: OpportunityMatchResult) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onPrepareApply
}) => {
  if (!isOpen || !opportunity) return null;

  const { scoreBreakdown } = opportunity.whyThisMatch;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            {opportunity.category}
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium">
            {opportunity.difficulty} Difficulty
          </span>
          <span className="px-3 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium">
            {opportunity.experienceLevel} Level
          </span>
          <div className="ml-auto flex items-center space-x-2">
            <span className="text-lg font-bold text-emerald-400 font-mono">
              {opportunity.matchPercentage}% Match
            </span>
            <button
              onClick={() => onToggleSave(opportunity.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
          {opportunity.title}
        </h2>
        <div className="text-sm font-semibold text-cyan-400 mb-6">
          {opportunity.organization}
        </div>

        {/* Key Info Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 mb-6">
          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5">Location</span>
            <div className="flex items-center space-x-1.5 font-semibold text-white">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{opportunity.location}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5">Deadline</span>
            <div className="flex items-center space-x-1.5 font-semibold text-white">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{opportunity.deadline}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5">Stipend / Prize</span>
            <div className="flex items-center space-x-1.5 font-semibold text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>{opportunity.stipendOrReward}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-slate-500 block mb-0.5">Spots Available</span>
            <div className="flex items-center space-x-1.5 font-semibold text-white">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>{opportunity.spotsAvailable} Open</span>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="space-y-2 mb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Opportunity Overview
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {opportunity.fullDescription}
          </p>
        </div>

        {/* Required vs Preferred Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
              Required Core Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.requiredSkills.map(skill => {
                const isUserStrength = opportunity.whyThisMatch.strongMatches.some(s => s.toLowerCase() === skill.toLowerCase());
                return (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                      isUserStrength
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {isUserStrength ? '✓ ' : '• '}{skill}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
              Preferred / Bonus Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.preferredSkills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300"
                >
                  + {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Match Score Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Deterministic Match Breakdown
              </h4>
            </div>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              Total Score: {opportunity.matchPercentage}/100
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Skill Overlap Score</span>
                <span className="text-cyan-400 font-mono">{scoreBreakdown.skillMatchScore}/45 pts</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${(scoreBreakdown.skillMatchScore / 45) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Career Goal Alignment</span>
                <span className="text-emerald-400 font-mono">{scoreBreakdown.goalAlignmentScore}/20 pts</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(scoreBreakdown.goalAlignmentScore / 20) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Domain Interest Fit</span>
                <span className="text-blue-400 font-mono">{scoreBreakdown.interestFitScore}/15 pts</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full rounded-full" style={{ width: `${(scoreBreakdown.interestFitScore / 15) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Experience Compatibility</span>
                <span className="text-purple-400 font-mono">{scoreBreakdown.experienceScore}/10 pts</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: `${(scoreBreakdown.experienceScore / 10) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 leading-normal">
            <strong className="text-cyan-300">AI Recommendation: </strong>
            {opportunity.whyThisMatch.aiRecommendation}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>

          {!opportunity.isLocked ? (
            <button
              onClick={() => {
                onClose();
                onPrepareApply(opportunity);
              }}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Prepare to Apply</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-xs text-amber-400 font-medium px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              🔒 Locked: {opportunity.unlockCondition}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OpportunityDetailModal;
