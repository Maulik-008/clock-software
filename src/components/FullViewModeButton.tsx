import React, { useEffect } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { useFullViewMode } from "@/hooks/use-full-view-mode";
import { useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FullViewModeButton: React.FC = () => {
  const { isFullView, toggleFullView, setFullView } = useFullViewMode();
  const location = useLocation();

  // Only show on clock-related pages
  const clockPages = [
    "/pomodoro-timer",
    "/study-timer",
    "/online-stopwatch",
    "/counter",
    "/study-clock-timer",
    "/",
  ];

  const isClockPage = clockPages.includes(location.pathname);

  // Add Escape key support to exit full view mode
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullView) {
        setFullView(false);
      }
    };

    if (isFullView) {
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isFullView, setFullView]);

  if (!isClockPage) {
    return null;
  }

  return (
    <>
      {/* Exit button when in full view mode - Only at bottom, same size as feedback button */}
      {isFullView && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="fixed bottom-24 right-6 z-[9999] flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
              aria-label="Exit Full View Mode"
              onClick={toggleFullView}
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Exit Full View Mode (ESC)</p>
          </TooltipContent>
        </Tooltip>
      )}

      {/* Regular toggle button - always visible when NOT in full view */}
      {!isFullView && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="fixed bottom-24 right-6 sm:bottom-10 sm:right-20 md:right-24 z-[9999] flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              aria-label="Enter Full View Mode"
              onClick={toggleFullView}
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enter Full View Mode</p>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
};

export default FullViewModeButton;
