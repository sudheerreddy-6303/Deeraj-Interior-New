import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Container, Offcanvas } from 'react-bootstrap';
import { api, getToken, setToken } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Products from './Products.jsx';
import Orders from './Orders.jsx';
import Enquiries from './Enquiries.jsx';
import Settings from './Settings.jsx';
import Payments from './Payments.jsx';
import Refunds from './Refunds.jsx';
import PaymentSettings from './PaymentSettings.jsx';

// Store admin panel at /admin. Everything in the online store is operated from here.
const LINKS = [['', 'Dashboard'], ['products', 'Products'], ['orders', 'Orders'], ['enquiries', 'Enquiries'], ['settings', 'Settings']];
const ICONS = {
  '': <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
  products: <><path d="M21 16V8l-9-5-9 5v8l9 5z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></>,
  orders: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></>,
  enquiries: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>
};
// Payments group in the sidebar
const PAY_LINKS = [['payments', 'Payment history'], ['refunds', 'Refunds'], ['payment-settings', 'Payment settings']];
Object.assign(ICONS, {
  payments: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></>,
  refunds: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>,
  'payment-settings': <><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" /></>
});
const Ico = ({ d, s = 20 }) => <svg aria-hidden="true" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;

export default function AdminApp() {
  const notify = useToast();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(!!getToken());
  const [menu, setMenu] = useState(false);
  // desktop sidebar can be minimised to icons only; the choice is remembered on this computer
  const [mini, setMini] = useState(() => { try { return localStorage.getItem('di-admin-mini') === '1'; } catch (e) { return false; } });
  const toggleMini = () => setMini((m) => { const v = !m; try { localStorage.setItem('di-admin-mini', v ? '1' : '0'); } catch (e) { /* ignore */ } return v; });

  useEffect(() => {
    document.title = 'Store admin | Deeraj Interiors';
    if (!getToken()) return;
    api('/auth/me', { auth: true }).then((r) => setAdmin(r.admin)).catch(() => setToken('')).finally(() => setChecking(false));
  }, []);

  const logout = () => { setToken(''); setAdmin(null); notify('You are signed out', 'info'); navigate('/admin'); };
  const onAuthError = (e) => { if (e.status === 401) { setAdmin(null); notify(e.message, 'danger'); return true; } return false; };

  if (checking) return <div className="admin d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}><span className="spinner-border text-primary" role="status" /></div>;
  if (!admin) return <Login onLogin={(a) => setAdmin(a)} />;

  // left sidebar: always visible on desktop, slides in from the left on phones/tablets
  const side = (
    <div className="ad-side-in">
      <div className="ad-head">
        <Link to="/admin" className="brand brand-logo admin-brand ad-logo" onClick={() => setMenu(false)}>
          <img className="ad-logo-full" src="/logo.png" alt="Deeraj Interiors" width="523" height="129" /><img className="ad-logo-mark" src="/logo-mark.png" alt="Deeraj Interiors" width="192" height="192" /><span>STORE ADMIN</span>
        </Link>
        <button type="button" className="ad-collapse" onClick={toggleMini} aria-label={mini ? 'Expand sidebar' : 'Minimise sidebar'} aria-expanded={!mini} title={mini ? 'Expand sidebar' : 'Minimise sidebar'}>
          <Ico s={18} d={<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d={mini ? 'm13 9 3 3-3 3' : 'm16 15-3-3 3-3'} /></>} />
        </button>
      </div>
      <nav className="ad-nav" aria-label="Admin">
        {LINKS.map(([to, label]) => (
          <NavLink key={to} end to={'/admin' + (to ? '/' + to : '')} title={label} className={({ isActive }) => 'ad-link' + (isActive ? ' active' : '')} onClick={() => setMenu(false)}>
            <Ico d={ICONS[to]} /><span className="ad-label">{label}</span>
          </NavLink>
        ))}
        <span className="ad-group">Payments</span>
        {PAY_LINKS.map(([to, label]) => (
          <NavLink key={to} to={'/admin/' + to} title={label} className={({ isActive }) => 'ad-link' + (isActive ? ' active' : '')} onClick={() => setMenu(false)}>
            <Ico d={ICONS[to]} /><span className="ad-label">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="ad-side-foot">
        <Link className="ad-link" to="/store" target="_blank" title="View store"><Ico d={<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></>} /><span className="ad-label">View store</span></Link>
        <div className="ad-user" title={admin.email}>
          <span className="ad-avatar" aria-hidden="true">{(admin.name || admin.email || 'A').charAt(0).toUpperCase()}</span>
          <span className="ad-user-txt"><b>{admin.name || 'Admin'}</b><small title={admin.email}>{admin.email}</small></span>
        </div>
        <button type="button" className="btn btn-outline-secondary btn-sm w-100 ad-signout" onClick={logout} title="Sign out">
          <Ico s={16} d={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></>} /><span className="ad-label">Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={'admin ad-layout' + (mini ? ' is-mini' : '')}>
      <aside className="ad-side d-none d-lg-block">{side}</aside>
      <Offcanvas show={menu} onHide={() => setMenu(false)} placement="start" className="ad-side-oc" aria-label="Admin menu">
        <Offcanvas.Header closeButton className="pb-0" />
        <Offcanvas.Body className="p-0">{side}</Offcanvas.Body>
      </Offcanvas>
      <div className="ad-main">
        <header className="ad-top d-lg-none">
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setMenu(true)} aria-label="Open admin menu">
            <Ico d={<path d="M4 7h16M4 12h16M4 17h16" />} />
          </button>
          <Link to="/admin" className="brand brand-logo admin-brand"><img src="/logo.png" alt="Deeraj Interiors" width="523" height="129" /></Link>
          <span style={{ width: 38 }} />
        </header>
        <Container fluid className="py-4 px-3 px-lg-4 ad-content">
        <Routes>
          <Route index element={<Dashboard onAuthError={onAuthError} />} />
          <Route path="products" element={<Products onAuthError={onAuthError} />} />
          <Route path="orders" element={<Orders onAuthError={onAuthError} />} />
          <Route path="enquiries" element={<Enquiries onAuthError={onAuthError} />} />
          <Route path="settings" element={<Settings onAuthError={onAuthError} />} />
          <Route path="payments" element={<Payments onAuthError={onAuthError} />} />
          <Route path="refunds" element={<Refunds onAuthError={onAuthError} />} />
          <Route path="payment-settings" element={<PaymentSettings onAuthError={onAuthError} />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
        </Container>
      </div>
    </div>
  );
}
