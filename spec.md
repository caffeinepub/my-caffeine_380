# নওশীন ব্রডব্যান্ড ইন্টারনেট

## Current State
The app has PWA support with a service worker that dynamically builds the manifest and serves a custom icon (`/dynamic-icon.png`) from IndexedDB when the user uploads a logo in Settings. However, the feature is not working reliably because:
1. The icon is only saved at 192×192px — Chrome requires a 512×512 icon for PWA install.
2. After saving the logo, Chrome is not notified to re-fetch the manifest (old cached manifest is used).
3. The SW only intercepts `/manifest.json` exactly — query-param variants (for cache-busting) are not handled.

## Requested Changes (Diff)

### Add
- Save logo at **512×512** resolution to IDB as `pwa_icon_512` in addition to existing `pwa_icon_192`.
- SW routes for `/dynamic-icon-192.png` and `/dynamic-icon-512.png` serving from IDB.
- After logo save: dynamically update `<link rel="manifest">` href with a `?v=TIMESTAMP` to force Chrome to re-read the manifest.
- SW manifest interception now matches any URL starting with `/manifest.json` (handles query params).

### Modify
- `useCompanySettings.ts`: `savePwaIconToIDB` saves both 192×192 and 512×512 PNGs to IDB; after save, dispatches a DOM event to update the manifest link.
- `sw.js`: Intercept both `/dynamic-icon-192.png` and `/dynamic-icon-512.png`; manifest handler matches `startsWith('/manifest.json')`; dynamic manifest references both sized icon URLs.
- `index.html`: Listen for manifest update event and refresh `<link rel="manifest">` href.

### Remove
- Old single `/dynamic-icon.png` route in SW (replaced by two separate routes).

## Implementation Plan
1. Update `useCompanySettings.ts` — save dual icon sizes, dispatch `nosheen_manifest_update` event after save.
2. Update `public/sw.js` — match manifest by prefix, add dual icon routes, update manifest JSON.
3. Update `index.html` — listen for `nosheen_manifest_update` and refresh manifest href with timestamp.
