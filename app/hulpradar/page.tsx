'use client';

import { Navbar } from '@/components/dashboard/Navbar';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { RadarSubmissionsChart } from '@/components/hulpradar/RadarSubmissionsChart';
import { TopMunicipalitiesChart } from '@/components/hulpradar/TopMunicipalitiesChart';
import { MatchSuccessChart } from '@/components/hulpradar/MatchSuccessChart';
import { ProblemCategoriesChart } from '@/components/hulpradar/ProblemCategoriesChart';
import { OrganizationTypesChart } from '@/components/hulpradar/OrganizationTypesChart';
import { WaitTimeChart } from '@/components/hulpradar/WaitTimeChart';
import { RadarTable } from '@/components/hulpradar/RadarTable';
import { HulpradarInsights } from '@/components/hulpradar/HulpradarInsights';

// KPI Data
const hulpradarKpiData = [
  {
    id: 'radar',
    label: 'RADAR INGEVULD',
    value: '1.247',
    icon: 'radar',
    featured: true,
    trend: 'up' as const,
  },
  {
    id: 'matches',
    label: 'MATCHES GEMAAKT',
    value: '892',
    icon: 'link',
    featured: false,
    sparklineData: [65, 72, 78, 85, 92, 98, 105, 112, 118, 125, 132, 140],
    trend: 'up' as const,
  },
  {
    id: 'tijd',
    label: 'GEM. MATCH TIJD',
    value: '2.3 dagen',
    icon: 'clock',
    featured: false,
    sparklineData: [3.2, 3.0, 2.8, 2.9, 2.6, 2.5, 2.4, 2.3, 2.4, 2.3, 2.2, 2.3],
    trend: 'down' as const,
  },
  {
    id: 'gemeentes',
    label: 'ACTIEVE GEMEENTES',
    value: '48',
    icon: 'map-pin',
    featured: false,
    sparklineData: [32, 35, 38, 40, 42, 44, 45, 46, 47, 48, 48, 48],
    trend: 'up' as const,
  },
  {
    id: 'organisaties',
    label: 'HULPORGANISATIES',
    value: '156',
    icon: 'building',
    featured: false,
    sparklineData: [120, 125, 130, 135, 140, 145, 148, 150, 152, 154, 155, 156],
    trend: 'up' as const,
  },
];

// Radar Submissions Data
const radarSubmissionsData = [
  { maand: 'Jan', invullingen: 78 },
  { maand: 'Feb', invullingen: 85 },
  { maand: 'Mrt', invullingen: 92 },
  { maand: 'Apr', invullingen: 88 },
  { maand: 'Mei', invullingen: 105 },
  { maand: 'Jun', invullingen: 112 },
  { maand: 'Jul', invullingen: 98 },
  { maand: 'Aug', invullingen: 89 },
  { maand: 'Sep', invullingen: 118 },
  { maand: 'Okt', invullingen: 132 },
  { maand: 'Nov', invullingen: 125 },
  { maand: 'Dec', invullingen: 125 },
];

// Top Municipalities Data
const topMunicipalitiesData = [
  { gemeente: 'Amsterdam', aantal: 187 },
  { gemeente: 'Rotterdam', aantal: 156 },
  { gemeente: 'Den Haag', aantal: 134 },
  { gemeente: 'Utrecht', aantal: 98 },
  { gemeente: 'Eindhoven', aantal: 76 },
  { gemeente: 'Groningen', aantal: 65 },
  { gemeente: 'Tilburg', aantal: 54 },
];

// Match Success Data
const matchSuccessData = [
  { status: 'Gematcht', value: 892, color: '#22c55e' },
  { status: 'In behandeling', value: 234, color: '#F59E0B' },
  { status: 'Geen match', value: 121, color: '#9CA3AF' },
];

// Problem Categories Data
const problemCategoriesData = [
  { categorie: 'Huur achterstand', aantal: 312, color: '#3B82F6' },
  { categorie: 'Energieschulden', aantal: 256, color: '#F59E0B' },
  { categorie: 'Zorgverzekering', aantal: 198, color: '#EC4899' },
  { categorie: 'Belastingschuld', aantal: 176, color: '#EF4444' },
  { categorie: 'Leningen', aantal: 154, color: '#8B5CF6' },
  { categorie: 'Overig', aantal: 151, color: '#6B7280' },
];

// Organization Types Data
const organizationTypesData = [
  { type: 'Gemeente schuldhulp', aantal: 48, color: '#3D7B4C' },
  { type: 'Bewindvoerders', aantal: 42, color: '#3B82F6' },
  { type: 'Budgetcoaches', aantal: 28, color: '#F59E0B' },
  { type: 'NVVK leden', aantal: 22, color: '#8B5CF6' },
  { type: 'Vrijwilligersorg.', aantal: 16, color: '#EC4899' },
];

// Wait Time Data
const waitTimeData = [
  { gemeente: 'Amsterdam', dagen: 2.1 },
  { gemeente: 'Rotterdam', dagen: 2.8 },
  { gemeente: 'Den Haag', dagen: 1.9 },
  { gemeente: 'Utrecht', dagen: 3.2 },
  { gemeente: 'Eindhoven', dagen: 2.4 },
  { gemeente: 'Groningen', dagen: 4.1 },
  { gemeente: 'Tilburg', dagen: 5.2 },
];

// Radar Table Data
const radarTableData = [
  {
    id: '1',
    datum: '22 jan 2026',
    gemeente: 'Amsterdam',
    probleemType: 'Huur achterstand' as const,
    schuldBedrag: '€2k-5k',
    status: 'gematcht' as const,
    organisatie: 'Gemeente Amsterdam Schuldhulp',
    tijdTotMatch: '1 dag',
  },
  {
    id: '2',
    datum: '22 jan 2026',
    gemeente: 'Rotterdam',
    probleemType: 'Energieschulden' as const,
    schuldBedrag: '€1k-2k',
    status: 'zoekend' as const,
    organisatie: '-',
    tijdTotMatch: '-',
  },
  {
    id: '3',
    datum: '21 jan 2026',
    gemeente: 'Den Haag',
    probleemType: 'Belastingschuld' as const,
    schuldBedrag: '€5k-10k',
    status: 'gematcht' as const,
    organisatie: 'NVVK Partner Den Haag',
    tijdTotMatch: '2 dagen',
  },
  {
    id: '4',
    datum: '21 jan 2026',
    gemeente: 'Utrecht',
    probleemType: 'Zorgverzekering' as const,
    schuldBedrag: '€500-1k',
    status: 'gematcht' as const,
    organisatie: 'Budgetcoach Utrecht',
    tijdTotMatch: '3 dagen',
  },
  {
    id: '5',
    datum: '20 jan 2026',
    gemeente: 'Eindhoven',
    probleemType: 'Leningen' as const,
    schuldBedrag: '€10k+',
    status: 'geen_match' as const,
    organisatie: '-',
    tijdTotMatch: '-',
  },
  {
    id: '6',
    datum: '20 jan 2026',
    gemeente: 'Groningen',
    probleemType: 'Huur achterstand' as const,
    schuldBedrag: '€2k-5k',
    status: 'zoekend' as const,
    organisatie: '-',
    tijdTotMatch: '-',
  },
  {
    id: '7',
    datum: '19 jan 2026',
    gemeente: 'Amsterdam',
    probleemType: 'Overig' as const,
    schuldBedrag: '€1k-2k',
    status: 'gematcht' as const,
    organisatie: 'Schuldhulpmaatje Amsterdam',
    tijdTotMatch: '2 dagen',
  },
  {
    id: '8',
    datum: '19 jan 2026',
    gemeente: 'Tilburg',
    probleemType: 'Energieschulden' as const,
    schuldBedrag: '€500-1k',
    status: 'gematcht' as const,
    organisatie: 'Gemeente Tilburg Schuldhulp',
    tijdTotMatch: '5 dagen',
  },
];

// Hulpradar Insights Data
const hulpradarInsightsData = [
  {
    id: '1',
    text: '72% van de radar invullingen resulteert in een succesvolle match',
    type: 'positive' as const,
    metric: '+5% t.o.v. vorige maand',
  },
  {
    id: '2',
    text: 'Huur achterstand is het meest voorkomende probleem (25%)',
    type: 'info' as const,
    metric: '312 van 1.247 invullingen',
  },
  {
    id: '3',
    text: 'Tilburg heeft langste gemiddelde wachttijd (5.2 dagen)',
    type: 'warning' as const,
    metric: 'Landelijk gemiddelde: 2.3 dagen',
  },
];

export default function HulpradarPage() {
  const matchTotal = matchSuccessData.reduce((sum, item) => sum + item.value, 0);
  const orgTotal = organizationTypesData.reduce((sum, item) => sum + item.aantal, 0);
  const successRate = Math.round((matchSuccessData[0].value / matchTotal) * 100);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Konsensi Hulpradar</h1>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Schuldhulp Matching
            </span>
          </div>
          <p className="text-[#888888]">
            Match mensen met financiële problemen aan de juiste hulporganisatie in hun gemeente
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {hulpradarKpiData.map((kpi) => (
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

        {/* Main Chart */}
        <div className="mb-8">
          <RadarSubmissionsChart data={radarSubmissionsData} />
        </div>

        {/* Second Row - 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TopMunicipalitiesChart data={topMunicipalitiesData} />
          <MatchSuccessChart
            data={matchSuccessData}
            total={matchTotal}
            successRate={successRate}
          />
          <ProblemCategoriesChart data={problemCategoriesData} />
        </div>

        {/* Third Row - 2 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <OrganizationTypesChart data={organizationTypesData} total={orgTotal} />
          <WaitTimeChart data={waitTimeData} />
        </div>

        {/* Hulpradar Insights */}
        <div className="mb-8">
          <HulpradarInsights insights={hulpradarInsightsData} />
        </div>

        {/* Radar Table */}
        <RadarTable entries={radarTableData} />
      </main>
    </div>
  );
}
