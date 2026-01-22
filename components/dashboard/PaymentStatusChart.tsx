'use client';

interface PaymentStatus {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface PaymentStatusChartProps {
  data: PaymentStatus[];
  total: number;
}

export function PaymentStatusChart({ data, total }: PaymentStatusChartProps) {
  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">Betalingen Status</h3>

      {/* Stacked bar */}
      <div className="mb-6">
        <div className="h-8 rounded-full overflow-hidden flex">
          {data.map((item, index) => (
            <div
              key={index}
              className="h-full transition-all duration-300"
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-text-secondary">{item.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-secondary">{item.value.toLocaleString('nl-NL')}</span>
              <span className="text-sm font-medium text-foreground w-12 text-right">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">Totaal</span>
        <span className="text-sm font-bold text-foreground">{total.toLocaleString('nl-NL')}</span>
      </div>
    </div>
  );
}
