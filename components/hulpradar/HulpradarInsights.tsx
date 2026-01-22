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
  positive: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
};

const iconColorMap = {
  positive: 'text-green-600',
  warning: 'text-amber-600',
  info: 'text-blue-600',
};

export function HulpradarInsights({ insights }: HulpradarInsightsProps) {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-[#111827]">Hulpradar Inzichten</h3>
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
