'use client';

import { ReactNode } from 'react';
import {
  Users,
  FileText,
  Search,
  Inbox,
  Calendar,
  BarChart3,
  Bell,
  Filter
} from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  size?: 'sm' | 'md' | 'lg';
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
}: EmptyStateProps) {
  const sizes = {
    sm: {
      padding: 'p-6',
      iconContainer: 'w-12 h-12 mb-4',
      iconSize: 'h-6 w-6',
      title: 'text-base',
      description: 'text-sm',
    },
    md: {
      padding: 'p-12',
      iconContainer: 'w-16 h-16 mb-6',
      iconSize: 'h-8 w-8',
      title: 'text-xl',
      description: 'text-sm',
    },
    lg: {
      padding: 'p-16',
      iconContainer: 'w-20 h-20 mb-8',
      iconSize: 'h-10 w-10',
      title: 'text-2xl',
      description: 'text-base',
    },
  };

  const sizeConfig = sizes[size];

  return (
    <div className={`bg-card border border-border-subtle rounded-2xl ${sizeConfig.padding} text-center`}>
      {icon && (
        <div className={`${sizeConfig.iconContainer} bg-border-subtle rounded-full flex items-center justify-center mx-auto`}>
          <div className={`${sizeConfig.iconSize} text-text-secondary`}>
            {icon}
          </div>
        </div>
      )}
      <h3 className={`${sizeConfig.title} font-semibold text-foreground mb-2`}>{title}</h3>
      {description && (
        <p className={`text-text-secondary ${sizeConfig.description} mb-6 max-w-md mx-auto`}>
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex items-center justify-center gap-3">
          {action && (
            <button
              onClick={action.onClick}
              className="bg-konsensi-green text-white px-6 py-3 rounded-lg hover:bg-konsensi-green-light transition-colors"
            >
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="text-text-secondary hover:text-foreground px-4 py-3 transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-configured empty states for common scenarios
export function NoUsersFound({ onReset }: { onReset?: () => void }) {
  return (
    <EmptyState
      icon={<Users className="h-full w-full" />}
      title="Geen gebruikers gevonden"
      description="Er zijn geen gebruikers die aan je filters voldoen. Pas je zoekcriteria aan."
      action={onReset ? { label: 'Filters resetten', onClick: onReset } : undefined}
    />
  );
}

export function NoDataFound({ message }: { message?: string }) {
  return (
    <EmptyState
      icon={<BarChart3 className="h-full w-full" />}
      title="Geen data beschikbaar"
      description={message || 'Er is nog geen data om te tonen.'}
    />
  );
}

export function NoSearchResults({ query, onClear }: { query?: string; onClear?: () => void }) {
  return (
    <EmptyState
      icon={<Search className="h-full w-full" />}
      title="Geen resultaten"
      description={query ? `Geen resultaten gevonden voor "${query}".` : 'Geen resultaten gevonden. Probeer een andere zoekterm.'}
      action={onClear ? { label: 'Zoekopdracht wissen', onClick: onClear } : undefined}
    />
  );
}

export function NoDocuments({ onUpload }: { onUpload?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-full w-full" />}
      title="Geen documenten"
      description="Er zijn nog geen documenten geüpload."
      action={onUpload ? { label: 'Document uploaden', onClick: onUpload } : undefined}
    />
  );
}

export function EmptyInbox() {
  return (
    <EmptyState
      icon={<Inbox className="h-full w-full" />}
      title="Je inbox is leeg"
      description="Nieuwe berichten verschijnen hier."
    />
  );
}

export function NoEvents({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<Calendar className="h-full w-full" />}
      title="Geen evenementen"
      description="Er staan geen evenementen gepland voor deze periode."
      action={onAdd ? { label: 'Evenement toevoegen', onClick: onAdd } : undefined}
    />
  );
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={<Bell className="h-full w-full" />}
      title="Geen meldingen"
      description="Je bent helemaal bij! Er zijn geen nieuwe meldingen."
      size="sm"
    />
  );
}

export function NoFilterResults({ onReset }: { onReset?: () => void }) {
  return (
    <EmptyState
      icon={<Filter className="h-full w-full" />}
      title="Geen resultaten met deze filters"
      description="Probeer andere filters te selecteren om meer resultaten te zien."
      action={onReset ? { label: 'Filters wissen', onClick: onReset } : undefined}
    />
  );
}

export default EmptyState;
