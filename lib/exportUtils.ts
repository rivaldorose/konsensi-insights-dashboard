// Export utility functions for CSV and PDF generation

// Sample data generators (in production these would fetch from API/database)
const generateGebruikersData = () => [
  { id: 1, naam: 'Jan van der Berg', email: 'jan@email.nl', status: 'Actief', aangemaakt: '2025-01-15', schuld: 4500 },
  { id: 2, naam: 'Maria de Vries', email: 'maria@email.nl', status: 'Actief', aangemaakt: '2025-01-12', schuld: 8200 },
  { id: 3, naam: 'Pieter Jansen', email: 'pieter@email.nl', status: 'In behandeling', aangemaakt: '2025-01-10', schuld: 3100 },
  { id: 4, naam: 'Anna Bakker', email: 'anna@email.nl', status: 'Actief', aangemaakt: '2025-01-08', schuld: 12500 },
  { id: 5, naam: 'Thomas Visser', email: 'thomas@email.nl', status: 'Afgerond', aangemaakt: '2024-12-20', schuld: 0 },
  { id: 6, naam: 'Sophie Smit', email: 'sophie@email.nl', status: 'Actief', aangemaakt: '2024-12-15', schuld: 6700 },
  { id: 7, naam: 'Lucas de Graaf', email: 'lucas@email.nl', status: 'In behandeling', aangemaakt: '2024-12-10', schuld: 9800 },
  { id: 8, naam: 'Emma Mulder', email: 'emma@email.nl', status: 'Actief', aangemaakt: '2024-12-05', schuld: 2300 },
];

const generateSchuldenData = () => [
  { id: 1, gebruiker: 'Jan van der Berg', schuldeiser: 'CJIB', bedrag: 1500, status: 'Lopend', startdatum: '2024-06-01' },
  { id: 2, gebruiker: 'Jan van der Berg', schuldeiser: 'Ziggo', bedrag: 450, status: 'Lopend', startdatum: '2024-08-15' },
  { id: 3, gebruiker: 'Maria de Vries', schuldeiser: 'Belastingdienst', bedrag: 3200, status: 'Betalingsregeling', startdatum: '2024-03-01' },
  { id: 4, gebruiker: 'Maria de Vries', schuldeiser: 'Energieleverancier', bedrag: 890, status: 'Lopend', startdatum: '2024-09-01' },
  { id: 5, gebruiker: 'Pieter Jansen', schuldeiser: 'Zorgverzekeraar', bedrag: 1200, status: 'Lopend', startdatum: '2024-07-01' },
  { id: 6, gebruiker: 'Anna Bakker', schuldeiser: 'Bank lening', bedrag: 8500, status: 'Betalingsregeling', startdatum: '2023-12-01' },
  { id: 7, gebruiker: 'Anna Bakker', schuldeiser: 'Creditcard', bedrag: 2400, status: 'Lopend', startdatum: '2024-04-01' },
];

const generateTransactiesData = () => [
  { id: 1, datum: '2026-01-22', type: 'Betaling', bedrag: -150, omschrijving: 'Maandelijkse aflossing CJIB', gebruiker: 'Jan van der Berg' },
  { id: 2, datum: '2026-01-21', type: 'Betaling', bedrag: -200, omschrijving: 'Betalingsregeling Belastingdienst', gebruiker: 'Maria de Vries' },
  { id: 3, datum: '2026-01-20', type: 'Inkomend', bedrag: 1850, omschrijving: 'Salaris storting', gebruiker: 'Pieter Jansen' },
  { id: 4, datum: '2026-01-19', type: 'Betaling', bedrag: -350, omschrijving: 'Aflossing bank lening', gebruiker: 'Anna Bakker' },
  { id: 5, datum: '2026-01-18', type: 'Betaling', bedrag: -75, omschrijving: 'Ziggo factuur', gebruiker: 'Jan van der Berg' },
  { id: 6, datum: '2026-01-17', type: 'Inkomend', bedrag: 250, omschrijving: 'Toeslagen', gebruiker: 'Sophie Smit' },
];

const generateBetalingenData = () => [
  { id: 1, gebruiker: 'Jan van der Berg', schuldeiser: 'CJIB', bedrag: 150, datum: '2026-01-22', status: 'Voltooid' },
  { id: 2, gebruiker: 'Maria de Vries', schuldeiser: 'Belastingdienst', bedrag: 200, datum: '2026-01-21', status: 'Voltooid' },
  { id: 3, gebruiker: 'Anna Bakker', schuldeiser: 'Bank lening', bedrag: 350, datum: '2026-01-19', status: 'Voltooid' },
  { id: 4, gebruiker: 'Jan van der Berg', schuldeiser: 'Ziggo', bedrag: 75, datum: '2026-01-18', status: 'Voltooid' },
  { id: 5, gebruiker: 'Pieter Jansen', schuldeiser: 'Zorgverzekeraar', bedrag: 100, datum: '2026-01-15', status: 'Voltooid' },
  { id: 6, gebruiker: 'Sophie Smit', schuldeiser: 'Energieleverancier', bedrag: 125, datum: '2026-01-14', status: 'Gepland' },
];

const generateBewindvoerdersData = () => [
  { id: 1, naam: 'Mr. K. de Jong', kantoor: 'De Jong Bewindvoering', clienten: 45, actief: true, telefoon: '020-1234567' },
  { id: 2, naam: 'Mw. L. Hendriks', kantoor: 'Hendriks & Partners', clienten: 38, actief: true, telefoon: '030-2345678' },
  { id: 3, naam: 'Mr. P. van Dijk', kantoor: 'Van Dijk Bewind', clienten: 52, actief: true, telefoon: '010-3456789' },
  { id: 4, naam: 'Mw. S. Willems', kantoor: 'Willems Bewindvoering', clienten: 21, actief: false, telefoon: '040-4567890' },
];

const generateAuditData = () => [
  { id: 1, timestamp: '2026-01-22 14:32:15', actie: 'LOGIN', gebruiker: 'admin@konsensi.nl', details: 'Succesvol ingelogd', ip: '192.168.1.1' },
  { id: 2, timestamp: '2026-01-22 14:30:00', actie: 'EXPORT', gebruiker: 'rivaldo@konsensi.nl', details: 'Data export gestart', ip: '192.168.1.2' },
  { id: 3, timestamp: '2026-01-22 14:25:33', actie: 'UPDATE', gebruiker: 'admin@konsensi.nl', details: 'Gebruiker status gewijzigd', ip: '192.168.1.1' },
  { id: 4, timestamp: '2026-01-22 14:20:00', actie: 'CREATE', gebruiker: 'rivaldo@konsensi.nl', details: 'Nieuwe schuld toegevoegd', ip: '192.168.1.2' },
  { id: 5, timestamp: '2026-01-22 14:15:45', actie: 'DELETE', gebruiker: 'admin@konsensi.nl', details: 'Betaling verwijderd', ip: '192.168.1.1' },
];

// Data fetcher based on data type
export const getDataForType = (dataType: string): Record<string, unknown>[] => {
  switch (dataType) {
    case 'gebruikers':
      return generateGebruikersData();
    case 'schulden':
      return generateSchuldenData();
    case 'transacties':
      return generateTransactiesData();
    case 'betalingen':
      return generateBetalingenData();
    case 'bewindvoerders':
      return generateBewindvoerdersData();
    case 'audit':
      return generateAuditData();
    default:
      return [];
  }
};

// Convert data to CSV format
export const convertToCSV = (data: Record<string, unknown>[]): string => {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows: string[] = [];

  // Add header row
  csvRows.push(headers.join(';'));

  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Escape quotes and wrap in quotes if contains separator or quotes
      const stringValue = String(value ?? '');
      if (stringValue.includes(';') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvRows.push(values.join(';'));
  }

  // Add BOM for Excel compatibility with Dutch characters
  return '\uFEFF' + csvRows.join('\n');
};

// Generate combined CSV for multiple data types
export const generateCombinedCSV = (selectedTypes: string[]): string => {
  const sections: string[] = [];

  for (const dataType of selectedTypes) {
    const data = getDataForType(dataType);
    if (data.length > 0) {
      const typeLabel = dataType.charAt(0).toUpperCase() + dataType.slice(1);
      sections.push(`\n=== ${typeLabel} ===\n`);
      sections.push(convertToCSV(data));
    }
  }

  return '\uFEFF' + sections.join('\n\n');
};

// Generate PDF content (as HTML that can be printed to PDF)
export const generatePDFContent = (selectedTypes: string[], dateRange: string): string => {
  const currentDate = new Date().toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let html = `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
      <meta charset="UTF-8">
      <title>Konsensi Export Rapport</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #111827;
          padding: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #3D7B4C;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-icon {
          width: 48px;
          height: 48px;
          background: #3D7B4C;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }
        .logo-text {
          font-size: 24px;
          font-weight: bold;
          color: #111827;
        }
        .meta {
          text-align: right;
          color: #6b7280;
          font-size: 14px;
        }
        .section {
          margin-bottom: 40px;
        }
        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #3D7B4C;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e5e7eb;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        th {
          background: #f3f4f6;
          padding: 12px 8px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
        }
        td {
          padding: 10px 8px;
          border-bottom: 1px solid #e5e7eb;
        }
        tr:nth-child(even) {
          background: #f9fafb;
        }
        .summary {
          background: #f0fdf4;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 40px;
        }
        .summary-title {
          font-weight: 600;
          color: #166534;
          margin-bottom: 12px;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .summary-item {
          text-align: center;
        }
        .summary-value {
          font-size: 24px;
          font-weight: bold;
          color: #3D7B4C;
        }
        .summary-label {
          font-size: 12px;
          color: #6b7280;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #9ca3af;
          font-size: 12px;
        }
        @media print {
          body { padding: 20px; }
          .section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">
          <div class="logo-icon">🌲</div>
          <div class="logo-text">KONSENSI</div>
        </div>
        <div class="meta">
          <p><strong>Export Rapport</strong></p>
          <p>Gegenereerd: ${currentDate}</p>
          <p>Periode: ${getDateRangeLabel(dateRange)}</p>
        </div>
      </div>
  `;

  // Calculate totals for summary
  let totalGebruikers = 0;
  let totalSchuld = 0;
  let totalBetalingen = 0;

  if (selectedTypes.includes('gebruikers')) {
    const data = generateGebruikersData();
    totalGebruikers = data.length;
    totalSchuld = data.reduce((sum, u) => sum + (u.schuld as number), 0);
  }
  if (selectedTypes.includes('betalingen')) {
    const data = generateBetalingenData();
    totalBetalingen = data.reduce((sum, b) => sum + (b.bedrag as number), 0);
  }

  // Add summary
  html += `
    <div class="summary">
      <div class="summary-title">Samenvatting Export</div>
      <div class="summary-grid">
        <div class="summary-item">
          <div class="summary-value">${totalGebruikers}</div>
          <div class="summary-label">Gebruikers</div>
        </div>
        <div class="summary-item">
          <div class="summary-value">€${totalSchuld.toLocaleString('nl-NL')}</div>
          <div class="summary-label">Totale Schuld</div>
        </div>
        <div class="summary-item">
          <div class="summary-value">€${totalBetalingen.toLocaleString('nl-NL')}</div>
          <div class="summary-label">Betalingen</div>
        </div>
      </div>
    </div>
  `;

  // Add each data section
  for (const dataType of selectedTypes) {
    const data = getDataForType(dataType);
    if (data.length > 0) {
      const typeLabel = getTypeLabel(dataType);
      html += `
        <div class="section">
          <div class="section-title">${typeLabel}</div>
          <table>
            <thead>
              <tr>
                ${Object.keys(data[0]).map(key => `<th>${formatHeader(key)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>
                  ${Object.values(row).map(value => `<td>${formatValue(value)}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  html += `
      <div class="footer">
        <p>Dit rapport is automatisch gegenereerd door Konsensi</p>
        <p>© ${new Date().getFullYear()} Konsensi - Schuldhulpverlening Platform</p>
      </div>
    </body>
    </html>
  `;

  return html;
};

// Helper functions
const getDateRangeLabel = (dateRange: string): string => {
  switch (dateRange) {
    case 'all': return 'Alle data';
    case 'year': return 'Dit jaar (2026)';
    case 'quarter': return 'Dit kwartaal (Q1 2026)';
    case 'month': return 'Deze maand (januari 2026)';
    default: return 'Aangepaste periode';
  }
};

const getTypeLabel = (dataType: string): string => {
  const labels: Record<string, string> = {
    gebruikers: 'Gebruikers',
    schulden: 'Schulden',
    transacties: 'Transacties',
    betalingen: 'Betalingen',
    bewindvoerders: 'Bewindvoerders',
    audit: 'Audit Logs'
  };
  return labels[dataType] || dataType;
};

const formatHeader = (key: string): string => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
};

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nee';
  if (typeof value === 'number') {
    // Check if it looks like a currency value
    if (Math.abs(value) >= 100) {
      return `€${value.toLocaleString('nl-NL')}`;
    }
    return value.toLocaleString('nl-NL');
  }
  return String(value);
};

// Trigger file download
export const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Main export function
export const exportData = async (
  format: 'csv' | 'pdf',
  selectedTypes: string[],
  dateRange: string
): Promise<{ success: boolean; filename: string }> => {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const typesLabel = selectedTypes.length > 2
    ? `${selectedTypes.length}_datasets`
    : selectedTypes.join('_');

  if (format === 'csv') {
    const csvContent = generateCombinedCSV(selectedTypes);
    const filename = `konsensi_export_${typesLabel}_${timestamp}.csv`;
    downloadFile(csvContent, filename, 'text/csv;charset=utf-8');
    return { success: true, filename };
  } else {
    // For PDF, we generate HTML and open in new window for printing
    const htmlContent = generatePDFContent(selectedTypes, dateRange);
    const filename = `konsensi_rapport_${typesLabel}_${timestamp}.pdf`;

    // Open in new window with print dialog
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load, then trigger print
      printWindow.onload = () => {
        printWindow.print();
      };
    }

    return { success: true, filename };
  }
};
