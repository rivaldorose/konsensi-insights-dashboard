'use client';

import { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';

interface ProfileData {
  naam: string;
  email: string;
  functie: string;
  telefoon: string;
  bio: string;
}

export function ProfileSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    naam: 'Rivaldo Rose',
    email: 'rivaldo@konsensi.nl',
    functie: 'Admin / Bewindvoerder',
    telefoon: '+31 6 12345678',
    bio: 'Ervaren bewindvoerder met focus op schuldhulpverlening en financieel beheer.',
  });

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="bg-card rounded-[20px] p-8 border border-border-subtle">
      <h2 className="text-xl font-semibold text-foreground mb-6">Profiel Instellingen</h2>

      {/* Avatar Upload */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center text-foreground text-2xl font-semibold">
            RR
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-input rounded-full shadow-md flex items-center justify-center border border-border-subtle hover:bg-card-hover transition-colors">
            <Camera className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Profielfoto</p>
          <p className="text-xs text-text-secondary mt-1">JPG, PNG of GIF. Max 2MB.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Volledige naam
          </label>
          <input
            type="text"
            value={profileData.naam}
            onChange={(e) => handleChange('naam', e.target.value)}
            className="w-full px-4 py-3 bg-input border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-konsensi-green/20 focus:border-konsensi-green"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            E-mailadres
          </label>
          <input
            type="email"
            value={profileData.email}
            disabled
            className="w-full px-4 py-3 bg-input border border-border-subtle rounded-xl text-sm text-text-secondary cursor-not-allowed"
          />
          <p className="text-xs text-text-secondary mt-1">E-mailadres kan niet worden gewijzigd</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Functie / Rol
            </label>
            <input
              type="text"
              value={profileData.functie}
              onChange={(e) => handleChange('functie', e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-konsensi-green/20 focus:border-konsensi-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Telefoon
            </label>
            <input
              type="tel"
              value={profileData.telefoon}
              onChange={(e) => handleChange('telefoon', e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-konsensi-green/20 focus:border-konsensi-green"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-input border border-border-subtle rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-konsensi-green/20 focus:border-konsensi-green resize-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-konsensi-green text-foreground rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors disabled:opacity-50"
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
