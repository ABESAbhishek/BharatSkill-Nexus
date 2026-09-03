import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Server, 
  Monitor, 
  Globe, 
  Check,
  AlertCircle
} from 'lucide-react';
import { getHealthStatus, API_BASE_URL } from '../services/api';
import { HealthResponse } from '../types/api';

export const StatusPage: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'failed'>('loading');
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<string>('');
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const checkHealth = useCallback(async () => {
    setBackendStatus('loading');
    setErrorMessage(null);
    const startTime = performance.now();

    try {
      const data = await getHealthStatus();
      const endTime = performance.now();
      setLatencyMs(Math.round(endTime - startTime));
      setHealthData(data);
      setBackendStatus('connected');
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err: any) {
      setBackendStatus('failed');
      setHealthData(null);
      setErrorMessage(err?.message || 'Failed to connect to backend server');
      setLastChecked(new Date().toLocaleTimeString());
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-12 flex-1 flex flex-col justify-center">
      {/* Hero Header */}
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
          BHARATSKILL NEXUS
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto">
          An Agentic Skill-to-Opportunity Ecosystem powered by x402 & Algorand
        </p>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-400 mt-2">
          <span>Foundation Verification & Health Monitor</span>
        </div>
      </div>

      {/* Main Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Frontend Status Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100">Frontend Client</h3>
                <p className="text-xs text-slate-400">React + Vite + TypeScript</p>
              </div>
            </div>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-base">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>✓ Frontend Running</span>
            </div>
            <div className="mt-2 text-xs text-slate-400 space-y-1">
              <div>Port: <span className="text-slate-300 font-mono">5173</span></div>
              <div>Environment: <span className="text-slate-300 font-mono">development</span></div>
            </div>
          </div>
        </div>

        {/* Backend Status Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl border ${
                backendStatus === 'connected' 
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                  : backendStatus === 'failed' 
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100">Backend API</h3>
                <p className="text-xs text-slate-400">Node.js + Express + TypeScript</p>
              </div>
            </div>
            
            {backendStatus === 'connected' && (
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            )}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/60">
            {backendStatus === 'loading' && (
              <div className="flex items-center space-x-2 text-amber-400 font-semibold text-base">
                <RefreshCw className="w-5 h-5 animate-spin flex-shrink-0" />
                <span>Checking backend connection...</span>
              </div>
            )}

            {backendStatus === 'connected' && (
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-base">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>✓ Backend Connected</span>
                </div>
                <div className="mt-2 text-xs text-slate-400 space-y-1">
                  <div>Endpoint: <span className="text-slate-300 font-mono">{API_BASE_URL}/api/health</span></div>
                  <div>Response: <span className="text-emerald-300 font-mono">"{healthData?.message}"</span></div>
                  {latencyMs !== null && <div>Latency: <span className="text-slate-300 font-mono">{latencyMs} ms</span></div>}
                </div>
              </div>
            )}

            {backendStatus === 'failed' && (
              <div>
                <div className="flex items-center space-x-2 text-rose-400 font-semibold text-base">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>✗ Backend Connection Failed</span>
                </div>
                <div className="mt-2 text-xs text-rose-300/80 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                  <div className="font-mono">{errorMessage}</div>
                  <div className="mt-1 text-[11px] text-slate-400">Ensure the backend is running at <span className="text-slate-300 font-mono">{API_BASE_URL}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-slate-500" />
          <span>Target API URL: <span className="font-mono text-slate-300">{API_BASE_URL}</span></span>
          {lastChecked && <span>(Last checked: {lastChecked})</span>}
        </div>
        
        <button
          onClick={checkHealth}
          disabled={backendStatus === 'loading'}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 text-white font-medium transition-all shadow-md shadow-blue-500/20 text-xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${backendStatus === 'loading' ? 'animate-spin' : ''}`} />
          <span>{backendStatus === 'loading' ? 'Retrying...' : 'Refresh / Retry'}</span>
        </button>
      </div>

      {/* Foundation Verification Summary Checklist */}
      <div className="mt-8 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-blue-400" />
          <span>Foundation Checklist</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monorepo Structure Configured</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Node.js + Express + TypeScript Backend</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>React + Vite + Tailwind CSS Frontend</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Typed Environment Variables Isolated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
