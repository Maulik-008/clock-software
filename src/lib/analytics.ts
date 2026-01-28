import { captureEvent } from './posthog';

export const GA_MEASUREMENT_ID = import.meta.env.VITE_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Sends a page view event to Google Analytics
 */
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Sends an event to Google Analytics
 * @deprecated Use captureEvent from posthog.ts for new implementations
 */
export const event = (
  action: string,
  params: Record<string, string | number | boolean>,
): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, params);
  }
};

/**
 * Universal event tracking (sends to all configured analytics platforms)
 */
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>,
): void => {
  // Track with PostHog (primary analytics)
  captureEvent(eventName, properties);

  // Track with Google Analytics (if configured)
  if (
    properties &&
    typeof window !== 'undefined' &&
    window.gtag &&
    GA_MEASUREMENT_ID
  ) {
    window.gtag('event', eventName, properties);
  }
};
