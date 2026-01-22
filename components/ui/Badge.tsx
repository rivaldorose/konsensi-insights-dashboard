'use client';

import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple'
  | 'orange'
  | 'teal';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  danger: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
  purple: 'bg-purple-500 text-white',
  orange: 'bg-orange-500 text-white',
  teal: 'bg-teal-500 text-white',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// Action badge specifically for audit actions
export function ActionBadge({ action }: { action: 'CREATE' | 'UPDATE' | 'DELETE' }) {
  const variants: Record<string, BadgeVariant> = {
    CREATE: 'success',
    UPDATE: 'info',
    DELETE: 'danger',
  };

  const labels: Record<string, string> = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
  };

  return <Badge variant={variants[action]}>{labels[action]}</Badge>;
}

// Entity badge specifically for audit entities
export function EntityBadge({ entity }: { entity: string }) {
  const variants: Record<string, BadgeVariant> = {
    Gebruiker: 'purple',
    Schuld: 'orange',
    Transactie: 'teal',
    Betaling: 'success',
    Doel: 'info',
  };

  return <Badge variant={variants[entity] || 'default'}>{entity}</Badge>;
}
