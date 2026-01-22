'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Trend {
  id: string;
  label: string;
  change: number;
  direction: 'up' | 'down' | 'stable';
  sparklineData: { value: number }[];
}

interface TrendsCardProps {
  trends: Trend[];
}

export function TrendsCard({ trends }: TrendsCardProps) {
  const getDirectionIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-[#22c55e]" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-[#ef4444]" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getChangeColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return 'text-[#22c55e]';
      case 'down':
        return 'text-[#ef4444]';
      case 'stable':
        return 'text-gray-500';
    }
  };

  const getSparklineColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return '#22c55e';
      case 'down':
        return '#ef4444';
      case 'stable':
        return '#9ca3af';
    }
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827]">Trends deze Maand</h3>
        <p className="text-sm text-gray-500">Belangrijkste veranderingen</p>
      </div>

      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                {getDirectionIcon(trend.direction)}
              </div>
              <div>
                <p className="font-medium text-[#111827] text-sm">{trend.label}</p>
                <p className={`text-xs font-medium ${getChangeColor(trend.direction)}`}>
                  {trend.direction === 'up' && '+'}
                  {trend.direction === 'stable' ? 'Stabiel' : `${trend.change}%`}
                </p>
              </div>
            </div>

            <div className="w-20 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend.sparklineData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={getSparklineColor(trend.direction)}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
