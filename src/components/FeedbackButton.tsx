import React from "react";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FeedbackForm from "@/components/FeedbackForm";

const FeedbackButton: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-20 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          aria-label="Send Feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Send Feedback
          </DialogTitle>
        </DialogHeader>
        <FeedbackForm />
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackButton;
