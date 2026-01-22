'use client';

import { Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles, colors } from '@/lib/pdf/PDFStyles';

export interface MunicipalityReportData {
  municipality: string;
  period: string;
  generatedAt: string;
  summary: {
    residentsHelped: number;
    totalDebt: number;
    amountPaid: number;
    successRate: number;
  };
  demographics: Array<{
    ageGroup: string;
    percentage: number;
  }>;
  debtCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    newRegistrations: number;
    completed: number;
  }>;
  recommendations: string[];
}

const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `€${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `€${(amount / 1000).toFixed(0)}K`;
  }
  return `€${amount.toLocaleString('nl-NL')}`;
};

const formatNumber = (num: number): string => {
  return num.toLocaleString('nl-NL');
};

export const MunicipalityReportPDF = ({ data }: { data: MunicipalityReportData }) => (
  <Document>
    {/* Page 1 */}
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>KONSENSI</Text>
          <Text style={[styles.subtitle, { textAlign: 'left' }]}>Budgetbeheer</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.title}>GEMEENTE RAPPORTAGE</Text>
          <Text style={styles.subtitle}>{data.municipality}</Text>
          <Text style={styles.subtitle}>{data.period}</Text>
        </View>
      </View>

      {/* Executive Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <View style={styles.sectionDivider} />
        <View style={[styles.card, styles.mb12]}>
          <Text style={{ fontSize: 10, color: colors.textSecondary, lineHeight: 1.6 }}>
            In {data.period} heeft Konsensi binnen gemeente {data.municipality} significante
            vooruitgang geboekt in schuldhulpverlening. Dit rapport geeft een overzicht van de
            behaalde resultaten en aanbevelingen voor verdere verbetering.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatNumber(data.summary.residentsHelped)}</Text>
            <Text style={styles.statLabel}>Inwoners Geholpen</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(data.summary.totalDebt)}</Text>
            <Text style={styles.statLabel}>Totale Schuld</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValueGreen}>{formatCurrency(data.summary.amountPaid)}</Text>
            <Text style={styles.statLabel}>Afgelost</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{data.summary.successRate}%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>
      </View>

      {/* Demographics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demografische Verdeling</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.card}>
          <View style={[styles.row, styles.mb8]}>
            <Text style={{ fontSize: 10, color: colors.textSecondary }}>Leeftijdsverdeling</Text>
          </View>
          {data.demographics.map((demo, index) => (
            <View key={index} style={styles.barChartRow}>
              <Text style={styles.barLabel}>{demo.ageGroup}</Text>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${demo.percentage}%`,
                      backgroundColor:
                        index === 0
                          ? colors.greenLight
                          : index === 1
                          ? colors.blue
                          : colors.purple,
                    },
                  ]}
                />
              </View>
              <Text style={styles.barValue}>{demo.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Debt Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schuld Categorieën</Text>
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
                      backgroundColor:
                        index === 0
                          ? colors.greenLight
                          : index === 1
                          ? colors.blue
                          : index === 2
                          ? colors.orange
                          : index === 3
                          ? colors.purple
                          : colors.pink,
                    },
                  ]}
                />
              </View>
              <Text style={styles.barValue}>{formatCurrency(category.amount)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Monthly Trend */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maandelijkse Trend</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Maand</Text>
            <Text style={styles.tableHeaderCell}>Nieuwe Aanmeldingen</Text>
            <Text style={styles.tableHeaderCell}>Afgerond</Text>
          </View>
          {data.monthlyTrend.map((month, index) => (
            <View
              key={index}
              style={
                index === data.monthlyTrend.length - 1
                  ? [styles.tableRow, styles.tableRowLast]
                  : styles.tableRow
              }
            >
              <Text style={styles.tableCell}>{month.month}</Text>
              <Text style={styles.tableCellGreen}>+{month.newRegistrations}</Text>
              <Text style={[styles.tableCell, { color: colors.blue }]}>{month.completed}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aanbevelingen</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.card}>
          {data.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.alertItem}>
              <Text style={[styles.alertIcon, { color: colors.greenLight }]}>{index + 1}.</Text>
              <Text style={styles.alertText}>{recommendation}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerConfidential}>Vertrouwelijk</Text>
        <Text style={styles.footerText}>Konsensi | Gegenereerd: {data.generatedAt}</Text>
        <Text style={styles.footerText}>Pagina 1 van 1</Text>
      </View>
    </Page>
  </Document>
);

export default MunicipalityReportPDF;
