export const GA_MEASUREMENT_ID = "G-6KLNQSMLNM";

/**
 * Sends a page view event to Google Analytics
 */
export const pageview = (url: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Sends an event to Google Analytics
 */
export const event = (
  action: string,
  params: Record<string, string | number | boolean>
): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
};
