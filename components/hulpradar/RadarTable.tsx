'use client';

import { useState } from 'react';
import { Search, ChevronDown, CheckCircle, Clock, XCircle } from 'lucide-react';

type StatusType = 'gematcht' | 'zoekend' | 'geen_match';
type ProbleemType = 'Huur achterstand' | 'Energieschulden' | 'Zorgverzekering' | 'Belastingschuld' | 'Leningen' | 'Overig';

interface RadarEntry {
  id: string;
  datum: string;
  gemeente: string;
  probleemType: ProbleemType;
  schuldBedrag: string;
  status: StatusType;
  organisatie: string;
  tijdTotMatch: string;
}

interface RadarTableProps {
  entries: RadarEntry[];
}

const statusConfig: Record<StatusType, { label: string; color: string; icon: React.ReactNode }> = {
  gematcht: {
    label: 'Gematcht',
    color: 'bg-green-900/30 text-green-400',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  zoekend: {
    label: 'Zoekend',
    color: 'bg-amber-900/30 text-amber-400',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  geen_match: {
    label: 'Geen match',
    color: 'bg-red-900/30 text-red-400',
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

const probleemColors: Record<ProbleemType, string> = {
  'Huur achterstand': 'bg-blue-900/30 text-blue-400',
  'Energieschulden': 'bg-amber-900/30 text-amber-400',
  'Zorgverzekering': 'bg-pink-900/30 text-pink-400',
  'Belastingschuld': 'bg-red-900/30 text-red-400',
  'Leningen': 'bg-purple-900/30 text-purple-400',
  'Overig': 'bg-gray-700/30 text-gray-400',
};

export function RadarTable({ entries }: RadarTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [probleemFilter, setProbleemFilter] = useState<string>('all');

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.gemeente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.organisatie.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
    const matchesProbleem = probleemFilter === 'all' || entry.probleemType === probleemFilter;
    return matchesSearch && matchesStatus && matchesProbleem;
  });

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recente Radar Invullingen</h3>
        <span className="text-sm text-[#888888]">{filteredEntries.length} resultaten</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          <input
            type="text"
            placeholder="Zoek op gemeente, organisatie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#2a2a2a] rounded-xl text-sm bg-[#1a1a1a] text-white placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 border border-[#2a2a2a] rounded-xl text-sm bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          >
            <option value="all">Alle statussen</option>
            <option value="gematcht">Gematcht</option>
            <option value="zoekend">Zoekend</option>
            <option value="geen_match">Geen match</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={probleemFilter}
            onChange={(e) => setProbleemFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 border border-[#2a2a2a] rounded-xl text-sm bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          >
            <option value="all">Alle problemen</option>
            <option value="Huur achterstand">Huur achterstand</option>
            <option value="Energieschulden">Energieschulden</option>
            <option value="Zorgverzekering">Zorgverzekering</option>
            <option value="Belastingschuld">Belastingschuld</option>
            <option value="Leningen">Leningen</option>
            <option value="Overig">Overig</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Datum
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Gemeente
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Probleem Type
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Schuldbedrag
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Organisatie
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Tijd tot Match
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => {
              const status = statusConfig[entry.status];
              return (
                <tr
                  key={entry.id}
                  className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-[#888888]">{entry.datum}</td>
                  <td className="py-3 px-4 text-sm font-medium text-white">{entry.gemeente}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${probleemColors[entry.probleemType]}`}
                    >
                      {entry.probleemType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#888888]">{entry.schuldBedrag}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#888888]">{entry.organisatie}</td>
                  <td className="py-3 px-4 text-sm text-[#888888]">{entry.tijdTotMatch}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
