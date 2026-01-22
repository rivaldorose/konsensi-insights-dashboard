'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, Eye } from 'lucide-react';

interface AwarenessData {
  type: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface AwarenessImpactChartProps {
  data: AwarenessData[];
  total: number;
  knownBefore: number;
  discoveredNew: number;
}

export function AwarenessImpactChart({ data, total, knownBefore, discoveredNew }: AwarenessImpactChartProps) {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: AwarenessData }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="bg-[#1a1a1a] p-3 rounded-lg shadow-lg border border-[#2a2a2a]">
          <p className="font-medium text-white">{item.type}</p>
          <p className="text-sm text-[#888888]">
            {item.value.toLocaleString('nl-NL')} schulden ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const discoveredPercentage = ((discoveredNew / total) * 100).toFixed(0);

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Bewustzijn Impact</h3>

      <div className="flex items-center gap-4">
        {/* Pie Chart */}
        <div className="h-[160px] w-[160px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-[#EF4444]">{discoveredPercentage}%</span>
            <span className="text-[10px] text-[#888888]">nieuw</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-3">
          <div className="p-3 bg-[#2a2a2a] rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-[#888888]" />
              <span className="text-xs text-[#888888]">Bekend voor scan</span>
            </div>
            <p className="text-lg font-bold text-white">{knownBefore.toLocaleString('nl-NL')}</p>
          </div>
          <div className="p-3 bg-red-900/30 rounded-xl border border-red-800/50">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-xs text-red-400">Nieuw ontdekt</span>
            </div>
            <p className="text-lg font-bold text-red-400">{discoveredNew.toLocaleString('nl-NL')}</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {data.map((item) => (
          <div key={item.type} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-[#888888]">{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
