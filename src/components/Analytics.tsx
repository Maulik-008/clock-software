import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePostHog } from 'posthog-js/react';
import { GA_MEASUREMENT_ID, pageview } from '../lib/analytics';

// Add type declaration for window.gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: string,
      targetId: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

/**
 * Analytics Component
 * Handles both PostHog and Google Analytics tracking
 * Best practice: Centralized analytics tracking
 */
const Analytics = () => {
  const location = useLocation();
  const posthog = usePostHog();

  // Initialize Google Analytics (optional - keep for backward compatibility)
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Add Google Analytics script on first render
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { page_path: '${location.pathname}' });
    `;
    document.head.appendChild(script2);

    // Clean up on component unmount
    return () => {
      try {
        document.head.removeChild(script1);
        document.head.removeChild(script2);
      } catch (e) {
        // Ignore errors if scripts are already removed
      }
    };
  }, []); // Only run once on mount

  // Track page views when location changes
  useEffect(() => {
    // Track with Google Analytics (if enabled)
    if (GA_MEASUREMENT_ID) {
      pageview(location.pathname);
    }

    // Track with PostHog
    if (posthog) {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        path: location.pathname,
        referrer: document.referrer,
      });
    }
  }, [location.pathname, posthog]);

  // Track scroll depth
  useEffect(() => {
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollPercentage = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100,
      );

      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;

        // Track milestones: 25%, 50%, 75%, 100%
        if ([25, 50, 75, 100].includes(scrollPercentage)) {
          posthog?.capture('scroll_depth', {
            depth: scrollPercentage,
            page: location.pathname,
          });
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, [location.pathname, posthog]);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000); // in seconds

      // Only track if user spent more than 5 seconds on page
      if (timeOnPage > 5) {
        posthog?.capture('time_on_page', {
          duration_seconds: timeOnPage,
          page: location.pathname,
        });
      }
    };
  }, [location.pathname, posthog]);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      posthog?.capture('network_status_changed', {
        status: 'online',
      });
    };

    const handleOffline = () => {
      posthog?.capture('network_status_changed', {
        status: 'offline',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [posthog]);

  // Track visibility changes (tab switching)
  useEffect(() => {
    let visibilityStartTime = Date.now();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched away from tab
        const visibilityDuration = Math.round(
          (Date.now() - visibilityStartTime) / 1000,
        );

        if (visibilityDuration > 5) {
          posthog?.capture('tab_visibility_changed', {
            visible: false,
            duration_seconds: visibilityDuration,
            page: location.pathname,
          });
        }
      } else {
        // User returned to tab
        visibilityStartTime = Date.now();
        posthog?.capture('tab_visibility_changed', {
          visible: true,
          page: location.pathname,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname, posthog]);

  return null;
};

export default Analytics;
