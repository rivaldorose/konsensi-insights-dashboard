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
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Partner Werkgevers</h3>
        <button className="text-sm text-konsensi-green font-medium hover:underline">
          Bekijk alle partners
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="p-4 bg-border-subtle rounded-xl hover:bg-border-medium transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center border border-border-subtle">
                <span className="text-lg font-bold text-konsensi-green">{partner.logo}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{partner.naam}</p>
                <p className="text-xs text-text-secondary">{partner.sector}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-text-secondary">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{partner.vacatures} vacatures</span>
              </div>
              <div className="flex items-center gap-1 text-green-500">
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
