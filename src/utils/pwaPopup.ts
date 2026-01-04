// Utility to show PWA popup programmatically
let showPWAPopupCallback: (() => void) | null = null;

export const setShowPWAPopupCallback = (callback: () => void) => {
  showPWAPopupCallback = callback;
};

export const showPWAPopup = () => {
  if (showPWAPopupCallback) {
    showPWAPopupCallback();
  }
};

