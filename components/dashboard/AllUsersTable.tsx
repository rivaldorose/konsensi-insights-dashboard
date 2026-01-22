'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Eye, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { ExtendedUser, UserStatus } from '@/lib/mock-data';

interface AllUsersTableProps {
  users: ExtendedUser[];
  itemsPerPage?: number;
}

const statusVariants: Record<UserStatus, 'success' | 'default' | 'info' | 'warning'> = {
  Actief: 'success',
  Inactief: 'default',
  Nieuw: 'info',
  'In Behandeling': 'warning',
};

const statusOptions: UserStatus[] = ['Actief', 'Inactief', 'Nieuw', 'In Behandeling'];

export function AllUsersTable({ users, itemsPerPage = 10 }: AllUsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('');

  // Get unique cities for filter
  const cities = useMemo(() => {
    const citySet = new Set(users.map((u) => u.stad));
    return Array.from(citySet).sort();
  }, [users]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesName = user.naam.toLowerCase().includes(searchLower);
        const matchesEmail = user.email.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesEmail) return false;
      }

      // Status filter
      if (statusFilter && user.status !== statusFilter) return false;

      // City filter
      if (cityFilter && user.stad !== cityFilter) return false;

      return true;
    });
  }, [users, search, statusFilter, cityFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, cityFilter]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-[#3D7B4C] to-[#8FD14F]',
      'from-[#8FD14F] to-[#22c55e]',
      'from-[#3D7B4C] to-[#22c55e]',
      'from-purple-500 to-purple-400',
      'from-blue-500 to-blue-400',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] border border-[#2a2a2a] overflow-hidden">
      {/* Header with filters */}
      <div className="p-6 border-b border-[#2a2a2a]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-white">Alle Gebruikers</h3>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-4 py-2 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] cursor-pointer min-w-[130px]"
              >
                <option value="">Alle statussen</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666] pointer-events-none" />
            </div>

            {/* City Filter */}
            <div className="relative">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="appearance-none bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-4 py-2 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] cursor-pointer min-w-[130px]"
              >
                <option value="">Alle steden</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666] pointer-events-none" />
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Zoeken..."
                className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-4 py-2 pl-10 text-sm text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] w-[200px]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a2a2a] bg-[#111111]">
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Naam
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Email
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Stad
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Totale Schuld
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Inkomen
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Aangemeld
              </th>
              <th className="text-right py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Acties
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`hover:bg-[#222222] transition-colors group ${
                  index !== currentUsers.length - 1 ? 'border-b border-[#1e1e1e]' : ''
                }`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(
                        user.naam
                      )} flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-medium">
                        {getInitials(user.naam)}
                      </span>
                    </div>
                    <span className="font-medium text-white">{user.naam}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#888888] text-sm">{user.email}</td>
                <td className="py-4 px-6 text-[#888888] text-sm">{user.stad}</td>
                <td className="py-4 px-6">
                  <Badge variant={statusVariants[user.status]}>{user.status}</Badge>
                </td>
                <td className="py-4 px-6 font-medium text-white text-sm">
                  {formatCurrency(user.totaleSchuld)}
                </td>
                <td className="py-4 px-6 text-[#888888] text-sm">
                  {formatCurrency(user.inkomen)}
                </td>
                <td className="py-4 px-6 text-[#666666] text-sm">
                  {formatDate(user.aangemeld)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-full hover:bg-[#333333] transition-colors">
                      <Eye className="w-4 h-4 text-[#888888]" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-[#333333] transition-colors">
                      <Pencil className="w-4 h-4 text-[#888888]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#2a2a2a]">
        <p className="text-sm text-[#888888]">
          {filteredUsers.length > 0
            ? `${startIndex + 1}-${Math.min(endIndex, filteredUsers.length)} van ${filteredUsers.length}`
            : 'Geen resultaten'}
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-[#222222] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#888888]" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#3D7B4C] text-white'
                        : 'text-[#888888] hover:bg-[#222222]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-[#222222] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#888888]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
