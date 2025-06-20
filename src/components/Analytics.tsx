import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID, pageview } from "../lib/analytics";

// Add type declaration for window.gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: string,
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Add Google Analytics script on first render
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { page_path: '${location.pathname}' });
    `;
    document.head.appendChild(script2);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [location.pathname]);

  // Track page views when location changes
  useEffect(() => {
    pageview(location.pathname);
  }, [location.pathname]);

  return null;
};

export default Analytics;
