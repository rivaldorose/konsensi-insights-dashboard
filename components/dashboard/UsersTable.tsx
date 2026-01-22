'use client';

import { ArrowRight } from 'lucide-react';

interface User {
  id: string;
  naam: string;
  email: string;
  stad: string;
  status: string;
  schuld: number;
  datum: string;
}

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-[#3D7B4C] to-[#8FD14F]',
      'from-[#8FD14F] to-[#22c55e]',
      'from-[#3D7B4C] to-[#22c55e]',
      'from-[#6b9b59] to-[#8FD14F]',
      'from-[#2d5a38] to-[#3D7B4C]',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-card rounded-[20px] p-6 border border-border-subtle">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Recente Gebruikers</h3>
        <p className="text-sm text-text-secondary">Laatste 10 aanmeldingen</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider bg-bg-secondary">
                Naam
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider bg-bg-secondary">
                Email
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider bg-bg-secondary">
                Stad
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider bg-bg-secondary">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider bg-bg-secondary">
                Schuld
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-text-secondary uppercase tracking-wider bg-bg-secondary">
                Datum
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`hover:bg-card-hover transition-colors ${
                  index !== users.length - 1 ? 'border-b border-[#1e1e1e]' : ''
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(
                        user.naam
                      )} flex items-center justify-center`}
                    >
                      <span className="text-foreground text-xs font-medium">
                        {getInitials(user.naam)}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{user.naam}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-text-secondary text-sm">{user.email}</td>
                <td className="py-4 px-4 text-text-secondary text-sm">{user.stad}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Actief'
                        ? 'bg-[#3D7B4C]/20 text-[#4a9d5c] border border-[#3D7B4C]'
                        : 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-medium text-foreground text-sm">
                  {formatCurrency(user.schuld)}
                </td>
                <td className="py-4 px-4 text-text-tertiary text-sm">{formatDate(user.datum)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-border-subtle">
        <button className="flex items-center gap-2 text-[#3D7B4C] hover:text-[#4a9d5c] font-medium text-sm transition-colors">
          Bekijk alle gebruikers
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
