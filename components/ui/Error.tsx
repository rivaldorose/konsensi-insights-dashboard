'use client';

import { AlertCircle, RefreshCw, AlertTriangle, XCircle } from 'lucide-react';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  variant?: 'inline' | 'card' | 'fullpage' | 'banner';
  type?: 'error' | 'warning' | 'info';
}

export function Error({
  title = 'Er ging iets mis',
  message = 'We konden de data niet laden. Probeer het opnieuw.',
  onRetry,
  variant = 'card',
  type = 'error',
}: ErrorProps) {
  const typeStyles = {
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-500',
      Icon: XCircle,
    },
    warning: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-500',
      Icon: AlertTriangle,
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-500',
      Icon: AlertCircle,
    },
  };

  const style = typeStyles[type];
  const Icon = style.Icon;

  // Inline variant
  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${style.iconColor} text-sm`}>
        <Icon className="h-4 w-4" />
        <span>{message}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="underline hover:opacity-80 transition-opacity"
          >
            Opnieuw
          </button>
        )}
      </div>
    );
  }

  // Banner variant
  if (variant === 'banner') {
    return (
      <div className={`${style.bg} ${style.border} border rounded-lg p-4 flex items-center gap-3`}>
        <Icon className={`h-5 w-5 ${style.iconColor} flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-medium text-sm">{title}</p>
          {message && <p className="text-text-secondary text-sm truncate">{message}</p>}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-konsensi-green hover:text-konsensi-green-light text-sm flex items-center gap-1 flex-shrink-0"
          >
            <RefreshCw className="h-3 w-3" />
            Opnieuw
          </button>
        )}
      </div>
    );
  }

  // Fullpage variant
  if (variant === 'fullpage') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className={`w-16 h-16 ${style.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <Icon className={`h-8 w-8 ${style.iconColor}`} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-text-secondary mb-6">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-konsensi-green text-white px-6 py-3 rounded-lg hover:bg-konsensi-green-light transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="h-4 w-4" />
              Opnieuw proberen
            </button>
          )}
        </div>
      </div>
    );
  }

  // Card variant (default)
  return (
    <div className={`bg-card ${style.border} border rounded-2xl p-6`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 ${style.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className={`h-5 w-5 ${style.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-foreground font-semibold mb-1">{title}</h3>
          <p className="text-text-secondary text-sm mb-4">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-konsensi-green hover:text-konsensi-green-light text-sm flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Opnieuw proberen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Specific error components for common scenarios
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <Error
      title="Geen verbinding"
      message="Controleer je internetverbinding en probeer het opnieuw."
      onRetry={onRetry}
      variant="card"
      type="warning"
    />
  );
}

export function ServerError({ onRetry }: { onRetry?: () => void }) {
  return (
    <Error
      title="Server fout"
      message="Er is een probleem met de server. Probeer het later opnieuw."
      onRetry={onRetry}
      variant="card"
      type="error"
    />
  );
}

export function NotFoundError({ message = 'De pagina die je zoekt bestaat niet.' }: { message?: string }) {
  return (
    <Error
      title="Niet gevonden"
      message={message}
      variant="fullpage"
      type="info"
    />
  );
}

export function AccessDeniedError() {
  return (
    <Error
      title="Geen toegang"
      message="Je hebt geen toestemming om deze pagina te bekijken."
      variant="fullpage"
      type="error"
    />
  );
}

export default Error;
