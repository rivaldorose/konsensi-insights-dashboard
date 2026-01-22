'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface NotificationSetting {
  id: string;
  label: string;
  enabled: boolean;
}

interface NotificationGroup {
  title: string;
  settings: NotificationSetting[];
}

export function NotificationSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [groups, setGroups] = useState<NotificationGroup[]>([
    {
      title: 'Email notificaties',
      settings: [
        { id: 'daily_summary', label: 'Dagelijkse samenvatting', enabled: true },
        { id: 'weekly_report', label: 'Wekelijkse rapportage', enabled: true },
        { id: 'marketing', label: 'Marketing emails', enabled: false },
      ],
    },
    {
      title: 'Push notificaties',
      settings: [
        { id: 'new_users', label: 'Nieuwe gebruikers', enabled: true },
        { id: 'high_risk', label: 'Hoog-risico alerts', enabled: true },
        { id: 'payments', label: 'Betalingen ontvangen', enabled: true },
        { id: 'system_updates', label: 'Systeem updates', enabled: false },
      ],
    },
  ]);

  const toggleSetting = (groupIndex: number, settingId: string) => {
    setGroups((prev) =>
      prev.map((group, gIdx) => {
        if (gIdx !== groupIndex) return group;
        return {
          ...group,
          settings: group.settings.map((setting) =>
            setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting
          ),
        };
      })
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="bg-card rounded-[20px] p-8 border border-border-subtle">
      <h2 className="text-xl font-semibold text-foreground mb-6">Notificatie Instellingen</h2>

      <div className="space-y-8">
        {groups.map((group, groupIndex) => (
          <div key={group.title}>
            <h3 className="text-sm font-medium text-text-secondary mb-4">{group.title}</h3>
            <div className="space-y-3">
              {group.settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between py-3 px-4 bg-input rounded-xl border border-border-subtle"
                >
                  <span className="text-sm text-foreground">{setting.label}</span>
                  <button
                    onClick={() => toggleSetting(groupIndex, setting.id)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      setting.enabled ? 'bg-[#3D7B4C]' : 'bg-[#444444]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        setting.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-[#3D7B4C] text-foreground rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Opslaan...
            </>
          ) : (
            'Opslaan'
          )}
        </button>
      </div>
    </div>
  );
}
