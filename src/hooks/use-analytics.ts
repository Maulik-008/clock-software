import { event } from "../lib/analytics";

/**
 * Custom hook for using Google Analytics event tracking in components
 */
const useAnalytics = () => {
  /**
   * Track a timer start event
   */
  const trackTimerStart = (timerType: string) => {
    event("timer_start", {
      timer_type: timerType,
    });
  };

  /**
   * Track a timer pause event
   */
  const trackTimerPause = (timerType: string, duration: number) => {
    event("timer_pause", {
      timer_type: timerType,
      duration_seconds: duration,
    });
  };

  /**
   * Track a timer complete event
   */
  const trackTimerComplete = (timerType: string, duration: number) => {
    event("timer_complete", {
      timer_type: timerType,
      duration_seconds: duration,
    });
  };

  /**
   * Track a button click event
   */
  const trackButtonClick = (buttonName: string, pagePath: string) => {
    event("button_click", {
      button_name: buttonName,
      page_path: pagePath,
    });
  };

  /**
   * Track a style change event
   */
  const trackStyleChange = (componentName: string, styleName: string) => {
    event("style_change", {
      component_name: componentName,
      style_name: styleName,
    });
  };

  return {
    trackTimerStart,
    trackTimerPause,
    trackTimerComplete,
    trackButtonClick,
    trackStyleChange,
  };
};

export default useAnalytics;
