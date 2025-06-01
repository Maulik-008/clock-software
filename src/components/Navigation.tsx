import React from "react";
import { Timer, Clock, Target, Coffee, Zap } from "lucide-react";

interface NavigationProps {
  currentMode: "timer" | "countdown" | "pomodoro";
  onModeChange: (mode: "timer" | "countdown" | "pomodoro") => void;
  pomodoroSubMode?: "pomodoro" | "shortBreak" | "longBreak";
  onPomodoroSubModeChange?: (
    subMode: "pomodoro" | "shortBreak" | "longBreak"
  ) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentMode,
  onModeChange,
  pomodoroSubMode = "pomodoro",
  onPomodoroSubModeChange,
}) => {
  return (
    <div className="fixed top-2 sm:top-3 md:top-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-3 sm:px-4">
      <div className="flex flex-col items-center mb-1">
        <h1 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-1">
          StudyClock.com
        </h1>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-1 p-1 bg-black/70 backdrop-blur-xl rounded-lg md:rounded-xl border border-white/20 shadow-xl">
        <button
          onClick={() => onModeChange("pomodoro")}
          className={`group relative flex items-center justify-center space-x-1 sm:space-x-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md md:rounded-lg transition-all duration-300 transform hover:scale-105 flex-1 ${
            currentMode === "pomodoro"
              ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/30"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" />
          <span className="text-white/90 font-medium tracking-wide text-xs sm:text-sm">
            POMO
          </span>
        </button>

        <button
          onClick={() => onModeChange("timer")}
          className={`group relative flex items-center justify-center space-x-1 sm:space-x-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md md:rounded-lg transition-all duration-300 transform hover:scale-105 flex-1 ${
            currentMode === "timer"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" />
          <span className="text-white/90 font-medium tracking-wide text-xs sm:text-sm">
            TIMER
          </span>
        </button>

        <button
          onClick={() => onModeChange("countdown")}
          className={`group relative flex items-center justify-center space-x-1 sm:space-x-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md md:rounded-lg transition-all duration-300 transform hover:scale-105 flex-1 ${
            currentMode === "countdown"
              ? "bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90" />
          <span className="text-white/90 font-medium tracking-wide text-xs sm:text-sm">
            COUNT
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
