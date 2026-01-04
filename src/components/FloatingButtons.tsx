import React from "react";
import FeedbackButton from "./FeedbackButton";
import FullViewModeButton from "./FullViewModeButton";

/**
 * FloatingButtons component - Always visible buttons that are rendered outside of Footer
 * This ensures they remain visible even when Footer is hidden in full view mode
 */
const FloatingButtons: React.FC = () => {
  return (
    <>
      <FeedbackButton />
      <FullViewModeButton />
    </>
  );
};

export default FloatingButtons;

