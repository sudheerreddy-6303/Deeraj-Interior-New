import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, setToken } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';

export default function Login({ onLogin }) {
  const notify = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setErr('Enter your email and password.'); return; }
    setBusy(true); setErr('');
    try {
      const r = await api('/auth/login', { method: 'POST', body: { email: email.trim(), password } });
      if (!r || !r.token) throw new Error('The server did not return a login token. Please check that the API is running.');
      setToken(r.token);
      notify(`Welcome back, ${r.admin.name}`);
      onLogin(r.admin);
    } catch (x) {
      setErr(x.message); notify(x.message, 'danger');
    } finally { setBusy(false); }
  };

  return (
    <div className="admin d-flex align-items-center justify-content-center px-3" style={{ minHeight: '100vh' }}>
      <form className="card shadow-sm p-4 w-100" style={{ maxWidth: 400 }} onSubmit={submit} noValidate>
        <div className="brand brand-logo admin-brand mb-3"><img src="/logo.png" alt="Deeraj Interiors" width="523" height="129" /><span>STORE ADMIN</span></div>
        <h1 className="h4 mb-3">Sign in</h1>
        <div className="mb-3">
          <label className="form-label" htmlFor="ad-email">Email</label>
          <input id="ad-email" className="form-control" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="ad-pass">Password</label>
          <input id="ad-pass" className="form-control" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {err && <div className="alert alert-danger py-2" role="alert">{err}</div>}
        <button className="btn btn-primary w-100" type="submit" disabled={busy}>
          {busy ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Signing in…</> : 'Sign in'}
        </button>
        <Link className="d-block text-center mt-3 small" to="/">← Back to website</Link>
      </form>
    </div>
  );
}
