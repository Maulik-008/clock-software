/**
 * PostHog Analytics Utility Functions
 * For use in non-React code or utility functions
 * Use usePostHog() hook in React components instead
 */

import posthog from 'posthog-js';

/**
 * Capture a custom event
 */
export const captureEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
): void => {
  try {
    posthog.capture(eventName, properties);
  } catch (error) {
    console.error('Failed to capture event:', eventName, error);
  }
};

/**
 * Identify a user
 */
export const identifyUser = (
  userId: string,
  properties?: Record<string, unknown>,
): void => {
  try {
    posthog.identify(userId, properties);
  } catch (error) {
    console.error('Failed to identify user:', error);
  }
};

/**
 * Reset user identification (e.g., on logout)
 */
export const resetUser = (): void => {
  try {
    posthog.reset();
  } catch (error) {
    console.error('Failed to reset user:', error);
  }
};

/**
 * Track page view
 */
export const trackPageView = (pagePath?: string): void => {
  try {
    posthog.capture('$pageview', {
      $current_url: pagePath || window.location.href,
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

/**
 * Set user properties
 */
export const setUserProperties = (
  properties: Record<string, unknown>,
): void => {
  try {
    posthog.people.set(properties);
  } catch (error) {
    console.error('Failed to set user properties:', error);
  }
};

/**
 * Group analytics (e.g., for organizations/teams)
 */
export const groupUser = (
  groupType: string,
  groupKey: string,
  properties?: Record<string, unknown>,
): void => {
  try {
    posthog.group(groupType, groupKey, properties);
  } catch (error) {
    console.error('Failed to group user:', error);
  }
};

/**
 * Feature flag utilities
 */
export const isFeatureEnabled = (flagKey: string): boolean => {
  try {
    return posthog.isFeatureEnabled(flagKey) || false;
  } catch (error) {
    console.error('Failed to check feature flag:', flagKey, error);
    return false;
  }
};

export const getFeatureFlagPayload = (flagKey: string): unknown => {
  try {
    return posthog.getFeatureFlagPayload(flagKey);
  } catch (error) {
    console.error('Failed to get feature flag payload:', flagKey, error);
    return null;
  }
};

/**
 * Timer tracking utilities
 */
export const startTimerSession = (
  timerType: 'study' | 'pomodoro' | 'countdown' | 'stopwatch',
): void => {
  captureEvent('timer_started', {
    timer_type: timerType,
    timestamp: new Date().toISOString(),
  });
};

export const endTimerSession = (
  timerType: 'study' | 'pomodoro' | 'countdown' | 'stopwatch',
  duration: number,
  completed: boolean,
): void => {
  captureEvent('timer_ended', {
    timer_type: timerType,
    duration_seconds: duration,
    completed,
    timestamp: new Date().toISOString(),
  });
};

export const pauseTimerSession = (
  timerType: string,
  currentDuration: number,
): void => {
  captureEvent('timer_paused', {
    timer_type: timerType,
    duration_seconds: currentDuration,
    timestamp: new Date().toISOString(),
  });
};

export const resumeTimerSession = (
  timerType: string,
  currentDuration: number,
): void => {
  captureEvent('timer_resumed', {
    timer_type: timerType,
    duration_seconds: currentDuration,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Todo list tracking
 */
export const trackTodoAction = (
  action: 'created' | 'completed' | 'deleted' | 'updated',
  todoCount?: number,
): void => {
  captureEvent('todo_action', {
    action,
    todo_count: todoCount,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Alarm tracking
 */
export const trackAlarmAction = (
  action: 'set' | 'triggered' | 'dismissed' | 'snoozed',
): void => {
  captureEvent('alarm_action', {
    action,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Error tracking
 */
export const trackError = (
  error: Error,
  context?: Record<string, unknown>,
): void => {
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
};

/**
 * Opt-out of analytics
 */
export const optOut = (): void => {
  posthog.opt_out_capturing();
};

/**
 * Opt-in to analytics
 */
export const optIn = (): void => {
  posthog.opt_in_capturing();
};

export default posthog;
