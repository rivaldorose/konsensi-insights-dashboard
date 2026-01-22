'use client';

interface ComparisonCardProps {
  title: string;
  subtitle: string;
  percentage: string;
  positive: boolean;
  thisMonth: number;
  lastMonth: number;
}

export function ComparisonCard({
  title,
  subtitle,
  percentage,
  positive,
  thisMonth,
  lastMonth,
}: ComparisonCardProps) {
  const maxValue = Math.max(thisMonth, lastMonth);
  const thisMonthWidth = (thisMonth / maxValue) * 100;
  const lastMonthWidth = (lastMonth / maxValue) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-text-secondary">{subtitle}</p>
      </div>

      <p className={`text-3xl font-bold mb-6 ${positive ? 'text-konsensi-green-light' : 'text-[#ef4444]'}`}>
        {percentage}
      </p>

      <div className="space-y-3">
        {/* This Month */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Deze Maand</span>
            <span className="font-medium text-foreground">{formatCurrency(thisMonth)}</span>
          </div>
          <div className="h-3 bg-card-hover rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${thisMonthWidth}%`,
                background: 'repeating-linear-gradient(45deg, #3D7B4C, #3D7B4C 4px, #4a9d5c 4px, #4a9d5c 8px)',
              }}
            />
          </div>
        </div>

        {/* Last Month */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Vorige Maand</span>
            <span className="font-medium text-foreground">{formatCurrency(lastMonth)}</span>
          </div>
          <div className="h-3 bg-card-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-konsensi-green-light rounded-full"
              style={{ width: `${lastMonthWidth}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface RatioCardProps {
  title: string;
  value: string;
  healthy: boolean;
}

export function RatioCard({ title, value, healthy }: RatioCardProps) {
  const numericValue = parseInt(value);

  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>

      <p className={`text-4xl font-bold mb-4 ${healthy ? 'text-konsensi-green-light' : 'text-[#ef4444]'}`}>
        {value}
      </p>

      <div className="space-y-2">
        <div className="h-2 bg-card-hover rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              healthy ? 'bg-konsensi-green-light' : 'bg-[#ef4444]'
            }`}
            style={{ width: `${numericValue}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-tertiary">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
