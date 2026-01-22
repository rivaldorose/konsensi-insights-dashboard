'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface OrgTypeData {
  type: string;
  aantal: number;
  color: string;
  [key: string]: string | number;
}

interface OrganizationTypesChartProps {
  data: OrgTypeData[];
  total: number;
}

export function OrganizationTypesChart({ data, total }: OrganizationTypesChartProps) {
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: OrgTypeData }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.aantal / total) * 100).toFixed(1);
      return (
        <div className="p-3 rounded-lg shadow-lg" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <p className="font-medium text-white">{item.type}</p>
          <p className="text-sm text-[#888888]">
            {item.aantal.toLocaleString('nl-NL')} organisaties ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a] h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Hulporganisaties per Type</h3>
      <div className="flex items-center gap-6">
        <div className="h-[200px] w-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
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
            <span className="text-2xl font-bold text-white">{total}</span>
            <span className="text-xs text-[#888888]">Totaal</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.type} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-[#888888]">{item.type}</span>
              </div>
              <span className="text-sm font-medium text-white">
                {item.aantal}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
