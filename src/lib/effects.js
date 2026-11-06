// Page animations: scroll reveal, count-up numbers, 3D card tilt, About tabs, Home hero slider.
// Each init function takes the page root and returns a cleanup function.

const reduce = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const REVEAL = '.sec-head, .card, .pcard, .lcard, .loc, .client, .stat, .quote, .cta, .split-col > .ph, .faq details, .flow-wrap .stage, .perk, '
  + '.ab2-tile, .ab2-visit, .ab2-strip figure, .ab2-team, .mf-mat, .mf-ideal, .mf-team, .mf-strip figure, .mf-show figure, .mf-why li, .mf-cta, '
  + '.sv-tile, .sv-styles li, .sv-why, .sv-steps li, .sv-quote, .sv-benefits > div, .sv-transform, .sv-nav a';

function countUp(el) {
  const to = +el.getAttribute('data-count');
  if (reduce() || !to) return;
  const s = performance.now();
  (function f(n) {
    const k = Math.min(1, (n - s) / 1600);
    const e = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(to * e).toLocaleString('en-IN');
    if (k < 1) requestAnimationFrame(f);
  })(s);
}

export function initReveal(root) {
  if (!root || reduce() || !window.IntersectionObserver) return () => {};
  const timers = [];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('rv-in');
      io.unobserve(el);
      el.querySelectorAll('[data-count]').forEach(countUp);
      if (el.hasAttribute('data-count')) countUp(el);
      timers.push(setTimeout(() => { el.classList.remove('rv-wait', 'rv-in'); el.style.transitionDelay = ''; }, 1400));
    });
  }, { threshold: 0.12 });
  root.querySelectorAll(REVEAL).forEach((el) => {
    const sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    // cards inside Bootstrap columns: stagger by the column position instead
    const col = el.parentElement && el.parentElement.classList.contains('col') ? el.parentElement : null;
    const idx = col ? Array.prototype.indexOf.call(col.parentElement.children, col) : sib;
    el.classList.add('rv-wait');
    el.style.transitionDelay = (Math.min(idx, 6) * 70) + 'ms';
    io.observe(el);
  });
  return () => { io.disconnect(); timers.forEach(clearTimeout); };
}

/** Subtle 3D tilt + glare on cards under the mouse (desktop only). Installed once for the whole app. */
let tiltOn = false;
export function initTilt() {
  if (tiltOn || reduce() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  tiltOn = true;
  let cur = null;
  const untilt = (c) => { c.classList.remove('tilting'); c.style.transform = ''; };
  document.addEventListener('pointermove', (e) => {
    const c = e.target.closest ? e.target.closest('.pcard, .card, .lcard, .loc, .prod, .client') : null;
    if (c !== cur) { if (cur) untilt(cur); cur = c; }
    if (!c || c.classList.contains('rv-wait') || c.closest('.modal, .offcanvas, .admin')) return;
    const r = c.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    if (!c.querySelector(':scope > .glare')) { const gl = document.createElement('span'); gl.className = 'glare'; c.appendChild(gl); }
    c.classList.add('tilt', 'tilting');
    c.style.transform = `perspective(900px) rotateY(${((px - 0.5) * 9).toFixed(2)}deg) rotateX(${((0.5 - py) * 9).toFixed(2)}deg) translateY(-4px)`;
    c.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
    c.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
  });
  document.addEventListener('pointerleave', () => { if (cur) { untilt(cur); cur = null; } });
}

/** About page: leadership tabs with keyboard arrows. */
export function initTabs(root) {
  const tabs = Array.from(root.querySelectorAll('.ab2-tabs [role="tab"]'));
  if (!tabs.length) return () => {};
  const pick = (t, focus) => {
    tabs.forEach((x) => {
      const on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      const panel = root.querySelector('#' + x.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) t.focus();
  };
  const offs = tabs.map((t, i) => {
    const click = () => pick(t);
    const key = (e) => {
      let n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); pick(n, true); }
    };
    t.addEventListener('click', click);
    t.addEventListener('keydown', key);
    return () => { t.removeEventListener('click', click); t.removeEventListener('keydown', key); };
  });
  return () => offs.forEach((f) => f());
}

/** Home page: hero photo slider with dots. */
export function initHeroSlider(root) {
  const slides = root.querySelectorAll('.h-slide');
  const dots = root.querySelectorAll('.h-dots button');
  if (!slides.length) return () => {};
  let i = 0;
  let timer = null;
  const show = (n) => {
    i = n;
    slides.forEach((s, j) => s.classList.toggle('on', j === n));
    dots.forEach((d, j) => d.setAttribute('aria-pressed', String(j === n)));
  };
  const start = () => { if (reduce()) return; clearInterval(timer); timer = setInterval(() => show((i + 1) % slides.length), 6000); };
  const offs = Array.from(dots).map((d, j) => { const f = () => { show(j); start(); }; d.addEventListener('click', f); return () => d.removeEventListener('click', f); });
  start();
  return () => { clearInterval(timer); offs.forEach((f) => f()); };
}
