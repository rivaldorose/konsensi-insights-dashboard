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

interface RepaymentData {
  month: string;
  amount: number;
}

interface MonthlyRepaymentChartProps {
  data: RepaymentData[];
}

export function MonthlyRepaymentChart({ data }: MonthlyRepaymentChartProps) {
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
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-[#3D7B4C]">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-[#111827] mb-4">Afbetaalde Schulden per Maand</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              tickFormatter={(value) => `€${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey="amount"
              fill="#3D7B4C"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
