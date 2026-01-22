'use client';

import { useState } from 'react';
import { BarChart3, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login with Supabase
    console.log('Login attempt:', { email, password });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#0a0a0a]">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-[#3D7B4C]">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Konsensi Insights
          </h1>
          <p className="mt-2 text-[#888888]">
            Centraal dashboard voor schuldhulpverlening
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#888888] mb-1"
              >
                E-mailadres
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#888888]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-[#2a2a2a] rounded-lg bg-[#1e1e1e] text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] transition-colors"
                  placeholder="uw@email.nl"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#888888] mb-1"
              >
                Wachtwoord
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#888888]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-[#2a2a2a] rounded-lg bg-[#1e1e1e] text-white placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#3D7B4C]/20 focus:border-[#3D7B4C] transition-colors"
                  placeholder="Voer uw wachtwoord in"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#888888] hover:text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#888888] hover:text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#3D7B4C] focus:ring-[#3D7B4C] border-[#2a2a2a] rounded bg-[#1e1e1e]"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-[#888888]"
              >
                Onthoud mij
              </label>
            </div>

            <a
              href="#"
              className="text-sm font-medium text-[#3D7B4C] hover:text-[#4a9d5c]"
            >
              Wachtwoord vergeten?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#3D7B4C] hover:bg-[#4a9d5c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D7B4C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
          </button>
        </form>

        {/* App Sources Info */}
        <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
          <p className="text-center text-sm text-[#888888]">
            Gekoppelde applicaties
          </p>
          <div className="mt-3 flex justify-center gap-4 text-xs text-[#666666]">
            <span>Jongeren App</span>
            <span>|</span>
            <span>Bewind</span>
            <span>|</span>
            <span>Schuldhulpradar</span>
            <span>|</span>
            <span>Schuldenradar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
