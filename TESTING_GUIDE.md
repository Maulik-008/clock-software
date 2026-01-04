# Testing Guide - PWA & Offline Functionality

## 🧪 Quick Testing Steps

### Method 1: Chrome DevTools (Easiest)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open Chrome and navigate to:**
   ```
   http://localhost:8080
   ```

3. **Open DevTools:**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)
   - Or right-click → "Inspect"

4. **Test Service Worker:**
   - Go to **Application** tab
   - Click **Service Workers** in the left sidebar
   - You should see your service worker registered
   - Status should show "activated and is running"

5. **Test Offline Mode:**
   - In the **Application** tab, find **Service Workers** section
   - Check the **"Offline"** checkbox
   - OR go to **Network** tab → Select **"Offline"** from the throttling dropdown
   - Refresh the page (`F5` or `Ctrl+R`)
   - The app should still work!

6. **Test PWA Installation:**
   - Look for install icon in address bar (or menu)
   - Click it to install
   - Or go to **Application** → **Manifest** → Click **"Add to homescreen"**

### Method 2: Network Throttling

1. **Open DevTools** → **Network** tab
2. **Select throttling:**
   - Click the throttling dropdown (usually shows "No throttling")
   - Select **"Offline"**
3. **Refresh the page**
4. **Test all features**

### Method 3: Disconnect Network (Real Test)

1. **On your computer:**
   - Turn off WiFi
   - Or disconnect Ethernet cable
   - Or disable network adapter

2. **Open the app** (if already loaded)
3. **Test all features**

## 📱 Testing PWA Installation

### Chrome/Edge (Desktop)

1. **Visit the site**
2. **Look for install button:**
   - Address bar icon (usually a "+" or download icon)
   - Or three-dot menu → "Install StudyClock"
3. **Click install**
4. **App opens in standalone window**
5. **Test offline:**
   - Close the app
   - Disconnect internet
   - Open the installed app
   - Should work offline!

### Chrome (Android)

1. **Open Chrome on Android**
2. **Visit the site**
3. **Install prompt appears** (or use menu → "Add to Home screen")
4. **App icon appears on home screen**
5. **Open the app**
6. **Test offline:**
   - Turn on Airplane mode
   - Open the app
   - Should work!

### Safari (iOS)

1. **Open Safari on iPhone/iPad**
2. **Visit the site**
3. **Tap Share button** (square with arrow)
4. **Select "Add to Home Screen"**
5. **App icon appears**
6. **Open the app**
7. **Test offline:**
   - Turn on Airplane mode
   - Open the app
   - Should work!

## ✅ Feature Testing Checklist

### Test Each Feature Offline:

#### 1. **Pomodoro Timer**
- [ ] Navigate to `/pomodoro-timer`
- [ ] Start timer
- [ ] Pause timer
- [ ] Reset timer
- [ ] Audio plays when timer ends
- [ ] Notification appears
- [ ] Timer state persists after refresh

#### 2. **Study Timer**
- [ ] Navigate to `/study-timer`
- [ ] Start timer
- [ ] Timer counts up correctly
- [ ] Pause/resume works
- [ ] State persists

#### 3. **Countdown Timer**
- [ ] Navigate to `/counter`
- [ ] Set countdown time
- [ ] Start countdown
- [ ] Audio plays when done
- [ ] Notification works

#### 4. **Stopwatch**
- [ ] Navigate to `/online-stopwatch`
- [ ] Start stopwatch
- [ ] Pause works
- [ ] Reset works
- [ ] All features functional

#### 5. **Navigation**
- [ ] Navigate between all pages
- [ ] Browser back/forward works
- [ ] Direct URL access works (type URL in address bar)
- [ ] All routes load correctly

#### 6. **Full View Mode**
- [ ] Click full view button
- [ ] Navigation/footer hidden
- [ ] Timer still works
- [ ] Exit full view works
- [ ] ESC key exits full view

#### 7. **Feedback Form**
- [ ] Open feedback form
- [ ] Fill in details (offline)
- [ ] Submit form
- [ ] Should show "saved offline" message
- [ ] Reconnect internet
- [ ] Feedback should auto-send

#### 8. **Audio**
- [ ] Play alarm sound
- [ ] Play crystal sound
- [ ] Both should work offline

#### 9. **Data Persistence**
- [ ] Start a timer
- [ ] Refresh page (offline)
- [ ] Timer state should be restored
- [ ] Settings should persist

## 🔍 Debugging Tips

### Check Service Worker Status:

1. **DevTools** → **Application** → **Service Workers**
2. **Look for:**
   - Status: "activated and is running"
   - Scope: Should match your site URL
   - Source: Should show `/sw.js`

### Check Cache:

1. **DevTools** → **Application** → **Cache Storage**
2. **You should see:**
   - `studyclock-static-v2`
   - `studyclock-runtime-v2`
3. **Click each cache** to see cached files

### Check Manifest:

1. **DevTools** → **Application** → **Manifest**
2. **Verify:**
   - Name, description, icons
   - Start URL
   - Display mode

### Console Logs:

1. **DevTools** → **Console** tab
2. **Look for:**
   - `[Service Worker] Installing...`
   - `[Service Worker] Activating...`
   - `Service Worker registered:`
   - Any error messages

## 🐛 Common Issues & Solutions

### Issue: Service Worker Not Registering

**Solution:**
- Make sure you're using `http://localhost:8080` (not file://)
- Check browser console for errors
- Clear browser cache and reload
- Check if service worker file exists at `/sw.js`

### Issue: App Not Working Offline

**Solution:**
- Check if service worker is activated
- Verify cache has files in it
- Try unregistering service worker and reload
- Check network tab for failed requests

### Issue: Install Prompt Not Showing

**Solution:**
- Make sure you've visited the site at least once
- Check if app is already installed
- Try in incognito/private window
- Check manifest.json is valid
- Verify HTTPS (required for PWA, but localhost works)

### Issue: Feedback Not Syncing

**Solution:**
- Check localStorage for "pending-feedback"
- Check console for sync errors
- Verify internet connection when testing sync
- Check EmailJS configuration

## 📊 Testing Checklist Summary

### Pre-Testing:
- [ ] Development server running
- [ ] Browser DevTools open
- [ ] Service worker registered
- [ ] Cache populated

### Offline Testing:
- [ ] Enable offline mode
- [ ] Refresh page
- [ ] Test all timers
- [ ] Test navigation
- [ ] Test audio
- [ ] Test feedback form
- [ ] Test data persistence

### PWA Testing:
- [ ] Install prompt appears
- [ ] App installs successfully
- [ ] App opens in standalone mode
- [ ] App works offline after install
- [ ] App icon appears correctly
- [ ] App name displays correctly

### Reconnection Testing:
- [ ] Go back online
- [ ] Feedback auto-syncs
- [ ] Service worker updates
- [ ] Cache refreshes

## 🎯 Quick Test Script

Run this in browser console to test:

```javascript
// Check service worker
navigator.serviceWorker.getRegistration().then(reg => {
  console.log('SW registered:', !!reg);
  console.log('SW state:', reg?.active?.state);
});

// Check cache
caches.keys().then(keys => {
  console.log('Caches:', keys);
});

// Check offline status
console.log('Online:', navigator.onLine);

// Check localStorage
console.log('Pending feedback:', localStorage.getItem('pending-feedback'));
```

## 📱 Mobile Testing

### Android (Chrome):
1. Connect phone to same network
2. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Visit: `http://YOUR_IP:8080` on phone
4. Test installation and offline mode

### iOS (Safari):
1. Same as Android
2. Use Safari (not Chrome)
3. Add to home screen
4. Test offline

## ✅ Success Criteria

Your PWA is working correctly if:
- ✅ App loads when offline
- ✅ All timers work offline
- ✅ Navigation works offline
- ✅ Audio plays offline
- ✅ Data persists offline
- ✅ App can be installed
- ✅ App works in standalone mode
- ✅ Feedback queues offline
- ✅ Auto-syncs when online

---

**Happy Testing! 🚀**

