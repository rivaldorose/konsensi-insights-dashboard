'use client';

import { Search, Calendar, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface AuditFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  actionType: string;
  entityType: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}

const actionOptions = [
  { value: '', label: 'Alle acties' },
  { value: 'CREATE', label: 'CREATE' },
  { value: 'UPDATE', label: 'UPDATE' },
  { value: 'DELETE', label: 'DELETE' },
];

const entityOptions = [
  { value: '', label: 'Alle entities' },
  { value: 'Gebruiker', label: 'Gebruiker' },
  { value: 'Schuld', label: 'Schuld' },
  { value: 'Transactie', label: 'Transactie' },
  { value: 'Betaling', label: 'Betaling' },
  { value: 'Doel', label: 'Doel' },
];

export function AuditFilters({ onFilterChange }: AuditFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    actionType: '',
    entityType: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  });

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      actionType: '',
      entityType: '',
      dateFrom: '',
      dateTo: '',
      search: '',
    };
    setFilters(emptyFilters);
    onFilterChange?.(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-5 border border-[#2a2a2a]">
      <div className="flex flex-wrap items-center gap-4">
        {/* Action Type Dropdown */}
        <div className="relative">
          <select
            value={filters.actionType}
            onChange={(e) => updateFilter('actionType', e.target.value)}
            className="appearance-none bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] cursor-pointer min-w-[140px]"
          >
            {actionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
        </div>

        {/* Entity Type Dropdown */}
        <div className="relative">
          <select
            value={filters.entityType}
            onChange={(e) => updateFilter('entityType', e.target.value)}
            className="appearance-none bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] cursor-pointer min-w-[140px]"
          >
            {entityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
              placeholder="Van"
              className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] w-[150px]"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          </div>
          <span className="text-[#888888]">-</span>
          <div className="relative">
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
              placeholder="Tot"
              className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] w-[150px]"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-[#888888] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
            Wis filters
          </button>
        )}

        {/* Search - pushed to right */}
        <div className="relative ml-auto">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Zoeken..."
            className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-4 py-2.5 pl-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] w-[220px]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
        </div>
      </div>
    </div>
  );
}
