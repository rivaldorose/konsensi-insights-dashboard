'use client';

import { TreePine, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface NavTab {
  id: string;
  label: string;
  active: boolean;
}

interface NavbarProps {
  tabs: NavTab[];
  onTabChange?: (tabId: string) => void;
}

export function Navbar({ tabs, onTabChange }: NavbarProps) {
  const [activeTab, setActiveTab] = useState(tabs.find(t => t.active)?.id || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <nav className="mx-6 mt-6">
      <div className="bg-white rounded-[50px] shadow-lg shadow-gray-200/50 px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#3D7B4C] rounded-full flex items-center justify-center">
            <TreePine className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[#111827] text-lg tracking-tight">KONSENSI</span>
        </div>

        {/* Center Navigation */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#3D7B4C] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Avatar */}
          <button className="flex items-center gap-2 hover:bg-gray-100 rounded-full pl-1 pr-3 py-1 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">RR</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </nav>
  );
}
