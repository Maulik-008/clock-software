import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PomodoroTechnique from "./pages/PomodoroTechnique";
import StudyClockGuide from "./pages/StudyClockGuide";
import AboutUs from "./pages/AboutUs";
import StudyTimer from "./pages/StudyTimer";
import Counter from "./pages/Counter";
import PomodoroTimerPage from "./pages/PomodoroTimer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/study-timer" element={<StudyTimer />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/pomodoro-timer" element={<PomodoroTimerPage />} />
          <Route path="/pomodoro-technique" element={<PomodoroTechnique />} />
          <Route path="/study-clock-guide" element={<StudyClockGuide />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
