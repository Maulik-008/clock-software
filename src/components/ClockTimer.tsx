import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, RotateCcw } from "lucide-react";
import ClockStyleSelector from "./ClockStyleSelector";

const ClockTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [format24h, setFormat24h] = useState(true);
  const [clockStyle, setClockStyle] = useState("hologram");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
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
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (format24h) {
      return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
    } else {
      const displayHours = hours % 12 || 12;
      const ampm = hours >= 12 ? "PM" : "AM";
      return {
        hours: displayHours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        ampm,
      };
    }
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const timeDisplay = formatTime(time);

  const getClockStyles = () => {
    switch (clockStyle) {
      case "matrix":
        return {
          container:
            "backdrop-blur-2xl bg-black/95 border border-green-500/40 shadow-2xl shadow-green-500/30",
          glow: "bg-gradient-to-r from-green-500/30 via-lime-500/30 to-green-500/30",
          title:
            "text-green-400 font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-lime-600 font-mono",
          timeGlow: "text-green-400/50 font-mono",
          colon: "text-green-400",
          specialEffect: "matrix-rain",
          buttons: {
            start:
              "from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-green-500/40",
            pause:
              "from-lime-500 to-green-600 hover:from-lime-400 hover:to-green-500 shadow-lime-500/40",
            reset:
              "from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40",
          },
        };
      case "hologram":
        return {
          container:
            "backdrop-blur-2xl bg-blue-950/85 border border-blue-400/50 shadow-2xl shadow-blue-500/30",
          glow: "bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30",
          title:
            "text-blue-300 font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-indigo-500",
          timeGlow: "text-blue-400/60",
          colon: "text-blue-400",
          specialEffect: "hologram-scan",
          buttons: {
            start:
              "from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 shadow-blue-500/40",
            pause:
              "from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 shadow-purple-500/40",
            reset:
              "from-pink-500 to-red-600 hover:from-pink-400 hover:to-red-500 shadow-pink-500/40",
          },
        };
      case "cyberpunk":
        return {
          container:
            "backdrop-blur-2xl bg-purple-950/90 border border-pink-500/50 shadow-2xl shadow-pink-500/40",
          glow: "bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-500/40",
          title:
            "text-pink-400 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-600",
          timeGlow: "text-pink-400/50",
          colon: "text-pink-400",
          specialEffect: "neon-rings",
          buttons: {
            start:
              "from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-pink-500/40",
            pause:
              "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/40",
            reset:
              "from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40",
          },
        };
      case "quantum":
        return {
          container:
            "backdrop-blur-2xl bg-emerald-950/90 border border-emerald-500/50 shadow-2xl shadow-emerald-500/40",
          glow: "bg-gradient-to-r from-emerald-500/40 via-green-500/40 to-teal-500/40",
          title:
            "text-emerald-400 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-green-600",
          timeGlow: "text-emerald-400/50",
          colon: "text-emerald-400",
          specialEffect: "quantum-wave",
          buttons: {
            start:
              "from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-emerald-500/40",
            pause:
              "from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 shadow-teal-500/40",
            reset:
              "from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40",
          },
        };
      case "plasma":
        return {
          container:
            "backdrop-blur-2xl bg-red-950/90 border border-orange-500/50 shadow-2xl shadow-orange-500/40",
          glow: "bg-gradient-to-r from-red-500/40 via-orange-500/40 to-yellow-500/40",
          title:
            "text-orange-400 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-red-600",
          timeGlow: "text-orange-400/50",
          colon: "text-orange-400",
          specialEffect: "plasma-fire",
          buttons: {
            start:
              "from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-orange-500/40",
            pause:
              "from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 shadow-yellow-500/40",
            reset:
              "from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40",
          },
        };
      case "cosmic":
        return {
          container:
            "backdrop-blur-2xl bg-indigo-950/90 border border-violet-500/50 shadow-2xl shadow-violet-500/40",
          glow: "bg-gradient-to-r from-violet-500/40 via-purple-500/40 to-indigo-500/40",
          title:
            "text-violet-400 font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-violet-400 to-purple-600",
          timeGlow: "text-violet-400/50",
          colon: "text-violet-400",
          specialEffect: "cosmic-rings",
          buttons: {
            start:
              "from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 shadow-violet-500/40",
            pause:
              "from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 shadow-indigo-500/40",
            reset:
              "from-pink-500 to-red-600 hover:from-pink-400 hover:to-red-500 shadow-pink-500/40",
          },
        };
      case "aurora":
        return {
          container:
            "backdrop-blur-2xl bg-slate-950/95 border border-teal-500/50 shadow-2xl shadow-teal-500/40",
          glow: "bg-gradient-to-r from-teal-500/40 via-cyan-500/40 to-blue-500/40",
          title:
            "text-teal-400 font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-teal-400 to-cyan-600",
          timeGlow: "text-teal-400/50",
          colon: "text-teal-400",
          specialEffect: "star-field",
          buttons: {
            start:
              "from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 shadow-teal-500/40",
            pause:
              "from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 shadow-blue-500/40",
            reset:
              "from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40",
          },
        };
      default: // neon
        return {
          container:
            "backdrop-blur-2xl bg-slate-950/90 border border-cyan-500/40 shadow-2xl shadow-cyan-500/30",
          glow: "bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30",
          title:
            "text-cyan-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600",
          timeGlow: "text-cyan-400/50",
          colon: "text-cyan-400",
          specialEffect: "pulse-wave",
          buttons: {
            start:
              "from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-green-500/40",
            pause:
              "from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 shadow-yellow-500/40",
            reset:
              "from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40",
          },
        };
    }
  };

  const renderSpecialEffects = (effect: string) => {
    switch (effect) {
      case "matrix-rain":
        return (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 bg-green-400/30 animate-pulse"
                style={{
                  left: `${10 + i * 12}%`,
                  height: "100%",
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </>
        );
      case "neon-rings":
        return (
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-2 border-pink-400/20 rounded-full animate-ping"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: "3s",
                }}
              />
            ))}
          </>
        );
      case "hologram-scan":
        return (
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent animate-pulse"
            style={{ animationDuration: "1.5s" }}
          />
        );
      case "plasma-fire":
        return (
          <>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-orange-500/40 rounded-full blur-sm animate-bounce"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: "10%",
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </>
        );
      case "cosmic-rings":
        return (
          <>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute border border-violet-400/20 rounded-full animate-spin"
                style={{
                  width: `${60 + i * 20}%`,
                  height: `${60 + i * 20}%`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animationDuration: `${3 + i}s`,
                }}
              />
            ))}
          </>
        );
      case "star-field":
        return (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-teal-400/60 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`,
                }}
              />
            ))}
          </>
        );
      case "quantum-wave":
        return (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent animate-pulse"
            style={{ animationDuration: "2s" }}
          />
        );
      case "pulse-wave":
        return (
          <>
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse"
              style={{ animationDuration: "2s" }}
            />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute border border-cyan-400/20 rounded-full animate-pulse-slow"
                style={{
                  width: `${40 + i * 15}%`,
                  height: `${10 + i * 15}%`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={i + 10}
                className="absolute w-0.5 h-16 bg-cyan-400/10 animate-pulse-slow"
                style={{
                  left: `${15 + i * 10}%`,
                  top: `${Math.random() * 80}%`,
                  animationDelay: `${i * 0.4}s`,
                  transform: `rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  const styles = getClockStyles();

  return (
    <div className="relative w-full">
      <div
        className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl transform transition-all duration-700 hover:scale-[1.02] ${styles.container}`}
      >
        {/* Enhanced Glow Effect */}
        <div
          className={`absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-60 animate-pulse ${
            styles.glow
          } ${clockStyle === "neon" ? "opacity-80" : ""}`}
        ></div>
        <div
          className={`absolute inset-0 rounded-2xl sm:rounded-3xl blur-3xl opacity-30 ${
            styles.glow
          } ${clockStyle === "neon" ? "opacity-50" : ""}`}
        ></div>

        {/* Special Effects Background */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
          {renderSpecialEffects(styles.specialEffect)}
          {clockStyle === "neon" && (
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-cyan-500/5"></div>
          )}
        </div>

        <div className="relative z-10 text-center">
          {/* Enhanced Title */}
          <h1
            className={`font-bold mb-2 sm:mb-3 md:mb-4 uppercase relative z-10 
            ${styles.title} transition-all duration-300 hover:scale-105
            drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] tracking-wider
            ${clockStyle === "neon" ? "animate-pulse-slow" : ""}`}
            aria-label="Study Timer"
          >
            <div className="absolute -inset-1 border-t border-b border-white/10 opacity-70 rounded-lg"></div>
            <span className="relative inline-block text-base sm:text-lg md:text-xl lg:text-2xl">
              <span
                className={`absolute -inset-1 blur-sm opacity-50 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg ${
                  clockStyle === "neon" ? "via-cyan-500/20" : ""
                }`}
              ></span>
              {clockStyle === "neon" ? (
                <>
                  <span className="absolute inset-0 text-cyan-400 blur-[2px] z-0">
                    Study Timer
                  </span>
                  <span className="absolute inset-0 text-cyan-300 blur-[1px] z-10">
                    Study Timer
                  </span>
                  <span className="relative z-20 text-white">Study Timer</span>
                </>
              ) : (
                "Study Timer"
              )}
            </span>
            <div
              className={`absolute -left-4 -right-4 h-px bg-gradient-to-r from-transparent to-transparent -bottom-2 ${
                clockStyle === "neon" ? "via-cyan-400/50" : "via-white/20"
              }`}
            ></div>
          </h1>

          {/* Enhanced Format Toggle */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <button
              onClick={() => setFormat24h(!format24h)}
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-black/50 border border-white/20 text-white/90 text-xs hover:bg-white/10 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/20 backdrop-blur-xl"
            >
              {format24h ? "24H" : "12H"} FORMAT
            </button>
          </div>

          {/* Enhanced Timer Display - Adjust for desktop */}
          <div className="my-4 sm:my-5 md:my-6 px-2">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-mono font-bold">
              {/* Hours */}
              <div className="relative group px-1">
                <div
                  className={`drop-shadow-2xl transform transition-all duration-500 hover:scale-110 ${
                    styles.timeText
                  } ${isRunning ? "animate-pulse" : ""}`}
                >
                  {timeDisplay.hours}
                </div>
                <div
                  className={`absolute inset-0 blur-lg animate-pulse ${styles.timeGlow}`}
                >
                  {timeDisplay.hours}
                </div>
                <div
                  className={`absolute inset-0 blur-2xl opacity-50 ${styles.timeGlow}`}
                >
                  {timeDisplay.hours}
                </div>
              </div>

              {/* Enhanced Colon */}
              <div
                className={`transition-all duration-300 transform px-1 ${
                  isRunning ? "animate-pulse scale-110" : "scale-100"
                } ${styles.colon}`}
              >
                :
              </div>

              {/* Minutes */}
              <div className="relative group px-1">
                <div
                  className={`drop-shadow-2xl transform transition-all duration-500 hover:scale-110 ${
                    styles.timeText
                  } ${isRunning ? "animate-pulse" : ""}`}
                >
                  {timeDisplay.minutes}
                </div>
                <div
                  className={`absolute inset-0 blur-lg animate-pulse ${styles.timeGlow}`}
                >
                  {timeDisplay.minutes}
                </div>
                <div
                  className={`absolute inset-0 blur-2xl opacity-50 ${styles.timeGlow}`}
                >
                  {timeDisplay.minutes}
                </div>
              </div>

              {/* Enhanced Colon */}
              <div
                className={`transition-all duration-300 transform px-1 ${
                  isRunning ? "animate-pulse scale-110" : "scale-100"
                } ${styles.colon}`}
              >
                :
              </div>

              {/* Seconds */}
              <div className="relative group px-1">
                <div
                  className={`drop-shadow-2xl transform transition-all duration-500 hover:scale-110 ${
                    styles.timeText
                  } ${isRunning ? "animate-pulse" : ""}`}
                >
                  {timeDisplay.seconds}
                </div>
                <div
                  className={`absolute inset-0 blur-lg animate-pulse ${styles.timeGlow}`}
                >
                  {timeDisplay.seconds}
                </div>
                <div
                  className={`absolute inset-0 blur-2xl opacity-50 ${styles.timeGlow}`}
                >
                  {timeDisplay.seconds}
                </div>
              </div>

              {/* AM/PM for 12h format */}
              {!format24h && timeDisplay.ampm && (
                <div
                  className={`text-sm sm:text-base md:text-lg self-start mt-2 sm:mt-3 opacity-80 ${styles.colon} ml-2`}
                >
                  {timeDisplay.ampm}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Control Buttons - more compact for desktop */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            {/* Start/Pause Button */}
            {!isRunning ? (
              <button
                onClick={handleStart}
                className={`group relative flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r transition-all duration-500 transform hover:scale-110 hover:shadow-lg ${styles.buttons.start}`}
              >
                <Play
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white mr-2"
                  fill="currentColor"
                />
                <span className="text-white font-medium text-xs sm:text-sm">
                  Start
                </span>
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className={`group relative flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r transition-all duration-500 transform hover:scale-110 hover:shadow-lg ${styles.buttons.pause}`}
              >
                <Pause
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white mr-2"
                  fill="currentColor"
                />
                <span className="text-white font-medium text-xs sm:text-sm">
                  Pause
                </span>
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            )}

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className={`group relative flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r transition-all duration-500 transform hover:scale-110 hover:shadow-lg ${styles.buttons.reset}`}
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white mr-2" />
              <span className="text-white font-medium text-xs sm:text-sm">
                Reset
              </span>
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Enhanced Status Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                isRunning
                  ? `${
                      styles.buttons.start.includes("green")
                        ? "bg-green-400"
                        : styles.buttons.start.includes("blue")
                        ? "bg-blue-400"
                        : "bg-pink-400"
                    } shadow-2xl animate-ping`
                  : "bg-gray-600"
              }`}
            ></div>
            <span className="text-white/80 text-xs tracking-[0.2em] font-light">
              {isRunning ? "RUNNING" : "STOPPED"}
            </span>
          </div>

          {/* Theme Selector */}
          <div className="mt-2">
            <ClockStyleSelector
              currentStyle={clockStyle}
              onStyleChange={setClockStyle}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Floating Animation Elements */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400/20 rounded-full blur-sm animate-bounce"></div>
      <div className="absolute -top-1 -right-3 w-3 h-3 bg-purple-400/20 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute -bottom-2 -left-3 w-5 h-5 bg-blue-400/20 rounded-full blur-sm animate-ping"></div>
      <div className="absolute -bottom-1 -right-2 w-2 h-2 bg-pink-400/20 rounded-full blur-sm animate-bounce"></div>
    </div>
  );
};

export default ClockTimer;
