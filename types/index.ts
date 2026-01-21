// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'viewer';
  created_at: string;
}

// App source types - the different Konsensi applications
export type AppSource =
  | 'jongeren_app'
  | 'bewind'
  | 'schuldhulpradar'
  | 'schuldenradar';

export interface AppSourceInfo {
  id: AppSource;
  name: string;
  description: string;
}

// Dashboard data types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalDebt: number;
  resolvedCases: number;
  pendingCases: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  source?: AppSource;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

// Audit log types
export interface AuditLog {
  id: string;
  action: string;
  user_id: string;
  user_email: string;
  timestamp: string;
  details: Record<string, unknown>;
  source: AppSource;
}

// Filter types
export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface DashboardFilters {
  dateRange: DateRange;
  sources: AppSource[];
  searchQuery: string;
}
