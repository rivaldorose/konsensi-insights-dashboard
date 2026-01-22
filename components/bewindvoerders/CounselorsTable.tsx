'use client';

import { Eye, Pencil } from 'lucide-react';

type RolType = 'Bewindvoerder' | 'Budgetcoach';

interface Counselor {
  id: string;
  naam: string;
  avatar: string;
  rol: RolType;
  clienten: number;
  totaleSchuld: number;
  totaalInkomen: number;
}

interface CounselorsTableProps {
  counselors: Counselor[];
}

const rolColors: Record<RolType, string> = {
  Bewindvoerder: 'bg-blue-900/50 text-blue-400',
  Budgetcoach: 'bg-purple-900/50 text-purple-400',
};

export function CounselorsTable({ counselors }: CounselorsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Bewindvoerders Overzicht</h3>
        <span className="text-sm text-text-secondary">{counselors.length} bewindvoerders</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Naam
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Rol
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Cliënten
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Totale Schuld
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Totaal Inkomen
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Acties
              </th>
            </tr>
          </thead>
          <tbody>
            {counselors.map((counselor) => (
              <tr
                key={counselor.id}
                className="border-b border-border-subtle hover:bg-border-subtle/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center">
                      <span className="text-foreground text-sm font-medium">
                        {counselor.avatar}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{counselor.naam}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${rolColors[counselor.rol]}`}
                  >
                    {counselor.rol}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-foreground">{counselor.clienten}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-red-400 font-medium">
                    {formatCurrency(counselor.totaleSchuld)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-green-400 font-medium">
                    {formatCurrency(counselor.totaalInkomen)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-border-subtle rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-text-secondary" />
                    </button>
                    <button className="p-2 hover:bg-border-subtle rounded-lg transition-colors">
                      <Pencil className="w-4 h-4 text-text-secondary" />
                    </button>
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
