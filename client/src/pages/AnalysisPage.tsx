import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Target, 
  Layers, 
  TrendingUp, 
  Check, 
  Zap, 
  Briefcase, 
  Calendar, 
  Award,
  Terminal,
  Activity,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { UserProfile, AgentAnalysisReport } from '../types/api';
import { runAgentAnalysis, fetchAgentAnalysis } from '../services/api';

const PIPELINE_STEPS = [
  'Loading Skill Identity',
  'Understanding Career Intent',
  'Mapping Existing Skills',
  'Detecting Skill Gaps',
  'Evaluating Opportunity Readiness',
  'Constructing Personalized Growth Path'
];

export const AnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [report, setReport] = useState<AgentAnalysisReport | null>(null);
  const [isExecuting, setIsExecuting] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Execute Agent Analysis Pipeline with staggered visual execution
  const executePipeline = useCallback(async (userProfile: UserProfile) => {
    setIsExecuting(true);
    setErrorMessage(null);
    setActiveStepIndex(0);

    // Stagger through the 6 execution logs
    const interval = setInterval(() => {
      setActiveStepIndex(prev => {
        if (prev < PIPELINE_STEPS.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 380);

    try {
      const response = await runAgentAnalysis(userProfile);
      if (response.data) {
        // Allow the visual steps to complete smoothly
        setTimeout(() => {
          clearInterval(interval);
          setActiveStepIndex(PIPELINE_STEPS.length);
          setReport(response.data!);
          localStorage.setItem(`bsn_analysis_${userProfile.id}`, JSON.stringify(response.data));
          setIsExecuting(false);
        }, 1800);
      } else {
        throw new Error('Analysis completed but no data returned.');
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error('Agent analysis error:', err);
      setErrorMessage(err?.message || 'Agent analysis engine encountered an issue.');
      setIsExecuting(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('bsn_user_profile');
    if (!saved) {
      navigate('/onboarding');
      return;
    }

    try {
      const parsedProfile = JSON.parse(saved) as UserProfile;
      setProfile(parsedProfile);

      // Check if existing analysis exists in cache
      const cached = localStorage.getItem(`bsn_analysis_${parsedProfile.id}`);
      if (cached) {
        try {
          const cachedReport = JSON.parse(cached) as AgentAnalysisReport;
          setReport(cachedReport);
          setIsExecuting(false);
          return;
        } catch (e) {
          // ignore cache parse error
        }
      }

      // If no cached analysis or first time, run pipeline
      executePipeline(parsedProfile);
    } catch (e) {
      console.error('Failed to parse user profile:', e);
      navigate('/onboarding');
    }
  }, [navigate, executePipeline]);

  // Readiness Score Badge styling
  const getReadinessBadge = (label?: string) => {
    switch (label) {
      case 'Highly Prepared':
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
      case 'Opportunity Ready':
        return 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400';
      case 'Growing':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-400';
      default:
        return 'bg-blue-500/15 border-blue-500/30 text-blue-400';
    }
  };

  // Readiness SVG circular progress
  const score = report?.readinessScore || 75;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Ambient background lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>Autonomous Intelligence Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Growth Intelligence Report
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Autonomous career intelligence diagnosing skill gaps and generating high-fit opportunity paths.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/profile"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>My Profile</span>
          </Link>

          {profile && !isExecuting && (
            <button
              onClick={() => executePipeline(profile)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-run Analysis</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= AGENT EXECUTION PIPELINE (WHEN RUNNING) ================= */}
      {isExecuting && (
        <div className="max-w-2xl mx-auto py-12 px-4 animate-fadeIn">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-md relative overflow-hidden">
            
            <div className="flex items-center space-x-3.5 mb-6 pb-4 border-b border-slate-800">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 animate-pulse">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Agent Execution in Progress</h3>
                <p className="text-xs text-slate-400">Synthesizing skill graph & target vectors for {profile?.name}...</p>
              </div>
            </div>

            {/* Staggered Execution Activity Logs */}
            <div className="space-y-3.5 font-mono text-xs">
              {PIPELINE_STEPS.map((stepName, idx) => {
                const isPassed = activeStepIndex > idx;
                const isCurrent = activeStepIndex === idx;

                return (
                  <div
                    key={stepName}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                      isPassed
                        ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                        : isCurrent
                          ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950/40 border-slate-800/60 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                      )}
                      <span>{stepName}</span>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider font-semibold">
                      {isPassed ? 'Completed' : isCurrent ? 'Processing...' : 'Queued'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
              <span className="text-[11px] text-slate-500">
                Evaluating candidate eligibility against 4 ecosystem opportunity benchmarks...
              </span>
            </div>

          </div>
        </div>
      )}

      {/* ================= ERROR STATE ================= */}
      {errorMessage && !isExecuting && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-4">
          <p className="text-sm text-rose-300">{errorMessage}</p>
          {profile && (
            <button
              onClick={() => executePipeline(profile)}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
            >
              Retry Agent Pipeline
            </button>
          )}
        </div>
      )}

      {/* ================= COMPLETED REPORT DASHBOARD ================= */}
      {!isExecuting && report && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* 1. EXECUTIVE SUMMARY & READINESS SCORE BANNER */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Summary Text */}
              <div className="lg:col-span-8 space-y-3.5">
                <div className="flex items-center space-x-2.5">
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${getReadinessBadge(report.readinessLabel)}`}>
                    {report.readinessLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Analyzed on {new Date(report.analyzedAt).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Strategic Profile Assessment
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {report.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-xl">
                    <Target className="w-3.5 h-3.5 text-orange-400" />
                    <span>Target: <strong className="text-white">{profile?.careerGoal}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-xl">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Domain: <strong className="text-white">{profile?.interests.join(' & ')}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Circular Gauge */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      className="stroke-slate-800"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      className="stroke-cyan-400 transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-white">{score}%</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Readiness</span>
                  </div>
                </div>

                <span className="text-xs font-semibold text-slate-200 mt-2">Opportunity Readiness</span>
                <span className="text-[11px] text-slate-500">Benchmark Match Rating</span>
              </div>

            </div>
          </div>

          {/* x402 Micropayment Deep Strategic Upgrade Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-orange-950/40 via-slate-900/90 to-amber-950/40 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-2xl bg-orange-500/15 text-orange-400 border border-orange-500/30 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider font-mono">
                  Algorand x402 Micropayment
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Unlock Deep Strategic Career Intelligence Report
                </h3>
                <p className="text-xs text-slate-300">
                  Access multi-dimensional competitive percentiles and stipend brackets for only ₹5 / 0.10 ALGO.
                </p>
              </div>
            </div>
            <Link
              to="/payments"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition-all flex-shrink-0 hover:-translate-y-0.5"
            >
              <span>Unlock with x402</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. SKILL GAP ANALYSIS MATRIX (3 CATEGORIES) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Skill Gap Analysis Matrix</h3>
                  <p className="text-xs text-slate-400">Detailed categorization against target role requirements</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* STRENGTHS */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-emerald-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Strengths</span>
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {report.strengths.length} Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-4 leading-normal">
                    Skills you already possess that provide immediate leverage in your target domain.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {report.strengths.map(s => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
                  Active in candidate matching
                </div>
              </div>

              {/* GROWING AREAS */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-amber-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Growing Areas</span>
                    </span>
                    <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
                      {report.growingAreas.length || report.strengths.length} Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-4 leading-normal">
                    Adjacent skills and foundational competencies ready for practical project scaling.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(report.growingAreas.length > 0 ? report.growingAreas : report.strengths.slice(0, 2)).map(s => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
                  Reinforce with peer pair-building
                </div>
              </div>

              {/* SKILL GAPS */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-cyan-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>Skill Gaps</span>
                    </span>
                    <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {report.recommendedSkills.length} High Priority
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-4 leading-normal">
                    High-impact missing requirements to master to unlock maximum fit for your target opportunities.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {report.recommendedSkills.map(s => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-sm"
                      >
                        + {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
                  Integrated into Growth Roadmap below
                </div>
              </div>

            </div>
          </div>

          {/* 3. PERSONALIZED 4-PHASE GROWTH ROADMAP */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Personalized Growth Roadmap</h3>
                  <p className="text-xs text-slate-400">4-phase actionable blueprint to reach target readiness</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {report.growthRoadmap.map((phase) => (
                <div
                  key={phase.phase}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                        {phase.phase}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">
                      {phase.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mb-3">
                      {phase.subtitle}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4 pb-3 border-b border-slate-800/80">
                      {phase.description}
                    </p>

                    {/* Actionable items */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Action Checklist:
                      </span>
                      {phase.actions.map((act, i) => (
                        <div key={i} className="flex items-start space-x-2 text-[11px] text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Autonomous Roadmap</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. OPPORTUNITY MATCHES PREVIEW */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Opportunities You Could Unlock</h3>
                  <p className="text-xs text-slate-400">Ecosystem opportunities dynamically matched to your skill graph</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {report.opportunityMatches.length} Matches Found
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.opportunityMatches.map((opp) => (
                <div
                  key={opp.id}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                          {opp.category}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1.5">
                          {opp.title}
                        </h4>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-base font-extrabold text-emerald-400 font-mono">
                          {opp.matchPercentage}%
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                          Fit Match
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mb-3.5">
                      {opp.fitReason}
                    </p>

                    {opp.stipendOrReward && (
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-400 font-semibold mb-3">
                        <Award className="w-3.5 h-3.5" />
                        <span>{opp.stipendOrReward}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {opp.requiredSkills.map((sk: string) => (
                        <span
                          key={sk}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span>Full application unlocks in Marketplace</span>
                    <span className="text-cyan-400 font-medium">Previewed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AnalysisPage;
