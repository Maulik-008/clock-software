import React, { useState } from "react";
import ClockTimer from "../components/ClockTimer";
import CountdownTimer from "../components/CountdownTimer";
import ParticleBackground from "../components/ParticleBackground";
import Navigation from "../components/Navigation";
import { Helmet } from "react-helmet";

const Index = () => {
  const [mode, setMode] = useState<"timer" | "countdown">("timer");

  return (
    <>
      <Helmet>
        <title>
          {mode === "timer" ? "Clock Timer" : "Countdown Timer"} - Study Timer
          App | Focus Better
        </title>
        <meta
          name="description"
          content={
            mode === "timer"
              ? "Track your study sessions with our beautiful dark mode clock timer. Perfect for pomodoro technique and productivity tracking."
              : "Set focused study sessions with our countdown timer. Beautiful dark mode themes help you concentrate and stay productive."
          }
        />
      </Helmet>
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <ParticleBackground />
        <Navigation currentMode={mode} onModeChange={setMode} />
        <main className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 md:pt-24">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
            {mode === "timer" ? (
              <section aria-label="Clock Timer">
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
            ) : (
              <section aria-label="Countdown Timer">
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
            )}
          </div>
        </main>
        <footer className="relative z-10 pb-4 text-center text-gray-500 text-xs">
          <p>Study Timer - Focus Better, Achieve More</p>
        </footer>
      </div>
    </>
  );
};

export default Index;
