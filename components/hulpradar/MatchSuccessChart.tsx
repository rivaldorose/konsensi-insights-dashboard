'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface MatchData {
  status: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface MatchSuccessChartProps {
  data: MatchData[];
  total: number;
  successRate: number;
}

export function MatchSuccessChart({ data, total, successRate }: MatchSuccessChartProps) {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: MatchData }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="p-3 rounded-lg shadow-lg" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <p className="font-medium text-white">{item.status}</p>
          <p className="text-sm text-[#888888]">
            {item.value.toLocaleString('nl-NL')} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Match Succes Rate</h3>
      <div className="flex flex-col items-center">
        <div className="h-[180px] w-[180px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
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
            <span className="text-3xl font-bold text-[#3D7B4C]">{successRate}%</span>
            <span className="text-xs text-[#888888]">Succes</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-[#888888]">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
