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
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Gebruikers per Stad</h3>
        <p className="text-sm text-[#888888]">Top 5 steden met meeste gebruikers</p>
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
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="city"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#ffffff', fontSize: 13, fontWeight: 500 }}
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                padding: '12px 16px',
                color: '#ffffff',
              }}
              formatter={(value) => [`${value} gebruikers`, '']}
              labelStyle={{ color: '#ffffff', fontWeight: 600 }}
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
