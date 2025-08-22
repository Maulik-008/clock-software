import React from "react";
import { Link } from "react-router-dom";
import FeedbackButton from "./FeedbackButton";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 pb-4 pt-2 text-center text-gray-500">
      <div className="flex flex-wrap justify-center gap-4 mb-2 text-sm">
        <Link
          to="/"
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/pomodoro-technique"
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          Pomodoro Technique
        </Link>
        <Link
          to="/study-clock-guide"
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          Study Guide
        </Link>
        <Link
          to="/about-us"
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          About Us
        </Link>
      </div>
      <p>StudyClock.com - Focus Better, Achieve More</p>
      <FeedbackButton />
    </footer>
  );
};

export default Footer;
