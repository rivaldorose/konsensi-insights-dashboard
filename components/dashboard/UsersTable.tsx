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
    <div className="bg-white rounded-[20px] p-6 shadow-sm shadow-gray-100 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#111827]">Recente Gebruikers</h3>
        <p className="text-sm text-gray-500">Laatste 10 aanmeldingen</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Naam
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stad
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schuld
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Datum
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`hover:bg-gray-50 transition-colors ${
                  index !== users.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(
                        user.naam
                      )} flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-medium">
                        {getInitials(user.naam)}
                      </span>
                    </div>
                    <span className="font-medium text-[#111827]">{user.naam}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600 text-sm">{user.email}</td>
                <td className="py-4 px-4 text-gray-600 text-sm">{user.stad}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Actief'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-medium text-[#111827] text-sm">
                  {formatCurrency(user.schuld)}
                </td>
                <td className="py-4 px-4 text-gray-500 text-sm">{formatDate(user.datum)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="flex items-center gap-2 text-[#3D7B4C] hover:text-[#2d5a38] font-medium text-sm transition-colors">
          Bekijk alle gebruikers
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
