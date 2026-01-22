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

interface CityData {
  city: string;
  users: number;
}

interface UsersByCityChartProps {
  data: CityData[];
}

export function UsersByCityChart({ data }: UsersByCityChartProps) {
  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Gebruikers per Stad</h3>
        <p className="text-sm text-text-secondary">Top 5 steden met meeste gebruikers</p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="city"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-primary)', fontSize: 13, fontWeight: 500 }}
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                padding: '12px 16px',
                color: 'var(--text-primary)',
              }}
              formatter={(value) => [`${value} gebruikers`, '']}
              labelStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
            />
            <Bar
              dataKey="users"
              radius={[0, 8, 8, 0]}
              barSize={24}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#3D7B4C' : '#4a9d5c'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
