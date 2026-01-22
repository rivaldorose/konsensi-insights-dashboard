'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface CostCategory {
  name: string;
  value: number;
  color: string;
}

interface CostsByCategoryChartProps {
  data: CostCategory[];
}

export function CostsByCategoryChart({ data }: CostsByCategoryChartProps) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: CostCategory; value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border border-border-subtle">
          <p className="font-medium text-foreground">{payload[0].payload.name}</p>
          <p className="text-sm text-text-secondary">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-[20px] p-6 shadow-sm border border-border-subtle h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">Kosten per Categorie</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey="value"
              radius={[0, 6, 6, 0]}
              barSize={20}
              label={{
                position: 'right',
                formatter: (value) => formatCurrency(value as number),
                fill: 'var(--text-secondary)',
                fontSize: 11,
              }}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
