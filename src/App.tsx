import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Analytics from "./components/Analytics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PomodoroTechnique from "./pages/PomodoroTechnique";
import StudyClockGuide from "./pages/StudyClockGuide";
import StudyClockRecommendations from "./pages/StudyClockRecommendations";
import AboutUs from "./pages/AboutUs";
import StudyTimer from "./pages/StudyTimer";
import Counter from "./pages/Counter";
import PomodoroTimerPage from "./pages/PomodoroTimer";
import StudyClockTimer from "./pages/StudyClockTimer";
import Stopwatch from "./pages/Stopwatch";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import StudyTodoList from "./pages/StudyTodoList";
import EndTimeTimer from "./pages/EndTimeTimer";
import FocusTest from "./pages/FocusTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Analytics />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/study-timer" element={<StudyTimer />} />
            <Route path="/online-stopwatch" element={<Stopwatch />} />
            <Route path="/study-clock-timer" element={<StudyClockTimer />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/pomodoro-timer" element={<PomodoroTimerPage />} />
            <Route path="/pomodoro-technique" element={<PomodoroTechnique />} />
            <Route path="/study-clock-guide" element={<StudyClockGuide />} />
            <Route
              path="/study-clock-recommendations"
              element={<StudyClockRecommendations />}
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/study-todo-list" element={<StudyTodoList />} />
            <Route path="/end-time-timer" element={<EndTimeTimer />} />
            <Route path="/focus-test" element={<FocusTest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
