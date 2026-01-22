import { StyleSheet } from '@react-pdf/renderer';

// Register Helvetica as fallback (built-in)
// For production, you might want to register custom fonts

export const colors = {
  // Dark mode colors (PDF uses dark theme)
  background: '#0a0a0a',
  backgroundSecondary: '#111111',
  card: '#1a1a1a',
  cardHover: '#222222',

  // Borders
  borderSubtle: '#2a2a2a',
  borderMedium: '#333333',

  // Text
  textPrimary: '#ffffff',
  textSecondary: '#888888',
  textTertiary: '#666666',

  // Brand colors
  greenPrimary: '#3D7B4C',
  greenLight: '#4a9d5c',
  greenDark: '#2d5a38',
  greenMuted: 'rgba(61, 123, 76, 0.2)',

  // Accent colors
  orange: '#f59e0b',
  orangeMuted: 'rgba(245, 158, 11, 0.2)',
  red: '#ef4444',
  redMuted: 'rgba(239, 68, 68, 0.2)',
  blue: '#3b82f6',
  blueMuted: 'rgba(59, 130, 246, 0.2)',
  purple: '#8b5cf6',
  pink: '#ec4899',
};

export const pdfStyles = StyleSheet.create({
  // Page
  page: {
    backgroundColor: colors.background,
    padding: 40,
    fontFamily: 'Helvetica',
    position: 'relative',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  logo: {
    width: 100,
    height: 32,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.greenLight,
    letterSpacing: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'right',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 2,
  },

  // Sections
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.greenLight,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginBottom: 15,
  },

  // Cards
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statValueGreen: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.greenLight,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Tables
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.card,
  },
  tableRowLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    color: colors.textPrimary,
  },
  tableCellGreen: {
    flex: 1,
    fontSize: 10,
    color: colors.greenLight,
  },
  tableCellSecondary: {
    flex: 1,
    fontSize: 10,
    color: colors.textSecondary,
  },

  // Two columns
  twoColumns: {
    flexDirection: 'row',
    gap: 15,
  },
  column: {
    flex: 1,
  },

  // Data rows (key-value pairs)
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  dataLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  dataValue: {
    fontSize: 10,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },

  // Badges
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeGreen: {
    backgroundColor: colors.greenMuted,
    color: colors.greenLight,
  },
  badgeOrange: {
    backgroundColor: colors.orangeMuted,
    color: colors.orange,
  },
  badgeRed: {
    backgroundColor: colors.redMuted,
    color: colors.red,
  },
  badgeBlue: {
    backgroundColor: colors.blueMuted,
    color: colors.blue,
  },

  // Status indicator
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusActive: {
    backgroundColor: colors.greenLight,
  },
  statusWarning: {
    backgroundColor: colors.orange,
  },
  statusInactive: {
    backgroundColor: colors.red,
  },

  // Alerts/Highlights
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingVertical: 4,
  },
  alertIcon: {
    width: 16,
    fontSize: 12,
    marginRight: 8,
  },
  alertText: {
    fontSize: 10,
    color: colors.textPrimary,
    flex: 1,
  },

  // Progress bar
  progressBar: {
    height: 6,
    backgroundColor: colors.borderSubtle,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.greenLight,
    borderRadius: 3,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: 15,
  },
  footerText: {
    fontSize: 8,
    color: colors.textTertiary,
  },
  footerConfidential: {
    fontSize: 8,
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Utility
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  mb4: {
    marginBottom: 4,
  },
  mb8: {
    marginBottom: 8,
  },
  mb12: {
    marginBottom: 12,
  },
  mb16: {
    marginBottom: 16,
  },
  mt8: {
    marginTop: 8,
  },
  mt12: {
    marginTop: 12,
  },

  // Chart placeholder (for visual elements)
  chartPlaceholder: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },

  // Horizontal bar chart
  barChartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  barLabel: {
    width: 100,
    fontSize: 9,
    color: colors.textSecondary,
  },
  barContainer: {
    flex: 1,
    height: 12,
    backgroundColor: colors.borderSubtle,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  barValue: {
    width: 60,
    fontSize: 9,
    color: colors.textPrimary,
    textAlign: 'right',
  },
});

export default pdfStyles;
