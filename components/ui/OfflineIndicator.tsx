'use client';

import { useState, useEffect } from 'react';
import { WifiOff, Wifi, X } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showReconnected, setShowReconnected] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
      setShowReconnected(true);
      // Hide reconnected message after 3 seconds
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setDismissed(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't show anything if dismissed
  if (dismissed) return null;

  // Show reconnected message
  if (showReconnected) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-konsensi-green/20 border border-konsensi-green rounded-lg p-4 flex items-center gap-3 z-50 animate-slide-up shadow-lg">
        <Wifi className="h-5 w-5 text-konsensi-green-light flex-shrink-0" />
        <div className="flex-1">
          <p className="text-foreground font-medium text-sm">Weer online</p>
          <p className="text-text-secondary text-xs">Verbinding hersteld</p>
        </div>
        <button
          onClick={() => setShowReconnected(false)}
          className="text-text-secondary hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Don't show anything if online
  if (isOnline) return null;

  // Show offline indicator
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-orange-500/20 border border-orange-500 rounded-lg p-4 flex items-center gap-3 z-50 animate-slide-up shadow-lg">
      <WifiOff className="h-5 w-5 text-orange-500 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-foreground font-medium text-sm">Geen internetverbinding</p>
        <p className="text-text-secondary text-xs">Sommige functies werken mogelijk niet</p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-text-secondary hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Connection status hook for programmatic access
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export default OfflineIndicator;
