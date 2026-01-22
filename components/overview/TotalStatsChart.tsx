'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartDrillDown, generateUsersDrillDown } from '@/components/ui/ChartDrillDown';

interface MonthlyData {
  maand: string;
  jongeren: number;
  hulpradar: number;
  schuldenradar: number;
  work: number;
  [key: string]: string | number;
}

interface TotalStatsChartProps {
  data: MonthlyData[];
}

interface DrillDownData {
  title: string;
  value: string | number;
  change?: number;
  details: {
    label: string;
    value: string | number;
    subValue?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  breakdown?: {
    category: string;
    items: {
      name: string;
      value: number;
      percentage: number;
    }[];
  };
}

export function TotalStatsChart({ data }: TotalStatsChartProps) {
  const [drillDownOpen, setDrillDownOpen] = useState(false);
  const [drillDownData, setDrillDownData] = useState<DrillDownData | null>(null);
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600">{item.name}:</span>
              <span className="font-medium text-gray-900">
                {item.value.toLocaleString('nl-NL')}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChartClick = (chartData: any) => {
    if (chartData?.activePayload && chartData.activePayload.length > 0) {
      const clickedData = chartData.activePayload[0].payload as MonthlyData;
      const totalUsers = clickedData.jongeren + clickedData.hulpradar + clickedData.schuldenradar + clickedData.work;

      setDrillDownData(generateUsersDrillDown(clickedData.maand, totalUsers));
      setDrillDownOpen(true);
    }
  };

  return (
    <>
    <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm shadow-gray-100 dark:shadow-gray-800 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[#111827] dark:text-white">Platform Activiteit</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Klik op een punt voor meer details</p>
        </div>
      </div>
      <div className="h-[300px] cursor-pointer">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} onClick={handleChartClick}>
            <defs>
              <linearGradient id="colorJongeren" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3D7B4C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3D7B4C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHulpradar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSchuldenradar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWork" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" vertical={false} />
            <XAxis
              dataKey="maand"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString('nl-NL')}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="jongeren"
              name="Jongeren"
              stroke="#3D7B4C"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorJongeren)"
            />
            <Area
              type="monotone"
              dataKey="hulpradar"
              name="Hulpradar"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorHulpradar)"
            />
            <Area
              type="monotone"
              dataKey="schuldenradar"
              name="Schuldenradar"
              stroke="#EF4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSchuldenradar)"
            />
            <Area
              type="monotone"
              dataKey="work"
              name="Work"
              stroke="#F59E0B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorWork)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    <ChartDrillDown
      isOpen={drillDownOpen}
      onClose={() => setDrillDownOpen(false)}
      data={drillDownData}
    />
    </>
  );
}
