import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';

// Payment settings: Razorpay connection status and setup steps. Keys are kept in server/.env only.
export default function PaymentSettings({ onAuthError }) {
  const notify = useToast();
  const [c, setC] = useState(null);
  const [saving, setSaving] = useState(false);
  const fail = (e) => { if (!onAuthError(e)) notify(e.message, 'danger'); };
  useEffect(() => { api('/admin/payments/config', { auth: true }).then(setC).catch(fail); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = async (on) => {
    setSaving(true);
    try { await api('/admin/payments/config', { method: 'PUT', auth: true, body: { razorpayEnabled: on } }); setC((x) => ({ ...x, razorpay: { ...x.razorpay, enabled: on } })); notify(on ? 'Online payments turned on' : 'Online payments turned off'); }
    catch (e) { fail(e); } finally { setSaving(false); }
  };
  const copy = async (t) => { try { await navigator.clipboard.writeText(t); notify('Webhook URL copied'); } catch (e) { notify('Could not copy. Select the text and copy it.', 'danger'); } };

  if (!c) return <div className="text-center py-5"><span className="spinner-border text-primary" role="status" /></div>;
  const r = c.razorpay;
  return (
    <>
      <h1 className="h3 mb-4">Payment settings</h1>
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100"><div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h5 mb-0">Razorpay (online payments)</h2>
              {r.configured ? <span className={`badge text-bg-${r.mode === 'live' ? 'success' : 'warning'}`}>{r.mode === 'live' ? 'Live keys' : 'Test keys'}</span> : <span className="badge text-bg-secondary">Not connected</span>}
            </div>
            <ul className="list-unstyled small mb-3">
              <li className="mb-1">{r.configured ? '✅' : '⬜'} API keys {r.configured ? <span className="text-secondary">({r.keyId})</span> : <span className="text-secondary">— add to server/.env</span>}</li>
              <li className="mb-1">{r.hasWebhookSecret ? '✅' : '⬜'} Webhook secret</li>
              <li>{r.enabled ? '✅' : '⬜'} Online payments switched on</li>
            </ul>
            <div className="form-check form-switch">
              <input id="ps-on" className="form-check-input" type="checkbox" role="switch" checked={r.enabled} disabled={!r.configured || saving} onChange={(e) => toggle(e.target.checked)} />
              <label className="form-check-label" htmlFor="ps-on">Accept online payments with Razorpay</label>
            </div>
            {!r.configured && <p className="small text-secondary mt-2 mb-0">This switch turns on after the Razorpay keys are added.</p>}
            <div className="alert alert-light border small mt-3 mb-0">The &quot;Pay online&quot; button at customer checkout is the next step: it gets connected once your Razorpay account and keys are ready. Payment history and refunds already work for every order today.</div>
            <p className="small text-secondary mt-3 mb-0">Cash on delivery, UPI on delivery and pickup are set in <Link to="/admin/settings">Settings</Link>.</p>
          </div></div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100"><div className="card-body">
            <h2 className="h5 mb-3">Connect Razorpay</h2>
            <ol className="small ps-3 mb-3">
              <li className="mb-2">Sign in at <a href="https://dashboard.razorpay.com" target="_blank" rel="noreferrer">dashboard.razorpay.com</a> → <b>Account &amp; Settings → API Keys</b> → generate keys (start with <b>Test mode</b>).</li>
              <li className="mb-2">On the server, add them to <code>server/.env</code>:<pre className="bg-light rounded p-2 mt-1 mb-0 small">RAZORPAY_KEY_ID=rzp_test_xxxxx{'\n'}RAZORPAY_KEY_SECRET=xxxxxxxx{'\n'}RAZORPAY_WEBHOOK_SECRET=any-long-random-text</pre></li>
              <li className="mb-2">In Razorpay → <b>Webhooks</b> → add this URL, use the same webhook secret, and tick <b>payment.captured</b>, <b>payment.failed</b>, <b>refund.processed</b>:
                <div className="input-group input-group-sm mt-1"><input className="form-control" readOnly value={c.webhookUrl} aria-label="Webhook URL" /><button type="button" className="btn btn-outline-secondary" onClick={() => copy(c.webhookUrl)}>Copy</button></div>
              </li>
              <li className="mb-2">Restart the API, come back here and turn on <b>Accept online payments</b>.</li>
              <li>When testing is done, switch to <b>Live</b> keys (<code>rzp_live_…</code>).</li>
            </ol>
            <p className="small text-secondary mb-0">Your secret keys are never shown here or sent to the browser.</p>
          </div></div>
        </div>
      </div>
    </>
  );
}
