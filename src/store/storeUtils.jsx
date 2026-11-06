import { fileUrl } from '../lib/api.js';

// Shared helpers for the online store (catalogue, cart, admin).
export const money = (n) => '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN');
export const off = (p) => (p.mrp && p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0);
export const colorsOf = (p) => ((p && p.colors) || []).filter((c) => c && c.name);
export const findColor = (p, name) => colorsOf(p).find((c) => c.name === name) || null;
export const stockOf = (p) => (p.stock == null ? 99 : Number(p.stock));
export const vStock = (p, cname) => {
  const c = cname ? findColor(p, cname) : null;
  return c && c.stock != null && c.stock !== '' ? Number(c.stock) : stockOf(p);
};
export const maxStock = (p) => {
  const cs = colorsOf(p);
  return cs.length ? cs.reduce((m, c) => Math.max(m, vStock(p, c.name)), 0) : stockOf(p);
};
export const imgs = (p) => (p.images || []).filter(Boolean).slice(0, 4).map(fileUrl);
export const vImgs = (p, cname) => {
  const c = cname ? findColor(p, cname) : null;
  const ci = c && c.images ? c.images.filter(Boolean).slice(0, 4).map(fileUrl) : [];
  return ci.length ? ci : imgs(p);
};
export const keyOf = (id, color) => (color ? `${id}|${color}` : String(id));
export const parseKey = (k) => { const i = String(k).indexOf('|'); return i < 0 ? { id: Number(k), color: '' } : { id: Number(k.slice(0, i)), color: k.slice(i + 1) }; };
export const lineName = (i) => i.name + (i.color ? ` (${i.color})` : '');
export const paras = (t) => String(t || '').split(/\n\s*\n|\n/).map((x) => x.trim()).filter(Boolean);
export const fmtDate = (d) => { try { return new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }); } catch (e) { return ''; } };

export const PAY = { cod: 'Cash on delivery', upi: 'UPI on delivery', pickup: 'Pay at experience centre (pickup)' };
export const PAY_NOTE = {
  cod: 'Pay in cash when your order arrives.',
  upi: 'Scan our UPI QR when your order arrives.',
  pickup: 'Collect from Suchitra or Nanakramguda. No delivery charge.'
};
export const STEPS = [['placed', 'Placed'], ['confirmed', 'Confirmed'], ['shipped', 'Shipped'], ['delivered', 'Delivered']];
export const STATUS = { placed: 'Placed', confirmed: 'Confirmed', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled' };
export const MODELS = [['', 'None'], ['vase', 'Flower vase'], ['mirror', 'Wall mirror'], ['deer', 'Deer sculpture'], ['table', 'Center table'], ['shelf', 'Book shelf']];

const ART = { wall: ['#e7d3bd', '#c2410c'], sculpt: ['#d8e0d3', '#3f6e55'], furn: ['#e9dccb', '#6a4329'], table: ['#e4e1ee', '#51708f'], light: ['#f3e3c3', '#b8904c'] };
const ICON = {
  wall: <><rect x="6" y="8" width="36" height="28" rx="2" /><path d="m10 32 9-10 7 7 5-5 7 8" /><circle cx="31" cy="16" r="3" /></>,
  sculpt: <><path d="M19 6h10M21 6v6c-5 3-8 8-8 14 0 9 5 16 11 16s11-7 11-16c0-6-3-11-8-14V6" /><path d="M15 26h18" /></>,
  furn: <path d="M6 22h36M10 22v16M38 22v16M8 16h32v6H8z" />,
  table: <><circle cx="24" cy="24" r="14" /><circle cx="24" cy="24" r="8" /></>,
  light: <path d="M18 30h12M20 36h8M24 6c-7 0-12 5-12 11 0 4 3 7 6 9v4h12v-4c3-2 6-5 6-9 0-6-5-11-12-11z" />
};

/** Product photo, or a drawn placeholder in the product's colour when there is no photo yet. */
export function ProductMedia({ p, color, className = '', catName }) {
  const u = vImgs(p, color)[0];
  if (u) return <img className={className} src={u} alt={p.name} loading="lazy" />;
  const a = (ART[p.cat] || ART.wall).slice();
  const cc = color ? findColor(p, color) : null;
  if (cc && /^#[0-9a-f]{6}$/i.test(cc.hex || '')) a[1] = cc.hex;
  return (
    <div className={'art ' + className} style={{ '--a': a[0], '--b': a[1] }}>
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICON[p.cat] || ICON.wall}</svg>
      <span>{catName || 'Decor'}</span>
    </div>
  );
}

export function Stepper({ qty, max, onDec, onInc }) {
  return (
    <div className="step" role="group" aria-label="Quantity">
      <button type="button" onClick={onDec} aria-label="One less">−</button>
      <span>{qty}</span>
      <button type="button" onClick={onInc} aria-label="One more" disabled={qty >= max}>+</button>
    </div>
  );
}

export function Totals({ t, coupon }) {
  return (
    <dl className="tot">
      <dt>Subtotal</dt><dd>{money(t.sub)}</dd>
      {t.disc > 0 && <><dt>Coupon {coupon && coupon.code}</dt><dd className="neg">−{money(t.disc)}</dd></>}
      <dt>Delivery</dt><dd>{t.del ? money(t.del) : 'Free'}</dd>
      <dt className="big">Total</dt><dd className="big">{money(t.total)}</dd>
    </dl>
  );
}
