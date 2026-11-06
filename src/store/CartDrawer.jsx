import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { money, findColor, vStock, ProductMedia, Stepper, Totals } from './storeUtils.jsx';

// Cart: Bootstrap off-canvas drawer from the right.
export default function CartDrawer({ show, onHide, totals: t, settings: s, coupon, catName, onQty, onRemove, onCoupon, onCheckout }) {
  const [code, setCode] = useState('');
  const need = (s.freeAbove || 0) - (t.sub - t.disc);
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="drawer-oc" aria-labelledby="cart-title">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title as="h2" id="cart-title">Your cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="dr-body">
        {!t.items.length ? (
          <div className="empty">
            <svg aria-hidden="true" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>
            <b>Your cart is empty</b>
            <span>Add something beautiful for your home.</span>
            <button type="button" className="btn btn-primary" onClick={onHide}>Browse products</button>
          </div>
        ) : (
          <>
            {s.freeAbove > 0 && (
              need > 0
                ? <div className="freebar"><span>Add {money(need)} more for free delivery</span><i style={{ width: `${Math.min(100, ((t.sub - t.disc) / s.freeAbove) * 100)}%` }} /></div>
                : <div className="freebar done"><span>You get free delivery</span><i style={{ width: '100%' }} /></div>
            )}
            {t.items.map((i) => {
              const cc = i.color ? findColor(i.p, i.color) : null;
              return (
                <div className="ci" key={i.key}>
                  <div className="ci-m"><ProductMedia p={i.p} color={i.color} catName={catName[i.p.cat]} /></div>
                  <div className="ci-i">
                    <b>{i.p.name}</b>
                    {cc && <span className="ci-col"><i style={{ background: cc.hex || '#ccc' }} />{cc.name}</span>}
                    <span>{money(i.p.price)}</span>
                    <Stepper qty={i.qty} max={vStock(i.p, i.color)} onDec={() => onQty(i.key, -1)} onInc={() => onQty(i.key, 1)} />
                  </div>
                  <div className="ci-r">
                    <b>{money(i.p.price * i.qty)}</b>
                    <button type="button" className="linkbtn" onClick={() => onRemove(i.key)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </Offcanvas.Body>
      {t.items.length > 0 && (
        <div className="dr-foot">
          <form className="coupon" onSubmit={(e) => { e.preventDefault(); onCoupon(code); if (coupon) setCode(''); }}>
            <label className="visually-hidden" htmlFor="coupon">Coupon code</label>
            <input id="coupon" className="form-control" placeholder="Coupon code" value={coupon ? coupon.code : code} readOnly={!!coupon} onChange={(e) => setCode(e.target.value)} autoComplete="off" />
            <button type="submit" className="btn btn-outline">{coupon ? 'Remove' : 'Apply'}</button>
          </form>
          <Totals t={t} coupon={coupon} />
          <button type="button" className="btn btn-primary wide" onClick={onCheckout}>Checkout · {money(t.total)}</button>
        </div>
      )}
    </Offcanvas>
  );
}
