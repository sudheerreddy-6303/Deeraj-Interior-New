import { Link } from 'react-router-dom';
import usePage from '../lib/usePage.js';
import { HeroForm } from '../components/Forms.jsx';
import HeroShowcase from '../components/HeroShowcase.jsx';
import Testimonials from '../components/Testimonials.jsx';

// Home page. Content and layout come from the Deeraj Interiors design; 3D stages and
// animations are attached by usePage() after the page renders.
export default function Home() {
  const ref = usePage('home');
  return (
    <div ref={ref} className="page" id="p-home" data-page="home">
      <HeroShowcase />
      <section className="hs-formwrap">
        <div className="wrap">
          <HeroForm layout="bar" />
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Why Deeraj</p>
              <h2 className="h2">
                {"Why homeowners "}
                <span className="hl">choose us</span>
              </h2>
            </div>
          </div>
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-4">
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20V9l6 4V9l6 4V4h8v16z" />
                    <path d="M6 17h2M11 17h2M16 17h2" />
                  </svg>
                </span>
                <h3>Our own factory</h3>
                <p>Every module is cut, edge-banded and checked in our 15,000 sq.ft Medchal factory, not outsourced.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8l-9-5-9 5v8l9 5z" />
                    <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
                  </svg>
                </span>
                <h3>See it in 3D first</h3>
                <p>A free 3D design of your home, so what you approve is exactly what gets built.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </span>
                <h3>Transparent pricing</h3>
                <p>Itemised quotes for every unit, material and finish. No hidden costs.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <h3>45 days · 5-year warranty</h3>
                <p>Clear timelines from approval to handover, backed by a 5-year warranty.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">What we design</p>
              <h2 className="h2">
                {"Every room, "}
                <span className="hl">made to measure</span>
              </h2>
            </div>
            <Link className="btn btn-outline" to="/services">All services</Link>
          </div>
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-4">
            <div className="col">
              <Link className="pcard" to="/gallery#gallery-kitchens">
                <div className="ph">
                  <img src="img/kitchen-2.jpg" alt="Modular kitchen with breakfast counter" loading="lazy" />
                </div>
                <div className="body">
                  <h3>Modular kitchens</h3>
                  <p>L, U, parallel, straight and island layouts.</p>
                  <span className="more">View in 3D →</span>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link className="pcard" to="/gallery#gallery-wardrobes">
                <div className="ph">
                  <img src="img/wardrobe-1.jpg" alt="Floor-to-ceiling wardrobe" loading="lazy" />
                </div>
                <div className="body">
                  <h3>Wardrobes</h3>
                  <p>Sliding, hinged with loft and walk-in.</p>
                  <span className="more">View in 3D →</span>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link className="pcard" to="/gallery#gallery-bedrooms">
                <div className="ph">
                  <img src="img/bedroom-3.jpg" alt="Bedroom with upholstered headboard" loading="lazy" />
                </div>
                <div className="body">
                  <h3>Bedrooms</h3>
                  <p>Master, kids and guest bedrooms.</p>
                  <span className="more">View in 3D →</span>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link className="pcard" to="/gallery#gallery-tvunits">
                <div className="ph">
                  <img src="img/living-2.jpg" alt="Marble-finish TV wall" loading="lazy" />
                </div>
                <div className="body">
                  <h3>{"Living & TV units"}</h3>
                  <p>Feature walls, consoles and display units.</p>
                  <span className="more">View in 3D →</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="h-more">
            <Link to="/services#services-office">
              <b>{"Offices & commercial"}</b>
              <span>Workspaces, clinics, colleges, showrooms</span>
            </Link>
            <Link to="/services#services-turnkey">
              <b>Turnkey projects</b>
              <span>Concept to handover, one team</span>
            </Link>
            <Link to="/services#services-renovation">
              <b>Renovation</b>
              <span>Transform without moving</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section walnut">
        <div className="wrap">
          <div className="row g-4 g-lg-5 align-items-center split-row">
            <div className="col-lg-6 split-col">
              <div>
                <p className="eyebrow">3D design studio</p>
                <h2 className="h2">
                  {"Walk through your design "}
                  <span className="hl">before we build it</span>
                </h2>
                <p className="lead">
                  Rotate 16 ready designs, watch wardrobe doors open, and try shutters, countertops and handles. Then send your exact choice to our designers.
                </p>
                <ul className="h-cats">
                  <li>
                    <Link to="/gallery#gallery-kitchens">
                      <b>Kitchens</b>
                      <span>5 layouts</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/gallery#gallery-bedrooms">
                      <b>Bedrooms</b>
                      <span>3 designs</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/gallery#gallery-wardrobes">
                      <b>Wardrobes</b>
                      <span>3 styles</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/gallery#gallery-tvunits">
                      <b>TV units</b>
                      <span>5 types</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 split-col">
              <div className="stage" id="st-home" style={{ minHeight: "500px" }}>
                <div className="s-load">Loading 3D living room…</div>
                <div className="s-hint">
                  <span className="live" />
                  Live 3D · drag to look around
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Recent work</p>
              <h2 className="h2">
                {"Real homes, "}
                <span className="hl">real families</span>
              </h2>
              <p className="lead">Every photo is a home we designed and built.</p>
            </div>
            <Link className="btn btn-outline" to="/gallery#gallery-photos">View gallery</Link>
          </div>
          <div className="h-mosaic">
            <div className="ph big">
              <img src="img/bedroom-1.jpg" alt="Master bedroom with glass wardrobe" loading="lazy" />
              <span className="cap">Master bedroom</span>
            </div>
            <div className="ph">
              <img src="img/kitchen-1.jpg" alt="White L-shaped kitchen" loading="lazy" />
              <span className="cap">L-shaped kitchen</span>
            </div>
            <div className="ph">
              <img src="img/living-1.jpg" alt="TV unit with display cabinet" loading="lazy" />
              <span className="cap">{"TV & display unit"}</span>
            </div>
            <div className="ph">
              <img src="img/wardrobe-2.jpg" alt="Sliding wardrobe with study" loading="lazy" />
              <span className="cap">{"Wardrobe & study"}</span>
            </div>
            <div className="ph">
              <img src="img/bedroom-4.jpg" alt="Bedroom with window seat" loading="lazy" />
              <span className="cap">Kids bedroom</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 className="h2">
                {"From first meeting to "}
                <span className="hl">move-in</span>
              </h2>
            </div>
            <Link className="btn btn-outline" to="/services#services-process">Our process</Link>
          </div>
          <ol className="h-steps">
            <li>
              <span>1</span>
              <b>Consultation</b>
              <p>Meet us at an experience centre or at home.</p>
            </li>
            <li>
              <span>2</span>
              <b>3D design</b>
              <p>Approve your design and itemised quote.</p>
            </li>
            <li>
              <span>3</span>
              <b>Manufacturing</b>
              <p>Built in our Medchal factory with quality checks.</p>
            </li>
            <li>
              <span>4</span>
              <b>Installation</b>
              <p>Installed and handed over in 45 days.</p>
            </li>
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Client stories</p>
              <h2 className="h2">
                {"Loved by families "}
                <span className="hl">across Hyderabad</span>
              </h2>
              <p className="lead">Real experiences from homeowners who trusted Deeraj Interiors.</p>
            </div>
            <Link className="btn btn-outline" to="/gallery#gallery-clients">Meet our clients</Link>
          </div>
          <Testimonials />
        </div>
      </section>
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <div className="h-visit">
            <div className="h-visit-head">
              <p className="eyebrow">Visit us</p>
              <h2 className="h2">See and touch every finish</h2>
              <Link className="btn btn-primary" to="/contact">Book a visit</Link>
            </div>
            <div className="h-locs">
              <div>
                <b>Suchitra Experience Center</b>
                <span>Plot 119, Suchitra Circle, Pet Basheerabad</span>
                <span className="phone">+91 90007 00930</span>
              </div>
              <div>
                <b>Nanakramguda Experience Center</b>
                <span>Pavani Encore, adj. to Nanakramguda Tollgate</span>
                <span className="phone">+91 90143 00930</span>
              </div>
              <div>
                <b>Medchal Modular Factory</b>
                <span>Pudur, 5 min from ORR Exit No. 06</span>
                <span className="phone">+91 90007 00910</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
