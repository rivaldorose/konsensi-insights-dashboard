'use client';

import { pdf } from '@react-pdf/renderer';
import { MonthlyReportPDF, MonthlyReportData } from '@/components/pdf/MonthlyReportPDF';
import { UserDetailPDF, UserDetailData } from '@/components/pdf/UserDetailPDF';
import { MunicipalityReportPDF, MunicipalityReportData } from '@/components/pdf/MunicipalityReportPDF';

/**
 * Generate and download a Monthly Report PDF
 */
export async function generateMonthlyReport(data: MonthlyReportData): Promise<void> {
  const blob = await pdf(<MonthlyReportPDF data={data} />).toBlob();
  downloadBlob(blob, `konsensi-maandrapport-${data.month.toLowerCase()}-${data.year}.pdf`);
}

/**
 * Generate and download a User Detail Report PDF
 */
export async function generateUserDetailReport(data: UserDetailData): Promise<void> {
  const blob = await pdf(<UserDetailPDF data={data} />).toBlob();
  downloadBlob(blob, `konsensi-gebruiker-${data.userId}.pdf`);
}

/**
 * Generate and download a Municipality Report PDF
 */
export async function generateMunicipalityReport(data: MunicipalityReportData): Promise<void> {
  const blob = await pdf(<MunicipalityReportPDF data={data} />).toBlob();
  const periodSlug = data.period.toLowerCase().replace(/\s+/g, '-');
  const municipalitySlug = data.municipality.toLowerCase().replace(/\s+/g, '-');
  downloadBlob(blob, `konsensi-gemeente-${municipalitySlug}-${periodSlug}.pdf`);
}

/**
 * Helper function to trigger a download from a Blob
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get sample data for testing the Monthly Report PDF
 */
export function getSampleMonthlyReportData(): MonthlyReportData {
  return {
    month: 'Januari',
    year: 2026,
    generatedAt: new Date().toLocaleDateString('nl-NL'),
    stats: {
      totalUsers: 1247,
      newUsers: 89,
      amountPaid: 45200,
      successRate: 72,
    },
    debtOverview: {
      totalDebt: 2400000,
      averageDebt: 1920,
      paidThisMonth: 45200,
      activeArrangements: 847,
    },
    appsData: [
      { name: 'Jongeren App', users: 847, activeRate: 92, growth: '+12%' },
      { name: 'Bewindvoerders', users: 34, activeRate: 100, growth: '+2' },
      { name: 'Hulpradar', users: 156, activeRate: 78, growth: '+8%' },
      { name: 'Schuldenradar', users: 892, activeRate: 85, growth: '+15%' },
      { name: 'Work', users: 203, activeRate: 67, growth: '+5%' },
    ],
    debtCategories: [
      { category: 'Belastingdienst', amount: 245000, percentage: 100 },
      { category: 'Studieschuld', amount: 189000, percentage: 77 },
      { category: 'Zorgverzekering', amount: 134000, percentage: 55 },
      { category: 'Telecom', amount: 98000, percentage: 40 },
      { category: 'Overig', amount: 67000, percentage: 27 },
    ],
    alerts: [
      { type: 'success', message: '12 gebruikers hebben schuld volledig afbetaald' },
      { type: 'warning', message: '3 gebruikers misten betaling deze maand' },
      { type: 'info', message: '15% meer nieuwe aanmeldingen dan vorige maand' },
    ],
  };
}

/**
 * Get sample data for testing the User Detail PDF
 */
export function getSampleUserDetailData(): UserDetailData {
  return {
    userId: 'KNS-2024-0847',
    generatedAt: new Date().toLocaleDateString('nl-NL'),
    personal: {
      age: 24,
      municipality: 'Amsterdam',
      startDate: '15-03-2025',
      status: 'active',
    },
    financial: {
      totalDebt: 8450,
      paidAmount: 2100,
      paidPercentage: 25,
      monthlyIncome: 1850,
      fixedExpenses: 1200,
      available: 650,
      monthlyPayment: 150,
    },
    debts: [
      { creditor: 'Belastingdienst', amount: 3200, status: 'Regeling', priority: 'Hoog' },
      { creditor: 'DUO', amount: 2800, status: 'Regeling', priority: 'Medium' },
      { creditor: 'Ziggo', amount: 450, status: 'Open', priority: 'Laag' },
      { creditor: 'Wehkamp', amount: 2000, status: 'Regeling', priority: 'Medium' },
    ],
    paymentHistory: [
      { month: 'Aug', amount: 150, paid: true },
      { month: 'Sep', amount: 150, paid: true },
      { month: 'Okt', amount: 150, paid: true },
      { month: 'Nov', amount: 150, paid: true },
      { month: 'Dec', amount: 150, paid: true },
      { month: 'Jan', amount: 150, paid: true },
    ],
  };
}

/**
 * Get sample data for testing the Municipality Report PDF
 */
export function getSampleMunicipalityReportData(): MunicipalityReportData {
  return {
    municipality: 'Amsterdam',
    period: 'Q4 2025',
    generatedAt: new Date().toLocaleDateString('nl-NL'),
    summary: {
      residentsHelped: 234,
      totalDebt: 892000,
      amountPaid: 156000,
      successRate: 78,
    },
    demographics: [
      { ageGroup: '18-21', percentage: 35 },
      { ageGroup: '22-24', percentage: 40 },
      { ageGroup: '25-27', percentage: 25 },
    ],
    debtCategories: [
      { category: 'Belastingdienst', amount: 245000, percentage: 100 },
      { category: 'Studieschuld', amount: 189000, percentage: 77 },
      { category: 'Zorgverzekering', amount: 134000, percentage: 55 },
      { category: 'Telecom', amount: 98000, percentage: 40 },
      { category: 'Overig', amount: 67000, percentage: 27 },
    ],
    monthlyTrend: [
      { month: 'Oktober', newRegistrations: 28, completed: 12 },
      { month: 'November', newRegistrations: 35, completed: 15 },
      { month: 'December', newRegistrations: 22, completed: 18 },
    ],
    recommendations: [
      'Focus op vroege interventie bij 18-21 jarigen',
      'Intensiveer samenwerking met Belastingdienst',
      'Uitbreiden preventiecampagne op HBO/MBO',
    ],
  };
}

export type { MonthlyReportData, UserDetailData, MunicipalityReportData };
