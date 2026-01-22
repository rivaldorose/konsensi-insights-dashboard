'use client';

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export type DebtUrgency = 'Hoog' | 'Gemiddeld' | 'Laag';
export type DebtType = 'Telefoon' | 'Energie' | 'Zorgverzekering' | 'Webshop' | 'Overheid' | 'Overig';
export type DebtStatus = 'Actief' | 'Afbetaald' | 'Regeling';

export interface Debt {
  id: string;
  gebruiker: string;
  avatar: string;
  crediteur: string;
  type: DebtType;
  origineel: number;
  huidig: number;
  urgentie: DebtUrgency;
  status: DebtStatus;
}

interface DebtsTableProps {
  debts: Debt[];
}

const urgencyColors: Record<DebtUrgency, { bg: string; text: string }> = {
  Hoog: { bg: 'bg-red-50', text: 'text-red-700' },
  Gemiddeld: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  Laag: { bg: 'bg-green-50', text: 'text-green-700' },
};

const typeColors: Record<DebtType, string> = {
  Telefoon: 'bg-purple-50 text-purple-700',
  Energie: 'bg-orange-50 text-orange-700',
  Zorgverzekering: 'bg-blue-50 text-blue-700',
  Webshop: 'bg-pink-50 text-pink-700',
  Overheid: 'bg-gray-100 text-gray-700',
  Overig: 'bg-gray-50 text-gray-600',
};

const statusColors: Record<DebtStatus, { bg: string; text: string }> = {
  Actief: { bg: 'bg-blue-50', text: 'text-blue-700' },
  Afbetaald: { bg: 'bg-green-50', text: 'text-green-700' },
  Regeling: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
};

export function DebtsTable({ debts }: DebtsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<DebtUrgency | 'Alle'>('Alle');
  const [typeFilter, setTypeFilter] = useState<DebtType | 'Alle'>('Alle');
  const [statusFilter, setStatusFilter] = useState<DebtStatus | 'Alle'>('Alle');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredDebts = debts.filter((debt) => {
    const matchesSearch =
      debt.gebruiker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debt.crediteur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = urgencyFilter === 'Alle' || debt.urgentie === urgencyFilter;
    const matchesType = typeFilter === 'Alle' || debt.type === typeFilter;
    const matchesStatus = statusFilter === 'Alle' || debt.status === statusFilter;
    return matchesSearch && matchesUrgency && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDebts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDebts = filteredDebts.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-sm shadow-gray-100 border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-[#111827]">Alle Schulden</h3>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Zoeken..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] w-48"
              />
            </div>

            {/* Urgency Filter */}
            <select
              value={urgencyFilter}
              onChange={(e) => {
                setUrgencyFilter(e.target.value as DebtUrgency | 'Alle');
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] bg-white"
            >
              <option value="Alle">Alle Urgentie</option>
              <option value="Hoog">Hoog</option>
              <option value="Gemiddeld">Gemiddeld</option>
              <option value="Laag">Laag</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as DebtType | 'Alle');
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] bg-white"
            >
              <option value="Alle">Alle Types</option>
              <option value="Telefoon">Telefoon</option>
              <option value="Energie">Energie</option>
              <option value="Zorgverzekering">Zorgverzekering</option>
              <option value="Webshop">Webshop</option>
              <option value="Overheid">Overheid</option>
              <option value="Overig">Overig</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as DebtStatus | 'Alle');
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] bg-white"
            >
              <option value="Alle">Alle Status</option>
              <option value="Actief">Actief</option>
              <option value="Afbetaald">Afbetaald</option>
              <option value="Regeling">Regeling</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gebruiker
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Crediteur
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Origineel
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Huidig
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Urgentie
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedDebts.map((debt) => {
              const urgencyStyle = urgencyColors[debt.urgentie];
              const statusStyle = statusColors[debt.status];
              return (
                <tr key={debt.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center text-white text-xs font-medium">
                        {debt.avatar}
                      </div>
                      <span className="text-sm text-[#111827]">{debt.gebruiker}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">{debt.crediteur}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[debt.type]}`}
                    >
                      {debt.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-500">{formatCurrency(debt.origineel)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-[#111827]">
                      {formatCurrency(debt.huidig)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${urgencyStyle.bg} ${urgencyStyle.text}`}
                    >
                      {debt.urgentie}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                    >
                      {debt.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Toont {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredDebts.length)} van{' '}
          {filteredDebts.length} schulden
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-[#3D7B4C] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
