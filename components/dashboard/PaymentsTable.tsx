'use client';

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Check, Clock, X } from 'lucide-react';

export type PaymentStatus = 'Geslaagd' | 'In behandeling' | 'Mislukt';
export type PaymentMethod = 'iDEAL' | 'Automatische incasso' | 'Handmatig' | 'Overig';

export interface Payment {
  id: string;
  datum: string;
  tijd: string;
  gebruiker: string;
  avatar: string;
  schuld: string;
  bedrag: number;
  methode: PaymentMethod;
  status: PaymentStatus;
  referentie: string;
}

interface PaymentsTableProps {
  payments: Payment[];
}

const statusConfig: Record<PaymentStatus, { bg: string; text: string; icon: React.ReactNode }> = {
  Geslaagd: {
    bg: 'bg-green-900/30',
    text: 'text-green-400',
    icon: <Check className="w-3.5 h-3.5" />,
  },
  'In behandeling': {
    bg: 'bg-yellow-900/30',
    text: 'text-yellow-400',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  Mislukt: {
    bg: 'bg-red-900/30',
    text: 'text-red-400',
    icon: <X className="w-3.5 h-3.5" />,
  },
};

const methodColors: Record<PaymentMethod, string> = {
  iDEAL: 'bg-purple-900/30 text-purple-400',
  'Automatische incasso': 'bg-blue-900/30 text-blue-400',
  Handmatig: 'bg-[#2a2a2a] text-text-secondary',
  Overig: 'bg-orange-900/30 text-orange-400',
};

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'Alle'>('Alle');
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | 'Alle'>('Alle');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.gebruiker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.schuld.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.referentie.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Alle' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'Alle' || payment.methode === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-card rounded-[20px] border border-border-subtle overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border-subtle">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground">Recente Betalingen</h3>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Zoeken..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border border-border-subtle rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] w-48 bg-card text-foreground placeholder-[#888888]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as PaymentStatus | 'Alle');
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-border-subtle rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] bg-card text-foreground"
            >
              <option value="Alle">Alle Status</option>
              <option value="Geslaagd">Geslaagd</option>
              <option value="In behandeling">In behandeling</option>
              <option value="Mislukt">Mislukt</option>
            </select>

            {/* Method Filter */}
            <select
              value={methodFilter}
              onChange={(e) => {
                setMethodFilter(e.target.value as PaymentMethod | 'Alle');
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-border-subtle rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] bg-card text-foreground"
            >
              <option value="Alle">Alle Methodes</option>
              <option value="iDEAL">iDEAL</option>
              <option value="Automatische incasso">Automatische incasso</option>
              <option value="Handmatig">Handmatig</option>
              <option value="Overig">Overig</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-4 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Datum
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Gebruiker
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Schuld
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Bedrag
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Methode
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Referentie
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((payment) => {
              const statusStyle = statusConfig[payment.status];
              return (
                <tr key={payment.id} className="border-b border-border-subtle hover:bg-[#2a2a2a]/50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-sm font-medium text-foreground">{payment.datum}</p>
                      <p className="text-xs text-text-secondary">{payment.tijd}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center text-foreground text-xs font-medium">
                        {payment.avatar}
                      </div>
                      <span className="text-sm text-foreground">{payment.gebruiker}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-text-secondary">{payment.schuld}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-[#3D7B4C]">
                      {formatCurrency(payment.bedrag)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${methodColors[payment.methode]}`}
                    >
                      {payment.methode}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                    >
                      {statusStyle.icon}
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-mono text-text-secondary">{payment.referentie}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border-subtle flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Toont {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPayments.length)} van{' '}
          {filteredPayments.length} betalingen
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-[#3D7B4C] text-foreground'
                  : 'text-text-secondary hover:bg-[#2a2a2a]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
}
