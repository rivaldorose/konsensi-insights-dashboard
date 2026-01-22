'use client';

import { Navbar } from '@/components/dashboard/Navbar';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { DiscoveredDebtsChart } from '@/components/schuldenradar/DiscoveredDebtsChart';
import { DebtSourcesChart } from '@/components/schuldenradar/DebtSourcesChart';
import { DebtDistributionChart } from '@/components/schuldenradar/DebtDistributionChart';
import { AwarenessImpactChart } from '@/components/schuldenradar/AwarenessImpactChart';
import { TopCreditorsCard } from '@/components/schuldenradar/TopCreditorsCard';
import { ScanResultsChart } from '@/components/schuldenradar/ScanResultsChart';
import { ScansTable } from '@/components/schuldenradar/ScansTable';
import { SchuldenradarInsights } from '@/components/schuldenradar/SchuldenradarInsights';

// KPI Data
const schuldenradarKpiData = [
  {
    id: 'scans',
    label: 'SCANS UITGEVOERD',
    value: '3.456',
    icon: 'search',
    featured: true,
    trend: 'up' as const,
  },
  {
    id: 'gevonden',
    label: 'SCHULDEN GEVONDEN',
    value: '1.892',
    icon: 'alert-triangle',
    featured: false,
    sparklineData: [120, 135, 142, 155, 148, 162, 175, 168, 182, 195, 188, 198],
    trend: 'up' as const,
    trendNegative: true,
  },
  {
    id: 'totaal',
    label: 'TOTAAL ONTDEKT',
    value: '€2.4M',
    icon: 'euro',
    featured: false,
    sparklineData: [150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315],
    trend: 'up' as const,
  },
  {
    id: 'gemiddeld',
    label: 'GEM. PER SCAN',
    value: '€1.340',
    icon: 'calculator',
    featured: false,
    sparklineData: [1200, 1250, 1280, 1320, 1350, 1310, 1340, 1360, 1380, 1340, 1350, 1340],
    trend: 'neutral' as const,
  },
  {
    id: 'geholpen',
    label: 'GEBRUIKERS GEHOLPEN',
    value: '987',
    icon: 'heart',
    featured: false,
    sparklineData: [65, 72, 78, 85, 92, 98, 105, 112, 118, 125, 132, 140],
    trend: 'up' as const,
  },
];

// Discovered Debts Chart Data
const discoveredDebtsData = [
  { maand: 'Jan', aantal: 145, bedrag: 185000 },
  { maand: 'Feb', aantal: 158, bedrag: 198000 },
  { maand: 'Mrt', aantal: 172, bedrag: 215000 },
  { maand: 'Apr', aantal: 165, bedrag: 208000 },
  { maand: 'Mei', aantal: 189, bedrag: 245000 },
  { maand: 'Jun', aantal: 178, bedrag: 232000 },
  { maand: 'Jul', aantal: 156, bedrag: 195000 },
  { maand: 'Aug', aantal: 142, bedrag: 178000 },
  { maand: 'Sep', aantal: 195, bedrag: 258000 },
  { maand: 'Okt', aantal: 212, bedrag: 285000 },
  { maand: 'Nov', aantal: 198, bedrag: 268000 },
  { maand: 'Dec', aantal: 182, bedrag: 242000 },
];

// Debt Sources Data
const debtSourcesData = [
  { bron: 'CJIB', aantal: 234, color: '#EF4444' },
  { bron: 'Belastingdienst', aantal: 189, color: '#3B82F6' },
  { bron: 'BKR', aantal: 167, color: '#8B5CF6' },
  { bron: 'Telecom', aantal: 145, color: '#06B6D4' },
  { bron: 'Energie', aantal: 132, color: '#F59E0B' },
  { bron: 'Webshops', aantal: 118, color: '#EC4899' },
  { bron: 'CAK', aantal: 98, color: '#22c55e' },
  { bron: 'Verzekeraars', aantal: 76, color: '#F97316' },
];

// Debt Distribution Data
const debtDistributionData = [
  { range: '€0-500', count: 312 },
  { range: '€500-1k', count: 456 },
  { range: '€1k-2.5k', count: 523 },
  { range: '€2.5k-5k', count: 298 },
  { range: '€5k-10k', count: 187 },
  { range: '€10k+', count: 116 },
];

// Awareness Impact Data
const awarenessImpactData = [
  { type: 'Reeds bekend', value: 624, color: '#9CA3AF' },
  { type: 'Nieuw ontdekt', value: 1268, color: '#EF4444' },
];

// Top Creditors Data
const topCreditorsData = [
  { rank: 1, naam: 'CJIB', aantal: 234, trend: 'up' as const },
  { rank: 2, naam: 'Belastingdienst', aantal: 189, trend: 'up' as const },
  { rank: 3, naam: 'Ziggo', aantal: 156 },
  { rank: 4, naam: 'Vattenfall', aantal: 128 },
  { rank: 5, naam: 'T-Mobile', aantal: 112 },
  { rank: 6, naam: 'Wehkamp', aantal: 98 },
  { rank: 7, naam: 'Zilveren Kruis', aantal: 76 },
];

// Scan Results Data
const scanResultsData = [
  { category: 'Geen schulden', value: 1145, color: '#22c55e' },
  { category: '1-2 schulden', value: 1234, color: '#F59E0B' },
  { category: '3-5 schulden', value: 756, color: '#F97316' },
  { category: '5+ schulden', value: 321, color: '#EF4444' },
];

// Scans Table Data
const scansData = [
  {
    id: '1',
    datum: '22 jan 2026',
    gebruiker: { naam: 'Jan K.', avatar: 'JK' },
    schuldenGevonden: 3,
    totaalBedrag: 4560,
    hoogsteSchuld: { bedrag: 2340, schuldeiser: 'CJIB' },
    bronnenGecheckt: ['BKR', 'CJIB', 'Belastingdienst', 'Energie', 'Telecom'],
    actieOndernomen: 'ja' as const,
  },
  {
    id: '2',
    datum: '22 jan 2026',
    gebruiker: { naam: 'Maria V.', avatar: 'MV' },
    schuldenGevonden: 0,
    totaalBedrag: 0,
    hoogsteSchuld: { bedrag: 0, schuldeiser: '-' },
    bronnenGecheckt: ['BKR', 'CJIB', 'Belastingdienst'],
    actieOndernomen: 'ja' as const,
  },
  {
    id: '3',
    datum: '21 jan 2026',
    gebruiker: { naam: 'Ahmed B.', avatar: 'AB' },
    schuldenGevonden: 5,
    totaalBedrag: 8920,
    hoogsteSchuld: { bedrag: 3450, schuldeiser: 'Belastingdienst' },
    bronnenGecheckt: ['BKR', 'CJIB', 'Belastingdienst', 'CAK', 'Telecom', 'Webshops'],
    actieOndernomen: 'in_behandeling' as const,
  },
  {
    id: '4',
    datum: '21 jan 2026',
    gebruiker: { naam: 'Lisa D.', avatar: 'LD' },
    schuldenGevonden: 1,
    totaalBedrag: 890,
    hoogsteSchuld: { bedrag: 890, schuldeiser: 'Ziggo' },
    bronnenGecheckt: ['BKR', 'Telecom'],
    actieOndernomen: 'ja' as const,
  },
  {
    id: '5',
    datum: '20 jan 2026',
    gebruiker: { naam: 'Peter M.', avatar: 'PM' },
    schuldenGevonden: 7,
    totaalBedrag: 15680,
    hoogsteSchuld: { bedrag: 5200, schuldeiser: 'CJIB' },
    bronnenGecheckt: ['BKR', 'CJIB', 'Belastingdienst', 'Energie', 'Telecom', 'Verzekeraars'],
    actieOndernomen: 'nee' as const,
  },
  {
    id: '6',
    datum: '20 jan 2026',
    gebruiker: { naam: 'Sophie W.', avatar: 'SW' },
    schuldenGevonden: 2,
    totaalBedrag: 2340,
    hoogsteSchuld: { bedrag: 1560, schuldeiser: 'Vattenfall' },
    bronnenGecheckt: ['BKR', 'Energie', 'Telecom'],
    actieOndernomen: 'in_behandeling' as const,
  },
  {
    id: '7',
    datum: '19 jan 2026',
    gebruiker: { naam: 'Thomas R.', avatar: 'TR' },
    schuldenGevonden: 4,
    totaalBedrag: 6780,
    hoogsteSchuld: { bedrag: 2890, schuldeiser: 'Wehkamp' },
    bronnenGecheckt: ['BKR', 'CJIB', 'Webshops', 'Telecom'],
    actieOndernomen: 'ja' as const,
  },
  {
    id: '8',
    datum: '19 jan 2026',
    gebruiker: { naam: 'Emma H.', avatar: 'EH' },
    schuldenGevonden: 0,
    totaalBedrag: 0,
    hoogsteSchuld: { bedrag: 0, schuldeiser: '-' },
    bronnenGecheckt: ['BKR', 'CJIB', 'Belastingdienst'],
    actieOndernomen: 'ja' as const,
  },
];

// Schuldenradar Insights Data
const schuldenradarInsightsData = [
  {
    id: '1',
    text: '67% van gebruikers ontdekte minstens 1 onbekende schuld',
    type: 'warning' as const,
    metric: 'Gemeten over alle scans',
  },
  {
    id: '2',
    text: 'Gemiddeld €1.340 aan verborgen schulden per persoon',
    type: 'info' as const,
    metric: 'Bij gebruikers met gevonden schulden',
  },
  {
    id: '3',
    text: 'CJIB boetes meest over het hoofd gezien',
    type: 'warning' as const,
    metric: '234 gevonden in laatste periode',
  },
];

export default function SchuldenradarPage() {
  const scanResultsTotal = scanResultsData.reduce((sum, item) => sum + item.value, 0);
  const awarenessTotal = awarenessImpactData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar />

      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[#111827]">Konsensi Schuldenradar</h1>
            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              Schulden Opsporing
            </span>
          </div>
          <p className="text-gray-500">
            Ontdek verborgen schulden en help gebruikers grip te krijgen op hun financiële situatie
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {schuldenradarKpiData.map((kpi) => (
            <KpiCard
              key={kpi.id}
              label={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
              featured={kpi.featured}
              sparklineData={kpi.sparklineData}
              trend={kpi.trend}
              trendNegative={kpi.trendNegative}
            />
          ))}
        </div>

        {/* Main Chart */}
        <div className="mb-8">
          <DiscoveredDebtsChart data={discoveredDebtsData} />
        </div>

        {/* Second Row - 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <DebtSourcesChart data={debtSourcesData} />
          <DebtDistributionChart data={debtDistributionData} />
          <AwarenessImpactChart
            data={awarenessImpactData}
            total={awarenessTotal}
            knownBefore={624}
            discoveredNew={1268}
          />
        </div>

        {/* Third Row - 2 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TopCreditorsCard creditors={topCreditorsData} />
          <ScanResultsChart data={scanResultsData} total={scanResultsTotal} />
        </div>

        {/* Schuldenradar Insights */}
        <div className="mb-8">
          <SchuldenradarInsights insights={schuldenradarInsightsData} />
        </div>

        {/* Scans Table */}
        <ScansTable scans={scansData} />
      </main>
    </div>
  );
}
