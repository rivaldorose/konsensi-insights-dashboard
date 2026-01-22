'use client';

import { useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { UserGrowthChart } from '@/components/dashboard/UserGrowthChart';
import { DebtDonutChart } from '@/components/dashboard/DebtDonutChart';
import { ComparisonCard, RatioCard } from '@/components/dashboard/ComparisonCard';
import { UsersTable } from '@/components/dashboard/UsersTable';
import { ContentTabs } from '@/components/dashboard/ContentTabs';
import { UsersByCityChart } from '@/components/dashboard/UsersByCityChart';
import { PeriodComparison } from '@/components/dashboard/PeriodComparison';
import { AllUsersTable } from '@/components/dashboard/AllUsersTable';
import {
  navTabs,
  contentTabs,
  kpiData,
  userGrowthData,
  debtByTypeData,
  comparisonData,
  recentUsersData,
  usersByCityData,
  periodComparisonData,
  allUsersData,
} from '@/lib/mock-data';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overzicht');

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Floating Navbar */}
      <Navbar tabs={navTabs} />

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Welcome Section */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">Goedemiddag,</p>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[#111827]">Rivaldo Rose</h1>
              <span className="px-3 py-1 bg-[#3D7B4C]/10 text-[#3D7B4C] text-xs font-medium rounded-full">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#3D7B4C] text-white rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors shadow-lg shadow-[#3D7B4C]/20">
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              Delen
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {kpiData.map((kpi) => (
            <KpiCard
              key={kpi.id}
              label={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
              featured={kpi.featured}
              sparklineData={kpi.sparklineData}
              trend={kpi.trend as 'up' | 'down' | 'neutral'}
            />
          ))}
        </div>

        {/* Content Tabs */}
        <div className="mb-8">
          <ContentTabs tabs={contentTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        {activeTab === 'overzicht' && (
          <>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Left Side - Charts (2 columns) */}
              <div className="lg:col-span-2 space-y-6">
                <UserGrowthChart data={userGrowthData} />
                <DebtDonutChart data={debtByTypeData} />
              </div>

              {/* Right Side - Comparison Cards (1 column) */}
              <div className="space-y-6">
                <ComparisonCard
                  title={comparisonData.debtPaid.title}
                  subtitle={comparisonData.debtPaid.subtitle}
                  percentage={comparisonData.debtPaid.percentage}
                  positive={comparisonData.debtPaid.positive}
                  thisMonth={comparisonData.debtPaid.thisMonth}
                  lastMonth={comparisonData.debtPaid.lastMonth}
                />
                <ComparisonCard
                  title={comparisonData.newDebts.title}
                  subtitle={comparisonData.newDebts.subtitle}
                  percentage={comparisonData.newDebts.percentage}
                  positive={comparisonData.newDebts.positive}
                  thisMonth={comparisonData.newDebts.thisMonth}
                  lastMonth={comparisonData.newDebts.lastMonth}
                />
                <RatioCard
                  title={comparisonData.costIncomeRatio.title}
                  value={comparisonData.costIncomeRatio.value}
                  healthy={comparisonData.costIncomeRatio.healthy}
                />
              </div>
            </div>

            {/* Users Table */}
            <UsersTable users={recentUsersData} />
          </>
        )}

        {activeTab === 'gebruikers' && (
          <>
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <UserGrowthChart data={userGrowthData} />
              </div>
              <div>
                <UsersByCityChart data={usersByCityData} />
              </div>
            </div>

            {/* Period Comparison */}
            <div className="mb-8">
              <PeriodComparison data={periodComparisonData} />
            </div>

            {/* All Users Table */}
            <AllUsersTable users={allUsersData} />
          </>
        )}

        {activeTab === 'schulden' && (
          <div className="bg-white rounded-[20px] p-12 shadow-sm shadow-gray-100 border border-gray-100 text-center">
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Schulden Overzicht</h3>
            <p className="text-gray-500">Deze tab wordt binnenkort gebouwd.</p>
          </div>
        )}

        {activeTab === 'betalingen' && (
          <div className="bg-white rounded-[20px] p-12 shadow-sm shadow-gray-100 border border-gray-100 text-center">
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Betalingen Overzicht</h3>
            <p className="text-gray-500">Deze tab wordt binnenkort gebouwd.</p>
          </div>
        )}

        {activeTab === 'financien' && (
          <div className="bg-white rounded-[20px] p-12 shadow-sm shadow-gray-100 border border-gray-100 text-center">
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Financiën Overzicht</h3>
            <p className="text-gray-500">Deze tab wordt binnenkort gebouwd.</p>
          </div>
        )}

        {activeTab === 'inzichten' && (
          <div className="bg-white rounded-[20px] p-12 shadow-sm shadow-gray-100 border border-gray-100 text-center">
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Inzichten</h3>
            <p className="text-gray-500">Deze tab wordt binnenkort gebouwd.</p>
          </div>
        )}
      </main>
    </div>
  );
}
