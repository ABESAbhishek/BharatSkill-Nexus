import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Mail, 
  Sparkles, 
  Target, 
  Code2, 
  Compass, 
  Bot, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Layers, 
  Award, 
  Zap, 
  Edit3,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { UserProfile, AgentAnalysisReport } from '../types/api';
import { fetchProfile, fetchAgentAnalysis } from '../services/api';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [analysisReport, setAnalysisReport] = useState<AgentAnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Try to load profile from localStorage
    const saved = localStorage.getItem('bsn_user_profile');
    if (saved) {
      try {
        const localProfile = JSON.parse(saved) as UserProfile;
        setProfile(localProfile);

        // Check if existing analysis exists in cache
        const cachedAnalysis = localStorage.getItem(`bsn_analysis_${localProfile.id}`);
        if (cachedAnalysis) {
          try {
            setAnalysisReport(JSON.parse(cachedAnalysis));
          } catch (e) {
            // ignore parse error
          }
        }

        // Optionally refresh from backend if ID is available
        if (localProfile.id) {
          fetchProfile(localProfile.id)
            .then(res => {
              if (res.data) {
                setProfile(res.data);
                localStorage.setItem('bsn_user_profile', JSON.stringify(res.data));
              }
            })
            .catch(err => console.warn('Could not sync latest profile from backend:', err));

          // Also check for backend analysis
          if (!cachedAnalysis) {
            fetchAgentAnalysis(localProfile.id)
              .then(res => {
                if (res.data) {
                  setAnalysisReport(res.data);
                  localStorage.setItem(`bsn_analysis_${localProfile.id}`, JSON.stringify(res.data));
                }
              })
              .catch(() => {});
          }
        }
      } catch (e) {
        console.error('Failed to parse local profile:', e);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-sm text-slate-400">Loading your Skill Identity...</p>
      </div>
    );
  }

  // Empty state if no profile exists yet
  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center flex-1">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 shadow-xl shadow-cyan-500/10">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-3">
          No Skill Profile Found
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
          Complete the 4-step onboarding wizard to build your living Skill Identity, calculate profile strength, and prepare for agentic matching.
        </p>
        <Link
          to="/onboarding"
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5"
        >
          <span>Start Onboarding</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Calculate circular SVG parameters for Profile Strength
  const strength = profile.profileStrength || 75;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (strength / 100) * circumference;

  // Initials for avatar
  const initials = profile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'BS';

  const handleLogout = () => {
    localStorage.removeItem('bsn_user_profile');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Living Skill Graph</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Skill Identity
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            A living profile that evolves as you learn, contribute, and grow.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/onboarding')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Update Profile</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-400 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= LEFT COLUMN: USER HEADER & STRENGTH ================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* User Profile Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-md relative overflow-hidden">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-500 p-[2px] shadow-lg shadow-blue-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-extrabold text-xl text-white tracking-wider">
                    {initials}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                    <span>{profile.name}</span>
                  </h2>
                  <span className="inline-flex items-center space-x-1 text-xs text-cyan-400 font-medium mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Member</span>
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                {profile.experienceLevel}
              </span>
            </div>

            {/* Details List */}
            <div className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800/80">
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
              {profile.location && (
                <div className="flex items-center space-x-2.5">
                  <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.education && (
                <div className="flex items-center space-x-2.5">
                  <GraduationCap className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>{profile.education}</span>
                </div>
              )}
            </div>

            {/* Career Goal Highlight Badge */}
            <div className="mt-5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-slate-400">Target Goal:</span>
              </div>
              <span className="text-xs font-bold text-slate-200">
                {profile.careerGoal || 'Explore Opportunities'}
              </span>
            </div>
          </div>

          {/* Profile Strength Score Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">Profile Strength</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Completeness</span>
            </div>

            {/* Circular Progress + Stats */}
            <div className="flex items-center justify-around py-4">
              {/* Circular SVG Indicator */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="stroke-cyan-400 transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-white">{strength}%</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Strength</span>
                </div>
              </div>

              {/* Checklist Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Basic Info Added</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>{profile.skills.length} Skills Verified</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Career Goal Set</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Learning Style Defined</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-800/80">
              Score is computed based on profile completeness.
            </p>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: SKILLS, INTERESTS, NEXT STEPS ================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Verified Skills Section */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Verified Skills & Strengths</h3>
                  <p className="text-xs text-slate-400">Skills active in your candidate graph</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-mono">{profile.skills.length} Total</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {profile.skills.map((skill, index) => {
                const colors = [
                  'bg-blue-500/10 border-blue-500/30 text-blue-300',
                  'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
                  'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
                  'bg-purple-500/10 border-purple-500/30 text-purple-300',
                  'bg-amber-500/10 border-amber-500/30 text-amber-300',
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <span
                    key={skill}
                    className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold shadow-sm ${colorClass}`}
                  >
                    <span>{skill}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Career Direction & Interests */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-md">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Career Direction</h3>
                <p className="text-xs text-slate-400">Growth domains and active targets</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Target Interests
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map(interest => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">Learning Style</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{profile.learningPreference}</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">Target Role Status</span>
                  <span className="text-xs font-bold text-cyan-400 flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{profile.careerGoal}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Agentic AI Analysis Card */}
          <div className="bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-cyan-950/60 border border-cyan-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">Agentic Skill Intelligence</h3>
                  <span className="text-xs text-cyan-400 font-mono">Autonomous Growth Engine</span>
                </div>
              </div>

              {analysisReport && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{analysisReport.readinessScore}% Readiness</span>
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {analysisReport 
                ? `Active report available with ${analysisReport.recommendedSkills.length} recommended skill targets and ${analysisReport.opportunityMatches.length} opportunity matches.`
                : 'Let autonomous AI agents diagnose your skill gaps against real-world hackathon benchmarks and generate a tailored 4-phase growth roadmap.'
              }
            </p>

            <button
              onClick={() => navigate('/analysis')}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{analysisReport ? 'View Latest Growth Analysis' : 'Let AI Analyze Your Growth Path'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
