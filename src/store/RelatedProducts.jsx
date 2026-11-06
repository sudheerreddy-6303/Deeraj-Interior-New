import { useMemo, useRef } from 'react';
import { money, off, maxStock, imgs, ProductMedia } from './storeUtils.jsx';

// "You may also like" row at the bottom of the product popup.
// Same category first, then products with the closest price; in-stock items before out-of-stock.
export default function RelatedProducts({ p, products, catName, onOpen }) {
  const row = useRef(null);
  const list = useMemo(() => {
    if (!p || !products) return [];
    return products
      .filter((x) => x.id !== p.id)
      .map((x) => ({ x, score: (x.cat === p.cat ? 0 : 1e9) + (maxStock(x) > 0 ? 0 : 1e8) + Math.abs(Number(x.price) - Number(p.price)) }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 8)
      .map((r) => r.x);
  }, [p, products]);

  if (!list.length) return null;

  const scroll = (d) => { const el = row.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: 'smooth' }); };
  const open = (id) => {
    onOpen(id);
    const body = row.current && row.current.closest('.modal-body');
    if (body) body.scrollTo({ top: 0, behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="rp" aria-labelledby="rp-title">
      <div className="rp-head">
        <h3 id="rp-title">You may also like</h3>
        <div className="rp-nav">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous products">‹</button>
          <button type="button" onClick={() => scroll(1)} aria-label="More products">›</button>
        </div>
      </div>
      <div className="rp-row" ref={row}>
        {list.map((x) => {
          const o = off(x);
          const sk = maxStock(x);
          const im = imgs(x);
          return (
            <button type="button" className="rp-card" key={x.id} onClick={() => open(x.id)} aria-label={`View ${x.name}`}>
              <span className="rp-img">
                {im[0] ? <img src={im[0]} alt="" loading="lazy" /> : <ProductMedia p={x} catName={catName[x.cat]} />}
                {o > 0 && <em>{o}% off</em>}
              </span>
              <span className="rp-meta">
                <small>{catName[x.cat] || 'Decor'}</small>
                <b>{x.name}</b>
                <span className="rp-price">{money(x.price)}{o > 0 && <s>{money(x.mrp)}</s>}</span>
                {sk <= 0 && <span className="rp-out">Out of stock</span>}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
