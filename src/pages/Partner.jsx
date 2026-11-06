import { Link } from 'react-router-dom';
import usePage from '../lib/usePage.js';

// Partner page. Content and layout come from the Deeraj Interiors design; 3D stages and
// animations are attached by usePage() after the page renders.
export default function Partner() {
  const ref = usePage('partner');
  return (
    <div ref={ref} className="page" id="p-partner" data-page="partner">
      <section>
        <div className="wrap">
          <div className="hero3d">
            <div className="rise">
              <span className="crumbs">
                <Link to="/">Home</Link>
                {" / Partner Us"}
              </span>
              <p className="eyebrow" style={{ marginTop: "18px" }}>Partner with Deeraj Interiors</p>
              <h1 className="h1">
                {"Transforming spaces. "}
                <em className="hl">Empowering entrepreneurs.</em>
              </h1>
              <p className="lead">
                Grow with a factory-backed interiors brand, as a franchise owner or a business associate. This could be your experience centre.
              </p>
            </div>
            <div className="stage" id="st-partner">
              <div className="s-load">Loading 3D experience centre…</div>
              <div className="s-hint">
                <span className="live" />
                Live 3D · franchise experience centre
              </div>
            </div>
          </div>
          <nav className="subnav">
            <Link to="/partner#partner-franchise">Franchise</Link>
            <Link to="/partner#partner-associate">Business associate</Link>
          </nav>
        </div>
      </section>
      <section className="section" id="partner-franchise">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Franchise opportunity</p>
              <h2 className="h2">
                {"Join a proven leader in "}
                <span className="hl">modular interiors</span>
              </h2>
              <p className="lead">Factory-precision manufacturing, design and structured execution in a scalable franchise model.</p>
            </div>
          </div>
          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <div className="card">
                <h3>Proven, low-risk model</h3>
                <p>Established systems and brand recognition.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <h3>Multiple revenue streams</h3>
                <p>Residential, commercial, builder projects and renovations.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <h3>End-to-end support</h3>
                <p>Showroom setup, training, marketing and procurement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section walnut">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">{"Investment & returns"}</p>
              <h2 className="h2">
                {"Clear numbers, "}
                <span className="hl">strong potential</span>
              </h2>
            </div>
            <a className="btn btn-light" href="https://wa.me/919000700930">Get the investment summary</a>
          </div>
          <div className="stats">
            <div className="stat">
              <b>1,000–2,500</b>
              <span>sq.ft store size</span>
            </div>
            <div className="stat">
              <b>₹25–35L</b>
              <span>Capital investment</span>
            </div>
            <div className="stat">
              <b>10–12</b>
              <span>Months to break even</span>
            </div>
            <div className="stat">
              <b>
                ₹1Cr
                <i>+</i>
              </b>
              <span>Annual revenue potential</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section band" id="partner-associate">
        <div className="wrap">
          <div className="row g-4 g-lg-5 split-row" style={{ alignItems: "start" }}>
            <div className="col-lg-6 split-col">
              <div>
                <p className="eyebrow">Business associate program</p>
                <h2 className="h2">
                  {"Earn additional income with "}
                  <span className="hl">minimal time</span>
                </h2>
                <p className="lead">Use your network to bring in clients; our design and execution team does the rest. Onboarding takes 10–14 days.</p>
              </div>
            </div>
            <div className="col-lg-6 split-col">
              <div className="row g-4 row-cols-1 row-cols-md-2" style={{ gap: "14px" }}>
                <div className="col">
                  <div className="card">
                    <h3>2–3 hours a day</h3>
                    <p>Lead generation and first client meetings.</p>
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <h3>Zero inventory</h3>
                    <p>No office rent, stock or hidden fees.</p>
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <h3>~₹25K / month</h3>
                    <p>Average incentives on project closures.</p>
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <h3>Up to ₹50K bonus</h3>
                    <p>For monthly closure targets.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cta" style={{ marginTop: "56px", background: "var(--surface)" }}>
            <div>
              <h2>Ready to build your future with us?</h2>
              <p>Limited slots per territory · Full training provided</p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" to="/contact">Apply now</Link>
              <a className="btn btn-wa" href="https://wa.me/919000700930">WhatsApp our team</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
