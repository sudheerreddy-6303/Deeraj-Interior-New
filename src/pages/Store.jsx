import { Link } from 'react-router-dom';
import usePage from '../lib/usePage.js';
import Shop from '../store/Shop.jsx';
import StoreCategories from '../store/StoreCategories.jsx';

// Store page. Content and layout come from the Deeraj Interiors design; 3D stages and
// animations are attached by usePage() after the page renders.
export default function Store() {
  const ref = usePage('store');
  return (
    <div ref={ref} className="page" id="p-store" data-page="store">
      <StoreCategories />
      <section>
        <div className="wrap">
          <div className="hero3d">
            <div className="rise">
              <span className="crumbs">
                <Link to="/">Home</Link>
                {" / Online Store"}
              </span>
              <p className="eyebrow" style={{ marginTop: "18px" }}>Online store</p>
              <h1 className="h1">
                {"Finishing touches, "}
                <em className="hl">ready to use</em>
              </h1>
              <p className="lead">
                Wall art, mirrors, sculptures, tables and lighting, delivered across Hyderabad. Spin pieces in 3D, add to cart and check out in a minute.
              </p>
              <div className="actions" style={{ marginTop: "24px" }}>
                <Link className="btn btn-primary" to="/store#store-shop">Shop now</Link>
              </div>
            </div>
            <div className="stage" id="st-store">
              <div className="s-load">Loading 3D showroom…</div>
              <div className="s-hint">
                <span className="live" />
                Live 3D · drag to spin
              </div>
              <div className="s-pick" role="group" aria-label="Choose product">
                <button type="button" data-prod="vase" aria-pressed="true">Flower vase</button>
                <button type="button" data-prod="mirror" aria-pressed="false">Wall mirror</button>
                <button type="button" data-prod="deer" aria-pressed="false">Deer sculpture</button>
                <button type="button" data-prod="table" aria-pressed="false">Center table</button>
                <button type="button" data-prod="shelf" aria-pressed="false">Book shelf</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Shop />
    </div>
  );
}
