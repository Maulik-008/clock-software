import React, { useState, useEffect } from "react";
import { Download, X, WifiOff, Smartphone, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setShowPWAPopupCallback } from "@/utils/pwaPopup";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInfoPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register callback for external access
    setShowPWAPopupCallback(() => {
      setShowPopup(true);
    });

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("pwa-info-popup-seen");
    if (hasSeenPopup === "true") {
      return;
    }

    // Show popup after a short delay (2 seconds)
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback: Show manual installation instructions
      showManualInstallInstructions();
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      localStorage.setItem("pwa-installed", "true");
      setIsInstalled(true);
      handleClose();
    } else {
      console.log("User dismissed the install prompt");
    }

    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("pwa-info-popup-seen", "true");
  };

  const showManualInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);

    let instructions = "";

    if (isIOS) {
      instructions = "Tap the Share button (square with arrow) and select 'Add to Home Screen'";
    } else if (isAndroid && isChrome) {
      instructions = "Tap the menu (3 dots) and select 'Install app' or 'Add to Home screen'";
    } else {
      instructions = "Look for the install icon in your browser's address bar or menu";
    }

    alert(`To install this app:\n\n${instructions}\n\nOr check the menu for installation options.`);
  };

  // Don't show if already installed or user has seen it
  if (isInstalled || !showPopup) {
    return null;
  }

  return (
    <Dialog open={showPopup} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-white/20 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center gap-2">
            <Smartphone className="h-6 w-6" />
            Install StudyClock App
          </DialogTitle>
          <DialogDescription className="text-gray-300 pt-2">
            Get the best experience with our Progressive Web App!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Why Install?
            </h3>
            <div className="space-y-2 pl-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Works Offline</p>
                  <p className="text-gray-400 text-sm">
                    Use all timers without internet connection
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Quick Access</p>
                  <p className="text-gray-400 text-sm">
                    Launch from your home screen instantly
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Faster Loading</p>
                  <p className="text-gray-400 text-sm">
                    Optimized performance and caching
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">App-like Experience</p>
                  <p className="text-gray-400 text-sm">
                    No browser UI, full-screen focus mode
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Offline Mode Info */}
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <WifiOff className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium text-sm">
                  Offline Mode Available
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Once installed, all features work without internet. Your timer
                  data is saved locally and syncs when you're back online.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700"
            >
              <X className="mr-2 h-4 w-4" /> Maybe Later
            </Button>
            <Button
              type="button"
              onClick={handleInstallClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Download className="mr-2 h-4 w-4" />
              {deferredPrompt ? "Install App Now" : "Show Install Options"}
            </Button>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-500 text-center pt-2">
            You can also install from the menu anytime
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PWAInfoPopup;

