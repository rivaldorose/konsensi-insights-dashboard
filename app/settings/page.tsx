'use client';

import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { TeamSettings } from '@/components/settings/TeamSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { PrivacySettings } from '@/components/settings/PrivacySettings';

type SettingsTab = 'profiel' | 'account' | 'notificaties' | 'team' | 'beveiliging' | 'privacy';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profiel');

  const renderContent = () => {
    switch (activeTab) {
      case 'profiel':
        return <ProfileSettings />;
      case 'account':
        return <AccountSettings />;
      case 'notificaties':
        return <NotificationSettings />;
      case 'team':
        return <TeamSettings />;
      case 'beveiliging':
        return <SecuritySettings />;
      case 'privacy':
        return <PrivacySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Instellingen</h1>
          <p className="text-[#888888] mt-1">Beheer je account en voorkeuren</p>
        </div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
