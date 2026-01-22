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
  default: 'bg-[#2a2a2a] text-[#888888] border border-[#333333]',
  success: 'bg-[#3D7B4C]/20 text-[#4a9d5c] border border-[#3D7B4C]',
  warning: 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]',
  danger: 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]',
  info: 'bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]',
  purple: 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]',
  orange: 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]',
  teal: 'bg-[#14b8a6]/20 text-[#14b8a6] border border-[#14b8a6]',
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
