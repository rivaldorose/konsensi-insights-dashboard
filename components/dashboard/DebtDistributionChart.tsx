'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DistributionData {
  range: string;
  count: number;
}

interface DebtDistributionChartProps {
  data: DistributionData[];
}

export function DebtDistributionChart({ data }: DebtDistributionChartProps) {
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-[#3D7B4C]">{payload[0].value} gebruikers</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-[#111827] mb-4">Schuldbedrag Distributie</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="range"
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey="count"
              fill="#3D7B4C"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
