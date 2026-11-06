import { Link } from 'react-router-dom';
import usePage from '../lib/usePage.js';
import { FactoryForm } from '../components/Forms.jsx';

// Factory page. Content and layout come from the Deeraj Interiors design; 3D stages and
// animations are attached by usePage() after the page renders.
export default function Factory() {
  const ref = usePage('factory');
  return (
    <div ref={ref} className="page" id="p-factory" data-page="factory">
      <section className="mf-hero">
        <div className="wrap">
          <div className="mf-hero-grid">
            <div className="rise">
              <span className="crumbs">
                <Link to="/">Home</Link>
                {" / Modular Factory"}
              </span>
              <span className="mf-badge">
                <i />
                Hyderabad’s Premier Modular Factory
              </span>
              <h1 className="mf-title">
                Precision Built.
                <em>Factory Finished.</em>
                Delivered.
              </h1>
              <p className="lead">
                Deeraj Modulars operates a 15,000+ sq.ft state-of-the-art production facility delivering precision, consistency, and premium finish for kitchens, wardrobes and bespoke furniture across Hyderabad.
              </p>
              <div className="actions" style={{ marginTop: "26px" }}>
                <Link className="btn btn-primary" to="/factory#factory-form">Book Factory Visit</Link>
                <Link className="btn btn-outline" to="/factory#factory-b2b">B2B Partnership</Link>
              </div>
              <div className="mf-hstats">
                <div>
                  <b>15K+</b>
                  <span>Sq.ft area</span>
                </div>
                <div>
                  <b>50+</b>
                  <span>Technicians</span>
                </div>
                <div>
                  <b>1000</b>
                  <span>Sets / month</span>
                </div>
                <div>
                  <b>500+</b>
                  <span>Projects done</span>
                </div>
              </div>
            </div>
            <div className="stage mf-hero-stage" id="st-assembly">
              <div className="s-load">Loading 3D assembly…</div>
              <div className="s-hint">
                <span className="live" />
                Live 3D · a module coming together
              </div>
              <div className="float-badge">
                <b>9+</b>
                <span>Process Stages</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="marquee" aria-hidden="true">
        <div className="track">
          <span>Factory-Made Quality</span>
          <span>15,000+ Sq.Ft Facility</span>
          <span>500–1000 Sets Per Month</span>
          <span>CNC Precision Cutting</span>
          <span>Edge Banding</span>
          <span>Multi-Boring</span>
          <span>Premium Laminates</span>
          <span>Hettich Hardware</span>
          <span>White-Label Support</span>
          <span>On-Time Delivery</span>
          <span>Factory-Made Quality</span>
          <span>15,000+ Sq.Ft Facility</span>
          <span>500–1000 Sets Per Month</span>
          <span>CNC Precision Cutting</span>
          <span>Edge Banding</span>
          <span>Multi-Boring</span>
          <span>Premium Laminates</span>
          <span>Hettich Hardware</span>
          <span>White-Label Support</span>
          <span>On-Time Delivery</span>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <div>
              <p className="eyebrow">Factory at a Glance</p>
              <h2 className="h2">
                {"Professional Execution "}
                <span className="hl">at Scale</span>
              </h2>
              <p className="lead">
                Our in-house facility is equipped with advanced CNC machinery, a skilled team, and a structured production workflow that ensures consistent quality at every scale.
              </p>
            </div>
          </div>
          <div className="mf-glance">
            <div className="card">
              <span className="ic">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20V9l6 4V9l6 4V4h8v16z" />
                  <path d="M6 17h2M11 17h2M16 17h2" />
                </svg>
              </span>
              <b>
                <span data-count="15000">15,000</span>
                <i>+</i>
              </b>
              <p>Sq.Ft Covered Production Area</p>
            </div>
            <div className="card">
              <span className="ic">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
                </svg>
              </span>
              <b>
                <span data-count="50">50</span>
                <i>+</i>
              </b>
              <p>{"Skilled Technicians & Supervisors"}</p>
            </div>
            <div className="card">
              <span className="ic">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8l-9-5-9 5v8l9 5z" />
                  <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
                </svg>
              </span>
              <b>
                <span data-count="1000">1000</span>
              </b>
              <p>Modular Sets Per Month</p>
            </div>
            <div className="card">
              <span className="ic">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
                </svg>
              </span>
              <b>
                <span data-count="9">9</span>
              </b>
              <p>Advanced Machinery Stages</p>
            </div>
            <div className="card">
              <span className="ic">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
                  <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
                </svg>
              </span>
              <b>
                <span data-count="500">500</span>
                <i>+</i>
              </b>
              <p>Projects Delivered</p>
            </div>
          </div>
          <div className="mf-strip">
            <figure className="ph">
              <img src="img/kitchen-1.jpg" alt="Modular kitchen by Deeraj Interiors" loading="lazy" />
              <figcaption>Modular Kitchen</figcaption>
            </figure>
            <figure className="ph">
              <img src="img/wardrobe-1.jpg" alt="Wardrobe by Deeraj Interiors" loading="lazy" />
              <figcaption>Wardrobe Design</figcaption>
            </figure>
            <figure className="ph ph-empty">
              <span className="tag">Photo needed: factory floor</span>
              <figcaption>Factory Floor</figcaption>
            </figure>
            <figure className="ph">
              <img src="img/living-2.jpg" alt="Living space by Deeraj Interiors" loading="lazy" />
              <figcaption>Living Spaces</figcaption>
            </figure>
            <figure className="ph mf-finishes" aria-label="Surface finishes">
              <span style={{ background: "#f2efe9" }} />
              <span style={{ background: "repeating-linear-gradient(90deg,#6a4329 0 3px,#7d5235 3px 5px,#5b3820 5px 8px)" }} />
              <span style={{ background: "#8c9b87" }} />
              <span style={{ background: "#3b3a3c" }} />
              <figcaption>Surface Finishes</figcaption>
            </figure>
            <figure className="ph">
              <img src="img/bedroom-1.jpg" alt="Bedroom interior by Deeraj Interiors" loading="lazy" />
              <figcaption>Bedroom Interiors</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section walnut">
        <div className="wrap">
          <div className="row g-4 g-lg-5 align-items-center split-row">
            <div className="col-lg-6 split-col">
              <div className="mf-collage">
                <div className="ph big">
                  <img src="img/kitchen-2.jpg" alt="Factory-made modular kitchen" loading="lazy" />
                </div>
                <div className="ph">
                  <img src="img/wardrobe-2.jpg" alt="Factory-finished sliding wardrobe" loading="lazy" />
                </div>
                <div className="ph">
                  <img src="img/bedroom-3.jpg" alt="Factory-finished bedroom panels" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 split-col">
              <div>
                <p className="eyebrow">Why Factory-Based</p>
                <h2 className="h2">
                  {"Superior Results from "}
                  <span className="hl">Controlled Production</span>
                </h2>
                <p className="lead">
                  Every panel, edge, and fitting meets our strict quality benchmarks before leaving the factory floor — no shortcuts, no surprises on-site.
                </p>
                <ul className="mf-why">
                  <li>
                    <span className="ic">
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z" />
                      </svg>
                    </span>
                    <div>
                      <b>Perfect Finishing</b>
                      <p>Uniform edge banding and panel alignment across every single unit — no variation.</p>
                    </div>
                  </li>
                  <li>
                    <span className="ic">
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
                      </svg>
                    </span>
                    <div>
                      <b>Faster Handover</b>
                      <p>Pre-built modules drastically reduce on-site installation time and mess.</p>
                    </div>
                  </li>
                  <li>
                    <span className="ic">
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <div>
                      <b>Higher Durability</b>
                      <p>Stronger joints and controlled assembly conditions ensure years of performance.</p>
                    </div>
                  </li>
                  <li>
                    <span className="ic">
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                    </span>
                    <div>
                      <b>Quality Assurance</b>
                      <p>Multiple-stage inspection at every step before any module is dispatched.</p>
                    </div>
                  </li>
                  <li>
                    <span className="ic">
                      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22a10 10 0 1 1 10-10c0 3-2.5 4-4.5 4H16a2 2 0 0 0-1.5 3.3c.4.5.5 1 .5 1.5 0 .8-1 1.2-3 1.2z" />
                        <circle cx="7.5" cy="10.5" r="1" />
                        <circle cx="12" cy="7.5" r="1" />
                        <circle cx="16.5" cy="10.5" r="1" />
                      </svg>
                    </span>
                    <div>
                      <b>Full Customization</b>
                      <p>Built precisely to your layout, storage needs, and finish preferences.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="factory-workflow">
        <div className="wrap">
          <div className="sec-head center">
            <div>
              <p className="eyebrow">Manufacturing Workflow</p>
              <h2 className="h2">
                {"9-Stage Precision "}
                <span className="hl">Production Process</span>
              </h2>
              <p className="lead">From design to site-ready installation — every stage engineered for accuracy.</p>
            </div>
          </div>
          <div className="mf-steps" id="flow">
            <div className="card">
              <small>01</small>
              <h3>{"Design & Cutlist"}</h3>
              <p>{"2D layouts, 3D visualizations, material & hardware specs prepared and converted to CNC-readable data."}</p>
              <span className="mf-tags">
                <i>2D Layout</i>
                <i>3D Viz</i>
                <i>CNC Data</i>
              </span>
            </div>
            <div className="card">
              <small>02</small>
              <h3>CNC Panel Cutting</h3>
              <p>Plywood, MDF, HDHMR boards precision-cut using CNC panel saws for perfect dimensional accuracy.</p>
              <span className="mf-tags">
                <i>Panel Saw</i>
                <i>Nesting</i>
                <i>Batch</i>
              </span>
            </div>
            <div className="card">
              <small>03</small>
              <h3>Laminate Pressing</h3>
              <p>{"Decorative laminates pressed using hot press, cold press & vacuum membrane for bubble-free finish."}</p>
              <span className="mf-tags">
                <i>Hot Press</i>
                <i>Cold Press</i>
                <i>Vacuum</i>
              </span>
            </div>
            <div className="card">
              <small>04</small>
              <h3>Edge Banding</h3>
              <p>Exposed board edges sealed with premium PVC/ABS tape for moisture protection and superior aesthetics.</p>
              <span className="mf-tags">
                <i>PVC</i>
                <i>ABS</i>
                <i>Moisture Proof</i>
              </span>
            </div>
            <div className="card">
              <small>05</small>
              <h3>{"Multi-Boring & Drilling"}</h3>
              <p>Precision holes drilled for hinges, drawer channels, connectors, shelf supports and assembly fittings.</p>
              <span className="mf-tags">
                <i>Hinges</i>
                <i>Drawers</i>
                <i>Connectors</i>
              </span>
            </div>
            <div className="card">
              <small>06</small>
              <h3>CNC Routing</h3>
              <p>Decorative cutting, slotting, grooving, handle profiles and custom design patterns executed precisely.</p>
              <span className="mf-tags">
                <i>Routing</i>
                <i>Grooving</i>
                <i>Profiles</i>
              </span>
            </div>
            <div className="card">
              <small>07</small>
              <h3>{"Assembly & QC"}</h3>
              <p>Modules assembled to verify structural strength, alignment, hardware fitting and finish quality before dispatch.</p>
              <span className="mf-tags">
                <i>Strength</i>
                <i>Alignment</i>
                <i>Hardware QC</i>
              </span>
            </div>
            <div className="card">
              <small>08</small>
              <h3>{"Packing & Logistics"}</h3>
              <p>Each panel packed with protective foam, edge protectors, moisture-resistant wrap and label identification.</p>
              <span className="mf-tags">
                <i>Foam</i>
                <i>Edge Guards</i>
                <i>Labels</i>
              </span>
            </div>
            <div className="card">
              <small>09</small>
              <h3>Site Installation</h3>
              <p>On-site team handles module fitting, door alignment, drawer installation and final cleaning.</p>
              <span className="mf-tags">
                <i>Fitting</i>
                <i>Alignment</i>
                <i>Finishing</i>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section band" id="factory-projects">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Our Work</p>
              <h2 className="h2">
                {"Projects That "}
                <span className="hl">Speak Quality</span>
              </h2>
            </div>
            <Link className="btn btn-primary" to="/factory#factory-form">Discuss Your Project →</Link>
          </div>
          <div className="mf-show">
            <figure className="ph big">
              <img src="img/kitchen-2.jpg" alt="Premium modular kitchen" loading="lazy" />
              <figcaption>
                <span>Modular Kitchen</span>
                <b>Premium Kitchen Suite</b>
              </figcaption>
            </figure>
            <figure className="ph">
              <img src="img/wardrobe-2.jpg" alt="Full-wall wardrobe" loading="lazy" />
              <figcaption>
                <span>Wardrobe</span>
                <b>Full-Wall Wardrobe</b>
              </figcaption>
            </figure>
            <figure className="ph">
              <img src="img/living-1.jpg" alt="Bespoke living room" loading="lazy" />
              <figcaption>
                <span>Living Interiors</span>
                <b>Bespoke Living Room</b>
              </figcaption>
            </figure>
            <figure className="ph">
              <img src="img/kitchen-1.jpg" alt="Premium acrylic finish kitchen" loading="lazy" />
              <figcaption>
                <span>Surface Finishes</span>
                <b>Premium Acrylic Finish</b>
              </figcaption>
            </figure>
            <figure className="ph">
              <img src="img/bedroom-1.jpg" alt="Master bedroom suite" loading="lazy" />
              <figcaption>
                <span>Bedroom Interiors</span>
                <b>Master Bedroom Suite</b>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section" id="factory-materials">
        <div className="wrap">
          <div className="row g-4 g-lg-5 split-row" style={{ alignItems: "start" }}>
            <div className="col-lg-6 split-col">
              <div>
                <p className="eyebrow">{"Materials & Finishes"}</p>
                <h2 className="h2">
                  {"Premium Materials. "}
                  <span className="hl">Reliable Hardware.</span>
                </h2>
                <p className="lead">
                  Carefully curated material and finish combinations based on budget, performance, and design requirements — ensuring lasting beauty with every module.
                </p>
                <Link className="btn btn-outline" style={{ marginTop: "24px" }} to="/factory#factory-studio">Try finishes in 3D</Link>
              </div>
            </div>
            <div className="col-lg-6 split-col">
              <div className="mf-mats">
                <div className="mf-mat">
                  <span className="mf-sw" style={{ background: "repeating-linear-gradient(0deg,#d8b88c 0 4px,#c9a77a 4px 7px,#b8946a 7px 9px)" }} />
                  <div>
                    <b>BWP / Best Plywood</b>
                    <p>Boiling water-proof calibrated plywood — superior moisture resistance and structural strength.</p>
                  </div>
                </div>
                <div className="mf-mat">
                  <span className="mf-sw" style={{ background: "linear-gradient(135deg,#8a6f58,#b9a68e)" }} />
                  <div>
                    <b>Decorative Laminates</b>
                    <p>Wide range of textures and colours for stylish, durable surface finishes.</p>
                  </div>
                </div>
                <div className="mf-mat">
                  <span className="mf-sw" style={{ background: "radial-gradient(circle at 30% 25%,#fff 0 12%,#f2efe9 30%,#d8d1c6)" }} />
                  <div>
                    <b>Acrylic High-Gloss</b>
                    <p>Premium acrylic for a sleek, modern look with easy-clean maintenance.</p>
                  </div>
                </div>
                <div className="mf-mat">
                  <span className="mf-sw" style={{ background: "#6f7d72" }} />
                  <div>
                    <b>PU Coating</b>
                    <p>Polyurethane finish for a smooth, scratch-resistant, long-lasting surface.</p>
                  </div>
                </div>
                <div className="mf-mat">
                  <span className="mf-sw" style={{ background: "repeating-linear-gradient(90deg,#7a4b2a 0 3px,#8d5a35 3px 6px,#6a3f22 6px 8px)" }} />
                  <div>
                    <b>Natural Wood Veneers</b>
                    <p>Real wood veneers for an organic, luxury aesthetic in premium projects.</p>
                  </div>
                </div>
                <div className="mf-mat">
                  <span className="mf-sw" style={{ background: "linear-gradient(135deg,#e6e9ec,#9aa1a8 55%,#d5d8dc)" }} />
                  <div>
                    <b>Hettich / Hafele Hardware</b>
                    <p>Branded hardware ensuring smooth, silent, long-term operation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section band" style={{ paddingTop: "88px" }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">3D kitchen studio</p>
              <h2 className="h2">
                {"Try these finishes "}
                <span className="hl">on a kitchen in 3D</span>
              </h2>
              <p className="lead">Pick shutters, countertops and handles, then send the exact combination to our team for a quote.</p>
            </div>
          </div>
          <div className="studio" id="factory-studio">
            <div className="stage" id="st-factory" data-scene="kitchen" data-config="1">
              <div className="s-load">Loading 3D kitchen…</div>
              <div className="s-hint">
                <span className="live" />
                Drag to rotate · scroll or pinch to zoom
              </div>
              <div className="s-ctl" role="group" aria-label="Camera view">
                <button type="button" data-view="corner" aria-pressed="true">Corner</button>
                <button type="button" data-view="front" aria-pressed="false">Front</button>
                <button type="button" data-view="top" aria-pressed="false">Top</button>
              </div>
              <button type="button" className="s-led" aria-pressed="true">
                <span className="sw" />
                Under-cabinet LED
              </button>
            </div>
            <aside className="panel" aria-label="Choose finishes">
              <div className="grp">
                <h3>Ready looks</h3>
                <div className="looks" id="g-looks" />
              </div>
              <div className="grp">
                <h3>
                  {"Base shutters "}
                  <span id="lb-base" />
                </h3>
                <div className="sws" id="g-base" />
              </div>
              <div className="grp">
                <h3>
                  {"Upper shutters "}
                  <span id="lb-upper" />
                </h3>
                <div className="sws" id="g-upper" />
              </div>
              <div className="grp">
                <h3>
                  {"Countertop "}
                  <span id="lb-counter" />
                </h3>
                <div className="sws c3" id="g-counter" />
              </div>
              <div className="grp">
                <h3>
                  {"Handles "}
                  <span id="lb-handle" />
                </h3>
                <div className="sws c3" id="g-handle" />
              </div>
              <div className="sum">
                <dl>
                  <dt>Layout</dt>
                  <dd>L-shaped, 2.7 m × 2.7 m</dd>
                  <dt>Carcass</dt>
                  <dd>BWP plywood</dd>
                  <dt>Hardware</dt>
                  <dd>Hettich / Hafele</dd>
                  <dt>Delivery</dt>
                  <dd>45 days</dd>
                </dl>
                <a className="btn btn-primary" id="quote" href="https://wa.me/919000700930">Get this kitchen quoted</a>
                <p className="note">
                  Sends your chosen finishes to +91 90007 00930 on WhatsApp. Demo model; your designer’s 3D file of your home can replace it.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className="section walnut" id="factory-b2b">
        <div className="wrap">
          <div className="row g-4 g-lg-5 align-items-center split-row">
            <div className="col-lg-6 split-col">
              <div className="ph" style={{ aspectRatio: "4/3.2" }}>
                <img src="img/living-2.jpg" alt="Interior executed by Deeraj Interiors as a B2B partner" loading="lazy" />
              </div>
            </div>
            <div className="col-lg-6 split-col">
              <div>
                <p className="eyebrow">B2B Collaboration</p>
                <h2 className="h2">
                  {"Execution Partner for "}
                  <span className="hl">{"Architects & Builders"}</span>
                </h2>
                <p className="lead">
                  We support architects, interior designers, and builders as a reliable execution and modular manufacturing partner — ensuring your designs are brought to life with precision, consistency, and timely delivery.
                </p>
                <div className="actions" style={{ marginTop: "26px" }}>
                  <Link className="btn btn-primary" to="/factory#factory-form">Partner With Us</Link>
                  <a className="btn btn-wa" href="https://wa.me/919000700930">WhatsApp Us</a>
                </div>
              </div>
            </div>
          </div>
          <h3 className="mf-sub">Why Partner With Us</h3>
          <div className="mf-feats">
            <div className="card">
              <h3>Factory Production</h3>
              <p>Consistent quality from controlled factory environment.</p>
            </div>
            <div className="card">
              <h3>Per-Drawing Accuracy</h3>
              <p>Designs executed exactly as specified — zero deviation.</p>
            </div>
            <div className="card">
              <h3>Bulk Project Handling</h3>
              <p>Scaled capacity for large apartment complexes.</p>
            </div>
            <div className="card">
              <h3>Clean Site Installation</h3>
              <p>Minimal mess, professional finish every time.</p>
            </div>
            <div className="card">
              <h3>Dedicated Coordination</h3>
              <p>Single point of contact for your entire project.</p>
            </div>
            <div className="card">
              <h3>White-Label Support</h3>
              <p>Execute seamlessly under your brand name.</p>
            </div>
            <div className="card">
              <h3>Timeline Discipline</h3>
              <p>On-time delivery with clear milestone tracking.</p>
            </div>
            <div className="card">
              <h3>Transparent Costing</h3>
              <p>No hidden charges. Clear itemized pricing always.</p>
            </div>
          </div>
          <h3 className="mf-sub">Who We Work With</h3>
          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <article className="mf-ideal">
                <div className="ph">
                  <img src="img/bedroom-3.jpg" alt="Project for architects" loading="lazy" />
                </div>
                <div className="mf-ideal-b">
                  <h4>For Architects</h4>
                  <ul className="ticks">
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Protect design intent throughout
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Technical detailing support
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      White-label execution available
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      No micromanagement needed
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Precision as per your drawings
                    </li>
                  </ul>
                </div>
              </article>
            </div>
            <div className="col">
              <article className="mf-ideal">
                <div className="ph">
                  <img src="img/wardrobe-1.jpg" alt="Project for interior designers" loading="lazy" />
                </div>
                <div className="mf-ideal-b">
                  <h4>For Interior Designers</h4>
                  <ul className="ticks">
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Clean factory finish every time
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Custom modular solutions
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Respect for creative concepts
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {"Any material & finish combination"}
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Professional handover experience
                    </li>
                  </ul>
                </div>
              </article>
            </div>
            <div className="col">
              <article className="mf-ideal">
                <div className="ph">
                  <img src="img/kitchen-1.jpg" alt="Project for builders" loading="lazy" />
                </div>
                <div className="mf-ideal-b">
                  <h4>For Builders</h4>
                  <ul className="ticks">
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Bulk unit production at scale
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      On-time delivery for apartments
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Standardized quality across all flats
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Dedicated project team assigned
                    </li>
                    <li>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Milestone-based execution plan
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="mf-banner">
        <div className="wrap">
          <div className="mf-banner-in">
            <span className="mf-big" aria-hidden="true">15,000+</span>
            <div>
              <h2>
                {"15,000+ Sq.Ft of "}
                <em>Pure</em>
                {" Manufacturing Power"}
              </h2>
              <p>
                Visit our factory and experience the difference in build quality — advanced CNC machinery, skilled 50+ member teams, and zero-compromise quality checks at every stage.
              </p>
              <div className="actions">
                <Link className="btn btn-light" to="/factory#factory-form">Book a Factory Visit</Link>
                <span className="mf-call">
                  {"Call now · "}
                  <span className="phone">+91 90007 00930</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="row g-4 g-lg-5 align-items-center split-row">
            <div className="col-lg-6 split-col">
              <div className="mf-collage">
                <div className="ph big">
                  <img src="img/bedroom-1.jpg" alt="Deeraj Interiors home interior" loading="lazy" />
                </div>
                <div className="ph">
                  <img src="img/kitchen-2.jpg" alt="Kitchen installation by Deeraj Modulars" loading="lazy" />
                </div>
                <div className="ph">
                  <img src="img/living-1.jpg" alt="Living room by Deeraj Modulars" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 split-col">
              <div>
                <p className="eyebrow">About Us</p>
                <h2 className="h2">
                  {"Deeraj Interiors / "}
                  <span className="hl">Deeraj Modulars</span>
                </h2>
                <p className="lead">
                  A Hyderabad-based modular manufacturing and interior execution company committed to delivering precision-built, factory-finished interior solutions from our 15,000+ sq.ft in-house facility and Experience Center at Kompally.
                </p>
                <p className="muted" style={{ marginTop: "14px" }}>
                  {"Specializing in Modular Kitchens, Wardrobes, Bespoke Furniture, Commercial Interiors, Corporate Offices, and complete Home Décor & Furnishing Solutions."}
                </p>
                <div className="mf-mission">
                  <p className="eyebrow">Our Mission</p>
                  <p>
                    100+ quality projects annually · 5 experience centers each year · 100+ happy customers — built on trust, quality, and total transparency.
                  </p>
                </div>
                <ul className="mf-pts">
                  <li>In-house modular manufacturing facility</li>
                  <li>Structured project management approach</li>
                  <li>Dedicated coordination team</li>
                  <li>Clean site installation process</li>
                  <li>{"Support for architects, designers & builders"}</li>
                  <li>Experience Center — live material selection</li>
                  <li>{"Transparent costing & milestone-based execution"}</li>
                  <li>After-sales support and service commitment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Our Leadership</p>
              <h2 className="h2">
                {"The "}
                <span className="hl">People</span>
                {" Behind the Quality"}
              </h2>
            </div>
          </div>
          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <article className="mf-team">
                <img src="img/team-shanthi.jpg" alt="Ms. Shanthi" loading="lazy" />
                <div>
                  <h3>Ms. Shanthi</h3>
                  <span className="role">{"Founder & Managing Director"}</span>
                  <p>
                    Leads Deeraj Interiors with a strong focus on structured operations, customer experience, and long-term brand development — building a professionally managed modular manufacturing ecosystem.
                  </p>
                </div>
              </article>
            </div>
            <div className="col">
              <article className="mf-team">
                <span className="mf-av">S</span>
                <div>
                  <h3>Mr. Sunder</h3>
                  <span className="role">Director – Operations | Sales | Execution</span>
                  <p>
                    Drives sales growth while overseeing factory production, project execution, and quality control. Ensures timelines, finishing standards, and customer satisfaction are consistently delivered.
                  </p>
                </div>
              </article>
            </div>
            <div className="col">
              <article className="mf-team">
                <img src="img/team-seshagiri.jpg" alt="Mr. Seshagiri Raju" loading="lazy" />
                <div>
                  <h3>Mr. Seshagiri Raju</h3>
                  <span className="role">{"Advisory Director – Strategy & Expansion"}</span>
                  <p>
                    Supports strategic planning, business expansion, and sales enhancement. Focuses on growth planning, operational scalability, factory process improvement, and market positioning.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="mf-cta">
            <h2>Let’s Build Better Spaces Together.</h2>
            <p>
              Visit our factory — experience the difference firsthand.
              <br />
              Book a factory visit or schedule a collaboration meeting today.
            </p>
            <div className="actions">
              <Link className="btn btn-light" to="/partner#partner-associate">Become a Business Associate</Link>
              <Link className="btn btn-ghost" to="/factory#factory-form">Schedule Collaboration</Link>
              <a className="btn btn-wa" href="https://wa.me/919000700930">WhatsApp</a>
            </div>
            <p className="mf-cta-call">
              {"Call now · "}
              <span className="phone">+91 90007 00930</span>
            </p>
          </div>
        </div>
      </section>
      <section className="section" id="factory-form" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <div className="mf-form-wrap">
            <div className="mf-form-info">
              <p className="eyebrow">Partner With Us</p>
              <h2 className="h2">
                {"Request "}
                <span className="hl">Collaboration</span>
              </h2>
              <p className="lead">
                Whether you’re an architect, builder, or interior designer — our team will reach out within 24 hours to discuss your project requirements.
              </p>
              <ul className="mf-contacts">
                <li>
                  <span className="ic">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  Experience Center, Kompally, Hyderabad
                </li>
                <li>
                  <span className="ic">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                    </svg>
                  </span>
                  <span className="phone">+91 90007 00930</span>
                </li>
                <li>
                  <span className="ic">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
                    </svg>
                  </span>
                  {"WhatsApp: "}
                  <span className="phone">+91 90007 00930</span>
                </li>
                <li>
                  <span className="ic">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                  </span>
                  <span className="phone">deerajinteriors@gmail.com</span>
                </li>
              </ul>
            </div>
            <FactoryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
