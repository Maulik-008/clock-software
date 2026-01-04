import React, { useState, useEffect } from "react";
import ClockTimer from "../components/ClockTimer";
import CountdownTimer from "../components/CountdownTimer";
import PomodoroTimer from "../components/PomodoroTimer";
import ParticleBackground from "../components/ParticleBackground";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import TodoList from "../components/TodoList";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFullViewMode } from "@/hooks/use-full-view-mode";

type AppMode = "timer" | "countdown" | "pomodoro" | "clock";
type PomodoroMode = "pomodoro" | "shortBreak" | "longBreak";

const Index = () => {
  const [mode, setMode] = useState<AppMode>("pomodoro");
  const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>("pomodoro");
  const navigate = useNavigate();
  const { isFullView } = useFullViewMode();

  useEffect(() => {
    document.documentElement.classList.add("text-base", "md:text-lg");

    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
    }
  }, []);

  useEffect(() => {
    if (mode === "clock") {
      navigate("/study-clock-timer");
    }
  }, [mode, navigate]);

  const getTitle = () => {
    switch (mode) {
      case "timer":
        return "Focus Timer & Time Tracker";
      case "countdown":
        return "Countdown Timer";
      case "clock":
        return "Study Clock Timer";
      case "pomodoro":
        return pomodoroMode === "pomodoro"
          ? "Study With Me Pomodoro Timer"
          : pomodoroMode === "shortBreak"
          ? "5-Minute Break Timer – Recharge & Refocus"
          : "15-Minute Long Break Timer – Reset & Refresh";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "timer":
        return "Track your study time with StudyClock.com's sleek focus timer. Ideal for deep work, time blocking, and maximizing productivity with the Pomodoro method.";
      case "countdown":
        return "Boost concentration with StudyClock.com's countdown timer. Great for students, professionals, and anyone managing focus-driven sessions.";
      case "clock":
        return "Beautiful clock timer with elegant design to track your study sessions. Perfect for visualizing your focus time with an engaging interface.";
      case "pomodoro":
        return pomodoroMode === "pomodoro"
          ? "Start your Pomodoro session with StudyClock.com – 25 minutes of focused work followed by strategic breaks. Perfect for students and remote workers."
          : pomodoroMode === "shortBreak"
          ? "Take a short 5-minute break after deep focus sessions with StudyClock.com. Recharge for the next Pomodoro cycle."
          : "Take a longer 15-minute break after multiple Pomodoro cycles to refresh your mind and maintain peak productivity on StudyClock.com.";
    }
  };

  // Function to determine the correct path for canonical URL based on mode
  const getCanonicalPath = () => {
    switch (mode) {
      case "timer":
        return "/study-timer";
      case "countdown":
        return "/counter";
      case "pomodoro":
        return "/pomodoro-timer";
      case "clock":
        return "/study-clock-timer";
      default:
        return "/";
    }
  };

  return (
    <>
      <SEO
        title={`${getTitle()} - StudyClock.com`}
        description={getDescription()}
        keywords="study timer, pomodoro, clock timer, countdown timer, productivity, focus timer, time management"
        canonicalUrl="https://studyclock.com/"
      />
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <ParticleBackground />
        {!isFullView && (
          <Navigation
            currentMode={mode}
            onModeChange={setMode}
            pomodoroSubMode={pomodoroMode}
            onPomodoroSubModeChange={
              mode === "pomodoro" ? setPomodoroMode : undefined
            }
          />
        )}
        <main className={`relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 ${isFullView ? 'pt-4' : 'pt-16 sm:pt-18 md:pt-20'}`}>
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
            {mode === "timer" ? (
              <section aria-label="Clock Timer" className="fade-in">
                <h1 className="sr-only">
                  Clock Timer - Track Your Study Sessions with StudyClock
                </h1>
                <ClockTimer />
                <div className="mt-4 text-center text-gray-400 text-base">
                  <p className="hidden">
                    Track your study and work sessions with our elegant clock
                    timer. Perfect for the pomodoro technique.
                  </p>
                </div>
              </section>
            ) : mode === "countdown" ? (
              <section aria-label="Countdown Timer" className="fade-in">
                <h1 className="sr-only">
                  Countdown Timer - Set Focused Study Sessions with StudyClock
                </h1>
                <CountdownTimer />
                <div className="mt-4 text-center text-gray-400 text-base">
                  <p className="hidden">
                    Set focused study sessions with our beautiful countdown
                    timer. Multiple themes to match your style.
                  </p>
                </div>
              </section>
            ) : (
              <section aria-label="Pomodoro Timer" className="fade-in">
                <h1 className="sr-only">
                  {getTitle()} - Boost Your Productivity with StudyClock
                </h1>
                <PomodoroTimer initialMode={pomodoroMode} />
                <div className="mt-4 text-center text-gray-400 text-base">
                  <p className="hidden">
                    Use the Pomodoro technique to boost your productivity.
                    25-minute focus sessions with short and long breaks.
                  </p>
                </div>
              </section>
            )}

            {/* Todo List Component */}
            {!isFullView && (
              <div className="mt-8">
                <TodoList variant="full" maxHeight="350px" />
              </div>
            )}
          </div>
        </main>

        {/* Internal Navigation Links */}
        {!isFullView && (
        <section className="relative z-10 pt-4 pb-8 px-4 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 text-center">
            Choose Your Productivity Tool
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/50 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-5 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                Study Timer
              </h3>
              <p className="text-gray-300 text-center mb-4">
                Track your study sessions with our aesthetic timer app. Perfect
                for "study with me" sessions and continuous focus time tracking.
              </p>
              <Link
                to="/study-timer"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 text-center"
              >
                Open Study Timer
              </Link>
            </div>

            <div className="bg-black/50 backdrop-blur-lg rounded-xl border border-blue-900/50 p-5 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                Study Clock Timer
              </h3>
              <p className="text-gray-300 text-center mb-4">
                Beautiful analog-style clock timer with modern design. Track
                your focus time with an elegant and engaging visual interface.
              </p>
              <Link
                to="/study-clock-timer"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 text-center"
              >
                Open Clock Timer
              </Link>
            </div>

            <div className="bg-black/50 backdrop-blur-lg rounded-xl border border-purple-900/50 p-5 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">
                Countdown Timer
              </h3>
              <p className="text-gray-300 text-center mb-4">
                Set focused intervals with our break timer. Perfect for timed
                study sessions, exam preparation, and task-based timing.
              </p>
              <Link
                to="/counter"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-400 hover:to-pink-500 transition-all duration-300 text-center"
              >
                Open Countdown Timer
              </Link>
            </div>

            <div className="bg-black/50 backdrop-blur-lg rounded-xl border border-red-900/50 p-5 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-rose-400 mb-3">
                Pomodoro Timer
              </h3>
              <p className="text-gray-300 text-center mb-4">
                Boost productivity with the 25/5 tomato technique. Structured
                focus and break intervals for optimal concentration.
              </p>
              <Link
                to="/pomodoro-timer"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium hover:from-red-400 hover:to-rose-500 transition-all duration-300 text-center"
              >
                Open Pomodoro Timer
              </Link>
            </div>
          </div>
        </section>
        )}

        {/* StudyClock Information Section */}
        {!isFullView && (
        <section className="relative z-10 py-8 px-4 max-w-4xl mx-auto text-gray-200">
          <div className="bg-black/60 backdrop-blur-xl p-5 sm:p-8 rounded-xl border border-gray-800 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              StudyClock.com – Best Study & Productivity Timer | Pomodoro, Task
              Tracking & Focus Toolsmote Work
            </h2>

            <div className="space-y-6 text-base sm:text-lg">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  What is StudyClock.com?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  StudyClock.com isn't just another Pomodoro app; it's your
                  dedicated partner for academic and professional success. This
                  modern, distraction-free time management tool helps students,
                  professionals, and creatives stay focused, productive, and
                  organized. With its elegant dark mode interface and versatile
                  timer options (including Pomodoro, Clock, and Countdown),
                  StudyClock.com empowers you to structure your work
                  effectively, whether you're studying for exams, coding an
                  assignment, writing papers, or working remotely.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Time Management Backed by Science
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Unlike ordinary timers, StudyClock.com leverages
                  scientifically-backed strategies like the Pomodoro Technique,
                  breaking down daunting tasks into manageable, focused
                  intervals. By alternating intense work bursts with strategic
                  short breaks, StudyClock.com helps you absorb information more
                  effectively, maintain peak concentration, and prevent the
                  burnout that can derail your goals. This technique is proven
                  to reduce mental fatigue, boost concentration, and increase
                  task completion rates. Stop cramming, start working smarter.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  How to Use StudyClock.com for Success
                </h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>
                    <span className="text-white font-medium">
                      Choose Your Mode:
                    </span>{" "}
                    Select Pomodoro Timer (ideal for deep work on chapters or
                    projects), Clock Timer (track overall duration for a
                    specific subject), or Countdown Timer (perfect for timed
                    practice or focused revision).
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Focus & Conquer:
                    </span>{" "}
                    For Pomodoro sessions, dive into your material for the set
                    interval (typically 25 minutes). StudyClock.com will keep
                    you on track.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Recharge Smartly:
                    </span>{" "}
                    Use the short 5-minute breaks to stretch, hydrate, or
                    quickly review key concepts.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      The Long Haul Advantage:
                    </span>{" "}
                    After 4 focus sessions, take a longer 15-minute break to
                    fully reset and maintain stamina.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Personalize Your Zone:
                    </span>{" "}
                    Use our beautiful visual themes and subtle effects to create
                    an environment that enhances your concentration.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Build Winning Habits:
                    </span>{" "}
                    Track your focused work hours and see your progress,
                    building consistency and motivation for even the toughest
                    tasks.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Key Features of StudyClock.com
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Versatile Timer Modes
                      </h4>
                      <p className="text-gray-400">
                        Tailor your sessions with Pomodoro for structured
                        learning, Clock Timer for overall tracking, and
                        Countdown for specific tasks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3c.53 0 1.039.211 1.414.586s.586.884.586 1.414c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586z"></path>
                        <path d="M18 12c.53 0 1.039.211 1.414.586s.586.884.586 1.414c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586z"></path>
                        <path d="M6 12c.53 0 1.039.211 1.414.586s.586.884.586 1.414c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586z"></path>
                        <path d="M12 18c.53 0 1.039.211 1.414.586s.586.884.586 1.414c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Eye-Friendly Dark Themes
                      </h4>
                      <p className="text-gray-400">
                        Reduce eye strain during late-night work marathons with
                        our dynamic and beautiful color schemes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center text-white text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Focus-Enhancing Visuals
                      </h4>
                      <p className="text-gray-400">
                        Subtle animations and particle backgrounds create a
                        calm, engaging, and productive atmosphere.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                        <path d="M9 12h6"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Zero Distraction Interface
                      </h4>
                      <p className="text-gray-400">
                        Clean, minimalist design that keeps your attention
                        squarely on your work, not on complex settings.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center text-white text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="14"
                          height="20"
                          x="5"
                          y="2"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M12 18h.01"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Study Anywhere, Anytime
                      </h4>
                      <p className="text-gray-400">
                        Fully responsive design ensures StudyClock.com works
                        perfectly on your laptop, tablet, or phone.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Completely Free & Accessible
                      </h4>
                      <p className="text-gray-400">
                        All features available at no cost, and no account is
                        required to start focusing immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Why Effective Time Management is Crucial
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Mastering your time is mastering your goals. Unlike generic
                  timers, StudyClock.com understands the unique pressures
                  students and professionals face. Research confirms that
                  focused, short bursts of work are more effective than long,
                  draining sessions. The StudyClock.com approach helps you:
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mt-3">
                  <li>Improve comprehension and retention of information</li>
                  <li>
                    Combat procrastination and break down overwhelming tasks
                    into achievable steps
                  </li>
                  <li>
                    Reduce anxiety through consistent, effective preparation
                  </li>
                  <li>
                    Boost productivity for writing, research, and creative
                    projects
                  </li>
                  <li>
                    Enhance overall well-being by achieving goals without
                    sacrificing mental health
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <p className="text-center text-lg text-white font-medium">
                  Ready to Transform Your Work Habits?
                </p>
                <p className="text-center text-gray-300">
                  Start focusing with StudyClock.com today – it's free and built
                  for your success!
                </p>
              </div>
            </div>
          </div>
        </section>
        )}

        {!isFullView && <Footer />}
      </div>
    </>
  );
};

export default Index;
