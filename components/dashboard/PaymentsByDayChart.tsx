'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface DayPayment {
  day: string;
  count: number;
}

interface PaymentsByDayChartProps {
  data: DayPayment[];
}

export function PaymentsByDayChart({ data }: PaymentsByDayChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count));

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ffffff' }} className="p-3 rounded-lg shadow-lg">
          <p className="font-medium text-white">{label}</p>
          <p className="text-sm text-[#3D7B4C]">{payload[0].value} betalingen</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Betalingen per Dag van de Week</h3>
          <p className="text-sm text-[#888888] mt-1">Beste dag voor herinneringen: Dinsdag</p>
        </div>
      </div>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: '#888888', fontSize: 12 }}
              axisLine={{ stroke: '#2a2a2a' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#888888', fontSize: 12 }}
              axisLine={{ stroke: '#2a2a2a' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.count === maxCount ? '#3D7B4C' : '#a3d977'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
