'use client';

import { Navbar } from '@/components/dashboard/Navbar';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { JobSeekersChart } from '@/components/work/JobSeekersChart';
import { VacanciesBySectorChart } from '@/components/work/VacanciesBySectorChart';
import { JobSeekersByRegionChart } from '@/components/work/JobSeekersByRegionChart';
import { ContractTypesChart } from '@/components/work/ContractTypesChart';
import { TimeToPlacementChart } from '@/components/work/TimeToPlacementChart';
import { ApplicationsChart } from '@/components/work/ApplicationsChart';
import { PartnerEmployers } from '@/components/work/PartnerEmployers';
import { PlacementsTable } from '@/components/work/PlacementsTable';
import { WorkInsights } from '@/components/work/WorkInsights';

// KPI Data
const workKpiData = [
  {
    id: 'werkzoekenden',
    label: 'ACTIEVE WERKZOEKENDEN',
    value: '2.156',
    icon: 'users',
    featured: true,
    trend: 'up' as const,
  },
  {
    id: 'vacatures',
    label: 'VACATURES BESCHIKBAAR',
    value: '847',
    icon: 'briefcase',
    featured: false,
    sparklineData: [45, 52, 48, 55, 60, 58, 65, 70, 68, 72, 78, 85],
    trend: 'up' as const,
  },
  {
    id: 'matches',
    label: 'MATCHES GEMAAKT',
    value: '1.234',
    icon: 'check',
    featured: false,
    sparklineData: [30, 35, 38, 42, 45, 50, 48, 55, 60, 65, 70, 75],
    trend: 'up' as const,
  },
  {
    id: 'geplaatst',
    label: 'GEPLAATST',
    value: '456',
    icon: 'award',
    featured: false,
    sparklineData: [15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 45],
    trend: 'up' as const,
  },
  {
    id: 'succesrate',
    label: 'SUCCESRATE',
    value: '37%',
    icon: 'trending-up',
    featured: false,
    sparklineData: [32, 33, 34, 35, 36, 35, 36, 37, 36, 37, 38, 37],
    trend: 'up' as const,
  },
];

// Job Seekers Chart Data
const jobSeekersData = [
  { maand: 'Jan', werkzoekenden: 180, geplaatst: 45 },
  { maand: 'Feb', werkzoekenden: 195, geplaatst: 52 },
  { maand: 'Mrt', werkzoekenden: 210, geplaatst: 58 },
  { maand: 'Apr', werkzoekenden: 225, geplaatst: 62 },
  { maand: 'Mei', werkzoekenden: 240, geplaatst: 68 },
  { maand: 'Jun', werkzoekenden: 255, geplaatst: 75 },
  { maand: 'Jul', werkzoekenden: 230, geplaatst: 70 },
  { maand: 'Aug', werkzoekenden: 220, geplaatst: 65 },
  { maand: 'Sep', werkzoekenden: 260, geplaatst: 78 },
  { maand: 'Okt', werkzoekenden: 280, geplaatst: 85 },
  { maand: 'Nov', werkzoekenden: 295, geplaatst: 92 },
  { maand: 'Dec', werkzoekenden: 270, geplaatst: 88 },
];

// Vacancies by Sector Data
const vacanciesBySectorData = [
  { sector: 'Logistiek', vacatures: 156, color: '#8B5CF6' },
  { sector: 'Horeca', vacatures: 142, color: '#F97316' },
  { sector: 'Retail', vacatures: 128, color: '#3B82F6' },
  { sector: 'Productie', vacatures: 115, color: '#EAB308' },
  { sector: 'Schoonmaak', vacatures: 98, color: '#06B6D4' },
  { sector: 'Zorg', vacatures: 87, color: '#EC4899' },
  { sector: 'Administratie', vacatures: 72, color: '#6B7280' },
  { sector: 'Overig', vacatures: 49, color: '#64748B' },
];

// Job Seekers by Region Data
const jobSeekersByRegionData = [
  { regio: 'Amsterdam', werkzoekenden: 456 },
  { regio: 'Rotterdam', werkzoekenden: 389 },
  { regio: 'Den Haag', werkzoekenden: 312 },
  { regio: 'Utrecht', werkzoekenden: 278 },
  { regio: 'Eindhoven', werkzoekenden: 234 },
  { regio: 'Groningen', werkzoekenden: 187 },
  { regio: 'Tilburg', werkzoekenden: 156 },
  { regio: 'Overig', werkzoekenden: 144 },
];

// Contract Types Data
const contractTypesData = [
  { type: 'Tijdelijk', value: 165, color: '#3B82F6' },
  { type: 'Uitzend', value: 124, color: '#F97316' },
  { type: 'Vast', value: 89, color: '#22c55e' },
  { type: 'Oproep', value: 52, color: '#8B5CF6' },
  { type: 'Stage', value: 26, color: '#EC4899' },
];

// Time to Placement Data
const timeToPlacementData = [
  { range: '<1 week', count: 45 },
  { range: '1-2 weken', count: 89 },
  { range: '2-4 weken', count: 125 },
  { range: '1-2 mnd', count: 98 },
  { range: '2-3 mnd', count: 67 },
  { range: '3+ mnd', count: 32 },
];

// Applications Data
const applicationsData = [
  { maand: 'Jan', gemiddeld: 10.2 },
  { maand: 'Feb', gemiddeld: 11.5 },
  { maand: 'Mrt', gemiddeld: 12.1 },
  { maand: 'Apr', gemiddeld: 11.8 },
  { maand: 'Mei', gemiddeld: 13.2 },
  { maand: 'Jun', gemiddeld: 12.5 },
  { maand: 'Jul', gemiddeld: 11.9 },
  { maand: 'Aug', gemiddeld: 10.8 },
  { maand: 'Sep', gemiddeld: 12.8 },
  { maand: 'Okt', gemiddeld: 13.5 },
  { maand: 'Nov', gemiddeld: 14.2 },
  { maand: 'Dec', gemiddeld: 12.0 },
];

// Partner Employers Data
const partnerEmployersData = [
  { id: '1', naam: 'Albert Heijn', logo: 'AH', sector: 'Retail', vacatures: 45, geplaatst: 28 },
  { id: '2', naam: 'PostNL', logo: 'PNL', sector: 'Logistiek', vacatures: 38, geplaatst: 22 },
  { id: '3', naam: 'Jumbo', logo: 'JB', sector: 'Retail', vacatures: 32, geplaatst: 18 },
  { id: '4', naam: 'DHL', logo: 'DHL', sector: 'Logistiek', vacatures: 28, geplaatst: 15 },
  { id: '5', naam: 'McDonalds', logo: 'MC', sector: 'Horeca', vacatures: 24, geplaatst: 14 },
  { id: '6', naam: 'Hema', logo: 'HM', sector: 'Retail', vacatures: 22, geplaatst: 12 },
  { id: '7', naam: 'Schiphol', logo: 'SP', sector: 'Logistiek', vacatures: 20, geplaatst: 11 },
  { id: '8', naam: 'KFC', logo: 'KFC', sector: 'Horeca', vacatures: 18, geplaatst: 10 },
];

// Placements Data
const placementsData = [
  {
    id: '1',
    datum: '22 jan 2026',
    werkzoekende: { naam: 'Mohammed El Amrani', avatar: 'ME' },
    functie: 'Orderpicker',
    werkgever: 'PostNL',
    sector: 'Logistiek' as const,
    contractType: 'Tijdelijk' as const,
    salarisRange: '€2.100 - €2.400',
    tijdTotPlaatsing: '2 weken',
  },
  {
    id: '2',
    datum: '21 jan 2026',
    werkzoekende: { naam: 'Lisa van der Berg', avatar: 'LB' },
    functie: 'Caissière',
    werkgever: 'Albert Heijn',
    sector: 'Retail' as const,
    contractType: 'Vast' as const,
    salarisRange: '€1.900 - €2.200',
    tijdTotPlaatsing: '3 weken',
  },
  {
    id: '3',
    datum: '20 jan 2026',
    werkzoekende: { naam: 'Kevin de Groot', avatar: 'KG' },
    functie: 'Koerier',
    werkgever: 'DHL',
    sector: 'Logistiek' as const,
    contractType: 'Uitzend' as const,
    salarisRange: '€2.200 - €2.500',
    tijdTotPlaatsing: '1 week',
  },
  {
    id: '4',
    datum: '19 jan 2026',
    werkzoekende: { naam: 'Fatima Benali', avatar: 'FB' },
    functie: 'Schoonmaker',
    werkgever: 'Hago',
    sector: 'Schoonmaak' as const,
    contractType: 'Oproep' as const,
    salarisRange: '€1.800 - €2.000',
    tijdTotPlaatsing: '4 weken',
  },
  {
    id: '5',
    datum: '18 jan 2026',
    werkzoekende: { naam: 'Thomas Jansen', avatar: 'TJ' },
    functie: 'Medewerker Bediening',
    werkgever: 'McDonalds',
    sector: 'Horeca' as const,
    contractType: 'Tijdelijk' as const,
    salarisRange: '€1.700 - €1.900',
    tijdTotPlaatsing: '1 week',
  },
  {
    id: '6',
    datum: '17 jan 2026',
    werkzoekende: { naam: 'Priya Sharma', avatar: 'PS' },
    functie: 'Magazijnmedewerker',
    werkgever: 'Jumbo',
    sector: 'Retail' as const,
    contractType: 'Vast' as const,
    salarisRange: '€2.000 - €2.300',
    tijdTotPlaatsing: '5 weken',
  },
  {
    id: '7',
    datum: '16 jan 2026',
    werkzoekende: { naam: 'Daan Peters', avatar: 'DP' },
    functie: 'Productie Medewerker',
    werkgever: 'Heineken',
    sector: 'Productie' as const,
    contractType: 'Tijdelijk' as const,
    salarisRange: '€2.300 - €2.600',
    tijdTotPlaatsing: '2 weken',
  },
  {
    id: '8',
    datum: '15 jan 2026',
    werkzoekende: { naam: 'Sophie de Vries', avatar: 'SV' },
    functie: 'Administratief Medewerker',
    werkgever: 'Gemeente Amsterdam',
    sector: 'Administratie' as const,
    contractType: 'Stage' as const,
    salarisRange: '€800 - €1.000',
    tijdTotPlaatsing: '6 weken',
  },
];

// Work Insights Data
const workInsightsData = [
  {
    id: '1',
    text: 'Logistiek sector heeft hoogste vraag (+34%)',
    type: 'positive' as const,
    metric: 'Meest gevraagde sector',
  },
  {
    id: '2',
    text: 'Gemiddelde tijd tot plaatsing: 3.2 weken',
    type: 'neutral' as const,
    metric: '-0.5 weken vs vorige maand',
  },
  {
    id: '3',
    text: '78% vindt werk binnen 2 maanden',
    type: 'info' as const,
    metric: 'Succespercentage werkzoekenden',
  },
];

export default function WorkPage() {
  const contractTotal = contractTypesData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar />

      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[#111827]">Konsensi Work</h1>
            <span className="px-3 py-1 bg-[#3D7B4C]/10 text-[#3D7B4C] text-xs font-medium rounded-full">
              Werkgelegenheid
            </span>
          </div>
          <p className="text-gray-500">
            Overzicht van werkzoekenden, vacatures en plaatsingen
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {workKpiData.map((kpi) => (
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
          <JobSeekersChart data={jobSeekersData} />
        </div>

        {/* Second Row - 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <VacanciesBySectorChart data={vacanciesBySectorData} />
          <JobSeekersByRegionChart data={jobSeekersByRegionData} />
          <ContractTypesChart data={contractTypesData} total={contractTotal} />
        </div>

        {/* Third Row - 2 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TimeToPlacementChart data={timeToPlacementData} />
          <ApplicationsChart data={applicationsData} average={12} />
        </div>

        {/* Work Insights */}
        <div className="mb-8">
          <WorkInsights insights={workInsightsData} />
        </div>

        {/* Partner Employers */}
        <div className="mb-8">
          <PartnerEmployers partners={partnerEmployersData} />
        </div>

        {/* Placements Table */}
        <PlacementsTable placements={placementsData} />
      </main>
    </div>
  );
}
