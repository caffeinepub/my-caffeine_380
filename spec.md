# নওশীন ব্রডব্যান্ড ইন্টারনেট

## Current State
Full ISP management system (v56+) with Customer Management, Financial Management, Notice Board, Social Media Poster, ID Card, Call Center, Debt Management, Settings, and About Us modules. Customer data stored in localStorage via `useLocalCustomers` hook. Basic service worker exists but only caches `/` and `/index.html`.

## Requested Changes (Diff)

### Add
- Enhanced Service Worker (`sw.js`) with cache-first strategy for JS/CSS/image assets and network-first for HTML/API
- `useOfflineStatus` hook to detect online/offline state
- Offline banner in Customer Management page showing amber alert when no internet

### Modify
- `main.tsx`: Register service worker with update detection
- `Customers.tsx`: Import and use `useOfflineStatus`, show offline indicator banner
- `sw.js`: Full rewrite with dynamic asset caching, cache versioning, old cache cleanup

### Remove
- Nothing removed

## Implementation Plan
1. Rewrite `sw.js` with cache-first for static assets, network-first for API/HTML, skipWaiting on update
2. Create `useOfflineStatus.ts` hook using navigator.onLine + online/offline events
3. Update `main.tsx` to register SW with update detection
4. Update `Customers.tsx` to show offline banner using useOfflineStatus
5. Validate and deploy
