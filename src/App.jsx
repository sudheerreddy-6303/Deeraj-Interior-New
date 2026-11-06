import { Suspense, lazy, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/Toasts.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { initTilt } from './lib/effects.js';
import { trackPageView } from './lib/track.js';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Factory from './pages/Factory.jsx';
import Projects from './pages/Projects.jsx';
import Gallery from './pages/Gallery.jsx';
import Partner from './pages/Partner.jsx';
import Store from './pages/Store.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Contact from './pages/Contact.jsx';
// the admin panel is loaded only when someone opens /admin
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

/** Scrolls to the top on page change, or to the section in the URL hash (e.g. /services#services-turnkey). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return undefined; }
    let tries = 0;
    const t = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el || ++tries > 20) {
        clearInterval(t);
        if (el) window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 90), behavior: 'smooth' });
      }
    }, 50);
    return () => clearInterval(t);
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <section className="section">
      <div className="wrap text-center">
        <p className="eyebrow">404</p>
        <h1 className="h1">This page has <em className="hl">moved</em></h1>
        <p className="lead mx-auto">The page you are looking for is not here. Try the home page or talk to us on WhatsApp.</p>
        <div className="actions justify-content-center mt-4"><Link className="btn btn-primary" to="/">Go to home</Link><a className="btn btn-wa" href="https://wa.me/919000700930">Chat on WhatsApp</a></div>
      </div>
    </section>
  );
}

function Site() {
  useEffect(() => { initTilt(); }, []);
  // visitor counter: one page view per page opened
  const { pathname } = useLocation();
  useEffect(() => { trackPageView(pathname); }, [pathname]);
  return (
    <>
      <a className="visually-hidden-focusable skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/factory" element={<Factory />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/product/:id" element={<ProductPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ScrollManager />
      <Routes>
        <Route path="/admin/*" element={<Suspense fallback={<div className="d-flex justify-content-center py-5"><span className="spinner-border text-primary" role="status" /></div>}><AdminApp /></Suspense>} />
        <Route path="/*" element={<Site />} />
      </Routes>
    </ToastProvider>
  );
}
