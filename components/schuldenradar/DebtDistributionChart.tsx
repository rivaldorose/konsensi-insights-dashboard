'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DebtDistributionData {
  range: string;
  count: number;
}

interface DebtDistributionChartProps {
  data: DebtDistributionData[];
}

export function DebtDistributionChart({ data }: DebtDistributionChartProps) {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: DebtDistributionData }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900">{item.range}</p>
          <p className="text-sm text-gray-600">
            {item.count.toLocaleString('nl-NL')} schulden
          </p>
        </div>
      );
    }
    return null;
  };

  // Color gradient from light to dark red
  const getColor = (index: number) => {
    const colors = ['#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B'];
    return colors[Math.min(index, colors.length - 1)];
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-[#111827] mb-4">Schuldbedrag Verdeling</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis
              dataKey="range"
              tick={{ fill: '#6B7280', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={35}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        Meest voorkomende schuldbedragen
      </p>
    </div>
  );
}
