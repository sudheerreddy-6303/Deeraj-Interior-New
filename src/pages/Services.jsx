import { Link } from 'react-router-dom';
import usePage from '../lib/usePage.js';

// Services page. Content and layout come from the Deeraj Interiors design; 3D stages and
// animations are attached by usePage() after the page renders.
export default function Services() {
  const ref = usePage('services');
  return (
    <div ref={ref} className="page" id="p-services" data-page="services">
      <section>
        <div className="wrap">
          <div className="hero3d">
            <div className="rise">
              <span className="crumbs">
                <Link to="/">Home</Link>
                {" / Services"}
              </span>
              <p className="eyebrow" style={{ marginTop: "18px" }}>Our services</p>
              <h1 className="h1">
                {"Homes, offices and "}
                <em className="hl">everything in between</em>
              </h1>
              <p className="lead">Office and commercial interiors, turnkey projects and renovations — planned, manufactured and delivered by one team.</p>
              <div className="actions" style={{ marginTop: "26px" }}>
                <Link className="btn btn-primary" to="/contact">Request for a quote</Link>
              </div>
            </div>
            <div className="stage" id="st-services">
              <div className="s-load">Loading 3D office…</div>
              <div className="s-hint">
                <span className="live" />
                Live 3D office · drag to look around
              </div>
            </div>
          </div>
          <nav className="sv-nav" aria-label="Services">
            <Link to="/services#services-office">
              <span>01</span>
              <b>{"Office & Commercial"}</b>
            </Link>
            <Link to="/services#services-process">
              <span>02</span>
              <b>Our Process</b>
            </Link>
            <Link to="/services#services-turnkey">
              <span>03</span>
              <b>Turnkey Projects</b>
            </Link>
            <Link to="/services#services-renovation">
              <span>04</span>
              <b>{"Renovation & Re-modelling"}</b>
            </Link>
          </nav>
        </div>
      </section>
      <section className="section" id="services-office">
        <div className="wrap">
          <header className="sv-head">
            <span className="sv-num">01</span>
            <div>
              <p className="eyebrow">{"Office & Commercial"}</p>
              <h2 className="sv-title">{"Office & Commercial Interiors"}</h2>
              <p className="sv-sub">Creating Workplaces That Inspire Success</p>
              <p className="lead">
                Your workplace is more than just a location—it's a reflection of your brand, values, and culture. We design office and commercial spaces that blend aesthetics with functionality, foster collaboration and productivity, and leave lasting impressions on clients.
              </p>
            </div>
          </header>
          <h3 className="sv-h3">Our Approach to Corporate Interiors</h3>
          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.4 2.6a2 2 0 0 1 2.9 2.9L11 15.8 8.2 13z" />
                    <path d="M8 14c-2 0-3.5 1.5-3.5 3.5 0 1.4-1 2.5-2.5 2.5 1.1 1.2 2.7 2 4.5 2a5 5 0 0 0 5-5z" />
                  </svg>
                </span>
                <h3>Brand-Centric Design</h3>
                <p>Every detail aligns with your brand's identity and vision.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </span>
                <h3>Smart Space Planning</h3>
                <p>Efficient layouts to maximize workflow and collaboration.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 18v-6a5 5 0 0 1 10 0v6" />
                    <path d="M5 18h14M8 18v3M16 18v3" />
                  </svg>
                </span>
                <h3>{"Ergonomic & Comfortable"}</h3>
                <p>Furniture and setups that prioritize health and well-being.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="12" rx="2" />
                    <path d="M8 20h8M12 16v4" />
                  </svg>
                </span>
                <h3>Modern Technology Integration</h3>
                <p>Seamless incorporation of AV systems, lighting, and automation.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 4 13C4 7 10 3 20 3c0 10-4 16-9 17z" />
                    <path d="M4 21c4-4 7-7 11-10" />
                  </svg>
                </span>
                <h3>Sustainability in Design</h3>
                <p>Eco-friendly materials and energy-efficient solutions.</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="3" width="14" height="18" rx="2" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <h3>Turnkey Execution</h3>
                <p>End-to-end project management ensuring on-time delivery.</p>
              </div>
            </div>
          </div>
          <h3 className="sv-h3">Our Services</h3>
          <div className="sv-tiles">
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10.5 12 3l9 7.5V21H3z" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </span>
              <div>
                <b>Home Interiors</b>
                <p>Cozy, personalized living spaces tailored to your lifestyle and preferences.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="1" />
                  <path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 22v-4h4v4" />
                </svg>
              </span>
              <div>
                <b>Commercial Space Interiors</b>
                <p>Functional and aesthetic designs for businesses to enhance productivity and brand image.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10 12 5 2 10l10 5 10-5z" />
                  <path d="M6 12v5c3 2 9 2 12 0v-5" />
                </svg>
              </span>
              <div>
                <b>School Interiors</b>
                <p>Engaging learning environments that foster creativity and comfort for students and staff.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M21 15V2a5 5 0 0 0-5 5v6h5v9" />
                </svg>
              </span>
              <div>
                <b>Restaurant Interiors</b>
                <p>Inviting dining spaces that elevate the culinary experience and ambiance.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M5 22 12 6l7 16M8 15h8" />
                </svg>
              </span>
              <div>
                <b>{"Architect & Interior Services"}</b>
                <p>Comprehensive design solutions from concept to completion for seamless integration.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                </svg>
              </span>
              <div>
                <b>Online Retail Showrooms</b>
                <p>Virtual and physical setups optimized for e-commerce display and customer engagement.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <div>
                <b>Corporate Offices</b>
                <p>Executive cabins, open workspaces, conference rooms, and reception areas.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z" />
                  <path d="M12 15 9 12a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
                </svg>
              </span>
              <div>
                <b>Start-up Spaces</b>
                <p>Vibrant, creative designs that inspire innovation and team collaboration.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9 4.5 4h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6" />
                </svg>
              </span>
              <div>
                <b>{"Retail Stores & Showrooms"}</b>
                <p>Customer-focused layouts that drive engagement, traffic, and sales.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
                  <path d="M6 2v2M10 2v2M14 2v2" />
                </svg>
              </span>
              <div>
                <b>Hospitality Spaces</b>
                <p>Cafés, lounges, and luxury lobbies with warm, inviting atmospheres.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
                </svg>
              </span>
              <div>
                <b>Co-Working Hubs</b>
                <p>Flexible, modern setups designed to cater to diverse professionals.</p>
              </div>
            </div>
            <div className="sv-tile">
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </span>
              <div>
                <b>{"Boardrooms & Conference Centers"}</b>
                <p>State-of-the-art meeting spaces equipped for high-level decision making.</p>
              </div>
            </div>
          </div>
          <div className="sv-styles">
            <div>
              <p className="eyebrow">Design styles</p>
              <h3 className="h2" style={{ fontSize: "clamp(26px,3vw,36px)" }}>Popular Design Styles for Corporate Spaces</h3>
            </div>
            <ol>
              <li>
                <span className="sv-mood" style={{ background: "linear-gradient(135deg,#f4f1ec 55%,#d8d1c6 55%)" }} />
                <div>
                  <b>Modern Minimalist</b>
                  <p>Clean, sleek designs with open layouts.</p>
                </div>
              </li>
              <li>
                <span className="sv-mood" style={{ background: "linear-gradient(135deg,#3b3a3c 50%,#8a6f58 50%)" }} />
                <div>
                  <b>Industrial Corporate Chic</b>
                  <p>High-end finishes with sophisticated color palettes.</p>
                </div>
              </li>
              <li>
                <span className="sv-mood" style={{ background: "linear-gradient(135deg,#1b1b1d 45%,#b8904c 45%)" }} />
                <div>
                  <b>Luxury</b>
                  <p>Raw textures, exposed elements, and urban appeal.</p>
                </div>
              </li>
              <li>
                <span className="sv-mood" style={{ background: "linear-gradient(135deg,#5d7a52 50%,#c9a77a 50%)" }} />
                <div>
                  <b>Biophilic Design</b>
                  <p>Integrating greenery for a refreshing, natural vibe.</p>
                </div>
              </li>
              <li>
                <span className="sv-mood" style={{ background: "linear-gradient(135deg,#2c3e57 50%,#9aa1a8 50%)" }} />
                <div>
                  <b>Tech-Driven Workspaces</b>
                  <p>Smart automation, adaptable furniture, and digital collaboration zones.</p>
                </div>
              </li>
            </ol>
          </div>
          <div className="sv-why">
            <div className="sv-why-head">
              <p className="eyebrow">2026</p>
              <h3>Why Choose Us for Your Corporate Interiors?</h3>
            </div>
            <div className="sv-why-grid">
              <div>
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
                  </svg>
                </span>
                <b>Experience Across Industries</b>
                <p>From IT to retail, hospitality, and healthcare.</p>
              </div>
              <div>
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <b>{"Time & Budget Adherence"}</b>
                <p>Designs delivered without compromising deadlines or costs.</p>
              </div>
              <div>
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7.5" cy="15.5" r="5.5" />
                    <path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3" />
                  </svg>
                </span>
                <b>Turnkey Solutions</b>
                <p>From concept to execution, we handle it all.</p>
              </div>
            </div>
            <Link className="btn btn-light" to="/contact">Request for a Quote</Link>
          </div>
        </div>
      </section>
      <section className="section band" id="services-process">
        <div className="wrap">
          <header className="sv-head">
            <span className="sv-num">02</span>
            <div>
              <p className="eyebrow">Our Process</p>
              <h2 className="sv-title">
                {"Transform your home or office with "}
                <span className="hl">Deeraj Interiors</span>
              </h2>
              <p className="sv-sub">Schedule a meeting to discuss your needs and vision</p>
            </div>
          </header>
          <ol className="sv-steps">
            <li>
              <span className="sv-step-ic">
                <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <small>Step 1</small>
              <b>Consultation</b>
              <p>Schedule a meeting to discuss your needs and vision</p>
            </li>
            <li>
              <span className="sv-step-ic">
                <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                </svg>
              </span>
              <small>Step 2</small>
              <b>Design</b>
              <p>Receive a tailored design plan and proposal</p>
            </li>
            <li>
              <span className="sv-step-ic">
                <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9" />
                  <path d="M17.6 15 22 10.6M20.9 7.7 16.3 3.1a3 3 0 0 0-4.2 0L10 5.2l8.8 8.8 2.1-2.1a3 3 0 0 0 0-4.2z" />
                </svg>
              </span>
              <small>Step 3</small>
              <b>Execution</b>
              <p>Watch as our team brings the design to life</p>
            </li>
            <li>
              <span className="sv-step-ic">
                <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10.5 12 3l9 7.5V21H3z" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
              </span>
              <small>Step 4</small>
              <b>Reveal</b>
              <p>Enjoy your newly transformed and personalized space</p>
            </li>
          </ol>
          <div className="sv-faq-wrap">
            <div>
              <p className="eyebrow">FAQ</p>
              <h3 className="h2" style={{ fontSize: "clamp(26px,3vw,36px)" }}>Frequently Asked Questions</h3>
              <p className="muted" style={{ marginTop: "12px" }}>What to expect from your first conversation with our design team.</p>
              <Link className="btn btn-primary" style={{ marginTop: "22px" }} to="/contact">Schedule Your Free Consultation Today</Link>
            </div>
            <div className="faq">
              <details open>
                <summary>1. Greeting and Introduction</summary>
                <p>
                  Thank you for considering Deeraj Interiors. We are excited to learn about your space and help bring your vision to life. Let’s start with a quick overview of what you're looking for. We offer a range of interior design services including residential design, commercial design, and e-design.
                </p>
              </details>
              <details>
                <summary>2. Understanding Your Requirements</summary>
                <p>
                  Can you tell us more about the space? Is it a 2BHK, 3BHK, villa, or commercial area? What’s your main goal for the interior—comfort, luxury, functionality, or a specific theme? Do you have any preferences in colors, materials, or design styles (modern, traditional, minimal, etc.)? How do you plan to use the space daily? This helps us plan storage and layout effectively.
                </p>
              </details>
              <details>
                <summary>3. Design Ideas and Suggestions</summary>
                <p>
                  Based on your input, we can propose some layout options, laminate selections, lighting styles, and modular fittings. We usually work with materials like marine plywood, high-gloss laminates, acrylic, and PU finishes for a durable and stylish outcome. Here are a few reference photos or 3D designs we've done before that might match your style.
                </p>
              </details>
              <details>
                <summary>4. Budget Discussion</summary>
                <p>
                  Do you have a tentative budget in mind for this project? We can suggest packages based on that, and we’ll always ensure transparency with material quality and pricing. Our pricing varies depending on finishes and customisation, but we can always work out the best within your budget.
                </p>
              </details>
              <details>
                <summary>5. Questions and Feedback</summary>
                <p>
                  Do you have any specific concerns or ideas you'd like us to explore further? We’re here to make sure every corner of your home reflects your personality and fits your lifestyle.
                </p>
              </details>
              <details>
                <summary>6. Closing and Next Steps</summary>
                <p>
                  Thank you for sharing your ideas. We’ll now create a proposal/3D design and share it within [X] days. Please feel free to call or WhatsApp us if you think of anything else you'd like to include.
                </p>
              </details>
              <details>
                <summary>7. Timeline and Execution</summary>
                <p>
                  Once the design is finalized, our work generally takes 30-45 days for completion, depending on the site condition and scale. We follow a clear process: Design, Approval, Material Selection, Manufacturing, Site Installation, Final Handover.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="services-turnkey">
        <div className="wrap">
          <header className="sv-head">
            <span className="sv-num">03</span>
            <div>
              <p className="eyebrow">Turnkey Projects</p>
              <h2 className="sv-title">Turnkey Projects</h2>
              <p className="sv-sub">Vision to Reality — Delivered Seamlessly</p>
              <p className="lead">
                Our turnkey interior solutions take care of everything — from initial concept and detailed planning to flawless execution and final handover. Whether it's your dream home, modern office, retail outlet, restaurant, or large commercial space, we deliver stress-free results on time, within budget, and with uncompromising quality.
              </p>
            </div>
          </header>
          <h3 className="sv-h3">What We Offer in Turnkey Projects</h3>
          <div className="sv-offer">
            <div className="card">
              <small className="sv-k">01</small>
              <span className="ic">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6v15l6-3 6 3 6-3V3l-6 3-6-3z" />
                  <path d="M9 3v15M15 6v15" />
                </svg>
              </span>
              <h3>Concept to Completion</h3>
              <p>Full-cycle handling: design, planning, approvals, execution, and final styling.</p>
            </div>
            <div className="card">
              <small className="sv-k">02</small>
              <span className="ic">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <h3>Time-Bound Delivery</h3>
              <p>Structured timelines and efficient coordination to meet every deadline.</p>
            </div>
            <div className="card">
              <small className="sv-k">03</small>
              <span className="ic">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10" />
                </svg>
              </span>
              <h3>Budget Transparency</h3>
              <p>Clear, detailed estimates — no hidden costs or surprises.</p>
            </div>
            <div className="card">
              <small className="sv-k">04</small>
              <span className="ic">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <h3>Quality Assurance</h3>
              <p>Only premium materials, expert craftsmanship, and rigorous inspections.</p>
            </div>
            <div className="card">
              <small className="sv-k">05</small>
              <span className="ic">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
                </svg>
              </span>
              <h3>Single Point of Contact</h3>
              <p>One dedicated team manages vendors, site, and progress — hassle-free for you.</p>
            </div>
          </div>
          <div className="sv-stand row g-4 g-lg-5 align-items-center split-row">
            <div className="col-lg-6 split-col">
              <div className="ph" style={{ aspectRatio: "4/3.3" }}>
                <img src="img/living-1.jpg" alt="Completed living room by Deeraj Interiors" loading="lazy" />
              </div>
            </div>
            <div className="col-lg-6 split-col">
              <div>
                <h3 className="h2" style={{ fontSize: "clamp(26px,3vw,36px)" }}>Why Our Turnkey Services Stand Out</h3>
                <ul className="points">
                  <li>
                    <span className="num">01</span>
                    <div>
                      <b>Expert Coordination</b>
                      <p>{"Architects, designers, engineers & contractors working in perfect sync."}</p>
                    </div>
                  </li>
                  <li>
                    <span className="num">02</span>
                    <div>
                      <b>Custom-Built for You</b>
                      <p>Every design tailored to your brand, lifestyle, or functional needs.</p>
                    </div>
                  </li>
                  <li>
                    <span className="num">03</span>
                    <div>
                      <b>Hassle-Free Process</b>
                      <p>We manage supervision, vendors, procurement — you stay relaxed.</p>
                    </div>
                  </li>
                  <li>
                    <span className="num">04</span>
                    <div>
                      <b>Move-in Ready</b>
                      <p>Fully furnished, equipped, and styled spaces delivered on time.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <figure className="sv-quote">
            <blockquote>“From the very first sketch to the final finishing touch — we bring your vision to life while you focus on what matters most.”</blockquote>
            <Link className="btn btn-light" to="/contact">Schedule a Call</Link>
          </figure>
        </div>
      </section>
      <section className="section band" id="services-renovation">
        <div className="wrap">
          <header className="sv-head">
            <span className="sv-num">04</span>
            <div>
              <p className="eyebrow">{"Renovation & Re-modelling"}</p>
              <h2 className="sv-title">{"Renovation & Re-modelling"}</h2>
              <p className="sv-sub">Breathe New Life into Your Spaces</p>
              <p className="lead">
                {"Whether it’s a home that’s lost its spark or a commercial space that needs a fresh identity, our renovation and re-modelling services are designed to "}
                <strong>transform</strong>
                {" — not just rebuild."}
              </p>
              <p className="lead">
                From subtle upgrades to complete makeovers, we deliver renewed comfort, style, and functionality — perfectly aligned with your brand, lifestyle or business identity.
              </p>
            </div>
          </header>
          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M8 13h.01M8 17h.01" />
                  </svg>
                </span>
                <h3>Home Renovations</h3>
                <p>{"Modernising kitchens, upgrading bathrooms, living areas & more"}</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </span>
                <h3>{"Office & Retail Upgrades"}</h3>
                <p>{"Enhancing aesthetics, flow, brand presence & boosting productivity"}</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21V3h18v18z" />
                    <path d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6" />
                  </svg>
                </span>
                <h3>Structural Modifications</h3>
                <p>Space planning, wall reconfigurations, and architectural improvements</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 2 10 5-10 5L2 7z" />
                    <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </span>
                <h3>{"Material & Finish Updates"}</h3>
                <p>Premium flooring, bespoke furniture, high-quality fixtures</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                  </svg>
                </span>
                <h3>{"Lighting & Electrical Revamps"}</h3>
                <p>{"Smart lighting layouts, energy-efficient solutions & ambiance-enhancing designs"}</p>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <span className="ic">
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.7 3 4 3.7 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                    <path d="M2 12h20M7 19v2M17 19v2" />
                  </svg>
                </span>
                <h3>Bathroom Transformations</h3>
                <p>Converting outdated washrooms into luxurious, modern sanctuaries</p>
              </div>
            </div>
          </div>
          <h3 className="sv-h3">Why Choose Us For Your Renovation?</h3>
          <div className="sv-benefits">
            <div>
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
                </svg>
              </span>
              <b>Seamless Process</b>
              <p>From design to execution — we handle every detail while you carry on with life.</p>
            </div>
            <div>
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                </svg>
              </span>
              <b>Customised Design</b>
              <p>Tailored concepts that reflect your style and needs — never cookie-cutter.</p>
            </div>
            <div>
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
                </svg>
              </span>
              <b>Premium Quality</b>
              <p>Only the finest materials and skilled craftsmanship for lasting results.</p>
            </div>
            <div>
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <b>On-Time Delivery</b>
              <p>We value your time as much as your satisfaction.</p>
            </div>
            <div>
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <b>Transparent Pricing</b>
              <p>Clear, upfront costs with no hidden fees or unexpected surprises.</p>
            </div>
            <div>
              <span className="ic">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <path d="M8.2 13.9 7 23l5-3 5 3-1.2-9.1" />
                </svg>
              </span>
              <b>After-Care Support</b>
              <p>Our commitment doesn't end at handover. We provide reliable warranties and support.</p>
            </div>
          </div>
          <div className="sv-transform">
            <div>
              <h3>
                {"Transform "}
                <em>Without Moving</em>
              </h3>
              <p>
                {"A well-planned renovation can give you the feeling of a brand-new space without the hassle of relocating. Whether you dream of a sleek modern look, a warm rustic vibe, or a bold contemporary statement — our team ensures your renovated space matches your lifestyle & personality perfectly."}
              </p>
            </div>
            <Link className="btn btn-primary" to="/contact">Request for a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
