import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';

// Main navigation. Desktop: links with hover menus. Phones and tablets: Bootstrap off-canvas menu.
export const NAV = [
  { page: 'home', to: '/', label: 'Home' },
  { page: 'about', to: '/about', label: 'About Us' },
  {
    page: 'services', to: '/services', label: 'Services', menu: [
      ['/services#services-office', 'Office / commercial spaces'], ['/services#services-process', 'Our process'],
      ['/services#services-turnkey', 'Turnkey projects'], ['/services#services-renovation', 'Renovation & re-modelling']
    ]
  },
  {
    page: 'factory', to: '/factory', label: 'Modular Factory', menu: [
      ['/factory#factory-workflow', '9-stage process'], ['/factory#factory-projects', 'Our work'], ['/factory#factory-materials', 'Materials & finishes'],
      ['/factory#factory-studio', '3D kitchen studio', true], ['/factory#factory-b2b', 'B2B partnership'], ['/factory#factory-form', 'Request collaboration']
    ]
  },
  { page: 'projects', to: '/projects', label: 'Our Projects', menu: [['/projects', 'Our projects'], ['/gallery#gallery-clients', 'Our customers']] },
  {
    page: 'gallery', to: '/gallery', label: 'Gallery', menu: [
      ['/gallery#gallery-kitchens', 'Kitchen designs', true], ['/gallery#gallery-bedrooms', 'Bedroom designs', true],
      ['/gallery#gallery-wardrobes', 'Wardrobe designs', true], ['/gallery#gallery-tvunits', 'TV unit designs', true], ['/gallery#gallery-photos', 'Project photos']
    ]
  },
  { page: 'partner', to: '/partner', label: 'Partner Us', menu: [['/partner#partner-franchise', 'Franchise'], ['/partner#partner-associate', 'Business associate']] },
  { page: 'store', to: '/store', label: 'Online Store' },
  { page: 'contact', to: '/contact', label: 'Contact Us' }
];

// Desktop mega menus: a photo on the left and grouped links with icons.
const I = {
  home: <><path d="M3 10.5 12 3l9 7.5V21H3z" /><path d="M9 21v-6h6v6" /></>,
  modular: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18M12 3v18" /></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 22v-4h4v4" /></>,
  factory: <><path d="M2 20h20M4 20V9l5 3V9l5 3V6l6 4v10" /></>,
  handshake: <><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5 5 0 0 1 6.2-.7l.5.3a2 2 0 0 0 1.2.3H22" /><path d="m2 11 5.5 5.5a1 1 0 1 0 3-3" /><path d="M2 6h2.6a2 2 0 0 0 1.2-.3l.5-.3A5 5 0 0 1 10 5" /></>,
  cube: <><path d="M21 16V8l-9-5-9 5v8l9 5z" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></>,
  star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />,
  pin: <><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>
};
export const MEGA = {
  services: {
    img: '/img/kitchen-1.jpg', caption: 'Homes, offices and everything in between', cta: ['/services', 'All services'],
    groups: [
      { icon: 'home', title: 'Home Interiors', links: [['/gallery#gallery-tvunits', 'Living & TV Units'], ['/gallery#gallery-bedrooms', 'Bedroom'], ['/services#services-turnkey', 'Turnkey Projects'], ['/services#services-renovation', 'Renovation']] },
      { icon: 'modular', title: 'Modular Solutions', links: [['/gallery#gallery-kitchens', 'Modular Kitchen'], ['/gallery#gallery-wardrobes', 'Wardrobes'], ['/gallery#gallery-tvunits', 'TV Units'], ['/factory#factory-studio', '3D Kitchen Studio', true]] },
      { icon: 'building', title: 'Commercial Interiors', links: [['/services#services-office', 'Office Interiors'], ['/services#services-office', 'Retail & Showrooms'], ['/services#services-process', 'Our Process'], ['/factory#factory-b2b', 'B2B Partnership']] }
    ]
  },
  factory: {
    img: '/img/kitchen-2.jpg', caption: '15,000 sq.ft modular factory, Medchal', cta: ['/factory', 'Visit the factory page'],
    groups: [
      { icon: 'factory', title: 'Our Factory', links: [['/factory#factory-workflow', '9-Stage Process'], ['/factory#factory-projects', 'Our Work'], ['/factory#factory-materials', 'Materials & Finishes']] },
      { icon: 'handshake', title: 'Work With Us', links: [['/factory#factory-studio', '3D Kitchen Studio', true], ['/factory#factory-b2b', 'B2B Partnership'], ['/factory#factory-form', 'Request Collaboration']] }
    ]
  },
  projects: {
    img: '/img/living-2.jpg', caption: 'Completed homes across Hyderabad', cta: ['/projects', 'See all projects'],
    groups: [
      { icon: 'star', title: 'Our Work', links: [['/projects', 'Our Projects'], ['/gallery#gallery-clients', 'Our Customers'], ['/gallery#gallery-photos', 'Project Photos']] }
    ]
  },
  gallery: {
    img: '/img/bedroom-3.jpg', caption: 'Explore every design in 3D', cta: ['/gallery', 'Open the gallery'],
    groups: [
      { icon: 'cube', title: '3D Designs', links: [['/gallery#gallery-kitchens', 'Kitchen Designs', true], ['/gallery#gallery-bedrooms', 'Bedroom Designs', true], ['/gallery#gallery-wardrobes', 'Wardrobe Designs', true], ['/gallery#gallery-tvunits', 'TV Unit Designs', true]] },
      { icon: 'image', title: 'Photos', links: [['/gallery#gallery-photos', 'Project Photos'], ['/gallery#gallery-clients', 'Our Customers']] }
    ]
  },
  partner: {
    img: '/img/wardrobe-2.jpg', caption: 'Grow with Deeraj Interiors', cta: ['/partner', 'Partner with us'],
    groups: [
      { icon: 'pin', title: 'Partner Programs', links: [['/partner#partner-franchise', 'Franchise'], ['/partner#partner-associate', 'Business Associate']] }
    ]
  }
};
const Ico = ({ name }) => (
  <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{I[name]}</svg>
);
function MegaMenu({ m }) {
  return (
    <div className={`mega mega-${m.groups.length}`} role="menu">
      <Link to={m.cta[0]} className="mega-img" role="menuitem">
        <img src={m.img} alt="" loading="lazy" />
        <span className="mega-img-cap">{m.caption}<b>{m.cta[1]} →</b></span>
      </Link>
      <div className="mega-cols">
        {m.groups.map((g) => (
          <div className="mega-col" key={g.title}>
            <p className="mega-h"><Ico name={g.icon} />{g.title}</p>
            <ul>
              {g.links.map(([to, label, is3d]) => (
                <li key={to + label}><Link to={to} role="menuitem">{label}{is3d && <span className="badge3d">3D</span>}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const Chevron = () => (
  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
);
const Badge3D = () => <span className="badge3d">3D</span>;

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // hush: hide an open mega menu right after a link in it is clicked (until the mouse leaves the bar)
  const [hush, setHush] = useState(false);
  const first = useRef(true);
  useEffect(() => { setOpen(false); if (first.current) { first.current = false; return; } setHush(true); const a = document.activeElement; if (a && a.closest && a.closest('.links')) a.blur(); }, [location.pathname, location.hash]);

  return (
    <header className={'site-nav nav-dark' + (hush ? ' mega-hush' : '')} onMouseLeave={() => setHush(false)}>
      <div className="wrap">
        <div className="nav-in">
          <Link className="brand brand-logo" to="/" aria-label="Deeraj Interiors home"><img src="/logo-light.png" alt="Deeraj Interiors" width="523" height="129" /></Link>
          <nav className="links" aria-label="Main">
            {NAV.map((n) => (
              <div className={'dd' + (MEGA[n.page] ? ' has-mega' : '')} key={n.page}>
                <NavLink end={n.page === 'home'} className={({ isActive }) => 'nl' + (isActive ? ' active' : '')} to={n.to}>
                  {n.label} {n.menu && <Chevron />}
                </NavLink>
                {MEGA[n.page] && <MegaMenu m={MEGA[n.page]} />}
                {n.menu && !MEGA[n.page] && (
                  <div className="menu">
                    {n.menu.map(([to, label, is3d]) => <Link key={to + label} to={to}>{label} {is3d && <Badge3D />}</Link>)}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="nav-cta">
            <Link className="btn btn-primary" to="/contact">Book free consultation</Link>
            <button className="burger" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      <Offcanvas show={open} onHide={() => setOpen(false)} placement="end" className="mnav-oc" aria-labelledby="mnav-title">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="mnav-title" className="brand brand-logo"><img src="/logo.png" alt="Deeraj Interiors" width="523" height="129" /></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav aria-label="Mobile">
            {NAV.map((n) => (
              <div key={n.page}>
                <NavLink end={n.page === 'home'} className={({ isActive }) => 'mlink' + (isActive ? ' active' : '')} to={n.to}>{n.label}</NavLink>
                {n.menu && n.menu.filter(([to]) => to.includes('#')).map(([to, label, is3d]) => (
                  <Link key={to} className="mlink sub" to={to}>{label} {is3d && <Badge3D />}</Link>
                ))}
              </div>
            ))}
          </nav>
          <Link className="btn btn-primary w-100 mt-4" to="/contact">Book free consultation</Link>
          <a className="btn btn-wa w-100 mt-2" href="https://wa.me/919000700930">Chat on WhatsApp</a>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}
