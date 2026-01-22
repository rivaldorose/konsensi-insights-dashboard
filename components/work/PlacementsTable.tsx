'use client';

import { useState } from 'react';
import { Search, ChevronDown, Clock } from 'lucide-react';

type SectorType = 'Horeca' | 'Retail' | 'Logistiek' | 'Schoonmaak' | 'Administratie' | 'Productie' | 'Zorg' | 'Overig';
type ContractType = 'Vast' | 'Tijdelijk' | 'Uitzend' | 'Oproep' | 'Stage';

interface Placement {
  id: string;
  datum: string;
  werkzoekende: {
    naam: string;
    avatar: string;
  };
  functie: string;
  werkgever: string;
  sector: SectorType;
  contractType: ContractType;
  salarisRange: string;
  tijdTotPlaatsing: string;
}

interface PlacementsTableProps {
  placements: Placement[];
}

const sectorColors: Record<SectorType, string> = {
  Horeca: 'bg-orange-100 text-orange-700',
  Retail: 'bg-blue-100 text-blue-700',
  Logistiek: 'bg-purple-100 text-purple-700',
  Schoonmaak: 'bg-cyan-100 text-cyan-700',
  Administratie: 'bg-gray-100 text-gray-700',
  Productie: 'bg-yellow-100 text-yellow-700',
  Zorg: 'bg-pink-100 text-pink-700',
  Overig: 'bg-slate-100 text-slate-700',
};

const contractColors: Record<ContractType, string> = {
  Vast: 'bg-green-100 text-green-700',
  Tijdelijk: 'bg-blue-100 text-blue-700',
  Uitzend: 'bg-orange-100 text-orange-700',
  Oproep: 'bg-purple-100 text-purple-700',
  Stage: 'bg-pink-100 text-pink-700',
};

export function PlacementsTable({ placements }: PlacementsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [contractFilter, setContractFilter] = useState<string>('all');

  const filteredPlacements = placements.filter((placement) => {
    const matchesSearch =
      placement.werkzoekende.naam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      placement.functie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      placement.werkgever.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = sectorFilter === 'all' || placement.sector === sectorFilter;
    const matchesContract = contractFilter === 'all' || placement.contractType === contractFilter;
    return matchesSearch && matchesSector && matchesContract;
  });

  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recente Plaatsingen</h3>
        <span className="text-sm text-text-secondary">{filteredPlacements.length} resultaten</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Zoek op naam, functie, werkgever..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border-subtle rounded-xl text-sm bg-card text-foreground placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          />
        </div>

        <div className="relative">
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 border border-border-subtle rounded-xl text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          >
            <option value="all">Alle sectoren</option>
            <option value="Horeca">Horeca</option>
            <option value="Retail">Retail</option>
            <option value="Logistiek">Logistiek</option>
            <option value="Schoonmaak">Schoonmaak</option>
            <option value="Administratie">Administratie</option>
            <option value="Productie">Productie</option>
            <option value="Zorg">Zorg</option>
            <option value="Overig">Overig</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={contractFilter}
            onChange={(e) => setContractFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 border border-border-subtle rounded-xl text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
          >
            <option value="all">Alle contracten</option>
            <option value="Vast">Vast contract</option>
            <option value="Tijdelijk">Tijdelijk</option>
            <option value="Uitzend">Uitzend</option>
            <option value="Oproep">Oproep</option>
            <option value="Stage">Stage</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Datum
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Werkzoekende
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Functie
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Werkgever
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Sector
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Contract
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Salaris
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Tijd
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPlacements.map((placement) => (
              <tr
                key={placement.id}
                className="border-b border-border-subtle hover:bg-[#2a2a2a] transition-colors"
              >
                <td className="py-3 px-4 text-sm text-text-secondary">{placement.datum}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center">
                      <span className="text-foreground text-xs font-medium">
                        {placement.werkzoekende.avatar}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {placement.werkzoekende.naam}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-text-secondary">{placement.functie}</td>
                <td className="py-3 px-4 text-sm text-text-secondary">{placement.werkgever}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${sectorColors[placement.sector]}`}
                  >
                    {placement.sector}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${contractColors[placement.contractType]}`}
                  >
                    {placement.contractType}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-text-secondary">{placement.salarisRange}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                    <Clock className="w-3.5 h-3.5" />
                    {placement.tijdTotPlaatsing}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
