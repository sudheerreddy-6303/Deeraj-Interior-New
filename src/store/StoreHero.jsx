import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';
import { money, off, ProductMedia } from './storeUtils.jsx';

// Online Store hero: centred heading + search, live 3D stage in the middle and
// two columns of real products (from the database) scrolling slowly on each side.
// On phones the products scroll in one row under the 3D stage.
// Clicking a product opens it (Shop reads ?p=<id>); search fills the shop search (?q=).

function Card({ p, catName, copy }) {
  const o = off(p);
  return (
    <Link className="shx-card" to={`/store?p=${p.id}`} tabIndex={copy ? -1 : undefined} aria-hidden={copy || undefined}>
      <span className="shx-img"><ProductMedia p={p} catName={catName} />{o > 0 && <em>{o}% off</em>}</span>
      <span className="shx-meta"><b>{p.name}</b><span>{money(p.price)}{o > 0 && <s>{money(p.mrp)}</s>}</span></span>
    </Link>
  );
}

// The list is rendered twice so the loop is seamless; the copy is hidden from screen readers.
function Rail({ list, dir, catName, className = '' }) {
  if (!list.length) return <div className={`shx-rail is-empty ${className}`} />;
  const secs = Math.max(18, list.length * 6);
  return (
    <div className={`shx-rail shx-${dir} ${className}`} aria-label="Products">
      <div className="shx-track" style={{ '--t': `${secs}s` }}>
        {list.map((p) => <Card key={p.id} p={p} catName={catName[p.cat]} />)}
        {list.map((p) => <Card key={'c' + p.id} p={p} catName={catName[p.cat]} copy />)}
      </div>
    </div>
  );
}

export default function StoreHero() {
  const nav = useNavigate();
  const { search } = useLocation();
  const [q, setQ] = useState(() => new URLSearchParams(search).get('q') || '');
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [s, setS] = useState({});

  useEffect(() => {
    let alive = true;
    Promise.all([api('/products'), api('/categories'), api('/settings')])
      .then(([p, c, st]) => { if (alive) { setProducts(p); setCats(c); setS(st || {}); } })
      .catch(() => { /* the shop below shows the error message */ });
    return () => { alive = false; };
  }, []);

  const catName = useMemo(() => Object.fromEntries(cats.map((c) => [c.code, c.name])), [cats]);
  // featured first, then newest
  const sorted = useMemo(() => [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 16), [products]);
  const [left, right] = useMemo(() => {
    if (sorted.length < 4) return [sorted, sorted];
    return [sorted.filter((_, i) => i % 2 === 0), sorted.filter((_, i) => i % 2 === 1)];
  }, [sorted]);

  const submit = (e) => {
    e.preventDefault();
    const cat = new URLSearchParams(search).get('cat');
    const u = new URLSearchParams();
    if (cat) u.set('cat', cat);
    if (q.trim()) u.set('q', q.trim());
    nav(`/store${u.toString() ? '?' + u : ''}#store-shop`);
  };

  const pays = [s.cod !== false && 'Cash', s.upi !== false && 'UPI'].filter(Boolean);

  return (
    <section className="shx">
      <div className="wrap">
        <div className="shx-head">
          <span className="crumbs"><Link to="/">Home</Link>{' / Online Store'}</span>
          <p className="eyebrow shx-eyebrow">Online store</p>
          <h1 className="h1">{'Finishing touches, '}<em className="hl">ready to use</em></h1>
          <p className="lead">Wall art, mirrors, sculptures, tables and lighting, delivered across Hyderabad.</p>
          <form className="shx-search" role="search" onSubmit={submit}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input type="search" placeholder="Search mirrors, vases, tables…" aria-label="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <div className="shx-chips">
            {Number(s.freeAbove) > 0 && <span>🚚 Free delivery above {money(s.freeAbove)}</span>}
            {pays.length > 0 && <span>💵 {pays.join(' / ')} on delivery</span>}
            <span>↻ Spin in 3D</span>
          </div>
        </div>

        <div className="shx-row">
          <Rail list={left} dir="up" catName={catName} className="shx-side" />
          <div className="stage" id="st-store">
            <div className="s-load">Loading 3D showroom…</div>
            <div className="s-hint"><span className="live" />Live 3D · drag to spin</div>
            <div className="s-pick shx-pick" role="group" aria-label="Choose product">
              <button type="button" data-prod="vase" aria-pressed="true">Flower vase</button>
              <button type="button" data-prod="mirror" aria-pressed="false">Wall mirror</button>
              <button type="button" data-prod="deer" aria-pressed="false">Deer</button>
              <button type="button" data-prod="table" aria-pressed="false">Center table</button>
              <button type="button" data-prod="shelf" aria-pressed="false">Book shelf</button>
            </div>
          </div>
          <Rail list={right} dir="down" catName={catName} className="shx-side" />
        </div>
        {sorted.length > 0 && <Rail list={sorted} dir="left" catName={catName} className="shx-strip" />}
      </div>
    </section>
  );
}
