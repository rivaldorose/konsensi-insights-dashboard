'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseDataFetchOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
  refetchInterval?: number;
  retryCount?: number;
  retryDelay?: number;
}

interface UseDataFetchReturn<T> {
  data: T | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

export function useDataFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseDataFetchOptions<T> = {}
): UseDataFetchReturn<T> {
  const {
    initialData,
    onSuccess,
    onError,
    enabled = true,
    refetchInterval,
    retryCount = 0,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const retriesRef = useRef(0);
  const mountedRef = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async (isRefetch = false) => {
    if (!enabled) return;

    try {
      if (isRefetch) {
        setIsRefetching(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const result = await fetchFn();

      if (mountedRef.current) {
        setData(result);
        onSuccess?.(result);
        retriesRef.current = 0;
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Er is een onbekende fout opgetreden');

      if (mountedRef.current) {
        // Retry logic
        if (retriesRef.current < retryCount) {
          retriesRef.current += 1;
          setTimeout(() => {
            if (mountedRef.current) {
              fetchData(isRefetch);
            }
          }, retryDelay * retriesRef.current);
        } else {
          setError(error);
          onError?.(error);
        }
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
        setIsRefetching(false);
      }
    }
  }, [fetchFn, enabled, onSuccess, onError, retryCount, retryDelay]);

  const refetch = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
    setIsRefetching(false);
    retriesRef.current = 0;
  }, [initialData]);

  // Initial fetch
  useEffect(() => {
    mountedRef.current = true;
    fetchData();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchData]);

  // Refetch interval
  useEffect(() => {
    if (refetchInterval && enabled) {
      intervalRef.current = setInterval(() => {
        refetch();
      }, refetchInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refetchInterval, enabled, refetch]);

  return {
    data,
    isLoading,
    isRefetching,
    error,
    refetch,
    reset,
  };
}

// Simplified hook for async operations with loading state
export function useAsyncOperation<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (operation: () => Promise<T>): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Er is een onbekende fout opgetreden');
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return { isLoading, error, execute, reset };
}

// Hook for mutations (create, update, delete)
interface UseMutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: Error, variables: V) => void;
  onSettled?: (data: T | undefined, error: Error | null, variables: V) => void;
}

interface UseMutationReturn<T, V> {
  mutate: (variables: V) => Promise<T | null>;
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

export function useMutation<T, V = void>(
  mutationFn: (variables: V) => Promise<T>,
  options: UseMutationOptions<T, V> = {}
): UseMutationReturn<T, V> {
  const { onSuccess, onError, onSettled } = options;

  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (variables: V): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await mutationFn(variables);

      setData(result);
      onSuccess?.(result, variables);
      onSettled?.(result, null, variables);

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Er is een onbekende fout opgetreden');
      setError(error);
      onError?.(error, variables);
      onSettled?.(undefined, error, variables);

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [mutationFn, onSuccess, onError, onSettled]);

  const reset = useCallback(() => {
    setData(undefined);
    setError(null);
    setIsLoading(false);
  }, []);

  return { mutate, data, isLoading, error, reset };
}

export default useDataFetch;
