'use client';

import { useState, useRef, useEffect } from 'react';
import { TreePine, Bell, ChevronDown, Settings, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavTab {
  id: string;
  label: string;
  href: string;
}

const navTabs: NavTab[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'bewindvoerders', label: 'Bewindvoerders', href: '/bewindvoerders' },
  { id: 'audit', label: 'Audit Log', href: '/audit-log' },
  { id: 'export', label: 'Exporteer', href: '/exporteer' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="mx-6 mt-6">
      <div className="bg-white rounded-[50px] shadow-lg shadow-gray-200/50 px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#3D7B4C] rounded-full flex items-center justify-center">
            <TreePine className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[#111827] text-lg tracking-tight">KONSENSI</span>
        </Link>

        {/* Center Navigation */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
          {navTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive(tab.href)
                  ? 'bg-[#3D7B4C] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Avatar with Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full pl-1 pr-3 py-1 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">RR</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-medium text-gray-900">Rivaldo Rose</p>
                  <p className="text-sm text-gray-500">rivaldo@konsensi.nl</p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    Mijn Profiel
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    Instellingen
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 pt-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Uitloggen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
