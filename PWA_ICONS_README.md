# PWA Icons Setup

## Current Status
The PWA is configured to use the existing `favicon.ico` for icons. For better PWA support, you should create dedicated PNG icons.

## Recommended Icon Sizes
- **192x192** - For Android home screen and splash screen
- **512x512** - For Android splash screen and app store listings

## How to Generate Icons

### Option 1: Online Tools
1. Use tools like:
   - https://realfavicongenerator.net/
   - https://www.pwabuilder.com/imageGenerator
   - https://favicon.io/

2. Upload your logo/icon (at least 512x512px)
3. Generate the required sizes
4. Place the generated files in the `/public` folder:
   - `pwa-icon-192.png`
   - `pwa-icon-512.png`

### Option 2: Manual Creation
1. Create a square icon (512x512px recommended)
2. Export as PNG at 192x192 and 512x512 sizes
3. Save as:
   - `/public/pwa-icon-192.png`
   - `/public/pwa-icon-512.png`

### Option 3: Using Image Editing Software
- Use Photoshop, GIMP, or Figma
- Export at the required sizes
- Ensure icons are square and have transparent backgrounds (if needed)

## Update manifest.json
Once you have the PNG icons, update `/public/manifest.json`:

```json
"icons": [
  {
    "src": "/pwa-icon-192.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "any maskable"
  },
  {
    "src": "/pwa-icon-512.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any maskable"
  }
]
```

## Testing
After adding icons:
1. Clear browser cache
2. Test PWA installation
3. Verify icons appear correctly on home screen

