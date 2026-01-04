import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import SEO from "../components/SEO";
import { useFullViewMode } from "@/hooks/use-full-view-mode";
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
  Calendar,
  Bell,
  BellOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import useAnalytics from "../hooks/use-analytics";
import ParticleBackground from "../components/ParticleBackground";

const FuturisticStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [studySessionCount, setStudySessionCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const analytics = useAnalytics();
  const { isFullView } = useFullViewMode();

  // Initialize audio
  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio("/audio/crystal.mp3");
    audioRef.current.loop = false;

    // Request notification permissions
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    return () => {
      // Clean up audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Handle stopwatch timing
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
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

  const formatTime = (totalMilliseconds: number) => {
    const minutes = Math.floor(totalMilliseconds / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: milliseconds.toString().padStart(2, "0"),
    };
  };

  // Show browser notification
  const showNotification = (title: string, body: string) => {
    if (!notificationsEnabled) return;

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        silent: true, // We'll play our own sound
      });
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Error playing start sound:", err);
      });
    }
    analytics.trackTimerStart("stopwatch");
    toast({
      title: "Study Session Started",
      description: "Your focus time is now being tracked.",
    });
  };

  const handlePause = () => {
    setIsRunning(false);
    analytics.trackTimerPause("stopwatch", time);
    toast({
      title: "Study Timer Paused",
      description: "Take a quick break and resume when ready.",
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    analytics.trackTimerComplete("stopwatch", time);

    // Increment study session count if time is significant (more than 30 seconds)
    if (time > 30000) {
      setStudySessionCount((prevCount) => prevCount + 1);
      if (soundEnabled && audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.error("Error playing completion sound:", err);
        });
      }

      if (notificationsEnabled) {
        showNotification(
          "Study Session Complete!",
          `Great job! You studied for ${formatTimeWords(
            time
          )}. Take a short break before starting again.`
        );
      }
    }

    setTime(0);

    toast({
      title: "Study Timer Reset",
      description:
        time > 30000
          ? `Well done! You completed a ${formatTimeWords(time)} study session.`
          : "The timer has been reset to zero.",
      variant: time > 30000 ? "default" : "destructive",
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

  // Format time in words for notifications and toasts
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

  const timeDisplay = formatTime(time);

  return (
    <>
      <SEO
        title="Study Stopwatch | Focus Timer for Productive Study Sessions"
        description="Boost your study focus with our online stopwatch timer. Perfect for study sessions, Pomodoro technique, and meditation. Track your progress and improve productivity."
        keywords="study stopwatch, stopwatch for study, study focus timer, online stopwatch, study meditation stopwatch, focus timer, concentration tool, pomodoro stopwatch"
        canonicalUrl="https://studyclock.com/stopwatch"
      />
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden text-white font-sans">
        <ParticleBackground />
        {!isFullView && <Navigation />}

        <main className={`relative z-10 ${isFullView ? 'pt-4' : 'pt-28'} pb-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl`}>
          <div className="w-full max-w-6xl mx-auto">
            {/* Hero section */}
            <div className="text-center mb-10 md:mb-12 animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300">
                Study Stopwatch Timer
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
                Track your study time, maintain focus, and maximize productivity
                with our precision study timer
              </p>
            </div>

            {/* Main timer section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Main stopwatch card */}
              <div className="lg:col-span-2 bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl">
                {/* Current Session Stats */}
                <div className="flex flex-wrap justify-between items-center mb-6 text-sm sm:text-base">
                  <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
                    <Clock size={18} className="mr-2 text-cyan-400" />
                    <span>Current Session</span>
                  </div>

                  <div className="flex items-center px-3 py-1 bg-white/10 rounded-full mt-2 sm:mt-0">
                    <BookOpen size={18} className="mr-2 text-emerald-400" />
                    <span>Sessions Today: {studySessionCount}</span>
                  </div>
                </div>

                {/* Stopwatch display */}
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
                      <p className="text-3xl sm:text-4xl md:text-5xl font-mono tracking-wider">
                        <span className="text-white">
                          {timeDisplay.minutes}
                        </span>
                        <span className="text-cyan-400">:</span>
                        <span className="text-white">
                          {timeDisplay.seconds}
                        </span>
                        <span className="text-cyan-400">.</span>
                        <span className="text-2xl sm:text-3xl md:text-4xl text-gray-400">
                          {timeDisplay.milliseconds}
                        </span>
                      </p>

                      {/* Status text */}
                      <p className="text-xs sm:text-sm text-gray-400 mt-2">
                        {isRunning
                          ? "FOCUS MODE"
                          : time > 0
                          ? "PAUSED"
                          : "READY"}
                      </p>

                      {/* Study indicator */}
                      {isRunning && (
                        <div className="mt-2 flex justify-center">
                          <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-ping"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls */}
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
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full text-white shadow-lg transition-all duration-300 ${
                          isRunning
                            ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                            : "bg-green-500 hover:bg-green-600 shadow-green-500/20"
                        }`}
                      >
                        {isRunning ? <Pause size={28} /> : <Play size={28} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isRunning
                          ? "Pause Study Session"
                          : "Start Study Session"}
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
                        <p>{soundEnabled ? "Disable Sound" : "Enable Sound"}</p>
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
              </div>

              {/* Study Suggestions Panel */}
              <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Brain className="mr-2 text-purple-400" size={20} />
                  Study Focus Tips
                </h2>

                <ul className="space-y-4 text-gray-300">
                  <li className="flex">
                    <div className="mr-3 text-teal-500">•</div>
                    <div>
                      <strong className="text-white block">
                        Set Clear Goals
                      </strong>
                      <p className="text-sm">
                        Define what you want to accomplish in this study session
                        before starting the timer.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="mr-3 text-teal-500">•</div>
                    <div>
                      <strong className="text-white block">Break Time</strong>
                      <p className="text-sm">
                        For every 45-50 minutes of focused study, take a 5-10
                        minute break to refresh your mind.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="mr-3 text-teal-500">•</div>
                    <div>
                      <strong className="text-white block">Deep Focus</strong>
                      <p className="text-sm">
                        Put your phone away and close distracting tabs. One task
                        at a time improves retention.
                      </p>
                    </div>
                  </li>

                  <li className="flex">
                    <div className="mr-3 text-teal-500">•</div>
                    <div>
                      <strong className="text-white block">
                        Completion Reward
                      </strong>
                      <p className="text-sm">
                        Set a small reward for yourself after completing your
                        planned study session.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 py-3 px-4 bg-blue-900/30 rounded-lg border border-blue-500/20 text-center">
                  <p className="text-sm">
                    Track your focus time and build better study habits with our
                    stopwatch timer.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            {!isFullView && (
            <section className="mt-12 sm:mt-16 md:mt-20 bg-black/60 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-gray-800 shadow-xl text-gray-200">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-6">
                  Maximize Your Study Effectiveness with Our Online Stopwatch
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Why Use a Study Stopwatch?
                    </h3>
                    <p className="text-gray-300">
                      Using a dedicated study stopwatch helps you build
                      awareness of how you spend your study time. Research shows
                      that time tracking increases productivity by up to 30% by
                      creating accountability and revealing patterns in your
                      focus levels. Our online stopwatch for studying provides
                      precise timing with millisecond accuracy, helping you
                      track exactly how much time you're dedicating to each
                      subject or topic.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Study Focus Techniques Using a Stopwatch
                    </h3>
                    <p className="text-gray-300 mb-3">
                      A study focus stopwatch is more than just a timer – it's a
                      powerful tool for implementing proven study methods that
                      enhance concentration and retention:
                    </p>
                    <ul className="list-disc pl-5 text-gray-300 space-y-2">
                      <li>
                        <span className="text-white font-medium">
                          The Pomodoro Technique:
                        </span>{" "}
                        Use our stopwatch to time focused 25-minute study blocks
                        followed by 5-minute breaks, proven to maintain optimal
                        concentration levels.
                      </li>
                      <li>
                        <span className="text-white font-medium">
                          Meditation Intervals:
                        </span>{" "}
                        Begin each study session with 5 minutes of mindfulness,
                        using our stopwatch to time your meditation practice for
                        improved focus.
                      </li>
                      <li>
                        <span className="text-white font-medium">
                          52/17 Method:
                        </span>{" "}
                        Research shows 52 minutes of focused work followed by 17
                        minutes of rest optimizes productivity. Our study
                        stopwatch makes tracking these intervals simple.
                      </li>
                      <li>
                        <span className="text-white font-medium">
                          Personal Record Tracking:
                        </span>{" "}
                        Challenge yourself to extend your uninterrupted study
                        time, creating a positive competition with yourself.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Benefits of Our Online Study Stopwatch
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="font-medium text-white mb-2 flex items-center">
                          <Clock size={16} className="mr-2 text-cyan-400" />
                          Precision Timing
                        </h4>
                        <p className="text-sm text-gray-300">
                          Millisecond accuracy helps you track study time
                          precisely, enabling detailed analysis of your study
                          patterns.
                        </p>
                      </div>

                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="font-medium text-white mb-2 flex items-center">
                          <Bell size={16} className="mr-2 text-cyan-400" />
                          Audio & Visual Notifications
                        </h4>
                        <p className="text-sm text-gray-300">
                          Customizable notifications alert you when it's time to
                          switch subjects or take a break, even if you're
                          focused elsewhere.
                        </p>
                      </div>

                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="font-medium text-white mb-2 flex items-center">
                          <BookOpen size={16} className="mr-2 text-cyan-400" />
                          Session Tracking
                        </h4>
                        <p className="text-sm text-gray-300">
                          Keep count of completed study sessions to build
                          momentum and maintain motivation throughout your
                          learning journey.
                        </p>
                      </div>

                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h4 className="font-medium text-white mb-2 flex items-center">
                          <Timer size={16} className="mr-2 text-cyan-400" />
                          Distraction-Free Interface
                        </h4>
                        <p className="text-sm text-gray-300">
                          Our minimal, eye-friendly design eliminates
                          distractions while providing all the features needed
                          for effective study timing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      How to Use This Study Stopwatch Effectively
                    </h3>
                    <p className="text-gray-300 mb-3">
                      To get the most from our study stopwatch tool, follow
                      these research-backed practices:
                    </p>
                    <ol className="list-decimal pl-5 text-gray-300 space-y-2">
                      <li>
                        Plan your study tasks before starting the stopwatch
                      </li>
                      <li>Set a target study time goal for each session</li>
                      <li>Eliminate distractions before pressing start</li>
                      <li>
                        Record your completed sessions to track progress over
                        time
                      </li>
                      <li>
                        Use the built-in sound notifications to maintain
                        awareness of time
                      </li>
                      <li>
                        Gradually increase your focused study duration as your
                        concentration improves
                      </li>
                    </ol>
                    <p className="text-gray-300 mt-3">
                      With consistent practice, you'll be able to extend your
                      deep focus periods while maintaining high retention rates.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                      Ready to Transform Your Study Sessions?
                    </h3>
                    <p className="text-gray-300 text-center">
                      Start the stopwatch above and commit to focused, timed
                      study sessions. Track your progress, build consistent
                      study habits, and watch your productivity soar.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            )}
          </div>
        </main>

        {!isFullView && <Footer />}
      </div>

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

export default FuturisticStopwatch;
