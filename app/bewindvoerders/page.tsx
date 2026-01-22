'use client';

import { Navbar } from '@/components/dashboard/Navbar';
import { Users, Briefcase, TrendingUp, Clock } from 'lucide-react';

export default function BewindvoerdersPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">Bewindvoerders</h1>
          <p className="text-gray-500 mt-1">
            Overzicht van alle bewindvoerders en hun cliënten
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-[20px] p-12 shadow-sm shadow-gray-100 border border-gray-100">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-[#3D7B4C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-[#3D7B4C]" />
            </div>
            <h2 className="text-xl font-bold text-[#111827] mb-2">
              Binnenkort Beschikbaar
            </h2>
            <p className="text-gray-500 mb-8">
              De bewindvoerders pagina wordt momenteel ontwikkeld. Hier kun je straks:
            </p>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <Users className="w-5 h-5 text-[#3D7B4C] mt-0.5" />
                <div>
                  <p className="font-medium text-[#111827] text-sm">Cliënten beheren</p>
                  <p className="text-xs text-gray-500">Per bewindvoerder</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-[#3D7B4C] mt-0.5" />
                <div>
                  <p className="font-medium text-[#111827] text-sm">Prestaties bekijken</p>
                  <p className="text-xs text-gray-500">KPI&apos;s en statistieken</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <Briefcase className="w-5 h-5 text-[#3D7B4C] mt-0.5" />
                <div>
                  <p className="font-medium text-[#111827] text-sm">Taken toewijzen</p>
                  <p className="text-xs text-gray-500">Workflow beheer</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <Clock className="w-5 h-5 text-[#3D7B4C] mt-0.5" />
                <div>
                  <p className="font-medium text-[#111827] text-sm">Activiteit volgen</p>
                  <p className="text-xs text-gray-500">Tijdregistratie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
