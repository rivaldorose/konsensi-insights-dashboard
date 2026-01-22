'use client';

import { Navbar } from '@/components/dashboard/Navbar';
import { Download, FileSpreadsheet, FileText, Calendar, Filter } from 'lucide-react';

export default function ExporteerPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Exporteer</h1>
          <p className="text-gray-500 mt-1">
            Exporteer data voor rapportages en audits
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-[20px] p-12 shadow-sm shadow-gray-100 border border-gray-100">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-[#3D7B4C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-[#3D7B4C]" />
            </div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">
              Binnenkort Beschikbaar
            </h2>
            <p className="text-gray-500 mb-8">
              De export pagina wordt momenteel ontwikkeld. Hier kun je straks:
            </p>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <FileSpreadsheet className="w-5 h-5 text-[#3D7B4C] mt-0.5" />
                <div>
                  <p className="font-medium text-[#111827] text-sm">Excel Export</p>
                  <p className="text-xs text-gray-500">.xlsx formaat</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <FileText className="w-5 h-5 text-[#3D7B4C] mt-0.5" />
                <div>
                  <p className="font-medium text-[#111827] text-sm">PDF Rapporten</p>
                  <p className="text-xs text-gray-500">Professionele layout</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-[#3D7B4C] mt-0.5" />
                <div>
                  <p className="font-medium text-[#111827] text-sm">Periode selectie</p>
                  <p className="text-xs text-gray-500">Flexibele datums</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <Filter className="w-5 h-5 text-[#3D7B4C] mt-0.5" />
                <div>
                  <p className="font-medium text-[#111827] text-sm">Filters</p>
                  <p className="text-xs text-gray-500">Selecteer data types</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
