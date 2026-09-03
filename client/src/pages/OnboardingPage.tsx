import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Code2, 
  Palette, 
  Sparkles, 
  Plus, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Target, 
  Layers, 
  BookOpen,
  Briefcase,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { OnboardingFormData, UserProfile } from '../types/api';
import { saveProfile } from '../services/api';

const DRAFT_KEY = 'bsn_onboarding_draft';

const INITIAL_FORM_DATA: OnboardingFormData = {
  name: '',
  email: '',
  location: '',
  education: 'Undergraduate',
  skills: ['Python', 'React'],
  interests: ['Artificial Intelligence', 'Web Development'],
  careerGoal: 'Get an Internship',
  experienceLevel: 'Intermediate',
  learningPreference: 'Build Projects',
};

const SUGGESTED_SKILLS = {
  Programming: ['Python', 'JavaScript', 'React', 'C++', 'Java', 'Node.js', 'TypeScript', 'SQL'],
  Design: ['UI/UX', 'Figma', 'Graphic Design', 'Tailwind CSS', 'User Research'],
  Other: ['Communication', 'Public Speaking', 'Content Writing', 'Marketing', 'Data Analysis', 'Problem Solving']
};

const CAREER_INTERESTS = [
  'Web Development',
  'Artificial Intelligence',
  'Blockchain',
  'Data Science',
  'Cybersecurity',
  'Product Design',
  'Entrepreneurship'
];

const CAREER_GOALS = [
  'Get an Internship',
  'Find a Job',
  'Freelance',
  'Learn New Skills',
  'Build Projects',
  'Explore Opportunities'
];

const EDUCATION_LEVELS = [
  'High School',
  'Undergraduate',
  'Postgraduate',
  'Self-Taught / Bootcamper',
  'Other'
];

const EXPERIENCE_LEVELS = [
  { level: 'Beginner', desc: 'Starting out, learning fundamentals and exploring technologies' },
  { level: 'Intermediate', desc: 'Built several projects and comfortable with core tools' },
  { level: 'Advanced', desc: 'Shipped production code, ready for complex bounties & leadership' },
];

const LEARNING_PREFERENCES = [
  { name: 'Learn from Peers', desc: 'Collaborate in peer guilds, pair-programming, and community reviews', icon: '👥' },
  { name: 'Build Projects', desc: 'Hands-on project building, hackathons, and solving real-world bounties', icon: '🛠️' },
  { name: 'Structured Learning', desc: 'Guided roadmaps, curated modules, and diagnostic skill gap feedback', icon: '📚' },
  { name: 'Mentorship', desc: '1-on-1 guidance, portfolio reviews, and targeted interview prep', icon: '🎯' },
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<OnboardingFormData>(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_FORM_DATA;
      }
    }
    return INITIAL_FORM_DATA;
  });

  const [customSkillInput, setCustomSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync draft to localStorage
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateField = (field: keyof OnboardingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (!formData.skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, trimmed] }));
    }
    setCustomSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleToggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation for Step 1
    if (currentStep === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        setErrorMessage('Please enter both your Full Name and Email address.');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setErrorMessage('Please provide a valid email address.');
        return;
      }
    }

    // Validation for Step 2
    if (currentStep === 2) {
      if (formData.skills.length === 0) {
        setErrorMessage('Please select or enter at least 1 skill to proceed.');
        return;
      }
    }

    // Validation for Step 3
    if (currentStep === 3) {
      if (formData.interests.length === 0) {
        setErrorMessage('Please select at least 1 career interest.');
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const calculateClientStrength = (data: OnboardingFormData): number => {
    let score = 0;
    if (data.name?.trim()) score += 7;
    if (data.email?.trim()) score += 6;
    if (data.location?.trim()) score += 6;
    if (data.education?.trim()) score += 6;
    if (data.skills?.length > 0) score += Math.min(25, data.skills.length * 5);
    if (data.careerGoal?.trim()) score += 13;
    if (data.interests?.length > 0) score += Math.min(12, data.interests.length * 4);
    if (data.experienceLevel?.trim()) score += 13;
    if (data.learningPreference?.trim()) score += 12;
    return Math.min(100, Math.round(score));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const now = new Date().toISOString();
    const fallbackProfile: UserProfile = {
      id: `bsn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: formData.name,
      email: formData.email,
      location: formData.location || '',
      education: formData.education || '',
      skills: formData.skills,
      interests: formData.interests,
      careerGoal: formData.careerGoal,
      experienceLevel: formData.experienceLevel || 'Beginner',
      learningPreference: formData.learningPreference || 'Build Projects',
      profileStrength: calculateClientStrength(formData),
      createdAt: now,
      updatedAt: now
    };

    try {
      const response = await saveProfile(formData);
      const savedData = response.data || fallbackProfile;
      localStorage.setItem('bsn_user_profile', JSON.stringify(savedData));
      localStorage.removeItem(DRAFT_KEY);
      window.dispatchEvent(new Event('storage'));
      navigate('/profile');
    } catch (err: any) {
      console.warn('Backend save notice, utilizing client profile persistence:', err);
      localStorage.setItem('bsn_user_profile', JSON.stringify(fallbackProfile));
      localStorage.removeItem(DRAFT_KEY);
      window.dispatchEvent(new Event('storage'));
      navigate('/profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full">
        
        {/* Onboarding Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Skill Identity Creation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Build Your Nexus Profile
          </h1>
          <p className="text-sm text-slate-400">
            Tell us about your strengths and goals to unlock tailored opportunities and peer learning.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
            <span>Step {currentStep} of 4: {
              currentStep === 1 ? 'Basic Profile' :
              currentStep === 2 ? 'Skills & Strengths' :
              currentStep === 3 ? 'Interests & Goals' :
              'Experience & Learning Style'
            }</span>
            <span className="text-cyan-400 font-mono">{progressPercentage}%</span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Step Pill Badges */}
          <div className="grid grid-cols-4 gap-2 mt-4 text-center">
            {['Basic', 'Skills', 'Interests', 'Style'].map((label, idx) => {
              const stepNum = idx + 1;
              const isCompleted = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div 
                  key={label}
                  className={`text-[11px] font-medium py-1 rounded-lg border transition-colors ${
                    isCurrent 
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' 
                      : isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓ ' : `${stepNum}. `}{label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center space-x-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleNextStep} className="space-y-6">

            {/* ================= STEP 1: BASIC PROFILE ================= */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-white">Basic Information</h2>
                  <p className="text-xs text-slate-400">Let's start with your contact details and background.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Aarav Sharma"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="aarav@example.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Location (City / State)
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="e.g. Bengaluru, Karnataka"
                          value={formData.location}
                          onChange={(e) => updateField('location', e.target.value)}
                          className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Education Level
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={formData.education}
                          onChange={(e) => updateField('education', e.target.value)}
                          className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white transition-colors cursor-pointer"
                        >
                          {EDUCATION_LEVELS.map(lvl => (
                            <option key={lvl} value={lvl} className="bg-slate-900 text-white">
                              {lvl}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 2: SKILLS ================= */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-white">What are you good at?</h2>
                  <p className="text-xs text-slate-400">Add programming languages, design tools, or soft skills you can share or use.</p>
                </div>

                {/* Custom Skill Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a skill and press Enter (e.g. Rust, Next.js, Product Design)..."
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(customSkillInput);
                      }
                    }}
                    className="flex-1 bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(customSkillInput)}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Selected Skills Pills */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Selected Skills ({formData.skills.length})
                  </label>
                  <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 min-h-[56px] items-center">
                    {formData.skills.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">No skills added yet. Select from suggestions below or type your own.</span>
                    ) : (
                      formData.skills.map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-medium shadow-sm transition-all animate-scaleIn"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-cyan-400/80 hover:text-cyan-100 hover:bg-cyan-500/20 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Suggested Skills by Category */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Suggested Skills
                  </span>

                  {/* Programming */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-xs text-blue-400 font-medium">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Programming & Engineering</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_SKILLS.Programming.map(skill => {
                        const isSelected = formData.skills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => isSelected ? handleRemoveSkill(skill) : handleAddSkill(skill)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                              isSelected
                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Design */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-xs text-purple-400 font-medium">
                      <Palette className="w-3.5 h-3.5" />
                      <span>Design & Creative</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_SKILLS.Design.map(skill => {
                        const isSelected = formData.skills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => isSelected ? handleRemoveSkill(skill) : handleAddSkill(skill)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                              isSelected
                                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Other / Soft Skills */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Business & Communication</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_SKILLS.Other.map(skill => {
                        const isSelected = formData.skills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => isSelected ? handleRemoveSkill(skill) : handleAddSkill(skill)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                              isSelected
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 3: INTERESTS & GOALS ================= */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-white">Where do you want to grow?</h2>
                  <p className="text-xs text-slate-400">Select the domains you want to explore and your primary target.</p>
                </div>

                {/* Career Interests Multi-Select */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Career Interests (Select multiple) <span className="text-cyan-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CAREER_INTERESTS.map(interest => {
                      const isSelected = formData.interests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleToggleInterest(interest)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-sm'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <span>{interest}</span>
                          <span className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                            isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold' : 'border-slate-700'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Career Goal Dropdown */}
                <div className="space-y-2 pt-3">
                  <label className="block text-xs font-semibold text-slate-300">
                    Primary Career Goal <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Target className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.careerGoal}
                      onChange={(e) => updateField('careerGoal', e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white cursor-pointer"
                    >
                      {CAREER_GOALS.map(goal => (
                        <option key={goal} value={goal} className="bg-slate-900 text-white">
                          {goal}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 4: EXPERIENCE & LEARNING STYLE ================= */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-white">Experience & Learning Style</h2>
                  <p className="text-xs text-slate-400">Help our intelligent agents tune opportunity matches and peer guilds to your pace.</p>
                </div>

                {/* Experience Level Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Your Experience Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {EXPERIENCE_LEVELS.map(item => {
                      const isSelected = formData.experienceLevel === item.level;
                      return (
                        <button
                          key={item.level}
                          type="button"
                          onClick={() => updateField('experienceLevel', item.level)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-blue-500/15 border-blue-500/50 text-white shadow-md shadow-blue-500/10'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-white">{item.level}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                          </div>
                          <p className="text-[11px] leading-normal text-slate-400">{item.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Learning Preference */}
                <div className="space-y-2 pt-3">
                  <label className="block text-xs font-semibold text-slate-300">
                    How do you prefer to learn?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {LEARNING_PREFERENCES.map(pref => {
                      const isSelected = formData.learningPreference === pref.name;
                      return (
                        <button
                          key={pref.name}
                          type="button"
                          onClick={() => updateField('learningPreference', pref.name)}
                          className={`p-3.5 rounded-xl border text-left transition-all flex items-start space-x-3 ${
                            isSelected
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-white shadow-md shadow-emerald-500/10'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-xl">{pref.icon}</span>
                          <div>
                            <div className="font-bold text-xs text-white mb-0.5">{pref.name}</div>
                            <p className="text-[11px] text-slate-400 leading-normal">{pref.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 transition-all hover:shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Skill Identity...</span>
                  </>
                ) : currentStep < 4 ? (
                  <>
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Complete & View Identity</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default OnboardingPage;
