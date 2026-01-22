'use client';

import { Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles, colors } from '@/lib/pdf/PDFStyles';

export interface MonthlyReportData {
  month: string;
  year: number;
  generatedAt: string;
  stats: {
    totalUsers: number;
    newUsers: number;
    amountPaid: number;
    successRate: number;
  };
  debtOverview: {
    totalDebt: number;
    averageDebt: number;
    paidThisMonth: number;
    activeArrangements: number;
  };
  appsData: Array<{
    name: string;
    users: number;
    activeRate: number;
    growth: string;
  }>;
  debtCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  alerts: Array<{
    type: 'success' | 'warning' | 'info';
    message: string;
  }>;
}

const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `€${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `€${(amount / 1000).toFixed(1)}K`;
  }
  return `€${amount.toLocaleString('nl-NL')}`;
};

const formatNumber = (num: number): string => {
  return num.toLocaleString('nl-NL');
};

const getAlertIcon = (type: string): string => {
  switch (type) {
    case 'success':
      return '✓';
    case 'warning':
      return '!';
    case 'info':
      return '→';
    default:
      return '•';
  }
};

export const MonthlyReportPDF = ({ data }: { data: MonthlyReportData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>KONSENSI</Text>
          <Text style={[styles.subtitle, { textAlign: 'left' }]}>Budgetbeheer</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.title}>MAANDELIJKSE RAPPORTAGE</Text>
          <Text style={styles.subtitle}>{data.month} {data.year}</Text>
          <Text style={styles.subtitle}>Gegenereerd: {data.generatedAt}</Text>
        </View>
      </View>

      {/* Summary Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Samenvatting</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatNumber(data.stats.totalUsers)}</Text>
            <Text style={styles.statLabel}>Totaal Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValueGreen}>+{formatNumber(data.stats.newUsers)}</Text>
            <Text style={styles.statLabel}>Nieuwe Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(data.stats.amountPaid)}</Text>
            <Text style={styles.statLabel}>Afgelost</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{data.stats.successRate}%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>
      </View>

      {/* Debt Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schuld Overzicht</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.card}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Totale schuld in systeem</Text>
            <Text style={styles.dataValue}>{formatCurrency(data.debtOverview.totalDebt)}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Gemiddelde schuld per gebruiker</Text>
            <Text style={styles.dataValue}>{formatCurrency(data.debtOverview.averageDebt)}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Totaal afbetaald deze maand</Text>
            <Text style={[styles.dataValue, { color: colors.greenLight }]}>{formatCurrency(data.debtOverview.paidThisMonth)}</Text>
          </View>
          <View style={[styles.dataRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.dataLabel}>Actieve betalingsregelingen</Text>
            <Text style={styles.dataValue}>{formatNumber(data.debtOverview.activeArrangements)}</Text>
          </View>
        </View>
      </View>

      {/* Debt Categories Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schuld per Categorie</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.card}>
          {data.debtCategories.map((category, index) => (
            <View key={index} style={styles.barChartRow}>
              <Text style={styles.barLabel}>{category.category}</Text>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${category.percentage}%`,
                      backgroundColor: index === 0 ? colors.greenLight :
                                      index === 1 ? colors.blue :
                                      index === 2 ? colors.orange :
                                      index === 3 ? colors.purple : colors.pink,
                    },
                  ]}
                />
              </View>
              <Text style={styles.barValue}>{formatCurrency(category.amount)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Apps Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gebruikers per App</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>App</Text>
            <Text style={styles.tableHeaderCell}>Users</Text>
            <Text style={styles.tableHeaderCell}>Actief</Text>
            <Text style={styles.tableHeaderCell}>Groei</Text>
          </View>
          {data.appsData.map((app, index) => (
            <View
              key={index}
              style={
                index === data.appsData.length - 1
                  ? [styles.tableRow, styles.tableRowLast]
                  : styles.tableRow
              }
            >
              <Text style={styles.tableCell}>{app.name}</Text>
              <Text style={styles.tableCell}>{formatNumber(app.users)}</Text>
              <Text style={styles.tableCell}>{app.activeRate}%</Text>
              <Text style={styles.tableCellGreen}>{app.growth}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Highlights & Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Highlights & Alerts</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.card}>
          {data.alerts.map((alert, index) => (
            <View key={index} style={styles.alertItem}>
              <Text
                style={[
                  styles.alertIcon,
                  {
                    color:
                      alert.type === 'success'
                        ? colors.greenLight
                        : alert.type === 'warning'
                        ? colors.orange
                        : colors.blue,
                  },
                ]}
              >
                {getAlertIcon(alert.type)}
              </Text>
              <Text style={styles.alertText}>{alert.message}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Konsensi Budgetbeheer | www.konsensi.nl</Text>
        <Text style={styles.footerText}>Pagina 1 van 1</Text>
      </View>
    </Page>
  </Document>
);

export default MonthlyReportPDF;
