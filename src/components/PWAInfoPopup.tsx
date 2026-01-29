import React, { useState, useEffect } from 'react';
import {
  Download,
  X,
  WifiOff,
  Smartphone,
  Zap,
  CheckCircle2,
  Share,
  Menu,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { setShowPWAPopupCallback } from '@/utils/pwaPopup';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInfoPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Register callback for external access
    setShowPWAPopupCallback(() => {
      setShowPopup(true);
      setShowInstructions(false);
    });

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setIsInstalled(true);
      setShowPopup(false);
      localStorage.setItem('pwa-installed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('pwa-info-popup-seen');
    let timer: NodeJS.Timeout;

    if (hasSeenPopup !== 'true') {
      // Show popup after a short delay (2 seconds)
      timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback: Show manual installation instructions
      setShowInstructions(true);
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      // We don't close here immediately, we wait for appinstalled event or let it close
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('pwa-info-popup-seen', 'true');
  };

  const getManualInstructions = () => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as Window & { MSStream?: unknown }).MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      return (
        <div className='space-y-4 p-4 bg-gray-800 rounded-lg'>
          <h4 className='font-semibold text-white flex items-center gap-2'>
            <Smartphone className='h-5 w-5 text-blue-400' />
            iOS Installation
          </h4>
          <ol className='list-decimal list-inside space-y-3 text-gray-300 text-sm'>
            <li className='flex items-center gap-2'>
              <span>
                Tap the <strong>Share</strong> button in Safari
              </span>
              <Share className='h-4 w-4' />
            </li>
            <li>
              Scroll down and tap <strong>"Add to Home Screen"</strong>
            </li>
            <li>
              Tap <strong>Add</strong> in the top right corner
            </li>
          </ol>
        </div>
      );
    }

    if (isAndroid) {
      return (
        <div className='space-y-4 p-4 bg-gray-800 rounded-lg'>
          <h4 className='font-semibold text-white flex items-center gap-2'>
            <Smartphone className='h-5 w-5 text-green-400' />
            Android Installation
          </h4>
          <ol className='list-decimal list-inside space-y-3 text-gray-300 text-sm'>
            <li className='flex items-center gap-2'>
              <span>
                Tap the <strong>Menu</strong> (3 dots) button
              </span>
              <Menu className='h-4 w-4' />
            </li>
            <li>
              Select <strong>"Install app"</strong> or{' '}
              <strong>"Add to Home screen"</strong>
            </li>
            <li>Follow the on-screen prompts</li>
          </ol>
        </div>
      );
    }

    return (
      <div className='space-y-4 p-4 bg-gray-800 rounded-lg'>
        <h4 className='font-semibold text-white flex items-center gap-2'>
          <Smartphone className='h-5 w-5 text-purple-400' />
          Desktop Installation
        </h4>
        <ol className='list-decimal list-inside space-y-3 text-gray-300 text-sm'>
          <li className='flex items-center gap-2'>
            <span>
              Look for the <strong>Install</strong> icon in the address bar
            </span>
            <Download className='h-4 w-4' />
          </li>
          <li>Or click the browser menu (3 dots)</li>
          <li>
            Select <strong>"Install StudyClock"</strong>
          </li>
        </ol>
      </div>
    );
  };

  // Don't show if already installed or popup closed (and logic handles when to show)
  if (isInstalled || !showPopup) {
    return null;
  }

  return (
    <Dialog open={showPopup} onOpenChange={handleClose}>
      <DialogContent className='bg-gray-900/95 backdrop-blur-xl border-white/20 text-white max-w-lg'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center gap-2'>
            <Smartphone className='h-6 w-6' />
            {showInstructions ? 'How to Install' : 'Install StudyClock App'}
          </DialogTitle>
          <DialogDescription className='text-gray-300 pt-2'>
            {showInstructions
              ? 'Follow these steps to add the app to your home screen:'
              : 'Get the best experience with our Progressive Web App!'}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 mt-4'>
          {showInstructions ? (
            <div className='animate-in fade-in zoom-in duration-300'>
              {getManualInstructions()}
              <div className='flex justify-end pt-4'>
                <Button
                  variant='ghost'
                  onClick={() => setShowInstructions(false)}
                  className='text-gray-400 hover:text-white'
                >
                  Back to Overview
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Benefits */}
              <div className='space-y-3'>
                <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
                  <Zap className='h-5 w-5 text-yellow-400' />
                  Why Install?
                </h3>
                <div className='space-y-2 pl-2'>
                  <div className='flex items-start gap-3'>
                    <CheckCircle2 className='h-5 w-5 text-green-400 mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='text-white font-medium'>Works Offline</p>
                      <p className='text-gray-400 text-sm'>
                        Use all timers without internet connection
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <CheckCircle2 className='h-5 w-5 text-green-400 mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='text-white font-medium'>Quick Access</p>
                      <p className='text-gray-400 text-sm'>
                        Launch from your home screen instantly
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <CheckCircle2 className='h-5 w-5 text-green-400 mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='text-white font-medium'>Faster Loading</p>
                      <p className='text-gray-400 text-sm'>
                        Optimized performance and caching
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <CheckCircle2 className='h-5 w-5 text-green-400 mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='text-white font-medium'>
                        App-like Experience
                      </p>
                      <p className='text-gray-400 text-sm'>
                        No browser UI, full-screen focus mode
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offline Mode Info */}
              <div className='bg-blue-900/30 border border-blue-500/30 rounded-lg p-3'>
                <div className='flex items-start gap-2'>
                  <WifiOff className='h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0' />
                  <div>
                    <p className='text-white font-medium text-sm'>
                      Offline Mode Available
                    </p>
                    <p className='text-gray-400 text-xs mt-1'>
                      Once installed, all features work without internet. Your
                      timer data is saved locally and syncs when you're back
                      online.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row justify-end gap-2 pt-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleClose}
                  className='border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700'
                >
                  <X className='mr-2 h-4 w-4' /> Maybe Later
                </Button>
                <Button
                  type='button'
                  onClick={handleInstallClick}
                  className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                >
                  {deferredPrompt ? (
                    <>
                      <Download className='mr-2 h-4 w-4' /> Install App Now
                    </>
                  ) : (
                    <>
                      <ArrowRight className='mr-2 h-4 w-4' /> How to Install
                    </>
                  )}
                </Button>
              </div>

              {/* Note */}
              <p className='text-xs text-gray-500 text-center pt-2'>
                {deferredPrompt
                  ? 'You can also install from the browser menu anytime'
                  : "Tap 'How to Install' if the install prompt doesn't appear"}
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PWAInfoPopup;
