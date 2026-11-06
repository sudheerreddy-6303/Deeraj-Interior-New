import { useEffect, useRef, useState } from 'react';

// Client reviews as flip cards: the front shows the client's home and photo,
// the back (on hover, tap or Enter) shows their review.
//
// Photos: save the client's photo as client/public/img/clients/<photo> (square, 200×200 or larger)
// and, if you have it, a photo of their completed home as client/public/img/clients/<home>.
// Until a client photo is added the card shows initials; `homeFallback` is used for the home photo.
export const REVIEWS = [
  { name: 'Mr. Sreedhar Reddy', place: 'Suchitra, Hyderabad', photo: 'sreedhar-reddy.jpg', home: 'sreedhar-reddy-home.jpg', homeFallback: '/img/living-1.jpg',
    project: 'Trividya College', text: 'Deeraj Interiors provided exceptional, timely and professional designs for Trividya College.' },
  { name: 'Mr. Anvesh Reddy', place: 'Alwal, Hyderabad', photo: 'anvesh-reddy.jpg', home: 'anvesh-reddy-home.jpg', homeFallback: '/img/kitchen-1.jpg',
    project: '', text: 'The quality of materials and finishing is outstanding.' },
  { name: 'Dr. Ratnakar', place: 'Kompally, Hyderabad', photo: 'ratnakar.jpg', home: 'ratnakar-home.jpg', homeFallback: '/img/bedroom-1.jpg',
    project: '', text: 'Very transparent pricing with no hidden costs.' }
];

const initials = (name) => name.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

function Avatar({ r, size = '' }) {
  const [failed, setFailed] = useState(!r.photo);
  return (
    <span className={'tf-avatar ' + size}>
      {failed
        ? <span className="tf-initials" aria-hidden="true">{initials(r.name)}</span>
        : <img src={`/img/clients/${r.photo}`} alt="" loading="lazy" onError={() => setFailed(true)} />}
    </span>
  );
}

function HomePhoto({ r }) {
  const [src, setSrc] = useState(r.home ? `/img/clients/${r.home}` : r.homeFallback);
  return <img className="tf-home" src={src} alt="" loading="lazy" onError={() => src !== r.homeFallback && setSrc(r.homeFallback)} />;
}

const Pin = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
);

function FlipCard({ r, copy = false }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={'tf-card' + (flipped ? ' is-flipped' : '')} aria-hidden={copy || undefined}>
      <button type="button" tabIndex={copy ? -1 : undefined} className="tf-inner" aria-pressed={flipped} aria-label={`${r.name}, ${r.place}. ${flipped ? 'Showing review' : 'Show review'}`}
        onClick={() => setFlipped((f) => !f)}>
        {/* front */}
        <span className="tf-face tf-front">
          <span className="tf-photo"><HomePhoto r={r} /></span>
          <Avatar r={r} />
          <span className="tf-name">{r.name}</span>
          <span className="tf-place"><Pin />{r.place}</span>
          {r.project && <span className="tf-chip">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5V21H3z" /><path d="M9 21v-6h6v6" /></svg>
            {r.project}
          </span>}
          <span className="tf-hint" aria-hidden="true">Hover or tap to read review ↻</span>
        </span>
        {/* back */}
        <span className="tf-face tf-back">
          <span className="tf-q" aria-hidden="true">“</span>
          <span className="tf-stars" aria-label="Rated 5 out of 5">★★★★★</span>
          <span className="tf-text">“{r.text}”</span>
          <span className="tf-by"><Avatar r={r} size="sm" /><span><b>{r.name}</b><small>{r.place}</small></span></span>
        </span>
      </button>
    </div>
  );
}

// Reviews scroll slowly from right to left in an endless loop.
// The set is repeated so the strip never runs out; hovering (or tapping a card) pauses it.
const SPEED = 9; // seconds per card — raise to scroll slower

export default function Testimonials() {
  const [paused, setPaused] = useState(false);
  const resume = useRef(null);
  // on phones: pause while touching, then carry on 6 seconds later
  const touchEnd = () => { clearTimeout(resume.current); resume.current = setTimeout(() => setPaused(false), 6000); };
  useEffect(() => () => clearTimeout(resume.current), []);
  const reps = REVIEWS.length < 5 ? 2 : 1; // enough cards to fill wide screens
  const half = Array.from({ length: reps }).flatMap(() => REVIEWS);
  const track = [...half, ...half];
  return (
    <div className={'tf-marquee' + (paused ? ' is-paused' : '')}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      onTouchStart={() => { clearTimeout(resume.current); setPaused(true); }} onTouchEnd={touchEnd}>
      <div className="tf-track" style={{ animationDuration: `${half.length * SPEED}s` }}>
        {track.map((r, i) => (
          <div className="tf-slide" key={i}><FlipCard r={r} copy={i >= REVIEWS.length} /></div>
        ))}
      </div>
    </div>
  );
}
