'use client';

import { Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles, colors } from '@/lib/pdf/PDFStyles';

export interface UserDetailData {
  userId: string;
  generatedAt: string;
  personal: {
    age: number;
    municipality: string;
    startDate: string;
    status: 'active' | 'inactive' | 'completed';
  };
  financial: {
    totalDebt: number;
    paidAmount: number;
    paidPercentage: number;
    monthlyIncome: number;
    fixedExpenses: number;
    available: number;
    monthlyPayment: number;
  };
  debts: Array<{
    creditor: string;
    amount: number;
    status: 'Regeling' | 'Open' | 'Afbetaald';
    priority: 'Hoog' | 'Medium' | 'Laag';
  }>;
  paymentHistory: Array<{
    month: string;
    amount: number;
    paid: boolean;
  }>;
}

const formatCurrency = (amount: number): string => {
  return `€${amount.toLocaleString('nl-NL')}`;
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return colors.greenLight;
    case 'inactive':
      return colors.red;
    case 'completed':
      return colors.blue;
    default:
      return colors.textSecondary;
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case 'active':
      return 'Actief';
    case 'inactive':
      return 'Inactief';
    case 'completed':
      return 'Afgerond';
    default:
      return status;
  }
};

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'Hoog':
      return colors.red;
    case 'Medium':
      return colors.orange;
    case 'Laag':
      return colors.greenLight;
    default:
      return colors.textSecondary;
  }
};

const getDebtStatusColor = (status: string): string => {
  switch (status) {
    case 'Regeling':
      return colors.greenLight;
    case 'Open':
      return colors.orange;
    case 'Afbetaald':
      return colors.blue;
    default:
      return colors.textSecondary;
  }
};

export const UserDetailPDF = ({ data }: { data: UserDetailData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>KONSENSI</Text>
          <Text style={[styles.subtitle, { textAlign: 'left' }]}>Budgetbeheer</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.title}>GEBRUIKER RAPPORT</Text>
          <Text style={styles.subtitle}>ID: {data.userId}</Text>
        </View>
      </View>

      {/* Personal Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Persoonlijke Gegevens</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.card}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Naam</Text>
            <Text style={styles.dataValue}>[Geanonimiseerd]</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Leeftijd</Text>
            <Text style={styles.dataValue}>{data.personal.age} jaar</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Gemeente</Text>
            <Text style={styles.dataValue}>{data.personal.municipality}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Start datum</Text>
            <Text style={styles.dataValue}>{data.personal.startDate}</Text>
          </View>
          <View style={[styles.dataRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.dataLabel}>Status</Text>
            <View style={[styles.row]}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(data.personal.status) },
                ]}
              />
              <Text style={[styles.dataValue, { color: getStatusColor(data.personal.status) }]}>
                {getStatusText(data.personal.status)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Financial Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financieel Overzicht</Text>
        <View style={styles.sectionDivider} />

        {/* Debt Progress Cards */}
        <View style={[styles.statsRow, styles.mb12]}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(data.financial.totalDebt)}</Text>
            <Text style={styles.statLabel}>Totale Schuld</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValueGreen}>
              {formatCurrency(data.financial.paidAmount)} ({data.financial.paidPercentage}%)
            </Text>
            <Text style={styles.statLabel}>Afbetaald</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={[styles.card, styles.mb12]}>
          <Text style={[styles.dataLabel, styles.mb4]}>Voortgang aflossing</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${data.financial.paidPercentage}%` },
              ]}
            />
          </View>
        </View>

        {/* Income/Expenses */}
        <View style={styles.card}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Maandelijks inkomen</Text>
            <Text style={styles.dataValue}>{formatCurrency(data.financial.monthlyIncome)}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Vaste lasten</Text>
            <Text style={[styles.dataValue, { color: colors.red }]}>
              -{formatCurrency(data.financial.fixedExpenses)}
            </Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Beschikbaar</Text>
            <Text style={styles.dataValue}>{formatCurrency(data.financial.available)}</Text>
          </View>
          <View style={[styles.dataRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.dataLabel}>Aflossing/maand</Text>
            <Text style={[styles.dataValue, { color: colors.greenLight }]}>
              {formatCurrency(data.financial.monthlyPayment)}
            </Text>
          </View>
        </View>
      </View>

      {/* Debts Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schulden Breakdown</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Crediteur</Text>
            <Text style={styles.tableHeaderCell}>Bedrag</Text>
            <Text style={styles.tableHeaderCell}>Status</Text>
            <Text style={styles.tableHeaderCell}>Prioriteit</Text>
          </View>
          {data.debts.map((debt, index) => (
            <View
              key={index}
              style={
                index === data.debts.length - 1
                  ? [styles.tableRow, styles.tableRowLast]
                  : styles.tableRow
              }
            >
              <Text style={[styles.tableCell, { flex: 2 }]}>{debt.creditor}</Text>
              <Text style={styles.tableCell}>{formatCurrency(debt.amount)}</Text>
              <Text style={[styles.tableCell, { color: getDebtStatusColor(debt.status) }]}>
                {debt.status}
              </Text>
              <Text style={[styles.tableCell, { color: getPriorityColor(debt.priority) }]}>
                {debt.priority}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Payment History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Betalingshistorie (laatste 6 maanden)</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.card}>
          <View style={[styles.row, styles.spaceBetween, styles.mb8]}>
            {data.paymentHistory.map((payment, index) => (
              <View key={index} style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 9, color: colors.textSecondary, marginBottom: 4 }}>
                  {payment.month}
                </Text>
                <Text style={{ fontSize: 10, color: colors.textPrimary, marginBottom: 4 }}>
                  {formatCurrency(payment.amount)}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: payment.paid ? colors.greenLight : colors.red,
                  }}
                >
                  {payment.paid ? '✓' : '✗'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerConfidential}>Vertrouwelijk Document</Text>
        <Text style={styles.footerText}>Gegenereerd: {data.generatedAt}</Text>
      </View>
    </Page>
  </Document>
);

export default UserDetailPDF;
