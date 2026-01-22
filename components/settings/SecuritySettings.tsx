'use client';

import { useState } from 'react';
import { Smartphone, Monitor, MapPin, Clock, Shield, Loader2 } from 'lucide-react';

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
  icon: 'smartphone' | 'desktop';
}

const initialSessions: Session[] = [
  {
    id: '1',
    device: 'MacBook Pro',
    browser: 'Chrome 120',
    location: 'Amsterdam, NL',
    lastActive: 'Nu actief',
    current: true,
    icon: 'desktop',
  },
  {
    id: '2',
    device: 'iPhone 15',
    browser: 'Safari',
    location: 'Amsterdam, NL',
    lastActive: '2 uur geleden',
    current: false,
    icon: 'smartphone',
  },
  {
    id: '3',
    device: 'Windows PC',
    browser: 'Firefox 121',
    location: 'Utrecht, NL',
    lastActive: '3 dagen geleden',
    current: false,
    icon: 'desktop',
  },
];

export function SecuritySettings() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRevokeAllSessions = () => {
    setSessions((prev) => prev.filter((s) => s.current));
  };

  const handleToggle2FA = async () => {
    setIsEnabling2FA(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTwoFactorEnabled(!twoFactorEnabled);
    setIsEnabling2FA(false);
  };

  return (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-[20px] p-8 border border-border-subtle">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#3D7B4C]/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#3D7B4C]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Twee-factor authenticatie</h2>
              <p className="text-sm text-text-secondary mt-1">
                Voeg een extra beveiligingslaag toe aan je account
              </p>
            </div>
          </div>
          <button
            onClick={handleToggle2FA}
            disabled={isEnabling2FA}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-colors ${
              twoFactorEnabled
                ? 'bg-red-900/20 text-red-500 hover:bg-red-900/30'
                : 'bg-[#3D7B4C] text-foreground hover:bg-[#2d5a38]'
            }`}
          >
            {isEnabling2FA ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : twoFactorEnabled ? (
              'Uitschakelen'
            ) : (
              'Inschakelen'
            )}
          </button>
        </div>

        {twoFactorEnabled && (
          <div className="mt-6 p-4 bg-green-900/20 rounded-xl border border-green-900/50">
            <p className="text-sm text-green-400">
              Twee-factor authenticatie is ingeschakeld. Je account is nu extra beveiligd.
            </p>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-card rounded-[20px] p-8 border border-border-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Actieve Sessies</h2>
            <p className="text-sm text-text-secondary mt-1">
              Beheer apparaten die zijn ingelogd op je account
            </p>
          </div>
          {sessions.length > 1 && (
            <button
              onClick={handleRevokeAllSessions}
              className="px-4 py-2 text-red-500 text-sm font-medium hover:bg-red-900/20 rounded-full transition-colors"
            >
              Alle andere sessies beëindigen
            </button>
          )}
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`flex items-center justify-between p-4 rounded-xl ${
                session.current ? 'bg-[#3D7B4C]/10 border border-[#3D7B4C]/20' : 'bg-input border border-border-subtle'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  session.current ? 'bg-[#3D7B4C]/10' : 'bg-[#2a2a2a]'
                }`}>
                  {session.icon === 'smartphone' ? (
                    <Smartphone className={`w-5 h-5 ${session.current ? 'text-[#3D7B4C]' : 'text-text-secondary'}`} />
                  ) : (
                    <Monitor className={`w-5 h-5 ${session.current ? 'text-[#3D7B4C]' : 'text-text-secondary'}`} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{session.device}</p>
                    {session.current && (
                      <span className="px-2 py-0.5 bg-[#3D7B4C] text-foreground text-xs rounded-full">
                        Deze sessie
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary mt-1">
                    <span>{session.browser}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {session.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.lastActive}
                    </span>
                  </div>
                </div>
              </div>

              {!session.current && (
                <button
                  onClick={() => handleRevokeSession(session.id)}
                  className="px-4 py-2 text-red-500 text-sm font-medium hover:bg-red-900/20 rounded-full transition-colors"
                >
                  Beëindigen
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="bg-card rounded-[20px] p-8 border border-border-subtle">
        <h2 className="text-xl font-semibold text-foreground mb-6">Recente Inlogactiviteit</h2>
        <div className="space-y-3">
          {[
            { date: 'Vandaag, 14:30', location: 'Amsterdam, NL', device: 'Chrome op MacBook', success: true },
            { date: 'Vandaag, 09:15', location: 'Amsterdam, NL', device: 'Safari op iPhone', success: true },
            { date: 'Gisteren, 18:45', location: 'Utrecht, NL', device: 'Firefox op Windows', success: true },
            { date: 'Gisteren, 12:00', location: 'Rotterdam, NL', device: 'Onbekend apparaat', success: false },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border-subtle last:border-0">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${activity.success ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.device}</p>
                  <p className="text-xs text-text-secondary">{activity.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-secondary">{activity.date}</p>
                <p className={`text-xs ${activity.success ? 'text-green-400' : 'text-red-400'}`}>
                  {activity.success ? 'Succesvol' : 'Mislukt'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
