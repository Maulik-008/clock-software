import React, { useState } from "react";
import {
  Timer,
  Clock,
  Target,
  Watch,
  Menu,
  X,
  Home,
  Info,
  BookOpen,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentMode?: "timer" | "countdown" | "pomodoro" | "clock";
  onModeChange?: (mode: "timer" | "countdown" | "pomodoro" | "clock") => void;
  pomodoroSubMode?: "pomodoro" | "shortBreak" | "longBreak";
  onPomodoroSubModeChange?: (
    subMode: "pomodoro" | "shortBreak" | "longBreak"
  ) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentMode,
  onModeChange,
  pomodoroSubMode = "pomodoro",
  onPomodoroSubModeChange,
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper to determine if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Main timer navigation items
  const timerItems = [
    {
      name: "Study Timer",
      path: "/study-timer",
      icon: <Clock className="w-4 h-4" />,
      color: "from-cyan-500 to-blue-600",
      shadowColor: "shadow-cyan-500/30",
    },
    {
      name: "Clock Timer",
      path: "/study-clock-timer",
      icon: <Watch className="w-4 h-4" />,
      color: "from-blue-500 to-indigo-600",
      shadowColor: "shadow-blue-500/30",
    },
    {
      name: "Countdown",
      path: "/counter",
      icon: <Timer className="w-4 h-4" />,
      color: "from-purple-500 to-pink-600",
      shadowColor: "shadow-purple-500/30",
    },
    {
      name: "Pomodoro",
      path: "/pomodoro-timer",
      icon: <Target className="w-4 h-4" />,
      color: "from-red-500 to-rose-600",
      shadowColor: "shadow-red-500/30",
    },
  ];

  // Resources submenu items
  const resourcesItems = [
    {
      name: "Study Guide",
      path: "/study-clock-guide",
      icon: <BookOpen className="w-4 h-4" />,
      description: "Learn study techniques",
    },
    {
      name: "Timer Reviews",
      path: "/study-clock-recommendations",
      icon: <ShoppingCart className="w-4 h-4" />,
      description: "Best physical timers",
    },
    {
      name: "Pomodoro Technique",
      path: "/pomodoro-technique",
      icon: <Target className="w-4 h-4" />,
      description: "Master the technique",
    },
    {
      name: "About Us",
      path: "/about-us",
      icon: <Info className="w-4 h-4" />,
      description: "Learn about StudyClock",
    },
  ];

  // Check if any resources item is active
  const isResourcesActive = resourcesItems.some((item) => isActive(item.path));

  // Handle click on timer mode button
  const handleModeClick = (
    mode: "timer" | "countdown" | "pomodoro" | "clock"
  ) => {
    if (onModeChange) {
      onModeChange(mode);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <nav className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 transition-opacity"
            >
              StudyClock.com
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-black/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl p-1">
            {timerItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (onModeChange) {
                      // Map path to mode
                      if (item.path === "/study-timer")
                        handleModeClick("timer");
                      else if (item.path === "/counter")
                        handleModeClick("countdown");
                      else if (item.path === "/pomodoro-timer")
                        handleModeClick("pomodoro");
                      else if (item.path === "/study-clock-timer")
                        handleModeClick("clock");
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 hover:bg-white/10",
                    active
                      ? `bg-gradient-to-r ${item.color} shadow-lg ${item.shadowColor}`
                      : "bg-transparent"
                  )}
                >
                  {item.icon}
                  <span className="text-white/90 text-sm font-medium">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Resources Dropdown & Home */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Home Link */}
            <Link
              to="/"
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-lg text-white/70 hover:text-white/90 transition-colors",
                isActive("/") ? "text-white/90 bg-white/10" : ""
              )}
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">Home</span>
            </Link>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-white/70 hover:text-white/90 transition-colors",
                    isResourcesActive ? "text-white/90 bg-white/10" : ""
                  )}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Resources</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-gray-900/98 backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                {resourcesItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild className="p-0">
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-start gap-3 p-3 cursor-pointer transition-all duration-200 rounded-md mx-1 my-1",
                        isActive(item.path)
                          ? "bg-cyan-500/20 text-cyan-100 border border-cyan-500/30"
                          : "text-gray-200 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          isActive(item.path)
                            ? "bg-cyan-500/30 text-cyan-200"
                            : "bg-white/10 text-gray-300"
                        )}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div
                          className={cn(
                            "text-xs mt-0.5",
                            isActive(item.path)
                              ? "text-cyan-200/80"
                              : "text-gray-400"
                          )}
                        >
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 bg-black/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-xl"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5 text-white" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[80%] sm:w-[350px] bg-gray-950/95 backdrop-blur-xl border-white/10"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-between py-4">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      StudyClock.com
                    </span>
                    <SheetClose className="rounded-full p-2 hover:bg-white/10">
                      <X className="h-5 w-5 text-white" />
                    </SheetClose>
                  </div>

                  {/* Mobile Timer Navigation */}
                  <div className="mt-6">
                    <h3 className="text-sm uppercase text-white/50 mb-2 px-1">
                      Timers
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {timerItems.map((item) => (
                        <SheetClose asChild key={item.path}>
                          <Link
                            to={item.path}
                            onClick={() => {
                              if (onModeChange) {
                                // Map path to mode
                                if (item.path === "/study-timer")
                                  handleModeClick("timer");
                                else if (item.path === "/counter")
                                  handleModeClick("countdown");
                                else if (item.path === "/pomodoro-timer")
                                  handleModeClick("pomodoro");
                                else if (item.path === "/study-clock-timer")
                                  handleModeClick("clock");
                              }
                            }}
                            className={cn(
                              "flex flex-col items-center p-4 rounded-xl bg-black/50 border border-white/10 transition-all",
                              isActive(item.path)
                                ? "ring-2 ring-cyan-500/50"
                                : ""
                            )}
                          >
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                                `bg-gradient-to-r ${item.color}`
                              )}
                            >
                              {item.icon}
                            </div>
                            <span className="text-white text-sm">
                              {item.name}
                            </span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Home Link */}
                  <div className="mt-8">
                    <h3 className="text-sm uppercase text-white/50 mb-2 px-1">
                      Navigation
                    </h3>
                    <SheetClose asChild>
                      <Link
                        to="/"
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-lg w-full",
                          isActive("/")
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                          <Home className="w-4 h-4" />
                        </div>
                        <span>Home</span>
                      </Link>
                    </SheetClose>
                  </div>

                  {/* Mobile Resources Navigation */}
                  <div className="mt-6">
                    <h3 className="text-sm uppercase text-white/50 mb-2 px-1">
                      Resources
                    </h3>
                    <div className="space-y-1">
                      {resourcesItems.map((item) => (
                        <SheetClose asChild key={item.path}>
                          <Link
                            to={item.path}
                            className={cn(
                              "flex items-center gap-3 px-3 py-3 rounded-lg w-full",
                              isActive(item.path)
                                ? "bg-white/10 text-white"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                            )}
                          >
                            <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-white/50">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="mt-auto pt-8 pb-4 text-center text-white/50 text-sm">
                    <p>StudyClock.com - Focus Better</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Timer Selection for Home Page */}
          {onModeChange && location.pathname === "/" && (
            <div className="md:hidden flex items-center space-x-1 bg-black/70 backdrop-blur-xl rounded-lg border border-white/10 shadow-lg p-1">
              <button
                onClick={() => onModeChange("pomodoro")}
                className={cn(
                  "flex items-center p-1.5 rounded-md transition-all",
                  currentMode === "pomodoro"
                    ? "bg-gradient-to-r from-red-500 to-rose-600"
                    : "bg-white/5"
                )}
              >
                <Target className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => onModeChange("timer")}
                className={cn(
                  "flex items-center p-1.5 rounded-md transition-all",
                  currentMode === "timer"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                    : "bg-white/5"
                )}
              >
                <Clock className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => onModeChange("clock")}
                className={cn(
                  "flex items-center p-1.5 rounded-md transition-all",
                  currentMode === "clock"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                    : "bg-white/5"
                )}
              >
                <Watch className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => onModeChange("countdown")}
                className={cn(
                  "flex items-center p-1.5 rounded-md transition-all",
                  currentMode === "countdown"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600"
                    : "bg-white/5"
                )}
              >
                <Timer className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
