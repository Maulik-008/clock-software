import React from "react";
import {
  Palette,
  Clock,
  Circle,
  Square,
  Zap,
  Flame,
  Star,
  Waves,
} from "lucide-react";

interface ClockStyleSelectorProps {
  currentStyle: string;
  onStyleChange: (style: string) => void;
}

const ClockStyleSelector: React.FC<ClockStyleSelectorProps> = ({
  currentStyle,
  onStyleChange,
}) => {
  const styles = [
    { id: "hologram", name: "Hologram", icon: Clock },
    { id: "neon", name: "Neon Glow", icon: Circle },
    { id: "matrix", name: "Matrix", icon: Square },
    { id: "cyberpunk", name: "Cyberpunk", icon: Palette },
    { id: "quantum", name: "Quantum", icon: Zap },
    { id: "plasma", name: "Plasma", icon: Flame },
    { id: "cosmic", name: "Cosmic", icon: Star },
    { id: "aurora", name: "Aurora", icon: Waves },
  ];

  return (
    <div className="flex flex-col items-center">
      <p className="text-white/80 text-xs mb-1">Select Theme</p>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-0.5 sm:gap-1 p-1 sm:p-1.5 bg-black/50 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 max-w-xs sm:max-w-none">
        {styles.map((style) => {
          const Icon = style.icon;
          return (
            <button
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              aria-label={`${style.name} theme`}
              title={style.name}
              className={`group relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 ${
                currentStyle === style.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white/80" />
              <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 transform -translate-x-1/2 bg-black/90 text-white/90 text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {style.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ClockStyleSelector;
