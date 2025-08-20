import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import CountdownStyleSelector from "./CountdownStyleSelector";

const CountdownTimer = () => {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [countdownStyle, setCountdownStyle] = useState("neon");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Request notification permissions when component mounts
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    // Initialize audio element
    audioRef.current = new Audio("/audio/alarm.mp3");
    audioRef.current.loop = false;

    return () => {
      // Clean up audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Handle timer countdown and notifications
  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);

            // Show notification when timer ends
            if (notificationsEnabled) {
              showNotification();
            }

            // Play sound when timer ends
            if (soundEnabled && audioRef.current) {
              audioRef.current.play().catch((err) => {
                console.error("Error playing audio:", err);
              });
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
  }, [isRunning, time, notificationsEnabled, soundEnabled]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(10);

    // Stop audio if it's playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Toggle notification settings
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);
  const toggleSound = () => setSoundEnabled((prev) => !prev);

  // Show browser notification
  const showNotification = () => {
    if (!notificationsEnabled) return;

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Time's up!", {
        body: "Your countdown timer has finished.",
        icon: "/favicon.ico",
        silent: true, // We'll play our own sound
      });
    }
  };

  const getCountdownStyles = () => {
    switch (countdownStyle) {
      case "matrix":
        return {
          container:
            "backdrop-blur-2xl bg-black/95 border border-green-500/40 shadow-2xl shadow-green-500/30",
          glow: "bg-gradient-to-r from-green-500/30 via-lime-500/30 to-green-500/30",
          title:
            "text-green-400 font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          numberContainer: "relative group",
          number:
            time === 0
              ? "text-red-400 font-mono text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse"
              : "text-green-400 font-mono text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          numberGlow:
            time === 0
              ? "text-red-400/60 font-mono text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
              : "text-green-400/60 font-mono text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          animation: isRunning ? "animate-bounce" : "",
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
      case "neon":
        return {
          container:
            "backdrop-blur-2xl bg-purple-950/90 border border-pink-500/50 shadow-2xl shadow-pink-500/40",
          glow: "bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-500/40",
          title:
            "text-pink-400 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          numberContainer: "relative group",
          number:
            time === 0
              ? "text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse"
              : "text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          numberGlow:
            time === 0
              ? "text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
              : "text-pink-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          animation: isRunning ? "animate-pulse" : "",
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
      case "hologram":
        return {
          container:
            "backdrop-blur-2xl bg-blue-950/85 border border-blue-400/50 shadow-2xl shadow-blue-500/30",
          glow: "bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30",
          title:
            "text-blue-300 font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          numberContainer: "relative group",
          number:
            time === 0
              ? "text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse"
              : "text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-indigo-500 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          numberGlow:
            time === 0
              ? "text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
              : "text-blue-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          animation: isRunning ? "animate-spin" : "",
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
      case "plasma":
        return {
          container:
            "backdrop-blur-2xl bg-red-950/90 border border-orange-500/50 shadow-2xl shadow-orange-500/40",
          glow: "bg-gradient-to-r from-red-500/40 via-orange-500/40 to-yellow-500/40",
          title:
            "text-orange-400 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          numberContainer: "relative group",
          number:
            time === 0
              ? "text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse"
              : "text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-red-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          numberGlow:
            time === 0
              ? "text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
              : "text-orange-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          animation: isRunning ? "animate-pulse" : "",
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
          numberContainer: "relative group",
          number:
            time === 0
              ? "text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse"
              : "text-transparent bg-clip-text bg-gradient-to-b from-violet-400 to-purple-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          numberGlow:
            time === 0
              ? "text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
              : "text-violet-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          animation: isRunning ? "animate-spin" : "",
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
      case "starfield":
        return {
          container:
            "backdrop-blur-2xl bg-slate-950/95 border border-teal-500/50 shadow-2xl shadow-teal-500/40",
          glow: "bg-gradient-to-r from-teal-500/40 via-cyan-500/40 to-blue-500/40",
          title:
            "text-teal-400 font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          numberContainer: "relative group",
          number:
            time === 0
              ? "text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse"
              : "text-transparent bg-clip-text bg-gradient-to-b from-teal-400 to-cyan-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          numberGlow:
            time === 0
              ? "text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
              : "text-teal-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          animation: isRunning ? "animate-pulse" : "",
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
      case "quantum":
        return {
          container:
            "backdrop-blur-2xl bg-emerald-950/90 border border-emerald-500/50 shadow-2xl shadow-emerald-500/40",
          glow: "bg-gradient-to-r from-emerald-500/40 via-green-500/40 to-teal-500/40",
          title:
            "text-emerald-400 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl",
          numberContainer: "relative group",
          number:
            time === 0
              ? "text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse"
              : "text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-green-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          numberGlow:
            time === 0
              ? "text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
              : "text-emerald-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          animation: isRunning ? "animate-bounce" : "",
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
      default: // pulse
        return {
          container:
            "backdrop-blur-2xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl shadow-cyan-500/30",
          glow: "bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40",
          title:
            "text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]",
          numberContainer: "relative group",
          number:
            time === 0
              ? "text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse"
              : "text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          numberGlow:
            time === 0
              ? "text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
              : "text-cyan-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl",
          animation: isRunning
            ? `animate-pulse ${time <= 3 ? "animate-bounce" : ""}`
            : "",
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
                className={`absolute w-0.5 bg-green-400/30 animate-pulse`}
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
                className={`absolute inset-0 border-2 border-pink-400/20 rounded-full animate-ping`}
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
                className={`absolute w-4 h-4 bg-orange-500/40 rounded-full blur-sm animate-bounce`}
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
                className={`absolute border border-violet-400/20 rounded-full animate-spin`}
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
                className={`absolute w-1 h-1 bg-teal-400/60 rounded-full animate-pulse`}
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
            {/* Enhanced background glow */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-cyan-500/20 animate-pulse-slow"
              style={{ animationDuration: "3s" }}
            />

            {/* Enhanced circular rings */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute border-2 border-cyan-400/40 rounded-full animate-pulse-slow"
                style={{
                  width: `${40 + i * 15}%`,
                  height: `${15 + i * 15}%`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animationDelay: `${i * 0.7}s`,
                  boxShadow: "0 0 15px rgba(34, 211, 238, 0.4)",
                }}
              />
            ))}

            {/* Horizontal light beams */}
            <div className="absolute left-0 right-0 h-[1px] top-1/2 bg-cyan-400/30 shadow-lg shadow-cyan-400/40 animate-pulse" />
            <div
              className="absolute left-0 right-0 h-[1px] top-[40%] bg-blue-400/30 shadow-lg shadow-blue-400/40 animate-pulse-slow"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute left-0 right-0 h-[1px] top-[60%] bg-cyan-400/30 shadow-lg shadow-cyan-400/40 animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            />

            {/* Vertical light beams */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i + 10}
                className="absolute w-[2px] h-32 bg-cyan-400/25 animate-pulse-slow"
                style={{
                  left: `${15 + i * 10}%`,
                  top: `${Math.random() * 70}%`,
                  animationDelay: `${i * 0.4}s`,
                  transform: `rotate(${i * 45}deg)`,
                  boxShadow: "0 0 10px rgba(34, 211, 238, 0.4)",
                }}
              />
            ))}

            {/* Pulsing dots */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i + 20}
                className="absolute w-2 h-2 rounded-full bg-cyan-400/70 animate-ping"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "1.5s",
                  boxShadow: "0 0 8px rgba(34, 211, 238, 0.6)",
                }}
              />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  const styles = getCountdownStyles();

  return (
    <div className="relative w-full">
      <div
        className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl transform transition-all duration-700 hover:scale-[1.02] ${styles.container}`}
      >
        {/* Enhanced Glow Effect */}
        <div
          className={`absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-60 animate-pulse ${
            styles.glow
          } ${
            countdownStyle === "neon"
              ? "opacity-80"
              : countdownStyle === "pulse"
              ? "opacity-75"
              : ""
          }`}
        ></div>
        <div
          className={`absolute inset-0 rounded-2xl sm:rounded-3xl blur-3xl opacity-30 ${
            styles.glow
          } ${
            countdownStyle === "neon"
              ? "opacity-50"
              : countdownStyle === "pulse"
              ? "opacity-40"
              : ""
          }`}
        ></div>

        {/* Special Effects Background */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
          {renderSpecialEffects(styles.specialEffect)}
          {countdownStyle === "neon" && (
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-cyan-500/5"></div>
          )}
          {countdownStyle === "pulse" && (
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-blue-500/10"></div>
          )}
        </div>

        <div className="relative z-10 text-center">
          {/* Title */}
          <h1
            className={`font-bold mb-2 sm:mb-3 md:mb-4 uppercase relative z-10 
            ${styles.title} transition-all duration-300 hover:scale-105
            drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] tracking-wider
            ${countdownStyle === "neon" ? "animate-pulse-slow" : ""}`}
            aria-label="10 Second Countdown"
          >
            <div className="absolute -inset-1 border-t border-b border-white/10 opacity-70 rounded-lg"></div>
            <span className="relative inline-block text-xs sm:text-sm md:text-base">
              <span
                className={`absolute -inset-1 blur-sm opacity-50 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg ${
                  countdownStyle === "neon"
                    ? "via-cyan-500/20"
                    : countdownStyle === "pulse"
                    ? "via-cyan-500/30"
                    : ""
                }`}
              ></span>
              {countdownStyle === "neon" ? (
                <>
                  <span className="absolute inset-0 text-cyan-400 blur-[2px] z-0">
                    10 SECOND COUNTDOWN
                  </span>
                  <span className="absolute inset-0 text-cyan-300 blur-[1px] z-10">
                    10 SECOND COUNTDOWN
                  </span>
                  <span className="relative z-20 text-white">
                    10 SECOND COUNTDOWN
                  </span>
                </>
              ) : countdownStyle === "pulse" ? (
                <>
                  {/* Enhanced layers for pulse theme */}
                  <span className="absolute inset-0 text-cyan-300 blur-[3px] z-0 animate-pulse-slow">
                    10 SECOND COUNTDOWN
                  </span>
                  <span
                    className="absolute inset-0 text-blue-300 blur-[2px] z-10 animate-pulse"
                    style={{ animationDuration: "2s" }}
                  >
                    10 SECOND COUNTDOWN
                  </span>
                  <span className="relative z-20 text-white font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-200 to-cyan-400">
                      10 SECOND COUNTDOWN
                    </span>
                  </span>

                  {/* Decorative elements for pulse theme */}
                  <div className="absolute -inset-x-4 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
                  <div className="absolute -inset-y-1 left-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"></div>
                  <div className="absolute -inset-y-1 right-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"></div>
                </>
              ) : (
                "10 SECOND COUNTDOWN"
              )}
            </span>
            <div
              className={`absolute -left-4 -right-4 h-px bg-gradient-to-r from-transparent to-transparent -bottom-2 ${
                countdownStyle === "neon"
                  ? "via-cyan-400/50"
                  : countdownStyle === "pulse"
                  ? "via-cyan-400/60"
                  : "via-white/20"
              }`}
            ></div>

            {/* Extra glowing effect for pulse theme */}
            {countdownStyle === "pulse" && (
              <div className="absolute -inset-x-6 -inset-y-2 border border-cyan-500/20 rounded-lg blur-sm"></div>
            )}
          </h1>

          {/* Countdown Display - Make more compact for desktop */}
          <div className="my-6 sm:my-5 md:my-6 px-4 sm:px-2">
            <div
              className={`flex items-center justify-center ${styles.numberContainer}`}
            >
              {/* Main Number - Adjust size for desktop */}
              <div className={`relative ${styles.animation}`}>
                <div
                  className={`drop-shadow-2xl transform transition-all duration-500 font-bold text-6xl sm:text-5xl md:text-6xl lg:text-7xl px-5 sm:px-4 py-3 sm:py-2 ${
                    time <= 3 && time > 0 ? "animate-bounce scale-110" : ""
                  } ${
                    time === 0 ? "text-red-400 animate-pulse" : styles.number
                  }`}
                >
                  {time === 0 ? "Time's up!" : time}
                </div>
                <div
                  className={`absolute inset-0 blur-lg sm:blur-2xl animate-pulse text-6xl sm:text-5xl md:text-6xl lg:text-7xl ${styles.numberGlow}`}
                >
                  {time === 0 ? "Time's up!" : time}
                </div>
                <div
                  className={`absolute inset-0 blur-2xl sm:blur-3xl opacity-50 text-6xl sm:text-5xl md:text-6xl lg:text-7xl ${styles.numberGlow}`}
                >
                  {time === 0 ? "Time's up!" : time}
                </div>

                {/* Keep all the special effects for different styles */}
                {countdownStyle === "hologram" && isRunning && (
                  <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping"></div>
                )}
                {countdownStyle === "matrix" && time <= 5 && time > 0 && (
                  <div className="absolute -inset-2 border border-green-400/40 rounded-lg animate-pulse"></div>
                )}
                {countdownStyle === "neon" && time <= 3 && time > 0 && (
                  <>
                    <div className="absolute -inset-4 bg-pink-500/20 rounded-full blur-xl animate-ping"></div>
                    <div className="absolute -inset-6 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
                  </>
                )}
                {countdownStyle === "plasma" && time <= 5 && time > 0 && (
                  <div className="absolute -inset-4 bg-orange-500/30 rounded-full blur-2xl animate-pulse"></div>
                )}
                {countdownStyle === "cosmic" && isRunning && (
                  <div
                    className="absolute -inset-6 border border-violet-400/20 rounded-full animate-spin"
                    style={{ animationDuration: "4s" }}
                  ></div>
                )}
                {countdownStyle === "quantum" && time <= 3 && time > 0 && (
                  <div className="absolute inset-0 bg-emerald-400/10 rounded-lg animate-pulse blur-sm"></div>
                )}
                {countdownStyle === "pulse" && (
                  <>
                    <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-xl animate-pulse-slow"></div>
                    {time <= 5 && time > 0 && (
                      <>
                        <div
                          className="absolute -inset-8 border border-cyan-400/30 rounded-full animate-pulse-slow"
                          style={{ animationDuration: "3s" }}
                        ></div>
                        <div
                          className="absolute -inset-12 border border-cyan-400/20 rounded-full animate-pulse-slow"
                          style={{
                            animationDuration: "4s",
                            animationDelay: "0.5s",
                          }}
                        ></div>
                      </>
                    )}
                    {/* Add radial light beams when time is low */}
                    {time <= 3 && time > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={`beam-${i}`}
                            className="absolute h-[100px] sm:h-[120px] w-[2px] bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse"
                            style={{
                              transformOrigin: "center bottom",
                              transform: `rotate(${i * 45}deg)`,
                              animationDelay: `${i * 0.1}s`,
                              bottom: "50%",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Completion Message */}
            {time === 0 && (
              <div className="mt-2 sm:mt-3 text-red-400 text-sm sm:text-base font-bold animate-bounce">
                TIME'S UP!
                {soundEnabled && (
                  <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    <span>Sound Playing</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Control Buttons - more compact for desktop */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-3 mb-4 sm:mb-4">
            {!isRunning ? (
              <button
                onClick={handleStart}
                disabled={time === 0}
                className={`group relative flex items-center justify-center p-3 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r transition-all duration-500 transform hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${styles.buttons.start}`}
                aria-label="Start"
              >
                <Play
                  className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white"
                  fill="currentColor"
                />
                <span className="hidden sm:inline-block text-white font-medium text-sm ml-2">
                  Start
                </span>
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className={`group relative flex items-center justify-center p-3 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r transition-all duration-500 transform hover:scale-110 hover:shadow-lg ${styles.buttons.pause}`}
                aria-label="Pause"
              >
                <Pause
                  className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white"
                  fill="currentColor"
                />
                <span className="hidden sm:inline-block text-white font-medium text-sm ml-2">
                  Pause
                </span>
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            )}

            <button
              onClick={handleReset}
              className={`group relative flex items-center justify-center p-3 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r transition-all duration-500 transform hover:scale-110 hover:shadow-lg ${styles.buttons.reset}`}
              aria-label="Reset"
            >
              <RotateCcw className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
              <span className="hidden sm:inline-block text-white font-medium text-sm ml-2">
                Reset
              </span>
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Status Indicator */}
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
                  : time === 0
                  ? "bg-red-400 animate-pulse"
                  : "bg-gray-600"
              }`}
            ></div>
            <span className="text-white/80 text-xs tracking-[0.2em] font-light">
              {isRunning ? "COUNTING DOWN" : time === 0 ? "FINISHED" : "READY"}
            </span>
          </div>

          {/* Notification Settings */}
          <div className="flex justify-center items-center gap-4 mt-4 mb-2">
            <button
              onClick={toggleNotifications}
              className={`group relative flex items-center justify-center p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                notificationsEnabled ? "bg-blue-500/30" : "bg-gray-700/30"
              }`}
              aria-label={
                notificationsEnabled
                  ? "Disable Notifications"
                  : "Enable Notifications"
              }
              title={
                notificationsEnabled
                  ? "Disable Notifications"
                  : "Enable Notifications"
              }
            >
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-blue-300" />
              ) : (
                <BellOff className="w-5 h-5 text-gray-400" />
              )}
            </button>

            <button
              onClick={toggleSound}
              className={`group relative flex items-center justify-center p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                soundEnabled ? "bg-blue-500/30" : "bg-gray-700/30"
              }`}
              aria-label={soundEnabled ? "Disable Sound" : "Enable Sound"}
              title={soundEnabled ? "Disable Sound" : "Enable Sound"}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-blue-300" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Style Selector with better visibility */}
          <div className="mt-2">
            <CountdownStyleSelector
              currentStyle={countdownStyle}
              onStyleChange={setCountdownStyle}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Floating Animation Elements - smaller for desktop */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400/20 rounded-full blur-sm animate-bounce"></div>
      <div className="absolute -top-1 -right-3 w-3 h-3 bg-purple-400/20 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute -bottom-2 -left-3 w-5 h-5 bg-blue-400/20 rounded-full blur-sm animate-ping"></div>
      <div className="absolute -bottom-1 -right-2 w-2 h-2 bg-pink-400/20 rounded-full blur-sm animate-bounce"></div>
    </div>
  );
};

export default CountdownTimer;
