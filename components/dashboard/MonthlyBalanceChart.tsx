'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

interface MonthlyBalance {
  month: string;
  balance: number;
}

interface MonthlyBalanceChartProps {
  data: MonthlyBalance[];
}

export function MonthlyBalanceChart({ data }: MonthlyBalanceChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-[#1a1a1a] p-3 rounded-lg shadow-lg border border-[#2a2a2a]">
          <p className="font-medium text-white">{label}</p>
          <p className={`text-sm font-medium ${value >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {formatCurrency(value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 shadow-sm border border-[#2a2a2a] h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Maandelijkse Balans</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis
              dataKey="month"
              tick={{ fill: '#888888', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#888888', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `€${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <ReferenceLine y={0} stroke="#2a2a2a" />
            <Bar dataKey="balance" radius={[4, 4, 4, 4]} barSize={24}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.balance >= 0 ? '#3D7B4C' : '#EF4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
