import { Link } from 'react-router-dom';

// Site footer: brand bar, quick links, services, locations, why choose us, social + video card.

// Add your social media page links here. Icons with an empty link are hidden.
export const SOCIAL = {
  linkedin: '',
  instagram: '',
  youtube: '',
  facebook: ''
};

const QUICK = [['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/projects', 'Projects'], ['/services#services-process', 'Process'], ['/contact', 'Contact']];

const LOCATIONS = [
  { name: 'Suchitra Experience Center', address: 'Plot 119, Suchitra Circle, Pet Basheerabad, Hyderabad – 500067', phone: '+91 90007 00930', map: 'https://maps.google.com/?q=Suchitra+Circle+Hyderabad' },
  { name: 'Nanakramguda Experience Center', address: 'Pavani Encore, adj. to Nanakramguda Tollgate, Telangana – 500075', phone: '+91 90143 00930', map: 'https://maps.google.com/?q=Pavani+Encore+Nanakramguda' },
  { name: 'Medchal Modular Factory', address: 'Pudur, Medchal, 5 min from ORR Exit No. 06, Hyderabad – 500033', phone: '+91 90007 00910', map: 'https://maps.google.com/?q=Pudur+Medchal' }
];

const P = {
  kitchen: <><path d="M9 2h6M10 2v4M14 2v4" /><path d="M6 6h12l2 6H4z" /><path d="M5 12v9h14v-9M9 16h6" /></>,
  wardrobe: <><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M12 2v20M9.5 11v2M14.5 11v2" /></>,
  tv: <><rect x="2" y="4" width="20" height="12" rx="1.5" /><path d="M6 20h12M4 16v4M20 16v4" /></>,
  sofa: <><path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" /><path d="M3 12a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z" /><path d="M5 17v2M19 17v2" /></>,
  office: <><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 22v-4h4v4" /></>,
  layers: <><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 12 10 5 10-5M2 17l10 5 10-5" /></>,
  pin: <><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
  cube: <><path d="M21 16V8l-9-5-9 5v8l9 5z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></>,
  tag: <><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="8" cy="8" r="1.5" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
  factory: <><path d="M2 20h20M4 20V9l5 3V9l5 3V6l6 4v10" /><path d="M8 16h2M14 16h2" /></>,
  cal: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4M7.5 13h.01M12 13h.01M16.5 13h.01M7.5 17h.01M12 17h.01" /></>
};
const Ic = ({ n, s = 30, w = 1.5 }) => (
  <svg aria-hidden="true" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{P[n]}</svg>
);

const SERVICES = [
  ['kitchen', 'Modular Kitchens', '/gallery#gallery-kitchens'],
  ['wardrobe', 'Wardrobes', '/gallery#gallery-wardrobes'],
  ['tv', 'TV Units', '/gallery#gallery-tvunits'],
  ['sofa', 'Living & Dining', '/gallery#gallery-photos'],
  ['office', 'Office Interiors', '/services#services-office'],
  ['layers', 'Commercial Interiors', '/services#services-office']
];
const WHY = [['cube', 'Free 3D Design'], ['tag', '10% Off First Order'], ['shield', '5-Year Warranty'], ['factory', 'In-House Modular Factory']];

const SOC = {
  linkedin: ['LinkedIn', <path key="i" d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-5a2.5 2.5 0 0 1 5 0v5M10.5 9.5v8" />],
  instagram: ['Instagram', <g key="i"><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.5" /><path d="M16.8 7.2h.01" /></g>],
  youtube: ['YouTube', <g key="i"><rect x="3" y="6" width="18" height="12" rx="3.5" /><path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor" /></g>],
  facebook: ['Facebook', <path key="i" d="M14.5 8H16V5h-2a3.5 3.5 0 0 0-3.5 3.5V11H8.5v3h2v6h3v-6h2.2l.5-3h-2.7V9a1 1 0 0 1 1-1z" />]
};

export default function Footer() {
  const socials = Object.entries(SOCIAL).filter(([, url]) => url);
  return (
    <>
      <footer className="ft">
        <div className="ft-bg" aria-hidden="true">
          <img src="/img/living-2.jpg" alt="" loading="lazy" />
          <svg className="ft-waves" viewBox="0 0 1440 220" preserveAspectRatio="none">
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i} d={`M0 ${190 - i * 3} C 360 ${60 + i * 6}, 720 ${230 - i * 4}, 1080 ${110 + i * 5} S 1440 ${40 + i * 4}, 1440 ${40 + i * 4}`} />
            ))}
          </svg>
        </div>

        <div className="wrap">
          <div className="ft-top">
            <Link to="/" className="ft-logo" aria-label="Deeraj Interiors home"><img src="/logo-light.png" alt="Deeraj Interiors" width="523" height="129" loading="lazy" /></Link>
            <p className="ft-about">Interior design and factory-made modular furniture for homes, offices and institutions across Hyderabad.</p>
            <div className="ft-cta">
              <Link className="btn ft-btn-light" to="/contact"><Ic n="cal" s={22} w={1.8} /> Book a Free Consultation <span aria-hidden="true">→</span></Link>
              <a className="btn ft-btn-wa" href="https://wa.me/919000700930" target="_blank" rel="noreferrer">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a3.5 3.5 0 0 1-1.8-1.8l.8-1-1-2z" /></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="ft-grid">
            <nav className="ft-col" aria-label="Quick links">
              <h4 className="ft-h">Quick Links</h4>
              <ul className="ft-links">
                {QUICK.map(([to, label]) => <li key={label}><Link to={to}><span aria-hidden="true">→</span>{label}</Link></li>)}
              </ul>
            </nav>
            <div className="ft-col">
              <h4 className="ft-h">Our Services</h4>
              <ul className="ft-icons">
                {SERVICES.map(([ic, label, to]) => <li key={label}><Link to={to}><Ic n={ic} />{label}</Link></li>)}
              </ul>
            </div>
            <div className="ft-col ft-col-wide">
              <h4 className="ft-h">Our Locations</h4>
              <ul className="ft-locs">
                {LOCATIONS.map((l) => (
                  <li key={l.name}>
                    <Ic n="pin" s={26} w={1.8} />
                    <div>
                      <div className="ft-loc-head">
                        <a className="ft-loc-name" href={l.map} target="_blank" rel="noreferrer">{l.name}</a>
                        <a className="ft-phone" href={'tel:' + l.phone.replace(/\s/g, '')}>{l.phone}</a>
                      </div>
                      <address>{l.address}</address>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ft-col">
              <h4 className="ft-h">Why Choose Us</h4>
              <ul className="ft-icons ft-why">
                {WHY.map(([ic, label]) => <li key={label}><span><Ic n={ic} s={36} w={1.4} />{label}</span></li>)}
              </ul>
            </div>
            <div className="ft-col ft-col-follow">
              <h4 className="ft-h">{socials.length ? 'Follow Us' : 'See Our Work'}</h4>
              {socials.length > 0 && (
                <div className="ft-social">
                  {socials.map(([k, url]) => (
                    <a key={k} href={url} target="_blank" rel="noreferrer" aria-label={SOC[k][0]}>
                      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{SOC[k][1]}</svg>
                    </a>
                  ))}
                </div>
              )}
              <Link to="/gallery#gallery-kitchens" className="ft-video" aria-label="Explore our kitchen designs in 3D">
                <img src="/img/kitchen-2.jpg" alt="" loading="lazy" />
                <span className="ft-play" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg></span>
                <span className="ft-video-cap">Explore our kitchens in 3D</span>
              </Link>
            </div>
          </div>

          <div className="ft-bottom">
            <span>© Copyright Deeraj Technologies Private Limited. All rights reserved.</span>
            <span className="ft-motto"><i aria-hidden="true" />Design <b aria-hidden="true">|</b> Manufacture <b aria-hidden="true">|</b> Execute</span>
          </div>
        </div>
      </footer>
      <a className="wa-float" href="https://wa.me/919000700930" aria-label="Chat on WhatsApp">
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /></svg>
        <span className="lbl">Chat with us</span>
      </a>
    </>
  );
}
