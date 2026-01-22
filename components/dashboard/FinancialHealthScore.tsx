'use client';

interface HealthFactor {
  name: string;
  value: number;
}

interface FinancialHealthScoreProps {
  score: number;
  factors: HealthFactor[];
}

export function FinancialHealthScore({ score, factors }: FinancialHealthScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return '#3D7B4C';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Goed';
    if (score >= 50) return 'Gemiddeld';
    return 'Aandacht nodig';
  };

  const scoreColor = getScoreColor(score);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100">
      <h3 className="text-lg font-semibold text-[#111827] mb-6">Financiële Gezondheid Score</h3>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Circular Progress */}
        <div className="relative flex-shrink-0">
          <svg width="180" height="180" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke={scoreColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-bold" style={{ color: scoreColor }}>
              {score}
            </span>
            <span className="text-sm text-gray-500">van 100</span>
            <span
              className="text-sm font-medium mt-1 px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${scoreColor}20`,
                color: scoreColor,
              }}
            >
              {getScoreLabel(score)}
            </span>
          </div>
        </div>

        {/* Factors */}
        <div className="flex-1 w-full space-y-4">
          {factors.map((factor, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{factor.name}</span>
                <span className="text-sm font-medium text-[#111827]">{factor.value}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${factor.value}%`,
                    backgroundColor: getScoreColor(factor.value),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
