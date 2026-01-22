'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CityData {
  stad: string;
  aantal: number;
  color: string;
  [key: string]: string | number;
}

interface ClientsPerCityChartProps {
  data: CityData[];
  total: number;
}

export function ClientsPerCityChart({ data, total }: ClientsPerCityChartProps) {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: CityData }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.aantal / total) * 100).toFixed(1);
      return (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ffffff' }} className="p-3 rounded-lg shadow-lg">
          <p className="font-medium text-white">{item.stad}</p>
          <p className="text-sm text-[#888888]">
            {item.aantal} cliënten ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Cliënten per Stad</h3>
      <div className="flex items-center gap-6">
        <div className="h-[250px] w-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="aantal"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{total}</span>
            <span className="text-sm text-[#888888]">Totaal</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.stad} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-[#888888]">{item.stad}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{item.aantal}</span>
                <span className="text-xs text-[#888888]">
                  ({((item.aantal / total) * 100).toFixed(0)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
