'use client';

import { AlertTriangle, TrendingUp, Eye, Lightbulb } from 'lucide-react';

interface Insight {
  id: string;
  text: string;
  type: 'warning' | 'positive' | 'info';
  metric?: string;
}

interface SchuldenradarInsightsProps {
  insights: Insight[];
}

const iconMap = {
  warning: AlertTriangle,
  positive: TrendingUp,
  info: Eye,
};

const colorMap = {
  warning: 'bg-red-500/10 dark:bg-red-900/30 text-red-600 dark:text-red-300 border-red-300 dark:border-red-800/50',
  positive: 'bg-green-500/10 dark:bg-green-900/30 text-green-600 dark:text-green-300 border-green-300 dark:border-green-800/50',
  info: 'bg-blue-500/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border-blue-300 dark:border-blue-800/50',
};

const iconColorMap = {
  warning: 'text-red-500 dark:text-red-400',
  positive: 'text-green-500 dark:text-green-400',
  info: 'text-blue-500 dark:text-blue-400',
};

export function SchuldenradarInsights({ insights }: SchuldenradarInsightsProps) {
  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-foreground">Schuldenradar Inzichten</h3>
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
