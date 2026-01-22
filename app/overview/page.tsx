'use client';

import { Navbar } from '@/components/dashboard/Navbar';
import { AppOverviewCard } from '@/components/overview/AppOverviewCard';
import { TotalStatsChart } from '@/components/overview/TotalStatsChart';
import { RecentActivityFeed } from '@/components/overview/RecentActivityFeed';
import { QuickStatsGrid } from '@/components/overview/QuickStatsGrid';
import { Users, Radar, Search, Briefcase, UserCheck } from 'lucide-react';

// Quick Stats Data
const quickStatsData = [
  {
    id: '1',
    label: 'Totaal Gebruikers',
    value: '8.456',
    change: '+12% deze maand',
    changeType: 'positive' as const,
    icon: 'users' as const,
  },
  {
    id: '2',
    label: 'Totale Schuld Beheerd',
    value: '€4.2M',
    change: '-8% t.o.v. vorige maand',
    changeType: 'positive' as const,
    icon: 'euro' as const,
  },
  {
    id: '3',
    label: 'Succesvolle Matches',
    value: '2.126',
    change: '+23% deze maand',
    changeType: 'positive' as const,
    icon: 'check' as const,
  },
  {
    id: '4',
    label: 'Gem. Verwerkingstijd',
    value: '2.4d',
    change: '-0.3d sneller',
    changeType: 'positive' as const,
    icon: 'clock' as const,
  },
  {
    id: '5',
    label: 'Actieve Gemeentes',
    value: '48',
    change: '+3 nieuwe',
    changeType: 'positive' as const,
    icon: 'target' as const,
  },
  {
    id: '6',
    label: 'Plaatsingen (Work)',
    value: '456',
    change: '+18% deze maand',
    changeType: 'positive' as const,
    icon: 'trending' as const,
  },
];

// Apps Data
const appsData = [
  {
    name: 'Jongeren',
    description: 'Schuldhulp voor jongeren',
    href: '/dashboard',
    icon: <Users className="w-6 h-6" />,
    color: '#3D7B4C',
    bgColor: '#3D7B4C15',
    stats: [
      { label: 'Actieve Gebruikers', value: '1.847', trend: 'up' as const },
      { label: 'Totale Schuld', value: '€1.2M', trend: 'down' as const },
      { label: 'Gem. Schuld', value: '€2.340', trend: 'down' as const },
      { label: 'Afgerond', value: '234', trend: 'up' as const },
    ],
  },
  {
    name: 'Bewindvoerders',
    description: 'Hulpverlener beheer',
    href: '/bewindvoerders',
    icon: <UserCheck className="w-6 h-6" />,
    color: '#8B5CF6',
    bgColor: '#8B5CF615',
    stats: [
      { label: 'Bewindvoerders', value: '24', trend: 'up' as const },
      { label: 'Cliënten', value: '156', trend: 'up' as const },
      { label: 'Gem. per Coach', value: '6.5', trend: 'neutral' as const },
      { label: 'Totale Schuld', value: '€234K', trend: 'down' as const },
    ],
  },
  {
    name: 'Hulpradar',
    description: 'Schuldhulp matching',
    href: '/hulpradar',
    icon: <Radar className="w-6 h-6" />,
    color: '#3B82F6',
    bgColor: '#3B82F615',
    stats: [
      { label: 'Radar Ingevuld', value: '1.247', trend: 'up' as const },
      { label: 'Matches', value: '892', trend: 'up' as const },
      { label: 'Succes Rate', value: '72%', trend: 'up' as const },
      { label: 'Gem. Wachttijd', value: '2.3d', trend: 'down' as const },
    ],
  },
  {
    name: 'Schuldenradar',
    description: 'Schulden opsporing',
    href: '/schuldenradar',
    icon: <Search className="w-6 h-6" />,
    color: '#EF4444',
    bgColor: '#EF444415',
    stats: [
      { label: 'Scans', value: '3.456', trend: 'up' as const },
      { label: 'Schulden Gevonden', value: '1.892', trend: 'up' as const },
      { label: 'Totaal Ontdekt', value: '€2.4M', trend: 'up' as const },
      { label: 'Gem. per Scan', value: '€1.340', trend: 'neutral' as const },
    ],
  },
  {
    name: 'Work',
    description: 'Werk vinden',
    href: '/work',
    icon: <Briefcase className="w-6 h-6" />,
    color: '#F59E0B',
    bgColor: '#F59E0B15',
    stats: [
      { label: 'Werkzoekenden', value: '2.156', trend: 'up' as const },
      { label: 'Vacatures', value: '847', trend: 'up' as const },
      { label: 'Geplaatst', value: '456', trend: 'up' as const },
      { label: 'Succes Rate', value: '37%', trend: 'up' as const },
    ],
  },
];

// Platform Activity Data
const platformActivityData = [
  { maand: 'Jan', jongeren: 1200, hulpradar: 650, schuldenradar: 2800, work: 1500 },
  { maand: 'Feb', jongeren: 1350, hulpradar: 720, schuldenradar: 2950, work: 1650 },
  { maand: 'Mrt', jongeren: 1480, hulpradar: 810, schuldenradar: 3100, work: 1780 },
  { maand: 'Apr', jongeren: 1420, hulpradar: 780, schuldenradar: 3050, work: 1720 },
  { maand: 'Mei', jongeren: 1580, hulpradar: 890, schuldenradar: 3280, work: 1890 },
  { maand: 'Jun', jongeren: 1650, hulpradar: 920, schuldenradar: 3350, work: 1950 },
  { maand: 'Jul', jongeren: 1520, hulpradar: 850, schuldenradar: 3180, work: 1820 },
  { maand: 'Aug', jongeren: 1480, hulpradar: 820, schuldenradar: 3100, work: 1750 },
  { maand: 'Sep', jongeren: 1720, hulpradar: 980, schuldenradar: 3450, work: 2050 },
  { maand: 'Okt', jongeren: 1780, hulpradar: 1050, schuldenradar: 3520, work: 2120 },
  { maand: 'Nov', jongeren: 1820, hulpradar: 1120, schuldenradar: 3580, work: 2150 },
  { maand: 'Dec', jongeren: 1847, hulpradar: 1247, schuldenradar: 3456, work: 2156 },
];

// Recent Activity Data
const recentActivityData = [
  {
    id: '1',
    type: 'hulpradar' as const,
    action: 'match' as const,
    description: 'Nieuwe match in Amsterdam',
    timestamp: '2 minuten geleden',
    details: 'Koppeling met Gemeente Amsterdam Schuldhulp',
  },
  {
    id: '2',
    type: 'work' as const,
    action: 'placement' as const,
    description: 'Plaatsing bij Albert Heijn',
    timestamp: '15 minuten geleden',
    details: 'Jan K. - Vakkenvuller, Tijdelijk contract',
  },
  {
    id: '3',
    type: 'schuldenradar' as const,
    action: 'scan' as const,
    description: '5 schulden gevonden',
    timestamp: '32 minuten geleden',
    details: 'Totaal €4.560 - CJIB, Belastingdienst, Ziggo',
  },
  {
    id: '4',
    type: 'jongeren' as const,
    action: 'new_user' as const,
    description: 'Nieuwe aanmelding Rotterdam',
    timestamp: '45 minuten geleden',
    details: 'Schuldbedrag: €3.200',
  },
  {
    id: '5',
    type: 'bewindvoerders' as const,
    action: 'completed' as const,
    description: 'Dossier afgerond',
    timestamp: '1 uur geleden',
    details: 'Client: Maria V. - Bewindvoerder: Jan de Vries',
  },
  {
    id: '6',
    type: 'hulpradar' as const,
    action: 'new_user' as const,
    description: 'Radar ingevuld in Den Haag',
    timestamp: '1 uur geleden',
    details: 'Probleem: Huur achterstand - €2k-5k',
  },
  {
    id: '7',
    type: 'schuldenradar' as const,
    action: 'alert' as const,
    description: 'Hoge schuld gedetecteerd',
    timestamp: '2 uur geleden',
    details: 'Totaal €15.680 - 7 schuldeisers',
  },
  {
    id: '8',
    type: 'work' as const,
    action: 'match' as const,
    description: 'Match gevonden voor Sophie W.',
    timestamp: '2 uur geleden',
    details: 'Vacature: Klantenservice bij Coolblue',
  },
];

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Konsensi Platform Overzicht</h1>
            <span className="px-3 py-1 bg-gradient-to-r from-[#3D7B4C] to-[#8FD14F] text-white text-xs font-medium rounded-full">
              Algemeen Dashboard
            </span>
          </div>
          <p className="text-[#888888]">
            Totaaloverzicht van alle Konsensi applicaties en hun prestaties
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <QuickStatsGrid stats={quickStatsData} />
        </div>

        {/* Apps Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Applicaties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {appsData.map((app) => (
              <AppOverviewCard
                key={app.name}
                name={app.name}
                description={app.description}
                href={app.href}
                icon={app.icon}
                color={app.color}
                bgColor={app.bgColor}
                stats={app.stats}
              />
            ))}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TotalStatsChart data={platformActivityData} />
          </div>
          <RecentActivityFeed activities={recentActivityData} />
        </div>
      </main>
    </div>
  );
}
