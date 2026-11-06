import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import { money } from '../store/storeUtils.jsx';
import RangeFilter, { rangeLabel, rangeQuery } from './RangeFilter.jsx';
import { PAY_METHOD } from './Payments.jsx';

const STATUS = { processed: ['Processed', 'success'], pending: ['Processing', 'warning'], failed: ['Failed', 'danger'] };

// Refunds: every refund recorded from Payment history (manual or through Razorpay).
export default function Refunds({ onAuthError }) {
  const notify = useToast();
  const [filter, setFilter] = useState({ range: '30d' });
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    setBusy(true);
    try { setData(await api('/admin/refunds?' + rangeQuery(filter), { auth: true })); }
    catch (e) { if (!onAuthError(e)) notify(e.message, 'danger'); } finally { setBusy(false); }
  }, [filter, notify, onAuthError]);
  useEffect(() => { load(); }, [load]);

  return (
    <>
      <div className="d-flex flex-wrap gap-2 align-items-start justify-content-between mb-3">
        <div>
          <h1 className="h3 mb-0">Refunds</h1>
          <small className="text-secondary">{rangeLabel(data)}{busy && <span className="spinner-border spinner-border-sm ms-2" role="status" aria-label="Loading" />}</small>
        </div>
        <RangeFilter value={filter} onChange={setFilter} today={data && data.today} notify={notify} />
      </div>
      {!data ? <div className="text-center py-5"><span className="spinner-border text-primary" role="status" /></div> : (
        <>
          <div className="row g-3 mb-3">
            <div className="col-6 col-xl-3"><div className="card h-100 border-0 shadow-sm border-start border-4 border-info"><div className="card-body"><div className="text-secondary small">Total refunded</div><div className="fs-4 fw-bold">{money(data.total)}</div></div></div></div>
            <div className="col-6 col-xl-3"><div className="card h-100 border-0 shadow-sm border-start border-4 border-secondary"><div className="card-body"><div className="text-secondary small">Refunds</div><div className="fs-4 fw-bold">{data.refunds.length}</div></div></div></div>
          </div>
          <div className="card border-0 shadow-sm"><div className="card-body">
            {!data.refunds.length ? <p className="text-center text-secondary py-4 mb-0">No refunds in this period. To refund a payment, open Payment history and click Refund.</p> : (
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead className="table-light"><tr><th>Date</th><th>Order</th><th>Customer</th><th className="text-end">Amount</th><th>Reason</th><th>How</th><th>Status</th></tr></thead>
                  <tbody>
                    {data.refunds.map((f) => (
                      <tr key={f.id}>
                        <td className="small text-nowrap">{f.createdAt}</td>
                        <td className="fw-semibold">{f.orderCode}</td>
                        <td><div>{f.customer.name}</div><small className="text-secondary">{f.customer.phone}</small></td>
                        <td className="text-end text-nowrap">{money(f.amount)}<div className="small text-secondary">of {money(f.paidAmount)}</div></td>
                        <td className="small">{f.reason}{f.reference && <div className="text-secondary">Ref: {f.reference}</div>}</td>
                        <td className="small">{f.mode === 'razorpay' ? <>Razorpay<div className="text-secondary">{f.razorpayRefundId}</div></> : <>Manual · {PAY_METHOD[f.method] || f.method}</>}<div className="text-secondary">by {f.by}</div></td>
                        <td><span className={`badge text-bg-${STATUS[f.status][1]}`}>{STATUS[f.status][0]}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div></div>
        </>
      )}
    </>
  );
}
