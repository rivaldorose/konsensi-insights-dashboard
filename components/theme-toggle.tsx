'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Schakel thema"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-konsensi-mint" />
      ) : (
        <Moon className="h-5 w-5 text-konsensi-green" />
      )}
    </button>
  );
}
