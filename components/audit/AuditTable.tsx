'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Clock, Eye } from 'lucide-react';
import { ActionBadge, EntityBadge } from '@/components/ui/Badge';
import type { AuditLogEntry } from '@/lib/mock-data';

interface AuditTableProps {
  data: AuditLogEntry[];
  itemsPerPage?: number;
}

export function AuditTable({ data, itemsPerPage = 10 }: AuditTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const truncateId = (id: string) => {
    if (id.length <= 12) return id;
    return `${id.slice(0, 12)}...`;
  };

  const formatDetails = (details: Record<string, unknown>) => {
    const str = JSON.stringify(details);
    if (str.length <= 40) return str;
    return `${str.slice(0, 40)}...`;
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

  if (data.length === 0) {
    return (
      <div className="bg-[#1a1a1a] rounded-[20px] p-12 border border-[#2a2a2a]">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#111111] rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-[#888888]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Geen audit logs gevonden
          </h3>
          <p className="text-[#888888] text-sm">
            Pas je filters aan om resultaten te zien
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] border border-[#2a2a2a] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2a2a2a] bg-[#111111]">
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Datum/Tijd
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Actie
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Entity
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Entity ID
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Gebruiker
              </th>
              <th className="text-left py-4 px-6 text-xs font-medium text-[#888888] uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((log, index) => (
              <>
                <tr
                  key={log.id}
                  className={`hover:bg-[#222222] transition-colors ${
                    index !== currentData.length - 1 ? 'border-b border-[#2a2a2a]' : ''
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-[#888888]">
                      <Clock className="w-4 h-4 text-[#888888]" />
                      {formatDateTime(log.timestamp)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <ActionBadge action={log.action} />
                  </td>
                  <td className="py-4 px-6">
                    <EntityBadge entity={log.entity} />
                  </td>
                  <td className="py-4 px-6">
                    <code className="text-sm font-mono text-[#888888] bg-[#111111] px-2 py-1 rounded">
                      {truncateId(log.entityId)}
                    </code>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(
                          log.userName
                        )} flex items-center justify-center`}
                      >
                        <span className="text-white text-xs font-medium">
                          {getInitials(log.userName)}
                        </span>
                      </div>
                      <span className="text-sm text-white">{log.userName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-[#888888] max-w-[200px] truncate">
                        {formatDetails(log.details)}
                      </code>
                      <button
                        onClick={() =>
                          setExpandedRow(expandedRow === log.id ? null : log.id)
                        }
                        className="flex items-center gap-1 text-[#3D7B4C] hover:text-[#8FD14F] text-sm font-medium transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Bekijk
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === log.id && (
                  <tr key={`${log.id}-details`} className="bg-[#111111]">
                    <td colSpan={6} className="py-4 px-6">
                      <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]">
                        <h4 className="text-sm font-medium text-white mb-2">
                          Volledige Details
                        </h4>
                        <pre className="text-xs font-mono text-[#888888] bg-[#111111] p-3 rounded-lg overflow-x-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#2a2a2a]">
        <p className="text-sm text-[#888888]">
          {startIndex + 1}-{Math.min(endIndex, data.length)} van {data.length}
        </p>

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
      </div>
    </div>
  );
}
