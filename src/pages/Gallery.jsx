import usePage from '../lib/usePage.js';
import { FilterTabs, PhotoGrid } from '../components/Lists.jsx';

// Gallery page. Content and layout come from the Deeraj Interiors design; 3D stages and
// animations are attached by usePage() after the page renders.
export default function Gallery() {
  const ref = usePage('gallery');
  return (
    <div ref={ref} className="page" id="p-gallery" data-page="gallery">
      <section className="section" style={{ paddingTop: "56px" }} id="gallery-viewer">
        <div className="wrap">
          <span id="gallery-kitchens" />
          <span id="gallery-bedrooms" />
          <span id="gallery-wardrobes" />
          <span id="gallery-tvunits" />
          <div className="sec-head rise">
            <div>
              <p className="eyebrow">3D design studio</p>
              <h1 className="h1">
                {"Explore every design "}
                <em className="hl">in 3D</em>
              </h1>
              <p className="lead">
                5 kitchen layouts, 3 bedrooms, 3 wardrobe styles and 5 TV units. Pick a type, try your finishes, then send your choice for a quote.
              </p>
            </div>
            <div className="rooms" role="group" aria-label="Design category">
              <button type="button" data-cat="kitchen" aria-pressed="true">Kitchens</button>
              <button type="button" data-cat="bedroom" aria-pressed="false">Bedrooms</button>
              <button type="button" data-cat="wardrobe" aria-pressed="false">Wardrobes</button>
              <button type="button" data-cat="tv" aria-pressed="false">TV units</button>
            </div>
          </div>
          <div className="studio">
            <div className="stage" id="st-gallery">
              <div className="s-load">Loading 3D design…</div>
              <div className="s-hint">
                <span className="live" />
                <span id="d-name">L-shaped</span>
                {" · drag to rotate"}
              </div>
              <div className="s-ctl" role="group" aria-label="Camera view">
                <button type="button" data-view="corner" aria-pressed="true">Corner</button>
                <button type="button" data-view="front" aria-pressed="false">Front</button>
                <button type="button" data-view="top" aria-pressed="false">Top</button>
              </div>
            </div>
            <aside className="panel" aria-label="Design options">
              <div className="grp">
                <h3>Type</h3>
                <div className="types" id="d-types" />
              </div>
              <div className="grp">
                <h3>Ready looks</h3>
                <div className="looks" id="d-looks" />
              </div>
              <div className="grp">
                <h3>
                  {"Shutters "}
                  <span id="d-lb-base" />
                </h3>
                <div className="sws" id="d-base" />
              </div>
              <div className="grp">
                <h3>
                  <span id="d-upper-label" style={{ letterSpacing: ".12em", textTransform: "uppercase", fontSize: "12px", color: "var(--muted)" }}>
                    Upper shutters
                  </span>
                  {' '}
                  <span id="d-lb-upper" />
                </h3>
                <div className="sws" id="d-upper" />
              </div>
              <div className="grp" id="d-counter-grp">
                <h3>
                  <span id="d-counter-label" style={{ letterSpacing: ".12em", textTransform: "uppercase", fontSize: "12px", color: "var(--muted)" }}>
                    Countertop
                  </span>
                  {' '}
                  <span id="d-lb-counter" />
                </h3>
                <div className="sws c3" id="d-counter" />
              </div>
              <div className="grp">
                <h3>
                  {"Handles "}
                  <span id="d-lb-handle" />
                </h3>
                <div className="sws c3" id="d-handle" />
              </div>
              <div className="sum">
                <p id="d-desc" style={{ margin: "0", fontSize: "14px" }} />
                <dl>
                  <dt>Size</dt>
                  <dd id="d-size" />
                  <dt>Carcass</dt>
                  <dd>BWP plywood</dd>
                  <dt>Delivery</dt>
                  <dd>45 days</dd>
                </dl>
                <a className="btn btn-primary" id="d-quote" href="https://wa.me/919000700930">Get this design quoted</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className="section band" style={{ paddingTop: "80px" }} id="gallery-photos">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Types of interiors</p>
              <h2 className="h2">Real Deeraj homes</h2>
            </div>
            <FilterTabs group="photos" />
          </div>
          <PhotoGrid />
        </div>
      </section>
      <section className="section" id="gallery-clients">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Our customers</p>
              <h2 className="h2">
                {"Our "}
                <span className="hl">happy clients</span>
              </h2>
            </div>
          </div>
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))" }}>
            <div className="col">
              <div className="client">
                <span className="av">AR</span>
                <b>Mr. Anvesh Reddy</b>
                <span>Alwal, Hyderabad</span>
              </div>
            </div>
            <div className="col">
              <div className="client">
                <span className="av">SK</span>
                <b>Dr. Sunil Kumar</b>
                <span>4BHK home</span>
              </div>
            </div>
            <div className="col">
              <div className="client">
                <span className="av">S</span>
                <b>Mr. Sudhakar</b>
                <span>Full home interiors</span>
              </div>
            </div>
            <div className="col">
              <div className="client">
                <span className="av">K</span>
                <b>Mrs. Kalpana</b>
                <span>Madhapur, Hyderabad</span>
              </div>
            </div>
            <div className="col">
              <div className="client">
                <span className="av">SR</span>
                <b>Mr. Sridhar Reddy</b>
                <span>Trividya College</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
