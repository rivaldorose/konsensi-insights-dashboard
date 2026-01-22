'use client';

import { User, Settings, Bell, Users, Shield, Database } from 'lucide-react';

type SettingsTab = 'profiel' | 'account' | 'notificaties' | 'team' | 'beveiliging' | 'privacy';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const tabs = [
  { id: 'profiel' as const, label: 'Profiel', icon: User },
  { id: 'account' as const, label: 'Account', icon: Settings },
  { id: 'notificaties' as const, label: 'Notificaties', icon: Bell },
  { id: 'team' as const, label: 'Team', icon: Users },
  { id: 'beveiliging' as const, label: 'Beveiliging', icon: Shield },
  { id: 'privacy' as const, label: 'Data & Privacy', icon: Database },
];

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      {/* Profile Section */}
      <div className="flex items-center gap-4 pb-6 border-b border-border-subtle mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center text-foreground text-lg font-semibold">
          RR
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Rivaldo Rose</h3>
          <p className="text-sm text-text-secondary">rivaldo@konsensi.nl</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-konsensi-green/10 text-konsensi-green'
                  : 'text-text-secondary hover:bg-card-hover'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-konsensi-green' : 'text-text-secondary'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
