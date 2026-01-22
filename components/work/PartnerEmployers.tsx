'use client';

import { Users, Briefcase } from 'lucide-react';

interface Partner {
  id: string;
  naam: string;
  logo: string;
  sector: string;
  vacatures: number;
  geplaatst: number;
}

interface PartnerEmployersProps {
  partners: Partner[];
}

export function PartnerEmployers({ partners }: PartnerEmployersProps) {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#111827]">Partner Werkgevers</h3>
        <button className="text-sm text-[#3D7B4C] font-medium hover:underline">
          Bekijk alle partners
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                <span className="text-lg font-bold text-[#3D7B4C]">{partner.logo}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{partner.naam}</p>
                <p className="text-xs text-gray-500">{partner.sector}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-gray-500">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{partner.vacatures} vacatures</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <Users className="w-3.5 h-3.5" />
                <span>{partner.geplaatst} geplaatst</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
