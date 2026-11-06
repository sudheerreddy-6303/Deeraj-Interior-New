import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';

// Store settings: delivery fee, free-delivery limit, payment options, banner, coupons, admin password.
export default function Settings({ onAuthError }) {
  const notify = useToast();
  const [s, setS] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [busy, setBusy] = useState(false);
  const [pw, setPw] = useState({ current: '', next: '' });
  const fail = (e) => { if (!onAuthError(e)) notify(e.message, 'danger'); };

  useEffect(() => { api('/admin/settings', { auth: true }).then((r) => { setS(r.settings); setCoupons(r.coupons); }).catch(fail); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => setS((x) => ({ ...x, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const setCoupon = (i, patch) => setCoupons((l) => l.map((c, j) => (j === i ? { ...c, ...patch } : c)));

  const save = async (e) => {
    e.preventDefault();
    if (!s.cod && !s.upi && !s.pickup) { notify('Keep at least one payment option on.', 'danger'); return; }
    setBusy(true);
    try {
      const r = await api('/admin/settings', { method: 'PUT', auth: true, body: { settings: s, coupons } });
      setS(r.settings); setCoupons(r.coupons); notify('Settings saved. The store updates instantly.');
    } catch (x) { fail(x); } finally { setBusy(false); }
  };

  const changePw = async (e) => {
    e.preventDefault();
    try { await api('/auth/password', { method: 'POST', auth: true, body: pw }); setPw({ current: '', next: '' }); notify('Password changed'); }
    catch (x) { fail(x); }
  };

  if (!s) return <div className="text-center py-5"><span className="spinner-border text-primary" role="status" /></div>;
  const sw = (k, label) => (
    <div className="form-check form-switch" key={k}>
      <input id={'st-' + k} className="form-check-input" type="checkbox" checked={!!s[k]} onChange={set(k)} />
      <label className="form-check-label" htmlFor={'st-' + k}>{label}</label>
    </div>
  );

  return (
    <>
      <h1 className="h3 mb-4">Settings</h1>
      <form onSubmit={save} noValidate>
        <div className="row g-3">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100"><div className="card-body">
              <h2 className="h6 mb-3">Delivery &amp; payment</h2>
              <div className="row g-3 mb-3">
                <div className="col-6"><label className="form-label" htmlFor="st-fee">Delivery fee (₹)</label><input id="st-fee" className="form-control" inputMode="numeric" value={s.deliveryFee} onChange={set('deliveryFee')} /></div>
                <div className="col-6"><label className="form-label" htmlFor="st-free">Free delivery above (₹)</label><input id="st-free" className="form-control" inputMode="numeric" value={s.freeAbove} onChange={set('freeAbove')} /></div>
              </div>
              {sw('cod', 'Cash on delivery')}
              {sw('upi', 'UPI on delivery')}
              {sw('pickup', 'Pickup at experience centre')}
            </div></div>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100"><div className="card-body">
              <h2 className="h6 mb-3">Store banner</h2>
              {sw('bannerOn', 'Show banner above the products')}
              <div className="mt-3"><label className="form-label" htmlFor="st-bt">Banner title</label><input id="st-bt" className="form-control" value={s.bannerTitle} onChange={set('bannerTitle')} /></div>
              <div className="mt-3"><label className="form-label" htmlFor="st-bx">Banner text</label><input id="st-bx" className="form-control" value={s.bannerText} onChange={set('bannerText')} /></div>
              <div className="mt-3">{sw('samplePrices', 'Reminder: prices are still samples')}</div>
            </div></div>
          </div>
          <div className="col-12">
            <div className="card border-0 shadow-sm"><div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h2 className="h6 mb-0">Coupons</h2>
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setCoupons((l) => [...l, { code: '', percent: 10, active: true }])}>+ Add coupon</button>
              </div>
              {!coupons.length && <p className="small text-secondary mb-0">No coupons yet.</p>}
              {coupons.map((c, i) => (
                <div className="row g-2 align-items-center mb-2" key={i}>
                  <div className="col-5 col-md-4"><input className="form-control text-uppercase" placeholder="CODE" value={c.code} onChange={(e) => setCoupon(i, { code: e.target.value })} aria-label="Coupon code" /></div>
                  <div className="col-3 col-md-2"><div className="input-group"><input className="form-control" inputMode="numeric" value={c.percent} onChange={(e) => setCoupon(i, { percent: e.target.value })} aria-label="Percent off" /><span className="input-group-text">%</span></div></div>
                  <div className="col-auto"><div className="form-check form-switch m-0"><input className="form-check-input" type="checkbox" checked={c.active} onChange={(e) => setCoupon(i, { active: e.target.checked })} aria-label="Active" id={'cp-' + i} /><label className="form-check-label small" htmlFor={'cp-' + i}>Active</label></div></div>
                  <div className="col-auto"><button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setCoupons((l) => l.filter((_, j) => j !== i))}>Remove</button></div>
                </div>
              ))}
            </div></div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={busy}>{busy ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Saving…</> : 'Save settings'}</button>
      </form>

      <form className="card border-0 shadow-sm mt-4" style={{ maxWidth: 520 }} onSubmit={changePw} noValidate>
        <div className="card-body">
          <h2 className="h6 mb-3">Change admin password</h2>
          <div className="mb-2"><label className="form-label" htmlFor="pw-cur">Current password</label><input id="pw-cur" type="password" className="form-control" autoComplete="current-password" value={pw.current} onChange={(e) => setPw((x) => ({ ...x, current: e.target.value }))} /></div>
          <div className="mb-3"><label className="form-label" htmlFor="pw-new">New password (8+ characters)</label><input id="pw-new" type="password" className="form-control" autoComplete="new-password" value={pw.next} onChange={(e) => setPw((x) => ({ ...x, next: e.target.value }))} /></div>
          <button type="submit" className="btn btn-outline-primary">Change password</button>
        </div>
      </form>
    </>
  );
}
