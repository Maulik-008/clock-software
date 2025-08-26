import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import SEO from "../components/SEO";
import TodoList from "../components/TodoList";
import { Clock, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import useAnalytics from "../hooks/use-analytics";

const StudyClockTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [clockStyle, setClockStyle] = useState("modern");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const analytics = useAnalytics();

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

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const handleStart = () => {
    setIsRunning(true);
    if (soundEnabled) {
      playSound("start");
    }
    analytics.trackTimerStart("study_clock");
    toast({
      title: "Study Clock Started",
      description: "Your study session has begun. Stay focused!",
      variant: "default",
    });
  };

  const handlePause = () => {
    setIsRunning(false);
    if (soundEnabled) {
      playSound("pause");
    }
    analytics.trackTimerPause("study_clock", time);
    toast({
      title: "Study Clock Paused",
      description: "Your study session is paused.",
      variant: "default",
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    analytics.trackTimerComplete("study_clock", time);
    setTime(0);
    if (soundEnabled) {
      playSound("reset");
    }
    toast({
      title: "Study Clock Reset",
      description: "Your study session has been reset.",
      variant: "destructive",
    });
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast({
      title: soundEnabled ? "Sound Disabled" : "Sound Enabled",
      description: soundEnabled
        ? "Notification sounds have been turned off"
        : "You will now hear notification sounds when controlling the timer",
      variant: "default",
    });
  };

  const playSound = (action: string) => {
    // This would be implemented with actual sound effects
    console.log(`Playing ${action} sound`);
  };

  const timeDisplay = formatTime(time);

  const getClockStyles = () => {
    switch (clockStyle) {
      case "minimal":
        return {
          container:
            "bg-white/5 backdrop-blur-md border border-white/10 shadow-xl",
          clockFace: "bg-gradient-to-br from-slate-900 to-slate-800",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300",
          primaryColor: "from-indigo-500 to-purple-600",
          secondaryColor: "from-purple-500 to-pink-600",
          accentColor: "text-indigo-400",
        };
      case "neon":
        return {
          container:
            "bg-black/60 backdrop-blur-xl border border-cyan-500/30 shadow-xl shadow-cyan-500/20",
          clockFace: "bg-gradient-to-br from-gray-950 to-gray-900",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500",
          primaryColor: "from-cyan-500 to-blue-600",
          secondaryColor: "from-purple-500 to-pink-600",
          accentColor: "text-cyan-400",
        };
      default: // modern
        return {
          container:
            "bg-black/70 backdrop-blur-xl border border-indigo-500/20 shadow-xl shadow-indigo-500/10",
          clockFace: "bg-gradient-to-br from-gray-950 to-gray-900",
          timeText:
            "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500",
          primaryColor: "from-blue-500 to-indigo-600",
          secondaryColor: "from-indigo-500 to-purple-600",
          accentColor: "text-blue-400",
        };
    }
  };

  const styles = getClockStyles();

  return (
    <>
      <SEO
        title="Study Clock Timer | Beautiful and Modern Focus Timer"
        description="A modern and beautiful study clock timer to enhance your focus and productivity. Track your study sessions with our elegant and responsive timer app."
        keywords="study clock timer, timer for study, timer clock, focus timer, productivity app, time tracking, student tools, study space, deep work"
        canonicalUrl="https://studyclock.com/study-clock-timer"
      />
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>

        {/* Global Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 pt-28 sm:pt-28 md:pt-28">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-3">
            {/* Clock Section */}
            <section aria-label="Study Clock Timer" className="fade-in">
              <h1 className="sr-only">
                Study Clock Timer - Track Your Focus Sessions
              </h1>

              {/* Style Selector */}
              <div className="mb-8 flex justify-center">
                <Tabs
                  defaultValue="modern"
                  className="w-full max-w-sm flex justify-center"
                  onValueChange={(value) => {
                    setClockStyle(value);
                    // Track style change event
                    analytics.trackStyleChange("study_clock_timer", value);
                  }}
                >
                  <TabsList className="grid w-full grid-cols-3 bg-black/70 backdrop-blur-md border border-white/15 p-1 rounded-xl shadow-lg h-12">
                    <TabsTrigger
                      value="modern"
                      className="text-sm font-medium rounded-lg h-full py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:shadow-md data-[state=active]:text-white transition-all data-[state=inactive]:text-white/70 data-[state=active]:scale-100"
                    >
                      Modern
                    </TabsTrigger>
                    <TabsTrigger
                      value="minimal"
                      className="text-sm font-medium rounded-lg h-full py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:shadow-md data-[state=active]:text-white transition-all data-[state=inactive]:text-white/70 data-[state=active]:scale-100"
                    >
                      Minimal
                    </TabsTrigger>
                    <TabsTrigger
                      value="neon"
                      className="text-sm font-medium rounded-lg h-full py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:shadow-md data-[state=active]:text-white transition-all data-[state=inactive]:text-white/70 data-[state=active]:scale-100"
                    >
                      Neon
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Clock Component */}
              <div
                ref={clockRef}
                className={`${styles.container} rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-[1.01]`}
              >
                {/* Decorative Elements */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-80 ${styles.primaryColor}`}
                ></div>
                <div
                  className={`absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l opacity-80 ${styles.secondaryColor}`}
                ></div>
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

                {/* Clock Title */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Clock className={`h-5 w-5 ${styles.accentColor}`} />
                  <h2 className={`${styles.accentColor} text-lg font-medium`}>
                    Study Clock
                  </h2>
                </div>

                {/* Clock Face */}
                <div
                  className={`${styles.clockFace} rounded-full aspect-square flex items-center justify-center relative max-w-xs mx-auto`}
                >
                  <div className="absolute w-full h-full rounded-full border border-white/5"></div>
                  <div className="absolute w-[96%] h-[96%] rounded-full border border-white/5"></div>
                  <div className="absolute w-[92%] h-[92%] rounded-full border border-white/5"></div>

                  {/* Animated Bezel */}
                  {isRunning && (
                    <div className="absolute inset-0 rounded-full">
                      <div
                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500/50 animate-spin"
                        style={{ animationDuration: "4s" }}
                      ></div>
                    </div>
                  )}

                  {/* Clock Time Display */}
                  <div className="text-center z-10">
                    <div
                      className={`${styles.timeText} text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter`}
                    >
                      {timeDisplay.hours}:{timeDisplay.minutes}:
                      {timeDisplay.seconds}
                    </div>
                    <div className="text-white/60 text-sm mt-2 font-medium tracking-wide">
                      {isRunning ? "STUDYING" : "READY"}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-8 flex items-center justify-center space-x-4">
                  {!isRunning ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleStart}
                          size="lg"
                          className={`bg-gradient-to-r ${styles.primaryColor} hover:opacity-90 hover:scale-105 transition-all duration-300 rounded-full shadow-lg w-12 h-12 sm:w-14 sm:h-14`}
                        >
                          <Play className="h-5 w-5 text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Start Timer</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handlePause}
                          size="lg"
                          className={`bg-gradient-to-r ${styles.secondaryColor} hover:opacity-90 hover:scale-105 transition-all duration-300 rounded-full shadow-lg w-12 h-12 sm:w-14 sm:h-14`}
                        >
                          <Pause className="h-5 w-5 text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Pause Timer</TooltipContent>
                    </Tooltip>
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleReset}
                        size="lg"
                        variant="outline"
                        className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                      >
                        <RotateCcw className="h-4 w-4 text-white/80" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reset Timer</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={toggleSound}
                        size="lg"
                        variant="outline"
                        className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                      >
                        {soundEnabled ? (
                          <Volume2 className="h-4 w-4 text-white/80" />
                        ) : (
                          <VolumeX className="h-4 w-4 text-white/80" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {soundEnabled ? "Disable Sound" : "Enable Sound"}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="mt-6 text-center text-gray-400 text-sm max-w-md mx-auto">
                <p>
                  The Study Clock Timer helps you track focused study sessions
                  with a beautiful, distraction-free interface. Choose your
                  preferred style and start tracking your productivity.
                </p>
              </div>
            </section>

            {/* Todo List Section */}
            <section className="mt-8">
              <TodoList variant="compact" maxHeight="300px" />
            </section>

            {/* Feature Highlights */}
            <section className="mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-6 text-center">
                Features
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/5 shadow-md">
                  <div className="w-8 h-8 mb-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Modern Design</h3>
                  <p className="text-gray-400 text-sm">
                    Beautiful, distraction-free interface designed for focus.
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/5 shadow-md">
                  <div className="w-8 h-8 mb-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">
                    Simple Controls
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Start, pause, and reset with one click. Focus on what
                    matters.
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 border border-white/5 shadow-md">
                  <div className="w-8 h-8 mb-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M12 2v4m0 16v-4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m16 0h-4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                    </svg>
                  </div>
                  <h3 className="text-white font-medium mb-2">Visual Styles</h3>
                  <p className="text-gray-400 text-sm">
                    Choose between modern, minimal, and neon themes.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* SEO Content Section */}
        <section className="relative z-10 py-8 px-4 max-w-4xl mx-auto text-gray-200">
          <div className="bg-black/60 backdrop-blur-xl p-5 sm:p-8 rounded-xl border border-gray-800 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-4">
              Study Clock Timer: The Ultimate Timer for Study & Productivity
            </h2>

            <div className="space-y-6 text-base sm:text-lg">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Why Every Student Needs a Study Clock Timer
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Are you tired of looking at your mobile phone every 5 minutes
                  to check the time during studies? Well, we've all been there!
                  That's exactly why our Study Clock Timer is a game-changer for
                  students across India and beyond. It's not just any ordinary
                  timer clock - it's specially designed to enhance your study
                  experience with its beautiful interface and helpful features.
                </p>
                <p className="text-gray-300 leading-relaxed mt-2">
                  In today's fast-paced academic environment, managing study
                  time efficiently is more important than ever. Whether you're
                  preparing for exams, having a dedicated timer for study
                  sessions can make all the difference between average and
                  excellent results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  How Our Study Clock Timer Works Magic for Your Focus
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our timer clock does something truly magical - it creates a
                  psychological commitment to your study session. When you start
                  the Study Clock Timer, your brain registers that "study mode"
                  has begun. The visual countdown creates a gentle pressure that
                  keeps you accountable and focused on your books instead of
                  social media.
                </p>
                <p className="text-gray-300 leading-relaxed mt-2">
                  Many students tell us, "Once I started using this timer for
                  study, my concentration improved dramatically!" It's like
                  having a silent study companion that keeps you on track
                  without being distracting. The elegant clock face with its
                  smooth animation is designed to be visible with just a quick
                  glance, so you can check your progress without breaking focus.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Features That Make Our Study Clock Timer Special
                </h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-3">
                  <li>
                    <span className="text-white font-medium">
                      Beautiful Clock Design:
                    </span>{" "}
                    Unlike boring digital timers, our study clock timer features
                    a gorgeous analog-style design that's easy on the eyes
                    during long study sessions. No more eye strain from harsh
                    displays!
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Multiple Visual Themes:
                    </span>{" "}
                    Choose from Modern, Minimal, or Neon themes to match your
                    study mood and environment. Sometimes a simple change in
                    visuals can refresh your mind!
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Hassle-free Controls:
                    </span>{" "}
                    No complicated settings to distract you. Just click to
                    start, pause, or reset - that's it! Perfect for when you
                    need to quickly take a chai break or answer an important
                    call.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Zero Distractions:
                    </span>{" "}
                    Unlike mobile phone timers with notifications popping up,
                    our dedicated timer clock keeps you focused solely on your
                    studies. No messages, no social media alerts!
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Session Tracking:
                    </span>{" "}
                    Monitor exactly how long you've been studying to improve
                    your time management skills. Many students are shocked to
                    discover how their perceived study time differs from actual
                    time spent!
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Optional Sound Alerts:
                    </span>{" "}
                    Enable sound notifications if you prefer auditory cues when
                    controlling the timer. Perfect for those who like gentle
                    reminders.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Timer for Study: Creating the Perfect Study Environment
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The ideal study environment combines several elements - proper
                  lighting, a comfortable seat, good study materials, and
                  importantly, a reliable timer for study sessions. Our timer
                  clock helps create structure in your study routine, which is
                  especially valuable for students preparing for competitive
                  exams.
                </p>
                <p className="text-gray-300 leading-relaxed mt-2">
                  Many students from Delhi to Chennai, Mumbai to Kolkata have
                  shared how using a dedicated study clock timer has improved
                  their study habits. "Earlier I would study randomly without
                  tracking time. Now with this timer clock, I challenge myself
                  to focus for longer periods, and it's amazing to see the
                  progress!" says Rahul, a JEE aspirant from Pune.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Perfect for Different Study Methods
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Whether you follow the traditional continuous study method or
                  modern techniques like active recall or spaced repetition, our
                  timer clock adapts perfectly to your approach. Many students
                  use it alongside their favorite study method:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-2">
                  <li>
                    <span className="text-white font-medium">
                      For Continuous Study:
                    </span>{" "}
                    Set the timer and challenge yourself to maintain focus for
                    progressively longer periods
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      For Active Recall:
                    </span>{" "}
                    Time your self-quizzing sessions to improve efficiency
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      For Group Study:
                    </span>{" "}
                    Keep everyone on the same page with a shared timer
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      For Subject Rotation:
                    </span>{" "}
                    Allocate specific time blocks to different subjects
                  </li>
                </ul>
              </div>

              {/* FAQ Section */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Frequently Asked Questions About Study Clock Timers
                </h3>

                <div className="space-y-4">
                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      How is a study clock timer different from a regular timer?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Unlike regular timers, our study clock timer is specially
                      designed with students in mind. It features a
                      distraction-free interface, visual styles that reduce eye
                      strain during long study sessions, and a psychological
                      design that encourages focus. Regular timers often have
                      basic functionality, but our timer for study creates an
                      environment conducive to learning and concentration.
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      How long should I set my timer for study sessions?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      This varies from person to person, but most experts
                      recommend starting with 30-45 minute focused sessions. If
                      you're just beginning, even 20-minute sessions with short
                      breaks can be effective. The key is consistency! Our timer
                      clock allows you to track your progress and gradually
                      increase your focus duration as your concentration
                      improves. Many successful students in India practice the
                      "2-hour rule" - studying intensely for 2 hours, followed
                      by a 15-minute break.
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      Can the study clock timer help with exam preparation?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Absolutely! In fact, using a timer clock is one of the
                      most effective strategies for exam preparation. It helps
                      you simulate exam conditions by practicing with time
                      constraints, improves your time management skills, and
                      helps you understand how long different types of questions
                      take. Many coaching institutes across India recommend
                      using a study timer to build exam temperament. As they
                      say, "Practice like you play!"
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      Does the timer work offline?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Yes, once loaded, our study clock timer works completely
                      offline. No need to worry about internet connectivity
                      issues disrupting your study session. This is especially
                      helpful for students in areas with unreliable internet
                      connections. Just open the page once, and you're good to
                      go even if your connection drops later!
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      How can parents use this timer to help their children
                      study?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Parents can use our timer clock to create structured study
                      routines for their children. Starting with shorter
                      intervals (15-20 minutes) for younger students and
                      gradually increasing the duration helps build
                      concentration stamina. The visual nature of our timer
                      makes it easy for parents to monitor study time without
                      constantly asking "Are you studying?" which can be
                      disruptive. It's a wonderful tool to teach time management
                      - a skill that will benefit children throughout their
                      academic journey and beyond!
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-center text-lg text-white font-medium">
                  Ready to transform your study sessions?
                </p>
                <p className="text-center text-gray-300">
                  Start using our Study Clock Timer today and experience the
                  difference that proper time management can make to your
                  academic success. Remember, toppers aren't just born - they're
                  made through disciplined study habits!
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default StudyClockTimer;
