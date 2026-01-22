'use client';

import { Users, TrendingDown, Wallet, Activity, FileText, CreditCard, ArrowUpRight, BarChart2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KpiCardProps {
  label: string;
  value: string;
  icon: string;
  featured?: boolean;
  sparklineData?: number[];
  trend?: 'up' | 'down' | 'neutral';
  trendPositive?: boolean;
  trendNegative?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  'trending-down': TrendingDown,
  wallet: Wallet,
  activity: Activity,
  'file-text': FileText,
  'credit-card': CreditCard,
  chart: BarChart2,
};

export function KpiCard({ label, value, icon, featured = false, sparklineData = [], trend = 'neutral', trendPositive, trendNegative }: KpiCardProps) {
  const Icon = iconMap[icon] || Users;

  const chartData = sparklineData.map((val, idx) => ({ value: val, idx }));

  const getSparklineColor = () => {
    // Explicit override for positive/negative trends
    if (trendPositive) return '#22c55e';
    if (trendNegative) return '#EF4444';
    // Default behavior
    if (trend === 'up') return '#22c55e';
    if (trend === 'down') return '#22c55e'; // Down in debt is still green (positive)
    return '#6b7280';
  };

  if (featured) {
    return (
      <div className="bg-gradient-to-br from-[#3D7B4C] to-[#2d5a38] rounded-[20px] p-6 text-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Icon className="w-5 h-5 text-foreground" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-foreground/70" />
          </div>

          <p className="text-foreground/70 text-xs font-medium tracking-wider mb-1">{label}</p>
          <p className="text-4xl font-bold">{value}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle hover:bg-card-hover hover:border-border-medium transition-colors">
      <div className="flex items-start justify-between mb-6">
        <div className="w-10 h-10 bg-konsensi-green/20 rounded-full flex items-center justify-center">
          <Icon className="w-5 h-5 text-konsensi-green" />
        </div>
        <ArrowUpRight className="w-5 h-5 text-text-tertiary" />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-text-secondary text-xs font-medium tracking-wider mb-1">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>

        {sparklineData.length > 0 && (
          <div className="w-16 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={getSparklineColor()}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
