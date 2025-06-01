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
    <div className="fixed top-3 sm:top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-3 sm:px-4">
      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-1.5 p-1.5 bg-black/70 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/20 shadow-2xl">
        <button
          onClick={() => onModeChange("pomodoro")}
          className={`group relative flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 flex-1 ${
            currentMode === "pomodoro"
              ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/30"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
          <span className="text-white/90 font-medium tracking-wide text-sm sm:text-base">
            POMO
          </span>
        </button>

        <button
          onClick={() => onModeChange("timer")}
          className={`group relative flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 flex-1 ${
            currentMode === "timer"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
          <span className="text-white/90 font-medium tracking-wide text-sm sm:text-base">
            TIMER
          </span>
        </button>

        <button
          onClick={() => onModeChange("countdown")}
          className={`group relative flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 flex-1 ${
            currentMode === "countdown"
              ? "bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
          <span className="text-white/90 font-medium tracking-wide text-sm sm:text-base">
            COUNT
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
