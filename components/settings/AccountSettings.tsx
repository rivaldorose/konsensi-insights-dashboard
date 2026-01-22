'use client';

import { useState } from 'react';
import { Eye, EyeOff, Loader2, AlertTriangle } from 'lucide-react';

export function AccountSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [language, setLanguage] = useState('nl');
  const [timezone, setTimezone] = useState('Europe/Amsterdam');

  const handlePasswordChange = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-card rounded-[20px] p-8 border border-border-subtle">
        <h2 className="text-xl font-semibold text-foreground mb-6">Wachtwoord wijzigen</h2>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Huidig wachtwoord
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                className="w-full px-4 py-3 pr-12 bg-input border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Nieuw wachtwoord
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => setPasswords((p) => ({ ...p, new: e.target.value }))}
                className="w-full px-4 py-3 pr-12 bg-input border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Bevestig nieuw wachtwoord
            </label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
              className="w-full px-4 py-3 bg-input border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
            />
          </div>

          <button
            onClick={handlePasswordChange}
            disabled={isSaving || !passwords.current || !passwords.new || passwords.new !== passwords.confirm}
            className="flex items-center gap-2 px-6 py-3 bg-[#3D7B4C] text-foreground rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Wijzigen...
              </>
            ) : (
              'Wachtwoord wijzigen'
            )}
          </button>
        </div>
      </div>

      {/* Language & Timezone */}
      <div className="bg-card rounded-[20px] p-8 border border-border-subtle">
        <h2 className="text-xl font-semibold text-foreground mb-6">Voorkeuren</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Taal
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
            >
              <option value="nl">Nederlands</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Tijdzone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
            >
              <option value="Europe/Amsterdam">Amsterdam (CET)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="America/New_York">New York (EST)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-[20px] p-8 border border-red-900/50">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Gevaarlijke zone</h2>
        <p className="text-sm text-text-secondary mb-6">
          Deze acties zijn permanent en kunnen niet ongedaan worden gemaakt.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-3 bg-red-900/20 text-red-500 rounded-full font-medium text-sm hover:bg-red-900/30 transition-colors border border-red-900/50"
          >
            Account verwijderen
          </button>
        ) : (
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-900/50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium text-red-400 mb-2">Weet je het zeker?</h3>
                <p className="text-sm text-red-500 mb-4">
                  Dit verwijdert permanent je account en alle bijbehorende gegevens.
                  Deze actie kan niet ongedaan worden gemaakt.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-input text-text-secondary rounded-full text-sm font-medium border border-border-subtle hover:bg-card-hover"
                  >
                    Annuleren
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-foreground rounded-full text-sm font-medium hover:bg-red-700">
                    Ja, verwijder mijn account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
