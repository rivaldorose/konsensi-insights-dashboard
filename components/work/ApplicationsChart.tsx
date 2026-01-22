'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ApplicationsData {
  maand: string;
  gemiddeld: number;
}

interface ApplicationsChartProps {
  data: ApplicationsData[];
  average: number;
}

export function ApplicationsChart({ data, average }: ApplicationsChartProps) {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ffffff' }} className="p-3 rounded-lg shadow-lg">
          <p className="font-medium text-white">{label}</p>
          <p className="text-sm text-[#888888]">
            Gem. {payload[0].value.toFixed(1)} sollicitaties
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <h3 className="text-lg font-semibold text-white mb-2">Sollicitaties per Vacature</h3>

      {/* Key Insight */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900/30 rounded-full">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">
            Gemiddeld {average} sollicitaties per vacature
          </span>
        </div>
      </div>

      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="maand"
              tick={{ fill: '#888888', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fill: '#888888', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="gemiddeld"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#colorApplications)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
