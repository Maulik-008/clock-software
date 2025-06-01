import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>
          About StudyClock.com - Created by Ripal Joshi | Productivity Timer
        </title>
        <meta
          name="description"
          content="Learn about StudyClock.com, a productivity timer created by software engineer Ripal Joshi to help students and professionals maximize focus and efficiency using research-backed time management techniques."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="canonical" href="https://studyclock.com/about-us" />
        <meta
          name="keywords"
          content="studyclock, productivity timer, time management app, pomodoro technique, Ripal Joshi, software engineer, focus timer, study timer, student productivity tool"
        />
      </Helmet>
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <ParticleBackground />

        <main className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-12 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto bg-black/60 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-gray-800 shadow-xl">
            <div className="mb-6">
              <Link
                to="/"
                className="text-cyan-400 hover:text-cyan-300 flex items-center transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to StudyClock
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
              About StudyClock.com
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  StudyClock.com was created with a singular purpose: to help
                  students, professionals, and lifelong learners maximize their
                  productivity through research-backed time management
                  techniques. We believe that effective focus is not about
                  working longer hours, but about working smarter with
                  structured time intervals that optimize your brain's natural
                  rhythms of concentration and rest.
                </p>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-800/30">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Meet the Developer
                </h2>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white text-7xl font-bold">
                      RJ
                    </div>
                  </div>

                  <div className="w-full md:w-2/3">
                    <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                      Ripal Joshi
                    </h3>
                    <p className="text-white font-medium mb-1">
                      Software Engineer
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Ripal is a passionate software engineer with expertise in
                      creating intuitive web applications that solve real-world
                      problems. With a background in both software development
                      and productivity research, Ripal created StudyClock.com to
                      address the challenges faced by students and professionals
                      in maintaining focus in our distraction-filled digital
                      world.
                    </p>

                    <p className="text-gray-300 leading-relaxed">
                      "As someone who has experienced the struggle to maintain
                      focus during long study and work sessions, I wanted to
                      create a tool that implements the scientifically-proven
                      techniques I've used to dramatically improve my own
                      productivity. StudyClock.com combines beautiful design
                      with practical functionality to make effective time
                      management accessible to everyone, completely free."
                    </p>

                    <div className="mt-4">
                      <p className="text-white font-medium">Contact:</p>
                      <a
                        href="mailto:mb.dev08@gmail.com"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        mb.dev08@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Why We Created StudyClock
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  StudyClock.com was born from a recognition of several key
                  challenges faced by modern learners and professionals:
                </p>

                <ul className="list-disc pl-5 text-gray-300 space-y-3 mb-4">
                  <li>
                    <span className="text-white font-medium">
                      Digital Distractions:
                    </span>{" "}
                    Our constantly connected world makes sustained focus
                    increasingly difficult
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Productivity Pressure:
                    </span>{" "}
                    Students and professionals face mounting expectations to
                    accomplish more in less time
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Burnout Risk:
                    </span>{" "}
                    Continuous work without structured breaks leads to mental
                    fatigue and diminishing returns
                  </li>
                  <li>
                    <span className="text-white font-medium">
                      Complex Productivity Tools:
                    </span>{" "}
                    Many existing solutions have steep learning curves or
                    require subscriptions
                  </li>
                </ul>

                <p className="text-gray-300 leading-relaxed">
                  We addressed these challenges by creating an elegant,
                  science-based timing system that helps users maintain peak
                  concentration, avoid burnout, and develop healthier work
                  habits. StudyClock.com implements the research-backed Pomodoro
                  Technique along with flexible clock and countdown timers to
                  accommodate various work styles and needs.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Our Approach
                </h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  At StudyClock.com, we believe effective productivity tools
                  should be:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">
                      Research-Based
                    </h3>
                    <p className="text-gray-400">
                      Our timing techniques are grounded in cognitive science
                      and proven productivity methodologies
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">
                      Beautifully Simple
                    </h3>
                    <p className="text-gray-400">
                      Clean, intuitive interface that enhances focus rather than
                      creating distractions
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">
                      Accessible to All
                    </h3>
                    <p className="text-gray-400">
                      Completely free with no login required, optimized for all
                      devices
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">
                      Eye-Friendly
                    </h3>
                    <p className="text-gray-400">
                      Dark mode design reduces eye strain during extended study
                      sessions
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Join Our Productivity Journey
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  StudyClock.com is constantly evolving to better serve our
                  growing community of focused learners and professionals. We
                  welcome your feedback, suggestions, and productivity stories
                  to help us improve.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  Ready to transform your productivity habits? Start using
                  StudyClock.com today, completely free. Questions, suggestions,
                  or just want to share your success story? Contact Ripal at{" "}
                  <a
                    href="mailto:mb.dev08@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    mb.dev08@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
