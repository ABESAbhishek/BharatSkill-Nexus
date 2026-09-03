import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, ExternalLink, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 pt-14 pb-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                BHARATSKILL NEXUS
              </span>
            </Link>
            
            <p className="text-xs text-slate-300 font-medium">
              "Learn. Contribute. Earn. Grow."
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              An Agentic Skill-to-Opportunity Ecosystem that connects student skills, peer learning, AI-powered opportunity discovery, and decentralized value exchange.
            </p>

            <div className="pt-2">
              <a
                href="https://github.com/ABESAbhishek/BharatSkill-Nexus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>ABESAbhishek/BharatSkill-Nexus</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/opportunities" className="hover:text-cyan-400 transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link to="/skill-exchange" className="hover:text-cyan-400 transition-colors">
                  Skill Exchange
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Technology
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-400">AI Agents</li>
              <li className="text-slate-400">x402 Protocol</li>
              <li className="text-slate-400">Algorand Testnet</li>
              <li className="text-slate-400">Dynamic Skill Graph</li>
            </ul>
          </div>

          {/* System & Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              System
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link 
                  to="/status" 
                  className="inline-flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>API Health & Status</span>
                </Link>
              </li>
              <li className="text-slate-500">₹0 Free-Tier Stack</li>
              <li className="text-slate-500">Open Source MIT</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} BharatSkill Nexus. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 font-medium text-slate-400">
            <span>Built for</span>
            <span className="text-cyan-400 font-semibold">Build With Bharat 2.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
