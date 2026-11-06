import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import { money } from '../store/storeUtils.jsx';
import RangeFilter, { rangeLabel, rangeQuery } from './RangeFilter.jsx';

// Payment history: every order's payment, with filters, "mark as paid", refunds and CSV export.
export const PAY_STATUS = {
  pending: ['Pending', 'warning'], paid: ['Paid', 'success'], failed: ['Failed', 'danger'], cancelled: ['Cancelled', 'secondary'],
  refunded: ['Refunded', 'info'], partially_refunded: ['Part refunded', 'info']
};
export const PAY_METHOD = { cod: 'Cash on delivery', upi: 'UPI on delivery', pickup: 'Pay at pickup', razorpay: 'Razorpay (online)' };

function csv(rows) {
  const head = ['Date', 'Order', 'Customer', 'Phone', 'Method', 'Amount', 'Status', 'Refunded', 'Reference', 'Razorpay payment ID', 'Paid at'];
  const esc = (v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
  const lines = rows.map((p) => [p.createdAt, p.orderCode, p.customer.name, p.customer.phone, PAY_METHOD[p.method] || p.method, p.amount, PAY_STATUS[p.status][0], p.refunded, p.reference, p.razorpayPaymentId, p.paidAt].map(esc).join(','));
  return '﻿' + [head.map(esc).join(','), ...lines].join('\n');
}

export default function Payments({ onAuthError }) {
  const notify = useToast();
  const [filter, setFilter] = useState({ range: '30d' });
  const [status, setStatus] = useState('all');
  const [method, setMethod] = useState('all');
  const [q, setQ] = useState('');
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [paying, setPaying] = useState(null);   // payment being marked paid
  const [refunding, setRefunding] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const fail = useCallback((e) => { if (!onAuthError(e)) notify(e.message, 'danger'); }, [notify, onAuthError]);
  const load = useCallback(async () => {
    setBusy(true);
    try { setData(await api(`/admin/payments?${rangeQuery(filter)}&status=${status}&method=${method}&q=${encodeURIComponent(q.trim())}`, { auth: true })); }
    catch (e) { fail(e); } finally { setBusy(false); }
  }, [filter, status, method, q, fail]);
  useEffect(() => { const t = setTimeout(load, q ? 350 : 0); return () => clearTimeout(t); }, [load, q]);

  const markPaid = async (e) => {
    e.preventDefault(); setSaving(true);
    try { await api(`/admin/payments/${paying.id}/mark-paid`, { method: 'POST', auth: true, body: form }); notify(`Payment for ${paying.orderCode} marked as paid`); setPaying(null); load(); }
    catch (x) { fail(x); } finally { setSaving(false); }
  };
  const refund = async (e) => {
    e.preventDefault();
    const left = refunding.amount - refunding.refunded;
    const amt = Number(form.amount);
    if (!(amt > 0) || amt > left) { notify(`Enter a refund amount up to ${money(left)}.`, 'danger'); return; }
    if (!String(form.reason || '').trim()) { notify('Add a reason for the refund.', 'danger'); return; }
    setSaving(true);
    try { await api(`/admin/payments/${refunding.id}/refund`, { method: 'POST', auth: true, body: { ...form, amount: amt } }); notify(`Refund of ${money(amt)} recorded for ${refunding.orderCode}`); setRefunding(null); load(); }
    catch (x) { fail(x); } finally { setSaving(false); }
  };
  const exportCsv = () => {
    if (!data || !data.payments.length) { notify('Nothing to export for these filters.', 'danger'); return; }
    const url = URL.createObjectURL(new Blob([csv(data.payments)], { type: 'text/csv;charset=utf-8' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: `payments-${data.from || 'all'}-${data.to || ''}.csv` });
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    notify('Payments exported (CSV opens in Excel)');
  };

  const s = data && data.summary;
  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-start justify-content-between mb-3">
        <div>
          <h1 className="h3 mb-0">Payment history</h1>
          <small className="text-secondary">{rangeLabel(data)}{busy && <span className="spinner-border spinner-border-sm ms-2" role="status" aria-label="Loading" />}</small>
        </div>
        <RangeFilter value={filter} onChange={setFilter} today={data && data.today} notify={notify} />
      </div>

      {!data ? <div className="text-center py-5"><span className="spinner-border text-primary" role="status" /></div> : (
        <>
          <div className="row g-3 mb-3">
            {[['Collected', money(s.collected), 'success'], ['Pending', `${money(s.pending)} (${s.pendingCount} orders)`, 'warning'], ['Refunded', money(s.refunded), 'info'], ['Online (Razorpay)', s.online, 'primary']].map(([t, v, tone]) => (
              <div className="col-6 col-xl-3" key={t}><div className={`card h-100 border-0 shadow-sm border-start border-4 border-${tone}`}><div className="card-body"><div className="text-secondary small">{t}</div><div className="fs-4 fw-bold">{v}</div></div></div></div>
            ))}
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="row g-2 mb-3">
                <div className="col-md-5"><input type="search" className="form-control form-control-sm" placeholder="Search order, customer, phone, reference…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search payments" /></div>
                <div className="col-6 col-md-2"><select className="form-select form-select-sm" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status"><option value="all">All statuses</option>{Object.entries(PAY_STATUS).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select></div>
                <div className="col-6 col-md-3"><select className="form-select form-select-sm" value={method} onChange={(e) => setMethod(e.target.value)} aria-label="Method"><option value="all">All methods</option>{Object.entries(PAY_METHOD).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
                <div className="col-md-2"><button type="button" className="btn btn-outline-secondary btn-sm w-100" onClick={exportCsv}>Export CSV</button></div>
              </div>
              {!data.payments.length ? <p className="text-center text-secondary py-4 mb-0">No payments for these filters. Payments appear here as soon as customers place orders.</p> : (
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0 pay-table">
                    <thead className="table-light"><tr><th>Date</th><th>Order</th><th>Customer</th><th>Method</th><th className="text-end">Amount</th><th>Status</th><th className="text-end">Actions</th></tr></thead>
                    <tbody>
                      {data.payments.map((p) => (
                        <tr key={p.id}>
                          <td className="text-nowrap small">{p.createdAt}</td>
                          <td className="fw-semibold">{p.orderCode}</td>
                          <td><div>{p.customer.name}</div><small className="text-secondary">{p.customer.phone}</small></td>
                          <td className="small">{PAY_METHOD[p.method] || p.method}{p.razorpayPaymentId && <div className="text-secondary">{p.razorpayPaymentId}</div>}{p.reference && <div className="text-secondary">Ref: {p.reference}</div>}</td>
                          <td className="text-end text-nowrap">{money(p.amount)}{p.refunded > 0 && <div className="small text-info">−{money(p.refunded)}</div>}</td>
                          <td><span className={`badge text-bg-${PAY_STATUS[p.status][1]}`}>{PAY_STATUS[p.status][0]}</span>{p.paidAt && <div className="small text-secondary text-nowrap">{p.paidAt}</div>}</td>
                          <td className="text-end text-nowrap">
                            {(p.status === 'pending' || p.status === 'failed') && p.provider === 'offline' && <button type="button" className="btn btn-sm btn-outline-success me-1" onClick={() => { setForm({ methodDetail: p.method === 'cod' ? 'Cash' : p.method === 'upi' ? 'UPI' : '' }); setPaying(p); }}>Mark paid</button>}
                            {['paid', 'partially_refunded'].includes(p.status) && <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => { setForm({ amount: String(p.amount - p.refunded), reason: '' }); setRefunding(p); }}>Refund</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {data.payments.length >= 1000 && <p className="small text-secondary mt-2 mb-0">Showing the latest 1,000. Narrow the dates to see older payments.</p>}
            </div>
          </div>
        </>
      )}

      <Modal show={!!paying} onHide={() => setPaying(null)} centered className="admin-modal">
        <form onSubmit={markPaid}>
          <Modal.Header closeButton><Modal.Title as="h2" className="h5">Mark {paying && paying.orderCode} as paid</Modal.Title></Modal.Header>
          <Modal.Body>
            <p className="mb-3">Amount received: <b>{paying && money(paying.amount)}</b> · {paying && (PAY_METHOD[paying.method] || paying.method)}</p>
            <div className="mb-2"><label className="form-label" htmlFor="mp-how">Received as</label>
              <select id="mp-how" className="form-select" value={form.methodDetail || ''} onChange={(e) => setForm((f) => ({ ...f, methodDetail: e.target.value }))}><option>Cash</option><option>UPI</option><option>Card (POS)</option><option>Bank transfer</option><option>Cheque</option></select></div>
            <div className="mb-2"><label className="form-label" htmlFor="mp-ref">Reference (optional)</label><input id="mp-ref" className="form-control" placeholder="UPI transaction ID, receipt no…" value={form.reference || ''} onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))} /></div>
            <div><label className="form-label" htmlFor="mp-notes">Notes (optional)</label><input id="mp-notes" className="form-control" value={form.notes || ''} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} /></div>
          </Modal.Body>
          <Modal.Footer><button type="button" className="btn btn-outline-secondary" onClick={() => setPaying(null)}>Cancel</button><button type="submit" className="btn btn-success" disabled={saving}>{saving ? 'Saving…' : 'Mark as paid'}</button></Modal.Footer>
        </form>
      </Modal>

      <Modal show={!!refunding} onHide={() => setRefunding(null)} centered className="admin-modal">
        <form onSubmit={refund}>
          <Modal.Header closeButton><Modal.Title as="h2" className="h5">Refund {refunding && refunding.orderCode}</Modal.Title></Modal.Header>
          <Modal.Body>
            {refunding && <p className="mb-3">Paid {money(refunding.amount)}{refunding.refunded > 0 && <> · already refunded {money(refunding.refunded)}</>}. You can refund up to <b>{money(refunding.amount - refunding.refunded)}</b>.</p>}
            <div className="mb-2"><label className="form-label" htmlFor="rf-amt">Refund amount (₹)</label><input id="rf-amt" className="form-control" inputMode="decimal" value={form.amount || ''} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} /></div>
            <div className="mb-2"><label className="form-label" htmlFor="rf-reason">Reason</label><input id="rf-reason" className="form-control" placeholder="e.g. Damaged item, order cancelled after payment" value={form.reason || ''} onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))} /></div>
            <div><label className="form-label" htmlFor="rf-ref">Reference (optional)</label><input id="rf-ref" className="form-control" placeholder="UPI / bank transaction ID" value={form.reference || ''} onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))} /></div>
            <p className="small text-secondary mt-3 mb-0">
              {refunding && refunding.provider === 'razorpay' ? 'This refund is sent to Razorpay and returns the money to the customer\'s card / UPI / bank automatically.' : 'For cash / UPI-on-delivery orders, return the money to the customer yourself; this records the refund in your payment history.'}
            </p>
          </Modal.Body>
          <Modal.Footer><button type="button" className="btn btn-outline-secondary" onClick={() => setRefunding(null)}>Cancel</button><button type="submit" className="btn btn-danger" disabled={saving}>{saving ? 'Saving…' : 'Record refund'}</button></Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
