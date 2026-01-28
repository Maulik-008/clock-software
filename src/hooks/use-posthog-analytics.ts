import { usePostHog } from '@posthog/react';
import { useCallback } from 'react';

/**
 * Custom hook for PostHog analytics
 * Provides a clean interface for tracking events in components
 */
export const usePostHogAnalytics = () => {
  const posthog = usePostHog();

  /**
   * Track a custom event
   */
  const trackEvent = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      if (!posthog) return;

      try {
        posthog.capture(eventName, properties);
      } catch (error) {
        console.error('Failed to track event:', error);
      }
    },
    [posthog],
  );

  /**
   * Timer tracking methods
   */
  const trackTimerStart = useCallback(
    (timerType: 'study' | 'pomodoro' | 'countdown' | 'stopwatch') => {
      trackEvent('timer_started', {
        timer_type: timerType,
        timestamp: new Date().toISOString(),
      });
    },
    [trackEvent],
  );

  const trackTimerEnd = useCallback(
    (
      timerType: 'study' | 'pomodoro' | 'countdown' | 'stopwatch',
      duration: number,
      completed: boolean,
    ) => {
      trackEvent('timer_ended', {
        timer_type: timerType,
        duration_seconds: duration,
        completed,
        timestamp: new Date().toISOString(),
      });
    },
    [trackEvent],
  );

  const trackTimerPause = useCallback(
    (timerType: string, currentDuration: number) => {
      trackEvent('timer_paused', {
        timer_type: timerType,
        duration_seconds: currentDuration,
        timestamp: new Date().toISOString(),
      });
    },
    [trackEvent],
  );

  const trackTimerResume = useCallback(
    (timerType: string, currentDuration: number) => {
      trackEvent('timer_resumed', {
        timer_type: timerType,
        duration_seconds: currentDuration,
        timestamp: new Date().toISOString(),
      });
    },
    [trackEvent],
  );

  /**
   * Todo list tracking
   */
  const trackTodoAction = useCallback(
    (
      action: 'created' | 'completed' | 'deleted' | 'updated',
      todoCount?: number,
    ) => {
      trackEvent('todo_action', {
        action,
        todo_count: todoCount,
        timestamp: new Date().toISOString(),
      });
    },
    [trackEvent],
  );

  /**
   * Alarm tracking
   */
  const trackAlarmAction = useCallback(
    (action: 'set' | 'triggered' | 'dismissed' | 'snoozed') => {
      trackEvent('alarm_action', {
        action,
        timestamp: new Date().toISOString(),
      });
    },
    [trackEvent],
  );

  /**
   * Button click tracking
   */
  const trackButtonClick = useCallback(
    (buttonName: string, context?: Record<string, any>) => {
      trackEvent('button_clicked', {
        button_name: buttonName,
        ...context,
      });
    },
    [trackEvent],
  );

  /**
   * Form submission tracking
   */
  const trackFormSubmission = useCallback(
    (formName: string, success: boolean, context?: Record<string, any>) => {
      trackEvent('form_submitted', {
        form_name: formName,
        success,
        ...context,
      });
    },
    [trackEvent],
  );

  /**
   * Error tracking
   */
  const trackError = useCallback(
    (error: Error, context?: Record<string, any>) => {
      if (!posthog) return;

      try {
        posthog.capture('$exception', {
          $exception_message: error.message,
          $exception_type: error.name,
          $exception_stack_trace: error.stack,
          ...context,
        });
      } catch (err) {
        console.error('Failed to track error:', err);
      }
    },
    [posthog],
  );

  /**
   * User identification
   */
  const identifyUser = useCallback(
    (userId: string, properties?: Record<string, any>) => {
      if (!posthog) return;

      try {
        posthog.identify(userId, properties);
      } catch (error) {
        console.error('Failed to identify user:', error);
      }
    },
    [posthog],
  );

  /**
   * Reset user (logout)
   */
  const resetUser = useCallback(() => {
    if (!posthog) return;

    try {
      posthog.reset();
    } catch (error) {
      console.error('Failed to reset user:', error);
    }
  }, [posthog]);

  /**
   * Set user properties
   */
  const setUserProperties = useCallback(
    (properties: Record<string, any>) => {
      if (!posthog) return;

      try {
        posthog.people.set(properties);
      } catch (error) {
        console.error('Failed to set user properties:', error);
      }
    },
    [posthog],
  );

  /**
   * Feature flag methods
   */
  const isFeatureEnabled = useCallback(
    (flagKey: string): boolean => {
      if (!posthog) return false;

      try {
        return posthog.isFeatureEnabled(flagKey) || false;
      } catch (error) {
        console.error('Failed to check feature flag:', error);
        return false;
      }
    },
    [posthog],
  );

  const getFeatureFlagPayload = useCallback(
    (flagKey: string): any => {
      if (!posthog) return null;

      try {
        return posthog.getFeatureFlagPayload(flagKey);
      } catch (error) {
        console.error('Failed to get feature flag payload:', error);
        return null;
      }
    },
    [posthog],
  );

  return {
    // Core methods
    trackEvent,
    trackError,

    // Timer methods
    trackTimerStart,
    trackTimerEnd,
    trackTimerPause,
    trackTimerResume,

    // Todo methods
    trackTodoAction,

    // Alarm methods
    trackAlarmAction,

    // UI interaction methods
    trackButtonClick,
    trackFormSubmission,

    // User methods
    identifyUser,
    resetUser,
    setUserProperties,

    // Feature flags
    isFeatureEnabled,
    getFeatureFlagPayload,

    // Raw PostHog instance
    posthog,
  };
};
