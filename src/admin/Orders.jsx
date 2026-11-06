import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import useConfirm from '../components/Confirm.jsx';
import { money, lineName, fmtDate, PAY, STATUS } from '../store/storeUtils.jsx';

const TONE = { placed: 'warning', confirmed: 'info', shipped: 'primary', delivered: 'success', cancelled: 'secondary' };

export default function Orders({ onAuthError }) {
  const notify = useToast();
  const [confirm, confirmEl] = useConfirm();
  const [all, setAll] = useState(null);
  const [filter, setFilter] = useState('all');
  const fail = (e) => { if (!onAuthError(e)) notify(e.message, 'danger'); };
  const load = () => api('/admin/orders', { auth: true }).then(setAll).catch(fail);
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = async (o, status) => {
    if (status === 'cancelled' && !(await confirm({ title: `Cancel order ${o.code}?`, body: 'Items go back into stock. A cancelled order cannot be reopened.', ok: 'Cancel order', danger: true }))) return;
    try {
      const upd = await api(`/admin/orders/${o.id}/status`, { method: 'PATCH', auth: true, body: { status } });
      setAll((l) => l.map((x) => (x.id === o.id ? upd : x)));
      notify(`Order ${o.code} marked ${STATUS[status].toLowerCase()}`);
    } catch (e) { fail(e); }
  };

  const list = (all || []).filter((o) => filter === 'all' || o.status === filter);
  const count = (s) => (all || []).filter((o) => o.status === s).length;

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
        <h1 className="h3 mb-0">Orders</h1>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { load(); notify('Orders refreshed', 'info'); }}>Refresh</button>
      </div>
      <div className="d-flex flex-wrap gap-2 mb-3" role="group" aria-label="Filter orders">
        {[['all', 'All']].concat(Object.entries(STATUS)).map(([k, l]) => (
          <button key={k} type="button" className={'btn btn-sm ' + (filter === k ? 'btn-primary' : 'btn-outline-secondary')} onClick={() => setFilter(k)}>
            {l} {k !== 'all' && <span className="badge text-bg-light ms-1">{count(k)}</span>}
          </button>
        ))}
      </div>

      {!all ? <div className="text-center py-5"><span className="spinner-border text-primary" role="status" /></div>
        : !list.length ? <div className="card border-0 shadow-sm"><div className="card-body text-center text-secondary py-5">No orders here yet. New orders appear the moment customers place them.</div></div>
          : (
            <div className="row g-3">
              {list.map((o) => (
                <div className="col-lg-6" key={o.id}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between gap-2 flex-wrap">
                        <div>
                          <b>{o.code} · {o.customer.name}</b>
                          <div className="small text-secondary">{fmtDate(o.createdAt)} · {PAY[o.payment]}</div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className={`badge text-bg-${TONE[o.status]}`}>{STATUS[o.status]}</span>
                          <select className="form-select form-select-sm w-auto" value={o.status} onChange={(e) => setStatus(o, e.target.value)} disabled={o.status === 'cancelled'} aria-label={`Status of ${o.code}`}>
                            {Object.entries(STATUS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                          </select>
                        </div>
                      </div>
                      <p className="small mt-2 mb-2">
                        <a href={`tel:${o.customer.phone}`}>{o.customer.phone}</a> · <a href={`https://wa.me/91${o.customer.phone}`} target="_blank" rel="noreferrer">WhatsApp</a>
                        {o.customer.email && <> · {o.customer.email}</>}<br />
                        {o.customer.address}, {o.customer.city} {o.customer.pincode}
                      </p>
                      <ul className="list-group list-group-flush small">
                        {o.items.map((i, k) => <li key={k} className="list-group-item px-0 d-flex justify-content-between"><span>{lineName(i)} × {i.qty}</span><b>{money(i.price * i.qty)}</b></li>)}
                        {o.discount > 0 && <li className="list-group-item px-0 d-flex justify-content-between"><span>Coupon {o.coupon}</span><b>−{money(o.discount)}</b></li>}
                        <li className="list-group-item px-0 d-flex justify-content-between"><span>Delivery</span><b>{o.delivery ? money(o.delivery) : 'Free'}</b></li>
                        <li className="list-group-item px-0 d-flex justify-content-between"><b>Total</b><b>{money(o.total)}</b></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      {confirmEl}
    </>
  );
}
