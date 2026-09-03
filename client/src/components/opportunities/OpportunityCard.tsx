import React, { useState } from 'react';
import { 
  Trophy, 
  Briefcase, 
  Globe, 
  Award, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  AlertCircle,
  Zap
} from 'lucide-react';
import { OpportunityMatchResult } from '../../types/api';

interface OpportunityCardProps {
  opportunity: OpportunityMatchResult;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onViewDetails: (opportunity: OpportunityMatchResult) => void;
  onPrepareApply: (opportunity: OpportunityMatchResult) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  isSaved,
  onToggleSave,
  onViewDetails,
  onPrepareApply
}) => {
  const [whyExpanded, setWhyExpanded] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hackathon': return Trophy;
      case 'Internship': return Briefcase;
      case 'Open Source': return Globe;
      case 'Bounty': return Award;
      case 'Fellowship': return GraduationCap;
      default: return Sparkles;
    }
  };

  const getMatchScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
    if (score >= 65) return 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400';
    if (score >= 50) return 'bg-amber-500/15 border-amber-500/30 text-amber-400';
    return 'bg-slate-500/15 border-slate-500/30 text-slate-400';
  };

  const Icon = getCategoryIcon(opportunity.category);

  return (
    <div className={`relative bg-slate-900/80 border rounded-3xl p-6 shadow-xl backdrop-blur-sm transition-all duration-300 flex flex-col justify-between ${
      opportunity.isLocked 
        ? 'border-slate-800/80 opacity-90' 
        : 'border-slate-800 hover:border-slate-700 hover:shadow-cyan-500/5 hover:-translate-y-0.5'
    }`}>
      
      {/* Card Header: Category + Match Percentage + Bookmark */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300">
              <Icon className="w-3.5 h-3.5 text-cyan-400" />
              <span>{opportunity.category}</span>
            </span>

            {opportunity.isLocked ? (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-400">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Locked</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                <Unlock className="w-3 h-3" />
                <span>Unlocked</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className={`px-2.5 py-1 rounded-xl border text-xs font-bold font-mono ${getMatchScoreBadge(opportunity.matchPercentage)}`}>
              {opportunity.matchPercentage}% Match
            </div>

            <button
              onClick={() => onToggleSave(opportunity.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save opportunity'}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Organization */}
        <div className="mb-3">
          <span className="text-xs text-cyan-400/90 font-medium tracking-wide">
            {opportunity.organization}
          </span>
          <h3 className="text-lg font-bold text-white leading-snug mt-0.5">
            {opportunity.title}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
          {opportunity.description}
        </p>

        {/* Required Skills Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {opportunity.requiredSkills.map(skill => {
            const isUserStrength = opportunity.whyThisMatch.strongMatches.some(s => s.toLowerCase() === skill.toLowerCase());
            return (
              <span
                key={skill}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium border ${
                  isUserStrength
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {isUserStrength ? '✓ ' : ''}{skill}
              </span>
            );
          })}
        </div>

        {/* Meta details: Location, Deadline, Rewards */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-4">
          <div className="flex items-center space-x-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center space-x-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <span>{opportunity.deadline}</span>
          </div>
          <div className="col-span-2 flex items-center space-x-1.5 text-amber-400 font-medium">
            <Award className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{opportunity.stipendOrReward}</span>
          </div>
        </div>

        {/* Compact Match Intelligence Note */}
        <div className="text-[11px] text-slate-300 bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 mb-3 flex items-start space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <span className="leading-normal">
            {opportunity.whyThisMatch.aiRecommendation}
          </span>
        </div>

        {/* Expandable "Why This Match?" Section */}
        <div className="mb-4">
          <button
            onClick={() => setWhyExpanded(!whyExpanded)}
            className="w-full flex items-center justify-between text-xs font-semibold text-cyan-400 hover:text-cyan-300 p-2 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/15 transition-colors cursor-pointer"
          >
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>✨ Why This Match?</span>
            </span>
            {whyExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {whyExpanded && (
            <div className="mt-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3 animate-fadeIn">
              {/* Strong Matches */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Strong Matches
                </span>
                <div className="flex flex-wrap gap-1">
                  {opportunity.whyThisMatch.strongMatches.map(m => (
                    <span key={m} className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
                      ✓ {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills to Improve */}
              {opportunity.whyThisMatch.skillsToImprove.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Skills To Improve
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.whyThisMatch.skillsToImprove.map(m => (
                      <span key={m} className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                        → {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Recommendation */}
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                <span className="text-slate-400 font-semibold">Recommendation: </span>
                {opportunity.whyThisMatch.aiRecommendation}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lock Condition Notice (if locked) */}
      {opportunity.isLocked && (
        <div className="mb-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center space-x-2">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{opportunity.unlockCondition}</span>
        </div>
      )}

      {/* Card Actions */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center space-x-2">
        <button
          onClick={() => onViewDetails(opportunity)}
          className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
        >
          View Details
        </button>

        {!opportunity.isLocked && (
          <button
            onClick={() => onPrepareApply(opportunity)}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Prepare to Apply</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
};

export default OpportunityCard;
