'use client';

import { Users, Euro, TrendingUp, CheckCircle, Clock, Target } from 'lucide-react';

interface QuickStat {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: 'users' | 'euro' | 'trending' | 'check' | 'clock' | 'target';
}

interface QuickStatsGridProps {
  stats: QuickStat[];
}

const iconMap = {
  users: Users,
  euro: Euro,
  trending: TrendingUp,
  check: CheckCircle,
  clock: Clock,
  target: Target,
};

export function QuickStatsGrid({ stats }: QuickStatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <div
            key={stat.id}
            className="bg-white rounded-[20px] p-4 shadow-sm shadow-gray-100 border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#3D7B4C]/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#3D7B4C]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#111827] mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p
              className={`text-xs font-medium ${
                stat.changeType === 'positive'
                  ? 'text-green-600'
                  : stat.changeType === 'negative'
                  ? 'text-red-600'
                  : 'text-gray-500'
              }`}
            >
              {stat.change}
            </p>
          </div>
        );
      })}
    </div>
  );
}
