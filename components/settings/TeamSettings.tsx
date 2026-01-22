'use client';

import { useState } from 'react';
import { Plus, MoreVertical, Mail, Shield, Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  naam: string;
  email: string;
  rol: 'Admin' | 'Beheerder' | 'Medewerker';
  avatar: string;
  status: 'Actief' | 'Uitgenodigd';
}

const initialMembers: TeamMember[] = [
  {
    id: '1',
    naam: 'Rivaldo Rose',
    email: 'rivaldo@konsensi.nl',
    rol: 'Admin',
    avatar: 'RR',
    status: 'Actief',
  },
  {
    id: '2',
    naam: 'Emma de Vries',
    email: 'emma@konsensi.nl',
    rol: 'Beheerder',
    avatar: 'EV',
    status: 'Actief',
  },
  {
    id: '3',
    naam: 'Jan Bakker',
    email: 'jan@konsensi.nl',
    rol: 'Medewerker',
    avatar: 'JB',
    status: 'Actief',
  },
  {
    id: '4',
    naam: 'Lisa Jansen',
    email: 'lisa@konsensi.nl',
    rol: 'Medewerker',
    avatar: 'LJ',
    status: 'Uitgenodigd',
  },
];

const rolColors = {
  Admin: 'bg-purple-900/30 text-purple-400',
  Beheerder: 'bg-blue-900/30 text-blue-400',
  Medewerker: 'bg-[#2a2a2a] text-[#888888]',
};

export function TeamSettings() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRol, setInviteRol] = useState<'Beheerder' | 'Medewerker'>('Medewerker');

  const handleInvite = () => {
    if (!inviteEmail) return;
    const newMember: TeamMember = {
      id: Date.now().toString(),
      naam: inviteEmail.split('@')[0],
      email: inviteEmail,
      rol: inviteRol,
      avatar: inviteEmail.substring(0, 2).toUpperCase(),
      status: 'Uitgenodigd',
    };
    setMembers((prev) => [...prev, newMember]);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-[20px] p-8 border border-[#2a2a2a]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Team Beheer</h2>
          <p className="text-sm text-[#888888] mt-1">
            Beheer teamleden en hun toegangsrechten
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#3D7B4C] text-white rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Uitnodigen
        </button>
      </div>

      {/* Team Members List */}
      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-[#1e1e1e] rounded-xl border border-[#2a2a2a]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] flex items-center justify-center text-white text-sm font-medium">
                {member.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{member.naam}</p>
                  {member.status === 'Uitgenodigd' && (
                    <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-500 text-xs rounded-full">
                      Uitgenodigd
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#888888]">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${rolColors[member.rol]}`}>
                {member.rol}
              </span>
              <div className="relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                  className="p-2 hover:bg-[#222222] rounded-lg transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-[#888888]" />
                </button>
                {openMenuId === member.id && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-[#1e1e1e] rounded-xl shadow-lg border border-[#2a2a2a] py-2 z-10">
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#888888] hover:bg-[#222222]">
                      <Mail className="w-4 h-4" />
                      Email sturen
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#888888] hover:bg-[#222222]">
                      <Shield className="w-4 h-4" />
                      Rol wijzigen
                    </button>
                    {member.rol !== 'Admin' && (
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        Verwijderen
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-[20px] p-6 w-full max-w-md mx-4 border border-[#2a2a2a]">
            <h3 className="text-lg font-semibold text-white mb-4">Teamlid uitnodigen</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#888888] mb-2">
                  E-mailadres
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="naam@bedrijf.nl"
                  className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl text-sm text-white placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#888888] mb-2">
                  Rol
                </label>
                <select
                  value={inviteRol}
                  onChange={(e) => setInviteRol(e.target.value as 'Beheerder' | 'Medewerker')}
                  className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C]"
                >
                  <option value="Medewerker">Medewerker</option>
                  <option value="Beheerder">Beheerder</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-5 py-2.5 text-[#888888] font-medium text-sm hover:bg-[#222222] rounded-full transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail}
                className="px-5 py-2.5 bg-[#3D7B4C] text-white rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors disabled:opacity-50"
              >
                Uitnodigen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
