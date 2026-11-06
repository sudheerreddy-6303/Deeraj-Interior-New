import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import useConfirm from '../components/Confirm.jsx';
import { money, lineName, fmtDate, PAY, STEPS, STATUS } from './storeUtils.jsx';

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || '') || d; } catch (e) { return d; } };

function Timeline({ o }) {
  if (o.status === 'cancelled') return <div className="tl cancelled"><span>Order cancelled</span></div>;
  const idx = STEPS.findIndex((s) => s[0] === o.status);
  return <ol className="tl">{STEPS.map((s, i) => <li key={s[0]} className={i <= idx ? 'on' : ''}><i />{s[1]}</li>)}</ol>;
}

// "My orders": customers look up their orders with the mobile number they ordered with.
export default function MyOrders({ show, onHide }) {
  const notify = useToast();
  const [phone, setPhone] = useState(() => load('di-phone', ''));
  const [orders, setOrders] = useState(null);
  const [busy, setBusy] = useState(false);
  const [confirm, confirmEl] = useConfirm();

  const lookup = async (ph = phone) => {
    if (!/^[6-9]\d{9}$/.test(String(ph).replace(/\D/g, '').slice(-10))) { notify('Enter the 10-digit mobile number you ordered with.', 'danger'); return; }
    setBusy(true);
    try {
      const list = await api('/orders/lookup', { method: 'POST', body: { phone: ph } });
      setOrders(list);
      try { localStorage.setItem('di-phone', JSON.stringify(ph)); } catch (e) { /* ignore */ }
    } catch (e) { notify(e.message, 'danger'); } finally { setBusy(false); }
  };
  useEffect(() => { if (show && phone) lookup(phone); else if (!show) setOrders(null); }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  const cancel = async (o) => {
    if (!(await confirm({ title: `Cancel order ${o.code}?`, body: 'The items go back into stock and the order cannot be reopened.', ok: 'Cancel order', danger: true }))) return;
    try {
      const upd = await api(`/orders/${o.code}/cancel`, { method: 'POST', body: { phone: o.customer.phone } });
      setOrders((list) => list.map((x) => (x.code === upd.code ? upd : x)));
      notify(`Order ${o.code} cancelled`);
    } catch (e) { notify(e.message, 'danger'); }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable className="di-modal" aria-labelledby="mo-title">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title as="h2" id="mo-title" className="sheet-title">My orders</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="d-flex gap-2 mb-3" onSubmit={(e) => { e.preventDefault(); lookup(); }}>
          <label className="visually-hidden" htmlFor="mo-phone">Mobile number</label>
          <input id="mo-phone" className="form-control" type="tel" inputMode="tel" placeholder="Mobile number you ordered with" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? <span className="spinner-border spinner-border-sm" aria-hidden="true" /> : 'Find orders'}</button>
        </form>
        {orders && !orders.length && (
          <div className="empty"><b>No orders found</b><span>Orders placed with this number in the last 6 months appear here. You can also ask on <a href="https://wa.me/919000700930">WhatsApp</a>.</span></div>
        )}
        {orders && orders.length > 0 && (
          <div className="olist">
            {orders.map((o) => (
              <article className="ord" key={o.code}>
                <div className="ord-h">
                  <div><b>Order {o.code}</b><span>{fmtDate(o.createdAt)} · {PAY[o.payment]}</span></div>
                  <span className={'pill ' + o.status}>{STATUS[o.status]}</span>
                </div>
                <Timeline o={o} />
                <div className="rev-items">
                  {o.items.map((i, k) => <div key={k}><span>{lineName(i)} × {i.qty}</span><b>{money(i.price * i.qty)}</b></div>)}
                  <div><span><b>Total</b></span><b>{money(o.total)}</b></div>
                </div>
                {o.status === 'placed' && <button type="button" className="linkbtn danger" onClick={() => cancel(o)}>Cancel order</button>}
              </article>
            ))}
          </div>
        )}
      </Modal.Body>
      {confirmEl}
    </Modal>
  );
}
