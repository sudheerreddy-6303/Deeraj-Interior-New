import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import useConfirm from '../components/Confirm.jsx';
import { money, off, imgs, colorsOf, stockOf, ProductMedia } from '../store/storeUtils.jsx';
import ProductForm from './ProductForm.jsx';

export default function Products({ onAuthError }) {
  const notify = useToast();
  const [confirm, confirmEl] = useConfirm();
  const [list, setList] = useState(null);
  const [cats, setCats] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | product
  const [q, setQ] = useState('');

  const fail = (e) => { if (!onAuthError(e)) notify(e.message, 'danger'); };
  const load = () => Promise.all([api('/admin/products', { auth: true }), api('/categories')]).then(([p, c]) => { setList(p); setCats(c); }).catch(fail);
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const catName = Object.fromEntries(cats.map((c) => [c.code, c.name]));

  const toggle = async (p) => {
    try {
      await api(`/admin/products/${p.id}/active`, { method: 'PATCH', auth: true, body: { active: !p.active } });
      setList((l) => l.map((x) => (x.id === p.id ? { ...x, active: !p.active } : x)));
      notify(p.active ? `${p.name} is now hidden from the store` : `${p.name} is now visible in the store`);
    } catch (e) { fail(e); }
  };

  const remove = async (p) => {
    if (!(await confirm({ title: `Delete ${p.name}?`, body: 'This removes the product from the store. Past orders keep their details.', ok: 'Delete', danger: true }))) return;
    try {
      await api(`/admin/products/${p.id}`, { method: 'DELETE', auth: true });
      setList((l) => l.filter((x) => x.id !== p.id));
      notify('Product deleted');
    } catch (e) { fail(e); }
  };

  const shown = (list || []).filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
        <h1 className="h3 mb-0">Products {list && <span className="badge text-bg-light fs-6 align-middle">{list.length}</span>}</h1>
        <div className="d-flex gap-2 flex-grow-1 flex-sm-grow-0">
          <input className="form-control" type="search" placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
          <button type="button" className="btn btn-primary text-nowrap flex-shrink-0" onClick={() => setEditing('new')}>+ Add product</button>
        </div>
      </div>

      {!list ? <div className="text-center py-5"><span className="spinner-border text-primary" role="status" /></div> : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr><th>Product</th><th>Price</th><th className="d-none d-md-table-cell">Stock</th><th>Visible</th><th className="text-end">Actions</th></tr>
              </thead>
              <tbody>
                {shown.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <span className="tthumb flex-shrink-0"><ProductMedia p={p} catName={catName[p.cat]} /></span>
                        <span>
                          <b className="d-block">{p.name}</b>
                          <small className="text-secondary">
                            {catName[p.cat] || p.cat} · {imgs(p).length}/4 photos{p.video ? ' · video' : ''}{colorsOf(p).length ? ` · ${colorsOf(p).length} colours` : ''}{p.featured ? ' · Featured' : ''}
                          </small>
                        </span>
                      </div>
                    </td>
                    <td className="text-nowrap">{money(p.price)}{off(p) > 0 && <small className="d-block text-secondary"><s>{money(p.mrp)}</s></small>}</td>
                    <td className={'d-none d-md-table-cell ' + (stockOf(p) <= 3 ? 'text-danger fw-bold' : '')}>{stockOf(p)}</td>
                    <td>
                      <div className="form-check form-switch m-0">
                        <input className="form-check-input" type="checkbox" role="switch" checked={p.active} onChange={() => toggle(p)} aria-label={`${p.name} visible in store`} />
                      </div>
                    </td>
                    <td className="text-end text-nowrap">
                      <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => setEditing(p)}>Edit</button>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => remove(p)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {!shown.length && <tr><td colSpan={5} className="text-center text-secondary py-4">No products found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ProductForm
        product={editing === 'new' ? null : editing}
        show={!!editing}
        cats={cats}
        onHide={() => setEditing(null)}
        onSaved={(p, isNew) => { setList((l) => (isNew ? [p, ...l] : l.map((x) => (x.id === p.id ? p : x)))); setEditing(null); }}
        onCategoryAdded={(c) => setCats((l) => [...l.filter((x) => x.code !== c.code), c])}
        onAuthError={onAuthError}
      />
      {confirmEl}
    </>
  );
}
