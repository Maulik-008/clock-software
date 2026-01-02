import { useState, useEffect, useRef, useCallback } from 'react';

export type PomodoroMode = 'pomodoro' | 'shortBreak' | 'longBreak';

interface PomodoroState {
  mode: PomodoroMode;
  endTimestamp: number | null;
  pausedAt: number | null;
  remainingWhenPaused: number;
  isRunning: boolean;
  pomodoroCount: number;
}

interface UsePersistedPomodoroReturn {
  time: number;
  isRunning: boolean;
  mode: PomodoroMode;
  pomodoroCount: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setMode: (mode: PomodoroMode) => void;
  clear: () => void;
}

const DEFAULT_DURATIONS: Record<PomodoroMode, number> = {
  pomodoro: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
};

/**
 * Custom hook for persistent Pomodoro timer with localStorage support
 * Supports multiple modes (pomodoro, short break, long break)
 *
 * @param storageKey - Unique key for localStorage persistence
 * @param onModeComplete - Callback when a mode timer completes
 * @returns Pomodoro state and control functions
 */
export const usePersistedPomodoro = (
  storageKey: string,
  onModeComplete?: (mode: PomodoroMode) => void,
  customDurations?: Record<PomodoroMode, number>
): UsePersistedPomodoroReturn => {
  const durations = customDurations || DEFAULT_DURATIONS;
  const [time, setTime] = useState(durations.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setModeState] = useState<PomodoroMode>('pomodoro');
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef<PomodoroState>({
    mode: 'pomodoro',
    endTimestamp: null,
    pausedAt: null,
    remainingWhenPaused: durations.pomodoro,
    isRunning: false,
    pomodoroCount: 0,
  });
  const onModeCompleteRef = useRef(onModeComplete);

  // Keep callback ref updated
  useEffect(() => {
    onModeCompleteRef.current = onModeComplete;
  }, [onModeComplete]);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(storageKey);
      if (savedState) {
        const parsed: PomodoroState = JSON.parse(savedState);
        stateRef.current = parsed;

        setModeState(parsed.mode);
        setPomodoroCount(parsed.pomodoroCount);

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
          // Fresh state for this mode
          setTime(durations[parsed.mode]);
        }
      }
    } catch (error) {
      console.error('Failed to restore Pomodoro state:', error);
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  // Helper to save state synchronously
  const saveStateSync = (state: PomodoroState) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      stateRef.current = state;
    } catch (error) {
      console.error('Failed to save Pomodoro state:', error);
    }
  };

  // Save state to localStorage
  const saveState = useCallback(
    (state: PomodoroState) => {
      saveStateSync(state);
    },
    [storageKey]
  );

  // Update timer every second using timestamp-based calculation
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
            // Timer completed
            setIsRunning(false);

            // Increment pomodoro count if it was a pomodoro session
            const newPomodoroCount =
              state.mode === 'pomodoro'
                ? state.pomodoroCount + 1
                : state.pomodoroCount;

            const newState: PomodoroState = {
              ...state,
              isRunning: false,
              remainingWhenPaused: 0,
              pomodoroCount: newPomodoroCount,
            };
            saveStateSync(newState);
            setPomodoroCount(newPomodoroCount);

            // Call completion callback
            if (onModeCompleteRef.current) {
              onModeCompleteRef.current(state.mode);
            }
          }
        }
      }, 100); // Update every 100ms for smoother display
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
      stateRef.current.remainingWhenPaused || durations[stateRef.current.mode];
    const now = Date.now();
    const endTimestamp = now + remaining * 1000;

    const newState: PomodoroState = {
      ...stateRef.current,
      endTimestamp,
      pausedAt: null,
      remainingWhenPaused: remaining,
      isRunning: true,
    };
    saveState(newState);
    setIsRunning(true);
  }, [saveState, durations]);

  const pause = useCallback(() => {
    const state = stateRef.current;
    if (state.endTimestamp) {
      const remaining = Math.max(
        0,
        Math.ceil((state.endTimestamp - Date.now()) / 1000)
      );
      const newState: PomodoroState = {
        ...state,
        endTimestamp: null,
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
    const duration = durations[stateRef.current.mode];
    const newState: PomodoroState = {
      ...stateRef.current,
      endTimestamp: null,
      pausedAt: null,
      remainingWhenPaused: duration,
      isRunning: false,
    };
    saveState(newState);
    setTime(duration);
    setIsRunning(false);
  }, [saveState, durations]);

  const setMode = useCallback(
    (newMode: PomodoroMode) => {
      const duration = durations[newMode];
      const newState: PomodoroState = {
        ...stateRef.current,
        mode: newMode,
        endTimestamp: null,
        pausedAt: null,
        remainingWhenPaused: duration,
        isRunning: false,
      };
      saveState(newState);
      setModeState(newMode);
      setTime(duration);
      setIsRunning(false);
    },
    [saveState, durations]
  );

  const clear = useCallback(() => {
    localStorage.removeItem(storageKey);
    stateRef.current = {
      mode: 'pomodoro',
      endTimestamp: null,
      pausedAt: null,
      remainingWhenPaused: durations.pomodoro,
      isRunning: false,
      pomodoroCount: 0,
    };
  }, [storageKey, durations.pomodoro]);

  return {
    time,
    isRunning,
    mode,
    pomodoroCount,
    start,
    pause,
    reset,
    setMode,
    clear,
  };
};
