'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  month: string;
  users: number;
}

interface UserGrowthChartProps {
  data: DataPoint[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Gebruikersgroei</h3>
        <p className="text-sm text-text-secondary">Nieuwe gebruikers per maand</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3D7B4C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3D7B4C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                padding: '12px 16px',
              }}
              labelStyle={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '4px' }}
              itemStyle={{ color: '#4a9d5c' }}
              formatter={(value) => [`${value} gebruikers`, '']}
              labelFormatter={(label) => `${label}`}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#3D7B4C"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
              dot={{ fill: '#3D7B4C', strokeWidth: 0, r: 4 }}
              activeDot={{ fill: '#4a9d5c', strokeWidth: 0, r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
