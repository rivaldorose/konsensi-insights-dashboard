'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

type StatusType = 'Actief' | 'In Behandeling' | 'Afgerond';

interface Client {
  id: string;
  naam: string;
  avatar: string;
  email: string;
  bewindvoerder: string;
  stad: string;
  status: StatusType;
  schuld: number;
}

interface ClientsTableProps {
  clients: Client[];
}

const statusColors: Record<StatusType, string> = {
  Actief: 'bg-green-900/50 text-green-400',
  'In Behandeling': 'bg-amber-900/50 text-amber-400',
  Afgerond: 'bg-[#2a2a2a] text-[#888888]',
};

export function ClientsTable({ clients }: ClientsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stadFilter, setStadFilter] = useState<string>('all');
  const [bewindvoerderFilter, setBewindvoerderFilter] = useState<string>('all');

  const uniqueSteden = Array.from(new Set(clients.map((c) => c.stad)));
  const uniqueBewindvoerders = Array.from(new Set(clients.map((c) => c.bewindvoerder)));

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.naam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesStad = stadFilter === 'all' || client.stad === stadFilter;
    const matchesBewindvoerder = bewindvoerderFilter === 'all' || client.bewindvoerder === bewindvoerderFilter;
    return matchesSearch && matchesStatus && matchesStad && matchesBewindvoerder;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Cliënten Overzicht</h3>
        <span className="text-sm text-[#888888]">{filteredClients.length} cliënten</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          <input
            type="text"
            placeholder="Zoek op naam of email..."
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
            <option value="Actief">Actief</option>
            <option value="In Behandeling">In Behandeling</option>
            <option value="Afgerond">Afgerond</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={stadFilter}
            onChange={(e) => setStadFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 border border-[#2a2a2a] rounded-xl text-sm bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          >
            <option value="all">Alle steden</option>
            {uniqueSteden.map((stad) => (
              <option key={stad} value={stad}>
                {stad}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={bewindvoerderFilter}
            onChange={(e) => setBewindvoerderFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 border border-[#2a2a2a] rounded-xl text-sm bg-[#1a1a1a] text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          >
            <option value="all">Alle bewindvoerders</option>
            {uniqueBewindvoerders.map((bw) => (
              <option key={bw} value={bw}>
                {bw}
              </option>
            ))}
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
                Naam
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Email
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Bewindvoerder
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Stad
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Schuld
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {client.avatar}
                      </span>
                    </div>
                    <span className="font-medium text-white">{client.naam}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-[#888888]">{client.email}</td>
                <td className="py-3 px-4 text-sm text-[#888888]">{client.bewindvoerder}</td>
                <td className="py-3 px-4 text-sm text-[#888888]">{client.stad}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[client.status]}`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-red-400">
                    {formatCurrency(client.schuld)}
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
