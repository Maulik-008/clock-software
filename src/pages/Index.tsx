
import React, { useState } from 'react';
import ClockTimer from '../components/ClockTimer';
import CountdownTimer from '../components/CountdownTimer';
import ParticleBackground from '../components/ParticleBackground';
import Navigation from '../components/Navigation';

const Index = () => {
  const [mode, setMode] = useState<'timer' | 'countdown'>('timer');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <ParticleBackground />
      <Navigation currentMode={mode} onModeChange={setMode} />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4 pt-16 sm:pt-20 md:pt-24">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
          {mode === 'timer' ? <ClockTimer /> : <CountdownTimer />}
        </div>
      </div>
    </div>
  );
};

export default Index;
