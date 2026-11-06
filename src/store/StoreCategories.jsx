import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../lib/api.js';

// Category bar at the top of the Online Store. Categories and counts come from the database,
// so a new category added in Admin → Products appears here automatically.
// Clicking one opens the product list below, filtered to that category.
const ICON = {
  all: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  wall: <><rect x="3" y="4" width="18" height="14" rx="1.5" /><path d="m6 15 4-4 3 3 2-2 3 3" /><circle cx="15.5" cy="8.5" r="1.3" /></>,
  sculpt: <><path d="M9 3h6M10 3v3c-2.5 1.5-4 4-4 7 0 4.5 2.7 8 6 8s6-3.5 6-8c0-3-1.5-5.5-4-7V3" /><path d="M7 12h10" /></>,
  furn: <><path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" /><path d="M3 12a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z" /><path d="M5 17v2M19 17v2" /></>,
  table: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /></>,
  light: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />,
  other: <><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="8" cy="8" r="1.5" /></>
};

export default function StoreCategories() {
  const { search } = useLocation();
  const active = new URLSearchParams(search).get('cat') || 'all';
  const [cats, setCats] = useState(null);

  useEffect(() => {
    let alive = true;
    Promise.all([api('/categories'), api('/products')])
      .then(([c, p]) => {
        if (!alive) return;
        const count = (code) => p.filter((x) => x.cat === code).length;
        setCats([{ code: 'all', name: 'All products', n: p.length }, ...c.map((x) => ({ ...x, n: count(x.code) })).filter((x) => x.n > 0)]);
      })
      .catch(() => alive && setCats([]));
    return () => { alive = false; };
  }, []);

  if (cats && cats.length <= 1) return null; // nothing to choose from yet
  return (
    <nav className="sc-bar" aria-label="Shop by category">
      <div className="wrap">
        <div className="sc-row">
          <span className="sc-title">Shop by category</span>
          <div className="sc-list">
            {!cats
              ? Array.from({ length: 5 }).map((_, i) => <span key={i} className="sc-item sc-skel" aria-hidden="true" />)
              : cats.map((c) => (
                <Link key={c.code} to={(c.code === 'all' ? '/store' : `/store?cat=${encodeURIComponent(c.code)}`) + '#store-shop'}
                  className={'sc-item' + (active === c.code ? ' on' : '')} aria-current={active === c.code ? 'true' : undefined}>
                  <span className="sc-ic"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ICON[c.code] || ICON.other}</svg></span>
                  <span className="sc-txt"><b>{c.name}</b><small>{c.n} {c.n === 1 ? 'item' : 'items'}</small></span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
