import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAnalytics from '@/hooks/use-analytics';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt: React.FC = () => {
  const analytics = useAnalytics();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      // Track PWA launch
      analytics.trackPWALaunch();
      return;
    }

    // Check if app was installed before
    const installed = localStorage.getItem('pwa-installed');
    if (installed === 'true') {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      localStorage.setItem('pwa-installed', 'true');
      setIsInstalled(true);
      // Track PWA install
      analytics.trackPWAInstall();
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (
    isInstalled ||
    !showInstallPrompt ||
    !deferredPrompt ||
    sessionStorage.getItem('pwa-prompt-dismissed') === 'true'
  ) {
    return null;
  }

  return (
    <Dialog open={showInstallPrompt} onOpenChange={setShowInstallPrompt}>
      <DialogContent className='bg-gray-900/95 backdrop-blur-xl border-white/20 text-white max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
            Install StudyClock App
          </DialogTitle>
          <DialogDescription className='text-gray-300'>
            Install StudyClock as a Progressive Web App for a better experience!
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 mt-4'>
          <div className='space-y-2'>
            <p className='text-sm text-gray-300'>
              Get the full app experience:
            </p>
            <ul className='list-disc list-inside text-sm text-gray-400 space-y-1 ml-2'>
              <li>Quick access from your home screen</li>
              <li>Works offline</li>
              <li>Faster loading times</li>
              <li>No need to open browser</li>
            </ul>
          </div>
          <div className='flex justify-end gap-2 pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={handleDismiss}
              className='border-gray-700 text-gray-300 bg-gray-800'
            >
              <X className='mr-2 h-4 w-4' /> Maybe Later
            </Button>
            <Button
              type='button'
              onClick={handleInstallClick}
              className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            >
              <Download className='mr-2 h-4 w-4' /> Install App
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PWAInstallPrompt;
