'use client';

interface ComparisonItem {
  id: string;
  label: string;
  thisYear: number;
  lastYear: number;
  format: 'currency' | 'number' | 'percentage';
}

interface YearComparisonProps {
  items: ComparisonItem[];
}

export function YearComparison({ items }: YearComparisonProps) {
  const formatValue = (value: number, format: 'currency' | 'number' | 'percentage') => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('nl-NL', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      case 'percentage':
        return `${value}%`;
      case 'number':
      default:
        return value.toLocaleString('nl-NL');
    }
  };

  const getMaxValue = (thisYear: number, lastYear: number) => {
    return Math.max(thisYear, lastYear);
  };

  const getBarWidth = (value: number, max: number) => {
    return (value / max) * 100;
  };

  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Vergelijking met Vorig Jaar</h3>
        <p className="text-sm text-text-secondary">2025 vs 2024</p>
      </div>

      <div className="flex items-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3D7B4C]" />
          <span className="text-text-secondary">Dit jaar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#555555]" />
          <span className="text-text-secondary">Vorig jaar</span>
        </div>
      </div>

      <div className="space-y-5">
        {items.map((item) => {
          const maxVal = getMaxValue(item.thisYear, item.lastYear);
          return (
            <div key={item.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>

              <div className="space-y-2">
                {/* This year bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-6 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3D7B4C] rounded-full transition-all duration-500"
                      style={{ width: `${getBarWidth(item.thisYear, maxVal)}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#3D7B4C] w-24 text-right">
                    {formatValue(item.thisYear, item.format)}
                  </span>
                </div>

                {/* Last year bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-6 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#555555] rounded-full transition-all duration-500"
                      style={{ width: `${getBarWidth(item.lastYear, maxVal)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-text-secondary w-24 text-right">
                    {formatValue(item.lastYear, item.format)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
