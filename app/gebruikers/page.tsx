'use client';

import { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import {
  Search,
  Plus,
  ChevronDown,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Shield,
  Check,
  X,
  Download
} from 'lucide-react';

type RoleType = 'Admin' | 'Bewindvoerder' | 'Budgetcoach' | 'Gebruiker' | 'Viewer';
type StatusType = 'Actief' | 'Inactief' | 'Geblokkeerd';

interface UserData {
  id: string;
  naam: string;
  email: string;
  avatar: string;
  rol: RoleType;
  status: StatusType;
  laatsteLogin: string;
  aangemaakt: string;
  apps: string[];
}

const usersData: UserData[] = [
  {
    id: '1',
    naam: 'Rivaldo Rose',
    email: 'rivaldo@konsensi.nl',
    avatar: 'RR',
    rol: 'Admin',
    status: 'Actief',
    laatsteLogin: 'Vandaag om 14:32',
    aangemaakt: '15 sep 2025',
    apps: ['Jongeren', 'Hulpradar', 'Schuldenradar', 'Work', 'Bewindvoerders'],
  },
  {
    id: '2',
    naam: 'Jan de Vries',
    email: 'jan.devries@konsensi.nl',
    avatar: 'JV',
    rol: 'Bewindvoerder',
    status: 'Actief',
    laatsteLogin: 'Vandaag om 10:15',
    aangemaakt: '20 okt 2025',
    apps: ['Jongeren', 'Bewindvoerders'],
  },
  {
    id: '3',
    naam: 'Maria Bakker',
    email: 'maria.bakker@konsensi.nl',
    avatar: 'MB',
    rol: 'Budgetcoach',
    status: 'Actief',
    laatsteLogin: 'Gisteren om 16:45',
    aangemaakt: '5 nov 2025',
    apps: ['Jongeren', 'Bewindvoerders'],
  },
  {
    id: '4',
    naam: 'Peter Jansen',
    email: 'peter.jansen@konsensi.nl',
    avatar: 'PJ',
    rol: 'Bewindvoerder',
    status: 'Actief',
    laatsteLogin: '3 dagen geleden',
    aangemaakt: '12 nov 2025',
    apps: ['Jongeren', 'Bewindvoerders', 'Hulpradar'],
  },
  {
    id: '5',
    naam: 'Lisa van Dijk',
    email: 'lisa.vandijk@konsensi.nl',
    avatar: 'LD',
    rol: 'Gebruiker',
    status: 'Inactief',
    laatsteLogin: '2 weken geleden',
    aangemaakt: '1 dec 2025',
    apps: ['Jongeren'],
  },
  {
    id: '6',
    naam: 'Ahmed Hassan',
    email: 'ahmed.hassan@konsensi.nl',
    avatar: 'AH',
    rol: 'Viewer',
    status: 'Actief',
    laatsteLogin: 'Vandaag om 09:00',
    aangemaakt: '10 jan 2026',
    apps: ['Hulpradar', 'Schuldenradar'],
  },
  {
    id: '7',
    naam: 'Sophie Mulder',
    email: 'sophie.mulder@konsensi.nl',
    avatar: 'SM',
    rol: 'Budgetcoach',
    status: 'Geblokkeerd',
    laatsteLogin: '1 maand geleden',
    aangemaakt: '20 sep 2025',
    apps: ['Jongeren'],
  },
];

const roleColors: Record<RoleType, string> = {
  Admin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Bewindvoerder: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Budgetcoach: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  Gebruiker: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Viewer: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

const statusColors: Record<StatusType, string> = {
  Actief: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Inactief: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Geblokkeerd: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function GebruikersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.naam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.rol === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950">
      <Navbar />

      <main className="px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#111827] dark:text-white">Gebruikers</h1>
              <span className="px-3 py-1 bg-[#3D7B4C]/10 text-[#3D7B4C] text-xs font-medium rounded-full">
                {usersData.length} totaal
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Beheer gebruikers, rollen en toegangsrechten
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#3D7B4C] text-white rounded-xl hover:bg-[#346a42] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nieuwe gebruiker
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-[20px] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Actieve gebruikers</p>
            <p className="text-2xl font-bold text-[#111827] dark:text-white">
              {usersData.filter((u) => u.status === 'Actief').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[20px] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Admins</p>
            <p className="text-2xl font-bold text-[#111827] dark:text-white">
              {usersData.filter((u) => u.rol === 'Admin').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[20px] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Bewindvoerders</p>
            <p className="text-2xl font-bold text-[#111827] dark:text-white">
              {usersData.filter((u) => u.rol === 'Bewindvoerder').length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[20px] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Geblokkeerd</p>
            <p className="text-2xl font-bold text-red-600">
              {usersData.filter((u) => u.status === 'Geblokkeerd').length}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Zoek op naam of email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
                />
              </div>

              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <option value="all">Alle rollen</option>
                  <option value="Admin">Admin</option>
                  <option value="Bewindvoerder">Bewindvoerder</option>
                  <option value="Budgetcoach">Budgetcoach</option>
                  <option value="Gebruiker">Gebruiker</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  <option value="all">Alle statussen</option>
                  <option value="Actief">Actief</option>
                  <option value="Inactief">Inactief</option>
                  <option value="Geblokkeerd">Geblokkeerd</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{selectedUsers.length} geselecteerd</span>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Verwijderen
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-[#3D7B4C] focus:ring-[#3D7B4C]"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Gebruiker
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Apps
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Laatste Login
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#3D7B4C] focus:ring-[#3D7B4C]"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{user.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.naam}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[user.rol]}`}>
                        {user.rol}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                        {user.status === 'Actief' && <Check className="w-3 h-3" />}
                        {user.status === 'Geblokkeerd' && <X className="w-3 h-3" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {user.apps.slice(0, 2).map((app) => (
                          <span
                            key={app}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs"
                          >
                            {app}
                          </span>
                        ))}
                        {user.apps.length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                            +{user.apps.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                      {user.laatsteLogin}
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-500" />
                        </button>
                        {activeDropdown === user.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-1 z-10">
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <Eye className="w-4 h-4" />
                              Bekijken
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <Edit className="w-4 h-4" />
                              Bewerken
                            </button>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <Shield className="w-4 h-4" />
                              Rechten
                            </button>
                            <hr className="my-1 border-gray-100 dark:border-gray-800" />
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                              <Trash2 className="w-4 h-4" />
                              Verwijderen
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredUsers.length} van {usersData.length} gebruikers
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50" disabled>
                Vorige
              </button>
              <button className="px-3 py-1.5 text-sm bg-[#3D7B4C] text-white rounded-lg">
                1
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50" disabled>
                Volgende
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* New User Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsModalOpen(false)} />
          <div className="fixed inset-x-4 top-24 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nieuwe gebruiker</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Naam</label>
                <input
                  type="text"
                  placeholder="Volledige naam"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="email@konsensi.nl"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rol</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800">
                  <option>Selecteer rol</option>
                  <option>Admin</option>
                  <option>Bewindvoerder</option>
                  <option>Budgetcoach</option>
                  <option>Gebruiker</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apps</label>
                <div className="flex flex-wrap gap-2">
                  {['Jongeren', 'Bewindvoerders', 'Hulpradar', 'Schuldenradar', 'Work'].map((app) => (
                    <label key={app} className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3D7B4C] focus:ring-[#3D7B4C]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{app}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#3D7B4C] text-white rounded-xl hover:bg-[#346a42] transition-colors"
                >
                  Toevoegen
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
