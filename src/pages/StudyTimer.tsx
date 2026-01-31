import React from "react";
import ClockTimer from "../components/ClockTimer";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { useFullViewMode } from "@/hooks/use-full-view-mode";
import PageLayout from "../components/PageLayout";

const StudyTimer = () => {
  const { isFullView } = useFullViewMode();

  return (
    <>
      <SEO
        title="Study Timer | Study With Me Timer App for Focus & Productivity"
        description="Free aesthetic study timer to enhance your 'study with me' sessions. Track your academic productivity with our beautiful dark mode timer app. Perfect for deep work, remote learning, and professional time tracking."
        keywords="study with me, study timer, timer tracker, timer app, timing application, aesthetic timer, focus timer, productivity app, time tracking, student tools, study space, deep work"
        canonicalUrl="https://studyclock.com/study-timer"
      />
      <PageLayout>
        {/* Global Navigation */}
        {!isFullView && <Navigation />}

        <main
          className={`relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 ${isFullView ? "pt-4" : "pt-28 sm:pt-28 md:pt-28"}`}
        >
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
            <section aria-label="Study Timer" className="fade-in">
              <h1 className="sr-only">
                Study With Me Timer - Track Your Study Sessions with StudyClock
              </h1>
              <ClockTimer />
              {!isFullView && (
                <div className="mt-4 text-center text-gray-400 text-base">
                  <p>
                    Track your study and work sessions with our elegant timer
                    app. Perfect for "study with me" sessions and focused deep
                    work.
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>

        {/* SEO Content Section */}
        {!isFullView && (
          <section className="relative z-10 py-8 px-4 max-w-4xl mx-auto text-gray-200">
            <div className="bg-black/60 backdrop-blur-xl p-5 sm:p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                Elevate Your Study Sessions with Our Aesthetic Study Timer
              </h2>

              <div className="space-y-6 text-base sm:text-lg">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Create Your Perfect "Study With Me" Environment
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our study timer app creates the ideal atmosphere for
                    productive study sessions. Whether you're joining online
                    "study with me" communities or creating your own focused
                    study space, our aesthetic timer helps you track time while
                    maintaining a distraction-free environment. The elegant dark
                    mode interface is designed specifically for students and
                    professionals who want to combine functionality with
                    beautiful design.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Features of Our Study Timer App
                  </h3>
                  <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    <li>
                      <span className="text-white font-medium">
                        Aesthetic Dark Mode Interface:
                      </span>{" "}
                      Study in style with our beautiful timer designs that
                      reduce eye strain during long study sessions.
                    </li>
                    <li>
                      <span className="text-white font-medium">
                        Customizable Timer Styles:
                      </span>{" "}
                      Choose from multiple visual themes to match your study
                      space aesthetic.
                    </li>
                    <li>
                      <span className="text-white font-medium">
                        Time Tracking:
                      </span>{" "}
                      Monitor exactly how long you've been studying to improve
                      time management skills.
                    </li>
                    <li>
                      <span className="text-white font-medium">
                        Distraction-Free Design:
                      </span>{" "}
                      Minimalist interface keeps you focused on your work, not
                      on the app.
                    </li>
                    <li>
                      <span className="text-white font-medium">
                        Perfect for Remote Work and Online Learning:
                      </span>{" "}
                      Create structure in your digital workspace with visual
                      time management.
                    </li>
                    <li>
                      <span className="text-white font-medium">
                        Free Timer Application:
                      </span>{" "}
                      All features available at no cost for students and
                      professionals.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Deep Work Made Easy
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our timer app is designed to facilitate "deep work" - the
                    ability to focus without distraction on a cognitively
                    demanding task. By tracking your study sessions, you'll
                    develop a better understanding of your productivity
                    patterns. Many users report that simply seeing the timer
                    running creates a psychological commitment to continue
                    focusing, leading to longer and more effective study
                    sessions.
                  </p>
                </div>

                {/* FAQ Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Frequently Asked Questions About Study Timers
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                      <h4 className="font-medium text-white text-lg">
                        How can a study timer improve my productivity?
                      </h4>
                      <p className="text-gray-300 mt-2">
                        A study timer creates structure in your study sessions,
                        helps you monitor your time allocation, reduces
                        procrastination, and creates accountability. Tracking
                        your study time also allows you to analyze your
                        productivity patterns and make data-driven improvements
                        to your study habits.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                      <h4 className="font-medium text-white text-lg">
                        What is a "Study With Me" session?
                      </h4>
                      <p className="text-gray-300 mt-2">
                        "Study With Me" is a popular concept where students
                        study together virtually or in person to create
                        accountability and motivation. Our timer app enhances
                        these sessions by providing a visual time tracker that
                        helps maintain focus and structure during group or solo
                        study sessions.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                      <h4 className="font-medium text-white text-lg">
                        How is a study timer different from a pomodoro timer?
                      </h4>
                      <p className="text-gray-300 mt-2">
                        While a pomodoro timer follows a specific time-blocking
                        technique (typically 25 minutes of work followed by
                        5-minute breaks), our study timer is more flexible. It
                        allows continuous tracking of your study sessions
                        without enforcing breaks, giving you the freedom to work
                        according to your own rhythm and needs.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                      <h4 className="font-medium text-white text-lg">
                        How can I use this timer for remote work?
                      </h4>
                      <p className="text-gray-300 mt-2">
                        When working remotely, our study timer helps you
                        maintain structure in your workday. You can use it to
                        track time spent on different projects, ensure you're
                        allocating appropriate time to each task, and create a
                        visual reminder to stay focused in potentially
                        distracting home environments.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
                      <h4 className="font-medium text-white text-lg">
                        Why is an aesthetic timer better than a regular timer?
                      </h4>
                      <p className="text-gray-300 mt-2">
                        An aesthetic timer creates a more pleasant study
                        environment, reducing the clinical feeling of
                        traditional timers. The beautiful design makes you more
                        likely to use it consistently, while the dark mode
                        interface reduces eye strain during long study sessions.
                        Our timer becomes part of your study aesthetic rather
                        than just a functional tool.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-center text-lg text-white font-medium">
                    Ready to enhance your study sessions?
                  </p>
                  <p className="text-center text-gray-300">
                    Our free timer app helps you track your productivity and
                    create the perfect study environment.
                  </p>
                  <div className="mt-4 flex justify-center gap-4">
                    <Link
                      to="/counter"
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium hover:from-purple-400 hover:to-pink-500 transition-all duration-300"
                    >
                      Try Countdown Timer
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
        )}

        {!isFullView && <Footer />}
      </PageLayout>
    </>
  );
};

export default StudyTimer;
