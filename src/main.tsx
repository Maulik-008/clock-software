import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initEmailJS } from "./lib/emailjs";
import "./utils/offlineSync";

// Initialize EmailJS
initEmailJS();

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("Service Worker registered:", registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Handle service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                // New service worker available
                console.log("New service worker available. Reload to update.");
                // Optionally show a notification to user
                if (confirm("A new version is available. Reload to update?")) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });

    // Handle service worker controller changes
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("Service Worker controller changed - reloading...");
      window.location.reload();
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
