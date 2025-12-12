import { useState, useEffect, useRef, useCallback } from 'react';

interface TimerState {
  startTimestamp: number | null;
  pausedAt: number | null;
  elapsedBeforePause: number;
  isRunning: boolean;
}

interface UsePersistedTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  clear: () => void;
}

/**
 * Custom hook for persistent count-up timer with localStorage support
 * Uses timestamp-based calculation for accuracy even when tab is backgrounded
 *
 * @param storageKey - Unique key for localStorage persistence
 * @returns Timer state and control functions
 */
export const usePersistedTimer = (
  storageKey: string
): UsePersistedTimerReturn => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef<TimerState>({
    startTimestamp: null,
    pausedAt: null,
    elapsedBeforePause: 0,
    isRunning: false,
  });

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(storageKey);
      if (savedState) {
        const parsed: TimerState = JSON.parse(savedState);
        stateRef.current = parsed;

        if (parsed.isRunning && parsed.startTimestamp) {
          // Timer was running when page was closed - continue from where it left off
          const elapsed =
            parsed.elapsedBeforePause +
            Math.floor((Date.now() - parsed.startTimestamp) / 1000);
          setTime(elapsed);
          setIsRunning(true);
        } else if (parsed.pausedAt) {
          // Timer was paused
          setTime(parsed.elapsedBeforePause);
          setIsRunning(false);
        }
      }
    } catch (error) {
      console.error('Failed to restore timer state:', error);
      // Clear corrupted data
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  // Save state to localStorage whenever it changes
  const saveState = useCallback(
    (state: TimerState) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
        stateRef.current = state;
      } catch (error) {
        console.error('Failed to save timer state:', error);
      }
    },
    [storageKey]
  );

  // Update timer every second using timestamp-based calculation
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const state = stateRef.current;
        if (state.startTimestamp) {
          const elapsed =
            state.elapsedBeforePause +
            Math.floor((Date.now() - state.startTimestamp) / 1000);
          setTime(elapsed);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const start = useCallback(() => {
    const now = Date.now();
    const newState: TimerState = {
      startTimestamp: now,
      pausedAt: null,
      elapsedBeforePause: stateRef.current.elapsedBeforePause,
      isRunning: true,
    };
    saveState(newState);
    setIsRunning(true);
  }, [saveState]);

  const pause = useCallback(() => {
    const state = stateRef.current;
    if (state.startTimestamp) {
      const elapsed =
        state.elapsedBeforePause +
        Math.floor((Date.now() - state.startTimestamp) / 1000);
      const newState: TimerState = {
        startTimestamp: null,
        pausedAt: Date.now(),
        elapsedBeforePause: elapsed,
        isRunning: false,
      };
      saveState(newState);
      setTime(elapsed);
      setIsRunning(false);
    }
  }, [saveState]);

  const reset = useCallback(() => {
    const newState: TimerState = {
      startTimestamp: null,
      pausedAt: null,
      elapsedBeforePause: 0,
      isRunning: false,
    };
    saveState(newState);
    setTime(0);
    setIsRunning(false);
  }, [saveState]);

  const clear = useCallback(() => {
    localStorage.removeItem(storageKey);
    stateRef.current = {
      startTimestamp: null,
      pausedAt: null,
      elapsedBeforePause: 0,
      isRunning: false,
    };
  }, [storageKey]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    clear,
  };
};
