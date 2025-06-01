
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import CountdownStyleSelector from './CountdownStyleSelector';

const CountdownTimer = () => {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [countdownStyle, setCountdownStyle] = useState('pulse');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
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
  }, [isRunning, time]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(10);
  };

  const getCountdownStyles = () => {
    switch (countdownStyle) {
      case 'matrix':
        return {
          container: 'backdrop-blur-2xl bg-black/95 border border-green-500/40 shadow-2xl shadow-green-500/30',
          glow: 'bg-gradient-to-r from-green-500/30 via-lime-500/30 to-green-500/30',
          title: 'text-green-400 tracking-[0.4em] font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl',
          numberContainer: 'relative group',
          number: time === 0 ? 'text-red-400 font-mono text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse' : 'text-green-400 font-mono text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          numberGlow: time === 0 ? 'text-red-400/60 font-mono text-4xl sm:text-6xl md:text-8xl lg:text-9xl' : 'text-green-400/60 font-mono text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          animation: isRunning ? 'animate-bounce' : '',
          specialEffect: 'matrix-rain',
          buttons: {
            start: 'from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-green-500/40',
            pause: 'from-lime-500 to-green-600 hover:from-lime-400 hover:to-green-500 shadow-lime-500/40',
            reset: 'from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40'
          }
        };
      case 'neon':
        return {
          container: 'backdrop-blur-2xl bg-purple-950/90 border border-pink-500/50 shadow-2xl shadow-pink-500/40',
          glow: 'bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-500/40',
          title: 'text-pink-400 tracking-[0.4em] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold',
          numberContainer: 'relative group',
          number: time === 0 ? 'text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse' : 'text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          numberGlow: time === 0 ? 'text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl' : 'text-pink-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          animation: isRunning ? 'animate-pulse' : '',
          specialEffect: 'neon-rings',
          buttons: {
            start: 'from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-pink-500/40',
            pause: 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/40',
            reset: 'from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40'
          }
        };
      case 'hologram':
        return {
          container: 'backdrop-blur-2xl bg-blue-950/85 border border-blue-400/50 shadow-2xl shadow-blue-500/30',
          glow: 'bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30',
          title: 'text-blue-300 tracking-[0.3em] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light',
          numberContainer: 'relative group',
          number: time === 0 ? 'text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse' : 'text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-indigo-500 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          numberGlow: time === 0 ? 'text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl' : 'text-blue-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          animation: isRunning ? 'animate-spin' : '',
          specialEffect: 'hologram-scan',
          buttons: {
            start: 'from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 shadow-blue-500/40',
            pause: 'from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 shadow-purple-500/40',
            reset: 'from-pink-500 to-red-600 hover:from-pink-400 hover:to-red-500 shadow-pink-500/40'
          }
        };
      case 'plasma':
        return {
          container: 'backdrop-blur-2xl bg-red-950/90 border border-orange-500/50 shadow-2xl shadow-orange-500/40',
          glow: 'bg-gradient-to-r from-red-500/40 via-orange-500/40 to-yellow-500/40',
          title: 'text-orange-400 tracking-[0.4em] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold',
          numberContainer: 'relative group',
          number: time === 0 ? 'text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse' : 'text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-red-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          numberGlow: time === 0 ? 'text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl' : 'text-orange-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          animation: isRunning ? 'animate-pulse' : '',
          specialEffect: 'plasma-fire',
          buttons: {
            start: 'from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-orange-500/40',
            pause: 'from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 shadow-yellow-500/40',
            reset: 'from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40'
          }
        };
      case 'cosmic':
        return {
          container: 'backdrop-blur-2xl bg-indigo-950/90 border border-violet-500/50 shadow-2xl shadow-violet-500/40',
          glow: 'bg-gradient-to-r from-violet-500/40 via-purple-500/40 to-indigo-500/40',
          title: 'text-violet-400 tracking-[0.4em] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light',
          numberContainer: 'relative group',
          number: time === 0 ? 'text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse' : 'text-transparent bg-clip-text bg-gradient-to-b from-violet-400 to-purple-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          numberGlow: time === 0 ? 'text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl' : 'text-violet-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          animation: isRunning ? 'animate-spin' : '',
          specialEffect: 'cosmic-rings',
          buttons: {
            start: 'from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 shadow-violet-500/40',
            pause: 'from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 shadow-indigo-500/40',
            reset: 'from-pink-500 to-red-600 hover:from-pink-400 hover:to-red-500 shadow-pink-500/40'
          }
        };
      case 'starfield':
        return {
          container: 'backdrop-blur-2xl bg-slate-950/95 border border-teal-500/50 shadow-2xl shadow-teal-500/40',
          glow: 'bg-gradient-to-r from-teal-500/40 via-cyan-500/40 to-blue-500/40',
          title: 'text-teal-400 tracking-[0.4em] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light',
          numberContainer: 'relative group',
          number: time === 0 ? 'text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse' : 'text-transparent bg-clip-text bg-gradient-to-b from-teal-400 to-cyan-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          numberGlow: time === 0 ? 'text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl' : 'text-teal-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          animation: isRunning ? 'animate-pulse' : '',
          specialEffect: 'star-field',
          buttons: {
            start: 'from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 shadow-teal-500/40',
            pause: 'from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 shadow-blue-500/40',
            reset: 'from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40'
          }
        };
      case 'quantum':
        return {
          container: 'backdrop-blur-2xl bg-emerald-950/90 border border-emerald-500/50 shadow-2xl shadow-emerald-500/40',
          glow: 'bg-gradient-to-r from-emerald-500/40 via-green-500/40 to-teal-500/40',
          title: 'text-emerald-400 tracking-[0.4em] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium',
          numberContainer: 'relative group',
          number: time === 0 ? 'text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse' : 'text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-green-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          numberGlow: time === 0 ? 'text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl' : 'text-emerald-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          animation: isRunning ? 'animate-bounce' : '',
          specialEffect: 'quantum-wave',
          buttons: {
            start: 'from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-emerald-500/40',
            pause: 'from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 shadow-teal-500/40',
            reset: 'from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40'
          }
        };
      default: // pulse
        return {
          container: 'backdrop-blur-2xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl shadow-cyan-500/30',
          glow: 'bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30',
          title: 'text-cyan-300 tracking-[0.4em] text-xl sm:text-2xl md:text-3xl lg:text-4xl',
          numberContainer: 'relative group',
          number: time === 0 ? 'text-red-400 text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse' : 'text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          numberGlow: time === 0 ? 'text-red-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl' : 'text-cyan-400/60 text-4xl sm:text-6xl md:text-8xl lg:text-9xl',
          animation: isRunning ? `animate-pulse ${time <= 3 ? 'animate-bounce' : ''}` : '',
          specialEffect: 'pulse-wave',
          buttons: {
            start: 'from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-green-500/40',
            pause: 'from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 shadow-yellow-500/40',
            reset: 'from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-500/40'
          }
        };
    }
  };

  const renderSpecialEffects = (effect: string) => {
    switch (effect) {
      case 'matrix-rain':
        return (
          <>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`absolute w-0.5 bg-green-400/30 animate-pulse`} 
                   style={{
                     left: `${10 + i * 12}%`,
                     height: '100%',
                     animationDelay: `${i * 0.3}s`,
                     animationDuration: '2s'
                   }} />
            ))}
          </>
        );
      case 'neon-rings':
        return (
          <>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`absolute inset-0 border-2 border-pink-400/20 rounded-full animate-ping`} 
                   style={{
                     animationDelay: `${i * 0.5}s`,
                     animationDuration: '3s'
                   }} />
            ))}
          </>
        );
      case 'hologram-scan':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent animate-pulse" 
               style={{ animationDuration: '1.5s' }} />
        );
      case 'plasma-fire':
        return (
          <>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`absolute w-4 h-4 bg-orange-500/40 rounded-full blur-sm animate-bounce`} 
                   style={{
                     left: `${20 + i * 15}%`,
                     bottom: '10%',
                     animationDelay: `${i * 0.2}s`,
                     animationDuration: '1s'
                   }} />
            ))}
          </>
        );
      case 'cosmic-rings':
        return (
          <>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`absolute border border-violet-400/20 rounded-full animate-spin`} 
                   style={{
                     width: `${60 + i * 20}%`,
                     height: `${60 + i * 20}%`,
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     animationDuration: `${3 + i}s`
                   }} />
            ))}
          </>
        );
      case 'star-field':
        return (
          <>
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`absolute w-1 h-1 bg-teal-400/60 rounded-full animate-pulse`} 
                   style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                     animationDelay: `${Math.random() * 2}s`,
                     animationDuration: `${1 + Math.random()}s`
                   }} />
            ))}
          </>
        );
      case 'quantum-wave':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent animate-pulse" 
               style={{ animationDuration: '2s' }} />
        );
      default:
        return null;
    }
  };

  const styles = getCountdownStyles();

  return (
    <div className="relative w-full">
      <div className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl transform transition-all duration-700 hover:scale-[1.02] ${styles.container}`}>
        {/* Enhanced Glow Effect */}
        <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-60 animate-pulse ${styles.glow}`}></div>
        <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl blur-3xl opacity-30 ${styles.glow}`}></div>
        
        {/* Special Effects Background */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
          {renderSpecialEffects(styles.specialEffect)}
        </div>
        
        <div className="relative z-10 text-center">
          {/* Title */}
          <h1 className={`font-bold mb-4 sm:mb-6 md:mb-8 animate-fade-in ${styles.title}`}>
            10 SECOND COUNTDOWN
          </h1>

          {/* Countdown Style Selector */}
          <CountdownStyleSelector 
            currentStyle={countdownStyle} 
            onStyleChange={setCountdownStyle} 
          />

          {/* Countdown Display */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className={`flex items-center justify-center ${styles.numberContainer}`}>
              {/* Main Number */}
              <div className={`relative ${styles.animation}`}>
                <div className={`drop-shadow-2xl transform transition-all duration-500 font-bold ${styles.number} ${time <= 3 && time > 0 ? 'animate-bounce scale-110' : ''}`}>
                  {time}
                </div>
                <div className={`absolute inset-0 blur-lg sm:blur-2xl animate-pulse ${styles.numberGlow}`}>
                  {time}
                </div>
                <div className={`absolute inset-0 blur-2xl sm:blur-3xl opacity-50 ${styles.numberGlow}`}>
                  {time}
                </div>
                
                {/* Enhanced Special Effects for Different Styles */}
                {countdownStyle === 'hologram' && isRunning && (
                  <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-ping"></div>
                )}
                {countdownStyle === 'matrix' && time <= 5 && time > 0 && (
                  <div className="absolute -inset-2 sm:-inset-4 border border-green-400/40 rounded-lg animate-pulse"></div>
                )}
                {countdownStyle === 'neon' && time <= 3 && time > 0 && (
                  <>
                    <div className="absolute -inset-4 sm:-inset-8 bg-pink-500/20 rounded-full blur-xl animate-ping"></div>
                    <div className="absolute -inset-6 sm:-inset-12 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
                  </>
                )}
                {countdownStyle === 'plasma' && time <= 5 && time > 0 && (
                  <div className="absolute -inset-4 sm:-inset-8 bg-orange-500/30 rounded-full blur-2xl animate-pulse"></div>
                )}
                {countdownStyle === 'cosmic' && isRunning && (
                  <div className="absolute -inset-6 sm:-inset-12 border border-violet-400/20 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
                )}
                {countdownStyle === 'quantum' && time <= 3 && time > 0 && (
                  <div className="absolute inset-0 bg-emerald-400/10 rounded-lg animate-pulse blur-sm"></div>
                )}
              </div>
            </div>

            {/* Completion Message */}
            {time === 0 && (
              <div className="mt-4 sm:mt-6 md:mt-8 text-red-400 text-lg sm:text-xl md:text-2xl font-bold animate-bounce">
                TIME'S UP!
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-3 sm:space-x-4 md:space-x-6 mb-6 sm:mb-8">
            {!isRunning ? (
              <button
                onClick={handleStart}
                disabled={time === 0}
                className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-r transition-all duration-500 transform hover:scale-125 hover:rotate-12 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed ${styles.buttons.start}`}
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white ml-0.5" fill="currentColor" />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-green-400/20 blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-r transition-all duration-500 transform hover:scale-125 hover:rotate-12 hover:shadow-2xl ${styles.buttons.pause}`}
              >
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="currentColor" />
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-yellow-400/20 blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              </button>
            )}

            <button
              onClick={handleReset}
              className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-r transition-all duration-500 transform hover:scale-125 hover:rotate-12 hover:shadow-2xl ${styles.buttons.reset}`}
            >
              <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-red-400/20 blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            </button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 ${
              isRunning 
                ? `${styles.buttons.start.includes('green') ? 'bg-green-400' : styles.buttons.start.includes('blue') ? 'bg-blue-400' : 'bg-pink-400'} shadow-2xl animate-ping` 
                : time === 0 
                ? 'bg-red-400 animate-pulse'
                : 'bg-gray-600'
            }`}></div>
            <span className="text-white/80 text-xs sm:text-sm tracking-[0.2em] font-light">
              {isRunning ? 'COUNTING DOWN' : time === 0 ? 'FINISHED' : 'READY'}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Animation Elements */}
      <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-4 h-4 sm:w-8 sm:h-8 bg-cyan-400/20 rounded-full blur-sm animate-bounce"></div>
      <div className="absolute -top-1 sm:-top-2 -right-3 sm:-right-6 w-3 h-3 sm:w-6 sm:h-6 bg-purple-400/20 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute -bottom-2 sm:-bottom-4 -left-3 sm:-left-6 w-5 h-5 sm:w-10 sm:h-10 bg-blue-400/20 rounded-full blur-sm animate-ping"></div>
      <div className="absolute -bottom-1 sm:-bottom-2 -right-2 sm:-right-4 w-2 h-2 sm:w-4 sm:h-4 bg-pink-400/20 rounded-full blur-sm animate-bounce"></div>
    </div>
  );
};

export default CountdownTimer;
