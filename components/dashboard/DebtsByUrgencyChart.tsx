'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface UrgencyData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface DebtsByUrgencyChartProps {
  data: UrgencyData[];
  total: number;
}

export function DebtsByUrgencyChart({ data, total }: DebtsByUrgencyChartProps) {
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: UrgencyData }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} className="p-3 rounded-lg shadow-lg">
          <p className="font-medium text-foreground">{item.name}</p>
          <p className="text-sm text-text-secondary">{item.value} schulden</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-[20px] p-6 shadow-sm border border-border-subtle h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">Schulden per Urgentie</h3>
      <div className="flex flex-col items-center">
        <div className="w-full h-[180px] relative">
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
              <p className="text-2xl font-bold text-foreground">{total}</p>
              <p className="text-xs text-text-secondary">totaal</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-text-secondary">{item.name}</span>
              <span className="text-sm font-medium text-foreground">({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
