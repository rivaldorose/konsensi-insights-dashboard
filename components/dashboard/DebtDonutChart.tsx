'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DebtData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface DebtDonutChartProps {
  data: DebtData[];
}

export function DebtDonutChart({ data }: DebtDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Schulden per Type</h3>
        <p className="text-sm text-[#888888]">Verdeling van schulden per categorie</p>
      </div>

      <div className="flex items-center gap-8">
        {/* Chart */}
        <div className="relative w-[200px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                  padding: '12px 16px',
                  color: '#ffffff',
                }}
                formatter={(value) => [formatCurrency(Number(value)), '']}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-[#888888]">Totaal</p>
            <p className="text-lg font-bold text-white">{formatCurrency(total)}</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-[#888888]">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-white">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
