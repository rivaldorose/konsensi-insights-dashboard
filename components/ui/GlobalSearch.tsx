'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Command, X, Users, Briefcase, Radar, CreditCard, Building2, FileText, Settings, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  category: string;
}

const searchData: SearchResult[] = [
  // Pages
  { id: '1', title: 'Dashboard Overzicht', description: 'Algemeen platform overzicht', href: '/overview', icon: <LayoutDashboard className="w-4 h-4" />, category: 'Paginas' },
  { id: '2', title: 'Jongeren Dashboard', description: 'Schuldhulp voor jongeren', href: '/dashboard', icon: <Users className="w-4 h-4" />, category: 'Paginas' },
  { id: '3', title: 'Bewindvoerders', description: 'Hulpverlener beheer', href: '/bewindvoerders', icon: <Briefcase className="w-4 h-4" />, category: 'Paginas' },
  { id: '4', title: 'Hulpradar', description: 'Schuldhulp matching', href: '/hulpradar', icon: <Radar className="w-4 h-4" />, category: 'Paginas' },
  { id: '5', title: 'Schuldenradar', description: 'Schulden opsporing', href: '/schuldenradar', icon: <CreditCard className="w-4 h-4" />, category: 'Paginas' },
  { id: '6', title: 'Work', description: 'Werk vinden', href: '/work', icon: <Building2 className="w-4 h-4" />, category: 'Paginas' },
  { id: '7', title: 'Audit Log', description: 'Activiteiten logboek', href: '/audit-log', icon: <FileText className="w-4 h-4" />, category: 'Paginas' },
  { id: '8', title: 'Instellingen', description: 'Account en app instellingen', href: '/settings', icon: <Settings className="w-4 h-4" />, category: 'Paginas' },
  { id: '9', title: 'Exporteer', description: 'Data exporteren', href: '/exporteer', icon: <FileText className="w-4 h-4" />, category: 'Paginas' },
  { id: '10', title: 'Inzichten', description: 'Analytics en rapporten', href: '/inzichten', icon: <LayoutDashboard className="w-4 h-4" />, category: 'Paginas' },
  { id: '11', title: 'Gebruikers', description: 'Gebruikersbeheer', href: '/gebruikers', icon: <Users className="w-4 h-4" />, category: 'Paginas' },
  // Actions
  { id: '12', title: 'Nieuwe gebruiker toevoegen', description: 'Voeg een nieuwe gebruiker toe', href: '/gebruikers?action=new', icon: <Users className="w-4 h-4" />, category: 'Acties' },
  { id: '13', title: 'Data exporteren', description: 'Exporteer data naar CSV of PDF', href: '/exporteer', icon: <FileText className="w-4 h-4" />, category: 'Acties' },
  { id: '14', title: 'Profiel bewerken', description: 'Bewerk je profiel instellingen', href: '/settings', icon: <Settings className="w-4 h-4" />, category: 'Acties' },
];

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredResults = query.length > 0
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchData.slice(0, 8);

  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    },
    []
  );

  const handleResultKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      router.push(filteredResults[selectedIndex].href);
      setIsOpen(false);
      setQuery('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Zoeken...</span>
        <kbd className="hidden md:flex items-center gap-1 px-1.5 py-0.5 text-xs bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
        }}
      />

      {/* Search Modal */}
      <div className="fixed inset-x-4 top-24 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl z-50">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Zoek paginas, acties, gebruikers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleResultKeyDown}
              className="flex-1 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {Object.entries(groupedResults).map(([category, items]) => (
              <div key={category}>
                <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {category}
                </div>
                {items.map((item) => {
                  const globalIndex = filteredResults.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        router.push(item.href);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        globalIndex === selectedIndex
                          ? 'bg-[#3D7B4C]/10 text-[#3D7B4C]'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          globalIndex === selectedIndex ? 'bg-[#3D7B4C]/20' : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-gray-500 truncate">{item.description}</p>
                      </div>
                      {globalIndex === selectedIndex && (
                        <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">
                          Enter
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
            {filteredResults.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                Geen resultaten gevonden voor &quot;{query}&quot;
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↓</kbd>
              <span>navigeren</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Enter</kbd>
              <span>openen</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Esc</kbd>
              <span>sluiten</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
