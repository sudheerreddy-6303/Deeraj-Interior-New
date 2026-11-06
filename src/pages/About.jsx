import { Link } from 'react-router-dom';
import usePage from '../lib/usePage.js';

// About page. Content and layout come from the Deeraj Interiors design; 3D stages and
// animations are attached by usePage() after the page renders.
export default function About() {
  const ref = usePage('about');
  return (
    <div ref={ref} className="page" id="p-about" data-page="about">
      <section className="ab2-hero">
        <div className="wrap">
          <div className="ab2-hero-grid">
            <div className="rise">
              <span className="crumbs">
                <Link to="/">Home</Link>
                {" / About Us"}
              </span>
              <p className="eyebrow" style={{ marginTop: "18px" }}>Established Excellence · Hyderabad</p>
              <h1 className="ab2-title">About Deeraj Interiors</h1>
              <p className="ab2-sub">Precision Design Experts</p>
              <div className="actions" style={{ marginTop: "30px" }}>
                <Link className="btn btn-primary" to="/contact">Inquire About Your Project</Link>
                <Link className="btn btn-ghost" to="/about#about-team">Meet the team</Link>
              </div>
            </div>
            <div className="stage" id="st-about">
              <div className="s-load">Loading 3D wardrobe…</div>
              <div className="s-hint">
                <span className="live" />
                Live 3D · built panel by panel
              </div>
            </div>
          </div>
          <div className="ab2-stats">
            <div>
              <b data-count="15000">15,000</b>
              <span>sq.ft Modular Factory</span>
            </div>
            <div>
              <b>
                <span data-count="250">250</span>
                +
              </b>
              <span>Happy Customers</span>
            </div>
            <div>
              <b>
                <span data-count="140">140</span>
                +
              </b>
              <span>Projects Execution</span>
            </div>
            <div>
              <b data-count="140000">1,40,000</b>
              <span>SFT Work Execution</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section ab2-statement" id="about-story">
        <div className="wrap">
          <span className="ab2-since">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            Since 2024
          </span>
          <h2 className="ab2-st-title">
            {"Interior Designers in Hyderabad Bridging "}
            <em>Vision</em>
            {" and "}
            <em>Reality</em>
            .
          </h2>
          <p className="ab2-st-lead">
            Deeraj Interiors is a leading interior design company in Hyderabad. We deliver modular kitchens, wardrobes, office interiors, and complete turnkey solutions with precision manufacturing.
          </p>
          <div className="ab2-strip">
            <figure className="ph">
              <img src="img/kitchen-2.jpg" alt="Modular kitchen by Deeraj Interiors" loading="lazy" />
              <figcaption>Modular kitchens</figcaption>
            </figure>
            <figure className="ph">
              <img src="img/wardrobe-2.jpg" alt="Sliding wardrobe by Deeraj Interiors" loading="lazy" />
              <figcaption>Wardrobes</figcaption>
            </figure>
            <figure className="ph">
              <img src="img/bedroom-1.jpg" alt="Bedroom interior by Deeraj Interiors" loading="lazy" />
              <figcaption>Turnkey homes</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section band" style={{ paddingTop: "88px" }}>
        <div className="wrap">
          <div className="ab2-vm">
            <article className="ab2-tile vision">
              <span className="ab2-ic">
                <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <h3>The Vision</h3>
              <p>To become the definitive execution partner for architects and developers across Telangana.</p>
            </article>
            <article className="ab2-tile mission">
              <span className="ab2-ic">
                <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1" />
                </svg>
              </span>
              <h3>The Mission</h3>
              <p>To scale craftsmanship and deliver 100+ quality-controlled projects annually.</p>
            </article>
          </div>
          <div className="ab2-visit">
            <span className="ab2-pin">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <span>
              <small>Experience Center</small>
              <b>Kompally</b>
            </span>
            <Link className="btn btn-outline" to="/contact">Plan a visit</Link>
          </div>
        </div>
      </section>
      <section className="section" id="about-team">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">The Visionaries</p>
              <h2 className="h2">Leadership Team</h2>
            </div>
          </div>
          <div className="ab2-team">
            <div className="ab2-tabs" role="tablist" aria-label="Leadership team" aria-orientation="vertical">
              <button type="button" role="tab" id="lt-1" aria-selected="true" aria-controls="lp-1" tabIndex="0">
                <img src="img/team-shanthi.jpg" alt="" />
                <span>
                  <b>Ms. Shanthi</b>
                  <small>{"Founder & Managing Director"}</small>
                </span>
              </button>
              <button type="button" role="tab" id="lt-2" aria-selected="false" aria-controls="lp-2" tabIndex="-1">
                <span className="ab2-av">S</span>
                <span>
                  <b>Mr. Sunder</b>
                  <small>Director – Operations | Sales | Execution</small>
                </span>
              </button>
              <button type="button" role="tab" id="lt-3" aria-selected="false" aria-controls="lp-3" tabIndex="-1">
                <img src="img/team-seshagiri.jpg" alt="" />
                <span>
                  <b>Mr. Seshagiri Raju</b>
                  <small>{"CEO & Co-Founder"}</small>
                </span>
              </button>
            </div>
            <div className="ab2-panels">
              <article className="ab2-panel" role="tabpanel" id="lp-1" aria-labelledby="lt-1" tabIndex="0">
                <div className="ab2-photo">
                  <img src="img/team-shanthi.jpg" alt="Ms. Shanthi, Founder and Managing Director of Deeraj Interiors" />
                </div>
                <div className="ab2-ptext">
                  <span className="role">{"Founder & Managing Director"}</span>
                  <h3>Ms. Shanthi</h3>
                  <p>
                    Ms. Shanthi’s leadership at Deeraj Interiors is defined by a commitment to operational rigor. By integrating advanced modular manufacturing processes, she has successfully bridged the gap between creative design and industrial efficiency. This focus on structured operations allows the firm to deliver consistent, high-quality results while scaling sustainably. Her dedication to customer-centric growth ensures that as Deeraj Interiors expands, the core promise of quality and professional management remains uncompromised.
                  </p>
                </div>
              </article>
              <article className="ab2-panel" role="tabpanel" id="lp-2" aria-labelledby="lt-2" tabIndex="0" hidden>
                <div className="ab2-photo ph-empty">
                  <span className="tag">Photo needed</span>
                </div>
                <div className="ab2-ptext">
                  <span className="role">Director – Operations | Sales | Execution</span>
                  <h3>Mr. Sunder</h3>
                  <p>
                    Mr. Sunder serves as the operational backbone of the organization, seamlessly bridging the gap between market demand and technical execution. By overseeing the entire lifecycle of a project—from the initial sales strategy to the final quality audit—he ensures that the company’s promise of excellence is realized in every square foot produced. His unique dual-focus on sales growth and factory production allows for a highly responsive manufacturing process that adapts to client needs without ever compromising on industrial precision or project timelines.
                  </p>
                </div>
              </article>
              <article className="ab2-panel" role="tabpanel" id="lp-3" aria-labelledby="lt-3" tabIndex="0" hidden>
                <div className="ab2-photo">
                  <img src="img/team-seshagiri.jpg" alt="Mr. Seshagiri Raju, CEO and Co-Founder of Deeraj Interiors" />
                </div>
                <div className="ab2-ptext">
                  <span className="role">{"CEO & Co-Founder"}</span>
                  <h3>Mr. Seshagiri Raju</h3>
                  <p>
                    Mr. Seshagiri Raju plays a pivotal role in the organizational evolution of the company. His contributions span the critical pillars of strategic planning and sales development, creating a roadmap for sustainable business growth. He works at the intersection of market analysis and business development, ensuring that every expansion effort is backed by data and strategic logic. His leadership in sales development has been instrumental in broadening the brand’s reach and establishing a strong, resilient market presence.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <div className="cta ab2-cta">
            <div>
              <h2>Looking for Interior Designers in Hyderabad?</h2>
              <p>Join the 100+ homeowners and developers choosing structured execution.</p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" to="/contact">Inquire About Your Project</Link>
              <a className="btn btn-wa" href="https://wa.me/919000700930">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
