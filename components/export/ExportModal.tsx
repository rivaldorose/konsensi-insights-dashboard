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
      <div className="relative bg-white rounded-[20px] w-full max-w-[500px] mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-[#111827]">Data Exporteren</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {exportComplete ? (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">Export voltooid!</h3>
              <p className="text-gray-500 mb-6">Je bestand wordt gedownload</p>
              <button
                onClick={handleNewExport}
                className="px-6 py-2.5 bg-[#3D7B4C] text-white rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors"
              >
                Nog een export
              </button>
            </div>
          ) : (
            <>
              {/* Export Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Exporteer formaat
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormat('csv')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      format === 'csv'
                        ? 'border-[#3D7B4C] bg-[#3D7B4C]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileSpreadsheet
                      className={`w-8 h-8 mx-auto mb-2 ${
                        format === 'csv' ? 'text-[#3D7B4C]' : 'text-gray-400'
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        format === 'csv' ? 'text-[#3D7B4C]' : 'text-gray-700'
                      }`}
                    >
                      CSV
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Voor Excel en data analyse</p>
                  </button>
                  <button
                    onClick={() => setFormat('pdf')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      format === 'pdf'
                        ? 'border-[#3D7B4C] bg-[#3D7B4C]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileText
                      className={`w-8 h-8 mx-auto mb-2 ${
                        format === 'pdf' ? 'text-[#3D7B4C]' : 'text-gray-400'
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        format === 'pdf' ? 'text-[#3D7B4C]' : 'text-gray-700'
                      }`}
                    >
                      PDF
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Voor rapportages en presentaties</p>
                  </button>
                </div>
              </div>

              {/* Data Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Selecteer data om te exporteren
                </label>
                <div className="space-y-2">
                  {dataOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            option.checked
                              ? 'bg-[#3D7B4C]'
                              : 'border-2 border-gray-300'
                          }`}
                        >
                          {option.checked && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </div>
                      <span className="text-xs text-gray-400">
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
                <label className="block text-sm font-medium text-gray-700 mb-3">
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
                          ? 'bg-[#3D7B4C] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
                {dateRange === 'custom' && (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">Van</label>
                      <input
                        type="date"
                        value={customFrom}
                        onChange={(e) => setCustomFrom(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">Tot</label>
                      <input
                        type="date"
                        value={customTo}
                        onChange={(e) => setCustomTo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
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
          <div className="flex items-center justify-between p-6 border-t border-gray-100">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              Annuleren
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || selectedCount === 0}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#3D7B4C] text-white rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
