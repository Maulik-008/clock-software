import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
import {
  Brain,
  ArrowRight,
  CheckCircle2,
  Share2,
  MessageCircle,
  Instagram,
  Twitter,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PageLayout from '../components/PageLayout';

type FocusType =
  | 'Deep Focus Learner'
  | 'Balanced Learner'
  | 'Short-Burst Thinker'
  | 'Easily Distracted Learner';

interface FocusResult {
  type: FocusType;
  description: string;
  timer: string;
  studyMinutes: number;
  breakMinutes: number;
  emoji: string;
  color: string;
}

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'How long can you usually study before losing focus?',
    options: [
      { text: '10–15 minutes', score: 1 },
      { text: '20–30 minutes', score: 2 },
      { text: '40–60 minutes', score: 3 },
      { text: '60+ minutes', score: 4 },
    ],
  },
  {
    id: 2,
    question: 'When studying, how often do you check your phone?',
    options: [
      { text: 'Every 5–10 min', score: 1 },
      { text: 'Every 20–30 min', score: 2 },
      { text: 'Rarely', score: 3 },
      { text: 'Almost never', score: 4 },
    ],
  },
  {
    id: 3,
    question: 'What best describes your study environment preference?',
    options: [
      { text: 'Total silence', score: 4 },
      { text: 'Soft background music', score: 3 },
      { text: 'Cafe noise / mild chatter', score: 2 },
      { text: 'Anything is fine', score: 1 },
    ],
  },
  {
    id: 4,
    question: 'What happens when you take a break?',
    options: [
      { text: 'I find it hard to return', score: 1 },
      { text: 'I return okay', score: 2 },
      { text: 'I return with full energy', score: 3 },
      { text: 'I get more focused after breaks', score: 4 },
    ],
  },
  {
    id: 5,
    question: 'How quickly do you get mentally tired during study?',
    options: [
      { text: 'Very quickly', score: 1 },
      { text: 'Moderately', score: 2 },
      { text: 'Slow', score: 3 },
      { text: 'Hardly at all', score: 4 },
    ],
  },
];

const getFocusResult = (score: number): FocusResult => {
  if (score >= 16) {
    return {
      type: 'Deep Focus Learner',
      description:
        'You stay highly engaged during long uninterrupted sessions. You can maintain deep concentration for extended periods.',
      timer: '50–10 or 60–10',
      studyMinutes: 50,
      breakMinutes: 10,
      emoji: '🎯',
      color: 'from-blue-500 to-indigo-600',
    };
  } else if (score >= 11) {
    return {
      type: 'Balanced Learner',
      description:
        'You can maintain focus in medium-length sessions and benefit from a structured Pomodoro routine.',
      timer: '25–5 Pomodoro',
      studyMinutes: 25,
      breakMinutes: 5,
      emoji: '⚖️',
      color: 'from-purple-500 to-pink-600',
    };
  } else if (score >= 6) {
    return {
      type: 'Short-Burst Thinker',
      description:
        'You work best in short, intense bursts. Frequent breaks help you maintain energy and focus.',
      timer: '15–3 cycles',
      studyMinutes: 15,
      breakMinutes: 3,
      emoji: '⚡',
      color: 'from-yellow-500 to-orange-600',
    };
  } else {
    return {
      type: 'Easily Distracted Learner',
      description:
        'You benefit from very short study sessions with frequent breaks. This helps you stay on track and build focus gradually.',
      timer: '10–2 micro cycles',
      studyMinutes: 10,
      breakMinutes: 2,
      emoji: '🌱',
      color: 'from-green-500 to-emerald-600',
    };
  }
};

const FocusTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<FocusResult | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnswer = (answerScore: number) => {
    const newAnswers = [...answers, answerScore];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      setScore(totalScore);
      setResult(getFocusResult(totalScore));
    }
  };

  const handleStartTimer = () => {
    if (!result) return;

    // Navigate to end-time-timer with pre-filled values
    navigate('/end-time-timer', {
      state: {
        hours: Math.floor(result.studyMinutes / 60),
        minutes: result.studyMinutes % 60,
      },
    });
  };

  const handleShare = (platform: string) => {
    if (!result) return;

    const shareText = `I found out I’m a ${result.type} — try this quick focus test and get a timer suggestion: https://studyclock.com/focus-test`;
    const url = window.location.href;

    switch (platform) {
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(shareText + ' ' + url);
        toast({
          title: 'Copied!',
          description: 'Share text copied to clipboard.',
        });
        break;
      default:
        break;
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
    setResult(null);
  };

  return (
    <>
      <Helmet>
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'StudyClock Focus Test',
            url: 'https://studyclock.com/focus-test',
            description:
              'Discover your study focus type with a 5-question test and get a practical timer recommendation to start immediately.',
            applicationCategory: 'Education',
          })}
        </script>
      </Helmet>
      <SEO
        title='Focus Test — Discover Your Study Type & Best Timer Settings'
        description='Answer 5 quick questions to find your focus type and get a simple timer recommendation you can start right away. Ideal for students and anyone wanting a better study or work routine.'
        keywords='focus test, study focus test, focus quiz, study timer recommendation, best study timer, pomodoro style quiz, find your focus type, study routine test'
        canonicalUrl='https://studyclock.com/focus-test'
      />
      <PageLayout className='text-white font-sans' showParticles>
        <Navigation />

        <main className='relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl'>
          {!result ? (
            <>
              {/* Intro Screen */}
              {currentQuestion === 0 && answers.length === 0 ? (
                <div className='text-center animate-fade-in'>
                  <div className='mb-8'>
                    <Brain className='w-20 h-20 mx-auto mb-6 text-cyan-400' />
                    <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300'>
                      Find your focus type and get a timer that fits you
                    </h1>
                    <p className='text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-8'>
                      Take this short 5-question test to discover how long you
                      naturally focus and which timer routine works best for
                      you. In about 30 seconds you’ll get a clear recommendation
                      and then start the timer right from this page.
                    </p>
                    <Button
                      onClick={() => setCurrentQuestion(1)}
                      size='lg'
                      className='bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-lg'
                    >
                      Start Test
                      <ArrowRight className='ml-2 w-5 h-5' />
                    </Button>
                  </div>
                  {/* Hero body content */}
                  <div className='mt-10 text-left space-y-8 max-w-3xl mx-auto'>
                    <div>
                      <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-3'>
                        What this test gives you
                      </h2>
                      <p className='text-gray-300'>
                        This test tells you which of four focus types fits you
                        best:
                      </p>
                      <ul className='list-disc pl-5 text-gray-300 space-y-1 mt-3'>
                        <li>
                          Deep Focus Learner {'>'} long study sessions with
                          fewer breaks.
                        </li>
                        <li>
                          Balanced Learner {'>'} medium sessions with regular
                          short breaks.
                        </li>
                        <li>
                          Short-Burst Thinker {'>'} short focused bursts work
                          best.
                        </li>
                        <li>
                          Easily Distracted Learner {'>'} very short sessions
                          with frequent micro-breaks.
                        </li>
                      </ul>
                      <p className='text-gray-300 mt-3'>
                        After the test you’ll get:
                      </p>
                      <ul className='list-disc pl-5 text-gray-300 space-y-1 mt-2'>
                        <li>a clear label (your focus type)</li>
                        <li>a short description in plain English</li>
                        <li>
                          a recommended timer setting (e.g., 25–5, 50–10) you
                          can start right away
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-3'>
                        How it works (3 simple steps)
                      </h2>
                      <ol className='list-decimal pl-5 text-gray-300 space-y-1'>
                        <li>Answer 5 quick multiple-choice questions.</li>
                        <li>See your focus type and timer suggestion.</li>
                        <li>
                          Tap Start Timer to open the matching timer with
                          pre-filled values.
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-3'>
                        Why this helps
                      </h2>
                      <p className='text-gray-300'>
                        Matching your work time to your natural focus span helps
                        you get more done with less stress. These short routines
                        are easy to follow and great for studying, writing, or
                        focused work blocks.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Quiz Questions */
                <div className='max-w-2xl mx-auto animate-fade-in'>
                  <div className='mb-6'>
                    <div className='flex justify-between items-center mb-4'>
                      <span className='text-sm text-gray-400'>
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <div className='flex gap-1'>
                        {questions.map((_, index) => (
                          <div
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                              index <= currentQuestion
                                ? 'bg-cyan-400'
                                : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className='h-2 bg-gray-800 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300'
                        style={{
                          width: `${
                            ((currentQuestion + 1) / questions.length) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className='bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl'>
                    <h2 className='text-2xl sm:text-3xl font-bold mb-8 text-center'>
                      {questions[currentQuestion].question}
                    </h2>

                    <div className='space-y-4'>
                      {questions[currentQuestion].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(option.score)}
                            className='w-full p-4 text-left bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 hover:border-cyan-500/50 rounded-lg transition-all duration-300 group'
                          >
                            <div className='flex items-center justify-between'>
                              <span className='text-lg text-gray-200 group-hover:text-white'>
                                {option.text}
                              </span>
                              <ArrowRight className='w-5 h-5 text-gray-500 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity' />
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Result Screen */
            <div className='max-w-3xl mx-auto animate-fade-in'>
              <div className='bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-8 sm:p-12 shadow-2xl text-center'>
                <div className='mb-6'>
                  <div className='text-6xl mb-4'>{result.emoji}</div>
                  <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-teal-300'>
                    You Are a {result.type}!
                  </h1>
                </div>

                <div className='mb-8'>
                  <p className='text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto'>
                    {result.description}
                  </p>

                  <div
                    className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${result.color} mb-6`}
                  >
                    <CheckCircle2 className='w-6 h-6' />
                    <span className='text-xl font-semibold'>
                      Recommended Timer: {result.timer}
                    </span>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
                  <Button
                    onClick={handleStartTimer}
                    size='lg'
                    className={`bg-gradient-to-r ${result.color} hover:opacity-90 text-white px-8 py-6 text-lg`}
                  >
                    Start My {result.timer} Timer
                    <ArrowRight className='ml-2 w-5 h-5' />
                  </Button>
                  <Button
                    onClick={handleRestart}
                    variant='outline'
                    size='lg'
                    className='border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg'
                  >
                    Retake Test
                  </Button>
                </div>

                {/* Share Section */}
                <div className='border-t border-gray-800 pt-8'>
                  <p className='text-sm text-gray-400 mb-4'>
                    Share your result:
                  </p>
                  <div className='flex justify-center gap-4'>
                    <Button
                      onClick={() => handleShare('whatsapp')}
                      variant='ghost'
                      size='icon'
                      className='w-12 h-12 rounded-full hover:bg-green-500/20 hover:text-green-400'
                      title='Share on WhatsApp'
                    >
                      <MessageCircle className='w-6 h-6' />
                    </Button>
                    <Button
                      onClick={() => handleShare('twitter')}
                      variant='ghost'
                      size='icon'
                      className='w-12 h-12 rounded-full hover:bg-blue-500/20 hover:text-blue-400'
                      title='Share on Twitter'
                    >
                      <Twitter className='w-6 h-6' />
                    </Button>
                    <Button
                      onClick={() => handleShare('copy')}
                      variant='ghost'
                      size='icon'
                      className='w-12 h-12 rounded-full hover:bg-gray-700 hover:text-white'
                      title='Copy link'
                    >
                      <Copy className='w-6 h-6' />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className='mt-8 bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl'>
                <h3 className='text-2xl font-bold mb-4 text-center'>
                  Why This Timer Works for You
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300'>
                  <div className='p-4 bg-white/5 rounded-lg'>
                    <h4 className='font-semibold text-white mb-2'>
                      Study Duration: {result.studyMinutes} minutes
                    </h4>
                    <p className='text-sm'>
                      This matches your natural focus span, helping you maintain
                      concentration without burnout.
                    </p>
                  </div>
                  <div className='p-4 bg-white/5 rounded-lg'>
                    <h4 className='font-semibold text-white mb-2'>
                      Break Duration: {result.breakMinutes} minutes
                    </h4>
                    <p className='text-sm'>
                      Optimal break length to recharge while maintaining your
                      study momentum.
                    </p>
                  </div>
                </div>
                <p className='text-gray-300 text-sm mt-4'>
                  You can pause, restart, or change the timings — the
                  recommendation is just a starting point based on your answers.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* FAQ Section */}
        <section className='relative z-10 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl'>
          <div className='bg-black/60 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl text-gray-200'>
            <h2 className='text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400 mb-6'>
              FAQ
            </h2>
            <div className='space-y-6'>
              <div>
                <h3 className='text-lg font-semibold text-white mb-2'>
                  What is this test?
                </h3>
                <p className='text-gray-300'>
                  A 5-question quiz that suggests a study/work timer tailored to
                  how you focus.
                </p>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-white mb-2'>
                  How long does the test take?
                </h3>
                <p className='text-gray-300'>About 30 seconds.</p>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-white mb-2'>
                  Are the results useful?
                </h3>
                <p className='text-gray-300'>
                  Yes, you get a simple, practical timer suggestion you can use
                  right away. These are based on common focus patterns used in
                  productivity methods like Pomodoro.
                </p>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-white mb-2'>
                  Can I change the timer?
                </h3>
                <p className='text-gray-300'>
                  Yes. The suggestion is a starting point. You can adjust the
                  study and break lengths to suit your day.
                </p>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-white mb-2'>
                  Is this free?
                </h3>
                <p className='text-gray-300'>
                  Yes, the test and recommended timer are free to use.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </PageLayout>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default FocusTest;
