import { useState } from 'react';

// Date filter used by admin reports: Today / Yesterday / 7 days / 30 days / All / Custom.
export const RANGES = [['today', 'Today'], ['yesterday', 'Yesterday'], ['7d', 'Last 7 days'], ['30d', 'Last 30 days'], ['all', 'All time'], ['custom', 'Custom']];

export const fmtDay = (d, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  try { return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', opts); } catch (e) { return d; }
};
export const rangeLabel = (d) => (!d || !d.from ? 'All time' : d.from === d.to ? fmtDay(d.from, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : `${fmtDay(d.from)} – ${fmtDay(d.to)}`);
export const rangeQuery = (r) => (r.range === 'custom' ? `range=custom&from=${r.from}&to=${r.to}` : `range=${r.range}`);

/** value = { range, from, to }; onChange is called only when a complete range is chosen. */
export default function RangeFilter({ value, onChange, today, notify, include = RANGES.map((x) => x[0]) }) {
  const [custom, setCustom] = useState(value.range === 'custom');
  const [from, setFrom] = useState(value.from || today || '');
  const [to, setTo] = useState(value.to || today || '');
  const pick = (k) => {
    if (k === 'custom') { setCustom(true); setFrom(from || today || ''); setTo(to || today || ''); return; }
    setCustom(false); onChange({ range: k });
  };
  const apply = (e) => {
    e.preventDefault();
    if (!from || !to) { notify('Choose both a start date and an end date.', 'danger'); return; }
    if (from > to) { notify('The start date must be on or before the end date.', 'danger'); return; }
    onChange({ range: 'custom', from, to });
  };
  return (
    <div className="rf">
      <div className="btn-group flex-wrap vz-filters" role="group" aria-label="Date range">
        {RANGES.filter(([k]) => include.includes(k)).map(([k, l]) => {
          const on = k === 'custom' ? custom : !custom && value.range === k;
          return <button key={k} type="button" className={'btn btn-sm ' + (on ? 'btn-primary' : 'btn-outline-secondary')} aria-pressed={on} onClick={() => pick(k)}>{l}</button>;
        })}
      </div>
      {custom && (
        <form className="d-flex flex-wrap gap-2 align-items-end mt-2" onSubmit={apply}>
          <div><label className="form-label small mb-1" htmlFor="rf-from">From</label><input id="rf-from" type="date" className="form-control form-control-sm" value={from} max={to || today} onChange={(e) => setFrom(e.target.value)} /></div>
          <div><label className="form-label small mb-1" htmlFor="rf-to">To</label><input id="rf-to" type="date" className="form-control form-control-sm" value={to} min={from} max={today} onChange={(e) => setTo(e.target.value)} /></div>
          <button className="btn btn-primary btn-sm" type="submit">Apply</button>
        </form>
      )}
    </div>
  );
}
