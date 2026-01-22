'use client';

import { useState } from 'react';
import { Search, ChevronDown, CheckCircle, XCircle, Clock } from 'lucide-react';

type ActionStatus = 'ja' | 'nee' | 'in_behandeling';

interface Scan {
  id: string;
  datum: string;
  gebruiker: {
    naam: string;
    avatar: string;
  };
  schuldenGevonden: number;
  totaalBedrag: number;
  hoogsteSchuld: {
    bedrag: number;
    schuldeiser: string;
  };
  bronnenGecheckt: string[];
  actieOndernomen: ActionStatus;
}

interface ScansTableProps {
  scans: Scan[];
}

const bronColors: Record<string, string> = {
  BKR: 'bg-purple-100 text-purple-700',
  CJIB: 'bg-red-100 text-red-700',
  Belastingdienst: 'bg-blue-100 text-blue-700',
  CAK: 'bg-green-100 text-green-700',
  Energie: 'bg-yellow-100 text-yellow-700',
  Telecom: 'bg-cyan-100 text-cyan-700',
  Webshops: 'bg-pink-100 text-pink-700',
  Verzekeraars: 'bg-orange-100 text-orange-700',
};

const actionConfig: Record<ActionStatus, { label: string; icon: React.ReactNode; color: string }> = {
  ja: { label: 'Ja', icon: <CheckCircle className="w-3.5 h-3.5" />, color: 'bg-green-100 text-green-700' },
  nee: { label: 'Nee', icon: <XCircle className="w-3.5 h-3.5" />, color: 'bg-red-100 text-red-700' },
  in_behandeling: { label: 'In behandeling', icon: <Clock className="w-3.5 h-3.5" />, color: 'bg-yellow-100 text-yellow-700' },
};

export function ScansTable({ scans }: ScansTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const filteredScans = scans.filter((scan) => {
    const matchesSearch =
      scan.gebruiker.naam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.hoogsteSchuld.schuldeiser.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || scan.actieOndernomen === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#111827]">Recente Scans</h3>
        <span className="text-sm text-gray-500">{filteredScans.length} resultaten</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Zoek op naam of schuldeiser..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          >
            <option value="all">Alle acties</option>
            <option value="ja">Actie ondernomen</option>
            <option value="nee">Geen actie</option>
            <option value="in_behandeling">In behandeling</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Datum
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gebruiker
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gevonden
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Totaal
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hoogste Schuld
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bronnen
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actie
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredScans.map((scan) => (
              <tr
                key={scan.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-sm text-gray-500">{scan.datum}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {scan.gebruiker.avatar}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {scan.gebruiker.naam}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      scan.schuldenGevonden === 0
                        ? 'bg-green-100 text-green-700'
                        : scan.schuldenGevonden <= 2
                          ? 'bg-yellow-100 text-yellow-700'
                          : scan.schuldenGevonden <= 5
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {scan.schuldenGevonden} schulden
                  </span>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  {formatCurrency(scan.totaalBedrag)}
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">
                      {formatCurrency(scan.hoogsteSchuld.bedrag)}
                    </span>
                    <span className="text-gray-500 ml-1">
                      ({scan.hoogsteSchuld.schuldeiser})
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {scan.bronnenGecheckt.slice(0, 3).map((bron) => (
                      <span
                        key={bron}
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium ${bronColors[bron] || 'bg-gray-100 text-gray-700'}`}
                      >
                        {bron}
                      </span>
                    ))}
                    {scan.bronnenGecheckt.length > 3 && (
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500">
                        +{scan.bronnenGecheckt.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${actionConfig[scan.actieOndernomen].color}`}
                  >
                    {actionConfig[scan.actieOndernomen].icon}
                    {actionConfig[scan.actieOndernomen].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
