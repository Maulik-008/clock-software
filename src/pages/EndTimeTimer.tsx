import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
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
  Bell,
  BellOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import useAnalytics from '../hooks/use-analytics';
import ParticleBackground from '../components/ParticleBackground';
import { usePersistedCountdown } from '../hooks/usePersistedCountdown';

const EndTimeTimer = () => {
  const location = useLocation();
  const initialState = location.state as {
    hours?: number;
    minutes?: number;
  } | null;

  const [hours, setHours] = useState<string>(
    initialState?.hours?.toString() || '0'
  );
  const [minutes, setMinutes] = useState<string>(
    initialState?.minutes?.toString() || '0'
  );
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Use persisted countdown hook
  const {
    time: timeRemaining,
    isRunning,
    start,
    pause,
    reset: resetTimer,
    setInitialTime,
  } = usePersistedCountdown('end-time-timer', 0, handleCountdownComplete);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [studySessionCount, setStudySessionCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const analytics = useAnalytics();

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/audio/crystal.mp3');
    audioRef.current.loop = false;

    if ('Notification' in window) {
      Notification.requestPermission();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Restore UI state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('end-time-timer-ui-state');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.hasStarted) {
          setHasStarted(true);
        }
        if (parsed.endTime) {
          setEndTime(new Date(parsed.endTime));
        }
        if (parsed.hours !== undefined) {
          setHours(parsed.hours);
        }
        if (parsed.minutes !== undefined) {
          setMinutes(parsed.minutes);
        }
      }
    } catch (error) {
      console.error('Failed to restore EndTimeTimer UI state:', error);
    }
  }, []);

  // Save UI state to localStorage whenever it changes
  useEffect(() => {
    if (hasStarted && endTime) {
      const state = {
        hasStarted,
        endTime: endTime.toISOString(),
        hours,
        minutes,
      };
      localStorage.setItem('end-time-timer-ui-state', JSON.stringify(state));
    }
  }, [hasStarted, endTime, hours, minutes]);

  const showNotification = useCallback(
    (title: string, body: string) => {
      if (!notificationsEnabled) return;

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          silent: true,
        });
      }
    },
    [notificationsEnabled]
  );

  // Handle countdown completion
  function handleCountdownComplete() {
    // Clear UI state when timer completes
    setHasStarted(false);
    setEndTime(null);
    localStorage.removeItem('end-time-timer-ui-state');

    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error('Error playing completion sound:', err);
      });
    }

    if (notificationsEnabled) {
      showNotification('Timer Complete!', 'Your countdown timer has finished.');
    }

    analytics.trackTimerComplete('end-time-timer', 0);

    toast({
      title: 'Timer Complete!',
      description: 'Your countdown timer has finished.',
      variant: 'default',
    });
  }

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    };
  };

  const handleSetEndTime = () => {
    const hoursNum = parseInt(hours) || 0;
    const minutesNum = parseInt(minutes) || 0;

    if (hoursNum === 0 && minutesNum === 0) {
      toast({
        title: 'Please Set Timer Duration',
        description: 'Please enter hours and/or minutes for the timer.',
        variant: 'destructive',
      });
      return;
    }

    if (hoursNum < 0 || minutesNum < 0 || minutesNum >= 60) {
      toast({
        title: 'Invalid Duration',
        description: 'Please enter valid hours (≥0) and minutes (0-59).',
        variant: 'destructive',
      });
      return;
    }

    // Calculate end time from current time + duration
    const now = new Date();
    const end = new Date(now);
    end.setHours(end.getHours() + hoursNum);
    end.setMinutes(end.getMinutes() + minutesNum);
    end.setSeconds(end.getSeconds(), 0);

    const totalSeconds = hoursNum * 3600 + minutesNum * 60;
    setEndTime(end);
    setInitialTime(totalSeconds);
    setHasStarted(true);
    start();

    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error('Error playing start sound:', err);
      });
    }

    analytics.trackTimerStart('end-time-timer');
    toast({
      title: 'Timer Started',
      description: `Countdown timer set for ${hoursNum}h ${minutesNum}m until ${end.toLocaleTimeString()}.`,
    });
  };

  const handleStart = () => {
    if (!hasStarted) {
      handleSetEndTime();
      return;
    }
    start();
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error('Error playing start sound:', err);
      });
    }
    analytics.trackTimerStart('end-time-timer');
    toast({
      title: 'Timer Resumed',
      description: 'Your countdown timer has resumed.',
    });
  };

  const handlePause = () => {
    pause();
    analytics.trackTimerPause('end-time-timer', timeRemaining);
    toast({
      title: 'Timer Paused',
      description: 'Take a quick break and resume when ready.',
    });
  };

  const handleReset = () => {
    setHasStarted(false);
    setEndTime(null);
    setHours('0');
    setMinutes('0');
    resetTimer();

    // Clear UI state from localStorage
    localStorage.removeItem('end-time-timer-ui-state');

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (timeRemaining > 0) {
      analytics.trackTimerComplete('end-time-timer', timeRemaining);
    }

    toast({
      title: 'Timer Reset',
      description:
        'The timer has been reset. Set a new duration to start again.',
    });
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
    toast({
      title: soundEnabled ? 'Sound Disabled' : 'Sound Enabled',
      description: `Sounds are now ${soundEnabled ? 'off' : 'on'}.`,
    });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);

    if (
      !notificationsEnabled &&
      'Notification' in window &&
      Notification.permission !== 'granted'
    ) {
      Notification.requestPermission();
    }

    toast({
      title: notificationsEnabled
        ? 'Notifications Disabled'
        : 'Notifications Enabled',
      description: `Notifications are now ${
        notificationsEnabled ? 'off' : 'on'
      }.`,
    });
  };

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

  const timeDisplay = formatTime(timeRemaining);

  return (
    <>
      <SEO
        title='Countdown to a Specific Clock Time | End Time Timer Online'
        description='Set a countdown to any clock time easily. This free online End Time Timer lets you pick an exact finish time and watch seconds tick down. Ideal for study sessions, meetings, deadlines, and everyday tasks.'
        keywords='end time timer, countdown to time, timer until time, study timer, time countdown, clock time countdown, specific time timer'
        canonicalUrl='https://studyclock.com/end-time-timer'
      />
      <div className='relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden text-white font-sans'>
        <ParticleBackground />
        <Navigation />

        <main className='relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl'>
          <div className='w-full max-w-6xl mx-auto'>
            {/* Hero section */}
            <div className='text-center mb-10 md:mb-12 animate-fade-in'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300'>
                Stay on Track With a Online Focus Timer
              </h1>
              <p className='text-lg md:text-xl max-w-2xl mx-auto text-gray-300'>
                Set the exact time you want your timer to end. This simple
                online timer stops at your chosen time and gives sound and
                notification alerts. Great for study, work, meetings, and
                everyday tasks.
              </p>
            </div>

            {/* Main timer section */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
              {/* Main timer card */}
              <div className='lg:col-span-2 bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl'>
                {/* Timer Duration Input Section */}
                {!hasStarted && (
                  <div className='mb-6 sm:mb-8'>
                    <label className='block text-sm font-medium text-gray-300 mb-3'>
                      <Timer className='inline-block mr-2 w-4 h-4' />
                      Set Timer Duration
                    </label>
                    <div className='flex flex-col sm:flex-row gap-3 items-end'>
                      <div className='flex-1 grid grid-cols-2 gap-3'>
                        <div>
                          <label className='block text-xs text-gray-400 mb-1'>
                            Hours
                          </label>
                          <Input
                            type='number'
                            value={hours}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (
                                val === '' ||
                                (parseInt(val) >= 0 && parseInt(val) <= 99)
                              ) {
                                setHours(val);
                              }
                            }}
                            min='0'
                            max='99'
                            className='bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400'
                            placeholder='0'
                          />
                        </div>
                        <div>
                          <label className='block text-xs text-gray-400 mb-1'>
                            Minutes
                          </label>
                          <Input
                            type='number'
                            value={minutes}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (
                                val === '' ||
                                (parseInt(val) >= 0 && parseInt(val) < 60)
                              ) {
                                setMinutes(val);
                              }
                            }}
                            min='0'
                            max='59'
                            className='bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400'
                            placeholder='0'
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleSetEndTime}
                        className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white'
                      >
                        <Play className='w-4 h-4 mr-2' />
                        Start Timer
                      </Button>
                    </div>
                    {(parseInt(hours) > 0 || parseInt(minutes) > 0) && (
                      <p className='mt-2 text-sm text-gray-400'>
                        Timer duration:{' '}
                        <span className='text-cyan-400 font-medium'>
                          {parseInt(hours) || 0}h {parseInt(minutes) || 0}m
                        </span>
                      </p>
                    )}
                  </div>
                )}

                {/* Current Session Stats */}
                {hasStarted && endTime && (
                  <div className='flex flex-wrap justify-between items-center mb-6 text-sm sm:text-base'>
                    <div className='flex items-center px-3 py-1 bg-white/10 rounded-full'>
                      <Clock size={18} className='mr-2 text-cyan-400' />
                      <span>Ends at: {endTime.toLocaleTimeString()}</span>
                    </div>

                    <div className='flex items-center px-3 py-1 bg-white/10 rounded-full mt-2 sm:mt-0'>
                      <BookOpen size={18} className='mr-2 text-emerald-400' />
                      <span>Sessions Today: {studySessionCount}</span>
                    </div>
                  </div>
                )}

                {/* Timer display */}
                <div className='relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto mb-6 sm:mb-8'>
                  {/* Outer spinning ring */}
                  <div
                    className={`absolute inset-0 rounded-full border-[6px] transition-all duration-500 ${
                      isRunning
                        ? 'border-teal-400/70 animate-spin-slow shadow-[0_0_15px_rgba(45,212,191,0.5)]'
                        : 'border-gray-600/60'
                    }`}
                  ></div>

                  {/* Middle spinning ring */}
                  <div
                    className={`absolute inset-[10px] rounded-full border-[4px] transition-all duration-500 ${
                      isRunning
                        ? 'border-blue-400/70 animate-spin-medium shadow-[0_0_10px_rgba(96,165,250,0.5)]'
                        : 'border-gray-700/50'
                    }`}
                  ></div>

                  {/* Inner content */}
                  <div className='absolute inset-[20px] rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-inner'>
                    <div className='text-center w-full px-2'>
                      {/* Main time display */}
                      {hasStarted ? (
                        <>
                          <p className='text-3xl sm:text-4xl md:text-5xl font-mono tracking-wider'>
                            <span className='text-white'>
                              {timeDisplay.hours}
                            </span>
                            <span className='text-cyan-400'>:</span>
                            <span className='text-white'>
                              {timeDisplay.minutes}
                            </span>
                            <span className='text-cyan-400'>:</span>
                            <span className='text-white'>
                              {timeDisplay.seconds}
                            </span>
                          </p>

                          {/* Status text */}
                          <p className='text-xs sm:text-sm text-gray-400 mt-2'>
                            {isRunning
                              ? 'COUNTING DOWN'
                              : timeRemaining > 0
                              ? 'PAUSED'
                              : 'COMPLETE'}
                          </p>

                          {/* Study indicator */}
                          {isRunning && (
                            <div className='mt-2 flex justify-center'>
                              <span className='inline-flex h-2 w-2 rounded-full bg-green-400 animate-ping'></span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className='text-gray-400'>
                          <p className='text-lg sm:text-xl mb-2'>
                            Set End Time
                          </p>
                          <p className='text-xs sm:text-sm'>to start timer</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                {hasStarted && (
                  <div className='flex justify-center items-center space-x-4 sm:space-x-6'>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={handleReset}
                          variant='ghost'
                          size='icon'
                          className='text-gray-400 hover:text-white hover:bg-white/10 h-12 w-12 rounded-full'
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
                          size='lg'
                          disabled={timeRemaining <= 0}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full text-white shadow-lg transition-all duration-300 ${
                            timeRemaining <= 0
                              ? 'bg-gray-500 cursor-not-allowed'
                              : isRunning
                              ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                              : 'bg-green-500 hover:bg-green-600 shadow-green-500/20'
                          }`}
                        >
                          {isRunning ? <Pause size={28} /> : <Play size={28} />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {timeRemaining <= 0
                            ? 'Timer Complete'
                            : isRunning
                            ? 'Pause Timer'
                            : 'Resume Timer'}
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <div className='flex space-x-2'>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={toggleSound}
                            variant='ghost'
                            size='icon'
                            className={`text-gray-400 hover:text-white hover:bg-white/10 h-12 w-12 rounded-full ${
                              soundEnabled ? 'text-cyan-400' : ''
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
                          <p>
                            {soundEnabled ? 'Disable Sound' : 'Enable Sound'}
                          </p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={toggleNotifications}
                            variant='ghost'
                            size='icon'
                            className={`text-gray-400 hover:text-white hover:bg-white/10 h-12 w-12 rounded-full ${
                              notificationsEnabled ? 'text-cyan-400' : ''
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
                              ? 'Disable Notifications'
                              : 'Enable Notifications'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>

              {/* Study Suggestions Panel */}
              <div className='bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl'>
                <h2 className='text-xl font-bold mb-4 flex items-center'>
                  <Brain className='mr-2 text-purple-400' size={20} />
                  Timer Tips
                </h2>

                <ul className='space-y-4 text-gray-300'>
                  <li className='flex'>
                    <div className='mr-3 text-teal-500'>•</div>
                    <div>
                      <strong className='text-white block'>
                        Set Clear Goals
                      </strong>
                      <p className='text-sm'>
                        Define what you want to accomplish before setting your
                        end time.
                      </p>
                    </div>
                  </li>

                  <li className='flex'>
                    <div className='mr-3 text-teal-500'>•</div>
                    <div>
                      <strong className='text-white block'>
                        Time Management
                      </strong>
                      <p className='text-sm'>
                        Use this timer to track time until meetings, deadlines,
                        or study sessions end.
                      </p>
                    </div>
                  </li>

                  <li className='flex'>
                    <div className='mr-3 text-teal-500'>•</div>
                    <div>
                      <strong className='text-white block'>Stay Focused</strong>
                      <p className='text-sm'>
                        Keep track of how much time remains until your target
                        time.
                      </p>
                    </div>
                  </li>

                  <li className='flex'>
                    <div className='mr-3 text-teal-500'>•</div>
                    <div>
                      <strong className='text-white block'>
                        Completion Alert
                      </strong>
                      <p className='text-sm'>
                        Get notified when your timer reaches the end time with
                        sound and browser notifications.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className='mt-6 py-3 px-4 bg-blue-900/30 rounded-lg border border-blue-500/20 text-center'>
                  <p className='text-sm'>
                    Set your end time and start counting down to stay on track
                    with your schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <section className='mt-12 sm:mt-16 md:mt-20 bg-black/60 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-gray-800 shadow-xl text-gray-200'>
              <div className='max-w-4xl mx-auto space-y-8'>
                <div>
                  <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4'>
                    What Is an End Time Countdown Timer?
                  </h2>
                  <p className='text-gray-300 leading-relaxed'>
                    An End Time Countdown Timer is a simple tool that lets you
                    choose the exact clock time when you want the timer to stop.
                    Instead of setting a duration like "30 minutes," you set a
                    real time such as 5:00 PM, and the timer counts down to that
                    moment.
                  </p>
                  <p className='text-gray-300 leading-relaxed mt-3'>
                    This is helpful for studying, meetings, cooking, deadlines,
                    and staying on schedule with your daily tasks.
                  </p>
                </div>

                <div>
                  <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4'>
                    Why Use a Timer That Ends at a Specific Time?
                  </h2>
                  <p className='text-gray-300 leading-relaxed mb-4'>
                    Many people prefer this type of timer because it matches how
                    we plan our day:
                  </p>
                  <ul className='list-disc pl-6 text-gray-300 space-y-2'>
                    <li>You know exactly when you will stop working</li>
                    <li>
                      It helps you stay focused until your chosen end time
                    </li>
                    <li>You don't have to calculate how much time is left</li>
                    <li>It keeps you on track during study or work sessions</li>
                    <li>Great for time-blocking and productivity routines</li>
                  </ul>
                  <p className='text-gray-300 leading-relaxed mt-4'>
                    If you have something starting soon (like a meeting or
                    class), this timer helps you finish what you're doing right
                    on time.
                  </p>
                </div>

                <div>
                  <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4'>
                    How to Use This End Time Timer
                  </h2>
                  <p className='text-gray-300 leading-relaxed mb-4'>
                    Using this timer is very easy:
                  </p>
                  <ol className='list-decimal pl-6 text-gray-300 space-y-2'>
                    <li>Enter the number of hours and minutes.</li>
                    <li>Click Start Timer.</li>
                    <li>The countdown begins immediately.</li>
                    <li>You can pause, resume, or reset anytime.</li>
                    <li>
                      When the time ends, you get a sound alert and a browser
                      notification (if enabled).
                    </li>
                  </ol>
                  <p className='text-gray-300 leading-relaxed mt-4'>
                    The timer also shows a clean visual display so you can check
                    the time remaining at a glance.
                  </p>
                </div>

                <div>
                  <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4'>
                    Who Is This Timer For?
                  </h2>
                  <p className='text-gray-300 leading-relaxed mb-4'>
                    This timer is perfect for:
                  </p>
                  <ul className='list-disc pl-6 text-gray-300 space-y-2'>
                    <li>
                      Students who want to stop studying at a specific time
                    </li>
                    <li>
                      Professionals working before a meeting, call, or deadline
                    </li>
                    <li>
                      People doing chores or cooking who need a fixed stop time
                    </li>
                    <li>
                      Anyone following a daily routine or time-blocking schedule
                    </li>
                    <li>Parents managing screen time or study time for kids</li>
                  </ul>
                  <p className='text-gray-300 leading-relaxed mt-4'>
                    It works on both desktop and mobile, so you can use it
                    anywhere.
                  </p>
                </div>

                <div>
                  <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4'>
                    Key Features
                  </h2>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='bg-white/5 p-4 rounded-lg border border-white/10'>
                      <p className='text-gray-300'>
                        Set a timer to any specific end time
                      </p>
                    </div>
                    <div className='bg-white/5 p-4 rounded-lg border border-white/10'>
                      <p className='text-gray-300'>
                        Clear and modern countdown display
                      </p>
                    </div>
                    <div className='bg-white/5 p-4 rounded-lg border border-white/10'>
                      <p className='text-gray-300'>
                        Pause, resume, and reset options
                      </p>
                    </div>
                    <div className='bg-white/5 p-4 rounded-lg border border-white/10'>
                      <p className='text-gray-300'>
                        Sound alert when time is up
                      </p>
                    </div>
                    <div className='bg-white/5 p-4 rounded-lg border border-white/10'>
                      <p className='text-gray-300'>
                        Browser notification support
                      </p>
                    </div>
                    <div className='bg-white/5 p-4 rounded-lg border border-white/10'>
                      <p className='text-gray-300'>
                        Smooth and distraction-free interface
                      </p>
                    </div>
                    <div className='bg-white/5 p-4 rounded-lg border border-white/10'>
                      <p className='text-gray-300'>Free and simple to use</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4'>
                    Benefits of Using an End Time Countdown
                  </h2>
                  <ul className='list-disc pl-6 text-gray-300 space-y-2'>
                    <li>Makes planning easier</li>
                    <li>Helps avoid overworking</li>
                    <li>Keeps you aware of your schedule</li>
                    <li>Supports focused study or deep-work sessions</li>
                    <li>Helps you finish tasks before your next activity</li>
                  </ul>
                  <p className='text-gray-300 leading-relaxed mt-4'>
                    Many people find this type of timer more natural than a
                    normal countdown, because it matches how we think about
                    time.
                  </p>
                </div>

                <div>
                  <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-4'>
                    FAQ
                  </h2>
                  <div className='space-y-6'>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        1. How is this different from a normal countdown timer?
                      </h3>
                      <p className='text-gray-300'>
                        A normal timer counts down from a duration. This timer
                        counts down to a real clock time that you choose.
                      </p>
                    </div>

                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        2. Will the timer keep going if I switch tabs?
                      </h3>
                      <p className='text-gray-300'>
                        Yes. You can switch tabs and it will keep working in the
                        background.
                      </p>
                    </div>

                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        3. Do I get alerts when the time ends?
                      </h3>
                      <p className='text-gray-300'>
                        Yes. You will hear a sound and can enable browser
                        notifications.
                      </p>
                    </div>

                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        4. Is this timer free?
                      </h3>
                      <p className='text-gray-300'>
                        Yes, it's completely free to use.
                      </p>
                    </div>

                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>
                        5. Can I use this for studying?
                      </h3>
                      <p className='text-gray-300'>
                        Yes! Many students use this timer to stay focused until
                        a specific end time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
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

export default EndTimeTimer;
