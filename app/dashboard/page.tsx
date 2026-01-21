'use client';

import { BarChart3, Home, FileText, Settings, LogOut, Users, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  // Placeholder stats
  const stats = [
    {
      label: 'Totaal Gebruikers',
      value: '12.847',
      icon: Users,
      change: '+12%',
      positive: true,
    },
    {
      label: 'Actieve Zaken',
      value: '3.241',
      icon: TrendingUp,
      change: '+8%',
      positive: true,
    },
    {
      label: 'Openstaande Schuld',
      value: formatCurrency(2847500),
      icon: AlertCircle,
      change: '-5%',
      positive: true,
    },
    {
      label: 'Afgeronde Zaken',
      value: '892',
      icon: CheckCircle,
      change: '+23%',
      positive: true,
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-konsensi-green dark:bg-konsensi-mint/20">
              <BarChart3 className="h-6 w-6 text-white dark:text-konsensi-mint" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white">Konsensi</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Insights Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="px-4 space-y-1">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-konsensi-green/10 dark:bg-konsensi-mint/10 text-konsensi-green dark:text-konsensi-mint"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Overzicht</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FileText className="h-5 w-5" />
            <span>Rapporten</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Settings className="h-5 w-5" />
            <span>Instellingen</span>
          </a>
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200 dark:border-gray-800">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <LogOut className="h-5 w-5" />
            <span>Uitloggen</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-konsensi-dark">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard Overzicht
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welkom terug! Hier is een overzicht van alle Konsensi applicaties.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <stat.icon className="h-5 w-5 text-konsensi-green dark:text-konsensi-mint" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.positive
                        ? 'text-green-600 dark:text-konsensi-mint'
                        : 'text-konsensi-coral'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder for charts */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Schuld Trend
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600">
                Grafiek wordt hier weergegeven
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Applicatie Verdeling
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600">
                Grafiek wordt hier weergegeven
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
