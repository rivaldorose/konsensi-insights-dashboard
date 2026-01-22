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
    return 'bg-[#2a2a2a] text-[#888888]';
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-white">Top Schuldeisers Ontdekt</h3>
      </div>

      <div className="space-y-2">
        {creditors.map((creditor) => (
          <div
            key={creditor.rank}
            className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-xl hover:bg-[#333333] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(creditor.rank)}`}
              >
                {creditor.rank}
              </div>
              <span className="font-medium text-white">{creditor.naam}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#888888]">
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
