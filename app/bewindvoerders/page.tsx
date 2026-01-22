'use client';

import { Navbar } from '@/components/dashboard/Navbar';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { ClientsPerCounselorChart } from '@/components/bewindvoerders/ClientsPerCounselorChart';
import { ClientsPerCityChart } from '@/components/bewindvoerders/ClientsPerCityChart';
import { CounselorsTable } from '@/components/bewindvoerders/CounselorsTable';
import { ClientsTable } from '@/components/bewindvoerders/ClientsTable';

// KPI Data
const bewindvoerdersKpiData = [
  {
    id: 'bewindvoerders',
    label: 'TOTAAL BEWINDVOERDERS',
    value: '24',
    icon: 'users',
    featured: true,
    trend: 'up' as const,
  },
  {
    id: 'clienten',
    label: 'TOTAAL CLIËNTEN',
    value: '156',
    icon: 'user-check',
    featured: false,
    sparklineData: [120, 125, 130, 138, 142, 148, 150, 152, 154, 155, 156, 156],
    trend: 'up' as const,
  },
  {
    id: 'gemiddeld',
    label: 'GEM. CLIËNTEN/COACH',
    value: '6.5',
    icon: 'bar-chart',
    featured: false,
    sparklineData: [5.8, 6.0, 6.2, 6.1, 6.3, 6.4, 6.5, 6.4, 6.5, 6.5, 6.5, 6.5],
    trend: 'neutral' as const,
  },
  {
    id: 'schuld',
    label: 'TOTALE SCHULD',
    value: '€234.500',
    icon: 'trending-down',
    featured: false,
    sparklineData: [280000, 275000, 268000, 260000, 255000, 248000, 245000, 242000, 238000, 236000, 235000, 234500],
    trend: 'down' as const,
  },
  {
    id: 'inkomen',
    label: 'TOTAAL INKOMEN',
    value: '€89.200',
    icon: 'wallet',
    featured: false,
    sparklineData: [78000, 80000, 82000, 83500, 85000, 86000, 87000, 87500, 88000, 88500, 89000, 89200],
    trend: 'up' as const,
  },
];

// Clients per Counselor Data
const clientsPerCounselorData = [
  { naam: 'Jan de Vries', clienten: 12 },
  { naam: 'Maria Bakker', clienten: 10 },
  { naam: 'Peter Jansen', clienten: 9 },
  { naam: 'Lisa van Dijk', clienten: 8 },
  { naam: 'Ahmed Hassan', clienten: 7 },
  { naam: 'Sophie Mulder', clienten: 6 },
  { naam: 'Thomas Berg', clienten: 5 },
];

// Clients per City Data
const clientsPerCityData = [
  { stad: 'Amsterdam', aantal: 45, color: '#3D7B4C' },
  { stad: 'Rotterdam', aantal: 38, color: '#3B82F6' },
  { stad: 'Den Haag', aantal: 28, color: '#8B5CF6' },
  { stad: 'Utrecht', aantal: 25, color: '#F59E0B' },
  { stad: 'Overig', aantal: 20, color: '#6B7280' },
];

// Counselors Data
const counselorsData = [
  {
    id: '1',
    naam: 'Jan de Vries',
    avatar: 'JV',
    rol: 'Bewindvoerder' as const,
    clienten: 12,
    totaleSchuld: 45600,
    totaalInkomen: 18500,
  },
  {
    id: '2',
    naam: 'Maria Bakker',
    avatar: 'MB',
    rol: 'Budgetcoach' as const,
    clienten: 10,
    totaleSchuld: 32400,
    totaalInkomen: 14200,
  },
  {
    id: '3',
    naam: 'Peter Jansen',
    avatar: 'PJ',
    rol: 'Bewindvoerder' as const,
    clienten: 9,
    totaleSchuld: 38900,
    totaalInkomen: 12800,
  },
  {
    id: '4',
    naam: 'Lisa van Dijk',
    avatar: 'LD',
    rol: 'Budgetcoach' as const,
    clienten: 8,
    totaleSchuld: 28700,
    totaalInkomen: 11500,
  },
  {
    id: '5',
    naam: 'Ahmed Hassan',
    avatar: 'AH',
    rol: 'Bewindvoerder' as const,
    clienten: 7,
    totaleSchuld: 25600,
    totaalInkomen: 9800,
  },
  {
    id: '6',
    naam: 'Sophie Mulder',
    avatar: 'SM',
    rol: 'Budgetcoach' as const,
    clienten: 6,
    totaleSchuld: 18900,
    totaalInkomen: 8400,
  },
];

// Clients Data
const clientsData = [
  {
    id: '1',
    naam: 'Kees Smit',
    avatar: 'KS',
    email: 'k.smit@email.nl',
    bewindvoerder: 'Jan de Vries',
    stad: 'Amsterdam',
    status: 'Actief' as const,
    schuld: 8500,
  },
  {
    id: '2',
    naam: 'Anna de Groot',
    avatar: 'AG',
    email: 'a.degroot@email.nl',
    bewindvoerder: 'Maria Bakker',
    stad: 'Rotterdam',
    status: 'Actief' as const,
    schuld: 4200,
  },
  {
    id: '3',
    naam: 'Mohammed El Amrani',
    avatar: 'ME',
    email: 'm.elamrani@email.nl',
    bewindvoerder: 'Peter Jansen',
    stad: 'Den Haag',
    status: 'In Behandeling' as const,
    schuld: 12400,
  },
  {
    id: '4',
    naam: 'Linda Visser',
    avatar: 'LV',
    email: 'l.visser@email.nl',
    bewindvoerder: 'Jan de Vries',
    stad: 'Amsterdam',
    status: 'Actief' as const,
    schuld: 6800,
  },
  {
    id: '5',
    naam: 'Robert van Berg',
    avatar: 'RB',
    email: 'r.vanberg@email.nl',
    bewindvoerder: 'Lisa van Dijk',
    stad: 'Utrecht',
    status: 'Afgerond' as const,
    schuld: 0,
  },
  {
    id: '6',
    naam: 'Fatima Yilmaz',
    avatar: 'FY',
    email: 'f.yilmaz@email.nl',
    bewindvoerder: 'Ahmed Hassan',
    stad: 'Rotterdam',
    status: 'Actief' as const,
    schuld: 5600,
  },
  {
    id: '7',
    naam: 'Pieter Hendriks',
    avatar: 'PH',
    email: 'p.hendriks@email.nl',
    bewindvoerder: 'Sophie Mulder',
    stad: 'Amsterdam',
    status: 'In Behandeling' as const,
    schuld: 9200,
  },
  {
    id: '8',
    naam: 'Sandra Vermeer',
    avatar: 'SV',
    email: 's.vermeer@email.nl',
    bewindvoerder: 'Maria Bakker',
    stad: 'Den Haag',
    status: 'Actief' as const,
    schuld: 3400,
  },
];

export default function BewindvoerdersPage() {
  const cityTotal = clientsPerCityData.reduce((sum, item) => sum + item.aantal, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Bewindvoerders & Budgetcoaches</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              Hulpverleners
            </span>
          </div>
          <p className="text-[#888888]">
            Overzicht van alle hulpverleners en hun cliënten
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {bewindvoerdersKpiData.map((kpi) => (
            <KpiCard
              key={kpi.id}
              label={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
              featured={kpi.featured}
              sparklineData={kpi.sparklineData}
              trend={kpi.trend}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ClientsPerCounselorChart data={clientsPerCounselorData} />
          <ClientsPerCityChart data={clientsPerCityData} total={cityTotal} />
        </div>

        {/* Counselors Table */}
        <div className="mb-8">
          <CounselorsTable counselors={counselorsData} />
        </div>

        {/* Clients Table */}
        <ClientsTable clients={clientsData} />
      </main>
    </div>
  );
}
