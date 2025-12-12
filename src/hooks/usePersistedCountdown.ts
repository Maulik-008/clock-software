import { useState, useEffect, useRef, useCallback } from 'react';

interface CountdownState {
  endTimestamp: number | null;
  initialDuration: number;
  pausedAt: number | null;
  remainingWhenPaused: number;
  isRunning: boolean;
}

interface UsePersistedCountdownReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setInitialTime: (seconds: number) => void;
  clear: () => void;
}

/**
 * Custom hook for persistent countdown timer with localStorage support
 * Uses timestamp-based calculation for accuracy
 *
 * @param storageKey - Unique key for localStorage persistence
 * @param initialDuration - Initial countdown duration in seconds
 * @param onComplete - Callback when countdown reaches zero
 * @returns Countdown state and control functions
 */
export const usePersistedCountdown = (
  storageKey: string,
  initialDuration: number = 10,
  onComplete?: () => void
): UsePersistedCountdownReturn => {
  const [time, setTime] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef<CountdownState>({
    endTimestamp: null,
    initialDuration,
    pausedAt: null,
    remainingWhenPaused: initialDuration,
    isRunning: false,
  });
  const onCompleteRef = useRef(onComplete);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(storageKey);
      if (savedState) {
        const parsed: CountdownState = JSON.parse(savedState);
        stateRef.current = parsed;

        if (parsed.isRunning && parsed.endTimestamp) {
          // Timer was running - calculate remaining time
          const remaining = Math.max(
            0,
            Math.ceil((parsed.endTimestamp - Date.now()) / 1000)
          );

          if (remaining > 0) {
            setTime(remaining);
            setIsRunning(true);
          } else {
            // Timer already completed
            setTime(0);
            setIsRunning(false);
            stateRef.current.isRunning = false;
            saveStateSync({
              ...stateRef.current,
              isRunning: false,
            });
          }
        } else if (parsed.pausedAt !== null) {
          // Timer was paused
          setTime(parsed.remainingWhenPaused);
          setIsRunning(false);
        } else {
          // Fresh state
          setTime(parsed.initialDuration);
        }
      }
    } catch (error) {
      console.error('Failed to restore countdown state:', error);
      localStorage.removeItem(storageKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]); // saveStateSync is intentionally not in deps - it uses stateRef which is stable

  // Save state to localStorage - memoized properly with storageKey
  const saveState = useCallback(
    (state: CountdownState) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
        stateRef.current = state;
      } catch (error) {
        console.error('Failed to save countdown state:', error);
      }
    },
    [storageKey]
  );

  // Update countdown every second using timestamp-based calculation
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const state = stateRef.current;
        if (state.endTimestamp) {
          const remaining = Math.max(
            0,
            Math.ceil((state.endTimestamp - Date.now()) / 1000)
          );

          setTime(remaining);

          if (remaining === 0) {
            // Countdown completed
            setIsRunning(false);
            const newState: CountdownState = {
              ...state,
              isRunning: false,
              remainingWhenPaused: 0,
            };
            saveStateSync(newState);

            // Call completion callback
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
          }
        }
      }, 100); // Update every 100ms for smoother countdown display
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]); // saveState uses stateRef which is stable

  const start = useCallback(() => {
    const remaining =
      stateRef.current.remainingWhenPaused || stateRef.current.initialDuration;
    const now = Date.now();
    const endTimestamp = now + remaining * 1000;

    const newState: CountdownState = {
      endTimestamp,
      initialDuration: stateRef.current.initialDuration,
      pausedAt: null,
      remainingWhenPaused: remaining,
      isRunning: true,
    };
    saveState(newState);
    setIsRunning(true);
  }, [saveState]);

  const pause = useCallback(() => {
    const state = stateRef.current;
    if (state.endTimestamp) {
      const remaining = Math.max(
        0,
        Math.ceil((state.endTimestamp - Date.now()) / 1000)
      );
      const newState: CountdownState = {
        endTimestamp: null,
        initialDuration: state.initialDuration,
        pausedAt: Date.now(),
        remainingWhenPaused: remaining,
        isRunning: false,
      };
      saveState(newState);
      setTime(remaining);
      setIsRunning(false);
    }
  }, [saveState]);

  const reset = useCallback(() => {
    const newState: CountdownState = {
      endTimestamp: null,
      initialDuration: stateRef.current.initialDuration,
      pausedAt: null,
      remainingWhenPaused: stateRef.current.initialDuration,
      isRunning: false,
    };
    saveState(newState);
    setTime(stateRef.current.initialDuration);
    setIsRunning(false);
  }, [saveState]);

  const setInitialTime = useCallback(
    (seconds: number) => {
      const newState: CountdownState = {
        endTimestamp: null,
        initialDuration: seconds,
        pausedAt: null,
        remainingWhenPaused: seconds,
        isRunning: false,
      };
      saveState(newState);
      setTime(seconds);
      setIsRunning(false);
    },
    [saveState]
  );

  const clear = useCallback(() => {
    localStorage.removeItem(storageKey);
    stateRef.current = {
      endTimestamp: null,
      initialDuration,
      pausedAt: null,
      remainingWhenPaused: initialDuration,
      isRunning: false,
    };
  }, [storageKey, initialDuration]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    setInitialTime,
    clear,
  };
};
