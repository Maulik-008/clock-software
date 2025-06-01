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
    <div className="fixed top-3 sm:top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4">
      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-1 p-1 bg-black/70 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/20 shadow-2xl">
        <button
          onClick={() => onModeChange("timer")}
          className={`group relative flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 flex-1 ${
            currentMode === "timer"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
          <span className="text-white/90 font-medium tracking-wide text-xs sm:text-sm md:text-base">
            TIMER
          </span>
        </button>

        <button
          onClick={() => onModeChange("countdown")}
          className={`group relative flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 flex-1 ${
            currentMode === "countdown"
              ? "bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
          <span className="text-white/90 font-medium tracking-wide text-xs sm:text-sm md:text-base">
            COUNT
          </span>
        </button>

        <button
          onClick={() => onModeChange("pomodoro")}
          className={`group relative flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 flex-1 ${
            currentMode === "pomodoro"
              ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/30"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
          <span className="text-white/90 font-medium tracking-wide text-xs sm:text-sm md:text-base">
            POMO
          </span>
        </button>
      </div>

      {/* Pomodoro sub-navigation for mobile */}
      {currentMode === "pomodoro" && onPomodoroSubModeChange && (
        <div className="md:hidden mt-2 flex justify-center gap-1 p-1 bg-black/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl">
          <button
            onClick={() => onPomodoroSubModeChange("pomodoro")}
            className={`flex items-center justify-center px-2 py-1.5 rounded-lg text-xs transition-all duration-300 ${
              pomodoroSubMode === "pomodoro"
                ? "bg-gradient-to-r from-red-500 to-rose-600 shadow-sm shadow-red-500/30"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <Target className="w-3 h-3 mr-1 text-white/90" />
            <span className="text-white/90 font-medium">Focus</span>
          </button>

          <button
            onClick={() => onPomodoroSubModeChange("shortBreak")}
            className={`flex items-center justify-center px-2 py-1.5 rounded-lg text-xs transition-all duration-300 ${
              pomodoroSubMode === "shortBreak"
                ? "bg-gradient-to-r from-emerald-500 to-green-600 shadow-sm shadow-emerald-500/30"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <Zap className="w-3 h-3 mr-1 text-white/90" />
            <span className="text-white/90 font-medium">Short</span>
          </button>

          <button
            onClick={() => onPomodoroSubModeChange("longBreak")}
            className={`flex items-center justify-center px-2 py-1.5 rounded-lg text-xs transition-all duration-300 ${
              pomodoroSubMode === "longBreak"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm shadow-blue-500/30"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <Coffee className="w-3 h-3 mr-1 text-white/90" />
            <span className="text-white/90 font-medium">Long</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
