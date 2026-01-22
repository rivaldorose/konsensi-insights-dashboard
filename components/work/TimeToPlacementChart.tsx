'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TimeToPlacementData {
  range: string;
  count: number;
}

interface TimeToPlacementChartProps {
  data: TimeToPlacementData[];
}

export function TimeToPlacementChart({ data }: TimeToPlacementChartProps) {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: TimeToPlacementData }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ffffff' }} className="p-3 rounded-lg shadow-lg">
          <p className="font-medium text-white">{item.range}</p>
          <p className="text-sm text-[#888888]">
            {item.count.toLocaleString('nl-NL')} plaatsingen
          </p>
        </div>
      );
    }
    return null;
  };

  // Color gradient from green (fast) to orange (slow)
  const getColor = (index: number) => {
    const colors = ['#22c55e', '#84cc16', '#eab308', '#f59e0b', '#f97316', '#ef4444'];
    return colors[Math.min(index, colors.length - 1)];
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Tijd tot Plaatsing</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis
              dataKey="range"
              tick={{ fill: '#888888', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={50}
            />
            <YAxis tick={{ fill: '#888888', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#2a2a2a' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={35}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
          <span className="text-[#888888]">Snel</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
          <span className="text-[#888888]">Langzaam</span>
        </div>
      </div>
    </div>
  );
}
