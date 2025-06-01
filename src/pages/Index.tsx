import React, { useState, useEffect } from "react";
import ClockTimer from "../components/ClockTimer";
import CountdownTimer from "../components/CountdownTimer";
import PomodoroTimer from "../components/PomodoroTimer";
import ParticleBackground from "../components/ParticleBackground";
import Navigation from "../components/Navigation";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";

type AppMode = "timer" | "countdown" | "pomodoro";
type PomodoroMode = "pomodoro" | "shortBreak" | "longBreak";

const Index = () => {
  const [mode, setMode] = useState<AppMode>("pomodoro");
  const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>("pomodoro");

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
        return "Track your study sessions with StudyClock.com's beautiful dark mode clock timer. Perfect for pomodoro technique and academic productivity tracking.";
      case "countdown":
        return "Set focused study sessions with StudyClock.com's countdown timer. Beautiful dark mode themes help you concentrate and stay productive.";
      case "pomodoro":
        return pomodoroMode === "pomodoro"
          ? "Boost your productivity with StudyClock.com's Pomodoro technique. Focus for 25 minutes, then take a short break to maximize learning efficiency."
          : pomodoroMode === "shortBreak"
          ? "Take a 5-minute short break between your focus sessions to recharge with StudyClock.com. Maintain peak mental performance."
          : "Take a 15-minute long break after completing multiple focus sessions with StudyClock.com. Reset your mind for continued productivity.";
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {getTitle()} - StudyClock.com | Boost Your Academic Success
        </title>
        <meta name="description" content={getDescription()} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="canonical"
          href={`https://studyclock.com/${mode === "timer" ? "clock" : mode}`}
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
        <main className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 pt-16 sm:pt-18 md:pt-20">
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
          </div>
        </main>

        {/* StudyClock Information Section */}
        <section className="relative z-10 py-8 px-4 max-w-4xl mx-auto text-gray-200">
          <div className="bg-black/60 backdrop-blur-xl p-5 sm:p-8 rounded-xl border border-gray-800 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              StudyClock.com – Your Academic & Professional Edge
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
                      ✓
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
                      ✓
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
                      ✓
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
                      ✓
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
                      ✓
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
                      ✓
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

        <Footer />
      </div>
    </>
  );
};

export default Index;
