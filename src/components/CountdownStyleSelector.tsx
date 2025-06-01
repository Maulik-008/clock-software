
import React from 'react';
import { Zap, Code, Eye, Sparkles, Flame, Orbit, Star, Waves } from 'lucide-react';

interface CountdownStyleSelectorProps {
  currentStyle: string;
  onStyleChange: (style: string) => void;
}

const CountdownStyleSelector: React.FC<CountdownStyleSelectorProps> = ({ currentStyle, onStyleChange }) => {
  const styles = [
    { id: 'pulse', name: 'Pulse Wave', icon: Zap },
    { id: 'matrix', name: 'Matrix Code', icon: Code },
    { id: 'hologram', name: 'Hologram', icon: Eye },
    { id: 'neon', name: 'Neon Blast', icon: Sparkles },
    { id: 'plasma', name: 'Plasma Fire', icon: Flame },
    { id: 'cosmic', name: 'Cosmic Ring', icon: Orbit },
    { id: 'starfield', name: 'Star Field', icon: Star },
    { id: 'quantum', name: 'Quantum Wave', icon: Waves }
  ];

  return (
    <div className="flex justify-center mb-6 sm:mb-8">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 sm:gap-2 p-1.5 sm:p-2 bg-black/60 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 max-w-xs sm:max-w-none">
        {styles.map((style) => {
          const Icon = style.icon;
          return (
            <button
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              className={`group relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 ${
                currentStyle === style.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/80" />
              <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white/90 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {style.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CountdownStyleSelector;
