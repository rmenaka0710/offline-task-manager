# Offline-First Task Manager

A demo PWA with cached HTML/CSS/JS, IndexedDB for offline tasks and a queued-sync Express API. No Postman required.

## Run in VS Code / PowerShell

```powershell
npm install
npm start
```

Open **http://localhost:3000** in Chrome or Edge while online. Wait for the service worker to install and refresh once. Add a task, then use DevTools > Network > Offline (or turn off Wi-Fi if your server is remote). Reload, add more tasks, and check their **Pending sync** labels. Re-enable networking. Pending tasks will sync automatically, typically within five seconds. Check `tasks.json` to verify persistence on the server.

**Important:** Turning off Wi-Fi alone does not disconnect `localhost`; for a convincing localhost demo, use Chrome DevTools > Network > Offline, or host the app on HTTPS and test from a different device. Service workers require HTTPS except on localhost. The first visit must be online to cache assets. The demo uses a simple timestamp-based conflict policy, not production-grade multi-device conflict resolution. The JSON file is a single-process demonstration store, not a production database. Background Sync API is not required: synchronization occurs when the page is open and the connection returns.

## Reel flow
1. Show an online task saved as **Synced**.
2. Switch DevTools to Offline, reload the page, and add two tasks.
3. Show **Pending sync** labels and `IndexedDB` under DevTools > Application.
4. Switch DevTools to Online; show the labels change to **Synced**.
5. Open `tasks.json` in VS Code to show the tasks reached the backend.

## Files
- `public/sw.js` caches the app shell.
- `public/app.js` handles IndexedDB, task queue, and sync.
- `server.js` implements `/api/health`, `/api/tasks`, `/api/sync`.
- `tasks.json` is created automatically on the first successful sync.
