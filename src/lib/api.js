// Small fetch wrapper for the Express API. Throws Error(message) with a readable message.
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const TOKEN_KEY = 'di-admin-token';
const API_HINT = BASE
  ? `VITE_API_URL is ${BASE}; check that address is the Express server`
  : 'start it with npm run dev:server, or set VITE_API_URL in client/.env when the API is on another domain, then rebuild';
/** Where this website sends API requests (shown on the admin login page). */
export const API_BASE = BASE || '(same site) /api';

export const getToken = () => { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; } };
export const setToken = (t) => { try { if (t) localStorage.setItem(TOKEN_KEY, t); else localStorage.removeItem(TOKEN_KEY); } catch (e) { /* storage blocked */ } };

/** Turns a stored path like /uploads/x.jpg into a full URL when the API lives on another domain. */
export const fileUrl = (u) => (!u ? '' : /^https?:\/\//.test(u) ? u : BASE + u);

export async function api(path, { method = 'GET', body, auth = false, form } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) headers.Authorization = 'Bearer ' + getToken();
  let res;
  try {
    res = await fetch(BASE + '/api' + path, { method, headers, body: form || (body !== undefined ? JSON.stringify(body) : undefined) });
  } catch (e) {
    throw Object.assign(new Error(`Cannot reach the server${BASE ? ' at ' + BASE : ''}. Make sure the API (npm run dev:server) is running, and that CLIENT_URL in server/.env includes this website's address.`), { code: 'NETWORK' });
  }
  let data = null;
  const isJson = (res.headers.get('content-type') || '').includes('application/json');
  try { data = isJson ? await res.json() : null; } catch (e) { data = null; }
  // A web page came back instead of API data: the frontend is not connected to the API
  if (!isJson && res.status !== 204) {
    throw Object.assign(new Error(`The website is not connected to the API (${API_HINT}).`), { code: 'NO_API', status: res.status });
  }
  if (!res.ok) {
    const err = new Error((data && data.error) || `Request failed (${res.status}).`);
    err.status = res.status;
    if (res.status === 401 && auth) setToken('');
    throw err;
  }
  return data;
}

/** Upload one photo or video (admin). Returns { url, type }. */
export function uploadFile(file) {
  const form = new FormData();
  form.append('file', file);
  return api('/admin/upload', { method: 'POST', form, auth: true });
}
