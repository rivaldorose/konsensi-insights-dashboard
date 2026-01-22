'use client';

import Link from 'next/link';
import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface AppStat {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface AppOverviewCardProps {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  stats: AppStat[];
}

export function AppOverviewCard({
  name,
  description,
  href,
  icon,
  color,
  bgColor,
  stats,
}: AppOverviewCardProps) {
  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-500" />;
    if (trend === 'neutral') return <Minus className="w-3 h-3 text-gray-400" />;
    return null;
  };

  return (
    <Link href={href}>
      <div className="bg-card rounded-[20px] p-6 border border-border-subtle hover:border-[#3a3a3a] transition-all cursor-pointer group h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              <div style={{ color }}>{icon}</div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-konsensi-green transition-colors">
                {name}
              </h3>
              <p className="text-xs text-text-secondary">{description}</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-text-secondary group-hover:text-konsensi-green transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-border-subtle rounded-xl p-3">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-lg font-bold text-foreground">{stat.value}</span>
                {getTrendIcon(stat.trend)}
              </div>
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
