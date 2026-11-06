import { getToken } from './api.js';

// Visitor counter: sends one small, anonymous "page viewed" message to the API.
// Each browser gets a random ID (no personal details). Admin browsers are not counted.
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function visitorId() {
  try {
    let id = localStorage.getItem('di-vid');
    if (!id) {
      id = (crypto.randomUUID && crypto.randomUUID()) ||
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16); });
      localStorage.setItem('di-vid', id);
    }
    return id;
  } catch (e) { return null; } // storage blocked: skip counting
}

function device() {
  const ua = navigator.userAgent || '';
  if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) return 'tablet';
  if (/Mobi|iPhone|Android/i.test(ua) || window.innerWidth < 768) return 'mobile';
  return 'desktop';
}

let first = true;
export function trackPageView(path) {
  try {
    if (getToken()) return; // signed-in admin
    if (navigator.webdriver) return; // automated browsers
    const id = visitorId();
    if (!id) return;
    const body = JSON.stringify({ visitorId: id, path, device: device(), referrer: first ? document.referrer : '' });
    first = false;
    fetch(BASE + '/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch (e) { /* never break the page */ }
}
