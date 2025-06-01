import React, { useState } from "react";
import ClockTimer from "../components/ClockTimer";
import CountdownTimer from "../components/CountdownTimer";
import PomodoroTimer from "../components/PomodoroTimer";
import ParticleBackground from "../components/ParticleBackground";
import Navigation from "../components/Navigation";
import { Helmet } from "react-helmet";

type AppMode = "timer" | "countdown" | "pomodoro";
type PomodoroMode = "pomodoro" | "shortBreak" | "longBreak";

const Index = () => {
  const [mode, setMode] = useState<AppMode>("timer");
  const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>("pomodoro");

  const getTitle = () => {
    switch (mode) {
      case "timer":
        return "Clock Timer";
      case "countdown":
        return "Countdown Timer";
      case "pomodoro":
        return pomodoroMode === "pomodoro"
          ? "Pomodoro Timer"
          : pomodoroMode === "shortBreak"
          ? "Short Break Timer"
          : "Long Break Timer";
    }
  };

  const getDescription = () => {
    switch (mode) {
      case "timer":
        return "Track your study sessions with our beautiful dark mode clock timer. Perfect for pomodoro technique and productivity tracking.";
      case "countdown":
        return "Set focused study sessions with our countdown timer. Beautiful dark mode themes help you concentrate and stay productive.";
      case "pomodoro":
        return pomodoroMode === "pomodoro"
          ? "Boost your productivity with the Pomodoro technique. Focus for 25 minutes, then take a short break."
          : pomodoroMode === "shortBreak"
          ? "Take a 5-minute short break between your focus sessions to recharge."
          : "Take a 15-minute long break after completing multiple focus sessions.";
    }
  };

  return (
    <>
      <Helmet>
        <title>{getTitle()} - Study Timer App | Focus Better</title>
        <meta name="description" content={getDescription()} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <ParticleBackground />
        <Navigation
          currentMode={mode}
          onModeChange={setMode}
          pomodoroSubMode={pomodoroMode}
          onPomodoroSubModeChange={
            mode === "pomodoro" ? setPomodoroMode : undefined
          }
        />
        <main className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 md:pt-24">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
            {mode === "timer" ? (
              <section aria-label="Clock Timer" className="fade-in">
                <h1 className="sr-only">
                  Clock Timer - Track Your Study Sessions
                </h1>
                <ClockTimer />
                <div className="mt-4 text-center text-gray-400 text-sm">
                  <p className="hidden">
                    Track your study and work sessions with our elegant clock
                    timer. Perfect for the pomodoro technique.
                  </p>
                </div>
              </section>
            ) : mode === "countdown" ? (
              <section aria-label="Countdown Timer" className="fade-in">
                <h1 className="sr-only">
                  Countdown Timer - Set Focused Study Sessions
                </h1>
                <CountdownTimer />
                <div className="mt-4 text-center text-gray-400 text-sm">
                  <p className="hidden">
                    Set focused study sessions with our beautiful countdown
                    timer. Multiple themes to match your style.
                  </p>
                </div>
              </section>
            ) : (
              <section aria-label="Pomodoro Timer" className="fade-in">
                <h1 className="sr-only">
                  {getTitle()} - Boost Your Productivity
                </h1>
                <PomodoroTimer initialMode={pomodoroMode} />
                <div className="mt-4 text-center text-gray-400 text-sm">
                  <p className="hidden">
                    Use the Pomodoro technique to boost your productivity.
                    25-minute focus sessions with short and long breaks.
                  </p>
                </div>
              </section>
            )}
          </div>
        </main>

        {/* Study Timer Information Section */}
        <section className="relative z-10 py-12 px-4 max-w-4xl mx-auto text-gray-200">
          <div className="bg-black/60 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-gray-800 shadow-xl">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              Elevate Your Productivity with Study Timer
            </h2>

            <div className="space-y-6 text-sm sm:text-base">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  What is Study Timer?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Study Timer is a sophisticated time management application
                  designed to maximize your productivity and focus. With its
                  elegant dark mode interface and multiple timer options, Study
                  Timer helps you structure your work sessions effectively,
                  whether you're studying, coding, writing, or working on any
                  creative project.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Time Management That Works
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our application incorporates scientifically-backed time
                  management techniques, including the popular Pomodoro method.
                  By alternating focused work sessions with strategic breaks,
                  Study Timer helps you maintain peak mental performance while
                  preventing burnout and mental fatigue.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  How to Use Study Timer
                </h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>
                    Choose your preferred timer mode: Clock Timer, Countdown
                    Timer, or Pomodoro Timer
                  </li>
                  <li>
                    For Pomodoro sessions, use the 25-minute focus intervals
                    followed by 5-minute short breaks
                  </li>
                  <li>
                    After completing 4 focus sessions, take a longer 15-minute
                    break to recharge
                  </li>
                  <li>
                    Use the beautiful visual themes to create an environment
                    that enhances your concentration
                  </li>
                  <li>
                    Track your progress and build consistent productivity habits
                    over time
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Multiple Timer Modes
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Clock, Countdown, and Pomodoro timers for different
                        needs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Beautiful Dark Themes
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Eye-friendly interface with dynamic color schemes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Visual Effects</h4>
                      <p className="text-gray-400 text-sm">
                        Subtle animations and particle backgrounds for a focused
                        atmosphere
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Zero Distractions
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Clean, minimalist interface that keeps you focused on
                        your work
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Mobile & Desktop
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Works seamlessly across all your devices with responsive
                        design
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        Completely Free
                      </h4>
                      <p className="text-gray-400 text-sm">
                        All features available at no cost, no account required
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Why Time Management Matters
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Research shows that our brains work best in focused bursts
                  rather than extended periods. The Study Timer approach helps
                  you harness your natural cognitive rhythms, leading to
                  improved concentration, better work quality, and reduced
                  mental fatigue. By structuring your work and break periods
                  effectively, you'll accomplish more while feeling less
                  stressed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative z-10 pb-4 text-center text-gray-500 text-xs">
          <p>Study Timer - Focus Better, Achieve More</p>
        </footer>
      </div>
    </>
  );
};

export default Index;
