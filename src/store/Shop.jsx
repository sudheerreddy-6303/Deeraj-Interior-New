import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import { money, off, colorsOf, findColor, vStock, maxStock, imgs, keyOf, parseKey, ProductMedia, Stepper } from './storeUtils.jsx';
import ProductModal from './ProductModal.jsx';
import CartDrawer from './CartDrawer.jsx';
import Checkout from './Checkout.jsx';
import MyOrders from './MyOrders.jsx';

// Online store: everything (products, prices, stock, colours, banner, delivery fee, coupons)
// comes from the MySQL database and is managed in the admin panel (/admin).

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || '') || d; } catch (e) { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } };

const SORTS = {
  featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || new Date(b.createdAt) - new Date(a.createdAt),
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  new: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  off: (a, b) => off(b) - off(a)
};

// productId set → full product page (/store/product/:id) instead of the product list
export default function Shop({ productId = null }) {
  const notify = useToast();
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [cats, setCats] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [cat, setCat] = useState('all');
  const location = useLocation();
  const navigate = useNavigate();
  const openProduct = (id) => navigate(`/store/product/${id}`);
  // the category bar at the top of the page links to /store?cat=<code>
  useEffect(() => { setCat(new URLSearchParams(location.search).get('cat') || 'all'); }, [location.search]);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState(() => load('di-cart', {}));
  const [coupon, setCoupon] = useState(null);
  const [sel, setSel] = useState({});
  const [openId, setOpenId] = useState(null);
  const [panel, setPanel] = useState(null); // 'cart' | 'checkout' | 'orders'
  const [bump, setBump] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const [p, s, c] = await Promise.all([api('/products'), api('/settings'), api('/categories')]);
      setProducts(p); setSettings(s); setCats(c); setStatus('ready');
    } catch (e) {
      setStatus('error');
      notify(e.message, 'danger');
    }
  }, [notify]);
  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => save('di-cart', cart), [cart]);

  const catName = useMemo(() => Object.fromEntries(cats.map((c) => [c.code, c.name])), [cats]);
  const byId = useMemo(() => Object.fromEntries(products.map((p) => [p.id, p])), [products]);

  const items = useMemo(() => Object.keys(cart).map((k) => {
    const { id, color } = parseKey(k);
    const p = byId[id];
    if (!p || (color && !findColor(p, color))) return null;
    return { key: k, p, color, qty: cart[k] };
  }).filter(Boolean), [cart, byId]);

  const totals = useCallback((payment) => {
    const s = settings || {};
    const sub = items.reduce((a, i) => a + i.p.price * i.qty, 0);
    const disc = coupon ? Math.round((sub * coupon.percent) / 100) : 0;
    const del = !items.length || payment === 'pickup' || sub - disc >= Number(s.freeAbove) ? 0 : Number(s.deliveryFee) || 0;
    return { items, sub, disc, del, total: Math.max(0, sub - disc + del) };
  }, [items, coupon, settings]);

  const count = items.reduce((a, i) => a + i.qty, 0);
  const selColor = (p) => { const cs = colorsOf(p); return cs.length ? (findColor(p, sel[p.id]) || cs[0]) : null; };

  const addToCart = (key, n) => {
    let { id, color } = parseKey(key);
    const p = byId[id];
    if (!p) return;
    if (!color && colorsOf(p).length) { color = selColor(p).name; key = keyOf(id, color); }
    const max = vStock(p, color);
    const cur = cart[key] || 0;
    if (n > 0 && cur >= max) { notify(`Only ${max} in stock`, 'danger'); return; }
    const next = Math.max(0, Math.min(max, cur + n));
    setCart((c) => { const o = { ...c }; if (next) o[key] = next; else delete o[key]; return o; });
    if (n > 0 && cur === 0) { notify(`${p.name}${color ? ` (${color})` : ''} added to cart`); setBump((b) => b + 1); }
    if (next === 0 && cur > 0) notify(`${p.name} removed from cart`, 'info');
  };

  const applyCoupon = async (code) => {
    if (coupon) { setCoupon(null); notify('Coupon removed', 'info'); return; }
    if (!String(code || '').trim()) { notify('Enter a coupon code', 'danger'); return; }
    try { const c = await api('/coupons/validate', { method: 'POST', body: { code } }); setCoupon(c); notify(`${c.percent}% off applied`); }
    catch (e) { notify(e.message, 'danger'); }
  };

  const visible = products;
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return visible
      .filter((p) => (cat === 'all' || p.cat === cat) && (!s || `${p.name} ${p.desc} ${catName[p.cat] || ''}`.toLowerCase().includes(s)))
      .sort(SORTS[sort] || SORTS.featured);
  }, [visible, cat, q, sort, catName]);

  const s = settings || {};
  const open = openId != null ? byId[openId] : null;
  const page = productId ? byId[productId] : null;
  useEffect(() => { if (page) document.title = `${page.name} | Deeraj Interiors`; }, [page]);

  return (
    <section className="shop" id="store-shop">
      <div className="wrap">
        {s.bannerOn && (s.bannerTitle || s.bannerText) && (
          <div className="shop-banner"><div><b>{s.bannerTitle}</b><span>{s.bannerText}</span></div></div>
        )}
        <div className="shop-bar">
          {productId ? <Link className="pp-back" to="/store#store-shop">← Back to store</Link> : <>
          <label className="shop-search" htmlFor="q">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input id="q" type="search" placeholder="Search mirrors, vases, tables…" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <select id="sort" aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="new">Newest</option>
            <option value="off">Biggest discount</option>
          </select>
          </>}
          <div className="shop-actions">
            <button type="button" className="ibtn" onClick={() => setPanel('orders')}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8l-9-5-9 5v8l9 5z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></svg>
              My orders
            </button>
            <button type="button" key={bump} className={'ibtn cartbtn' + (bump ? ' bump' : '')} onClick={() => setPanel('cart')}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>
              Cart
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
          </div>
        </div>

        {status === 'loading' && <div className="shop-status" role="status"><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Loading the store…</div>}
        {status === 'error' && (
          <div className="shop-status" role="alert">
            We could not load the store right now. <button type="button" className="linkbtn" onClick={refresh}>Try again</button> or <a href="https://wa.me/919000700930">ask us on WhatsApp</a>.
          </div>
        )}
        {productId && status === 'ready' && !page && (
          <div className="shop-status">This product is no longer available. <Link to="/store#store-shop">See all products</Link></div>
        )}
        {productId && page && (
          <>
            <nav className="pp-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link><span>/</span><Link to="/store">Online Store</Link><span>/</span>
              <Link to={`/store?cat=${page.cat}#store-shop`}>{catName[page.cat] || 'Decor'}</Link><span>/</span><b>{page.name}</b>
            </nav>
            <ProductModal
              page p={page} settings={s} catName={catName} cart={cart} color={selColor(page)}
              onColor={(name) => setSel((x) => ({ ...x, [page.id]: name }))}
              onAdd={addToCart}
              onBuy={(key) => { if (!cart[key]) addToCart(key, 1); setPanel('checkout'); }}
              onClose={() => {}} products={products} onOpen={openProduct}
            />
          </>
        )}
        {!productId && status === 'ready' && !visible.length && <div className="shop-status">New products are on their way. Meanwhile, <a href="https://wa.me/919000700930">ask us on WhatsApp</a>.</div>}
        {!productId && status === 'ready' && visible.length > 0 && !list.length && <div className="shop-status">No products match your search.</div>}

        {!productId && <div className="shop-grid">
          {list.map((p, i) => {
            const o = off(p);
            const cs = colorsOf(p);
            const sk = maxStock(p);
            const inCart = cart[keyOf(p.id)] || 0;
            const im = imgs(p);
            return (
              <article className="pc" key={p.id} style={{ '--d': `${Math.min(i, 8) * 45}ms` }}>
                <button type="button" className="pc-media" onClick={() => openProduct(p.id)} aria-label={`View ${p.name}`}>
                  <ProductMedia p={p} catName={catName[p.cat]} />
                  {im[1] && <img className="alt" src={im[1]} alt="" loading="lazy" />}
                  {im.length > 1 && <span className="pcount">{im.length} photos</span>}
                  <span className="badges">
                    {o > 0 && <span className="b-off">{o}% off</span>}
                    {p.model3d && <span className="b-3d">3D</span>}
                    {p.video && <span className="b-3d">▶ Video</span>}
                  </span>
                </button>
                <div className="pc-body">
                  <div className="pc-top">
                    <small>{catName[p.cat] || 'Decor'}</small>
                    {cs.length > 0 && (
                      <span className="dots" aria-label={`${cs.length} colours`}>
                        {cs.slice(0, 5).map((c) => <i key={c.name} style={{ background: c.hex || '#ccc' }} title={c.name} />)}
                        {cs.length > 5 && <em>+{cs.length - 5}</em>}
                      </span>
                    )}
                  </div>
                  <h3><button type="button" onClick={() => openProduct(p.id)}>{p.name}</button></h3>
                  <div className="price"><b>{money(p.price)}</b>{o > 0 && <s>{money(p.mrp)}</s>}</div>
                  {sk <= 0 ? <span className="sk out">Out of stock</span> : sk <= 3 ? <span className="sk low">Only {sk} left</span> : <span className="sk">In stock</span>}
                  {sk <= 0 ? <button type="button" className="add" disabled>Out of stock</button>
                    : cs.length ? <button type="button" className="add" onClick={() => openProduct(p.id)}>Choose colour</button>
                      : inCart ? <Stepper qty={inCart} max={sk} onDec={() => addToCart(keyOf(p.id), -1)} onInc={() => addToCart(keyOf(p.id), 1)} />
                        : <button type="button" className="add" onClick={() => addToCart(keyOf(p.id), 1)}>Add to cart</button>}
                </div>
              </article>
            );
          })}
        </div>}
      </div>

      <ProductModal
        p={open} settings={s} catName={catName} cart={cart}
        color={open ? selColor(open) : null}
        onColor={(name) => setSel((x) => ({ ...x, [open.id]: name }))}
        onAdd={addToCart}
        onBuy={(key) => { if (!cart[key]) addToCart(key, 1); setOpenId(null); setPanel('checkout'); }}
        onClose={() => setOpenId(null)}
        products={products} onOpen={openProduct}
      />
      <CartDrawer
        show={panel === 'cart'} onHide={() => setPanel(null)} totals={totals()} settings={s} coupon={coupon} catName={catName}
        onQty={addToCart} onRemove={(k) => addToCart(k, -cart[k])} onCoupon={applyCoupon} onCheckout={() => setPanel('checkout')}
      />
      <Checkout
        show={panel === 'checkout'} onHide={() => setPanel(null)} totals={totals} settings={s} coupon={coupon} onCoupon={applyCoupon}
        onPlaced={(order) => { setCart({}); setCoupon(null); refresh(); const mine = load('di-orders', []); save('di-orders', [{ code: order.code, phone: order.customer.phone }, ...mine].slice(0, 60)); save('di-phone', order.customer.phone); }}
        onTrack={() => setPanel('orders')}
        onStockError={refresh}
      />
      <MyOrders show={panel === 'orders'} onHide={() => setPanel(null)} />
    </section>
  );
}
