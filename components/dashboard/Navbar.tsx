'use client';

import { useState, useRef, useEffect } from 'react';
import {
  TreePine,
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  User,
  LayoutDashboard,
  Users,
  Briefcase,
  Radar,
  CreditCard,
  Building2,
  FileText,
  Moon,
  Sun,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/theme-provider';
import { GlobalSearch } from '@/components/ui/GlobalSearch';
import { MobileMenu } from '@/components/ui/MobileMenu';

interface AppItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
}

const apps: AppItem[] = [
  {
    id: 'jongeren',
    label: 'Jongeren',
    href: '/dashboard',
    icon: <Users className="w-4 h-4" />,
    description: 'Schuldhulp voor jongeren',
  },
  {
    id: 'bewindvoerders',
    label: 'Bewindvoerders',
    href: '/bewindvoerders',
    icon: <Briefcase className="w-4 h-4" />,
    description: 'Bewindvoerder beheer',
  },
  {
    id: 'hulpradar',
    label: 'Hulpradar',
    href: '/hulpradar',
    icon: <Radar className="w-4 h-4" />,
    description: 'Hulpverlening radar',
  },
  {
    id: 'schuldenradar',
    label: 'Schuldenradar',
    href: '/schuldenradar',
    icon: <CreditCard className="w-4 h-4" />,
    description: 'Schulden monitoring',
  },
  {
    id: 'work',
    label: 'Work',
    href: '/work',
    icon: <Building2 className="w-4 h-4" />,
    description: 'Werkgelegenheid',
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const appsMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (appsMenuRef.current && !appsMenuRef.current.contains(event.target as Node)) {
        setIsAppsMenuOpen(false);
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

  // Get current active app for dropdown label
  const getActiveApp = () => {
    const activeApp = apps.find((app) => isActive(app.href));
    return activeApp || apps[0];
  };

  const isAnyAppActive = apps.some((app) => isActive(app.href));

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="mx-4 md:mx-6 mt-4 md:mt-6">
      <div className="bg-white dark:bg-gray-900 rounded-[50px] shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>

        {/* Logo */}
        <Link href="/overview" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#3D7B4C] rounded-full flex items-center justify-center">
            <TreePine className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[#111827] dark:text-white text-lg tracking-tight hidden sm:block">
            KONSENSI
          </span>
        </Link>

        {/* Center Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
          {/* Dashboard Overview */}
          <Link
            href="/overview"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              pathname === '/overview'
                ? 'bg-[#3D7B4C] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>

          {/* Apps Dropdown */}
          <div className="relative" ref={appsMenuRef}>
            <button
              onClick={() => setIsAppsMenuOpen(!isAppsMenuOpen)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isAnyAppActive && pathname !== '/overview'
                  ? 'bg-[#3D7B4C] text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {getActiveApp().icon}
              <span className="hidden md:inline">{getActiveApp().label}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isAppsMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Apps Dropdown Menu */}
            {isAppsMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-2 z-50">
                <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Apps
                  </p>
                </div>
                {apps.map((app) => (
                  <Link
                    key={app.id}
                    href={app.href}
                    onClick={() => setIsAppsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      isActive(app.href)
                        ? 'bg-[#3D7B4C]/10 text-[#3D7B4C]'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive(app.href) ? 'bg-[#3D7B4C]/20' : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      {app.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{app.label}</p>
                      {app.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">{app.description}</p>
                      )}
                    </div>
                    {isActive(app.href) && (
                      <div className="ml-auto w-2 h-2 bg-[#3D7B4C] rounded-full" />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Audit Log */}
          <Link
            href="/audit-log"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              isActive('/audit-log')
                ? 'bg-[#3D7B4C] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="hidden xl:inline">Audit Log</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Global Search */}
          <div className="hidden md:block">
            <GlobalSearch />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notification Bell */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Avatar with Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full pl-1 pr-3 py-1 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#3D7B4C] to-[#8FD14F] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">RR</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="font-medium text-gray-900 dark:text-white">Rivaldo Rose</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">rivaldo@konsensi.nl</p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    Mijn Profiel
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    Instellingen
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
