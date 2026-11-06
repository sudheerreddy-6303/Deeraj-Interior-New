import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { api, uploadFile, fileUrl } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import { MODELS } from '../store/storeUtils.jsx';

const EMPTY = { name: '', cat: 'wall', price: '', mrp: '', stock: 10, desc: '', model3d: '', featured: false, active: true, images: [], video: '', highlights: [], specs: {}, colors: [] };

// numbers typed as 12,999 or ₹12,999 → 12999
const num = (v) => Number(String(v ?? '').replace(/[₹,\s]/g, ''));

// Add / edit a product: 4 photos + 1 video, colours (each with stock + photos), description, highlights and specs.
export default function ProductForm({ product, show, cats, onHide, onSaved, onCategoryAdded, onAuthError }) {
  const notify = useToast();
  const [f, setF] = useState(EMPTY);
  const [hl, setHl] = useState('');
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState('');
  const [err, setErr] = useState('');
  const [newCat, setNewCat] = useState(null);

  useEffect(() => {
    if (!show) return;
    const p = product || EMPTY;
    setF({ ...EMPTY, ...p, images: [...(p.images || [])], specs: { ...(p.specs || {}) }, colors: (p.colors || []).map((c) => ({ ...c, stock: c.stock == null ? '' : c.stock, images: [...(c.images || [])] })) });
    setHl((p.highlights || []).join('\n'));
    setErr(''); setNewCat(null);
  }, [show, product]);

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const setSpec = (k) => (e) => setF((x) => ({ ...x, specs: { ...x.specs, [k]: e.target.value } }));
  const fail = (e) => { if (!onAuthError(e)) { setErr(e.message); notify(e.message, 'danger'); } };

  const upload = async (file, label, apply) => {
    if (!file) return;
    setUploading(label);
    try { const r = await uploadFile(file); apply(r.url); notify(`${label} uploaded`); }
    catch (e) { fail(e); } finally { setUploading(''); }
  };

  const setImage = (i, url) => setF((x) => { const a = [...x.images]; a[i] = url; return { ...x, images: a.filter(Boolean).slice(0, 4) }; });
  const removeImage = (i) => setF((x) => ({ ...x, images: x.images.filter((_, j) => j !== i) }));
  const setColor = (i, patch) => setF((x) => ({ ...x, colors: x.colors.map((c, j) => (j === i ? { ...c, ...patch } : c)) }));

  const addCategory = async () => {
    try {
      const c = await api('/admin/categories', { method: 'POST', auth: true, body: newCat });
      onCategoryAdded(c); setF((x) => ({ ...x, cat: c.code })); setNewCat(null); notify(`Category ${c.name} added`);
    } catch (e) { fail(e); }
  };

  const save = async (e) => {
    e.preventDefault();
    const body = { ...f, price: num(f.price), mrp: num(f.mrp) || 0, stock: num(f.stock) || 0, colors: f.colors.map((c) => ({ ...c, stock: String(c.stock ?? '').trim() === '' ? '' : num(c.stock) })), highlights: hl.split('\n').map((x) => x.trim()).filter(Boolean) };
    const bad = !body.name.trim() ? 'Add a product name.' : !(body.price > 0) ? 'Enter a selling price above 0.' : body.mrp && body.mrp < body.price ? 'MRP should be equal to or more than the selling price.' : '';
    if (bad) { setErr(bad); notify(bad, 'danger'); return; }
    setBusy(true); setErr('');
    try {
      const saved = product
        ? await api(`/admin/products/${product.id}`, { method: 'PUT', auth: true, body })
        : await api('/admin/products', { method: 'POST', auth: true, body });
      notify(product ? 'Product updated' : 'Product added');
      onSaved(saved, !product);
    } catch (x) { fail(x); } finally { setBusy(false); }
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" scrollable backdrop="static" className="admin-modal" aria-labelledby="pf-title">
      <form onSubmit={save} noValidate className="d-contents">
        <Modal.Header closeButton><Modal.Title id="pf-title">{product ? 'Edit product' : 'Add product'}</Modal.Title></Modal.Header>
        <Modal.Body>
          <div className="row g-4">
            <div className="col-lg-5">
              <h2 className="h6">Photos &amp; video</h2>
              <p className="small text-secondary">Add 4 photos (the first is the main photo) and 1 short video (MP4/WebM, up to 20 MB).</p>
              <div className="row g-2">
                {[0, 1, 2, 3].map((i) => {
                  const u = f.images[i];
                  return (
                    <div className="col-6" key={i}>
                      <div className="ratio ratio-1x1 border rounded bg-light position-relative overflow-hidden">
                        {u ? <img src={fileUrl(u)} alt={`Photo ${i + 1}`} className="object-fit-cover" />
                          : <span className="d-flex align-items-center justify-content-center text-secondary small text-center">Photo {i + 1}{i === 0 && <><br />(main)</>}</span>}
                      </div>
                      <div className="d-flex gap-1 mt-1">
                        <label className="btn btn-sm btn-outline-secondary flex-grow-1 mb-0">
                          {u ? 'Replace' : '+ Add'}
                          <input type="file" accept="image/*" hidden disabled={!!uploading || (!u && i > f.images.length)} onChange={(e) => upload(e.target.files[0], `Photo ${i + 1}`, (url) => setImage(u ? i : f.images.length, url))} />
                        </label>
                        {u && <button type="button" className="btn btn-sm btn-outline-danger" aria-label={`Remove photo ${i + 1}`} onClick={() => removeImage(i)}>✕</button>}
                      </div>
                    </div>
                  );
                })}
                <div className="col-12">
                  <div className="ratio ratio-16x9 border rounded bg-light overflow-hidden">
                    {f.video ? <video src={fileUrl(f.video)} controls muted playsInline preload="metadata" />
                      : <span className="d-flex align-items-center justify-content-center text-secondary small">Product video</span>}
                  </div>
                  <div className="d-flex gap-1 mt-1">
                    <label className="btn btn-sm btn-outline-secondary flex-grow-1 mb-0">
                      {f.video ? 'Replace video' : '+ Add video'}
                      <input type="file" accept="video/mp4,video/webm" hidden disabled={!!uploading} onChange={(e) => upload(e.target.files[0], 'Video', (url) => setF((x) => ({ ...x, video: url })))} />
                    </label>
                    {f.video && <button type="button" className="btn btn-sm btn-outline-danger" aria-label="Remove video" onClick={() => setF((x) => ({ ...x, video: '' }))}>✕</button>}
                  </div>
                </div>
              </div>
              {uploading && <p className="small text-primary mt-2" role="status"><span className="spinner-border spinner-border-sm me-1" aria-hidden="true" />Uploading {uploading}…</p>}
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label" htmlFor="pf-name">Product name *</label>
                  <input id="pf-name" className="form-control" value={f.name} onChange={set('name')} />
                </div>
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="pf-cat">Category</label>
                  <div className="input-group">
                    <select id="pf-cat" className="form-select" value={f.cat} onChange={set('cat')}>
                      {cats.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </select>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setNewCat({ code: '', name: '' })} title="Add category">+</button>
                  </div>
                  {newCat && (
                    <div className="input-group input-group-sm mt-2">
                      <input className="form-control" placeholder="Name e.g. Rugs" value={newCat.name} onChange={(e) => setNewCat({ name: e.target.value, code: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') })} aria-label="New category name" />
                      <button type="button" className="btn btn-primary" onClick={addCategory}>Add</button>
                    </div>
                  )}
                </div>
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="pf-3d">3D model</label>
                  <select id="pf-3d" className="form-select" value={f.model3d} onChange={set('model3d')}>
                    {MODELS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label" htmlFor="pf-price">Price (₹) *</label>
                  <input id="pf-price" className="form-control" inputMode="numeric" value={f.price} onChange={set('price')} />
                </div>
                <div className="col-4">
                  <label className="form-label" htmlFor="pf-mrp">MRP (₹)</label>
                  <input id="pf-mrp" className="form-control" inputMode="numeric" value={f.mrp} onChange={set('mrp')} />
                </div>
                <div className="col-4">
                  <label className="form-label" htmlFor="pf-stock">Stock *</label>
                  <input id="pf-stock" className="form-control" inputMode="numeric" value={f.stock} onChange={set('stock')} />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="pf-desc">Description</label>
                  <textarea id="pf-desc" className="form-control" rows={4} placeholder="Start with one line that sums up the product. Leave a blank line between paragraphs." value={f.desc} onChange={set('desc')} />
                </div>

                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="form-label mb-0">Colour options</span>
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setF((x) => ({ ...x, colors: [...x.colors, { name: '', hex: '#8a6f58', stock: '', images: [] }] }))}>+ Add colour</button>
                  </div>
                  <p className="small text-secondary mb-2">Each colour can have its own stock and up to 4 photos. Leave stock empty to use the product stock.</p>
                  {!f.colors.length && <p className="small text-secondary">No colours yet. Customers will see a single option.</p>}
                  {f.colors.map((c, i) => (
                    <div className="border rounded p-2 mb-2" key={i}>
                      <div className="d-flex gap-2 align-items-center">
                        <input type="color" className="form-control form-control-color flex-shrink-0" value={c.hex} onChange={(e) => setColor(i, { hex: e.target.value })} aria-label={`Colour ${i + 1}`} />
                        <input className="form-control" placeholder="Colour name, e.g. Walnut" value={c.name} onChange={(e) => setColor(i, { name: e.target.value })} aria-label="Colour name" />
                        <input className="form-control" style={{ maxWidth: 90 }} inputMode="numeric" placeholder="Stock" value={c.stock} onChange={(e) => setColor(i, { stock: e.target.value })} aria-label="Stock for this colour" />
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setF((x) => ({ ...x, colors: x.colors.filter((_, j) => j !== i) }))}>Remove</button>
                      </div>
                      <div className="d-flex gap-2 mt-2 flex-wrap">
                        {c.images.map((im, j) => (
                          <span key={j} className="position-relative">
                            <img src={fileUrl(im)} alt="" width="56" height="56" className="rounded object-fit-cover border" />
                            <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0 p-0 px-1 lh-1" aria-label="Remove photo" onClick={() => setColor(i, { images: c.images.filter((_, k) => k !== j) })}>✕</button>
                          </span>
                        ))}
                        {c.images.length < 4 && (
                          <label className="btn btn-sm btn-outline-secondary mb-0 d-flex align-items-center">
                            + Photo
                            <input type="file" accept="image/*" hidden disabled={!!uploading} onChange={(e) => upload(e.target.files[0], `${c.name || 'Colour'} photo`, (url) => setColor(i, { images: [...c.images, url].slice(0, 4) }))} />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-12">
                  <label className="form-label" htmlFor="pf-hl">Highlights (one per line)</label>
                  <textarea id="pf-hl" className="form-control" rows={3} value={hl} onChange={(e) => setHl(e.target.value)} />
                </div>
                {[['material', 'Material', 'col-sm-6'], ['finish', 'Finish', 'col-sm-6'], ['dimensions', 'Dimensions', 'col-sm-4', 'e.g. 60 × 60 × 4 cm'], ['weight', 'Weight', 'col-sm-4', 'e.g. 2.5 kg'], ['care', 'Care', 'col-sm-4']].map(([k, l, col, ph]) => (
                  <div className={col} key={k}>
                    <label className="form-label" htmlFor={'pf-' + k}>{l}</label>
                    <input id={'pf-' + k} className="form-control" placeholder={ph} value={f.specs[k] || ''} onChange={setSpec(k)} />
                  </div>
                ))}
                <div className="col-12 d-flex flex-wrap gap-4">
                  <div className="form-check form-switch"><input id="pf-feat" className="form-check-input" type="checkbox" checked={f.featured} onChange={set('featured')} /><label className="form-check-label" htmlFor="pf-feat">Featured (shows first)</label></div>
                  <div className="form-check form-switch"><input id="pf-act" className="form-check-input" type="checkbox" checked={f.active} onChange={set('active')} /><label className="form-check-label" htmlFor="pf-act">Visible in store</label></div>
                </div>
              </div>
            </div>
          </div>
          {err && <div className="alert alert-danger py-2 mt-3 mb-0" role="alert">{err}</div>}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-outline-secondary" onClick={onHide}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={busy || !!uploading}>
            {busy ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Saving…</> : 'Save product'}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
