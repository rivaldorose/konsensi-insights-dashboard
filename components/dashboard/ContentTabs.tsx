'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface ContentTabsProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function ContentTabs({ tabs, activeTab: controlledActiveTab, onTabChange }: ContentTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id);
  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabClick = (tabId: string) => {
    setInternalActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-full p-1 border border-[#2a2a2a] w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-[#3D7B4C] text-white'
              : 'text-[#888888] hover:text-white hover:bg-[#222222]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
