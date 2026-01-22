'use client';

import { useState } from 'react';
import { X, FileSpreadsheet, FileText, Check, Loader2 } from 'lucide-react';

type ExportFormat = 'csv' | 'pdf';
type DateRange = 'all' | 'year' | 'quarter' | 'month' | 'custom';

interface DataOption {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [dataOptions, setDataOptions] = useState<DataOption[]>([
    { id: 'gebruikers', label: 'Gebruikers', count: 156, checked: true },
    { id: 'schulden', label: 'Schulden', count: 89, checked: true },
    { id: 'transacties', label: 'Transacties', count: 1247, checked: false },
    { id: 'betalingen', label: 'Betalingen', count: 534, checked: false },
    { id: 'bewindvoerders', label: 'Bewindvoerders', count: 24, checked: false },
  ]);

  const toggleDataOption = (id: string) => {
    setDataOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, checked: !opt.checked } : opt))
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExporting(false);
    setExportComplete(true);
  };

  const handleNewExport = () => {
    setExportComplete(false);
    setDataOptions((prev) => prev.map((opt) => ({ ...opt, checked: false })));
  };

  const handleClose = () => {
    setExportComplete(false);
    setIsExporting(false);
    onClose();
  };

  const selectedCount = dataOptions.filter((opt) => opt.checked).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-[20px] w-full max-w-[500px] mx-4 shadow-2xl border border-border-subtle">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle">
          <h2 className="text-xl font-semibold text-foreground">Data Exporteren</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-border-subtle hover:bg-border-medium flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {exportComplete ? (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-konsensi-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-konsensi-green-light" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Export voltooid!</h3>
              <p className="text-text-secondary mb-6">Je bestand wordt gedownload</p>
              <button
                onClick={handleNewExport}
                className="px-6 py-2.5 bg-konsensi-green text-foreground rounded-full font-medium text-sm hover:bg-konsensi-green-light transition-colors"
              >
                Nog een export
              </button>
            </div>
          ) : (
            <>
              {/* Export Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Exporteer formaat
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormat('csv')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      format === 'csv'
                        ? 'border-konsensi-green bg-konsensi-green/10'
                        : 'border-border-subtle hover:border-border-medium bg-card-hover'
                    }`}
                  >
                    <FileSpreadsheet
                      className={`w-8 h-8 mx-auto mb-2 ${
                        format === 'csv' ? 'text-konsensi-green' : 'text-text-secondary'
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        format === 'csv' ? 'text-konsensi-green' : 'text-foreground'
                      }`}
                    >
                      CSV
                    </p>
                    <p className="text-xs text-text-secondary mt-1">Voor Excel en data analyse</p>
                  </button>
                  <button
                    onClick={() => setFormat('pdf')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      format === 'pdf'
                        ? 'border-konsensi-green bg-konsensi-green/10'
                        : 'border-border-subtle hover:border-border-medium bg-card-hover'
                    }`}
                  >
                    <FileText
                      className={`w-8 h-8 mx-auto mb-2 ${
                        format === 'pdf' ? 'text-konsensi-green' : 'text-text-secondary'
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        format === 'pdf' ? 'text-konsensi-green' : 'text-foreground'
                      }`}
                    >
                      PDF
                    </p>
                    <p className="text-xs text-text-secondary mt-1">Voor rapportages en presentaties</p>
                  </button>
                </div>
              </div>

              {/* Data Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Selecteer data om te exporteren
                </label>
                <div className="space-y-2">
                  {dataOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-border-subtle hover:border-border-medium bg-card-hover cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            option.checked
                              ? 'bg-konsensi-green'
                              : 'border-2 border-[#555555]'
                          }`}
                        >
                          {option.checked && <Check className="w-3 h-3 text-foreground" />}
                        </div>
                        <span className="text-sm text-foreground">{option.label}</span>
                      </div>
                      <span className="text-xs text-text-secondary">
                        {option.count.toLocaleString('nl-NL')} records
                      </span>
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={() => toggleDataOption(option.id)}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Periode
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    { id: 'all', label: 'Alles' },
                    { id: 'year', label: 'Dit jaar' },
                    { id: 'quarter', label: 'Dit kwartaal' },
                    { id: 'month', label: 'Deze maand' },
                    { id: 'custom', label: 'Aangepast' },
                  ].map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setDateRange(range.id as DateRange)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        dateRange === range.id
                          ? 'bg-konsensi-green text-foreground'
                          : 'bg-border-subtle text-text-secondary hover:bg-border-medium hover:text-foreground'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
                {dateRange === 'custom' && (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-text-secondary mb-1">Van</label>
                      <input
                        type="date"
                        value={customFrom}
                        onChange={(e) => setCustomFrom(e.target.value)}
                        className="w-full px-3 py-2 border border-border-subtle bg-input rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-konsensi-green/20 focus:border-konsensi-green"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-text-secondary mb-1">Tot</label>
                      <input
                        type="date"
                        value={customTo}
                        onChange={(e) => setCustomTo(e.target.value)}
                        className="w-full px-3 py-2 border border-border-subtle bg-input rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-konsensi-green/20 focus:border-konsensi-green"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!exportComplete && (
          <div className="flex items-center justify-between p-6 border-t border-border-subtle">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 border border-border-medium text-text-secondary rounded-full font-medium text-sm hover:bg-input hover:text-foreground transition-colors"
            >
              Annuleren
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || selectedCount === 0}
              className="flex items-center gap-2 px-6 py-2.5 bg-konsensi-green text-foreground rounded-full font-medium text-sm hover:bg-konsensi-green-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Bezig met exporteren...
                </>
              ) : (
                <>Exporteren ({selectedCount})</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
