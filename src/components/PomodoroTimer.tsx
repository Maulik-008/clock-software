import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Timer,
  Zap,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";

type PomodoroMode = "pomodoro" | "shortBreak" | "longBreak";

interface PomodoroTimerProps {
  initialMode?: PomodoroMode;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  initialMode = "pomodoro",
}) => {
  const [mode, setMode] = useState<PomodoroMode>(initialMode);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer durations in seconds
  const durations = {
    pomodoro: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
  };

  // Set initial time based on mode
  useEffect(() => {
    setTime(durations[mode]);
    setIsRunning(false);
    setStartTime(null);
    setEndTime(null);
  }, [mode]);

  // Timer logic
  useEffect(() => {
    if (isRunning && time > 0) {
      // Set start time if not already set
      if (!startTime) {
        const now = new Date();
        setStartTime(now);

        // Calculate and set end time
        const end = new Date(now.getTime() + time * 1000);
        setEndTime(end);
      }

      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            // Play sound notification when timer ends
            try {
              const audio = new Audio("/notification.mp3");
              audio.play();
            } catch (error) {
              console.log("Audio notification not supported");
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time, startTime]);

  const handleStart = () => setIsRunning(true);

  const handlePause = () => {
    setIsRunning(false);
    // Recalculate end time when paused
    if (startTime && time > 0) {
      const now = new Date();
      const newEnd = new Date(now.getTime() + time * 1000);
      setEndTime(newEnd);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(durations[mode]);
    setStartTime(null);
    setEndTime(null);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const formatClockTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get colors based on current mode
  const getColors = () => {
    switch (mode) {
      case "pomodoro":
        return {
          primary: "#b50028", // Tailwind red-500
          secondary: "#940020", // Darker shade for gradient
          background: "rgba(181, 0, 40, 0.2)",
          border: "rgba(181, 0, 40, 0.3)",
          shadow: "rgba(181, 0, 40, 0.5)",
          tabActive: "#b50028",
          tabText: "#fff",
          clockText: "rgba(255, 255, 255, 0.7)",
          timeText: "#b50028",
        };
      case "shortBreak":
        return {
          primary: "#4ade80", // Green
          secondary: "#22c55e",
          background: "rgba(16, 185, 129, 0.2)",
          border: "rgba(74, 222, 128, 0.3)",
          shadow: "rgba(74, 222, 128, 0.5)",
          tabActive: "#4ade80",
          tabText: "#fff",
          clockText: "rgba(255, 255, 255, 0.7)",
          timeText: "#4ade80",
        };
      case "longBreak":
        return {
          primary: "#3b82f6", // Blue
          secondary: "#2563eb",
          background: "rgba(37, 99, 235, 0.2)",
          border: "rgba(59, 130, 246, 0.3)",
          shadow: "rgba(59, 130, 246, 0.5)",
          tabActive: "#3b82f6",
          tabText: "#fff",
          clockText: "rgba(255, 255, 255, 0.7)",
          timeText: "#3b82f6",
        };
      default:
        return {
          primary: "#b50028", // Tailwind red-500
          secondary: "#940020", // Darker shade for gradient
          background: "rgba(181, 0, 40, 0.2)",
          border: "rgba(181, 0, 40, 0.3)",
          shadow: "rgba(181, 0, 40, 0.5)",
          tabActive: "#b50028",
          tabText: "#fff",
          clockText: "rgba(255, 255, 255, 0.7)",
          timeText: "#b50028",
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className=" mt-5 relative p-5 rounded-2xl w-full max-w-md mx-auto transition-all duration-500 transform shadow-2xl"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: `0 0 30px ${colors.shadow}`,
      }}
    >
      {/* Mode Selector - Redesigned to match image */}
      <div className="flex justify-center mb-8 overflow-hidden rounded-xl bg-black/20 border border-white/10">
        <button
          onClick={() => setMode("pomodoro")}
          className={`flex-1 py-3 px-3 text-center text-sm font-medium transition-all duration-300`}
          style={{
            backgroundColor:
              mode === "pomodoro" ? colors.tabActive : "transparent",
            color: mode === "pomodoro" ? "#fff" : "rgba(255, 255, 255, 0.6)",
          }}
        >
          Pomodoro
        </button>

        <button
          onClick={() => setMode("shortBreak")}
          className={`flex-1 py-3 px-3 text-center text-sm font-medium transition-all duration-300`}
          style={{
            backgroundColor:
              mode === "shortBreak" ? colors.tabActive : "transparent",
            color: mode === "shortBreak" ? "#fff" : "rgba(255, 255, 255, 0.6)",
          }}
        >
          Short Break
        </button>

        <button
          onClick={() => setMode("longBreak")}
          className={`flex-1 py-3 px-3 text-center text-sm font-medium transition-all duration-300`}
          style={{
            backgroundColor:
              mode === "longBreak" ? colors.tabActive : "transparent",
            color: mode === "longBreak" ? "#fff" : "rgba(255, 255, 255, 0.6)",
          }}
        >
          Long Break
        </button>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center py-4">
        <h2 className="mb-4 text-xl font-medium text-white/90">
          {mode === "pomodoro"
            ? "Focus Time"
            : mode === "shortBreak"
            ? "Short Break"
            : "Long Break"}
        </h2>

        <div className="relative mb-4">
          <div
            className="text-8xl sm:text-9xl font-bold"
            style={{
              color: colors.timeText,
              textShadow: `0 0 15px ${colors.shadow}`,
            }}
          >
            {formatTime(time)}
          </div>
        </div>

        {/* Start and End Time Display - Fixed layout to prevent overlap */}
        {(startTime || endTime) && (
          <div
            className="mt-1 mb-4 flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm sm:text-base"
            style={{ color: colors.clockText }}
          >
            {startTime && (
              <div className="flex items-center">
                <span className="mr-1 opacity-80">Start:</span>
                <span className="font-medium">
                  {formatClockTime(startTime)}
                </span>
              </div>
            )}
            {endTime && (
              <div className="flex items-center">
                <span className="mr-1 opacity-80">End:</span>
                <span className="font-medium">{formatClockTime(endTime)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mt-2">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex items-center justify-center p-4 sm:p-5 rounded-full transition-transform hover:scale-105 shadow-lg"
            style={{
              background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 4px 12px ${colors.shadow}`,
            }}
            aria-label="Start Timer"
          >
            <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="white" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center justify-center p-4 sm:p-5 rounded-full transition-transform hover:scale-105 shadow-lg"
            style={{
              background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 4px 12px ${colors.shadow}`,
            }}
            aria-label="Pause Timer"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="6" y="5" width="4" height="14" rx="1" fill="white" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="white" />
            </svg>
          </button>
        )}

        <button
          onClick={handleReset}
          className="flex items-center justify-center p-4 sm:p-5 rounded-full transition-transform hover:scale-105 shadow-lg"
          style={{
            background: `linear-gradient(to bottom right, #9333ea, #7e22ce)`,
            boxShadow: `0 4px 12px rgba(147, 51, 234, 0.5)`,
          }}
          aria-label="Reset Timer"
        >
          <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
