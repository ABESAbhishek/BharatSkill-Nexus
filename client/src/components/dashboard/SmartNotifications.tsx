import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Zap, Coins, X, Sparkles, ArrowRight } from 'lucide-react';
import { SmartNotification } from '../../types/api';

const DISMISSED_KEY = 'bsn_dismissed_notifications';

interface SmartNotificationsProps {
  notifications: SmartNotification[];
}

export const SmartNotifications: React.FC<SmartNotificationsProps> = ({ notifications }) => {
  const [dismissedIds, setDismissedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(DISMISSED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => {
      const updated = [...prev, id];
      localStorage.setItem(DISMISSED_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const activeNotifications = notifications.filter(n => !dismissedIds.includes(n.id));

  if (activeNotifications.length === 0) return null;

  return (
    <div className="space-y-2.5 mb-8">
      {activeNotifications.map(notif => {
        let icon = <Bell className="w-4 h-4 text-cyan-400" />;
        let borderClass = 'border-cyan-500/30 bg-cyan-950/20';

        if (notif.type === 'gap') {
          icon = <Zap className="w-4 h-4 text-amber-400" />;
          borderClass = 'border-amber-500/30 bg-amber-950/20';
        } else if (notif.type === 'credit') {
          icon = <Coins className="w-4 h-4 text-emerald-400" />;
          borderClass = 'border-emerald-500/30 bg-emerald-950/20';
        }

        return (
          <div
            key={notif.id}
            className={`p-3.5 sm:p-4 rounded-2xl border ${borderClass} flex items-center justify-between gap-3 text-xs shadow-lg backdrop-blur-sm animate-fadeIn`}
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex-shrink-0">
                {icon}
              </div>
              <div className="overflow-hidden">
                <strong className="text-white font-bold block sm:inline mr-2">
                  {notif.title}:
                </strong>
                <span className="text-slate-300">{notif.message}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              {notif.route && (
                <Link
                  to={notif.route}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-semibold inline-flex items-center space-x-1"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}

              <button
                onClick={() => handleDismiss(notif.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800/80 transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SmartNotifications;
