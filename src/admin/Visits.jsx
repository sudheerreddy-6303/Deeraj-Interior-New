import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';

// Website visitors on the admin dashboard, with Today / Yesterday / 7 days / 30 days / Custom filters.
const RANGES = [['today', 'Today'], ['yesterday', 'Yesterday'], ['7d', 'Last 7 days'], ['30d', 'Last 30 days'], ['custom', 'Custom']];
const PAGE_NAMES = {
  '/': 'Home', '/about': 'About Us', '/services': 'Services', '/factory': 'Modular Factory', '/projects': 'Our Projects',
  '/gallery': 'Gallery', '/partner': 'Partner Us', '/store': 'Online Store', '/contact': 'Contact Us'
};
const n = (x) => Number(x || 0).toLocaleString('en-IN');
const fmtDay = (d, opts = { day: 'numeric', month: 'short' }) => { try { return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', opts); } catch (e) { return d; } };

function BarChart({ points, unit }) {
  const max = Math.max(1, ...points.map((p) => p.visitors));
  const W = 100 / points.length;
  const every = unit === 'hour' ? 3 : Math.ceil(points.length / 10);
  return (
    <div className="vz-chart" role="img" aria-label={`Visitors per ${unit}`}>
      <div className="vz-bars">
        {points.map((p, i) => (
          <div className="vz-col" key={p.label} style={{ width: `${W}%` }}>
            <div className="vz-bar" style={{ height: `${(p.visitors / max) * 100}%` }} title={`${unit === 'hour' ? p.label : fmtDay(p.label)}: ${p.visitors} visitors, ${p.views} page views`}>
              {p.visitors > 0 && points.length <= 31 && <span className="vz-val">{p.visitors}</span>}
            </div>
            <span className="vz-x">{i % every === 0 ? (unit === 'hour' ? p.label.slice(0, 2) : fmtDay(p.label)) : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Visits({ onAuthError }) {
  const notify = useToast();
  const [range, setRange] = useState('today');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (r, f, t) => {
    setBusy(true);
    try {
      const q = r === 'custom' ? `range=custom&from=${f}&to=${t}` : `range=${r}`;
      setData(await api('/admin/visits?' + q, { auth: true }));
    } catch (e) { if (!onAuthError(e)) notify(e.message, 'danger'); } finally { setBusy(false); }
  }, [notify, onAuthError]);

  useEffect(() => { load('today'); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (r) => {
    setRange(r);
    if (r !== 'custom') load(r);
    else if (data) { setFrom(from || data.today); setTo(to || data.today); }
  };
  const applyCustom = (e) => {
    e.preventDefault();
    if (!from || !to) { notify('Choose both a start date and an end date.', 'danger'); return; }
    if (from > to) { notify('The start date must be on or before the end date.', 'danger'); return; }
    load('custom', from, to);
  };

  const d = data;
  const totalDev = d ? (d.devices.mobile || 0) + (d.devices.tablet || 0) + (d.devices.desktop || 0) : 0;
  const pct = (x) => (totalDev ? Math.round(((x || 0) / totalDev) * 100) : 0);
  const label = !d ? '' : d.from === d.to ? fmtDay(d.from, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : `${fmtDay(d.from, { day: 'numeric', month: 'short', year: 'numeric' })} – ${fmtDay(d.to, { day: 'numeric', month: 'short', year: 'numeric' })}`;

  return (
    <section className="vz mt-4" aria-labelledby="vz-title">
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-3">
        <div>
          <h2 id="vz-title" className="h4 mb-0">Website visitors</h2>
          <small className="text-secondary">{label}{busy && <span className="spinner-border spinner-border-sm ms-2" role="status" aria-label="Loading" />}</small>
        </div>
        <div className="btn-group flex-wrap vz-filters" role="group" aria-label="Date range">
          {RANGES.map(([k, l]) => (
            <button key={k} type="button" className={'btn btn-sm ' + (range === k ? 'btn-primary' : 'btn-outline-secondary')} aria-pressed={range === k} onClick={() => pick(k)}>{l}</button>
          ))}
        </div>
      </div>

      {range === 'custom' && (
        <form className="card border-0 shadow-sm mb-3" onSubmit={applyCustom}>
          <div className="card-body row g-2 align-items-end">
            <div className="col-6 col-md-3"><label className="form-label small mb-1" htmlFor="vz-from">From</label><input id="vz-from" type="date" className="form-control form-control-sm" value={from} max={to || d?.today} onChange={(e) => setFrom(e.target.value)} /></div>
            <div className="col-6 col-md-3"><label className="form-label small mb-1" htmlFor="vz-to">To</label><input id="vz-to" type="date" className="form-control form-control-sm" value={to} min={from} max={d?.today} onChange={(e) => setTo(e.target.value)} /></div>
            <div className="col-12 col-md-2"><button className="btn btn-primary btn-sm w-100" type="submit" disabled={busy}>Apply</button></div>
          </div>
        </form>
      )}

      {!d ? <div className="text-center py-4"><span className="spinner-border text-primary" role="status" /></div> : (
        <>
          <div className="row g-3">
            {[
              ['Visitors', n(d.visitors), 'Different people (browsers) who opened the website', 'primary'],
              ['Page views', n(d.views), 'Total pages opened', 'info'],
              ['New visitors', n(d.newVisitors), 'First time on the website', 'success'],
              ['Pages per visitor', d.visitors ? (d.views / d.visitors).toFixed(1) : '0', 'How much each visitor browsed', 'warning']
            ].map(([t, v, help, tone]) => (
              <div className="col-6 col-xl-3" key={t}>
                <div className={`card h-100 border-0 shadow-sm border-start border-4 border-${tone}`}>
                  <div className="card-body"><div className="text-secondary small">{t}</div><div className="fs-3 fw-bold">{v}</div><div className="small text-secondary d-none d-md-block">{help}</div></div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-3 mt-0">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm h-100"><div className="card-body">
                <h3 className="h6 mb-3">Visitors per {d.unit === 'hour' ? 'hour' : 'day'}</h3>
                {d.visitors ? <BarChart points={d.points} unit={d.unit} /> : <p className="text-secondary small mb-0 py-4 text-center">No visits in this period yet.</p>}
              </div></div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100"><div className="card-body">
                <h3 className="h6 mb-3">Devices</h3>
                {[['mobile', 'Phone'], ['desktop', 'Computer'], ['tablet', 'Tablet']].map(([k, l]) => (
                  <div className="mb-2" key={k}>
                    <div className="d-flex justify-content-between small"><span>{l}</span><b>{n(d.devices[k])} · {pct(d.devices[k])}%</b></div>
                    <div className="progress" style={{ height: 8 }} role="progressbar" aria-label={l} aria-valuenow={pct(d.devices[k])} aria-valuemin="0" aria-valuemax="100"><div className="progress-bar" style={{ width: pct(d.devices[k]) + '%' }} /></div>
                  </div>
                ))}
                {d.referrers.length > 0 && (
                  <>
                    <h3 className="h6 mt-4 mb-2">Came from</h3>
                    {d.referrers.map((r) => <div className="d-flex justify-content-between small py-1 border-bottom" key={r.site}><span className="text-truncate me-2">{r.site}</span><b>{n(r.visitors)}</b></div>)}
                  </>
                )}
              </div></div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mt-3">
            <div className="card-body">
              <h3 className="h6 mb-3">Most visited pages</h3>
              {!d.pages.length ? <p className="text-secondary small mb-0">No visits in this period yet.</p> : (
                <div className="table-responsive">
                  <table className="table table-sm align-middle mb-0">
                    <thead><tr><th>Page</th><th className="text-end">Visitors</th><th className="text-end">Page views</th></tr></thead>
                    <tbody>
                      {d.pages.map((p) => (
                        <tr key={p.path}><td>{PAGE_NAMES[p.path] || p.path} <small className="text-secondary">{PAGE_NAMES[p.path] ? p.path : ''}</small></td><td className="text-end">{n(p.visitors)}</td><td className="text-end">{n(p.views)}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <p className="small text-secondary mt-2 mb-0">
            All time: {n(d.allTime.visitors)} visitors · {n(d.allTime.views)} page views{d.allTime.since ? ` since ${new Date(d.allTime.since).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}. Your own visits while signed in as admin are not counted.
          </p>
        </>
      )}
    </section>
  );
}
