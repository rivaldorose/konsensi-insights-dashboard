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
