'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CounselorData {
  naam: string;
  clienten: number;
  [key: string]: string | number;
}

interface ClientsPerCounselorChartProps {
  data: CounselorData[];
}

export function ClientsPerCounselorChart({ data }: ClientsPerCounselorChartProps) {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: CounselorData }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900">{item.naam}</p>
          <p className="text-sm text-[#3D7B4C]">
            {item.clienten} cliënten
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-[#111827] mb-4">Cliënten per Bewindvoerder</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="naam"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }} />
            <Bar
              dataKey="clienten"
              fill="#3D7B4C"
              radius={[0, 6, 6, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
