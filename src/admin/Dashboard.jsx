import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useToast } from '../components/Toasts.jsx';
import { money } from '../store/storeUtils.jsx';
import Visits from './Visits.jsx';

export default function Dashboard({ onAuthError }) {
  const notify = useToast();
  const [s, setS] = useState(null);
  useEffect(() => {
    api('/admin/stats', { auth: true }).then(setS).catch((e) => { if (!onAuthError(e)) notify(e.message, 'danger'); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tiles = s ? [
    ['Orders awaiting confirmation', s.orders.placed, '/admin/orders', 'warning'],
    ['Total orders', s.orders.total, '/admin/orders', 'primary'],
    ['Order value', money(s.orders.value), '/admin/orders', 'success'],
    ['New enquiries', s.enquiries.fresh, '/admin/enquiries', 'danger'],
    ['Products', s.products.total, '/admin/products', 'secondary'],
    ['Low stock (3 or less)', s.products.low, '/admin/products', 'warning']
  ] : [];

  return (
    <>
      <h1 className="h3 mb-4">Dashboard</h1>
      {!s ? <div className="text-center py-5"><span className="spinner-border text-primary" role="status" /></div> : (
        <div className="row g-3">
          {tiles.map(([label, value, to, tone]) => (
            <div className="col-6 col-md-4" key={label}>
              <Link to={to} className={`card h-100 text-decoration-none border-0 shadow-sm border-start border-4 border-${tone}`}>
                <div className="card-body">
                  <div className="text-secondary small">{label}</div>
                  <div className="fs-3 fw-bold text-body">{value}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      <Visits onAuthError={onAuthError} />
    </>
  );
}
