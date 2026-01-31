import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import SEO from "../components/SEO";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Timer,
  Clock,
  Brain,
  BookOpen,
  Bell,
  BellOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import useAnalytics from "../hooks/use-analytics";
import { usePersistedCountdown } from "../hooks/usePersistedCountdown";
import PageLayout from "../components/PageLayout";

const EndTimeTimer = () => {
  const location = useLocation();
  const initialState = location.state as {
    hours?: number;
    minutes?: number;
  } | null;

  const [hours, setHours] = useState<string>(
    initialState?.hours?.toString() || "0",
  );
  const [minutes, setMinutes] = useState<string>(
    initialState?.minutes?.toString() || "0",
  );
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Use persisted countdown hook
  const {
    time: timeRemaining,
    isRunning,
    start,
    pause,
    reset: resetTimer,
    setInitialTime,
  } = usePersistedCountdown("end-time-timer", 0, handleCountdownComplete);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [studySessionCount, setStudySessionCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const analytics = useAnalytics();

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/audio/crystal.mp3");
    audioRef.current.loop = false;

    if ("Notification" in window) {
      Notification.requestPermission();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Restore UI state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("end-time-timer-ui-state");
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.hasStarted) {
          setHasStarted(true);
        }
        if (parsed.endTime) {
          setEndTime(new Date(parsed.endTime));
        }
        if (parsed.hours !== undefined) {
          setHours(parsed.hours);
        }
        if (parsed.minutes !== undefined) {
          setMinutes(parsed.minutes);
        }
      }
    } catch (error) {
      console.error("Failed to restore EndTimeTimer UI state:", error);
    }
  }, []);

  // Save UI state to localStorage whenever it changes
  useEffect(() => {
    if (hasStarted && endTime) {
      const state = {
        hasStarted,
        endTime: endTime.toISOString(),
        hours,
        minutes,
      };
      localStorage.setItem("end-time-timer-ui-state", JSON.stringify(state));
    }
  }, [hasStarted, endTime, hours, minutes]);

  const showNotification = useCallback(
    (title: string, body: string) => {
      if (!notificationsEnabled) return;

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon: "/favicon.ico",
          silent: true,
        });
      }
    },
    [notificationsEnabled],
  );

  // Handle countdown completion
  function handleCountdownComplete() {
    // Clear UI state when timer completes
    setHasStarted(false);
    setEndTime(null);
    localStorage.removeItem("end-time-timer-ui-state");

    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Error playing completion sound:", err);
      });
    }

    if (notificationsEnabled) {
      showNotification("Timer Complete!", "Your countdown timer has finished.");
    }

    analytics.trackTimerComplete("end-time-timer", 0);

    toast({
      title: "Timer Complete!",
      description: "Your countdown timer has finished.",
      variant: "default",
    });
  }

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const handleSetEndTime = () => {
    const hoursNum = parseInt(hours) || 0;
    const minutesNum = parseInt(minutes) || 0;

    if (hoursNum === 0 && minutesNum === 0) {
      toast({
        title: "Please Set Timer Duration",
        description: "Please enter hours and/or minutes for the timer.",
        variant: "destructive",
      });
      return;
    }

    if (hoursNum < 0 || minutesNum < 0 || minutesNum >= 60) {
      toast({
        title: "Invalid Duration",
        description: "Please enter valid hours (≥0) and minutes (0-59).",
        variant: "destructive",
      });
      return;
    }

    // Calculate end time from current time + duration
    const now = new Date();
    const end = new Date(now);
    end.setHours(end.getHours() + hoursNum);
    end.setMinutes(end.getMinutes() + minutesNum);
    end.setSeconds(end.getSeconds(), 0);

    const totalSeconds = hoursNum * 3600 + minutesNum * 60;
    setEndTime(end);
    setInitialTime(totalSeconds);
    setHasStarted(true);
    start();

    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Error playing start sound:", err);
      });
    }

    analytics.trackTimerStart("end-time-timer");
    toast({
      title: "Timer Started",
      description: `Countdown timer set for ${hoursNum}h ${minutesNum}m until ${end.toLocaleTimeString()}.`,
    });
  };

  const handleStart = () => {
    if (!hasStarted) {
      handleSetEndTime();
      return;
    }
    start();
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Error playing start sound:", err);
      });
    }
    analytics.trackTimerStart("end-time-timer");
    toast({
      title: "Timer Resumed",
      description: "Your countdown timer has resumed.",
    });
  };

  const handlePause = () => {
    pause();
    analytics.trackTimerPause("end-time-timer", timeRemaining);
    toast({
      title: "Timer Paused",
      description: "Take a quick break and resume when ready.",
    });
  };

  const handleReset = () => {
    setHasStarted(false);
    setEndTime(null);
    setHours("0");
    setMinutes("0");
    resetTimer();

    // Clear UI state from localStorage
    localStorage.removeItem("end-time-timer-ui-state");

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (timeRemaining > 0) {
      analytics.trackTimerComplete("end-time-timer", timeRemaining);
    }

    toast({
      title: "Timer Reset",
      description:
        "The timer has been reset. Set a new duration to start again.",
    });
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
    toast({
      title: soundEnabled ? "Sound Disabled" : "Sound Enabled",
      description: `Sounds are now ${soundEnabled ? "off" : "on"}.`,
    });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);

    if (
      !notificationsEnabled &&
      "Notification" in window &&
      Notification.permission !== "granted"
    ) {
      Notification.requestPermission();
    }

    toast({
      title: notificationsEnabled
        ? "Notifications Disabled"
        : "Notifications Enabled",
      description: `Notifications are now ${
        notificationsEnabled ? "off" : "on"
      }.`,
    });
  };

  const formatTimeWords = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    if (minutes === 0) {
      return `${seconds} seconds`;
    } else if (minutes === 1) {
      return seconds === 0 ? `1 minute` : `1 minute and ${seconds} seconds`;
    } else {
      return seconds === 0
        ? `${minutes} minutes`
        : `${minutes} minutes and ${seconds} seconds`;
    }
  };

  const timeDisplay = formatTime(timeRemaining);

  return (
    <>
      <SEO
        title="Timer Until Time | Countdown Timer to Specific Time & Online Clock"
        description="The best free online timer until time. Set a countdown timer to specific time, track time until event, midnight, or new year. Simple, precise online countdown clock."
        keywords="timer until time, countdown timer to specific time, online countdown clock, time until event timer, countdown timer until new year, timer until midnight, how long until specific date, free online timer to time"
        canonicalUrl="https://studyclock.com/end-time-timer"
      />
      <PageLayout className="text-white font-sans">
        <Navigation />

        <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="w-full max-w-6xl mx-auto">
            {/* Hero section */}
            <div className="text-center mb-10 md:mb-12 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300">
                Timer Until Time - Online Countdown Clock
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
                Track time with our precise <strong>timer until time</strong>{" "}
                tool. Whether you need a{" "}
                <strong>countdown timer to specific time</strong>, a{" "}
                <strong>timer until midnight</strong>, or a{" "}
                <strong>time until event timer</strong>, our online countdown
                clock has you covered.
              </p>
            </div>

            {/* Main timer section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Main timer card */}
              <div className="lg:col-span-2 bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl">
                {/* Timer Duration Input Section */}
                {!hasStarted && (
                  <div className="mb-6 sm:mb-8">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      <Timer className="inline-block mr-2 w-4 h-4" />
                      Set Timer Duration
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 items-end">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Hours
                          </label>
                          <Input
                            type="number"
                            value={hours}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (
                                val === "" ||
                                (parseInt(val) >= 0 && parseInt(val) <= 99)
                              ) {
                                setHours(val);
                              }
                            }}
                            min="0"
                            max="99"
                            className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Minutes
                          </label>
                          <Input
                            type="number"
                            value={minutes}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (
                                val === "" ||
                                (parseInt(val) >= 0 && parseInt(val) < 60)
                              ) {
                                setMinutes(val);
                              }
                            }}
                            min="0"
                            max="59"
                            className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleSetEndTime}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Timer
                      </Button>
                    </div>
                    {(parseInt(hours) > 0 || parseInt(minutes) > 0) && (
                      <p className="mt-2 text-sm text-gray-400">
                        Timer duration:{" "}
                        <span className="text-cyan-400 font-medium">
                          {parseInt(hours) || 0}h {parseInt(minutes) || 0}m
                        </span>
                      </p>
                    )}
                  </div>
                )}

                {/* Current Session Stats */}
                {hasStarted && endTime && (
                  <div className="flex flex-wrap justify-between items-center mb-6 text-sm sm:text-base">
                    <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
                      <Clock size={18} className="mr-2 text-cyan-400" />
                      <span>Ends at: {endTime.toLocaleTimeString()}</span>
                    </div>

                    <div className="flex items-center px-3 py-1 bg-white/10 rounded-full mt-2 sm:mt-0">
                      <BookOpen size={18} className="mr-2 text-emerald-400" />
                      <span>Sessions Today: {studySessionCount}</span>
                    </div>
                  </div>
                )}

                {/* Timer display */}
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto mb-6 sm:mb-8">
                  {/* Outer spinning ring */}
                  <div
                    className={`absolute inset-0 rounded-full border-[6px] transition-all duration-500 ${
                      isRunning
                        ? "border-teal-400/70 animate-spin-slow shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                        : "border-gray-600/60"
                    }`}
                  ></div>

                  {/* Middle spinning ring */}
                  <div
                    className={`absolute inset-[10px] rounded-full border-[4px] transition-all duration-500 ${
                      isRunning
                        ? "border-blue-400/70 animate-spin-medium shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                        : "border-gray-700/50"
                    }`}
                  ></div>

                  {/* Inner content */}
                  <div className="absolute inset-[20px] rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-inner">
                    <div className="text-center w-full px-2">
                      {/* Main time display */}
                      {hasStarted ? (
                        <>
                          <p className="text-3xl sm:text-4xl md:text-5xl font-mono tracking-wider">
                            <span className="text-white">
                              {timeDisplay.hours}
                            </span>
                            <span className="text-cyan-400">:</span>
                            <span className="text-white">
                              {timeDisplay.minutes}
                            </span>
                            <span className="text-cyan-400">:</span>
                            <span className="text-white">
                              {timeDisplay.seconds}
                            </span>
                          </p>

                          {/* Status text */}
                          <p className="text-xs sm:text-sm text-gray-400 mt-2">
                            {isRunning
                              ? "COUNTING DOWN"
                              : timeRemaining > 0
                                ? "PAUSED"
                                : "COMPLETE"}
                          </p>

                          {/* Study indicator */}
                          {isRunning && (
                            <div className="mt-2 flex justify-center">
                              <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-ping"></span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-gray-400">
                          <p className="text-lg sm:text-xl mb-2">
                            Set End Time
                          </p>
                          <p className="text-xs sm:text-sm">to start timer</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                {hasStarted && (
                  <div className="flex justify-center items-center space-x-4 sm:space-x-6">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleReset}
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white hover:bg-white/10 h-12 w-12 rounded-full"
                        >
                          <RotateCcw size={22} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Reset Timer</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={isRunning ? handlePause : handleStart}
                          size="lg"
                          disabled={timeRemaining <= 0}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full text-white shadow-lg transition-all duration-300 ${
                            timeRemaining <= 0
                              ? "bg-gray-500 cursor-not-allowed"
                              : isRunning
                                ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                                : "bg-green-500 hover:bg-green-600 shadow-green-500/20"
                          }`}
                        >
                          {isRunning ? <Pause size={28} /> : <Play size={28} />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {timeRemaining <= 0
                            ? "Timer Complete"
                            : isRunning
                              ? "Pause Timer"
                              : "Resume Timer"}
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <div className="flex space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={toggleSound}
                            variant="ghost"
                            size="icon"
                            className={`text-gray-400 hover:text-white hover:bg-white/10 h-12 w-12 rounded-full ${
                              soundEnabled ? "text-cyan-400" : ""
                            }`}
                          >
                            {soundEnabled ? (
                              <Volume2 size={20} />
                            ) : (
                              <VolumeX size={20} />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {soundEnabled ? "Disable Sound" : "Enable Sound"}
                          </p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={toggleNotifications}
                            variant="ghost"
                            size="icon"
                            className={`text-gray-400 hover:text-white hover:bg-white/10 h-12 w-12 rounded-full ${
                              notificationsEnabled ? "text-cyan-400" : ""
                            }`}
                          >
                            {notificationsEnabled ? (
                              <Bell size={20} />
                            ) : (
                              <BellOff size={20} />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {notificationsEnabled
                              ? "Disable Notifications"
                              : "Enable Notifications"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>

              {/* Study Suggestions Panel */}
              <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Brain className="mr-2 text-purple-400" size={20} />
                  Timer Tips
                </h2>

                <ul className="space-y-4 text-gray-300">
                  <li className="flex">
                    <div className="mr-3 text-teal-500">•</div>
                    <div>
                      <strong className="text-white block">
                        Set Clear Goals
                      </strong>
                      <p className="text-sm">
                        Define what you want to accomplish before setting your
                        end time.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="mr-3 text-teal-500">•</div>
                    <div>
                      <strong className="text-white block">
                        Time Management
                      </strong>
                      <p className="text-sm">
                        Use this timer to track time until meetings, deadlines,
                        or study sessions end.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="mr-3 text-teal-500">•</div>
                    <div>
                      <strong className="text-white block">Stay Focused</strong>
                      <p className="text-sm">
                        Keep track of how much time remains until your target
                        time.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="mr-3 text-teal-500">•</div>
                    <div>
                      <strong className="text-white block">
                        Completion Alert
                      </strong>
                      <p className="text-sm">
                        Get notified when your timer reaches the end time with
                        sound and browser notifications.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 py-3 px-4 bg-blue-900/30 rounded-lg border border-blue-500/20 text-center">
                  <p className="text-sm">
                    Set your end time and start counting down to stay on track
                    with your schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <section className="mt-12 sm:mt-16 md:mt-20 bg-black/60 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-gray-800 shadow-xl text-gray-200">
              <div className="max-w-4xl mx-auto space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4">
                    The Best Online Countdown Clock for Any Event
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Our <strong>online countdown clock</strong> is designed to
                    be the ultimate solution for anyone asking, "
                    <strong>how to set countdown timer</strong> to a specific
                    time?" Unlike standard timers that just count down minutes,
                    our <strong>timer until time</strong> feature lets you input
                    an exact completion time. This makes it perfect as a{" "}
                    <strong>time until event timer</strong> for meetings,
                    classes, or deadlines.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4">
                    Track Everything: From Daily Tasks to New Year
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    This versatile tool isn't just for short durations. It helps
                    you answer "<strong>how long until specific date</strong>"
                    (using the time duration logic) or simply "how long until
                    dinner."
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2">
                    <li>
                      <strong>Countdown timer until new year</strong>: Watch the
                      seconds tick away to the big moment.
                    </li>
                    <li>
                      <strong>Timer until midnight</strong>: Perfect for
                      late-night study sessions or deadlines.
                    </li>
                    <li>
                      <strong>Custom timer until date</strong>: Visualize the
                      time remaining for your important events.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4">
                    Why Choose Our Free Online Timer to Time?
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We provide the <strong>best online countdown timer</strong>{" "}
                    experience with a focus on usability and aesthetics.
                  </p>
                  <ol className="list-decimal pl-6 text-gray-300 space-y-2">
                    <li>
                      <strong>Precision:</strong> Exact calculation as a{" "}
                      <strong>time until calculator</strong>.
                    </li>
                    <li>
                      <strong>Ease of Use:</strong> A simple interface for a{" "}
                      <strong>countdown timer to specific time</strong>.
                    </li>
                    <li>
                      <strong>Accessibility:</strong> A fully responsive{" "}
                      <strong>free timer app web</strong> accessible on any
                      device.
                    </li>
                    <li>
                      <strong>Integration:</strong> Acts like a{" "}
                      <strong>countdown timer embed</strong> for your personal
                      workspace.
                    </li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4">
                    Intent-Based Usage
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                        Informational
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Learn <strong>how to set countdown timer</strong>{" "}
                        efficiently to manage your schedule better.
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                        Commercial
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Experience the{" "}
                        <strong>best online countdown timer</strong> without any
                        cost or ads distracting you.
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                        Transactional
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Use our <strong>custom timer until date</strong> tool
                        instantly to get accurate time tracking.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4">
                    FAQ: Timer Until Time
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        1. Can I use this as a timer until midnight?
                      </h3>
                      <p className="text-gray-300">
                        Absolutely! Just calculate the hours remaining until
                        12:00 AM and set the duration. It works perfectly as a{" "}
                        <strong>timer until midnight</strong>.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        2. Is this a free online timer to time my exams?
                      </h3>
                      <p className="text-gray-300">
                        Yes, this is a <strong>free timer app web</strong> tool
                        designed for students and professionals to track time
                        accurately.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        3. How does the countdown timer to specific time work?
                      </h3>
                      <p className="text-gray-300">
                        You input the duration until your target time, and our{" "}
                        <strong>timer until time</strong> system handles the
                        rest, ending exactly when you need it to.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </PageLayout>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-medium {
          animation: spin-medium 10s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default EndTimeTimer;
