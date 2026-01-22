'use client';

import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, Users, Euro, Clock, ChevronRight } from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'warning' | 'info';
  metric: string;
  change: string;
  app: string;
  priority: 'high' | 'medium' | 'low';
}

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  deadline: string;
}

const insights: Insight[] = [
  {
    id: '1',
    title: 'Schuldenradar scans stijgen',
    description: 'Het aantal uitgevoerde scans is met 23% gestegen ten opzichte van vorige maand. Dit wijst op verhoogde bewustwording.',
    type: 'positive',
    metric: '3.456 scans',
    change: '+23%',
    app: 'Schuldenradar',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Langere wachttijd in Tilburg',
    description: 'De gemiddelde wachttijd voor hulpradar matches in Tilburg is opgelopen tot 5.2 dagen. Dit is boven het landelijk gemiddelde van 2.3 dagen.',
    type: 'warning',
    metric: '5.2 dagen',
    change: '+2.9 dagen',
    app: 'Hulpradar',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Work plaatsingen nemen toe',
    description: '456 mensen zijn succesvol geplaatst via Konsensi Work, een stijging van 18% ten opzichte van vorige periode.',
    type: 'positive',
    metric: '456 plaatsingen',
    change: '+18%',
    app: 'Work',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Totale schuld daalt',
    description: 'De totale beheerde schuld is met 8% gedaald, wat wijst op effectieve afbetalingsregelingen.',
    type: 'positive',
    metric: '€4.2M totaal',
    change: '-8%',
    app: 'Jongeren',
    priority: 'high',
  },
  {
    id: '5',
    title: 'Huur achterstand meest voorkomend',
    description: '25% van alle hulpradar aanvragen betreft huur achterstanden. Overweeg gerichte campagnes.',
    type: 'info',
    metric: '312 meldingen',
    change: '',
    app: 'Hulpradar',
    priority: 'medium',
  },
  {
    id: '6',
    title: 'Match succes rate hoog',
    description: 'De hulpradar match rate staat op 72%, wat boven de doelstelling van 65% ligt.',
    type: 'positive',
    metric: '72%',
    change: '+5%',
    app: 'Hulpradar',
    priority: 'low',
  },
];

const goals: Goal[] = [
  { id: '1', title: 'Jongeren geholpen', current: 1847, target: 2500, unit: 'personen', deadline: 'Q1 2026' },
  { id: '2', title: 'Schuld afbetaald', current: 890000, target: 1500000, unit: '€', deadline: 'Q2 2026' },
  { id: '3', title: 'Work plaatsingen', current: 456, target: 750, unit: 'plaatsingen', deadline: 'Q1 2026' },
  { id: '4', title: 'Gemeentes actief', current: 48, target: 75, unit: 'gemeentes', deadline: 'Q4 2026' },
];

const typeConfig = {
  positive: { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' },
  negative: { icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800' },
  warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
  info: { icon: Lightbulb, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
};

const appColors: Record<string, string> = {
  Jongeren: 'bg-[#3D7B4C]/10 text-[#3D7B4C]',
  Hulpradar: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Schuldenradar: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Work: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Bewindvoerders: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

export default function InzichtenPage() {
  const [filter, setFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredInsights = insights.filter((insight) => {
    const matchesApp = filter === 'all' || insight.app === filter;
    const matchesPriority = priorityFilter === 'all' || insight.priority === priorityFilter;
    return matchesApp && matchesPriority;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `€${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return num.toLocaleString('nl-NL');
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950">
      <Navbar />

      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[#111827] dark:text-white">Inzichten & Analytics</h1>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium rounded-full">
              AI Powered
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Automatische inzichten en aanbevelingen op basis van platform data
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-[20px] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Positieve trends</span>
            </div>
            <p className="text-2xl font-bold text-[#111827] dark:text-white">
              {insights.filter((i) => i.type === 'positive').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[20px] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Aandachtspunten</span>
            </div>
            <p className="text-2xl font-bold text-[#111827] dark:text-white">
              {insights.filter((i) => i.type === 'warning').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[20px] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Suggesties</span>
            </div>
            <p className="text-2xl font-bold text-[#111827] dark:text-white">
              {insights.filter((i) => i.type === 'info').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[20px] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Hoge prioriteit</span>
            </div>
            <p className="text-2xl font-bold text-[#111827] dark:text-white">
              {insights.filter((i) => i.priority === 'high').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Insights List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#111827] dark:text-white">Inzichten</h2>
                <div className="flex gap-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="all">Alle apps</option>
                    <option value="Jongeren">Jongeren</option>
                    <option value="Hulpradar">Hulpradar</option>
                    <option value="Schuldenradar">Schuldenradar</option>
                    <option value="Work">Work</option>
                  </select>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="all">Alle prioriteiten</option>
                    <option value="high">Hoog</option>
                    <option value="medium">Medium</option>
                    <option value="low">Laag</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredInsights.map((insight) => {
                  const config = typeConfig[insight.type];
                  const Icon = config.icon;
                  return (
                    <div
                      key={insight.id}
                      className={`p-4 rounded-xl border ${config.bg} ${config.border} cursor-pointer hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.bg}`}>
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{insight.title}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${appColors[insight.app]}`}>
                              {insight.app}
                            </span>
                            {insight.priority === 'high' && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                Hoog
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{insight.metric}</span>
                            {insight.change && (
                              <span className={`text-sm font-medium ${config.color}`}>{insight.change}</span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Goals & Targets */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-[#3D7B4C]" />
                <h2 className="text-lg font-semibold text-[#111827] dark:text-white">Doelstellingen</h2>
              </div>

              <div className="space-y-5">
                {goals.map((goal) => {
                  const progress = Math.min((goal.current / goal.target) * 100, 100);
                  return (
                    <div key={goal.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{goal.title}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{goal.deadline}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-gradient-to-r from-[#3D7B4C] to-[#8FD14F] rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatNumber(goal.current)} {goal.unit === '€' ? '' : goal.unit}</span>
                        <span>{formatNumber(goal.target)} {goal.unit === '€' ? '' : goal.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-[#111827] dark:text-white mb-4">Belangrijkste Metrics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Totaal gebruikers</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">8.456</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Euro className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Schuld beheerd</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">€4.2M</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Gem. afhandeltijd</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">2.4 dagen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
