import { event } from '../lib/analytics';

/**
 * Custom hook for using Google Analytics event tracking in components
 */
const useAnalytics = () => {
  /**
   * Track a timer start event
   */
  const trackTimerStart = (timerType: string) => {
    event('timer_start', {
      timer_type: timerType,
    });
  };

  /**
   * Track a timer pause event
   */
  const trackTimerPause = (timerType: string, duration: number) => {
    event('timer_pause', {
      timer_type: timerType,
      duration_seconds: duration,
    });
  };

  /**
   * Track a timer complete event
   */
  const trackTimerComplete = (timerType: string, duration: number) => {
    event('timer_complete', {
      timer_type: timerType,
      duration_seconds: duration,
    });
  };

  /**
   * Track a button click event
   */
  const trackButtonClick = (buttonName: string, pagePath: string) => {
    event('button_click', {
      button_name: buttonName,
      page_path: pagePath,
    });
  };

  /**
   * Track a style change event
   */
  const trackStyleChange = (componentName: string, styleName: string) => {
    event('style_change', {
      component_name: componentName,
      style_name: styleName,
    });
  };

  /**
   * Track a feedback event
   */
  const trackFeedback = (feedbackType: string) => {
    event('feedback', {
      feedback_type: feedbackType,
    });
  };

  /**
   * Track a sound event
   */
  const trackSound = (soundType: string) => {
    event('sound', {
      sound_type: soundType,
    });
  };

  /**
   * Track a link click event
   */
  const trackLinkClick = (
    linkUrl: string,
    linkName: string,
    linkType: 'internal' | 'external'
  ) => {
    event('link_click', {
      link_url: linkUrl,
      link_name: linkName,
      link_type: linkType,
    });
  };

  /**
   * Track alarm selection (predefined)
   */
  const trackAlarmSelect = (alarmId: string, alarmName: string) => {
    event('alarm_select', {
      alarm_id: alarmId,
      alarm_name: alarmName,
      alarm_type: 'predefined',
    });
  };

  /**
   * Track custom alarm upload
   */
  const trackCustomAlarmUpload = (fileName: string, fileSize: number) => {
    event('custom_alarm_upload', {
      file_name: fileName,
      file_size_bytes: fileSize,
      file_size_mb: (fileSize / (1024 * 1024)).toFixed(2),
    });
  };

  /**
   * Track custom alarm selection
   */
  const trackCustomAlarmSelect = (alarmId: string, alarmName: string) => {
    event('alarm_select', {
      alarm_id: alarmId,
      alarm_name: alarmName,
      alarm_type: 'custom',
    });
  };

  /**
   * Track custom alarm deletion
   */
  const trackCustomAlarmDelete = (alarmId: string, alarmName: string) => {
    event('custom_alarm_delete', {
      alarm_id: alarmId,
      alarm_name: alarmName,
    });
  };

  /**
   * Track alarm preview/play
   */
  const trackAlarmPreview = (
    alarmId: string,
    alarmType: 'predefined' | 'custom'
  ) => {
    event('alarm_preview', {
      alarm_id: alarmId,
      alarm_type: alarmType,
    });
  };

  /**
   * Track Pomodoro package creation
   */
  const trackPackageCreate = (packageName: string) => {
    event('package_create', {
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
    }
  ) => {
    event('package_edit', {
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
    event('package_delete', {
      package_id: packageId,
      package_name: packageName,
    });
  };

  /**
   * Track Pomodoro package activation
   */
  const trackPackageActivate = (packageId: string, packageName: string) => {
    event('package_activate', {
      package_id: packageId,
      package_name: packageName,
    });
  };

  /**
   * Track PWA install
   */
  const trackPWAInstall = () => {
    event('pwa_install', {
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Track PWA usage (launched from home screen)
   */
  const trackPWALaunch = () => {
    event('pwa_launch', {
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
    }
  ) => {
    event('task_create', {
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
    event('task_complete', {
      task_id: taskId,
      task_type: taskType,
    });
  };

  /**
   * Track task deletion
   */
  const trackTaskDelete = (taskId: string, taskType: string) => {
    event('task_delete', {
      task_id: taskId,
      task_type: taskType,
    });
  };

  /**
   * Track task edit
   */
  const trackTaskEdit = (taskId: string, taskType: string) => {
    event('task_edit', {
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
    isPWA: boolean
  ) => {
    event('page_view', {
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
    alarmsCount: number
  ) => {
    event('storage_usage', {
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
    event('full_view_mode', {
      action: entered ? 'enter' : 'exit',
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackTimerStart,
    trackTimerPause,
    trackTimerComplete,
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
  };
};

export default useAnalytics;
