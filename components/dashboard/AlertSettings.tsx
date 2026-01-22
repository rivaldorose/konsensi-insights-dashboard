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
    <div className="bg-white rounded-[20px] shadow-sm shadow-gray-100 border border-gray-100 overflow-hidden">
      {/* Header - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3D7B4C]/10 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#3D7B4C]" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-[#111827]">Notificatie Instellingen</h3>
            <p className="text-sm text-gray-500">Beheer uw meldingen en alerts</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-4 space-y-4">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex-1">
                  <p className="font-medium text-[#111827] text-sm">{setting.label}</p>
                  <p className="text-xs text-gray-500">{setting.description}</p>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => toggleSetting(setting.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    setting.enabled ? 'bg-[#3D7B4C]' : 'bg-gray-300'
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
