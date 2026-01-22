'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PaymentMethod {
  name: string;
  value: number;
  color: string;
  percentage: number;
  [key: string]: string | number;
}

interface PaymentMethodsChartProps {
  data: PaymentMethod[];
}

export function PaymentMethodsChart({ data }: PaymentMethodsChartProps) {
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: PaymentMethod }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ffffff' }} className="p-3 rounded-lg shadow-lg">
          <p className="font-medium text-white">{item.name}</p>
          <p className="text-sm text-[#888888]">{item.value} betalingen ({item.percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Betaalmethodes</h3>
      <div className="flex items-center">
        <div className="w-1/2 h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-[#888888]">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-white">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
