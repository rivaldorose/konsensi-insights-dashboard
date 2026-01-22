'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Bell } from 'lucide-react';

interface AlertSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface AlertSettingsProps {
  initialSettings: AlertSetting[];
}

export function AlertSettings({ initialSettings }: AlertSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div className="bg-card rounded-[20px] border border-border-subtle overflow-hidden">
      {/* Header - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-border-subtle transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-konsensi-green/10 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-konsensi-green" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-foreground">Notificatie Instellingen</h3>
            <p className="text-sm text-text-secondary">Beheer uw meldingen en alerts</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-text-secondary" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-secondary" />
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border-subtle">
          <div className="pt-4 space-y-4">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-4 bg-border-subtle rounded-xl"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{setting.label}</p>
                  <p className="text-xs text-text-secondary">{setting.description}</p>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => toggleSetting(setting.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    setting.enabled ? 'bg-konsensi-green' : 'bg-[#555555]'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform ${
                      setting.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
