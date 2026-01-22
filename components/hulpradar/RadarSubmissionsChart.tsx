'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RadarSubmissionData {
  maand: string;
  invullingen: number;
  [key: string]: string | number;
}

interface RadarSubmissionsChartProps {
  data: RadarSubmissionData[];
}

export function RadarSubmissionsChart({ data }: RadarSubmissionsChartProps) {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-lg shadow-lg" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <p className="font-medium text-white">{label}</p>
          <p className="text-sm text-[#3D7B4C]">
            {payload[0].value.toLocaleString('nl-NL')} invullingen
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Radar Invullingen per Maand</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3D7B4C]" />
            <span className="text-sm text-[#888888]">Invullingen</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInvullingen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3D7B4C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3D7B4C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
            <XAxis
              dataKey="maand"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888888', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888888', fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString('nl-NL')}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="invullingen"
              stroke="#3D7B4C"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorInvullingen)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
