'use client';

import { useState } from 'react';
import { X, ChevronRight, ArrowLeft, TrendingUp, TrendingDown, Users, CreditCard, Calendar } from 'lucide-react';

interface DrillDownData {
  title: string;
  value: string | number;
  change?: number;
  details: {
    label: string;
    value: string | number;
    subValue?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  breakdown?: {
    category: string;
    items: {
      name: string;
      value: number;
      percentage: number;
    }[];
  };
}

interface ChartDrillDownProps {
  isOpen: boolean;
  onClose: () => void;
  data: DrillDownData | null;
  chartType?: 'bar' | 'line' | 'pie' | 'area';
}

export function ChartDrillDown({ isOpen, onClose, data }: ChartDrillDownProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!isOpen || !data) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      setSelectedCategory(null);
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {selectedCategory && (
              <button
                onClick={handleBack}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-semibold text-[#111827] dark:text-white">
                {selectedCategory || data.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedCategory ? 'Detail breakdown' : 'Klik voor meer details'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              setSelectedCategory(null);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {!selectedCategory ? (
            <>
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-[#3D7B4C]/10 to-[#8FD14F]/10 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Totale waarde</p>
                    <p className="text-3xl font-bold text-[#111827] dark:text-white">
                      {typeof data.value === 'number'
                        ? data.value.toLocaleString('nl-NL')
                        : data.value}
                    </p>
                  </div>
                  {data.change !== undefined && (
                    <div
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                        data.change >= 0
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}
                    >
                      {data.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {data.change >= 0 ? '+' : ''}
                        {data.change}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {data.details.map((detail, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{detail.label}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-semibold text-[#111827] dark:text-white">
                        {typeof detail.value === 'number'
                          ? detail.value.toLocaleString('nl-NL')
                          : detail.value}
                      </p>
                      {detail.trend && (
                        <div
                          className={`p-1.5 rounded-lg ${
                            detail.trend === 'up'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : detail.trend === 'down'
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                          }`}
                        >
                          {detail.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : detail.trend === 'down' ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : (
                            <span className="text-xs">-</span>
                          )}
                        </div>
                      )}
                    </div>
                    {detail.subValue && (
                      <p className="text-xs text-gray-400 mt-1">{detail.subValue}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Breakdown Section */}
              {data.breakdown && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    {data.breakdown.category}
                  </h3>
                  <div className="space-y-2">
                    {data.breakdown.items.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(item.name)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: `hsl(${140 + index * 30}, 60%, ${50 - index * 5}%)`,
                            }}
                          />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-[#111827] dark:text-white">
                              {item.value.toLocaleString('nl-NL')}
                            </p>
                            <p className="text-xs text-gray-500">{item.percentage}%</p>
                          </div>
                          {/* Progress bar */}
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-konsensi-green"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-konsensi-green transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Detailed View for Selected Category */
            <div>
              <div className="bg-gradient-to-br from-[#3D7B4C]/10 to-[#8FD14F]/10 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-konsensi-green/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-konsensi-green" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Categorie</p>
                    <p className="text-xl font-bold text-[#111827] dark:text-white">
                      {selectedCategory}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mock detailed data */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Recente activiteit
                </h3>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        {index % 3 === 0 ? (
                          <Users className="w-5 h-5 text-gray-500" />
                        ) : index % 3 === 1 ? (
                          <CreditCard className="w-5 h-5 text-gray-500" />
                        ) : (
                          <Calendar className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Transactie #{1000 + index}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {index + 1} dag{index > 0 ? 'en' : ''} geleden
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#111827] dark:text-white">
                        €{((index + 1) * 250).toLocaleString('nl-NL')}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          index % 2 === 0
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        }`}
                      >
                        {index % 2 === 0 ? 'Voltooid' : 'In behandeling'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Laatste update: vandaag om 14:32
          </p>
          <button
            onClick={() => {
              onClose();
              setSelectedCategory(null);
            }}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook to use with charts
export function useChartDrillDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [drillDownData, setDrillDownData] = useState<DrillDownData | null>(null);

  const openDrillDown = (data: DrillDownData) => {
    setDrillDownData(data);
    setIsOpen(true);
  };

  const closeDrillDown = () => {
    setIsOpen(false);
    setDrillDownData(null);
  };

  return {
    isOpen,
    drillDownData,
    openDrillDown,
    closeDrillDown,
  };
}

// Example drill down data generators
export const generateUsersDrillDown = (month: string, value: number): DrillDownData => ({
  title: `Gebruikers - ${month}`,
  value,
  change: Math.round((Math.random() - 0.3) * 20),
  details: [
    { label: 'Nieuwe gebruikers', value: Math.round(value * 0.15), trend: 'up' },
    { label: 'Actieve gebruikers', value: Math.round(value * 0.85), trend: 'up' },
    { label: 'Inactieve gebruikers', value: Math.round(value * 0.12), trend: 'down' },
    { label: 'Gemiddelde sessieduur', value: '12 min', subValue: '+2 min vs vorige maand' },
  ],
  breakdown: {
    category: 'Verdeling per regio',
    items: [
      { name: 'Noord-Holland', value: Math.round(value * 0.25), percentage: 25 },
      { name: 'Zuid-Holland', value: Math.round(value * 0.22), percentage: 22 },
      { name: 'Utrecht', value: Math.round(value * 0.18), percentage: 18 },
      { name: 'Noord-Brabant', value: Math.round(value * 0.15), percentage: 15 },
      { name: 'Overig', value: Math.round(value * 0.20), percentage: 20 },
    ],
  },
});

export const generateSchuldenDrillDown = (category: string, value: number): DrillDownData => ({
  title: `Schulden - ${category}`,
  value: `€${value.toLocaleString('nl-NL')}`,
  change: Math.round((Math.random() - 0.5) * 15),
  details: [
    { label: 'Totaal openstaand', value: `€${Math.round(value * 0.7).toLocaleString('nl-NL')}`, trend: 'down' },
    { label: 'Afgelost deze maand', value: `€${Math.round(value * 0.1).toLocaleString('nl-NL')}`, trend: 'up' },
    { label: 'Aantal dossiers', value: Math.round(value / 5000), subValue: `${Math.round(value / 5000 * 0.2)} nieuw` },
    { label: 'Gem. schuld per dossier', value: `€${Math.round(value / (value / 5000)).toLocaleString('nl-NL')}` },
  ],
  breakdown: {
    category: 'Verdeling per schuldeiser',
    items: [
      { name: 'Belastingdienst', value: Math.round(value * 0.30), percentage: 30 },
      { name: 'Zorgverzekeraars', value: Math.round(value * 0.22), percentage: 22 },
      { name: 'Energieleveranciers', value: Math.round(value * 0.18), percentage: 18 },
      { name: 'Telecombedrijven', value: Math.round(value * 0.12), percentage: 12 },
      { name: 'Overig', value: Math.round(value * 0.18), percentage: 18 },
    ],
  },
});
