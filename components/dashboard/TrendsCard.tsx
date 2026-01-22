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
        return <Minus className="w-4 h-4 text-[#888888]" />;
    }
  };

  const getChangeColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return 'text-[#22c55e]';
      case 'down':
        return 'text-[#ef4444]';
      case 'stable':
        return 'text-[#888888]';
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
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Trends deze Maand</h3>
        <p className="text-sm text-[#888888]">Belangrijkste veranderingen</p>
      </div>

      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-[#2a2a2a]">
                {getDirectionIcon(trend.direction)}
              </div>
              <div>
                <p className="font-medium text-white text-sm">{trend.label}</p>
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
