import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ShieldCheck, Cpu, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center flex-1 flex flex-col justify-center items-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-orange-500 p-[2px] mb-6 shadow-xl shadow-blue-500/20">
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
        <span>Build With Bharat 2.0</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
        About BharatSkill Nexus
      </h1>

      <p className="text-slate-300 text-base max-w-2xl leading-relaxed mb-8">
        BharatSkill Nexus is on a mission to democratize skill monetization and career growth for Indian students through decentralized value exchange, peer-driven collaboration, and autonomous AI agents.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left mb-8">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs mb-1">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Student-First</span>
          </div>
          <p className="text-xs text-slate-400">Designed to bridge the gap between classroom theory and industry opportunities.</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center space-x-2 text-blue-400 font-semibold text-xs mb-1">
            <Cpu className="w-4 h-4" />
            <span>Agentic AI</span>
          </div>
          <p className="text-xs text-slate-400">Intelligent diagnostic feedback and proactive opportunity matching.</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>₹0 Cost MVP</span>
          </div>
          <p className="text-xs text-slate-400">100% open-source architecture with Algorand testnet and x402 readiness.</p>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default AboutPage;
