import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Home hero: full-screen showcase of past projects. The background plays through the
// project photos with a slow cinematic zoom and pan. If a project has a video, add
// `video: '/img/projects/xyz.mp4'` to its slide and it plays instead of the photo.
export const HERO_SLIDES = [
  { img: '/img/living-1.jpg', title: 'TV unit with display', tag: 'Living room' },
  { img: '/img/kitchen-1.jpg', title: 'L-shaped modular kitchen', tag: 'Kitchen' },
  { img: '/img/bedroom-1.jpg', title: 'Master bedroom', tag: 'Bedroom' },
  { img: '/img/wardrobe-1.jpg', title: 'Floor-to-ceiling wardrobe', tag: 'Wardrobe' },
  { img: '/img/living-2.jpg', title: 'Marble-finish TV wall', tag: 'Living room' }
];
const DURATION = 6500;

const Icon = {
  factory: <><path d="M2 20h20M4 20V9l5 3V9l5 3V6l6 4v10" /><path d="M8 16h.01M12 16h.01M16 16h.01" /></>,
  people: <><circle cx="9" cy="7" r="3.2" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17.5" cy="8.5" r="2.5" /><path d="M16.5 14.2A5 5 0 0 1 22 19" /></>,
  check: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /><path d="m9 15 2 2 4-4" /></>,
  cal: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4M7.5 13h.01M12 13h.01M16.5 13h.01M7.5 17h.01M12 17h.01" /></>
};
const Svg = ({ children, size = 34 }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

export default function HeroShowcase() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress bar animation
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const thumbs = useRef(null);
  const n = HERO_SLIDES.length;

  const go = useCallback((k) => { setI(((k % n) + n) % n); setCycle((c) => c + 1); }, [n]);

  // autoplay; pauses on hover/focus and when the tab is hidden
  useEffect(() => {
    if (paused || reduce) return undefined;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, reduce, go, cycle]);
  useEffect(() => {
    const vis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', vis);
    return () => document.removeEventListener('visibilitychange', vis);
  }, []);
  // when autoplay resumes, restart the progress bars together with the timer
  const wasPaused = useRef(false);
  useEffect(() => {
    if (wasPaused.current && !paused) setCycle((c) => c + 1);
    wasPaused.current = paused;
  }, [paused]);
  // keep the active thumbnail in view on small screens
  useEffect(() => {
    const el = thumbs.current && thumbs.current.children[i];
    if (el && thumbs.current.scrollWidth > thumbs.current.clientWidth) {
      thumbs.current.scrollTo({ left: el.offsetLeft - 16, behavior: 'smooth' });
    }
  }, [i]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };

  return (
    <section className="hs" aria-roledescription="carousel" aria-label="Our projects" onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hs-bg" aria-hidden="true">
        {HERO_SLIDES.map((s, k) => (
          <div key={s.img} className={'hs-slide' + (k === i ? ' on' : '') + ` kb-${k % 4}`}>
            {s.video && k === i
              ? <video src={s.video} poster={s.img} autoPlay muted loop playsInline />
              : <img src={s.img} alt="" loading={k === 0 ? 'eager' : 'lazy'} fetchpriority={k === 0 ? 'high' : undefined} />}
          </div>
        ))}
      </div>
      <div className="hs-scrim" aria-hidden="true" />

      <div className="wrap hs-in">
        <div className="hs-copy">
          <p className="hs-eyebrow">Interior designers in Hyderabad</p>
          <h1 className="hs-title">Transform Your Space <span>With <em>Elegant Interiors</em></span></h1>
          <ul className="hs-services">
            <li>Modular Kitchens</li><li>Wardrobes</li><li>Full Home Interiors</li><li>Office Interiors</li>
          </ul>
          <p className="hs-tag">Design. Manufacture. Execute.<br />Creating beautiful spaces that inspire living.</p>
          <div className="hs-actions">
            <Link className="btn hs-btn-gold" to="/projects">Explore Our Projects <span aria-hidden="true">→</span></Link>
            <Link className="btn hs-btn-line" to="/contact">Get Free Quote</Link>
          </div>
        </div>

        <div className="hs-progress" role="tablist" aria-label="Choose project">
          {HERO_SLIDES.map((s, k) => (
            <button key={s.img} type="button" role="tab" aria-selected={k === i} aria-label={s.title} onClick={() => go(k)}>
              <i key={k === i ? `on-${cycle}` : 'off'} className={k === i ? (paused || reduce ? 'fill' : 'run') : k < i ? 'fill' : ''} style={{ animationDuration: `${DURATION}ms` }} />
            </button>
          ))}
        </div>

        <div className={'hs-thumbs' + (paused ? ' is-paused' : '')} ref={thumbs}>
          {HERO_SLIDES.map((s, k) => (
            <button key={s.img} type="button" className={'hs-thumb' + (k === i ? ' on' : '')} onClick={() => go(k)} aria-pressed={k === i} aria-label={`Show ${s.title}`}>
              <img src={s.img} alt="" loading="lazy" />
              <span className="hs-play" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
              </span>
              <span className="hs-cap"><small>{s.tag}</small>{s.title}</span>
              {k === i && <span className="hs-now" aria-hidden="true"><span className="hs-eq"><i /><i /><i /></span>Now playing</span>}
              {k === i && <span key={`tb-${cycle}`} className={'hs-tbar' + (reduce ? ' fill' : '')} style={{ animationDuration: `${DURATION}ms` }} aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="hs-arrow prev" onClick={() => go(i - 1)} aria-label="Previous project">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button type="button" className="hs-arrow next" onClick={() => go(i + 1)} aria-label="Next project">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      <div className="hs-stats">
        <div className="wrap">
          <div className="hs-stats-in">
            <div><Svg>{Icon.factory}</Svg><span><b>15,000</b><small>sq.ft modular factory</small></span></div>
            <div><Svg>{Icon.people}</Svg><span><b>250+</b><small>Happy customers</small></span></div>
            <div><Svg>{Icon.check}</Svg><span><b>140+</b><small>Projects executed</small></span></div>
            <div><Svg>{Icon.cal}</Svg><span><b>SINCE 2024</b><small>Interior designers in Hyderabad</small></span></div>
          </div>
        </div>
      </div>
      <p className="visually-hidden" aria-live="polite">Showing {HERO_SLIDES[i].title}</p>
    </section>
  );
}
