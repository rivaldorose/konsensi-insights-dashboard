// Mock data for Konsensi Insights Dashboard

export const userGrowthData = [
  { month: 'Jan', users: 45 },
  { month: 'Feb', users: 52 },
  { month: 'Mar', users: 61 },
  { month: 'Apr', users: 67 },
  { month: 'May', users: 78 },
  { month: 'Jun', users: 89 },
  { month: 'Jul', users: 102 },
  { month: 'Aug', users: 115 },
  { month: 'Sep', users: 128 },
  { month: 'Okt', users: 138 },
  { month: 'Nov', users: 149 },
  { month: 'Dec', users: 156 },
];

export const debtByTypeData = [
  { name: 'Telefoon', value: 45000, color: '#3D7B4C' },
  { name: 'Energie', value: 62000, color: '#8FD14F' },
  { name: 'Zorgverzekering', value: 38000, color: '#22c55e' },
  { name: 'Webshops', value: 51500, color: '#6b9b59' },
  { name: 'Overig', value: 38000, color: '#a3d977' },
];

export const kpiData = [
  {
    id: 'active-users',
    label: 'ACTIEVE GEBRUIKERS',
    value: '156',
    icon: 'users',
    featured: true,
    sparklineData: [45, 52, 61, 67, 78, 89, 102, 115, 128, 138, 149, 156],
    trend: 'up',
  },
  {
    id: 'total-debt',
    label: 'TOTALE SCHULD',
    value: '€234.500',
    icon: 'trending-down',
    featured: false,
    sparklineData: [280000, 275000, 268000, 260000, 252000, 248000, 242000, 238000, 234500],
    trend: 'down',
  },
  {
    id: 'total-paid',
    label: 'TOTAAL AFBETAALD',
    value: '€89.200',
    icon: 'wallet',
    featured: false,
    sparklineData: [45000, 52000, 58000, 65000, 72000, 78000, 82000, 86000, 89200],
    trend: 'up',
  },
  {
    id: 'transactions',
    label: 'TRANSACTIES',
    value: '1.247',
    icon: 'activity',
    featured: false,
    sparklineData: [890, 920, 980, 1020, 1080, 1120, 1160, 1200, 1247],
    trend: 'up',
  },
  {
    id: 'active-debts',
    label: 'ACTIEVE SCHULDEN',
    value: '89',
    icon: 'file-text',
    featured: false,
    sparklineData: [95, 94, 93, 92, 91, 90, 90, 89, 89],
    trend: 'neutral',
  },
  {
    id: 'avg-payment',
    label: 'GEM. BETALING',
    value: '€450',
    icon: 'credit-card',
    featured: false,
    sparklineData: [380, 395, 410, 420, 430, 435, 442, 448, 450],
    trend: 'up',
  },
];

export const comparisonData = {
  debtPaid: {
    title: 'Schuld Afbetaald',
    subtitle: 'vs vorige maand',
    percentage: '+33%',
    positive: true,
    thisMonth: 12500,
    lastMonth: 9400,
  },
  newDebts: {
    title: 'Nieuwe Schulden',
    subtitle: 'vs vorige maand',
    percentage: '-12%',
    positive: true, // Less new debt is positive
    thisMonth: 8800,
    lastMonth: 10000,
  },
  costIncomeRatio: {
    title: 'Kosten/Inkomsten Ratio',
    value: '67%',
    healthy: true,
  },
};

export const recentUsersData = [
  {
    id: '1',
    naam: 'Emma de Vries',
    email: 'emma.devries@email.nl',
    stad: 'Amsterdam',
    status: 'Actief',
    schuld: 4250,
    datum: '2024-01-15',
  },
  {
    id: '2',
    naam: 'Daan Bakker',
    email: 'daan.bakker@email.nl',
    stad: 'Rotterdam',
    status: 'In Behandeling',
    schuld: 8900,
    datum: '2024-01-14',
  },
  {
    id: '3',
    naam: 'Sophie Jansen',
    email: 'sophie.j@email.nl',
    stad: 'Utrecht',
    status: 'Actief',
    schuld: 2100,
    datum: '2024-01-14',
  },
  {
    id: '4',
    naam: 'Lucas van Dijk',
    email: 'lucas.vd@email.nl',
    stad: 'Den Haag',
    status: 'Actief',
    schuld: 5600,
    datum: '2024-01-13',
  },
  {
    id: '5',
    naam: 'Fleur Smit',
    email: 'fleur.smit@email.nl',
    stad: 'Eindhoven',
    status: 'In Behandeling',
    schuld: 12300,
    datum: '2024-01-13',
  },
  {
    id: '6',
    naam: 'Sem de Boer',
    email: 'sem.deboer@email.nl',
    stad: 'Groningen',
    status: 'Actief',
    schuld: 3400,
    datum: '2024-01-12',
  },
  {
    id: '7',
    naam: 'Lotte Visser',
    email: 'lotte.v@email.nl',
    stad: 'Tilburg',
    status: 'Actief',
    schuld: 1800,
    datum: '2024-01-12',
  },
  {
    id: '8',
    naam: 'Noah Mulder',
    email: 'noah.mulder@email.nl',
    stad: 'Almere',
    status: 'In Behandeling',
    schuld: 7500,
    datum: '2024-01-11',
  },
  {
    id: '9',
    naam: 'Julia Peters',
    email: 'julia.peters@email.nl',
    stad: 'Breda',
    status: 'Actief',
    schuld: 2900,
    datum: '2024-01-11',
  },
  {
    id: '10',
    naam: 'Finn de Groot',
    email: 'finn.dgroot@email.nl',
    stad: 'Nijmegen',
    status: 'Actief',
    schuld: 4100,
    datum: '2024-01-10',
  },
];

export const navTabs = [
  { id: 'dashboard', label: 'Dashboard', active: true },
  { id: 'bewindvoerders', label: 'Bewindvoerders', active: false },
  { id: 'audit', label: 'Audit Log', active: false },
  { id: 'export', label: 'Exporteer', active: false },
];

export const contentTabs = [
  { id: 'overzicht', label: 'Overzicht' },
  { id: 'gebruikers', label: 'Gebruikers' },
  { id: 'schulden', label: 'Schulden' },
  { id: 'betalingen', label: 'Betalingen' },
  { id: 'financien', label: 'Financiën' },
  { id: 'inzichten', label: 'Inzichten' },
];

// Audit Log types
export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';
export type AuditEntity = 'Gebruiker' | 'Schuld' | 'Transactie' | 'Betaling' | 'Doel';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  entity: AuditEntity;
  entityId: string;
  userId: string;
  userName: string;
  details: Record<string, unknown>;
}

export const auditLogData: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2026-01-22T14:35:00',
    action: 'CREATE',
    entity: 'Gebruiker',
    entityId: 'usr_8f7d6e5c4b3a',
    userId: 'admin-001',
    userName: 'Rivaldo Rose',
    details: { naam: 'Emma de Vries', email: 'emma.devries@email.nl', stad: 'Amsterdam' },
  },
  {
    id: 'log-002',
    timestamp: '2026-01-22T14:20:00',
    action: 'UPDATE',
    entity: 'Schuld',
    entityId: 'sch_2a3b4c5d6e7f',
    userId: 'admin-001',
    userName: 'Rivaldo Rose',
    details: { bedrag: { oud: 5000, nieuw: 4500 }, status: 'In Behandeling' },
  },
  {
    id: 'log-003',
    timestamp: '2026-01-22T13:55:00',
    action: 'CREATE',
    entity: 'Betaling',
    entityId: 'bet_9g8h7i6j5k4l',
    userId: 'bw-002',
    userName: 'Sophie Jansen',
    details: { bedrag: 250, methode: 'iDEAL', schuldId: 'sch_2a3b4c5d6e7f' },
  },
  {
    id: 'log-004',
    timestamp: '2026-01-22T13:30:00',
    action: 'DELETE',
    entity: 'Doel',
    entityId: 'doel_3m2n1o0p9q8r',
    userId: 'admin-001',
    userName: 'Rivaldo Rose',
    details: { reden: 'Doel bereikt', origineel_bedrag: 1500 },
  },
  {
    id: 'log-005',
    timestamp: '2026-01-22T12:45:00',
    action: 'UPDATE',
    entity: 'Gebruiker',
    entityId: 'usr_1a2b3c4d5e6f',
    userId: 'bw-003',
    userName: 'Daan Bakker',
    details: { telefoon: { oud: '06-12345678', nieuw: '06-87654321' } },
  },
  {
    id: 'log-006',
    timestamp: '2026-01-22T11:20:00',
    action: 'CREATE',
    entity: 'Transactie',
    entityId: 'trx_7s6t5u4v3w2x',
    userId: 'admin-001',
    userName: 'Rivaldo Rose',
    details: { type: 'Afschrijving', bedrag: 150, rekening: 'NL91ABNA0417164300' },
  },
  {
    id: 'log-007',
    timestamp: '2026-01-22T10:15:00',
    action: 'UPDATE',
    entity: 'Schuld',
    entityId: 'sch_4x5y6z7a8b9c',
    userId: 'bw-002',
    userName: 'Sophie Jansen',
    details: { prioriteit: { oud: 'Laag', nieuw: 'Hoog' }, notitie: 'Urgente follow-up nodig' },
  },
  {
    id: 'log-008',
    timestamp: '2026-01-22T09:30:00',
    action: 'CREATE',
    entity: 'Gebruiker',
    entityId: 'usr_0d1e2f3g4h5i',
    userId: 'admin-001',
    userName: 'Rivaldo Rose',
    details: { naam: 'Lucas van Dijk', email: 'lucas.vd@email.nl', stad: 'Den Haag' },
  },
  {
    id: 'log-009',
    timestamp: '2026-01-21T16:45:00',
    action: 'DELETE',
    entity: 'Transactie',
    entityId: 'trx_6j7k8l9m0n1o',
    userId: 'admin-001',
    userName: 'Rivaldo Rose',
    details: { reden: 'Dubbele boeking', origineel_bedrag: 75 },
  },
  {
    id: 'log-010',
    timestamp: '2026-01-21T15:20:00',
    action: 'UPDATE',
    entity: 'Betaling',
    entityId: 'bet_2p3q4r5s6t7u',
    userId: 'bw-003',
    userName: 'Daan Bakker',
    details: { status: { oud: 'In Behandeling', nieuw: 'Voltooid' } },
  },
  {
    id: 'log-011',
    timestamp: '2026-01-21T14:00:00',
    action: 'CREATE',
    entity: 'Doel',
    entityId: 'doel_8v9w0x1y2z3a',
    userId: 'bw-002',
    userName: 'Sophie Jansen',
    details: { naam: 'Telefoon schuld aflossen', doelbedrag: 800, deadline: '2026-06-01' },
  },
  {
    id: 'log-012',
    timestamp: '2026-01-21T12:30:00',
    action: 'UPDATE',
    entity: 'Gebruiker',
    entityId: 'usr_4b5c6d7e8f9g',
    userId: 'admin-001',
    userName: 'Rivaldo Rose',
    details: { status: { oud: 'Inactief', nieuw: 'Actief' }, notitie: 'Heraangemeld' },
  },
  {
    id: 'log-013',
    timestamp: '2026-01-21T11:15:00',
    action: 'CREATE',
    entity: 'Schuld',
    entityId: 'sch_0h1i2j3k4l5m',
    userId: 'bw-003',
    userName: 'Daan Bakker',
    details: { type: 'Energie', bedrag: 1250, schuldeiser: 'Eneco' },
  },
  {
    id: 'log-014',
    timestamp: '2026-01-21T10:00:00',
    action: 'DELETE',
    entity: 'Betaling',
    entityId: 'bet_6n7o8p9q0r1s',
    userId: 'admin-001',
    userName: 'Rivaldo Rose',
    details: { reden: 'Terugboeking aangevraagd', bedrag: 100 },
  },
  {
    id: 'log-015',
    timestamp: '2026-01-20T16:30:00',
    action: 'UPDATE',
    entity: 'Transactie',
    entityId: 'trx_2t3u4v5w6x7y',
    userId: 'bw-002',
    userName: 'Sophie Jansen',
    details: { categorie: { oud: 'Overig', nieuw: 'Zorgverzekering' } },
  },
  {
    id: 'log-016',
    timestamp: '2026-01-20T15:00:00',
    action: 'CREATE',
    entity: 'Betaling',
    entityId: 'bet_8z9a0b1c2d3e',
    userId: 'admin-001',
    userName: 'Rivaldo Rose',
    details: { bedrag: 500, methode: 'Bankoverschrijving', schuldId: 'sch_0h1i2j3k4l5m' },
  },
];

// Users by city data
export const usersByCityData = [
  { city: 'Amsterdam', users: 42 },
  { city: 'Rotterdam', users: 35 },
  { city: 'Den Haag', users: 28 },
  { city: 'Utrecht', users: 24 },
  { city: 'Eindhoven', users: 18 },
];

// Period comparison data
export const periodComparisonData = {
  newUsers: { value: 23, positive: true },
  totalDebt: { value: 12450, positive: false },
  activeDebts: { value: -5, positive: true },
};

// Extended users data with more fields
export type UserStatus = 'Actief' | 'Inactief' | 'Nieuw' | 'In Behandeling';

export interface ExtendedUser {
  id: string;
  naam: string;
  email: string;
  stad: string;
  status: UserStatus;
  totaleSchuld: number;
  inkomen: number;
  aangemeld: string;
}

export const allUsersData: ExtendedUser[] = [
  {
    id: 'usr-001',
    naam: 'Emma de Vries',
    email: 'emma.devries@email.nl',
    stad: 'Amsterdam',
    status: 'Actief',
    totaleSchuld: 4250,
    inkomen: 2800,
    aangemeld: '2025-11-15',
  },
  {
    id: 'usr-002',
    naam: 'Daan Bakker',
    email: 'daan.bakker@email.nl',
    stad: 'Rotterdam',
    status: 'In Behandeling',
    totaleSchuld: 8900,
    inkomen: 2200,
    aangemeld: '2025-12-01',
  },
  {
    id: 'usr-003',
    naam: 'Sophie Jansen',
    email: 'sophie.j@email.nl',
    stad: 'Utrecht',
    status: 'Actief',
    totaleSchuld: 2100,
    inkomen: 3100,
    aangemeld: '2025-10-20',
  },
  {
    id: 'usr-004',
    naam: 'Lucas van Dijk',
    email: 'lucas.vd@email.nl',
    stad: 'Den Haag',
    status: 'Nieuw',
    totaleSchuld: 5600,
    inkomen: 2500,
    aangemeld: '2026-01-10',
  },
  {
    id: 'usr-005',
    naam: 'Fleur Smit',
    email: 'fleur.smit@email.nl',
    stad: 'Eindhoven',
    status: 'In Behandeling',
    totaleSchuld: 12300,
    inkomen: 1900,
    aangemeld: '2025-09-05',
  },
  {
    id: 'usr-006',
    naam: 'Sem de Boer',
    email: 'sem.deboer@email.nl',
    stad: 'Amsterdam',
    status: 'Actief',
    totaleSchuld: 3400,
    inkomen: 2650,
    aangemeld: '2025-08-12',
  },
  {
    id: 'usr-007',
    naam: 'Lotte Visser',
    email: 'lotte.v@email.nl',
    stad: 'Rotterdam',
    status: 'Actief',
    totaleSchuld: 1800,
    inkomen: 3200,
    aangemeld: '2025-07-22',
  },
  {
    id: 'usr-008',
    naam: 'Noah Mulder',
    email: 'noah.mulder@email.nl',
    stad: 'Amsterdam',
    status: 'Inactief',
    totaleSchuld: 7500,
    inkomen: 2100,
    aangemeld: '2025-06-18',
  },
  {
    id: 'usr-009',
    naam: 'Julia Peters',
    email: 'julia.peters@email.nl',
    stad: 'Utrecht',
    status: 'Actief',
    totaleSchuld: 2900,
    inkomen: 2850,
    aangemeld: '2025-11-30',
  },
  {
    id: 'usr-010',
    naam: 'Finn de Groot',
    email: 'finn.dgroot@email.nl',
    stad: 'Den Haag',
    status: 'Nieuw',
    totaleSchuld: 4100,
    inkomen: 2400,
    aangemeld: '2026-01-18',
  },
  {
    id: 'usr-011',
    naam: 'Mila Hendriks',
    email: 'mila.h@email.nl',
    stad: 'Eindhoven',
    status: 'Actief',
    totaleSchuld: 6200,
    inkomen: 2750,
    aangemeld: '2025-10-05',
  },
  {
    id: 'usr-012',
    naam: 'Thijs van den Berg',
    email: 'thijs.vdb@email.nl',
    stad: 'Amsterdam',
    status: 'In Behandeling',
    totaleSchuld: 9800,
    inkomen: 2000,
    aangemeld: '2025-12-15',
  },
  {
    id: 'usr-013',
    naam: 'Sara Koning',
    email: 'sara.koning@email.nl',
    stad: 'Rotterdam',
    status: 'Actief',
    totaleSchuld: 3100,
    inkomen: 3400,
    aangemeld: '2025-09-28',
  },
  {
    id: 'usr-014',
    naam: 'Jesse Vermeer',
    email: 'jesse.v@email.nl',
    stad: 'Utrecht',
    status: 'Nieuw',
    totaleSchuld: 5400,
    inkomen: 2300,
    aangemeld: '2026-01-20',
  },
  {
    id: 'usr-015',
    naam: 'Eva van Leeuwen',
    email: 'eva.vl@email.nl',
    stad: 'Den Haag',
    status: 'Actief',
    totaleSchuld: 2800,
    inkomen: 2950,
    aangemeld: '2025-08-30',
  },
];

// Insights data
export const autoInsightsData = [
  {
    id: 'insight-1',
    icon: 'trending-up' as const,
    iconColor: 'text-[#22c55e]',
    iconBg: 'bg-[#22c55e]/10',
    title: 'Gebruikersgroei +22%',
    description: '23 nieuwe gebruikers deze maand, 15% boven gemiddelde',
    metric: 'Boven target',
  },
  {
    id: 'insight-2',
    icon: 'warning' as const,
    iconColor: 'text-[#f59e0b]',
    iconBg: 'bg-[#f59e0b]/10',
    title: '5 hoog-risico gebruikers',
    description: 'Directe aandacht nodig voor schulden boven €10.000',
    metric: 'Actie vereist',
  },
  {
    id: 'insight-3',
    icon: 'success' as const,
    iconColor: 'text-[#22c55e]',
    iconBg: 'bg-[#22c55e]/10',
    title: '€12.450 afbetaald',
    description: 'Beste maand dit kwartaal',
    metric: '+33% vs vorige maand',
  },
  {
    id: 'insight-4',
    icon: 'target' as const,
    iconColor: 'text-[#3D7B4C]',
    iconBg: 'bg-[#3D7B4C]/10',
    title: 'Betalingsherinnering effectief',
    description: '78% betaalt binnen 3 dagen na reminder',
    metric: 'Best practice',
  },
  {
    id: 'insight-5',
    icon: 'trending-down' as const,
    iconColor: 'text-[#22c55e]',
    iconBg: 'bg-[#22c55e]/10',
    title: 'Dalende nieuwe schulden',
    description: '12% minder nieuwe schulden dan vorige maand',
    metric: 'Positieve trend',
  },
  {
    id: 'insight-6',
    icon: 'tip' as const,
    iconColor: 'text-[#6366f1]',
    iconBg: 'bg-[#6366f1]/10',
    title: 'Tip: Energie schulden stijgen',
    description: 'Overweeg partnerships met energiemaatschappijen',
    metric: 'Aanbeveling',
  },
];

export const trendsData = [
  {
    id: 'trend-1',
    label: 'Nieuwe gebruikers',
    change: 15,
    direction: 'up' as const,
    sparklineData: [
      { value: 12 },
      { value: 15 },
      { value: 14 },
      { value: 18 },
      { value: 16 },
      { value: 20 },
      { value: 23 },
    ],
  },
  {
    id: 'trend-2',
    label: 'Afbetalingen',
    change: 8,
    direction: 'up' as const,
    sparklineData: [
      { value: 8500 },
      { value: 9200 },
      { value: 9800 },
      { value: 10500 },
      { value: 11200 },
      { value: 11800 },
      { value: 12450 },
    ],
  },
  {
    id: 'trend-3',
    label: 'Nieuwe schulden',
    change: -12,
    direction: 'down' as const,
    sparklineData: [
      { value: 15000 },
      { value: 14200 },
      { value: 13500 },
      { value: 12800 },
      { value: 11500 },
      { value: 10200 },
      { value: 8800 },
    ],
  },
  {
    id: 'trend-4',
    label: 'Gem. inkomen',
    change: 0,
    direction: 'stable' as const,
    sparklineData: [
      { value: 2650 },
      { value: 2680 },
      { value: 2640 },
      { value: 2670 },
      { value: 2660 },
      { value: 2655 },
      { value: 2650 },
    ],
  },
];

export const yearComparisonData = [
  {
    id: 'yc-1',
    label: 'Totaal gebruikers',
    thisYear: 156,
    lastYear: 98,
    format: 'number' as const,
  },
  {
    id: 'yc-2',
    label: 'Totaal afbetaald',
    thisYear: 89200,
    lastYear: 62500,
    format: 'currency' as const,
  },
  {
    id: 'yc-3',
    label: 'Actieve schulden',
    thisYear: 89,
    lastYear: 112,
    format: 'number' as const,
  },
  {
    id: 'yc-4',
    label: 'Gem. betaling',
    thisYear: 450,
    lastYear: 380,
    format: 'currency' as const,
  },
];

export const goalsData = [
  {
    id: 'goal-1',
    title: '€100.000 totaal afbetaald',
    current: 89200,
    target: 100000,
    unit: 'EUR',
    format: 'currency' as const,
  },
  {
    id: 'goal-2',
    title: '200 actieve gebruikers',
    current: 156,
    target: 200,
    unit: 'gebruikers',
    format: 'number' as const,
  },
  {
    id: 'goal-3',
    title: 'Gemiddelde schuld onder €2.500',
    current: 2366,
    target: 2500,
    unit: 'EUR',
    format: 'currency' as const,
  },
];

export const reportsData = [
  {
    id: 'report-1',
    title: 'Maandrapport December 2025',
    date: '2025-12-31',
    type: 'monthly' as const,
  },
  {
    id: 'report-2',
    title: 'Kwartaalrapport Q4 2025',
    date: '2025-12-31',
    type: 'quarterly' as const,
  },
  {
    id: 'report-3',
    title: 'Maandrapport November 2025',
    date: '2025-11-30',
    type: 'monthly' as const,
  },
  {
    id: 'report-4',
    title: 'Custom Rapport: Hoog-risico',
    date: '2025-11-15',
    type: 'custom' as const,
  },
];

export const alertSettingsData = [
  {
    id: 'alert-1',
    label: 'Waarschuw bij nieuwe hoog-risico gebruikers',
    description: 'Ontvang een melding bij schulden boven €10.000',
    enabled: true,
  },
  {
    id: 'alert-2',
    label: 'Dagelijkse samenvatting',
    description: 'Dagelijks overzicht van activiteiten om 09:00',
    enabled: true,
  },
  {
    id: 'alert-3',
    label: 'Wekelijkse rapportage',
    description: 'Automatisch wekelijks rapport op maandag',
    enabled: false,
  },
  {
    id: 'alert-4',
    label: 'Alert bij ongebruikelijke activiteit',
    description: 'Melding bij afwijkende patronen',
    enabled: true,
  },
];

// Financiën (Finance) tab data
export const financeKpiData = [
  {
    id: 'total-income',
    label: 'TOTAAL INKOMEN',
    value: '€156.000',
    icon: 'wallet',
    featured: true,
    sparklineData: [120000, 125000, 132000, 138000, 142000, 148000, 152000, 156000],
    trend: 'up',
  },
  {
    id: 'total-costs',
    label: 'TOTALE KOSTEN',
    value: '€98.400',
    icon: 'trending-down',
    featured: false,
    sparklineData: [85000, 88000, 90000, 92000, 94000, 95000, 97000, 98400],
    trend: 'up',
    trendNegative: true,
  },
  {
    id: 'net-difference',
    label: 'NETTO VERSCHIL',
    value: '+€57.600',
    icon: 'activity',
    featured: false,
    sparklineData: [35000, 37000, 42000, 46000, 48000, 53000, 55000, 57600],
    trend: 'up',
  },
  {
    id: 'avg-income-user',
    label: 'GEM. INKOMEN/USER',
    value: '€1.850',
    icon: 'users',
    featured: false,
    sparklineData: [1650, 1700, 1720, 1780, 1800, 1820, 1840, 1850],
    trend: 'up',
  },
  {
    id: 'cost-ratio',
    label: 'KOSTEN RATIO',
    value: '63%',
    icon: 'chart',
    featured: false,
    sparklineData: [71, 70, 68, 67, 66, 65, 64, 63],
    trend: 'down',
    trendPositive: true,
  },
];

export const incomeVsCostsData = [
  { month: 'Jan', inkomen: 11500, kosten: 8200 },
  { month: 'Feb', inkomen: 12000, kosten: 8400 },
  { month: 'Mar', inkomen: 12800, kosten: 8100 },
  { month: 'Apr', inkomen: 13200, kosten: 8600 },
  { month: 'Mei', inkomen: 13500, kosten: 8300 },
  { month: 'Jun', inkomen: 12900, kosten: 8500 },
  { month: 'Jul', inkomen: 13800, kosten: 8200 },
  { month: 'Aug', inkomen: 14200, kosten: 8400 },
  { month: 'Sep', inkomen: 13600, kosten: 8100 },
  { month: 'Okt', inkomen: 14500, kosten: 8300 },
  { month: 'Nov', inkomen: 14800, kosten: 8500 },
  { month: 'Dec', inkomen: 15200, kosten: 8800 },
];

export const incomeBySourceData = [
  { name: 'Salaris', value: 89000, color: '#3D7B4C' },
  { name: 'Uitkering', value: 38000, color: '#8FD14F' },
  { name: 'Toeslagen', value: 22000, color: '#22c55e' },
  { name: 'Overig', value: 7000, color: '#a3d977' },
];

export const costsByCategoryData = [
  { name: 'Huur', value: 42000, color: '#EF4444' },
  { name: 'Energie', value: 18500, color: '#F87171' },
  { name: 'Verzekeringen', value: 14200, color: '#FCA5A5' },
  { name: 'Boodschappen', value: 12800, color: '#FECACA' },
  { name: 'Vervoer', value: 6400, color: '#FEE2E2' },
  { name: 'Overig', value: 4500, color: '#FEF2F2' },
];

export const monthlyBalanceData = [
  { month: 'Jan', balance: 3300 },
  { month: 'Feb', balance: 3600 },
  { month: 'Mar', balance: 4700 },
  { month: 'Apr', balance: 4600 },
  { month: 'Mei', balance: 5200 },
  { month: 'Jun', balance: 4400 },
  { month: 'Jul', balance: 5600 },
  { month: 'Aug', balance: 5800 },
  { month: 'Sep', balance: 5500 },
  { month: 'Okt', balance: 6200 },
  { month: 'Nov', balance: 6300 },
  { month: 'Dec', balance: 6400 },
];

export const financialHealthData = {
  score: 72,
  factors: [
    { name: 'Inkomen stabiliteit', value: 85 },
    { name: 'Schuld ratio', value: 65 },
    { name: 'Spaarquote', value: 45 },
    { name: 'Betalingsgedrag', value: 92 },
  ],
};

// Betalingen (Payments) tab data
export const paymentsKpiData = [
  {
    id: 'payments-this-month',
    label: 'BETALINGEN DEZE MAAND',
    value: '€12.450',
    icon: 'wallet',
    featured: true,
    sparklineData: [8500, 9200, 10100, 10800, 11500, 12000, 12450],
    trend: 'up',
  },
  {
    id: 'total-payments',
    label: 'TOTAAL BETALINGEN',
    value: '1.247',
    icon: 'activity',
    featured: false,
    sparklineData: [890, 950, 1020, 1080, 1140, 1200, 1247],
    trend: 'up',
  },
  {
    id: 'avg-payment',
    label: 'GEM. BETALING',
    value: '€450',
    icon: 'credit-card',
    featured: false,
    sparklineData: [380, 395, 410, 425, 435, 445, 450],
    trend: 'up',
  },
  {
    id: 'success-rate',
    label: 'SUCCESRATE',
    value: '94%',
    icon: 'chart',
    featured: false,
    sparklineData: [89, 90, 91, 92, 93, 94, 94],
    trend: 'up',
  },
];

export const paymentsPerMonthData = [
  { month: 'Jan', amount: 8200, lastYear: 6800 },
  { month: 'Feb', amount: 9100, lastYear: 7200 },
  { month: 'Mar', amount: 8800, lastYear: 7500 },
  { month: 'Apr', amount: 9500, lastYear: 7800 },
  { month: 'Mei', amount: 10200, lastYear: 8100 },
  { month: 'Jun', amount: 9800, lastYear: 8400 },
  { month: 'Jul', amount: 10500, lastYear: 8600 },
  { month: 'Aug', amount: 11000, lastYear: 8900 },
  { month: 'Sep', amount: 10800, lastYear: 9200 },
  { month: 'Okt', amount: 11500, lastYear: 9500 },
  { month: 'Nov', amount: 12000, lastYear: 9800 },
  { month: 'Dec', amount: 12450, lastYear: 10200 },
];

export const paymentsByDayData = [
  { day: 'Ma', count: 245 },
  { day: 'Di', count: 312 },
  { day: 'Wo', count: 278 },
  { day: 'Do', count: 256 },
  { day: 'Vr', count: 198 },
  { day: 'Za', count: 45 },
  { day: 'Zo', count: 32 },
];

export const paymentMethodsData = [
  { name: 'iDEAL', value: 623, color: '#3D7B4C', percentage: 50 },
  { name: 'Automatische incasso', value: 374, color: '#8FD14F', percentage: 30 },
  { name: 'Handmatig', value: 187, color: '#22c55e', percentage: 15 },
  { name: 'Overig', value: 63, color: '#a3d977', percentage: 5 },
];

export const paymentStatusData = [
  { name: 'Geslaagd', value: 1172, color: '#22c55e', percentage: 94 },
  { name: 'In behandeling', value: 50, color: '#F59E0B', percentage: 4 },
  { name: 'Mislukt', value: 25, color: '#EF4444', percentage: 2 },
];

export type PaymentStatusType = 'Geslaagd' | 'In behandeling' | 'Mislukt';
export type PaymentMethodType = 'iDEAL' | 'Automatische incasso' | 'Handmatig' | 'Overig';

export interface PaymentRecord {
  id: string;
  datum: string;
  tijd: string;
  gebruiker: string;
  avatar: string;
  schuld: string;
  bedrag: number;
  methode: PaymentMethodType;
  status: PaymentStatusType;
  referentie: string;
}

export const recentPaymentsData: PaymentRecord[] = [
  {
    id: 'pay-001',
    datum: '22 jan 2026',
    tijd: '14:35',
    gebruiker: 'Emma de Vries',
    avatar: 'EV',
    schuld: 'Eneco',
    bedrag: 250.00,
    methode: 'iDEAL',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001247',
  },
  {
    id: 'pay-002',
    datum: '22 jan 2026',
    tijd: '13:20',
    gebruiker: 'Daan Bakker',
    avatar: 'DB',
    schuld: 'T-Mobile',
    bedrag: 89.50,
    methode: 'Automatische incasso',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001246',
  },
  {
    id: 'pay-003',
    datum: '22 jan 2026',
    tijd: '11:45',
    gebruiker: 'Sophie Jansen',
    avatar: 'SJ',
    schuld: 'Ziggo',
    bedrag: 45.00,
    methode: 'iDEAL',
    status: 'In behandeling',
    referentie: 'PAY-2026-001245',
  },
  {
    id: 'pay-004',
    datum: '21 jan 2026',
    tijd: '16:50',
    gebruiker: 'Lucas van Dijk',
    avatar: 'LV',
    schuld: 'Wehkamp',
    bedrag: 175.00,
    methode: 'Handmatig',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001244',
  },
  {
    id: 'pay-005',
    datum: '21 jan 2026',
    tijd: '15:30',
    gebruiker: 'Fleur Smit',
    avatar: 'FS',
    schuld: 'Vattenfall',
    bedrag: 320.00,
    methode: 'iDEAL',
    status: 'Mislukt',
    referentie: 'PAY-2026-001243',
  },
  {
    id: 'pay-006',
    datum: '21 jan 2026',
    tijd: '14:15',
    gebruiker: 'Sem de Boer',
    avatar: 'SB',
    schuld: 'Zilveren Kruis',
    bedrag: 125.00,
    methode: 'Automatische incasso',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001242',
  },
  {
    id: 'pay-007',
    datum: '21 jan 2026',
    tijd: '12:00',
    gebruiker: 'Lotte Visser',
    avatar: 'LV',
    schuld: 'Belastingdienst',
    bedrag: 450.00,
    methode: 'iDEAL',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001241',
  },
  {
    id: 'pay-008',
    datum: '21 jan 2026',
    tijd: '10:30',
    gebruiker: 'Noah Mulder',
    avatar: 'NM',
    schuld: 'CJIB',
    bedrag: 65.00,
    methode: 'iDEAL',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001240',
  },
  {
    id: 'pay-009',
    datum: '20 jan 2026',
    tijd: '17:20',
    gebruiker: 'Julia Peters',
    avatar: 'JP',
    schuld: 'DUO',
    bedrag: 200.00,
    methode: 'Automatische incasso',
    status: 'In behandeling',
    referentie: 'PAY-2026-001239',
  },
  {
    id: 'pay-010',
    datum: '20 jan 2026',
    tijd: '15:45',
    gebruiker: 'Finn de Groot',
    avatar: 'FG',
    schuld: 'Coolblue',
    bedrag: 89.99,
    methode: 'Handmatig',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001238',
  },
  {
    id: 'pay-011',
    datum: '20 jan 2026',
    tijd: '14:10',
    gebruiker: 'Mila Hendriks',
    avatar: 'MH',
    schuld: 'Essent',
    bedrag: 275.00,
    methode: 'iDEAL',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001237',
  },
  {
    id: 'pay-012',
    datum: '20 jan 2026',
    tijd: '11:30',
    gebruiker: 'Thijs van den Berg',
    avatar: 'TB',
    schuld: 'KPN',
    bedrag: 55.00,
    methode: 'Automatische incasso',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001236',
  },
  {
    id: 'pay-013',
    datum: '19 jan 2026',
    tijd: '16:40',
    gebruiker: 'Sara Koning',
    avatar: 'SK',
    schuld: 'Bol.com',
    bedrag: 145.50,
    methode: 'iDEAL',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001235',
  },
  {
    id: 'pay-014',
    datum: '19 jan 2026',
    tijd: '14:25',
    gebruiker: 'Jesse Vermeer',
    avatar: 'JV',
    schuld: 'Vodafone',
    bedrag: 78.00,
    methode: 'Overig',
    status: 'Mislukt',
    referentie: 'PAY-2026-001234',
  },
  {
    id: 'pay-015',
    datum: '19 jan 2026',
    tijd: '12:50',
    gebruiker: 'Eva van Leeuwen',
    avatar: 'EL',
    schuld: 'Greenwheels',
    bedrag: 35.00,
    methode: 'iDEAL',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001233',
  },
  {
    id: 'pay-016',
    datum: '19 jan 2026',
    tijd: '10:15',
    gebruiker: 'Emma de Vries',
    avatar: 'EV',
    schuld: 'ANWB',
    bedrag: 95.00,
    methode: 'Automatische incasso',
    status: 'Geslaagd',
    referentie: 'PAY-2026-001232',
  },
];

// Schulden (Debts) tab data
export const debtsKpiData = [
  {
    id: 'total-debt',
    label: 'TOTALE SCHULD',
    value: '€234.500',
    icon: 'trending-down',
    featured: true,
    sparklineData: [280000, 268000, 255000, 248000, 242000, 238000, 234500],
    trend: 'down',
  },
  {
    id: 'paid-off',
    label: 'AFBETAALD',
    value: '€89.200',
    icon: 'wallet',
    featured: false,
    sparklineData: [52000, 58000, 65000, 72000, 78000, 84000, 89200],
    trend: 'up',
  },
  {
    id: 'active-debts',
    label: 'ACTIEVE SCHULDEN',
    value: '89',
    icon: 'file-text',
    featured: false,
    sparklineData: [95, 94, 93, 92, 91, 90, 89],
    trend: 'neutral',
  },
  {
    id: 'avg-debt',
    label: 'GEM. SCHULD',
    value: '€2.634',
    icon: 'activity',
    featured: false,
    sparklineData: [2850, 2780, 2720, 2680, 2660, 2650, 2634],
    trend: 'down',
  },
];

export const debtsByUrgencyData = [
  { name: 'Hoog', value: 18, color: '#EF4444' },
  { name: 'Gemiddeld', value: 35, color: '#F59E0B' },
  { name: 'Laag', value: 36, color: '#22c55e' },
];

export const debtDistributionData = [
  { range: '€0-1k', count: 28 },
  { range: '€1k-5k', count: 35 },
  { range: '€5k-10k', count: 18 },
  { range: '€10k-25k', count: 6 },
  { range: '€25k+', count: 2 },
];

export const monthlyRepaymentData = [
  { month: 'Jan', amount: 6200 },
  { month: 'Feb', amount: 7100 },
  { month: 'Mar', amount: 6800 },
  { month: 'Apr', amount: 7500 },
  { month: 'Mei', amount: 8200 },
  { month: 'Jun', amount: 7800 },
  { month: 'Jul', amount: 8500 },
  { month: 'Aug', amount: 9100 },
  { month: 'Sep', amount: 8800 },
  { month: 'Okt', amount: 9500 },
  { month: 'Nov', amount: 9800 },
  { month: 'Dec', amount: 12450 },
];

export const debtIncomeScatterData = [
  { inkomen: 2800, schuld: 4250, urgentie: 'Laag' as const, naam: 'Emma de Vries' },
  { inkomen: 2200, schuld: 8900, urgentie: 'Hoog' as const, naam: 'Daan Bakker' },
  { inkomen: 3100, schuld: 2100, urgentie: 'Laag' as const, naam: 'Sophie Jansen' },
  { inkomen: 2500, schuld: 5600, urgentie: 'Gemiddeld' as const, naam: 'Lucas van Dijk' },
  { inkomen: 1900, schuld: 12300, urgentie: 'Hoog' as const, naam: 'Fleur Smit' },
  { inkomen: 2650, schuld: 3400, urgentie: 'Laag' as const, naam: 'Sem de Boer' },
  { inkomen: 3200, schuld: 1800, urgentie: 'Laag' as const, naam: 'Lotte Visser' },
  { inkomen: 2100, schuld: 7500, urgentie: 'Gemiddeld' as const, naam: 'Noah Mulder' },
  { inkomen: 2850, schuld: 2900, urgentie: 'Laag' as const, naam: 'Julia Peters' },
  { inkomen: 2400, schuld: 4100, urgentie: 'Gemiddeld' as const, naam: 'Finn de Groot' },
  { inkomen: 2750, schuld: 6200, urgentie: 'Gemiddeld' as const, naam: 'Mila Hendriks' },
  { inkomen: 2000, schuld: 9800, urgentie: 'Hoog' as const, naam: 'Thijs van den Berg' },
  { inkomen: 3400, schuld: 3100, urgentie: 'Laag' as const, naam: 'Sara Koning' },
  { inkomen: 2300, schuld: 5400, urgentie: 'Gemiddeld' as const, naam: 'Jesse Vermeer' },
  { inkomen: 2950, schuld: 2800, urgentie: 'Laag' as const, naam: 'Eva van Leeuwen' },
];

export type DebtUrgencyType = 'Hoog' | 'Gemiddeld' | 'Laag';
export type DebtTypeType = 'Telefoon' | 'Energie' | 'Zorgverzekering' | 'Webshop' | 'Overheid' | 'Overig';
export type DebtStatusType = 'Actief' | 'Afbetaald' | 'Regeling';

export interface DebtRecord {
  id: string;
  gebruiker: string;
  avatar: string;
  crediteur: string;
  type: DebtTypeType;
  origineel: number;
  huidig: number;
  urgentie: DebtUrgencyType;
  status: DebtStatusType;
}

export const allDebtsData: DebtRecord[] = [
  {
    id: 'debt-001',
    gebruiker: 'Emma de Vries',
    avatar: 'EV',
    crediteur: 'T-Mobile',
    type: 'Telefoon',
    origineel: 850,
    huidig: 425,
    urgentie: 'Laag',
    status: 'Regeling',
  },
  {
    id: 'debt-002',
    gebruiker: 'Daan Bakker',
    avatar: 'DB',
    crediteur: 'Eneco',
    type: 'Energie',
    origineel: 3200,
    huidig: 2800,
    urgentie: 'Hoog',
    status: 'Actief',
  },
  {
    id: 'debt-003',
    gebruiker: 'Sophie Jansen',
    avatar: 'SJ',
    crediteur: 'Zilveren Kruis',
    type: 'Zorgverzekering',
    origineel: 1200,
    huidig: 600,
    urgentie: 'Laag',
    status: 'Regeling',
  },
  {
    id: 'debt-004',
    gebruiker: 'Lucas van Dijk',
    avatar: 'LV',
    crediteur: 'Wehkamp',
    type: 'Webshop',
    origineel: 2100,
    huidig: 1850,
    urgentie: 'Gemiddeld',
    status: 'Actief',
  },
  {
    id: 'debt-005',
    gebruiker: 'Fleur Smit',
    avatar: 'FS',
    crediteur: 'Belastingdienst',
    type: 'Overheid',
    origineel: 8500,
    huidig: 7200,
    urgentie: 'Hoog',
    status: 'Actief',
  },
  {
    id: 'debt-006',
    gebruiker: 'Sem de Boer',
    avatar: 'SB',
    crediteur: 'Vodafone',
    type: 'Telefoon',
    origineel: 450,
    huidig: 0,
    urgentie: 'Laag',
    status: 'Afbetaald',
  },
  {
    id: 'debt-007',
    gebruiker: 'Lotte Visser',
    avatar: 'LV',
    crediteur: 'Vattenfall',
    type: 'Energie',
    origineel: 1800,
    huidig: 950,
    urgentie: 'Laag',
    status: 'Regeling',
  },
  {
    id: 'debt-008',
    gebruiker: 'Noah Mulder',
    avatar: 'NM',
    crediteur: 'CJIB',
    type: 'Overheid',
    origineel: 2400,
    huidig: 2100,
    urgentie: 'Gemiddeld',
    status: 'Actief',
  },
  {
    id: 'debt-009',
    gebruiker: 'Julia Peters',
    avatar: 'JP',
    crediteur: 'CZ',
    type: 'Zorgverzekering',
    origineel: 980,
    huidig: 0,
    urgentie: 'Laag',
    status: 'Afbetaald',
  },
  {
    id: 'debt-010',
    gebruiker: 'Finn de Groot',
    avatar: 'FG',
    crediteur: 'Bol.com',
    type: 'Webshop',
    origineel: 650,
    huidig: 450,
    urgentie: 'Gemiddeld',
    status: 'Actief',
  },
  {
    id: 'debt-011',
    gebruiker: 'Mila Hendriks',
    avatar: 'MH',
    crediteur: 'Essent',
    type: 'Energie',
    origineel: 4200,
    huidig: 3100,
    urgentie: 'Hoog',
    status: 'Actief',
  },
  {
    id: 'debt-012',
    gebruiker: 'Thijs van den Berg',
    avatar: 'TB',
    crediteur: 'DUO',
    type: 'Overheid',
    origineel: 15000,
    huidig: 12500,
    urgentie: 'Hoog',
    status: 'Regeling',
  },
  {
    id: 'debt-013',
    gebruiker: 'Sara Koning',
    avatar: 'SK',
    crediteur: 'KPN',
    type: 'Telefoon',
    origineel: 320,
    huidig: 180,
    urgentie: 'Laag',
    status: 'Regeling',
  },
  {
    id: 'debt-014',
    gebruiker: 'Jesse Vermeer',
    avatar: 'JV',
    crediteur: 'Coolblue',
    type: 'Webshop',
    origineel: 1450,
    huidig: 1200,
    urgentie: 'Gemiddeld',
    status: 'Actief',
  },
  {
    id: 'debt-015',
    gebruiker: 'Eva van Leeuwen',
    avatar: 'EL',
    crediteur: 'Menzis',
    type: 'Zorgverzekering',
    origineel: 750,
    huidig: 0,
    urgentie: 'Laag',
    status: 'Afbetaald',
  },
  {
    id: 'debt-016',
    gebruiker: 'Emma de Vries',
    avatar: 'EV',
    crediteur: 'Ziggo',
    type: 'Telefoon',
    origineel: 280,
    huidig: 140,
    urgentie: 'Laag',
    status: 'Regeling',
  },
  {
    id: 'debt-017',
    gebruiker: 'Daan Bakker',
    avatar: 'DB',
    crediteur: 'Greenwheels',
    type: 'Overig',
    origineel: 890,
    huidig: 890,
    urgentie: 'Hoog',
    status: 'Actief',
  },
  {
    id: 'debt-018',
    gebruiker: 'Sophie Jansen',
    avatar: 'SJ',
    crediteur: 'ANWB',
    type: 'Overig',
    origineel: 450,
    huidig: 225,
    urgentie: 'Laag',
    status: 'Regeling',
  },
];
