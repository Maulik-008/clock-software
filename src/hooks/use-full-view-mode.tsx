import React, { createContext, useContext, useState, ReactNode } from "react";

interface FullViewModeContextType {
  isFullView: boolean;
  toggleFullView: () => void;
  setFullView: (value: boolean) => void;
}

const FullViewModeContext = createContext<FullViewModeContextType | undefined>(
  undefined
);

export const FullViewModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isFullView, setIsFullView] = useState(false);

  const toggleFullView = () => {
    setIsFullView((prev) => !prev);
  };

  const setFullView = (value: boolean) => {
    setIsFullView(value);
  };

  return (
    <FullViewModeContext.Provider
      value={{ isFullView, toggleFullView, setFullView }}
    >
      {children}
    </FullViewModeContext.Provider>
  );
};

export const useFullViewMode = () => {
  const context = useContext(FullViewModeContext);
  if (context === undefined) {
    throw new Error(
      "useFullViewMode must be used within a FullViewModeProvider"
    );
  }
  return context;
};

