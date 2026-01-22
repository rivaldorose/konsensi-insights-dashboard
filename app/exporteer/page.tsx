'use client';

import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { exportData } from '@/lib/exportUtils';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Check,
  Loader2,
  Clock,
  Calendar,
  HardDrive,
} from 'lucide-react';

type ExportFormat = 'csv' | 'pdf';
type DateRange = 'all' | 'year' | 'quarter' | 'month' | 'custom';

interface DataOption {
  id: string;
  label: string;
  description: string;
  count: number;
  size: string;
  checked: boolean;
}

interface ExportHistory {
  id: string;
  name: string;
  format: 'csv' | 'pdf';
  date: string;
  size: string;
  dataTypes: string[];
}

const recentExports: ExportHistory[] = [
  {
    id: '1',
    name: 'gebruikers_schulden_export',
    format: 'csv',
    date: '22 jan 2026, 14:30',
    size: '2.4 MB',
    dataTypes: ['Gebruikers', 'Schulden'],
  },
  {
    id: '2',
    name: 'maandrapport_december',
    format: 'pdf',
    date: '20 jan 2026, 09:15',
    size: '1.8 MB',
    dataTypes: ['Gebruikers', 'Betalingen', 'Schulden'],
  },
  {
    id: '3',
    name: 'bewindvoerders_overzicht',
    format: 'csv',
    date: '18 jan 2026, 16:45',
    size: '456 KB',
    dataTypes: ['Bewindvoerders'],
  },
  {
    id: '4',
    name: 'transacties_q4_2025',
    format: 'pdf',
    date: '15 jan 2026, 11:00',
    size: '3.2 MB',
    dataTypes: ['Transacties', 'Betalingen'],
  },
];

export default function ExporteerPage() {
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [dataOptions, setDataOptions] = useState<DataOption[]>([
    {
      id: 'gebruikers',
      label: 'Gebruikers',
      description: 'Alle gebruikersgegevens en profielen',
      count: 156,
      size: '~450 KB',
      checked: true,
    },
    {
      id: 'schulden',
      label: 'Schulden',
      description: 'Schuldenregistraties en aflossingsplannen',
      count: 89,
      size: '~280 KB',
      checked: true,
    },
    {
      id: 'transacties',
      label: 'Transacties',
      description: 'Financiële transactiegeschiedenis',
      count: 1247,
      size: '~1.2 MB',
      checked: false,
    },
    {
      id: 'betalingen',
      label: 'Betalingen',
      description: 'Betalingsoverzichten en statussen',
      count: 534,
      size: '~680 KB',
      checked: false,
    },
    {
      id: 'bewindvoerders',
      label: 'Bewindvoerders',
      description: 'Bewindvoerder informatie en toewijzingen',
      count: 24,
      size: '~85 KB',
      checked: false,
    },
    {
      id: 'audit',
      label: 'Audit Logs',
      description: 'Systeem audit trail en activiteiten',
      count: 5621,
      size: '~2.8 MB',
      checked: false,
    },
  ]);

  const toggleDataOption = (id: string) => {
    setDataOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, checked: !opt.checked } : opt))
    );
  };

  const selectAll = () => {
    setDataOptions((prev) => prev.map((opt) => ({ ...opt, checked: true })));
  };

  const selectNone = () => {
    setDataOptions((prev) => prev.map((opt) => ({ ...opt, checked: false })));
  };

  const [lastExportFilename, setLastExportFilename] = useState('');

  const handleExport = async () => {
    const selectedTypes = dataOptions.filter(opt => opt.checked).map(opt => opt.id);
    if (selectedTypes.length === 0) return;

    setIsExporting(true);
    try {
      const result = await exportData(format, selectedTypes, dateRange);
      if (result.success) {
        setLastExportFilename(result.filename);
        setExportComplete(true);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleRedownload = () => {
    const selectedTypes = dataOptions.filter(opt => opt.checked).map(opt => opt.id);
    exportData(format, selectedTypes, dateRange);
  };

  const handleNewExport = () => {
    setExportComplete(false);
  };

  const selectedCount = dataOptions.filter((opt) => opt.checked).length;
  const totalRecords = dataOptions
    .filter((opt) => opt.checked)
    .reduce((sum, opt) => sum + opt.count, 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f0f0f]">
      <Navbar />

      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827] dark:text-white">Exporteer</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Exporteer data voor rapportages en audits</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Export Form */}
          <div className="lg:col-span-2 space-y-6">
            {exportComplete ? (
              // Success State
              <div className="bg-white dark:bg-gray-900 rounded-[20px] p-12 shadow-sm shadow-gray-100 dark:shadow-gray-800 border border-gray-100 dark:border-gray-800">
                <div className="text-center max-w-md mx-auto">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">Export voltooid!</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    Je bestand is succesvol gegenereerd en wordt nu gedownload.
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    {selectedCount} datasets • {totalRecords.toLocaleString('nl-NL')} records •{' '}
                    {format.toUpperCase()}
                  </p>
                  {lastExportFilename && (
                    <p className="text-xs text-gray-400 mb-8 font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg inline-block">
                      {lastExportFilename}
                    </p>
                  )}
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleNewExport}
                      className="px-6 py-3 bg-[#3D7B4C] text-white rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors"
                    >
                      Nieuwe export
                    </button>
                    <button
                      onClick={handleRedownload}
                      className="px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded-full font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Download opnieuw
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Format Selection */}
                <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm shadow-gray-100 dark:shadow-gray-800 border border-gray-100 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-[#111827] dark:text-white mb-4">Export Formaat</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFormat('csv')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        format === 'csv'
                          ? 'border-[#3D7B4C] bg-[#3D7B4C]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <FileSpreadsheet
                        className={`w-10 h-10 mb-3 ${
                          format === 'csv' ? 'text-[#3D7B4C]' : 'text-gray-400'
                        }`}
                      />
                      <p
                        className={`font-semibold text-lg ${
                          format === 'csv' ? 'text-[#3D7B4C]' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        CSV / Excel
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Ideaal voor data analyse en Excel
                      </p>
                    </button>
                    <button
                      onClick={() => setFormat('pdf')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        format === 'pdf'
                          ? 'border-[#3D7B4C] bg-[#3D7B4C]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <FileText
                        className={`w-10 h-10 mb-3 ${
                          format === 'pdf' ? 'text-[#3D7B4C]' : 'text-gray-400'
                        }`}
                      />
                      <p
                        className={`font-semibold text-lg ${
                          format === 'pdf' ? 'text-[#3D7B4C]' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        PDF Rapport
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Professionele rapportages en audits
                      </p>
                    </button>
                  </div>
                </div>

                {/* Data Selection */}
                <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm shadow-gray-100 dark:shadow-gray-800 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#111827] dark:text-white">Selecteer Data</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={selectAll}
                        className="text-sm text-[#3D7B4C] hover:underline"
                      >
                        Alles selecteren
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={selectNone}
                        className="text-sm text-gray-500 hover:underline"
                      >
                        Niets selecteren
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {dataOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          option.checked
                            ? 'border-[#3D7B4C] bg-[#3D7B4C]/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                              option.checked ? 'bg-[#3D7B4C]' : 'border-2 border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {option.checked && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{option.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {option.count.toLocaleString('nl-NL')} records
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{option.size}</p>
                        </div>
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
                <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm shadow-gray-100 dark:shadow-gray-800 border border-gray-100 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-[#111827] dark:text-white mb-4">Periode</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { id: 'all', label: 'Alle data' },
                      { id: 'year', label: 'Dit jaar' },
                      { id: 'quarter', label: 'Dit kwartaal' },
                      { id: 'month', label: 'Deze maand' },
                      { id: 'custom', label: 'Aangepaste periode' },
                    ].map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setDateRange(range.id as DateRange)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                          dateRange === range.id
                            ? 'bg-[#3D7B4C] text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                  {dateRange === 'custom' && (
                    <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Van datum
                        </label>
                        <input
                          type="date"
                          value={customFrom}
                          onChange={(e) => setCustomFrom(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tot datum
                        </label>
                        <input
                          type="date"
                          value={customTo}
                          onChange={(e) => setCustomTo(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Export Button */}
                <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm shadow-gray-100 dark:shadow-gray-800 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Geselecteerd</p>
                      <p className="text-lg font-semibold text-[#111827] dark:text-white">
                        {selectedCount} datasets • {totalRecords.toLocaleString('nl-NL')} records
                      </p>
                    </div>
                    <button
                      onClick={handleExport}
                      disabled={isExporting || selectedCount === 0}
                      className="flex items-center gap-2 px-8 py-3 bg-[#3D7B4C] text-white rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#3D7B4C]/20"
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Exporteren...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Exporteren
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar - Recent Exports */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm shadow-gray-100 dark:shadow-gray-800 border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-white mb-4">Export Statistieken</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#111827] dark:text-white">47</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Exports deze maand</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <HardDrive className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#111827] dark:text-white">128 MB</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Totaal geëxporteerd</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#111827] dark:text-white">2 uur</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sinds laatste export</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Exports */}
            <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm shadow-gray-100 dark:shadow-gray-800 border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-white mb-4">Recente Exports</h3>
              <div className="space-y-3">
                {recentExports.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {exp.format === 'csv' ? (
                          <FileSpreadsheet className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[140px]">
                          {exp.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{exp.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {exp.date}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.dataTypes.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 bg-white dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 text-sm text-[#3D7B4C] font-medium hover:bg-[#3D7B4C]/5 rounded-xl transition-colors">
                Bekijk alle exports
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
