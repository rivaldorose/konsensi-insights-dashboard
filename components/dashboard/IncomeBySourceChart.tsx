'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface IncomeSource {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface IncomeBySourceChartProps {
  data: IncomeSource[];
  total: number;
}

export function IncomeBySourceChart({ data, total }: IncomeBySourceChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: IncomeSource }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border border-border-subtle">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-text-secondary">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-[20px] p-6 shadow-sm border border-border-subtle h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">Inkomen per Bron</h3>
      <div className="flex items-center">
        <div className="w-1/2 h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-text-secondary">Totaal</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(total)}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-text-secondary">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
