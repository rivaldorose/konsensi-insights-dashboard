// Export utility functions for CSV and PDF generation

export interface ExportOptions {
  format: 'csv' | 'pdf';
  data: string[];
  dateRange: {
    type: 'all' | 'year' | 'quarter' | 'month' | 'custom';
    from?: string;
    to?: string;
  };
}

// Generate CSV content from data
export function generateCSV(data: Record<string, unknown>[], columns: string[]): string {
  const header = columns.join(',');
  const rows = data.map((row) =>
    columns
      .map((col) => {
        const value = row[col];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      })
      .join(',')
  );
  return [header, ...rows].join('\n');
}

// Trigger file download
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export users data
export function exportUsers(users: Record<string, unknown>[]): string {
  const columns = ['id', 'naam', 'email', 'stad', 'status', 'totaleSchuld', 'inkomen', 'aangemeld'];
  return generateCSV(users, columns);
}

// Export debts data
export function exportDebts(debts: Record<string, unknown>[]): string {
  const columns = ['id', 'gebruiker', 'crediteur', 'type', 'origineel', 'huidig', 'urgentie', 'status'];
  return generateCSV(debts, columns);
}

// Export payments data
export function exportPayments(payments: Record<string, unknown>[]): string {
  const columns = ['id', 'datum', 'tijd', 'gebruiker', 'schuld', 'bedrag', 'methode', 'status', 'referentie'];
  return generateCSV(payments, columns);
}

// Get date range filter
export function getDateRange(type: string, customFrom?: string, customTo?: string): { from: Date; to: Date } {
  const now = new Date();
  const to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  switch (type) {
    case 'year':
      return {
        from: new Date(now.getFullYear(), 0, 1),
        to,
      };
    case 'quarter': {
      const quarterStart = Math.floor(now.getMonth() / 3) * 3;
      return {
        from: new Date(now.getFullYear(), quarterStart, 1),
        to,
      };
    }
    case 'month':
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1),
        to,
      };
    case 'custom':
      return {
        from: customFrom ? new Date(customFrom) : new Date(0),
        to: customTo ? new Date(customTo) : to,
      };
    default: // 'all'
      return {
        from: new Date(0),
        to,
      };
  }
}

// Format date for filename
export function formatDateForFilename(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Main export function
export async function performExport(options: ExportOptions): Promise<void> {
  const { format, data } = options;
  const date = formatDateForFilename();

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (format === 'csv') {
    // For CSV, we'd generate actual CSV content from the selected data
    const csvContent = `# Konsensi Export - ${date}\n# Geselecteerde data: ${data.join(', ')}\n\nVoorbeeld data export...`;
    downloadFile(csvContent, `konsensi-export-${date}.csv`, 'text/csv');
  } else {
    // For PDF, in a real app you'd use a library like jsPDF or react-pdf
    // For now, we'll just simulate the download
    const pdfContent = `Konsensi Export Report - ${date}\n\nGeselecteerde data: ${data.join(', ')}`;
    downloadFile(pdfContent, `konsensi-export-${date}.txt`, 'text/plain');
  }
}
