// PDF Generation utilities
export {
  generateMonthlyReport,
  generateUserDetailReport,
  generateMunicipalityReport,
  getSampleMonthlyReportData,
  getSampleUserDetailData,
  getSampleMunicipalityReportData,
} from './generatePDF';

// Styles
export { pdfStyles, colors } from './PDFStyles';

// Types
export type {
  MonthlyReportData,
  UserDetailData,
  MunicipalityReportData,
} from './generatePDF';
