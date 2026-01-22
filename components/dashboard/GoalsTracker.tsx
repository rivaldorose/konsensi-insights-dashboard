'use client';

import { Plus } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  format: 'currency' | 'number';
}

interface GoalsTrackerProps {
  goals: Goal[];
}

export function GoalsTracker({ goals }: GoalsTrackerProps) {
  const formatValue = (value: number, format: 'currency' | 'number') => {
    if (format === 'currency') {
      return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return value.toLocaleString('nl-NL');
  };

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getRemaining = (current: number, target: number, format: 'currency' | 'number') => {
    const remaining = target - current;
    if (remaining <= 0) return 'Doel behaald!';
    return `Nog ${formatValue(remaining, format)} te gaan`;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-[#22c55e]';
    if (progress >= 70) return 'bg-[#3D7B4C]';
    if (progress >= 50) return 'bg-[#f59e0b]';
    return 'bg-[#ef4444]';
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 border border-[#2a2a2a]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Doelen & Targets</h3>
          <p className="text-sm text-[#888888]">Voortgang naar uw doelstellingen</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#3D7B4C] text-white rounded-full text-sm font-medium hover:bg-[#346a41] transition-colors">
          <Plus className="w-4 h-4" />
          Nieuw Doel
        </button>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => {
          const progress = getProgress(goal.current, goal.target);
          return (
            <div key={goal.id} className="p-4 bg-[#2a2a2a] rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white text-sm">{goal.title}</h4>
                <span className="text-sm font-bold text-[#3D7B4C]">{Math.round(progress)}%</span>
              </div>

              <div className="w-full h-3 bg-[#1a1a1a] rounded-full mb-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#888888]">
                  {formatValue(goal.current, goal.format)} / {formatValue(goal.target, goal.format)}
                </span>
                <span className="text-[#888888]">
                  {getRemaining(goal.current, goal.target, goal.format)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
