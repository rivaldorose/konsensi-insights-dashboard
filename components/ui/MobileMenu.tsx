'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Users, Briefcase, Radar, CreditCard, Building2, FileText, Settings, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/overview', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Jongeren', href: '/dashboard', icon: <Users className="w-5 h-5" /> },
  { label: 'Bewindvoerders', href: '/bewindvoerders', icon: <Briefcase className="w-5 h-5" /> },
  { label: 'Hulpradar', href: '/hulpradar', icon: <Radar className="w-5 h-5" /> },
  { label: 'Schuldenradar', href: '/schuldenradar', icon: <CreditCard className="w-5 h-5" /> },
  { label: 'Work', href: '/work', icon: <Building2 className="w-5 h-5" /> },
  { label: 'Audit Log', href: '/audit-log', icon: <FileText className="w-5 h-5" /> },
  { label: 'Instellingen', href: '/settings', icon: <Settings className="w-5 h-5" /> },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 rounded-full hover:bg-card transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-text-secondary" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-bg-secondary border-r border-border-subtle z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-konsensi-green rounded-full flex items-center justify-center">
              <span className="text-foreground font-bold text-sm">K</span>
            </div>
            <span className="font-bold text-foreground text-lg">KONSENSI</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-card transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3D7B4C] to-[#4a9d5c] rounded-full flex items-center justify-center">
              <span className="text-foreground font-medium">RR</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Rivaldo Rose</p>
              <p className="text-sm text-text-secondary">rivaldo@konsensi.nl</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive(item.href)
                  ? 'bg-konsensi-green/20 text-konsensi-green'
                  : 'text-foreground hover:bg-card'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
              {isActive(item.href) && (
                <div className="ml-auto w-2 h-2 bg-konsensi-green rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-subtle">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Uitloggen</span>
          </button>
        </div>
      </div>
    </>
  );
}
