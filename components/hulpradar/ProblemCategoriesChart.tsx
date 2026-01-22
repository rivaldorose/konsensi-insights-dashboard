'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ProblemData {
  categorie: string;
  aantal: number;
  color: string;
  [key: string]: string | number;
}

interface ProblemCategoriesChartProps {
  data: ProblemData[];
}

export function ProblemCategoriesChart({ data }: ProblemCategoriesChartProps) {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: ProblemData }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="p-3 rounded-lg shadow-lg" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <p className="font-medium text-white">{item.categorie}</p>
          <p className="text-sm text-[#888888]">
            {item.aantal.toLocaleString('nl-NL')} meldingen
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Probleem Categorieën</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="categorie"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888888', fontSize: 12 }}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }} />
            <Bar dataKey="aantal" radius={[0, 6, 6, 0]} barSize={18}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
