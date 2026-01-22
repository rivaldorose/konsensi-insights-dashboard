'use client';

import { TrendingUp, Lightbulb, AlertTriangle } from 'lucide-react';

interface Insight {
  id: string;
  text: string;
  type: 'positive' | 'warning' | 'info';
  metric?: string;
}

interface HulpradarInsightsProps {
  insights: Insight[];
}

const iconMap = {
  positive: TrendingUp,
  warning: AlertTriangle,
  info: Lightbulb,
};

const colorMap = {
  positive: 'bg-green-900/30 text-green-400 border-green-800',
  warning: 'bg-amber-900/30 text-amber-400 border-amber-800',
  info: 'bg-blue-900/30 text-blue-400 border-blue-800',
};

const iconColorMap = {
  positive: 'text-green-400',
  warning: 'text-amber-400',
  info: 'text-blue-400',
};

export function HulpradarInsights({ insights }: HulpradarInsightsProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a]">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-400" />
        <h3 className="text-lg font-semibold text-white">Hulpradar Inzichten</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => {
          const Icon = iconMap[insight.type];
          return (
            <div
              key={insight.id}
              className={`p-4 rounded-xl border ${colorMap[insight.type]}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColorMap[insight.type]}`} />
                <div>
                  <p className="text-sm font-medium">{insight.text}</p>
                  {insight.metric && (
                    <p className="text-xs mt-1 opacity-75">{insight.metric}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
