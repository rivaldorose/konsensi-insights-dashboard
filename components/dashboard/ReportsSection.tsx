'use client';

import { FileText, Download, Calendar, Settings } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  date: string;
  type: 'monthly' | 'quarterly' | 'custom';
}

interface ReportsSectionProps {
  reports: Report[];
}

export function ReportsSection({ reports }: ReportsSectionProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827]">Rapporten</h3>
        <p className="text-sm text-gray-500">Genereer en download rapporten</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button className="flex flex-col items-center gap-2 p-4 bg-[#3D7B4C]/10 rounded-xl hover:bg-[#3D7B4C]/20 transition-colors group">
          <div className="w-10 h-10 bg-[#3D7B4C] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-medium text-[#3D7B4C]">Maandrapport</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-[#3D7B4C]/10 rounded-xl hover:bg-[#3D7B4C]/20 transition-colors group">
          <div className="w-10 h-10 bg-[#3D7B4C] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-medium text-[#3D7B4C]">Kwartaalrapport</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors group">
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-medium text-gray-600">Custom rapport</span>
        </button>
      </div>

      {/* Recent Reports */}
      <div>
        <h4 className="text-sm font-semibold text-[#111827] mb-3">Recente Rapporten</h4>
        <div className="space-y-2">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-[#111827] text-sm">{report.title}</p>
                  <p className="text-xs text-gray-500">{formatDate(report.date)}</p>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-white transition-colors">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
