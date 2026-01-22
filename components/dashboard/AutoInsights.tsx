'use client';

import { TrendingUp, AlertTriangle, CheckCircle, Target, TrendingDown, Lightbulb } from 'lucide-react';

interface Insight {
  id: string;
  icon: 'trending-up' | 'warning' | 'success' | 'target' | 'trending-down' | 'tip';
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  metric?: string;
}

interface AutoInsightsProps {
  insights: Insight[];
}

const iconMap = {
  'trending-up': TrendingUp,
  'warning': AlertTriangle,
  'success': CheckCircle,
  'target': Target,
  'trending-down': TrendingDown,
  'tip': Lightbulb,
};

export function AutoInsights({ insights }: AutoInsightsProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Automatische Inzichten</h3>
        <p className="text-sm text-[#888888]">Gegenereerde inzichten op basis van uw data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight) => {
          const Icon = iconMap[insight.icon];
          return (
            <div
              key={insight.id}
              className="flex items-start gap-4 p-4 bg-[#2a2a2a] rounded-xl hover:bg-[#333333] transition-colors cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${insight.iconBg}`}
              >
                <Icon className={`w-5 h-5 ${insight.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-sm">{insight.title}</h4>
                <p className="text-xs text-[#888888] mt-1">{insight.description}</p>
                {insight.metric && (
                  <span className="inline-block mt-2 text-xs font-medium text-[#3D7B4C] bg-[#3D7B4C]/10 px-2 py-1 rounded-full">
                    {insight.metric}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
