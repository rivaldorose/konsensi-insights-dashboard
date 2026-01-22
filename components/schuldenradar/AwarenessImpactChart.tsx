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
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900">{item.type}</p>
          <p className="text-sm text-gray-600">
            {item.value.toLocaleString('nl-NL')} schulden ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const discoveredPercentage = ((discoveredNew / total) * 100).toFixed(0);

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-[#111827] mb-4">Bewustzijn Impact</h3>

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
            <span className="text-[10px] text-gray-500">nieuw</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-3">
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500">Bekend voor scan</span>
            </div>
            <p className="text-lg font-bold text-gray-700">{knownBefore.toLocaleString('nl-NL')}</p>
          </div>
          <div className="p-3 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-xs text-red-600">Nieuw ontdekt</span>
            </div>
            <p className="text-lg font-bold text-red-600">{discoveredNew.toLocaleString('nl-NL')}</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {data.map((item) => (
          <div key={item.type} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-gray-500">{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
