import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, X, ArrowRight, UserCheck, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { fetchProfileByEmail } from '../services/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetchProfileByEmail(email.trim());
      if (response.data) {
        localStorage.setItem('bsn_user_profile', JSON.stringify(response.data));
        onClose();
        navigate('/profile');
      } else {
        throw new Error('Profile not found for this email address.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'No profile found with this email. Please complete onboarding first.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoProfile = {
      id: 'bsn_demo_user',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      location: 'Bengaluru, India',
      education: 'Undergraduate',
      skills: ['Python', 'React', 'Node.js', 'UI/UX', 'TypeScript'],
      interests: ['Artificial Intelligence', 'Web Development', 'Blockchain'],
      careerGoal: 'Get an Internship',
      experienceLevel: 'Intermediate',
      learningPreference: 'Build Projects',
      profileStrength: 92,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem('bsn_user_profile', JSON.stringify(demoProfile));
    onClose();
    navigate('/profile');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            Access Your Skill Identity
          </h3>
          <p className="text-xs text-slate-400">
            Sign in with your registered email or use a 1-click demo profile.
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Email Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Registered Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="aarav@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Load Profile</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-slate-800" />
          <span className="px-3 text-[11px] text-slate-500 uppercase tracking-wider">or demo mode</span>
          <div className="flex-1 border-t border-slate-800" />
        </div>

        {/* 1-Click Demo Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-medium text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
        >
          <UserCheck className="w-4 h-4" />
          <span>Launch Demo Student Profile (Aarav)</span>
        </button>

        {/* Footer Note */}
        <div className="mt-5 text-center">
          <p className="text-[11px] text-slate-500">
            Don't have a profile yet?{' '}
            <button
              onClick={() => {
                onClose();
                navigate('/onboarding');
              }}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Get Started
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;
