'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { AuditFilters, FilterState } from '@/components/audit/AuditFilters';
import { AuditTable } from '@/components/audit/AuditTable';
import { auditLogData } from '@/lib/mock-data';

const auditNavTabs = [
  { id: 'dashboard', label: 'Dashboard', active: false },
  { id: 'bewindvoerders', label: 'Bewindvoerders', active: false },
  { id: 'audit', label: 'Audit Log', active: true },
  { id: 'export', label: 'Exporteer', active: false },
];

export default function AuditLogPage() {
  const [filters, setFilters] = useState<FilterState>({
    actionType: '',
    entityType: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  });

  const filteredData = useMemo(() => {
    return auditLogData.filter((log) => {
      // Filter by action type
      if (filters.actionType && log.action !== filters.actionType) {
        return false;
      }

      // Filter by entity type
      if (filters.entityType && log.entity !== filters.entityType) {
        return false;
      }

      // Filter by date range
      if (filters.dateFrom) {
        const logDate = new Date(log.timestamp);
        const fromDate = new Date(filters.dateFrom);
        if (logDate < fromDate) return false;
      }

      if (filters.dateTo) {
        const logDate = new Date(log.timestamp);
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (logDate > toDate) return false;
      }

      // Filter by search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesUserName = log.userName.toLowerCase().includes(searchLower);
        const matchesEntityId = log.entityId.toLowerCase().includes(searchLower);
        const matchesDetails = JSON.stringify(log.details)
          .toLowerCase()
          .includes(searchLower);

        if (!matchesUserName && !matchesEntityId && !matchesDetails) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Floating Navbar */}
      <Navbar tabs={auditNavTabs} />

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Audit Log</h1>
          <p className="text-gray-500 mt-1">
            Alle systeem activiteiten en wijzigingen
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <AuditFilters onFilterChange={setFilters} />
        </div>

        {/* Audit Table */}
        <AuditTable data={filteredData} />
      </main>
    </div>
  );
}
