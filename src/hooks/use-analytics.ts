import { trackEvent } from '../lib/analytics';
import { usePostHog } from 'posthog-js/react';

/**
 * Custom hook for unified analytics tracking
 * Supports both PostHog (primary) and Google Analytics (optional)
 */
const useAnalytics = () => {
  const posthog = usePostHog();
  /**
   * Track a timer start event
   */
  const trackTimerStart = (timerType: string) => {
    trackEvent('timer_start', {
      timer_type: timerType,
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track a timer pause event
   */
  const trackTimerPause = (timerType: string, duration: number) => {
    trackEvent('timer_pause', {
      timer_type: timerType,
      duration_seconds: duration,
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track a timer complete event
   */
  const trackTimerComplete = (timerType: string, duration: number) => {
    trackEvent('timer_complete', {
      timer_type: timerType,
      duration_seconds: duration,
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track a button click event
   */
  const trackButtonClick = (buttonName: string, pagePath: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      page_path: pagePath,
    });
  };

  /**
   * Track a style change event
   */
  const trackStyleChange = (componentName: string, styleName: string) => {
    trackEvent('style_change', {
      component_name: componentName,
      style_name: styleName,
    });
  };

  /**
   * Track a feedback event
   */
  const trackFeedback = (feedbackType: string) => {
    trackEvent('feedback', {
      feedback_type: feedbackType,
    });
  };

  /**
   * Track a sound event
   */
  const trackSound = (soundType: string) => {
    trackEvent('sound', {
      sound_type: soundType,
    });
  };

  /**
   * Track a link click event
   */
  const trackLinkClick = (
    linkUrl: string,
    linkName: string,
    linkType: 'internal' | 'external',
  ) => {
    trackEvent('link_click', {
      link_url: linkUrl,
      link_name: linkName,
      link_type: linkType,
    });
  };

  /**
   * Track alarm selection (predefined)
   */
  const trackAlarmSelect = (alarmId: string, alarmName: string) => {
    trackEvent('alarm_select', {
      alarm_id: alarmId,
      alarm_name: alarmName,
      alarm_type: 'predefined',
    });
  };

  /**
   * Track custom alarm upload
   */
  const trackCustomAlarmUpload = (fileName: string, fileSize: number) => {
    trackEvent('custom_alarm_upload', {
      file_name: fileName,
      file_size_bytes: fileSize,
      file_size_mb: (fileSize / (1024 * 1024)).toFixed(2),
    });
  };

  /**
   * Track custom alarm selection
   */
  const trackCustomAlarmSelect = (alarmId: string, alarmName: string) => {
    trackEvent('alarm_select', {
      alarm_id: alarmId,
      alarm_name: alarmName,
      alarm_type: 'custom',
    });
  };

  /**
   * Track custom alarm deletion
   */
  const trackCustomAlarmDelete = (alarmId: string, alarmName: string) => {
    trackEvent('custom_alarm_delete', {
      alarm_id: alarmId,
      alarm_name: alarmName,
    });
  };

  /**
   * Track alarm preview/play
   */
  const trackAlarmPreview = (
    alarmId: string,
    alarmType: 'predefined' | 'custom',
  ) => {
    trackEvent('alarm_preview', {
      alarm_id: alarmId,
      alarm_type: alarmType,
    });
  };

  /**
   * Track Pomodoro package creation
   */
  const trackPackageCreate = (packageName: string) => {
    trackEvent('package_create', {
      package_name: packageName,
    });
  };

  /**
   * Track Pomodoro package edit/save
   */
  const trackPackageEdit = (
    packageId: string,
    packageName: string,
    settings: {
      pomodoro: number;
      shortBreak: number;
      longBreak: number;
    },
  ) => {
    trackEvent('package_edit', {
      package_id: packageId,
      package_name: packageName,
      pomodoro_minutes: settings.pomodoro,
      short_break_minutes: settings.shortBreak,
      long_break_minutes: settings.longBreak,
    });
  };

  /**
   * Track Pomodoro package deletion
   */
  const trackPackageDelete = (packageId: string, packageName: string) => {
    trackEvent('package_delete', {
      package_id: packageId,
      package_name: packageName,
    });
  };

  /**
   * Track Pomodoro package activation
   */
  const trackPackageActivate = (packageId: string, packageName: string) => {
    trackEvent('package_activate', {
      package_id: packageId,
      package_name: packageName,
    });
  };

  /**
   * Track PWA install
   */
  const trackPWAInstall = () => {
    trackEvent('pwa_install', {
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track PWA usage (launched from home screen)
   */
  const trackPWALaunch = () => {
    trackEvent('pwa_launch', {
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track task creation
   */
  const trackTaskCreate = (
    taskType: string,
    taskData?: {
      hasDeadline?: boolean;
      hasDuration?: boolean;
      priority?: string;
    },
  ) => {
    trackEvent('task_create', {
      task_type: taskType,
      has_deadline: taskData?.hasDeadline || false,
      has_duration: taskData?.hasDuration || false,
      priority: taskData?.priority || 'none',
    });
  };

  /**
   * Track task completion
   */
  const trackTaskComplete = (taskId: string, taskType: string) => {
    trackEvent('task_complete', {
      task_id: taskId,
      task_type: taskType,
    });
  };

  /**
   * Track task deletion
   */
  const trackTaskDelete = (taskId: string, taskType: string) => {
    trackEvent('task_delete', {
      task_id: taskId,
      task_type: taskType,
    });
  };

  /**
   * Track task edit
   */
  const trackTaskEdit = (taskId: string, taskType: string) => {
    trackEvent('task_edit', {
      task_id: taskId,
      task_type: taskType,
    });
  };

  /**
   * Track page navigation in PWA
   */
  const trackPageView = (
    pagePath: string,
    pageTitle: string,
    isPWA: boolean,
  ) => {
    trackEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      is_pwa: isPWA,
      display_mode: window.matchMedia('(display-mode: standalone)').matches
        ? 'standalone'
        : 'browser',
    });
  };

  /**
   * Track storage usage
   */
  const trackStorageUsage = (
    totalUsed: number,
    maxStorage: number,
    alarmsCount: number,
  ) => {
    trackEvent('storage_usage', {
      total_used_mb: (totalUsed / (1024 * 1024)).toFixed(2),
      max_storage_mb: (maxStorage / (1024 * 1024)).toFixed(2),
      percentage_used: ((totalUsed / maxStorage) * 100).toFixed(2),
      custom_alarms_count: alarmsCount,
    });
  };

  /**
   * Track Full View Mode toggle
   */
  const trackFullViewMode = (entered: boolean) => {
    trackEvent('full_view_mode', {
      action: entered ? 'enter' : 'exit',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track custom event (direct access)
   */
  const trackCustomEvent = (
    eventName: string,
    properties?: Record<string, unknown>,
  ) => {
    trackEvent(eventName, properties);
  };

  /**
   * Identify user (for authenticated users)
   */
  const identifyUser = (
    userId: string,
    properties?: Record<string, unknown>,
  ) => {
    if (!posthog) return;
    try {
      posthog.identify(userId, properties);
    } catch (error) {
      console.error('Failed to identify user:', error);
    }
  };

  /**
   * Reset user (on logout)
   */
  const resetUser = () => {
    if (!posthog) return;
    try {
      posthog.reset();
    } catch (error) {
      console.error('Failed to reset user:', error);
    }
  };

  /**
   * Set user properties
   */
  const setUserProperties = (properties: Record<string, unknown>) => {
    if (!posthog) return;
    try {
      posthog.people.set(properties);
    } catch (error) {
      console.error('Failed to set user properties:', error);
    }
  };

  /**
   * Check if feature flag is enabled
   */
  const isFeatureEnabled = (flagKey: string): boolean => {
    if (!posthog) return false;
    try {
      return posthog.isFeatureEnabled(flagKey) || false;
    } catch (error) {
      console.error('Failed to check feature flag:', error);
      return false;
    }
  };

  return {
    // Timer tracking
    trackTimerStart,
    trackTimerPause,
    trackTimerComplete,
    // UI tracking
    trackButtonClick,
    trackStyleChange,
    trackFeedback,
    trackSound,
    trackLinkClick,
    // Alarm tracking
    trackAlarmSelect,
    trackCustomAlarmUpload,
    trackCustomAlarmSelect,
    trackCustomAlarmDelete,
    trackAlarmPreview,
    // Package tracking
    trackPackageCreate,
    trackPackageEdit,
    trackPackageDelete,
    trackPackageActivate,
    // PWA tracking
    trackPWAInstall,
    trackPWALaunch,
    // Task tracking
    trackTaskCreate,
    trackTaskComplete,
    trackTaskDelete,
    trackTaskEdit,
    // General tracking
    trackPageView,
    trackStorageUsage,
    trackFullViewMode,
    // Custom event tracking
    trackCustomEvent,
    // User management
    identifyUser,
    resetUser,
    setUserProperties,
    // Feature flags
    isFeatureEnabled,
    // Raw PostHog instance for advanced usage
    posthog,
  };
};

export default useAnalytics;
