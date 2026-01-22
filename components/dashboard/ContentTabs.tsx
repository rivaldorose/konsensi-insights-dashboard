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
    <div className="flex items-center gap-1 bg-card rounded-full p-1 border border-border-subtle w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-konsensi-green text-foreground'
              : 'text-text-secondary hover:text-foreground hover:bg-card-hover'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
