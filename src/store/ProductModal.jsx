import { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { money, off, colorsOf, vStock, vImgs, keyOf, paras, ProductMedia, Stepper } from './storeUtils.jsx';
import { fileUrl } from '../lib/api.js';
import RelatedProducts from './RelatedProducts.jsx';

// Product detail: 4 photos + 1 video gallery (swipe or arrows), colour swatches, description and specs.
export default function ProductModal({ p, color, onColor, settings, catName, cart, onAdd, onBuy, onClose, products, onOpen, page }) {
  const [gi, setGi] = useState(0);
  const sx = useRef(null);
  useEffect(() => setGi(0), [p && p.id, color && color.name]);
  if (!p) return page ? null : <Modal show={false} onHide={onClose} />;

  const cs = colorsOf(p);
  const cname = color ? color.name : '';
  const ck = keyOf(p.id, cname);
  const sk = vStock(p, cname);
  const qty = cart[ck] || 0;
  const o = off(p);
  const s = settings || {};
  const gallery = vImgs(p, cname).map((u, i) => ({ t: 'img', u, label: `Photo ${i + 1}` }));
  if (p.video) gallery.push({ t: 'video', u: fileUrl(p.video), label: 'Video' });
  const n = gallery.length;
  const go = (i) => n && setGi((i + n) % n);
  const cur = gallery[gi];
  const spec = p.specs || {};
  const rows = [['Material', spec.material], ['Finish', spec.finish], ['Dimensions', spec.dimensions], ['Weight', spec.weight], ['Care', spec.care],
    ['Colours', cs.map((c) => c.name).join(', ')], ['Category', catName[p.cat]]].filter((r) => r[1]);
  const hl = (p.highlights || []).filter(Boolean);
  const ps = paras(p.desc);
  const lead = ps[0] ? ps[0].split(/(?<=\.)\s/)[0] : '';
  const notifyMsg = 'https://wa.me/919000700930?text=' + encodeURIComponent(`Hi, please tell me when ${p.name}${cname ? ' in ' + cname : ''} is back in stock.`);

  const Title = page ? 'h1' : 'h2';
  const content = (
      <>
        <div className="pd">
          <div className="pd-g">
            <div className="gal-main"
              onPointerDown={(e) => { sx.current = e.clientX; }}
              onPointerUp={(e) => { if (sx.current == null) return; const dx = e.clientX - sx.current; sx.current = null; if (Math.abs(dx) > 40 && !e.target.closest('video, button')) go(gi + (dx < 0 ? 1 : -1)); }}>
              <div className="gal-stage">
                {!cur ? <ProductMedia p={p} color={cname} className="big" catName={catName[p.cat]} />
                  : cur.t === 'img' ? <img src={cur.u} alt={`${p.name}, ${cur.label.toLowerCase()}`} />
                    : <video src={cur.u} controls playsInline autoPlay muted loop preload="metadata" aria-label={`${p.name} video`} />}
              </div>
              {n > 1 && (
                <>
                  <button type="button" className="gnav prev" onClick={() => go(gi - 1)} aria-label="Previous">‹</button>
                  <button type="button" className="gnav next" onClick={() => go(gi + 1)} aria-label="Next">›</button>
                  <span className="gcount">{gi + 1} / {n}</span>
                </>
              )}
            </div>
            {n > 1 && (
              <div className="gal-thumbs" role="group" aria-label="Product media">
                {gallery.map((x, j) => (
                  <button key={x.u + j} type="button" aria-label={x.label} aria-current={j === gi} onClick={() => setGi(j)}>
                    {x.t === 'img' ? <img src={x.u} alt="" /> : <><video src={x.u} muted preload="metadata" /><span className="tplay">▶</span></>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pd-i">
            <small>{catName[p.cat] || 'Decor'}</small>
            <Title id="pd-title">{p.name}</Title>
            <div className="price lg"><b>{money(p.price)}</b>{o > 0 && <><s>{money(p.mrp)}</s><span className="b-off">{o}% off</span></>}</div>
            <p className="incl">Inclusive of all taxes</p>
            {lead && <p className="desc">{lead}</p>}
            {cs.length > 0 && (
              <div className="colors">
                <p className="clabel">Colour: <b>{cname}</b></p>
                <div className="swatches" role="group" aria-label="Choose colour">
                  {cs.map((c) => {
                    const out = vStock(p, c.name) <= 0;
                    return (
                      <button key={c.name} type="button" className={'sw' + (out ? ' out' : '')} aria-pressed={c.name === cname}
                        aria-label={c.name + (out ? ', out of stock' : '')} title={c.name + (out ? ' (out of stock)' : '')}
                        style={{ '--c': c.hex || '#ccc' }} onClick={() => onColor(c.name)} />
                    );
                  })}
                </div>
              </div>
            )}
            <ul className="pd-pts">
              <li>{sk <= 0 ? 'Currently out of stock' : sk <= 3 ? `Only ${sk} left in stock` : 'In stock, ships from Hyderabad'}</li>
              <li>{s.freeAbove ? `Free delivery on orders above ${money(s.freeAbove)}` : 'Delivery charges at checkout'}</li>
              <li>{[s.cod && 'Cash on delivery', s.upi && 'UPI on delivery', s.pickup && 'Pickup at our experience centres'].filter(Boolean).join(' · ')}</li>
            </ul>
            {sk > 0 ? (
              <div className="pd-act">
                {qty ? <Stepper qty={qty} max={sk} onDec={() => onAdd(ck, -1)} onInc={() => onAdd(ck, 1)} />
                  : <button type="button" className="btn btn-outline" onClick={() => onAdd(ck, 1)}>Add to cart</button>}
                <button type="button" className="btn btn-primary" onClick={() => onBuy(ck)}>Buy now</button>
              </div>
            ) : <a className="btn btn-wa" href={notifyMsg}>Notify me on WhatsApp</a>}
          </div>
        </div>

        {(ps.length > 0 || hl.length > 0 || rows.length > 0) && (
          <div className="pd-more">
            <section>
              <h3>Description</h3>
              {ps.length ? ps.map((x, i) => <p key={i}>{x}</p>) : <p className="muted">Description coming soon.</p>}
              {hl.length > 0 && <><h3 style={{ marginTop: 22 }}>Highlights</h3><ul className="hls">{hl.map((h) => <li key={h}>{h}</li>)}</ul></>}
            </section>
            {rows.length > 0 && (
              <section>
                <h3>Product details</h3>
                <dl className="specs">{rows.map(([k, v]) => <div key={k} className="contents"><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              </section>
            )}
          </div>
        )}
        {products && onOpen && <RelatedProducts p={p} products={products} catName={catName} onOpen={onOpen} />}
      </>
  );
  // full product page (/store/product/:id)
  if (page) return <div className="pd-page">{content}</div>;
  return (
    <Modal show onHide={onClose} size="xl" centered scrollable className="di-modal" aria-labelledby="pd-title">
      <Modal.Header closeButton className="border-0 pb-0" />
      <Modal.Body className="pt-0">{content}</Modal.Body>
    </Modal>
  );
}
