'use client';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'green' | 'white' | 'gray';
}

export function Spinner({ size = 'md', className = '', color = 'green' }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-4',
    xl: 'h-16 w-16 border-4',
  };

  const colors = {
    green: 'border-border-subtle border-t-konsensi-green',
    white: 'border-border-subtle border-t-white',
    gray: 'border-border-medium border-t-text-secondary',
  };

  return (
    <div
      className={`
        ${sizes[size]}
        ${colors[color]}
        rounded-full
        animate-spin
        ${className}
      `}
    />
  );
}

interface LoadingOverlayProps {
  message?: string;
  transparent?: boolean;
}

// Full screen loading overlay
export function LoadingOverlay({ message = 'Laden...', transparent = false }: LoadingOverlayProps) {
  return (
    <div className={`fixed inset-0 ${transparent ? 'bg-background/60' : 'bg-background/80'} flex items-center justify-center z-50 backdrop-blur-sm`}>
      <div className="bg-card border border-border-subtle rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl">
        <Spinner size="lg" />
        <p className="text-foreground text-sm">{message}</p>
      </div>
    </div>
  );
}

interface ButtonSpinnerProps {
  className?: string;
}

// Small spinner for buttons
export function ButtonSpinner({ className = '' }: ButtonSpinnerProps) {
  return (
    <div
      className={`
        h-4 w-4 border-2
        border-white/30
        border-t-white
        rounded-full
        animate-spin
        ${className}
      `}
    />
  );
}

interface LoadingDotsProps {
  className?: string;
}

// Animated loading dots
export function LoadingDots({ className = '' }: LoadingDotsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="w-2 h-2 bg-konsensi-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-konsensi-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-konsensi-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

interface InlineLoadingProps {
  text?: string;
  className?: string;
}

// Inline loading indicator with text
export function InlineLoading({ text = 'Laden...', className = '' }: InlineLoadingProps) {
  return (
    <div className={`flex items-center gap-2 text-text-secondary ${className}`}>
      <Spinner size="sm" color="gray" />
      <span className="text-sm">{text}</span>
    </div>
  );
}

export default Spinner;
