import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initEmailJS } from './lib/emailjs';
import './utils/offlineSync';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';

// Initialize EmailJS
initEmailJS();

// Initialize PostHog - Official pattern from docs
posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-11-30',

  // Session recording
  session_recording: {
    maskAllInputs: true,
    maskTextSelector: '.sensitive',
  },

  // Performance
  request_batching: true,
  feature_flag_request_timeout_ms: 3000,

  // Privacy
  property_denylist: ['password', 'creditCard', 'ssn'],

  // Advanced
  persistence: 'localStorage',
  persistence_name: 'study_clock_posthog',
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('Service Worker registered:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // New service worker available
                console.log('New service worker available. Reload to update.');
                // Optionally show a notification to user
                if (confirm('A new version is available. Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });

    // Handle service worker controller changes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker controller changed - reloading...');
      window.location.reload();
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </StrictMode>,
);
