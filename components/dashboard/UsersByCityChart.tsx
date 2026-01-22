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
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827]">Gebruikers per Stad</h3>
        <p className="text-sm text-gray-500">Top 5 steden met meeste gebruikers</p>
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
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="city"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#111827', fontSize: 13, fontWeight: 500 }}
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '12px 16px',
              }}
              formatter={(value) => [`${value} gebruikers`, '']}
              labelStyle={{ color: '#111827', fontWeight: 600 }}
            />
            <Bar
              dataKey="users"
              radius={[0, 8, 8, 0]}
              barSize={24}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#3D7B4C' : '#8FD14F'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
