import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Coffee, Timer, Zap } from "lucide-react";
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
  }, [mode]);

  // Timer logic
  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
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
  }, [isRunning, time]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(durations[mode]);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Get style based on current mode
  const getStylesForMode = () => {
    switch (mode) {
      case "pomodoro":
        return {
          container:
            "backdrop-blur-2xl bg-red-950/90 border border-red-500/50 shadow-2xl shadow-red-500/40",
          glow: "bg-gradient-to-r from-red-500/40 via-rose-500/40 to-pink-500/40",
          title:
            "text-red-400 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-rose-600",
          timeGlow: "text-red-400/50",
          button:
            "from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 shadow-red-500/40",
        };
      case "shortBreak":
        return {
          container:
            "backdrop-blur-2xl bg-emerald-950/90 border border-emerald-500/50 shadow-2xl shadow-emerald-500/40",
          glow: "bg-gradient-to-r from-emerald-500/40 via-green-500/40 to-teal-500/40",
          title:
            "text-emerald-400 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-green-600",
          timeGlow: "text-emerald-400/50",
          button:
            "from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-emerald-500/40",
        };
      case "longBreak":
        return {
          container:
            "backdrop-blur-2xl bg-blue-950/85 border border-blue-400/50 shadow-2xl shadow-blue-500/30",
          glow: "bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30",
          title:
            "text-blue-300 font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-indigo-500",
          timeGlow: "text-blue-400/60",
          button:
            "from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 shadow-blue-500/40",
        };
      default:
        return {
          container:
            "backdrop-blur-2xl bg-red-950/90 border border-red-500/50 shadow-2xl shadow-red-500/40",
          glow: "bg-gradient-to-r from-red-500/40 via-rose-500/40 to-pink-500/40",
          title:
            "text-red-400 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-rose-600",
          timeGlow: "text-red-400/50",
          button:
            "from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 shadow-red-500/40",
        };
    }
  };

  const styles = getStylesForMode();

  return (
    <div
      className={`relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl md:rounded-4xl w-full max-w-md mx-auto transition-all duration-500 transform ${styles.container}`}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 -z-10 blur-3xl opacity-20 rounded-full ${styles.glow}`}
      ></div>

      {/* Mode Selector */}
      <div className="flex justify-center mb-6 gap-2 sm:gap-3">
        <Button
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm bg-gradient-to-r ${
            mode === "pomodoro" ? styles.button : "bg-white/5 hover:bg-white/10"
          }`}
          onClick={() => setMode("pomodoro")}
        >
          <Timer className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Pomodoro
        </Button>

        <Button
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm bg-gradient-to-r ${
            mode === "shortBreak"
              ? styles.button
              : "bg-white/5 hover:bg-white/10"
          }`}
          onClick={() => setMode("shortBreak")}
        >
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Short Break
        </Button>

        <Button
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm bg-gradient-to-r ${
            mode === "longBreak"
              ? styles.button
              : "bg-white/5 hover:bg-white/10"
          }`}
          onClick={() => setMode("longBreak")}
        >
          <Coffee className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          Long Break
        </Button>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center py-4 sm:py-6 md:py-8">
        <h2 className={`mb-4 ${styles.title}`}>
          {mode === "pomodoro"
            ? "Focus Time"
            : mode === "shortBreak"
            ? "Short Break"
            : "Long Break"}
        </h2>

        <div className="relative group">
          <div className="text-7xl sm:text-8xl md:text-9xl font-bold relative z-10">
            <span className={styles.timeText}>{formatTime(time)}</span>
          </div>

          {/* Glow effect for time */}
          <div
            className={`absolute top-0 left-0 text-7xl sm:text-8xl md:text-9xl font-bold blur-md -z-10 ${styles.timeGlow}`}
          >
            {formatTime(time)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-3 sm:space-x-4 mt-4 sm:mt-6">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className={`flex items-center justify-center p-3 sm:p-4 rounded-full bg-gradient-to-r ${styles.button} transform transition-all duration-300 hover:scale-105 shadow-lg`}
            aria-label="Start Timer"
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className={`flex items-center justify-center p-3 sm:p-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 shadow-lg shadow-yellow-500/40 transform transition-all duration-300 hover:scale-105`}
            aria-label="Pause Timer"
          >
            <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </button>
        )}

        <button
          onClick={handleReset}
          className={`flex items-center justify-center p-3 sm:p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-lg shadow-purple-500/40 transform transition-all duration-300 hover:scale-105`}
          aria-label="Reset Timer"
        >
          <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
