import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import useConfirm from '../components/Confirm.jsx';
import { fmtDate } from '../store/storeUtils.jsx';

// All website form submissions: home consultation, contact quote, factory collaboration.
const TYPES = { consultation: 'Free consultation (Home)', quote: 'Quote request (Contact)', collaboration: 'B2B collaboration (Factory)', partner: 'Partner' };
const TONE = { new: 'danger', contacted: 'warning', closed: 'success' };

export default function Enquiries({ onAuthError }) {
  const notify = useToast();
  const [confirm, confirmEl] = useConfirm();
  const [list, setList] = useState(null);
  const [type, setType] = useState('all');
  const fail = (e) => { if (!onAuthError(e)) notify(e.message, 'danger'); };
  useEffect(() => { setList(null); api('/admin/enquiries?type=' + type, { auth: true }).then(setList).catch(fail); }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = async (q, status) => {
    try { await api(`/admin/enquiries/${q.id}`, { method: 'PATCH', auth: true, body: { status } }); setList((l) => l.map((x) => (x.id === q.id ? { ...x, status } : x))); notify(`Marked as ${status}`); }
    catch (e) { fail(e); }
  };
  const remove = async (q) => {
    if (!(await confirm({ title: 'Delete this enquiry?', body: `${q.name} · ${q.phone}`, ok: 'Delete', danger: true }))) return;
    try { await api(`/admin/enquiries/${q.id}`, { method: 'DELETE', auth: true }); setList((l) => l.filter((x) => x.id !== q.id)); notify('Enquiry deleted'); }
    catch (e) { fail(e); }
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
        <h1 className="h3 mb-0">Enquiries</h1>
        <select className="form-select w-auto" value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by form">
          <option value="all">All forms</option>
          {Object.entries(TYPES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
      </div>
      {!list ? <div className="text-center py-5"><span className="spinner-border text-primary" role="status" /></div>
        : !list.length ? <div className="card border-0 shadow-sm"><div className="card-body text-center text-secondary py-5">No enquiries yet. Form submissions from the website appear here.</div></div>
          : (
            <div className="row g-3">
              {list.map((q) => (
                <div className="col-md-6 col-xl-4" key={q.id}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between gap-2">
                        <div><b>{q.name}</b><div className="small text-secondary">{TYPES[q.type]} · {fmtDate(q.created_at)}</div></div>
                        <span className={`badge text-bg-${TONE[q.status]} align-self-start text-capitalize`}>{q.status}</span>
                      </div>
                      <p className="small my-2">
                        <a href={`tel:${q.phone}`}>{q.phone}</a> · <a href={`https://wa.me/91${q.phone}`} target="_blank" rel="noreferrer">WhatsApp</a>
                        {q.email && <> · <a href={`mailto:${q.email}`}>{q.email}</a></>}
                      </p>
                      {Object.keys(q.details || {}).length > 0 && (
                        <dl className="row small mb-2">
                          {Object.entries(q.details).map(([k, v]) => <div key={k} className="d-contents"><dt className="col-5 fw-semibold">{k}</dt><dd className="col-7 mb-1">{v}</dd></div>)}
                        </dl>
                      )}
                      {q.message && <p className="small bg-light rounded p-2 mb-2">{q.message}</p>}
                      <div className="mt-auto d-flex gap-2">
                        <select className="form-select form-select-sm" value={q.status} onChange={(e) => setStatus(q, e.target.value)} aria-label="Status">
                          <option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option>
                        </select>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => remove(q)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      {confirmEl}
    </>
  );
}
