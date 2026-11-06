import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import { money, lineName, PAY, PAY_NOTE, Totals } from './storeUtils.jsx';

const blank = { name: '', phone: '', email: '', address: '', city: 'Hyderabad', pincode: '' };
const load = () => { try { return { ...blank, ...JSON.parse(localStorage.getItem('di-address') || '{}') }; } catch (e) { return blank; } };

function check(c) {
  const er = {};
  if (!c.name.trim()) er.name = 'Please add your name.';
  if (!/^[6-9]\d{9}$/.test(c.phone.replace(/\D/g, '').slice(-10))) er.phone = 'Please enter a valid 10-digit mobile number.';
  if (c.email && !/^\S+@\S+\.\S+$/.test(c.email)) er.email = 'Please enter a valid email address.';
  if (!c.address.trim()) er.address = 'Please add your address.';
  if (!c.city.trim()) er.city = 'Please add your city or area.';
  if (!/^\d{6}$/.test(c.pincode.trim())) er.pincode = 'Please enter a 6-digit pincode.';
  return er;
}

// Checkout in 3 steps: address → payment → review. The server re-checks prices and stock.
export default function Checkout({ show, onHide, totals, settings: s, coupon, onCoupon, onPlaced, onTrack, onStockError }) {
  const notify = useToast();
  const [step, setStep] = useState(1);
  const [c, setC] = useState(load);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState('cod');
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState(null);
  const [err, setErr] = useState('');
  const [code, setCode] = useState(''); // coupon box (Buy now skips the cart, so it is offered here too)

  const options = Object.keys(PAY).filter((k) => s[k]);
  useEffect(() => { if (show) { setStep(1); setPlaced(null); setErr(''); if (!options.includes(payment) && options[0]) setPayment(options[0]); } }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  const t = totals(payment);
  const set = (k) => (e) => { setC((x) => ({ ...x, [k]: e.target.value })); setErrors((x) => ({ ...x, [k]: '' })); };

  const next = (e) => {
    e.preventDefault();
    const er = check(c);
    setErrors(er);
    if (Object.keys(er).length) { notify('Please check the highlighted fields.', 'danger'); return; }
    try { localStorage.setItem('di-address', JSON.stringify(c)); } catch (x) { /* ignore */ }
    setStep(2);
  };

  const place = async () => {
    setBusy(true); setErr('');
    try {
      const order = await api('/orders', {
        method: 'POST',
        body: { customer: c, payment, coupon: coupon ? coupon.code : '', items: t.items.map((i) => ({ productId: i.p.id, color: i.color, qty: i.qty })) }
      });
      setPlaced(order);
      onPlaced(order);
      notify(`Order ${order.code} placed successfully`);
    } catch (e) {
      setErr(e.message);
      notify(e.message, 'danger');
      if (e.status === 409) onStockError();
    } finally { setBusy(false); }
  };

  const F = ({ k, label, type = 'text', col = 'col-sm-6', ...rest }) => (
    <div className={col}>
      <div className="field">
        <label className="form-label mb-0" htmlFor={'co-' + k}>{label}</label>
        {type === 'textarea'
          ? <textarea id={'co-' + k} className={'form-control' + (errors[k] ? ' is-invalid' : '')} value={c[k]} onChange={set(k)} {...rest} />
          : <input id={'co-' + k} type={type} className={'form-control' + (errors[k] ? ' is-invalid' : '')} value={c[k]} onChange={set(k)} {...rest} />}
        {errors[k] && <div className="invalid-feedback d-block">{errors[k]}</div>}
      </div>
    </div>
  );

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable className="di-modal" aria-labelledby="co-title">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title as="h2" id="co-title" className="sheet-title">{placed ? 'Order placed' : 'Checkout'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {placed ? (
          <div className="done">
            <div className="tick"><svg aria-hidden="true" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></div>
            <p>Thank you, {placed.customer.name}. Your order <b>{placed.code}</b> for {money(placed.total)} is placed. Our team will call {placed.customer.phone} to confirm it.</p>
            <div className="actions" style={{ justifyContent: 'center' }}>
              <button type="button" className="btn btn-primary" onClick={onTrack}>Track my order</button>
              <button type="button" className="btn btn-outline" onClick={onHide}>Continue shopping</button>
            </div>
          </div>
        ) : !t.items.length ? (
          <div className="empty"><b>Your cart is empty</b><button type="button" className="btn btn-primary" onClick={onHide}>Browse products</button></div>
        ) : (
          <>
            <ol className="co-steps">
              {['Address', 'Payment', 'Review'].map((n, i) => <li key={n} className={i + 1 < step ? 'done' : i + 1 === step ? 'on' : ''}><span>{i + 1}</span>{n}</li>)}
            </ol>

            {step === 1 && (
              <form className="co-form" noValidate onSubmit={next}>
                <div className="row g-3">
                  {F({ k: 'name', label: 'Full name *', autoComplete: 'name' })}
                  {F({ k: 'phone', label: 'Mobile number *', type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
                  {F({ k: 'email', label: 'Email (for order updates)', type: 'email', autoComplete: 'email', col: 'col-12' })}
                  {F({ k: 'address', label: 'Address *', type: 'textarea', placeholder: 'Flat, building, street', autoComplete: 'street-address', col: 'col-12' })}
                  {F({ k: 'city', label: 'City / area *', autoComplete: 'address-level2' })}
                  {F({ k: 'pincode', label: 'Pincode *', inputMode: 'numeric', maxLength: 6, autoComplete: 'postal-code' })}
                </div>
                <div className="co-nav">
                  <button type="button" className="btn btn-outline" onClick={onHide}>Back to shop</button>
                  <button type="submit" className="btn btn-primary">Continue to payment</button>
                </div>
              </form>
            )}

            {step === 2 && (
              <>
                <div className="pay">
                  {options.map((k) => (
                    <label className="payopt" key={k}>
                      <input type="radio" name="pay" value={k} checked={payment === k} onChange={() => setPayment(k)} />
                      <span><b>{PAY[k]}</b><small>{PAY_NOTE[k]}</small></span>
                    </label>
                  ))}
                </div>
                <div className="co-nav">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Review order</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="rev">
                  <div className="rev-box"><h3>Deliver to</h3><p>{c.name} · {c.phone}<br />{c.address}, {c.city} {c.pincode}</p><button type="button" className="linkbtn" onClick={() => setStep(1)}>Change</button></div>
                  <div className="rev-box"><h3>Payment</h3><p>{PAY[payment]}</p><button type="button" className="linkbtn" onClick={() => setStep(2)}>Change</button></div>
                </div>
                <div className="rev-items">
                  {t.items.map((i) => <div key={i.key}><span>{lineName({ name: i.p.name, color: i.color })} × {i.qty}</span><b>{money(i.p.price * i.qty)}</b></div>)}
                </div>
                {onCoupon && (
                  <form className="coupon co-coupon" onSubmit={(e) => { e.preventDefault(); onCoupon(code); if (coupon) setCode(''); }}>
                    <label className="visually-hidden" htmlFor="co-coupon">Coupon code</label>
                    <input id="co-coupon" className="form-control" placeholder="Have a coupon code?" value={coupon ? coupon.code : code} readOnly={!!coupon} onChange={(e) => setCode(e.target.value)} autoComplete="off" />
                    <button type="submit" className="btn btn-outline">{coupon ? 'Remove' : 'Apply'}</button>
                  </form>
                )}
                <Totals t={t} coupon={coupon} />
                {err && <div className="alert alert-danger py-2 mt-3 mb-0" role="alert">{err}</div>}
                <div className="co-nav">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                  <button type="button" className="btn btn-primary" disabled={busy} onClick={place}>
                    {busy ? <><span className="spinner-border spinner-border-sm" aria-hidden="true" /> Placing your order…</> : `Place order · ${money(t.total)}`}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
