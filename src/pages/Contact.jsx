import usePage from '../lib/usePage.js';
import { ContactForm } from '../components/Forms.jsx';

// Contact page. Content and layout come from the Deeraj Interiors design; 3D stages and
// animations are attached by usePage() after the page renders.
export default function Contact() {
  const ref = usePage('contact');
  return (
    <div ref={ref} className="page" id="p-contact" data-page="contact">
      <section className="section" style={{ paddingTop: "56px" }}>
        <div className="wrap">
          <div className="row g-4 g-lg-5 split-row" style={{ alignItems: "start" }}>
            <div className="col-lg-6 split-col">
              <div className="rise">
                <p className="eyebrow">Contact us</p>
                <h1 className="h1">
                  {"Elevate "}
                  <em className="hl">your space</em>
                </h1>
                <p className="lead">
                  Transform your home, office, retail or hospitality space with bespoke interior design. Request a quote and we will reply on WhatsApp or email within 1–2 business days.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "28px" }}>
                  <div className="card" style={{ flexDirection: "row", alignItems: "center", padding: "18px 20px" }}>
                    <span className="ic">☎︎</span>
                    <div>
                      <b>Call or WhatsApp</b>
                      <div className="phone">+91 90007 00930</div>
                    </div>
                  </div>
                  <div className="card" style={{ flexDirection: "row", alignItems: "center", padding: "18px 20px" }}>
                    <span className="ic">@</span>
                    <div>
                      <b>Email</b>
                      <div className="phone">deerajinteriors@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 split-col">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <section className="section band">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">Visit us</p>
              <h2 className="h2">
                {"Experience centres "}
                <span className="hl">{"& factory"}</span>
              </h2>
              <p className="lead">Three places across Hyderabad. Pick one to fly to it on the map.</p>
            </div>
          </div>
          <div className="stage" id="st-contact" style={{ minHeight: "480px", marginBottom: "28px" }}>
            <div className="s-load">Loading 3D map…</div>
            <div className="s-hint">
              <span className="live" />
              Live 3D · Hyderabad (not to scale)
            </div>
            <div className="s-pick" role="group" aria-label="Choose location">
              <button type="button" data-pin="all" aria-pressed="true">All locations</button>
              <button type="button" data-pin="suchitra" aria-pressed="false">Suchitra</button>
              <button type="button" data-pin="nanak" aria-pressed="false">Nanakramguda</button>
              <button type="button" data-pin="medchal" aria-pressed="false">Medchal factory</button>
            </div>
          </div>
          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <div className="loc">
                <h3>Suchitra Experience Center</h3>
                <p>Plot 119, above Reliance Trends Footwear, Suchitra Circle, Pet Basheerabad, Hyderabad, TS 500067</p>
                <span className="phone">+91 90007 00930</span>
                <a className="btn btn-outline" href="https://maps.google.com/?q=Suchitra+Circle+Hyderabad">Get directions</a>
              </div>
            </div>
            <div className="col">
              <div className="loc">
                <h3>Nanakramguda Experience Center</h3>
                <p>1st Floor, Pavani Encore, 342/P Narsingi – Nanakramguda Service Road, adj. to Nanakramguda Tollgate, Telangana 500075</p>
                <span className="phone">+91 90143 00930</span>
                <a className="btn btn-outline" href="https://maps.google.com/?q=Pavani+Encore+Nanakramguda">Get directions</a>
              </div>
            </div>
            <div className="col">
              <div className="loc">
                <h3>Medchal Modular Factory</h3>
                <p>Pudur, Medchal, 5 minutes from ORR Exit No. 06, Hyderabad, TS 500033</p>
                <span className="phone">+91 90007 00910</span>
                <a className="btn btn-outline" href="https://maps.google.com/?q=Pudur+Medchal">Get directions</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
