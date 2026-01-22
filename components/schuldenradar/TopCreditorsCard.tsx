'use client';

import { Building2, TrendingUp } from 'lucide-react';

interface Creditor {
  rank: number;
  naam: string;
  aantal: number;
  trend?: 'up' | 'down' | 'neutral';
}

interface TopCreditorsCardProps {
  creditors: Creditor[];
}

export function TopCreditorsCard({ creditors }: TopCreditorsCardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-red-500 text-white';
    if (rank === 2) return 'bg-red-400 text-white';
    if (rank === 3) return 'bg-red-300 text-white';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-[#111827]">Top Schuldeisers Ontdekt</h3>
      </div>

      <div className="space-y-2">
        {creditors.map((creditor) => (
          <div
            key={creditor.rank}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(creditor.rank)}`}
              >
                {creditor.rank}
              </div>
              <span className="font-medium text-gray-900">{creditor.naam}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {creditor.aantal.toLocaleString('nl-NL')} gevonden
              </span>
              {creditor.trend === 'up' && (
                <TrendingUp className="w-4 h-4 text-red-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
