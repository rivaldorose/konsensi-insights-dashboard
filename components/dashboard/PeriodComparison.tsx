'use client';

import { useState } from 'react';
import { ChevronDown, Users, Wallet, FileText } from 'lucide-react';

interface PeriodComparisonProps {
  data: {
    newUsers: { value: number; positive: boolean };
    totalDebt: { value: number; positive: boolean };
    activeDebts: { value: number; positive: boolean };
  };
}

const periodOptions = [
  { value: 'this-month', label: 'Deze maand' },
  { value: 'last-month', label: 'Vorige maand' },
  { value: 'this-quarter', label: 'Dit kwartaal' },
  { value: 'last-quarter', label: 'Vorig kwartaal' },
];

export function PeriodComparison({ data }: PeriodComparisonProps) {
  const [period1, setPeriod1] = useState('this-month');
  const [period2, setPeriod2] = useState('last-month');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const stats = [
    {
      icon: Users,
      label: 'nieuwe gebruikers',
      value: data.newUsers.value,
      positive: data.newUsers.positive,
      format: (v: number) => `${v > 0 ? '+' : ''}${v}`,
    },
    {
      icon: Wallet,
      label: 'totale schuld',
      value: data.totalDebt.value,
      positive: data.totalDebt.positive,
      format: (v: number) => `${v > 0 ? '+' : '-'}${formatCurrency(v)}`,
    },
    {
      icon: FileText,
      label: 'actieve schulden',
      value: data.activeDebts.value,
      positive: data.activeDebts.positive,
      format: (v: number) => `${v > 0 ? '+' : ''}${v}`,
    },
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827]">Periode Vergelijking</h3>
        <p className="text-sm text-gray-500">Vergelijk statistieken tussen periodes</p>
      </div>

      {/* Period Selectors */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <select
            value={period1}
            onChange={(e) => setPeriod1(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] cursor-pointer"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <span className="text-gray-400 text-sm">vs</span>

        <div className="relative flex-1">
          <select
            value={period2}
            onChange={(e) => setPeriod2(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] cursor-pointer"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <stat.icon className="w-5 h-5 text-gray-500" />
            </div>
            <div className="flex-1">
              <p
                className={`text-xl font-bold ${
                  stat.positive ? 'text-[#22c55e]' : 'text-[#ef4444]'
                }`}
              >
                {stat.format(stat.value)}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
