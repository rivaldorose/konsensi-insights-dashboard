'use client';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ZAxis,
} from 'recharts';

interface ScatterDataPoint {
  inkomen: number;
  schuld: number;
  urgentie: 'Hoog' | 'Gemiddeld' | 'Laag';
  naam: string;
}

interface DebtIncomeScatterProps {
  data: ScatterDataPoint[];
}

const urgencyColors = {
  Hoog: '#EF4444',
  Gemiddeld: '#F59E0B',
  Laag: '#22c55e',
};

export function DebtIncomeScatter({ data }: DebtIncomeScatterProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ScatterDataPoint }> }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ffffff' }} className="p-3 rounded-lg shadow-lg">
          <p className="font-medium text-white">{item.naam}</p>
          <p className="text-sm text-[#888888]">Inkomen: {formatCurrency(item.inkomen)}</p>
          <p className="text-sm text-[#888888]">Schuld: {formatCurrency(item.schuld)}</p>
          <p className="text-sm" style={{ color: urgencyColors[item.urgentie] }}>
            Urgentie: {item.urgentie}
          </p>
        </div>
      );
    }
    return null;
  };

  // Group data by urgency for different colored scatter plots
  const hoogData = data.filter((d) => d.urgentie === 'Hoog');
  const gemiddeldData = data.filter((d) => d.urgentie === 'Gemiddeld');
  const laagData = data.filter((d) => d.urgentie === 'Laag');

  // Calculate average for reference line
  const avgIncome = data.reduce((sum, d) => sum + d.inkomen, 0) / data.length;

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-6 shadow-sm border border-[#2a2a2a] h-full">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Schuld vs. Inkomen</h3>
        <div className="flex items-center gap-4">
          {Object.entries(urgencyColors).map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-[#888888]">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis
              type="number"
              dataKey="inkomen"
              name="Inkomen"
              tick={{ fill: '#888888', fontSize: 11 }}
              axisLine={{ stroke: '#2a2a2a' }}
              tickLine={false}
              tickFormatter={(value) => `€${value / 1000}k`}
              domain={['dataMin - 200', 'dataMax + 200']}
            />
            <YAxis
              type="number"
              dataKey="schuld"
              name="Schuld"
              tick={{ fill: '#888888', fontSize: 11 }}
              axisLine={{ stroke: '#2a2a2a' }}
              tickLine={false}
              tickFormatter={(value) => `€${value / 1000}k`}
              domain={['dataMin - 500', 'dataMax + 500']}
            />
            <ZAxis range={[60, 60]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              x={avgIncome}
              stroke="#9CA3AF"
              strokeDasharray="3 3"
              label={{ value: 'Gem.', position: 'top', fill: '#9CA3AF', fontSize: 10 }}
            />
            <Scatter name="Hoog" data={hoogData} fill={urgencyColors.Hoog} />
            <Scatter name="Gemiddeld" data={gemiddeldData} fill={urgencyColors.Gemiddeld} />
            <Scatter name="Laag" data={laagData} fill={urgencyColors.Laag} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
