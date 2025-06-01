import React from "react";
import CountdownTimer from "../components/CountdownTimer";
import ParticleBackground from "../components/ParticleBackground";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Counter = () => {
  return (
    <>
      <Helmet>
        <title>Countdown Timer | Focus Timer for Study & Work</title>
        <meta
          name="description"
          content="Free countdown timer app for focused study sessions. Our aesthetic break timer helps you manage time effectively with customizable intervals. Perfect for exam preparation, task management, and productivity enhancement."
        />
        <meta
          name="keywords"
          content="countdown timer, focus timer, break timer, timer app, timing application, aesthetic timer, productivity app, task management, time tracking, student tools, exam timer, timed study sessions"
        />
        <link rel="canonical" href="https://studyclock.com/counter" />
      </Helmet>
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <ParticleBackground />
        <header className="fixed top-2 sm:top-3 md:top-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-3 sm:px-4">
          <div className="flex flex-col items-center mb-1">
            <h1 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-1">
              <Link to="/">StudyClock.com</Link>
            </h1>
          </div>
          <nav className="flex flex-wrap sm:flex-nowrap justify-center gap-1 p-1 bg-black/70 backdrop-blur-xl rounded-lg md:rounded-xl border border-white/20 shadow-xl">
            <Link
              to="/study-timer"
              className="group relative flex items-center justify-center space-x-1 sm:space-x-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md md:rounded-lg transition-all duration-300 transform hover:scale-105 flex-1 bg-white/5 hover:bg-white/10"
            >
              <span className="text-white/90 font-medium tracking-wide text-xs sm:text-sm">
                STUDY TIMER
              </span>
            </Link>
            <Link
              to="/counter"
              className="group relative flex items-center justify-center space-x-1 sm:space-x-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md md:rounded-lg transition-all duration-300 transform hover:scale-105 flex-1 bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30"
            >
              <span className="text-white/90 font-medium tracking-wide text-xs sm:text-sm">
                COUNTDOWN
              </span>
            </Link>
            <Link
              to="/pomodoro-timer"
              className="group relative flex items-center justify-center space-x-1 sm:space-x-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md md:rounded-lg transition-all duration-300 transform hover:scale-105 flex-1 bg-white/5 hover:bg-white/10"
            >
              <span className="text-white/90 font-medium tracking-wide text-xs sm:text-sm">
                POMODORO
              </span>
            </Link>
          </nav>
        </header>
        <main className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 pt-16 sm:pt-18 md:pt-20">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
            <section aria-label="Countdown Timer" className="fade-in">
              <h1 className="sr-only">
                Countdown Timer - Focus Timer for Study Sessions
              </h1>
              <CountdownTimer />
              <div className="mt-4 text-center text-gray-400 text-base">
                <p>
                  Create focused study and work intervals with our beautiful
                  countdown timer. Set your time and boost your productivity
                  instantly.
                </p>
              </div>
            </section>
          </div>
        </main>

        {/* SEO Content Section */}
        <section className="relative z-10 py-8 px-4 max-w-4xl mx-auto text-gray-200">
          <div className="bg-black/60 backdrop-blur-xl p-5 sm:p-8 rounded-xl border border-gray-800 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              Boost Your Focus with Our Aesthetic Countdown Timer
            </h2>

            <div className="space-y-6 text-base sm:text-lg">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  The Power of Time-Boxed Focus
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our countdown timer app transforms how you work and study by
                  creating a sense of gentle urgency. Research in cognitive
                  psychology shows that setting specific time constraints
                  significantly improves concentration and task completion.
                  Unlike open-ended work sessions, our countdown timer creates a
                  clear finish line that motivates your brain to enter a state
                  of enhanced focus, helping you accomplish more in less time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Features of Our Countdown Timer App
                </h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>
                    <span className="text-white font-medium">
                      Beautiful Visual Themes:
                    </span>{" "}
                    Multiple aesthetic styles to match your study environment
                    and personal preferences.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Visual Alert System:
                    </span>{" "}
                    Color changes and animations that subtly indicate when time
                    is running low.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Break Timer Functionality:
                    </span>{" "}
                    Perfect for scheduling short breaks between intensive study
                    sessions.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Distraction-Free Interface:
                    </span>{" "}
                    Clean, minimal design that keeps your focus on your work,
                    not the timer.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Dark Mode Design:
                    </span>{" "}
                    Eye-friendly interface that reduces strain during evening
                    study sessions.
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Free Timing Application:
                    </span>{" "}
                    All features available at no cost, no account required.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Scientifically-Backed Study Technique
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Countdown timers are proven to enhance productivity through a
                  psychological principle called "Parkinson's Law" - work
                  expands to fill the time available for its completion. By
                  setting defined time limits, you naturally become more
                  efficient. Our timer also helps combat the "Zeigarnik Effect"
                  - the tendency for uncompleted tasks to cause mental tension.
                  The clear endpoint provided by the countdown timer gives your
                  brain permission to fully engage with the task at hand.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Perfect for Exam Preparation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  When preparing for exams, our countdown timer helps you
                  simulate test conditions. Practice answering questions within
                  specific time constraints to build your time management skills
                  for the actual exam. This technique helps reduce test anxiety
                  by making you comfortable with timed pressure and teaches you
                  to allocate appropriate time to different sections of an exam.
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Frequently Asked Questions About Countdown Timers
                </h3>

                <div className="space-y-4">
                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      How is a countdown timer different from a regular clock?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Unlike a regular clock that simply shows the current time,
                      a countdown timer creates a sense of structure and urgency
                      by displaying the decreasing amount of time left for a
                      task. This visual countdown helps your brain focus and
                      prioritize completing the task before time runs out,
                      leading to improved concentration and efficiency.
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      What's the ideal countdown duration for effective
                      studying?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Research suggests that 25-45 minutes is ideal for most
                      focused study sessions. However, this varies by individual
                      and task type. For complex material, shorter 20-30 minute
                      sessions may be more effective. For tasks requiring deep
                      thought, 40-50 minutes might work better. Our timer allows
                      you to customize these intervals based on your personal
                      concentration patterns.
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      How does your countdown timer help with procrastination?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Procrastination often stems from feeling overwhelmed by
                      large tasks. Our countdown timer helps you break work into
                      manageable chunks, making it easier to start. The time
                      constraint also creates a sense of manageable urgency that
                      motivates action. Many users find that setting a short
                      10-minute timer helps overcome initial resistance to
                      starting difficult tasks.
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      Can I use this as a break timer between study sessions?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Absolutely! Our countdown timer is perfect for timing
                      breaks between study sessions. Setting a defined break
                      period (typically 5-15 minutes) helps you rest without
                      losing momentum. The timer ensures your breaks don't
                      accidentally extend too long, keeping your study schedule
                      on track while still giving your mind the rest it needs.
                    </p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-white text-lg">
                      How does your timer app compare to physical timers?
                    </h4>
                    <p className="text-gray-300 mt-2">
                      Our digital timer app offers several advantages over
                      physical timers: visual themes that create a more pleasant
                      study environment, seamless integration with your digital
                      workspace, clear visual and audio alerts, and the
                      convenience of always having it available on your device.
                      The aesthetic design also makes it more enjoyable to use,
                      increasing the likelihood you'll stick with your time
                      management system.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-center text-lg text-white font-medium">
                  Ready to transform your productivity?
                </p>
                <p className="text-center text-gray-300">
                  Our countdown timer app will help you create focused,
                  efficient study and work sessions.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <Link
                    to="/study-timer"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
                  >
                    Try Study Timer
                  </Link>
                  <Link
                    to="/pomodoro-timer"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium hover:from-red-400 hover:to-rose-500 transition-all duration-300"
                  >
                    Try Pomodoro Timer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Counter;
