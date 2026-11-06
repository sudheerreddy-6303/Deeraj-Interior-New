/* eslint-disable */
// Deeraj Interiors 3D engine: procedural Three.js scenes (kitchens, bedrooms, wardrobes,
// TV units, office, factory assembly, towers, storefront, product turntable, map),
// the live viewer, and the kitchen/design studio finish pickers.
// React pages call mountPage(name) after rendering; it returns a cleanup function.
import * as THREE_NS from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const THREE = Object.assign({}, THREE_NS, { OrbitControls });

function setText(id, v) { var e = document.getElementById(id); if (e) e.textContent = v; }
function setHref(id, v) { var e = document.getElementById(id); if (e) e.href = v; }
function setHidden(id, v) { var e = document.getElementById(id); if (e) e.hidden = v; }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* ================= 3D ================= */
  var has3D = !!(THREE && THREE.OrbitControls) && (function () { try { var c = document.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { return false; } })();
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T = {};
  function mkTex(size, draw, rx, ry) { var c = document.createElement('canvas'); c.width = c.height = size; draw(c.getContext('2d'), size); var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx || 1, ry || 1); t.anisotropy = 4; return t; }
  function rnd(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  function textures() {
    if (T.ready || !THREE) return T;
    T.walnut = mkTex(512, function (g, s) { g.fillStyle = '#6a4329'; g.fillRect(0, 0, s, s); var r = rnd(7); for (var i = 0; i < 140; i++) { var x = r() * s, a = 0.08 + r() * 0.22; g.strokeStyle = r() > 0.5 ? 'rgba(40,22,10,' + a + ')' : 'rgba(150,100,62,' + a + ')'; g.lineWidth = 1 + r() * 3; g.beginPath(); g.moveTo(x, 0); for (var y = 0; y <= s; y += 32) g.lineTo(x + Math.sin(y / 60 + i) * 6, y); g.stroke(); } });
    T.marble = mkTex(512, function (g, s) { g.fillStyle = '#f2efea'; g.fillRect(0, 0, s, s); var r = rnd(3); for (var i = 0; i < 9; i++) { g.strokeStyle = 'rgba(120,115,110,' + (0.18 + r() * 0.3) + ')'; g.lineWidth = 0.6 + r() * 2.2; g.beginPath(); var x = r() * s, y = 0; g.moveTo(x, y); while (y < s) { x += (r() - 0.45) * 40; y += 20 + r() * 30; g.lineTo(x, y); } g.stroke(); } });
    T.granite = mkTex(256, function (g, s) { g.fillStyle = '#1b1b1d'; g.fillRect(0, 0, s, s); var r = rnd(11); for (var i = 0; i < 1600; i++) { var v = 60 + r() * 120; g.fillStyle = 'rgba(' + v + ',' + v + ',' + (v + 8) + ',' + (0.3 + r() * 0.5) + ')'; g.fillRect(r() * s, r() * s, 1 + r() * 1.5, 1 + r() * 1.5); } }, 3, 3);
    T.tileFloor = mkTex(512, function (g, s) { g.fillStyle = '#e6dfd4'; g.fillRect(0, 0, s, s); g.fillStyle = '#cfc5b7'; for (var i = 0; i <= 2; i++) { g.fillRect(i * s / 2 - 2, 0, 4, s); g.fillRect(0, i * s / 2 - 2, s, 4); } }, 5, 4);
    T.wood = mkTex(512, function (g, s) { var r = rnd(19); for (var i = 0; i < 8; i++) { var c = 150 + r() * 25; g.fillStyle = 'rgb(' + (c + 25 | 0) + ',' + (c - 5 | 0) + ',' + (c - 45 | 0) + ')'; g.fillRect(0, i * s / 8, s, s / 8); g.fillStyle = 'rgba(70,45,25,.35)'; g.fillRect(0, i * s / 8, s, 2); g.fillRect((r() * s) | 0, i * s / 8, 2, s / 8); for (var k = 0; k < 18; k++) { g.fillStyle = 'rgba(90,60,35,' + r() * 0.12 + ')'; g.fillRect(0, i * s / 8 + r() * s / 8, s, 1); } } }, 3, 3);
    T.tile = mkTex(256, function (g, s) { g.fillStyle = '#f4f1ec'; g.fillRect(0, 0, s, s); g.fillStyle = '#d8d1c6'; for (var row = 0; row < 8; row++) { g.fillRect(0, row * s / 8, s, 2); var off = row % 2 ? s / 4 : 0; for (var c = 0; c < 3; c++) g.fillRect(off + c * s / 2, row * s / 8, 2, s / 8); } }, 6, 2);
    function woodTex(seed, base, dark, light) { return mkTex(512, function (g, s) { g.fillStyle = base; g.fillRect(0, 0, s, s); var r = rnd(seed); for (var i = 0; i < 150; i++) { var x = r() * s, a = 0.06 + r() * 0.2; g.strokeStyle = r() > 0.5 ? 'rgba(' + dark + ',' + a + ')' : 'rgba(' + light + ',' + a + ')'; g.lineWidth = 1 + r() * 3; g.beginPath(); g.moveTo(x, 0); for (var y = 0; y <= s; y += 32) g.lineTo(x + Math.sin(y / 70 + i) * 5, y); g.stroke(); } }); }
    function stoneTex(seed, base, vein, vw, n) { return mkTex(512, function (g, s) { g.fillStyle = base; g.fillRect(0, 0, s, s); var r = rnd(seed); for (var i = 0; i < n; i++) { g.strokeStyle = vein.replace('A', (0.25 + r() * 0.45).toFixed(2)); g.lineWidth = 0.6 + r() * vw; g.beginPath(); var x = r() * s, y = 0; g.moveTo(x, y); while (y < s) { x += (r() - 0.45) * 46; y += 18 + r() * 30; g.lineTo(x, y); } g.stroke(); } }); }
    function speckTex(seed, base, cols, n, size) { return mkTex(256, function (g, s) { g.fillStyle = base; g.fillRect(0, 0, s, s); var r = rnd(seed); for (var i = 0; i < n; i++) { g.fillStyle = cols[(r() * cols.length) | 0]; var z = 1 + r() * size; g.fillRect(r() * s, r() * s, z, z); } }, 3, 3); }
    T.oak = woodTex(17, '#c9a77a', '110,75,40', '235,210,170');
    T.teak = woodTex(29, '#9a5f32', '70,35,12', '200,140,90');
    T.calacatta = stoneTex(41, '#f4f1ec', 'rgba(184,146,70,A)', 2.6, 8);
    T.nero = stoneTex(53, '#18181a', 'rgba(235,235,235,A)', 1.8, 10);
    T.kashmir = speckTex(61, '#d9c8ad', ['rgba(120,90,60,.7)', 'rgba(250,240,225,.8)', 'rgba(90,70,50,.6)', 'rgba(170,60,40,.5)'], 1800, 2.2);
    T.concrete = speckTex(67, '#9d9a95', ['rgba(80,78,75,.35)', 'rgba(200,198,194,.35)', 'rgba(120,118,114,.4)'], 2600, 3);
    T.terrazzo = speckTex(71, '#efe9e1', ['#c2410c', '#8c9b87', '#3b3a3c', '#e8b25f', '#b9a68e'], 420, 7);
    T.oakTop = woodTex(83, '#c49a68', '100,65,35', '230,200,160'); T.oakTop.repeat.set(2, 1);
    T.ready = true; return T;
  }
  function chipCss(f) { return f.chip; }
  var FIN = null;
  function finishes() {
    if (FIN) return FIN; var t = textures();
    FIN = {
      shutter: [
        { id: 'acrylic', name: 'Acrylic white', chip: '#f2efe9', color: 0xf2efe9, rough: 0.12, metal: 0 },
        { id: 'walnut', name: 'Walnut laminate', chip: 'repeating-linear-gradient(90deg,#6a4329 0 3px,#7d5235 3px 5px,#5b3820 5px 8px)', color: 0xffffff, rough: 0.55, metal: 0, map: t.walnut },
        { id: 'sage', name: 'Sage PU', chip: '#8c9b87', color: 0x8c9b87, rough: 0.38, metal: 0 },
        { id: 'graphite', name: 'Graphite matte', chip: '#3b3a3c', color: 0x3b3a3c, rough: 0.82, metal: 0 },
        { id: 'oak', name: 'Light oak', chip: 'repeating-linear-gradient(90deg,#c9a77a 0 3px,#d8b88c 3px 5px,#b8946a 5px 8px)', color: 0xffffff, rough: 0.55, metal: 0, map: t.oak },
        { id: 'teak', name: 'Teak veneer', chip: 'repeating-linear-gradient(90deg,#9a5f32 0 3px,#a86c3d 3px 5px,#7e4b25 5px 8px)', color: 0xffffff, rough: 0.42, metal: 0, map: t.teak },
        { id: 'ivory', name: 'Ivory matte', chip: '#e8dfcf', color: 0xe8dfcf, rough: 0.85, metal: 0 },
        { id: 'cashmere', name: 'Cashmere grey', chip: '#b8b0a6', color: 0xb8b0a6, rough: 0.6, metal: 0 },
        { id: 'olive', name: 'Olive green', chip: '#6b7350', color: 0x6b7350, rough: 0.42, metal: 0 },
        { id: 'navy', name: 'Navy blue', chip: '#2c3e57', color: 0x2c3e57, rough: 0.4, metal: 0 },
        { id: 'terra', name: 'Terracotta lacquer', chip: '#b4532a', color: 0xb4532a, rough: 0.28, metal: 0 },
        { id: 'noir', name: 'Glossy black', chip: '#151517', color: 0x151517, rough: 0.08, metal: 0.1 }
      ],
      counter: [
        { id: 'quartz', name: 'White quartz', chip: '#eeeae4', color: 0xeeeae4, rough: 0.22, metal: 0 },
        { id: 'marble', name: 'Statuario marble', chip: 'linear-gradient(135deg,#f2efea 40%,#a9a39b 44%,#f2efea 48%)', color: 0xffffff, rough: 0.18, metal: 0, map: t.marble },
        { id: 'granite', name: 'Black granite', chip: 'radial-gradient(circle at 30% 30%,#55555a 0 2px,transparent 3px),#1b1b1d', color: 0xffffff, rough: 0.15, metal: 0.1, map: t.granite },
        { id: 'calacatta', name: 'Calacatta gold', chip: 'linear-gradient(135deg,#f4f1ec 38%,#c9a45c 42%,#f4f1ec 46%,#f4f1ec 70%,#d8bd85 73%,#f4f1ec 76%)', color: 0xffffff, rough: 0.16, metal: 0, map: t.calacatta },
        { id: 'nero', name: 'Nero Marquina', chip: 'linear-gradient(135deg,#18181a 40%,#e6e6e6 43%,#18181a 46%)', color: 0xffffff, rough: 0.14, metal: 0.05, map: t.nero },
        { id: 'kashmir', name: 'Kashmir beige', chip: 'radial-gradient(circle at 30% 35%,#7a5a3c 0 2px,transparent 3px),radial-gradient(circle at 65% 60%,#f8efe0 0 2px,transparent 3px),#d9c8ad', color: 0xffffff, rough: 0.2, metal: 0, map: t.kashmir },
        { id: 'concrete', name: 'Concrete grey', chip: '#9d9a95', color: 0xffffff, rough: 0.75, metal: 0, map: t.concrete },
        { id: 'terrazzo', name: 'Terrazzo', chip: 'radial-gradient(circle at 25% 30%,#c2410c 0 3px,transparent 4px),radial-gradient(circle at 70% 40%,#8c9b87 0 3px,transparent 4px),radial-gradient(circle at 45% 72%,#3b3a3c 0 2px,transparent 3px),#efe9e1', color: 0xffffff, rough: 0.35, metal: 0, map: t.terrazzo },
        { id: 'oaktop', name: 'Oak wood', chip: 'repeating-linear-gradient(90deg,#c49a68 0 3px,#d4ae80 3px 5px,#b0875a 5px 8px)', color: 0xffffff, rough: 0.5, metal: 0, map: t.oakTop }
      ],
      handle: [
        { id: 'black', name: 'Black profile', chip: '#1c1c1c', color: 0x1c1c1c, rough: 0.35, metal: 0.6 },
        { id: 'brass', name: 'Brushed brass', chip: 'linear-gradient(135deg,#d9b46e,#9b7434)', color: 0xb8904c, rough: 0.32, metal: 0.9 },
        { id: 'chrome', name: 'Chrome', chip: 'linear-gradient(135deg,#f2f4f6,#9aa1a8 55%,#e6e9ec)', color: 0xd5d8dc, rough: 0.12, metal: 1 },
        { id: 'rosegold', name: 'Rose gold', chip: 'linear-gradient(135deg,#e2a493,#a8634f)', color: 0xb76e5a, rough: 0.3, metal: 0.9 },
        { id: 'gunmetal', name: 'Gunmetal', chip: 'linear-gradient(135deg,#6a6e74,#34373b)', color: 0x4a4d52, rough: 0.35, metal: 0.8 },
        { id: 'gola', name: 'Handleless', chip: 'linear-gradient(180deg,#fffdfa 45%,#2a2a2a 45% 55%,#fffdfa 55%)', hidden: true }
      ]
    };
    return FIN;
  }
  function find(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return list[0]; }
  function applyFin(mat, f) { mat.color.setHex(f.color); mat.roughness = f.rough; mat.metalness = f.metal; mat.map = f.map || null; mat.needsUpdate = true; }

  var CFG = { base: 'walnut', upper: 'acrylic', counter: 'quartz', handle: 'black', led: true };

  function M(o) { return new THREE.MeshStandardMaterial(o); }

  /* ---- scene builders: each returns { views, az:[min,max], mats, handles, leds } ---- */
  function common(ctx) {
    var t = textures(), mats = {
      base: M({}), upper: M({}), counter: M({}), handle: M({}),
      carcass: M({ color: 0xe9e5df, roughness: 0.7 }), plinth: M({ color: 0x2a2622, roughness: 0.6 }),
      wall: M({ color: 0xf1ebe3, roughness: 0.95 }), wall2: M({ color: 0xe7dfd4, roughness: 0.95 }),
      tileFloor: M({ map: t.tileFloor, roughness: 0.4 }), wood: M({ map: t.wood, roughness: 0.55 }), tile: M({ map: t.tile, roughness: 0.3 }),
      steel: M({ color: 0xb9bcc0, roughness: 0.28, metalness: 0.85 }), glass: M({ color: 0x0e0e10, roughness: 0.08, metalness: 0.2 }),
      hood: M({ color: 0x2b2b2d, roughness: 0.35, metalness: 0.6 }), sky: M({ color: 0xdfeaf5, emissive: 0xcfe0f2, emissiveIntensity: 0.65 }),
      frame: M({ color: 0xf6f3ee, roughness: 0.5 }), led: M({ color: 0xffe2b0, emissive: 0xffd08a, emissiveIntensity: 1.2 }),
      walnutSolid: M({ map: t.walnut, roughness: 0.5 }), marble: M({ map: t.marble, roughness: 0.2 }), acrylic: M({ color: 0xf2efe9, roughness: 0.14 }),
      fabric: M({ color: 0xcbbba6, roughness: 0.95 }), fabricDark: M({ color: 0x8d8780, roughness: 0.95 }), linen: M({ color: 0xf6f3ee, roughness: 0.9 }),
      terracotta: M({ color: 0xc2410c, roughness: 0.9 }), leaf: M({ color: 0x5d7a52, roughness: 0.8 }), pot: M({ color: 0xa65a35, roughness: 0.85 }),
      brass: M({ color: 0xb8904c, roughness: 0.32, metalness: 0.9 }), warm: M({ color: 0xfff1d6, emissive: 0xffd9a0, emissiveIntensity: 0.9 }),
      duvet: M({ color: 0x51708f, roughness: 0.92 }), rug: M({ color: 0xb9a68e, roughness: 1 }), glassClear: M({ color: 0xffffff, roughness: 0.05, transparent: true, opacity: 0.18 })
    };
    var scene = ctx.root;
    function box(w, h, d, mat, x, y, z, parent, noShadow) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.castShadow = !noShadow; m.receiveShadow = true; (parent || scene).add(m); return m; }
    function cyl(r1, r2, h, mat, x, y, z, seg) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg || 20), mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m; }
    function sph(r, mat, x, y, z) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat); m.position.set(x, y, z); m.castShadow = true; scene.add(m); return m; }
    return { mats: mats, box: box, cyl: cyl, sph: sph, handles: [], leds: [] };
  }
  function lights(ctx, strength) {
    var s = ctx.scene;
    s.add(new THREE.HemisphereLight(0xfff6ea, 0x8a7a6a, 0.62));
    s.add(new THREE.AmbientLight(0xffffff, 0.12));
    var sun = new THREE.DirectionalLight(0xfff1dd, strength || 0.75); sun.position.set(4.5, 5.5, 4.2); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
    var c = sun.shadow.camera; c.left = -5; c.right = 5; c.top = 5; c.bottom = -5; c.near = 1; c.far = 18; sun.shadow.bias = -0.0008; s.add(sun);
  }
  function roomShell(k, floorMat) {
    k.box(4.6, 0.02, 4.2, floorMat, 2.3, -0.01, 2.1, null, true);
    k.box(4.6, 2.6, 0.05, k.mats.wall, 2.3, 1.3, -0.025);
    k.box(0.05, 2.6, 4.2, k.mats.wall2, -0.025, 1.3, 2.1);
  }
  function addWindow(k, z, y, w, h) {
    k.box(0.02, h + 0.1, w + 0.1, k.mats.frame, 0.012, y, z, null, true);
    k.box(0.022, h, w, k.mats.sky, 0.014, y, z, null, true);
    k.box(0.024, h, 0.03, k.mats.frame, 0.016, y, z, null, true);
  }

  function buildKitchen(ctx) {
    var k = common(ctx), mats = k.mats, box = k.box; lights(ctx); roomShell(k, mats.tileFloor);
    var wl = new THREE.PointLight(0xe8f1ff, 0.35, 4); wl.position.set(0.6, 1.6, 1.05); ctx.root.add(wl);
    function unit(parent, x0, w, kind, layout, sm) {
      var g = new THREE.Group(); g.position.x = x0; parent.add(g);
      var gap = 0.004, t = 0.018, y0 = kind === 'upper' ? 1.45 : 0.1, h = kind === 'upper' ? 0.72 : (kind === 'tall' ? 2.07 : 0.75), d = kind === 'upper' ? 0.35 : 0.6;
      if (kind !== 'upper') box(w, 0.1, d - 0.08, mats.plinth, w / 2, 0.05, (d - 0.08) / 2, g);
      box(w - 0.004, h, d - t - 0.002, mats.carcass, w / 2, y0 + h / 2, (d - t - 0.002) / 2, g);
      var zf = d - t / 2, P = [], up = kind === 'upper' ? 'bottom' : 'top';
      if (layout === 'drawers3') { var yy = y0 + h; [0.24, 0.38, 0.38].forEach(function (f) { var ph = h * f - gap * 1.5; P.push([w / 2, yy - gap - ph / 2, w - 2 * gap, ph, 'top']); yy -= h * f; }); }
      else if (layout === 'drawers2') { var tp = h * 0.4, bt = h * 0.6; P.push([w / 2, y0 + h - gap - (tp - 2 * gap) / 2, w - 2 * gap, tp - 2 * gap, 'top']); P.push([w / 2, y0 + gap + (bt - gap) / 2, w - 2 * gap, bt - gap, 'top']); }
      else if (layout === 'doors2') { var pw = (w - 3 * gap) / 2; P.push([gap + pw / 2, y0 + h / 2, pw, h - 2 * gap, up]); P.push([2 * gap + pw * 1.5, y0 + h / 2, pw, h - 2 * gap, up]); }
      else if (layout === 'tall') { P.push([w / 2, y0 + 0.425, w - 2 * gap, 0.85 - 2 * gap, 'vu']); P.push([w / 2, y0 + 0.85 + (h - 0.85) / 2, w - 2 * gap, h - 0.85 - 2 * gap, 'vd']); }
      else P.push([w / 2, y0 + h / 2, w - 2 * gap, h - 2 * gap, layout === 'blind' ? 'none' : up]);
      P.forEach(function (p) {
        box(p[2], p[3], t, sm, p[0], p[1], zf, g); var hm, zz = zf + t / 2 + 0.011;
        if (p[4] === 'top') hm = box(Math.min(p[2] * 0.7, 0.5), 0.012, 0.022, mats.handle, p[0], p[1] + p[3] / 2 - 0.035, zz, g);
        else if (p[4] === 'bottom') hm = box(Math.min(p[2] * 0.7, 0.4), 0.012, 0.022, mats.handle, p[0], p[1] - p[3] / 2 + 0.035, zz, g);
        else if (p[4] === 'vu') hm = box(0.012, 0.3, 0.022, mats.handle, p[0] + p[2] / 2 - 0.04, p[1] + p[3] / 2 - 0.2, zz, g);
        else if (p[4] === 'vd') hm = box(0.012, 0.3, 0.022, mats.handle, p[0] + p[2] / 2 - 0.04, p[1] - p[3] / 2 + 0.2, zz, g);
        if (hm) k.handles.push(hm);
      });
    }
    var back = new THREE.Group(); ctx.root.add(back);
    unit(back, 0, 0.6, 'base', 'blind', mats.base); unit(back, 0.6, 0.6, 'base', 'drawers3', mats.base); unit(back, 1.2, 0.9, 'base', 'drawers2', mats.base);
    unit(back, 2.1, 0.6, 'base', 'doors1', mats.base); unit(back, 2.7, 0.6, 'tall', 'tall', mats.base);
    unit(back, 0, 0.6, 'upper', 'doors1', mats.upper); unit(back, 0.6, 0.6, 'upper', 'doors1', mats.upper); unit(back, 2.1, 0.6, 'upper', 'doors1', mats.upper);
    function left(z0, w, kind, layout, m) { var g = new THREE.Group(); g.rotation.y = Math.PI / 2; g.position.set(0, 0, z0 + w); ctx.root.add(g); unit(g, 0, w, kind, layout, m); }
    left(0.6, 0.9, 'base', 'doors2', mats.base); left(1.5, 0.6, 'base', 'drawers3', mats.base); left(2.1, 0.6, 'base', 'doors1', mats.base);
    left(1.5, 0.6, 'upper', 'doors1', mats.upper); left(2.1, 0.6, 'upper', 'doors1', mats.upper);
    box(2.72, 0.04, 0.63, mats.counter, 1.36, 0.87, 0.315); box(0.63, 0.04, 2.08, mats.counter, 0.315, 0.87, 1.67);
    box(2.7, 0.56, 0.012, mats.tile, 1.35, 1.17, 0.006, null, true); box(0.012, 0.56, 2.7, mats.tile, 0.006, 1.17, 1.35, null, true);
    box(0.42, 0.006, 0.72, mats.steel, 0.32, 0.892, 1.05); box(0.36, 0.008, 0.64, M({ color: 0x55585c, roughness: 0.3, metalness: 0.8 }), 0.33, 0.895, 1.05);
    k.cyl(0.014, 0.018, 0.32, mats.steel, 0.07, 1.05, 1.05); box(0.16, 0.022, 0.022, mats.steel, 0.15, 1.2, 1.05);
    box(0.76, 0.008, 0.5, mats.glass, 1.65, 0.894, 0.31);
    [[-0.2, -0.1], [0.2, -0.1], [-0.2, 0.12], [0.2, 0.12]].forEach(function (o) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 8, 28), M({ color: 0x8a8a8a, roughness: 0.4, metalness: 0.7 })); r.rotation.x = Math.PI / 2; r.position.set(1.65 + o[0], 0.902, 0.31 + o[1]); ctx.root.add(r); });
    box(0.9, 0.1, 0.5, mats.hood, 1.65, 1.66, 0.25); box(0.32, 0.84, 0.26, mats.hood, 1.65, 2.13, 0.13);
    addWindow(k, 1.05, 1.68, 0.82, 0.72);
    [[0.6, 1.443, 0.3, 1.18, 0.012, 0.02], [2.4, 1.443, 0.3, 0.56, 0.012, 0.02], [0.3, 1.443, 2.1, 0.02, 0.012, 1.16]].forEach(function (b) { k.leds.push(box(b[3], b[4], b[5], mats.led, b[0], b[1], b[2], null, true)); });
    [[0.6, 1.38, 0.35], [2.4, 1.38, 0.35], [0.35, 1.38, 2.1]].forEach(function (p) { var l = new THREE.PointLight(0xffd59a, 0.45, 1.6, 2); l.position.set(p[0], p[1], p[2]); ctx.root.add(l); k.leds.push(l); });
    // stools + bowl for life
    k.cyl(0.18, 0.18, 0.04, mats.walnutSolid, 1.5, 0.66, 1.25); k.cyl(0.02, 0.02, 0.64, mats.hood, 1.5, 0.32, 1.25);
    k.sph(0.09, M({ color: 0xd88a3a, roughness: 0.6 }), 2.3, 0.97, 0.3);
    k.views = { corner: { p: [4.3, 2.35, 4.5], t: [1.3, 0.95, 1.15] }, front: { p: [1.55, 1.45, 4.9], t: [1.45, 1.0, 0.6] }, top: { p: [2.0, 5.6, 2.2], t: [1.3, 0.6, 1.2] } };
    k.az = [0.02, 1.55];
    return k;
  }

  function buildLiving(ctx) {
    var k = common(ctx), m = k.mats, box = k.box; lights(ctx, 0.7); roomShell(k, m.wood);
    // TV wall: marble panel + walnut slats + floating console
    box(2.4, 2.25, 0.04, m.marble, 2.0, 1.27, 0.02);
    for (var i = 0; i < 7; i++) box(0.045, 2.45, 0.045, m.walnutSolid, 0.42 + i * 0.075, 1.225, 0.035);
    box(2.3, 0.3, 0.42, m.walnutSolid, 2.0, 0.42, 0.21);
    for (var j = 0; j < 3; j++) box(0.74, 0.24, 0.01, m.acrylic, 1.24 + j * 0.76, 0.42, 0.425);
    box(1.45, 0.82, 0.035, m.glass, 2.0, 1.45, 0.065);
    box(2.3, 0.02, 0.02, m.warm, 2.0, 0.27, 0.36, null, true);
    // display cabinet with lit shelves
    box(0.62, 2.2, 0.4, m.walnutSolid, 3.62, 1.1, 0.2);
    box(0.54, 2.08, 0.37, M({ color: 0x2c2018, roughness: 0.7 }), 3.62, 1.1, 0.205);
    [0.45, 0.85, 1.25, 1.65].forEach(function (y, n) { box(0.54, 0.02, 0.36, m.warm, 3.62, y, 0.2, null, true); k.sph(0.05 + (n % 2) * 0.02, m.brass, 3.55 + (n % 2) * 0.12, y + 0.08, 0.2); });
    box(0.56, 2.1, 0.01, m.glassClear, 3.62, 1.1, 0.405, null, true);
    var cl = new THREE.PointLight(0xffd59a, 0.5, 1.8, 2); cl.position.set(3.62, 1.2, 0.5); ctx.root.add(cl);
    // rug, sofa, coffee table
    box(2.9, 0.01, 2.0, m.rug, 2.0, 0.006, 2.35, null, true);
    box(2.4, 0.42, 0.95, m.fabric, 2.0, 0.21, 3.1); box(2.4, 0.5, 0.22, m.fabric, 2.0, 0.66, 3.47);
    box(0.2, 0.6, 0.95, m.fabric, 0.7, 0.3, 3.1); box(0.2, 0.6, 0.95, m.fabric, 3.3, 0.3, 3.1);
    [1.22, 2.0, 2.78].forEach(function (x) { box(0.74, 0.12, 0.72, m.linen, x, 0.48, 3.02); });
    var p1 = box(0.42, 0.36, 0.12, m.terracotta, 1.05, 0.68, 3.28); p1.rotation.z = 0.12;
    var p2 = box(0.42, 0.36, 0.12, m.fabricDark, 2.95, 0.68, 3.28); p2.rotation.z = -0.12;
    box(1.15, 0.05, 0.62, m.marble, 2.0, 0.4, 1.95); box(0.92, 0.36, 0.46, m.walnutSolid, 2.0, 0.19, 1.95);
    k.cyl(0.07, 0.05, 0.16, m.acrylic, 1.8, 0.5, 1.9); k.sph(0.06, m.leaf, 1.8, 0.62, 1.9);
    // plant + floor lamp
    k.cyl(0.17, 0.13, 0.42, m.pot, 4.05, 0.21, 1.25);
    [[4.05, 0.62, 1.25, 0.2], [3.95, 0.82, 1.2, 0.16], [4.13, 0.9, 1.32, 0.14], [4.02, 1.05, 1.22, 0.12]].forEach(function (s) { k.sph(s[3], m.leaf, s[0], s[1], s[2]); });
    k.cyl(0.015, 0.015, 1.5, m.hood, 0.35, 0.75, 3.4); k.cyl(0.12, 0.2, 0.28, m.warm, 0.35, 1.55, 3.4);
    var fl = new THREE.PointLight(0xffcf8a, 0.55, 3, 2); fl.position.set(0.35, 1.4, 3.3); ctx.root.add(fl);
    addWindow(k, 2.0, 1.5, 1.2, 1.3);
    k.views = { front: { p: [2.1, 1.75, 6.4], t: [2.0, 0.95, 1.4] }, corner: { p: [5.0, 2.3, 5.4], t: [1.9, 0.95, 1.4] }, top: { p: [2.3, 6.4, 2.8], t: [2.0, 0.4, 1.9] } };
    k.az = [-0.6, 1.1];
    return k;
  }

  function buildBedroom(ctx) {
    var k = common(ctx), m = k.mats, box = k.box; lights(ctx, 0.7); roomShell(k, m.wood);
    var glow = M({ color: 0xf1e3cf, emissive: 0xf4dcb6, emissiveIntensity: 0.28, roughness: 0.9 });
    box(2.7, 1.55, 0.02, glow, 2.4, 1.48, 0.012, null, true);
    for (var i = 0; i < 7; i++) box(0.26, 1.15, 0.08, m.fabricDark, 1.5 + i * 0.3, 0.9, 0.06);
    box(1.95, 0.32, 2.1, m.walnutSolid, 2.4, 0.16, 1.15); box(1.84, 0.22, 2.0, m.linen, 2.4, 0.43, 1.17);
    box(1.88, 0.05, 1.3, m.duvet, 2.4, 0.565, 1.55); box(1.88, 0.06, 0.25, m.linen, 2.4, 0.57, 0.95);
    box(0.62, 0.14, 0.38, m.linen, 2.05, 0.62, 0.36); box(0.62, 0.14, 0.38, m.linen, 2.75, 0.62, 0.36);
    [1.1, 3.7].forEach(function (x) { box(0.48, 0.45, 0.42, m.walnutSolid, x, 0.225, 0.25); k.cyl(0.03, 0.05, 0.25, m.brass, x, 0.575, 0.22); k.cyl(0.08, 0.13, 0.16, m.warm, x, 0.77, 0.22); var l = new THREE.PointLight(0xffcf8a, 0.35, 1.8, 2); l.position.set(x, 0.85, 0.35); ctx.root.add(l); });
    box(2.8, 0.01, 1.9, m.rug, 2.4, 0.006, 1.9, null, true);
    // sliding wardrobe on left wall (two-tone like the Deeraj project photo)
    var g = new THREE.Group(); g.rotation.y = Math.PI / 2; g.position.set(0, 0, 3.4); ctx.root.add(g);
    box(2.4, 2.4, 0.58, m.carcass, 1.2, 1.2, 0.29, g);
    [[0.6, 0], [1.8, 1]].forEach(function (d) {
      box(1.18, 2.36, 0.02, m.acrylic, d[0], 1.2, 0.6 - 0.01 - d[1] * 0.025, g);
      box(0.3, 2.36, 0.022, m.fabricDark, d[0] + (d[1] ? -0.3 : 0.3), 1.2, 0.6 - d[1] * 0.025 + 0.002, g);
      box(0.012, 0.5, 0.022, m.hood, d[0] + (d[1] ? -0.52 : 0.52), 1.1, 0.62 - d[1] * 0.025, g);
    });
    box(0.03, 2.4, 2.4, m.walnutSolid, 0.6, 1.2, 2.2);
    // dresser + mirror on back wall right
    box(0.9, 0.75, 0.42, m.walnutSolid, 4.15, 0.375, 0.21); box(0.6, 0.9, 0.02, M({ color: 0xd9e2e8, roughness: 0.05, metalness: 0.9 }), 4.15, 1.35, 0.012);
    k.views = { front: { p: [2.6, 1.9, 6.4], t: [2.3, 0.85, 1.4] }, corner: { p: [5.2, 2.2, 4.8], t: [1.9, 0.95, 1.6] }, top: { p: [2.5, 6.4, 2.7], t: [2.2, 0.4, 1.7] } };
    k.az = [-0.5, 1.2];
    return k;
  }
  /* ---- helpers for the new scenes ---- */
  function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  function label(text, sub, scale) {
    var c = document.createElement('canvas'); c.width = 640; c.height = 180; var g = c.getContext('2d');
    g.fillStyle = 'rgba(255,253,250,0.97)'; rr(g, 6, 6, 628, 168, 40); g.fill();
    g.fillStyle = '#c2410c'; g.beginPath(); g.arc(56, 90, 14, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#22190f'; g.font = '700 50px Manrope, "Segoe UI", sans-serif'; g.fillText(text, 92, sub ? 82 : 106);
    if (sub) { g.fillStyle = '#5f5246'; g.font = '500 34px Manrope, "Segoe UI", sans-serif'; g.fillText(sub, 92, 134); }
    var t = new THREE.CanvasTexture(c); var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
    var sc = scale || 1; s.scale.set(1.9 * sc, 0.535 * sc, 1); s.renderOrder = 10; return s;
  }
  function signTex(big, small, bg, fg) {
    var c = document.createElement('canvas'); c.width = 1024; c.height = 200; var g = c.getContext('2d');
    g.fillStyle = bg; g.fillRect(0, 0, 1024, 200); g.fillStyle = fg; g.textAlign = 'center';
    g.font = '600 92px Fraunces, Georgia, serif'; g.fillText(big, 512, small ? 108 : 130);
    if (small) { g.font = '700 34px Manrope, sans-serif'; g.fillStyle = '#e8b25f'; g.fillText(small, 512, 168); }
    return new THREE.CanvasTexture(c);
  }
  function ease3(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function disc(k, r, mat) { var f = new THREE.Mesh(new THREE.CircleGeometry(r, 64), mat); f.rotation.x = -Math.PI / 2; f.receiveShadow = true; k.root.add(f); return f; }
  function tree(k, x, z, s) { k.cyl(0.04 * s, 0.05 * s, 0.4 * s, M({ color: 0x6b4a33, roughness: 0.9 }), x, 0.2 * s, z); var c = new THREE.Mesh(new THREE.ConeGeometry(0.28 * s, 0.75 * s, 10), M({ color: 0x5d7a52, roughness: 0.85 })); c.position.set(x, 0.72 * s, z); c.castShadow = true; k.root.add(c); }

  /* About + Factory: a module that assembles itself, panel by panel */
  function buildAssembly(ctx) {
    var k = common(ctx); k.root = ctx.root; var m = k.mats, box = k.box; lights(ctx, 0.8);
    disc(k, 3.4, M({ color: 0xe6dfd4, roughness: 0.6 }));
    var kitchen = ctx.opts.variant === 'kitchen';
    var W = kitchen ? 1.2 : 1.5, H = kitchen ? 0.78 : 2.1, D = 0.6, t = 0.018, y0 = 0.1, parts = [];
    var front = kitchen ? m.walnutSolid : m.acrylic, handleM = m.brass;
    function part(w, h, d, mat, x, y, z, ex, ey, ez) { var mesh = box(w, h, d, mat, x, y, z); parts.push({ m: mesh, a: new THREE.Vector3(x, y, z), e: new THREE.Vector3(x + ex, y + ey, z + ez), r: ((parts.length * 37) % 10 - 5) / 9 }); }
    part(W, 0.1, D - 0.06, m.plinth, 0, 0.05, -0.03, 0, -0.1, 1.2);
    part(W - 2 * t, t, D, m.carcass, 0, y0 + t / 2, 0, 0, -0.3, 1.4);
    part(t, H, D, m.carcass, -W / 2 + t / 2, y0 + H / 2, 0, -1.4, 0.3, 0.2);
    part(t, H, D, m.carcass, W / 2 - t / 2, y0 + H / 2, 0, 1.4, 0.3, 0.2);
    part(W - 2 * t, H - 2 * t, 0.008, m.walnutSolid, 0, y0 + H / 2, -D / 2 + 0.004, 0, 0.4, -1.4);
    part(W - 2 * t, t, D, m.carcass, 0, y0 + H - t / 2, 0, 0, 1.4, 0);
    var shelves = kitchen ? [0.42] : [0.55, 1.15, 1.6];
    shelves.forEach(function (sy, i) { part(W - 2 * t, t, D - 0.06, m.carcass, 0, y0 + sy, -0.02, 0, 0.2 + i * 0.25, 1.6 + i * 0.2); });
    if (!kitchen) { var rod = k.cyl(0.012, 0.012, W - 0.1, m.steel, 0, y0 + 1.48, 0, 10); rod.rotation.z = Math.PI / 2; parts.push({ m: rod, a: rod.position.clone(), e: rod.position.clone().add(new THREE.Vector3(0, 1.6, 0.6)), r: 0, rz: Math.PI / 2 }); }
    var zf = D / 2 + t / 2 + 0.002;
    if (kitchen) {
      [[0.24, 0], [0.38, 1], [0.38, 2]].reduce(function (yy, f) { var ph = H * f[0] - 0.006; part(W - 0.008, ph, t, front, 0, yy - ph / 2 - 0.003, zf, 0, 0.2 * f[1], 1.8 + f[1] * 0.3); part(0.6, 0.012, 0.022, handleM, 0, yy - 0.035, zf + 0.02, 0, 0.3 + 0.2 * f[1], 2.4 + f[1] * 0.3); return yy - H * f[0]; }, y0 + H);
      part(W + 0.03, 0.04, D + 0.04, m.marble, 0, y0 + H + 0.02, 0.02, 0, 1.8, 0.2);
    } else {
      var dw = (W - 0.012) / 2;
      part(dw, H - 0.008, t, front, -dw / 2 - 0.002, y0 + H / 2, zf, -0.7, 0.1, 1.8);
      part(dw, H - 0.008, t, front, dw / 2 + 0.002, y0 + H / 2, zf, 0.7, 0.1, 1.8);
      part(0.3, 0.025, 0.4, m.walnutSolid, -dw / 2 - 0.002, y0 + H * 0.35, zf + 0.005, -0.7, 0.4, 2.0);
      part(0.012, 0.5, 0.022, handleM, -0.03, y0 + H / 2, zf + 0.02, -0.4, 0.2, 2.3);
      part(0.012, 0.5, 0.022, handleM, 0.03, y0 + H / 2, zf + 0.02, 0.4, 0.2, 2.3);
    }
    // board stack to the side, like the factory floor
    for (var i = 0; i < 6; i++) box(1.1, 0.018, 0.7, i % 2 ? m.walnutSolid : m.carcass, -1.9, 0.01 + i * 0.019, 0.7);
    var lastStep = -1;
    k.update = function (time) {
      var cyc = time % 9.5, n = parts.length;
      parts.forEach(function (p, i) {
        var st = i * (6 / n), x = Math.min(1, Math.max(0, (cyc - st) / 0.9)), e = ease3(x);
        if (cyc > 8) e = 1 - ease3(Math.min(1, (cyc - 8) / 1.3));
        if (reduce) e = 1;
        p.m.position.lerpVectors(p.e, p.a, e); p.m.rotation.y = (1 - e) * p.r; if (p.rz) p.m.rotation.z = p.rz; else p.m.rotation.x = (1 - e) * p.r * 0.4;
      });
      if (ctx.opts.onStep) { var step = Math.min(8, Math.floor(cyc / 8 * 9)); if (step !== lastStep) { lastStep = step; ctx.opts.onStep(step); } }
    };
    var cy = y0 + H / 2 + (kitchen ? 0.1 : 0);
    k.views = { front: { p: kitchen ? [2.4, 1.9, 3.4] : [2.8, 2.2, 4.6], t: [0, cy, 0] } };
    k.az = null; k.dist = [1.6, 8];
    return k;
  }

  /* Services: open office */
  function buildOffice(ctx) {
    var k = common(ctx); k.root = ctx.root; var m = k.mats, box = k.box; lights(ctx, 0.75); roomShell(k, m.wood);
    for (var i = 0; i < 14; i++) box(0.05, 2.5, 0.05, m.walnutSolid, 1.55 + i * 0.09, 1.25, 0.04);
    box(2.0, 0.5, 0.03, m.walnutSolid, 3.55, 1.75, 0.03);
    var sign = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.37), new THREE.MeshBasicMaterial({ map: signTex('Deeraj Interiors', '', '#3b2618', '#f3ebe2') })); sign.position.set(3.55, 1.75, 0.05); k.root.add(sign);
    box(1.6, 0.9, 0.5, m.walnutSolid, 3.55, 0.45, 0.4); box(1.64, 0.04, 0.54, m.marble, 3.55, 0.92, 0.4);
    [1.85, 2.95, 4.05].forEach(function (x) {
      [1.9, 3.3].forEach(function (z) {
        box(1.0, 0.04, 0.7, m.acrylic, x, 0.75, z); box(0.04, 0.73, 0.6, m.hood, x - 0.46, 0.365, z); box(0.04, 0.73, 0.6, m.hood, x + 0.46, 0.365, z);
        box(0.55, 0.33, 0.03, m.glass, x, 1.02, z - 0.2); box(0.04, 0.17, 0.04, m.hood, x, 0.85, z - 0.22);
        box(0.48, 0.08, 0.46, m.fabricDark, x, 0.48, z + 0.58); box(0.46, 0.5, 0.06, m.fabricDark, x, 0.78, z + 0.8);
        k.cyl(0.025, 0.025, 0.4, m.hood, x, 0.24, z + 0.58, 8); k.cyl(0.26, 0.26, 0.03, m.hood, x, 0.03, z + 0.58, 5);
      });
      k.cyl(0.006, 0.006, 0.9, m.hood, x, 2.15, 2.6, 6); k.cyl(0.14, 0.24, 0.16, m.warm, x, 1.65, 2.6, 20);
      var l = new THREE.PointLight(0xffd59a, 0.35, 2.4, 2); l.position.set(x, 1.5, 2.6); k.root.add(l);
    });
    // glass meeting cabin
    box(0.02, 2.4, 2.4, m.glassClear, 1.2, 1.2, 1.4, null, true);
    [0.2, 1.4, 2.6].forEach(function (z) { box(0.05, 2.4, 0.05, m.hood, 1.2, 1.2, z); });
    box(1.2, 0.05, 0.05, m.hood, 0.6, 2.4, 2.6); box(1.2, 2.4, 0.02, m.glassClear, 0.6, 1.2, 2.6, null, true);
    k.cyl(0.42, 0.42, 0.04, m.walnutSolid, 0.6, 0.74, 1.4); k.cyl(0.06, 0.18, 0.72, m.hood, 0.6, 0.36, 1.4);
    [[0.6, 0.85], [0.6, 1.95]].forEach(function (p) { box(0.4, 0.07, 0.4, m.terracotta, p[0], 0.46, p[1]); });
    [[4.35, 0.6], [0.4, 3.6]].forEach(function (p) { k.cyl(0.16, 0.12, 0.4, m.pot, p[0], 0.2, p[1]); k.sph(0.24, m.leaf, p[0], 0.62, p[1]); k.sph(0.17, m.leaf, p[0] + 0.08, 0.86, p[1] - 0.05); });
    k.views = { front: { p: [3.0, 2.8, 7.6], t: [2.4, 0.8, 2.0] } }; k.az = [-0.6, 1.1];
    return k;
  }

  /* Projects: apartment towers */
  function winTex(seed) {
    var c = document.createElement('canvas'); c.width = 256; c.height = 512; var g = c.getContext('2d'), r = rnd(seed);
    g.fillStyle = '#efe7de'; g.fillRect(0, 0, 256, 512);
    for (var row = 0; row < 18; row++) for (var col = 0; col < 6; col++) { var lit = r() < 0.5; g.fillStyle = lit ? '#ffcf7a' : '#5b6b78'; g.fillRect(14 + col * 40, 12 + row * 28, 26, 16); }
    g.fillStyle = '#c2410c'; g.fillRect(0, 0, 256, 6);
    return new THREE.CanvasTexture(c);
  }
  function buildTowers(ctx) {
    var k = common(ctx); k.root = ctx.root; var m = k.mats, box = k.box; lights(ctx, 0.85);
    disc(k, 5.2, M({ color: 0xd8d2c3, roughness: 1 }));
    var road = M({ color: 0x6f6a63, roughness: 0.9 });
    box(9.6, 0.012, 0.7, road, 0, 0.006, 1.7, null, true); box(0.7, 0.011, 9.6, road, 0.9, 0.006, 0, null, true);
    var towers = [[-1.7, -0.7, 1.1, 3.6, 'My Home Tarkshaya', 'Kokapet'], [2.5, -0.9, 1.1, 2.8, 'NSL East County', 'Uppal'], [-0.4, -2.4, 1.0, 4.2, 'NCL Sindhu', 'Kompally']];
    var mats = [];
    towers.forEach(function (tw, i) {
      var tx = winTex(5 + i * 7), mat = M({ map: tx, emissiveMap: tx, emissive: 0xffffff, emissiveIntensity: 0.32, roughness: 0.7 }); mats.push(mat);
      box(tw[2], tw[3], tw[2], mat, tw[0], tw[3] / 2, tw[1]); box(tw[2] + 0.1, 0.08, tw[2] + 0.1, m.walnutSolid, tw[0], tw[3] + 0.04, tw[1]);
      var lb = label(tw[4], tw[5] + ', Hyderabad', 1.05); lb.position.set(tw[0], tw[3] + 0.55, tw[1]); k.root.add(lb);
    });
    // independent home (Bhimavaram / Alwal)
    box(1.0, 0.8, 0.9, m.acrylic, -2.2, 0.4, 2.8); var roof = new THREE.Mesh(new THREE.ConeGeometry(0.85, 0.5, 4), m.terracotta); roof.rotation.y = Math.PI / 4; roof.position.set(-2.2, 1.05, 2.8); roof.castShadow = true; k.root.add(roof);
    var lb2 = label('Independent homes', 'Alwal · Bhimavaram', 1.0); lb2.position.set(-2.2, 1.75, 2.8); k.root.add(lb2);
    [[2.6, 2.6], [3.2, 1.0], [-3.2, 0.6], [1.6, 3.4], [-0.8, 3.6], [3.4, -2.6], [-3.4, -2.2], [0.2, 0.4]].forEach(function (p, i) { tree(k, p[0], p[1], 0.9 + (i % 3) * 0.2); });
    k.update = function (t) { mats.forEach(function (mt, i) { mt.emissiveIntensity = 0.28 + Math.sin(t * 1.3 + i) * 0.08; }); };
    k.views = { front: { p: [0, 5.2, 9.6], t: [0, 1.4, 0] } }; k.az = null; k.dist = [4, 15];
    return k;
  }

  /* Partner: experience centre storefront */
  function buildStore(ctx) {
    var k = common(ctx); k.root = ctx.root; var m = k.mats, box = k.box; lights(ctx, 0.8);
    box(9, 0.02, 6, m.tileFloor, 0, -0.01, 1.2, null, true);
    box(4.4, 0.05, 2.6, m.wood, 0, 0.025, 0); box(4.4, 3.0, 0.08, m.wall, 0, 1.5, -1.3); box(0.08, 3.0, 2.6, m.wall2, -2.2, 1.5, 0); box(0.08, 3.0, 2.6, m.wall2, 2.2, 1.5, 0);
    box(4.56, 0.14, 2.76, m.walnutSolid, 0, 3.07, 0);
    box(4.56, 0.6, 0.14, m.walnutSolid, 0, 2.72, 1.33);
    var sg = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.52), new THREE.MeshBasicMaterial({ map: signTex('DEERAJ INTERIORS', 'EXPERIENCE CENTRE', '#3b2618', '#f3ebe2') })); sg.position.set(0, 2.72, 1.41); k.root.add(sg);
    box(4.3, 2.4, 0.02, m.glassClear, 0, 1.22, 1.3, null, true);
    [-2.15, -0.75, 0.75, 2.15].forEach(function (x) { box(0.05, 2.42, 0.06, m.hood, x, 1.22, 1.3); });
    box(4.36, 0.05, 0.06, m.hood, 0, 2.42, 1.3);
    // display kitchen on back wall
    box(2.6, 0.75, 0.6, m.walnutSolid, -0.5, 0.475, -0.98); box(2.64, 0.04, 0.64, m.marble, -0.5, 0.87, -0.98);
    box(2.6, 0.7, 0.35, m.acrylic, -0.5, 1.9, -1.08); box(2.6, 0.012, 0.02, m.led, -0.5, 1.545, -0.92, null, true);
    box(0.8, 2.3, 0.6, m.acrylic, 1.6, 1.2, -0.98); box(0.012, 0.5, 0.02, m.brass, 1.25, 1.2, -0.67);
    // lounge + designer table
    box(1.3, 0.4, 0.6, m.fabric, -1.2, 0.25, 0.5); box(1.3, 0.4, 0.15, m.fabric, -1.2, 0.55, 0.25);
    k.cyl(0.4, 0.4, 0.04, m.walnutSolid, 0.8, 0.74, 0.4); k.cyl(0.05, 0.15, 0.72, m.hood, 0.8, 0.37, 0.4);
    [[2.6, 1.8], [-2.6, 1.8]].forEach(function (p) { k.cyl(0.24, 0.2, 0.5, m.pot, p[0], 0.25, p[1]); k.sph(0.3, m.leaf, p[0], 0.75, p[1]); k.sph(0.22, m.leaf, p[0], 1.05, p[1]); });
    [[-1.2, 2.4, 0], [1.2, 2.4, 0]].forEach(function (p) { var l = new THREE.PointLight(0xffd59a, 0.6, 4, 2); l.position.set(p[0], p[1], p[2]); k.root.add(l); });
    k.views = { front: { p: [0.6, 2.0, 7.6], t: [0, 1.45, 0] } }; k.az = [-0.9, 0.9]; k.dist = [3, 12];
    return k;
  }

  /* Store: product turntable */
  function buildTurntable(ctx) {
    var k = common(ctx); k.root = ctx.root; var m = k.mats, box = k.box; lights(ctx, 0.85);
    disc(k, 4, M({ color: 0xe6dfd4, roughness: 0.8 }));
    k.cyl(0.78, 0.84, 0.3, m.marble, 0, 0.15, 0, 48);
    var ring = new THREE.Mesh(new THREE.TorusGeometry(0.79, 0.012, 8, 64), m.brass); ring.rotation.x = Math.PI / 2; ring.position.y = 0.3; k.root.add(ring);
    var grp = new THREE.Group(); grp.position.y = 0.3; k.root.add(grp);
    var green = M({ color: 0x3f6e55, roughness: 0.3, metalness: 0.75 });
    function add(mesh) { mesh.castShadow = true; grp.add(mesh); return mesh; }
    function c(r1, r2, h, mat, x, y, z) { return add(new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, 24), mat)).position.set(x, y, z); }
    k.setProduct = function (id) {
      while (grp.children.length) { var o = grp.children.pop(); if (o.geometry) o.geometry.dispose(); }
      if (id === 'vase') {
        var pts = [[0, 0], [0.16, 0], [0.24, 0.18], [0.26, 0.4], [0.18, 0.62], [0.1, 0.76], [0.12, 0.84]].map(function (p) { return new THREE.Vector2(p[0], p[1]); });
        add(new THREE.Mesh(new THREE.LatheGeometry(pts, 40), M({ color: 0xb85c38, roughness: 0.28 })));
        for (var i = 0; i < 7; i++) { var a = i / 7 * Math.PI * 2, x = Math.cos(a) * 0.12, z = Math.sin(a) * 0.12, h = 0.35 + (i % 3) * 0.12; var st = add(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, h, 5), m.leaf)); st.position.set(x * 0.5, 0.84 + h / 2, z * 0.5); st.rotation.z = -x * 2; st.rotation.x = z * 2; var fl = add(new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), M({ color: i % 2 ? 0xf6efe6 : 0xe8b25f, roughness: 0.8 }))); fl.position.set(x * 1.6, 0.84 + h, z * 1.6); }
      } else if (id === 'mirror') {
        var fr = add(new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.035, 12, 64), m.brass)); fr.position.y = 0.95;
        var mi = add(new THREE.Mesh(new THREE.CircleGeometry(0.41, 48), M({ color: 0xdfe7ec, roughness: 0.04, metalness: 1 }))); mi.position.set(0, 0.95, 0.005);
        var mb = add(new THREE.Mesh(new THREE.CircleGeometry(0.41, 48), m.walnutSolid)); mb.position.set(0, 0.95, -0.005); mb.rotation.y = Math.PI;
        c(0.015, 0.02, 0.55, m.brass, 0, 0.27, 0); c(0.18, 0.2, 0.03, m.brass, 0, 0.015, 0);
      } else if (id === 'deer') {
        var body = add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 14), green)); body.scale.set(1.6, 0.9, 0.8); body.position.y = 0.62;
        [[-0.2, -0.08], [-0.2, 0.08], [0.2, -0.08], [0.2, 0.08]].forEach(function (p) { c(0.022, 0.016, 0.5, green, p[0], 0.27, p[1]); });
        var neck = add(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.34, 12), green)); neck.position.set(0.3, 0.84, 0); neck.rotation.z = -0.5;
        var head = add(new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), green)); head.scale.set(1.5, 0.9, 0.9); head.position.set(0.42, 1.0, 0);
        [-1, 1].forEach(function (s) { var a1 = add(new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.32, 6), m.brass)); a1.position.set(0.38, 1.18, s * 0.06); a1.rotation.x = s * 0.4; a1.rotation.z = 0.2; var a2 = add(new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.008, 0.16, 6), m.brass)); a2.position.set(0.36, 1.26, s * 0.13); a2.rotation.x = s * 1.1; });
        c(0.3, 0.32, 0.04, m.walnutSolid, 0, 0.02, 0);
      } else if (id === 'table') {
        c(0.55, 0.55, 0.045, m.marble, 0, 0.44, 0); c(0.1, 0.16, 0.4, m.walnutSolid, 0, 0.2, 0); c(0.3, 0.3, 0.03, m.walnutSolid, 0, 0.015, 0);
        c(0.06, 0.05, 0.14, m.brass, 0.18, 0.53, 0.1); var b = add(new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.16), m.terracotta)); b.position.set(-0.16, 0.48, -0.08);
      } else {
        [[-0.36], [0.36]].forEach(function (p) { add(new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.2, 0.3), m.walnutSolid)).position.set(p[0], 0.6, 0); });
        var cols = [0xc2410c, 0x3b2618, 0x8c9b87, 0xe8b25f, 0x51708f, 0xf2efe9];
        [0.02, 0.32, 0.62, 0.92, 1.19].forEach(function (y, si) {
          add(new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.025, 0.3), m.walnutSolid)).position.set(0, y, 0);
          if (si < 4) { var x = -0.32; for (var bi = 0; bi < 7 && x < 0.3; bi++) { var w = 0.035 + ((bi * 7 + si) % 3) * 0.012, h = 0.18 + ((bi + si) % 3) * 0.04; add(new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.2), M({ color: cols[(bi + si) % 6], roughness: 0.8 }))).position.set(x + w / 2, y + 0.0125 + h / 2, 0); x += w + 0.006; } }
        });
      }
    };
    k.setProduct('vase');
    k.views = { front: { p: [0, 1.35, 3.0], t: [0, 0.8, 0] } }; k.az = null; k.dist = [1.6, 5.5];
    return k;
  }

  /* Contact: 3D map with location pins */
  function buildMap(ctx) {
    var k = common(ctx); k.root = ctx.root; var m = k.mats, box = k.box; lights(ctx, 0.85);
    var c = document.createElement('canvas'); c.width = c.height = 1024; var g = c.getContext('2d'), r = rnd(23);
    g.fillStyle = '#efe7de'; g.fillRect(0, 0, 1024, 1024);
    g.fillStyle = '#a9c7d6'; g.beginPath(); g.ellipse(520, 540, 42, 30, 0.3, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#d4c6b4'; g.lineWidth = 6; for (var i = 0; i < 14; i++) { g.beginPath(); g.moveTo(512, 512); var a = i / 14 * Math.PI * 2 + r() * 0.2; g.lineTo(512 + Math.cos(a) * 560, 512 + Math.sin(a) * 560); g.stroke(); }
    g.strokeStyle = '#c2410c'; g.lineWidth = 9; g.globalAlpha = 0.55; g.beginPath(); g.arc(512, 512, 390, 0, Math.PI * 2); g.stroke(); g.globalAlpha = 1;
    g.fillStyle = '#8a7a6a'; g.font = '700 26px Manrope, sans-serif'; g.fillText('OUTER RING ROAD', 640, 170); g.fillText('HUSSAIN SAGAR', 560, 600);
    var mt = new THREE.CanvasTexture(c);
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), M({ map: mt, roughness: 0.95 })); plane.rotation.x = -Math.PI / 2; plane.receiveShadow = true; k.root.add(plane);
    for (var b = 0; b < 70; b++) { var ang = r() * Math.PI * 2, rad = 0.5 + r() * 2.6, x = Math.cos(ang) * rad, z = Math.sin(ang) * rad, h = 0.08 + r() * 0.45 * (1 - rad / 3.4); box(0.14 + r() * 0.12, h, 0.14 + r() * 0.12, b % 3 ? m.wall : m.acrylic, x, h / 2, z); }
    var PINS = { suchitra: [0.35, -1.45, 'Suchitra', 'Experience Center'], nanak: [-1.95, 0.85, 'Nanakramguda', 'Experience Center'], medchal: [0.45, -3.25, 'Medchal', 'Modular Factory'] };
    var pins = {}, pinMat = M({ color: 0xc2410c, roughness: 0.4, emissive: 0x5a1a04, emissiveIntensity: 0.3 });
    Object.keys(PINS).forEach(function (id) {
      var p = PINS[id], gp = new THREE.Group(); gp.position.set(p[0], 0, p[1]); k.root.add(gp);
      var cone = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.38, 20), pinMat); cone.rotation.x = Math.PI; cone.position.y = 0.3; cone.castShadow = true; gp.add(cone);
      var head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 14), pinMat); head.position.y = 0.55; head.castShadow = true; gp.add(head);
      var dot = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), m.linen); dot.position.set(0, 0.55, 0.12); gp.add(dot);
      var halo = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.22, 32), new THREE.MeshBasicMaterial({ color: 0xc2410c, transparent: true, opacity: 0.5, side: THREE.DoubleSide })); halo.rotation.x = -Math.PI / 2; halo.position.y = 0.01; gp.add(halo);
      var lb = label(p[2], p[3], 0.85); lb.position.set(0, 1.05, 0); gp.add(lb);
      pins[id] = { g: gp, halo: halo, head: head, cone: cone };
    });
    k.selected = 'all';
    k.update = function (t) {
      Object.keys(pins).forEach(function (id, i) {
        var p = pins[id], on = k.selected === 'all' || k.selected === id;
        p.head.position.y = 0.55 + Math.sin(t * 2.2 + i) * 0.05; p.cone.position.y = 0.3 + Math.sin(t * 2.2 + i) * 0.05;
        var s = 1 + ((t * 0.6 + i * 0.3) % 1) * 1.6; p.halo.scale.set(s, s, s); p.halo.material.opacity = 0.55 * (1 - ((t * 0.6 + i * 0.3) % 1));
        var target = k.selected === id ? 1.35 : 1; p.g.scale.x += (target - p.g.scale.x) * 0.1; p.g.scale.y = p.g.scale.z = p.g.scale.x;
        p.g.visible = true; p.head.material.opacity = on ? 1 : 0.5;
      });
    };
    k.views = { all: { p: [1.2, 6.4, 6.0], t: [-0.4, 0, -1.0] } };
    Object.keys(PINS).forEach(function (id) { var p = PINS[id]; k.views[id] = { p: [p[0] + 1.4, 2.4, p[1] + 2.6], t: [p[0], 0.4, p[1]] }; });
    k.az = null; k.dist = [1.8, 14];
    return k;
  }

  /* ================= DESIGN STUDIO: kitchen layouts, bedrooms, wardrobes ================= */
  function kitBase(ctx, opt) {
    var k = common(ctx); k.root = ctx.root; var m = k.mats, box = k.box; lights(ctx); roomShell(k, opt && opt.wood ? m.wood : m.tileFloor);
    if (opt && opt.rightWall) box(0.05, 2.6, 4.2, m.wall2, opt.rightWall + 0.025, 1.3, 2.1);
    k.run = function (x, z, rot) { var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot || 0; ctx.root.add(g); return g; };
    k.unit = function (parent, x0, w, kind, layout, sm) {
      var g = new THREE.Group(); g.position.x = x0; parent.add(g);
      var gap = 0.004, t = 0.018, y0 = kind === 'upper' ? 1.45 : 0.1, h = kind === 'upper' ? 0.72 : (kind === 'tall' ? 2.07 : 0.75), d = kind === 'upper' ? 0.35 : 0.6;
      if (kind !== 'upper') box(w, 0.1, d - 0.08, m.plinth, w / 2, 0.05, (d - 0.08) / 2, g);
      box(w - 0.004, h, d - t - 0.002, m.carcass, w / 2, y0 + h / 2, (d - t - 0.002) / 2, g);
      var zf = d - t / 2, P = [], up = kind === 'upper' ? 'bottom' : 'top';
      if (layout === 'drawers3') { var yy = y0 + h; [0.24, 0.38, 0.38].forEach(function (f) { var ph = h * f - gap * 1.5; P.push([w / 2, yy - gap - ph / 2, w - 2 * gap, ph, 'top']); yy -= h * f; }); }
      else if (layout === 'drawers2') { var tp = h * 0.4, bt = h * 0.6; P.push([w / 2, y0 + h - gap - (tp - 2 * gap) / 2, w - 2 * gap, tp - 2 * gap, 'top']); P.push([w / 2, y0 + gap + (bt - gap) / 2, w - 2 * gap, bt - gap, 'top']); }
      else if (layout === 'doors2') { var pw = (w - 3 * gap) / 2; P.push([gap + pw / 2, y0 + h / 2, pw, h - 2 * gap, up]); P.push([2 * gap + pw * 1.5, y0 + h / 2, pw, h - 2 * gap, up]); }
      else if (layout === 'tall') { P.push([w / 2, y0 + 0.425, w - 2 * gap, 0.85 - 2 * gap, 'vu']); P.push([w / 2, y0 + 0.85 + (h - 0.85) / 2, w - 2 * gap, h - 0.85 - 2 * gap, 'vd']); }
      else P.push([w / 2, y0 + h / 2, w - 2 * gap, h - 2 * gap, layout === 'blind' ? 'none' : up]);
      P.forEach(function (p) {
        box(p[2], p[3], t, sm, p[0], p[1], zf, g); var hm, zz = zf + t / 2 + 0.011;
        if (p[4] === 'top') hm = box(Math.min(p[2] * 0.7, 0.5), 0.012, 0.022, m.handle, p[0], p[1] + p[3] / 2 - 0.035, zz, g);
        else if (p[4] === 'bottom') hm = box(Math.min(p[2] * 0.7, 0.4), 0.012, 0.022, m.handle, p[0], p[1] - p[3] / 2 + 0.035, zz, g);
        else if (p[4] === 'vu') hm = box(0.012, 0.3, 0.022, m.handle, p[0] + p[2] / 2 - 0.04, p[1] + p[3] / 2 - 0.2, zz, g);
        else if (p[4] === 'vd') hm = box(0.012, 0.3, 0.022, m.handle, p[0] + p[2] / 2 - 0.04, p[1] - p[3] / 2 + 0.2, zz, g);
        if (hm) k.handles.push(hm);
      });
    };
    k.mods = function (g, list, kind) { var x = 0; list.forEach(function (it) { k.unit(g, x, it[0], it[2] || kind, it[1], (it[2] || kind) === 'upper' ? m.upper : m.base); x += it[0]; }); };
    k.counter = function (w, d, x, z) { box(w, 0.04, d, m.counter, x, 0.87, z); };
    k.splash = function (w, d, x, z) { box(w, 0.56, d, m.tile, x, 1.17, z, null, true); };
    k.sink = function (x, z, rot, tx, tz) {
      box(rot ? 0.42 : 0.72, 0.006, rot ? 0.72 : 0.42, m.steel, x, 0.892, z); box(rot ? 0.36 : 0.64, 0.008, rot ? 0.64 : 0.36, M({ color: 0x55585c, roughness: 0.3, metalness: 0.8 }), x, 0.895, z);
      k.cyl(0.014, 0.018, 0.32, m.steel, x + tx * 0.24, 1.05, z + tz * 0.24, 10);
      if (tx) box(0.16, 0.022, 0.022, m.steel, x + tx * 0.16, 1.2, z); else box(0.022, 0.022, 0.16, m.steel, x, 1.2, z + tz * 0.16);
    };
    k.hob = function (x, z, rot) {
      box(rot ? 0.5 : 0.76, 0.008, rot ? 0.76 : 0.5, m.glass, x, 0.894, z);
      [[-0.2, -0.1], [0.2, -0.1], [-0.2, 0.12], [0.2, 0.12]].forEach(function (o) { var r = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 8, 24), m.steel); r.rotation.x = Math.PI / 2; r.position.set(x + (rot ? o[1] : o[0]), 0.902, z + (rot ? o[0] : o[1])); ctx.root.add(r); });
    };
    k.hood = function (x, z, island) {
      if (island) { box(0.9, 0.12, 0.6, m.hood, x, 1.85, z); box(0.26, 0.7, 0.26, m.hood, x, 2.26, z); }
      else { box(0.9, 0.1, 0.5, m.hood, x, 1.66, z); box(0.32, 0.84, 0.26, m.hood, x, 2.13, z - 0.12); }
    };
    k.ledBar = function (w, d, x, z) { k.leds.push(box(w, 0.012, d, m.led, x, 1.443, z, null, true)); var l = new THREE.PointLight(0xffd59a, 0.4, 1.6, 2); l.position.set(x, 1.38, z + 0.05); ctx.root.add(l); k.leds.push(l); };
    k.stool = function (x, z) { k.cyl(0.18, 0.18, 0.04, m.walnutSolid, x, 0.7, z); k.cyl(0.02, 0.02, 0.68, m.hood, x, 0.34, z, 8); k.cyl(0.16, 0.16, 0.02, m.hood, x, 0.01, z); };
    return k;
  }

  function buildKitU(ctx) {
    var k = kitBase(ctx, { rightWall: 3.3 }), m = k.mats, box = k.box;
    var b = k.run(0, 0, 0);
    k.mods(b, [[0.6, 'blind'], [0.6, 'drawers3'], [0.9, 'drawers2'], [0.6, 'drawers3'], [0.6, 'blind']], 'base');
    k.unit(b, 0, 0.6, 'upper', 'doors1', m.upper); k.unit(b, 0.6, 0.6, 'upper', 'doors1', m.upper); k.unit(b, 2.1, 0.6, 'upper', 'doors1', m.upper); k.unit(b, 2.7, 0.6, 'upper', 'doors1', m.upper);
    k.mods(k.run(0, 0, 2.4, Math.PI / 2), [[0.6, 'doors1'], [0.9, 'doors2'], [0.3, 'doors1']], 'base');
    var r = k.run(3.3, 0, 0.6, -Math.PI / 2); k.mods(r, [[0.6, 'drawers3'], [0.6, 'doors1'], [0.6, 'tall', 'tall']], 'base');
    k.unit(r, 0, 0.6, 'upper', 'doors1', m.upper); k.unit(r, 0.6, 0.6, 'upper', 'doors1', m.upper);
    k.counter(3.3, 0.63, 1.65, 0.315); k.counter(0.63, 1.77, 0.315, 1.515); k.counter(0.63, 1.17, 2.985, 1.215);
    k.splash(3.3, 0.012, 1.65, 0.006); k.splash(0.012, 2.4, 0.006, 1.2); k.splash(0.012, 1.8, 3.294, 0.9);
    k.sink(0.32, 1.35, true, -1, 0); addWindow(k, 1.35, 1.68, 0.82, 0.72);
    k.hob(1.65, 0.31); k.hood(1.65, 0.25);
    k.ledBar(1.18, 0.02, 0.6, 0.3); k.ledBar(1.18, 0.02, 2.7, 0.3);
    k.views = { corner: { p: [4.3, 2.7, 5.2], t: [1.65, 0.95, 1.1] }, front: { p: [1.65, 1.9, 5.6], t: [1.65, 0.95, 1.0] }, top: { p: [1.7, 6.2, 2.6], t: [1.65, 0.5, 1.2] } }; k.az = [-0.6, 0.95];
    return k;
  }
  function buildKitPar(ctx) {
    var k = kitBase(ctx), m = k.mats;
    var b = k.run(0.6, 0, 0); k.mods(b, [[0.6, 'drawers3'], [0.9, 'drawers2'], [0.6, 'doors1'], [0.9, 'doors2']], 'base');
    k.unit(b, 0, 0.6, 'upper', 'doors1', m.upper); k.unit(b, 1.5, 0.6, 'upper', 'doors1', m.upper); k.unit(b, 2.1, 0.9, 'upper', 'doors2', m.upper);
    k.mods(k.run(3.6, 0, 3.2, Math.PI), [[0.9, 'doors2'], [0.6, 'drawers3'], [0.6, 'doors1'], [0.9, 'drawers2']], 'base');
    k.counter(3.0, 0.63, 2.1, 0.315); k.counter(3.0, 0.63, 2.1, 2.885); k.splash(3.0, 0.012, 2.1, 0.006);
    k.sink(3.15, 2.88, false, 0, 1); k.hob(1.65, 0.31); k.hood(1.65, 0.25); addWindow(k, 1.6, 1.5, 1.0, 1.1);
    k.ledBar(0.58, 0.02, 0.9, 0.3); k.ledBar(1.5, 0.02, 3.15, 0.3);
    k.views = { front: { p: [5.9, 2.1, 1.7], t: [2.0, 0.9, 1.6] }, corner: { p: [4.9, 2.9, 5.0], t: [2.0, 0.9, 1.6] }, top: { p: [2.1, 6.3, 2.8], t: [2.1, 0.5, 1.6] } }; k.az = [0.3, 1.95];
    return k;
  }
  function buildKitStr(ctx) {
    var k = kitBase(ctx), m = k.mats, box = k.box;
    var b = k.run(0.5, 0, 0); k.mods(b, [[0.6, 'tall', 'tall'], [0.6, 'drawers3'], [0.9, 'doors2'], [0.9, 'drawers2'], [0.6, 'doors1']], 'base');
    k.unit(b, 0.6, 0.6, 'upper', 'doors1', m.upper); k.unit(b, 1.2, 0.9, 'upper', 'doors2', m.upper); k.unit(b, 3.0, 0.6, 'upper', 'doors1', m.upper);
    k.counter(3.0, 0.63, 2.6, 0.315); k.splash(3.0, 0.012, 2.6, 0.006);
    k.sink(2.15, 0.3, false, 0, -1); k.hob(3.05, 0.31); k.hood(3.05, 0.25); k.ledBar(1.48, 0.02, 1.85, 0.3);
    k.cyl(0.42, 0.42, 0.04, m.walnutSolid, 2.4, 0.74, 2.4); k.cyl(0.05, 0.2, 0.72, m.hood, 2.4, 0.36, 2.4);
    [[1.8, 2.4], [3.0, 2.4]].forEach(function (p) { box(0.42, 0.06, 0.42, m.fabric, p[0], 0.46, p[1]); box(0.42, 0.42, 0.05, m.fabric, p[0] + (p[0] < 2.4 ? -0.19 : 0.19), 0.7, p[1]).rotation.y = Math.PI / 2; box(0.04, 0.44, 0.04, m.hood, p[0], 0.22, p[1]); });
    k.views = { front: { p: [2.3, 1.9, 5.8], t: [2.3, 0.95, 0.9] }, corner: { p: [5.3, 2.5, 4.4], t: [2.3, 0.95, 0.9] }, top: { p: [2.4, 6.2, 2.6], t: [2.3, 0.5, 1.3] } }; k.az = [-0.8, 1.2];
    return k;
  }
  function buildKitIsl(ctx) {
    var k = kitBase(ctx), m = k.mats, box = k.box;
    var b = k.run(0.5, 0, 0); k.mods(b, [[0.6, 'tall', 'tall'], [0.6, 'drawers3'], [0.9, 'doors2'], [0.9, 'drawers2'], [0.6, 'tall', 'tall']], 'base');
    k.unit(b, 0.6, 0.6, 'upper', 'doors1', m.upper); k.unit(b, 1.2, 0.9, 'upper', 'doors2', m.upper); k.unit(b, 2.1, 0.9, 'upper', 'doors2', m.upper);
    k.counter(2.4, 0.63, 2.3, 0.315); k.splash(2.4, 0.012, 2.3, 0.006); k.sink(1.65, 0.3, false, 0, -1); k.ledBar(2.38, 0.02, 2.3, 0.3);
    k.mods(k.run(1.3, 0, 1.95), [[0.6, 'drawers3'], [0.8, 'doors2'], [0.6, 'drawers3']], 'base');
    k.mods(k.run(3.3, 0, 1.95, Math.PI), [[1.0, 'doors2'], [1.0, 'doors2']], 'base');
    box(2.3, 0.04, 1.5, m.counter, 2.3, 0.87, 2.0); k.hob(2.3, 1.72); k.hood(2.3, 1.72, true);
    [1.7, 2.3, 2.9].forEach(function (x) { k.stool(x, 2.98); });
    k.views = { front: { p: [2.3, 2.3, 6.4], t: [2.3, 0.95, 1.3] }, corner: { p: [5.5, 2.7, 4.9], t: [2.2, 0.95, 1.3] }, top: { p: [2.4, 6.4, 2.8], t: [2.3, 0.5, 1.5] } }; k.az = [-0.8, 1.2];
    return k;
  }

  /* wardrobes with real interiors and moving doors */
  var CLOTH = [0x51708f, 0xe8b25f, 0xf2efe9, 0x3b3a3c, 0xc2410c, 0x8c9b87, 0xd9c4ae, 0x6a4329];
  function wardrobe(k, parent, x0, w, o) {
    var m = k.mats, box = k.box, H = o.h || 2.3, D = 0.6, t = 0.018, y0 = 0.06, r = rnd(o.seed || 5), g = new THREE.Group(), anim = [];
    g.position.x = x0; parent.add(g);
    var clothMats = CLOTH.map(function (c) { return M({ color: c, roughness: 0.95 }); });
    box(w, y0, D - 0.06, m.plinth, w / 2, y0 / 2, (D - 0.06) / 2, g);
    box(w, H, 0.012, m.carcass, w / 2, y0 + H / 2, 0.006, g);
    box(t, H, D - 0.03, m.carcass, t / 2, y0 + H / 2, (D - 0.03) / 2, g); box(t, H, D - 0.03, m.carcass, w - t / 2, y0 + H / 2, (D - 0.03) / 2, g);
    box(w, t, D - 0.03, m.carcass, w / 2, y0 + H - t / 2, (D - 0.03) / 2, g); box(w, t, D - 0.03, m.carcass, w / 2, y0 + t / 2, (D - 0.03) / 2, g);
    var bays = Math.max(1, Math.round(w / 0.85)), bw = w / bays;
    for (var bi = 0; bi < bays; bi++) {
      var bx = bi * bw;
      if (bi > 0) box(t, H - 2 * t, D - 0.04, m.carcass, bx, y0 + H / 2, (D - 0.04) / 2, g);
      if ((bi + (o.flip ? 1 : 0)) % 2 === 0) {
        var ry = y0 + H * 0.8;
        box(bw - 2 * t, t, D - 0.06, m.carcass, bx + bw / 2, ry + 0.09, (D - 0.06) / 2, g);
        var rod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, bw - 0.06, 8), m.steel); rod.rotation.z = Math.PI / 2; rod.position.set(bx + bw / 2, ry, D / 2 - 0.02); g.add(rod);
        for (var cx = bx + 0.07; cx < bx + bw - 0.06; cx += 0.05 + r() * 0.03) { var len = 0.6 + r() * 0.45; box(0.03, len, 0.4, clothMats[(r() * 8) | 0], cx, ry - 0.03 - len / 2, D / 2 - 0.02, g, true); }
      } else {
        box(bw - 0.05, 0.2, 0.02, m.upper, bx + bw / 2, y0 + 0.14, D - 0.07, g); box(bw - 0.05, 0.2, 0.02, m.upper, bx + bw / 2, y0 + 0.37, D - 0.07, g);
        [0.55, 0.95, 1.35, 1.75].forEach(function (yy) {
          box(bw - 2 * t, t, D - 0.06, m.carcass, bx + bw / 2, y0 + yy, (D - 0.06) / 2, g);
          for (var f = 0; f < 3; f++) box((bw - 0.1) / 3 - 0.03, 0.08 + r() * 0.07, 0.32, clothMats[(r() * 8) | 0], bx + 0.06 + f * (bw - 0.1) / 3 + (bw - 0.1) / 6, y0 + yy + 0.06, D / 2 - 0.04, g, true);
        });
      }
    }
    if (o.loft) {
      box(w, 0.5, D - 0.03, m.carcass, w / 2, y0 + H + 0.25, (D - 0.03) / 2, g);
      var ln = o.doors || 2, lw = w / ln;
      for (var li = 0; li < ln; li++) { box(lw - 0.006, 0.48, 0.02, m.upper, li * lw + lw / 2, y0 + H + 0.25, D + 0.011, g); k.handles.push(box(Math.min(0.3, lw * 0.5), 0.012, 0.022, m.handle, li * lw + lw / 2, y0 + H + 0.06, D + 0.03, g)); }
    }
    if (o.open) return anim;
    var n = o.doors || 2, Hd = H - 0.01;
    if (o.sliding) {
      var pw = w / n + 0.03;
      for (var i = 0; i < n; i++) {
        var px = i * (w / n) + (w / n) / 2, pg = new THREE.Group(); pg.position.set(px, y0 + H / 2, D + 0.012 + (i % 2) * 0.028); g.add(pg);
        box(pw, Hd, 0.02, m.base, 0, 0, 0, pg);
        if (o.accent) box(0.22, Hd, 0.022, m.upper, (i % 2 ? -1 : 1) * (pw / 2 - 0.16), 0, 0.002, pg);
        k.handles.push(box(0.014, Hd * 0.45, 0.024, m.handle, (i % 2 ? 1 : -1) * (pw / 2 - 0.04), 0, 0.006, pg));
        anim.push({ g: pg, type: 'slide', x0: px, dx: (w / n) * 0.92, active: i === 0, delay: 0 });
      }
      box(w, 0.03, 0.08, m.hood, w / 2, y0 + H + 0.015, D + 0.03, g);
    } else {
      var dw = w / n;
      for (var j = 0; j < n; j++) {
        var lft = j % 2 === 0, hx = lft ? j * dw + 0.002 : (j + 1) * dw - 0.002, s = lft ? 1 : -1;
        var pv = new THREE.Group(); pv.position.set(hx, y0 + H / 2, D + 0.011); g.add(pv);
        box(dw - 0.006, Hd, 0.02, m.base, s * (dw / 2 - 0.001), 0, 0, pv);
        k.handles.push(box(0.014, 0.5, 0.024, m.handle, s * (dw - 0.05), 0, 0.02, pv));
        anim.push({ g: pv, type: 'hinge', dir: lft ? -1 : 1, delay: Math.floor(j / 2) * 0.35 });
      }
    }
    return anim;
  }
  function animDoors(list, t) {
    var cyc = t % 10;
    list.forEach(function (a) {
      var st = 2 + (a.delay || 0), o = cyc < st ? 0 : cyc < st + 1.6 ? ease3((cyc - st) / 1.6) : cyc < 7.4 ? 1 : cyc < 9 ? 1 - ease3((cyc - 7.4) / 1.6) : 0;
      if (reduce) o = 0.65;
      if (a.type === 'slide') { if (a.active) a.g.position.x = a.x0 + a.dx * o; } else a.g.rotation.y = a.dir * o * 1.5;
    });
  }
  function bedRoom(ctx) { var k = common(ctx); k.root = ctx.root; lights(ctx, 0.72); roomShell(k, k.mats.wood); k.run = function (x, z, rot) { var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot || 0; ctx.root.add(g); return g; }; return k; }

  function buildMaster(ctx) {
    var k = bedRoom(ctx), m = k.mats, box = k.box;
    box(2.7, 1.55, 0.02, M({ color: 0xf1e3cf, emissive: 0xf4dcb6, emissiveIntensity: 0.28, roughness: 0.9 }), 2.5, 1.48, 0.012, null, true);
    for (var i = 0; i < 7; i++) box(0.26, 1.15, 0.08, m.fabricDark, 1.6 + i * 0.3, 0.9, 0.06);
    box(1.95, 0.32, 2.1, m.walnutSolid, 2.5, 0.16, 1.15); box(1.84, 0.22, 2.0, m.linen, 2.5, 0.43, 1.17);
    box(1.88, 0.05, 1.3, m.duvet, 2.5, 0.565, 1.55); box(1.88, 0.06, 0.25, m.linen, 2.5, 0.57, 0.95);
    box(0.62, 0.14, 0.38, m.linen, 2.15, 0.62, 0.36); box(0.62, 0.14, 0.38, m.linen, 2.85, 0.62, 0.36);
    [1.2, 3.8].forEach(function (x) { box(0.48, 0.45, 0.42, m.walnutSolid, x, 0.225, 0.25); k.cyl(0.03, 0.05, 0.25, m.brass, x, 0.575, 0.22); k.cyl(0.08, 0.13, 0.16, m.warm, x, 0.77, 0.22); var l = new THREE.PointLight(0xffcf8a, 0.35, 1.8, 2); l.position.set(x, 0.85, 0.35); ctx.root.add(l); });
    box(2.8, 0.01, 1.9, m.rug, 2.5, 0.006, 1.9, null, true);
    k.doors = wardrobe(k, k.run(0, 0, 3.6, Math.PI / 2), 0, 2.6, { sliding: true, doors: 2, accent: true, h: 2.35, seed: 3 });
    k.update = function (t) { animDoors(k.doors, t); };
    k.views = { front: { p: [2.7, 1.9, 6.4], t: [2.3, 0.85, 1.5] }, corner: { p: [5.3, 2.2, 4.8], t: [1.8, 0.95, 1.8] }, top: { p: [2.5, 6.4, 2.7], t: [2.2, 0.4, 1.7] } }; k.az = [-0.5, 1.25];
    return k;
  }
  function buildKids(ctx) {
    var k = bedRoom(ctx), m = k.mats, box = k.box;
    addWindow(k, 1.2, 1.5, 1.0, 1.1);
    box(1.0, 0.35, 2.0, m.base, 0.75, 0.175, 1.2); box(0.01, 0.24, 0.85, m.upper, 1.255, 0.18, 0.72); box(0.01, 0.24, 0.85, m.upper, 1.255, 0.18, 1.66);
    k.handles.push(box(0.02, 0.012, 0.3, m.handle, 1.265, 0.26, 0.72)); k.handles.push(box(0.02, 0.012, 0.3, m.handle, 1.265, 0.26, 1.66));
    box(0.94, 0.2, 1.94, m.linen, 0.75, 0.45, 1.22); box(0.96, 0.05, 1.25, M({ color: 0xe9a36b, roughness: 0.9 }), 0.75, 0.575, 1.55); box(0.6, 0.12, 0.34, m.linen, 0.75, 0.62, 0.42);
    box(1.0, 0.75, 0.06, m.upper, 0.75, 0.72, 0.17);
    [[0.6, 1.75, 0.18, 0x8c9b87], [1.05, 1.95, 0.13, 0xe8b25f], [1.4, 1.65, 0.1, 0xc2410c]].forEach(function (c) { var d = k.cyl(c[2], c[2], 0.02, M({ color: c[3], roughness: 0.8 }), c[0], c[1], 0.012); d.rotation.x = Math.PI / 2; });
    box(1.5, 0.04, 0.55, m.counter, 3.2, 0.75, 0.28); box(0.45, 0.73, 0.5, m.base, 3.7, 0.365, 0.26); box(0.03, 0.73, 0.5, m.base, 2.47, 0.365, 0.26);
    [1.25, 1.65].forEach(function (y) { box(1.5, 0.03, 0.26, m.walnutSolid, 3.2, y, 0.13); for (var bk = 0; bk < 6; bk++) box(0.05, 0.2 + (bk % 3) * 0.04, 0.18, M({ color: CLOTH[(bk * 3 + (y > 1.4 ? 2 : 0)) % 8], roughness: 0.8 }), 2.6 + bk * 0.07, y + 0.12 + (bk % 3) * 0.02, 0.12); });
    box(0.44, 0.06, 0.42, m.terracotta, 3.0, 0.46, 0.85); box(0.42, 0.42, 0.05, m.terracotta, 3.0, 0.7, 1.05); k.cyl(0.02, 0.02, 0.42, m.hood, 3.0, 0.22, 0.85, 8);
    disc(k, 0.85, M({ color: 0x8c9b87, roughness: 1 })).position.set(2.5, 0.006, 2.2);
    var bean = k.sph(0.32, M({ color: 0x51708f, roughness: 0.95 }), 3.3, 0.24, 2.3); bean.scale.set(1.1, 0.75, 1.1);
    k.doors = wardrobe(k, k.run(4.6, 0, 1.4, -Math.PI / 2), 0, 1.8, { doors: 2, loft: true, h: 2.0, seed: 9, flip: true });
    k.update = function (t) { animDoors(k.doors, t); };
    k.views = { front: { p: [2.5, 2.1, 6.4], t: [2.3, 0.9, 1.6] }, corner: { p: [0.9, 2.4, 6.0], t: [2.4, 0.9, 1.6] }, top: { p: [2.4, 6.4, 2.8], t: [2.3, 0.4, 1.7] } }; k.az = [-0.5, 1.0];
    return k;
  }
  function buildGuest(ctx) {
    var k = bedRoom(ctx), m = k.mats, box = k.box;
    box(2.6, 1.5, 0.04, m.walnutSolid, 2.5, 1.05, 0.02);
    [1.4, 3.6].forEach(function (x) { k.cyl(0.07, 0.1, 0.18, m.warm, x, 1.45, 0.1); var l = new THREE.PointLight(0xffcf8a, 0.4, 2, 2); l.position.set(x, 1.4, 0.3); ctx.root.add(l); });
    box(1.6, 0.3, 2.0, m.base, 2.5, 0.15, 1.12); box(1.7, 0.55, 0.08, m.fabric, 2.5, 0.75, 0.08); box(1.54, 0.2, 1.9, m.linen, 2.5, 0.4, 1.14);
    box(1.58, 0.05, 1.25, M({ color: 0xd9c4ae, roughness: 0.95 }), 2.5, 0.525, 1.5); box(1.6, 0.055, 0.32, m.terracotta, 2.5, 0.55, 1.8);
    box(0.55, 0.13, 0.34, m.linen, 2.15, 0.57, 0.32); box(0.55, 0.13, 0.34, m.linen, 2.85, 0.57, 0.32);
    [1.4, 3.6].forEach(function (x) { box(0.45, 0.45, 0.4, m.walnutSolid, x, 0.225, 0.24); k.cyl(0.05, 0.04, 0.18, m.acrylic, x, 0.54, 0.24); k.sph(0.06, m.leaf, x, 0.66, 0.24); });
    box(1.2, 0.42, 0.4, m.fabricDark, 2.5, 0.21, 2.45);
    k.doors = wardrobe(k, k.run(0, 0, 3.4, Math.PI / 2), 0, 1.6, { doors: 2, h: 2.2, seed: 13 });
    k.cyl(0.16, 0.12, 0.42, m.pot, 4.25, 0.21, 0.45); k.sph(0.25, m.leaf, 4.25, 0.66, 0.45); k.sph(0.18, m.leaf, 4.2, 0.92, 0.4);
    k.update = function (t) { animDoors(k.doors, t); };
    k.views = { front: { p: [2.7, 1.9, 6.3], t: [2.4, 0.85, 1.5] }, corner: { p: [5.3, 2.2, 4.8], t: [1.9, 0.95, 1.8] }, top: { p: [2.5, 6.4, 2.7], t: [2.3, 0.4, 1.7] } }; k.az = [-0.5, 1.25];
    return k;
  }
  function buildWSlide(ctx) {
    var k = bedRoom(ctx), m = k.mats, box = k.box;
    k.doors = wardrobe(k, k.run(0.8, 0, 0), 0, 3.0, { sliding: true, doors: 3, accent: true, h: 2.4, seed: 21 });
    box(2.6, 0.01, 1.6, m.rug, 2.3, 0.006, 1.9, null, true);
    var pf = k.cyl(0.3, 0.3, 0.4, m.fabricDark, 2.3, 0.2, 1.9, 24);
    k.update = function (t) { animDoors(k.doors, t); };
    k.views = { front: { p: [2.3, 1.55, 4.6], t: [2.3, 1.2, 0.4] }, corner: { p: [4.6, 1.9, 3.6], t: [2.3, 1.2, 0.4] }, top: { p: [2.3, 5.4, 2.4], t: [2.3, 0.8, 0.6] } }; k.az = [-0.8, 0.8]; k.dist = [1.6, 8];
    return k;
  }
  function buildWHinged(ctx) {
    var k = bedRoom(ctx), m = k.mats, box = k.box;
    k.doors = wardrobe(k, k.run(1.1, 0, 0), 0, 2.4, { doors: 4, loft: true, h: 2.0, seed: 31 });
    box(0.7, 0.75, 0.4, m.walnutSolid, 4.0, 0.375, 0.2); box(0.55, 0.85, 0.02, M({ color: 0xd9e2e8, roughness: 0.05, metalness: 0.9 }), 4.0, 1.3, 0.012);
    box(2.4, 0.01, 1.5, m.rug, 2.3, 0.006, 1.8, null, true);
    k.update = function (t) { animDoors(k.doors, t); };
    k.views = { front: { p: [2.4, 1.6, 4.8], t: [2.3, 1.25, 0.4] }, corner: { p: [4.7, 2.0, 3.8], t: [2.3, 1.2, 0.4] }, top: { p: [2.3, 5.4, 2.4], t: [2.3, 0.8, 0.6] } }; k.az = [-0.8, 0.8]; k.dist = [1.6, 8];
    return k;
  }
  function buildWWalk(ctx) {
    var k = bedRoom(ctx), m = k.mats, box = k.box;
    box(0.05, 2.6, 4.2, m.wall2, 3.625, 1.3, 2.1);
    wardrobe(k, k.run(0.0, 0, 0), 0, 3.6, { open: true, h: 2.35, seed: 41 });
    wardrobe(k, k.run(0, 0, 3.2, Math.PI / 2), 0, 2.6, { open: true, h: 2.35, seed: 43, flip: true });
    wardrobe(k, k.run(3.6, 0, 0.6, -Math.PI / 2), 0, 2.6, { open: true, h: 2.35, seed: 47 });
    [[1.8, 0.62, 3.4, 0.02], [0.62, 1.9, 0.02, 2.5], [2.98, 1.9, 0.02, 2.5]].forEach(function (b) { k.leds.push(box(b[2], 0.012, b[3], m.led, b[0], 2.38, b[1], null, true)); });
    box(1.4, 0.85, 0.7, m.base, 1.8, 0.425, 1.95);
    [0.2, 0.45, 0.68].forEach(function (y) { box(1.36, 0.01, 0.005, m.hood, 1.8, y, 2.303); });
    box(1.46, 0.04, 0.76, m.counter, 1.8, 0.87, 1.95); box(1.36, 0.01, 0.66, m.glassClear, 1.8, 0.9, 1.95, null, true);
    k.cyl(0.05, 0.25, 0.1, m.warm, 1.8, 2.4, 1.95); var l = new THREE.PointLight(0xffd59a, 0.7, 4, 2); l.position.set(1.8, 2.1, 1.95); ctx.root.add(l);
    k.cyl(0.26, 0.26, 0.42, m.terracotta, 1.8, 0.21, 3.05, 24);
    k.views = { front: { p: [1.8, 2.0, 6.2], t: [1.8, 1.1, 1.4] }, corner: { p: [4.9, 2.6, 5.4], t: [1.8, 1.0, 1.4] }, top: { p: [1.8, 6.2, 2.6], t: [1.8, 0.5, 1.5] } }; k.az = [-0.55, 0.85];
    return k;
  }


  /* TV units */
  function tvRoom(ctx) { var k = bedRoom(ctx), m = k.mats; k.box(2.6, 0.01, 1.8, m.rug, 2.3, 0.006, 2.7, null, true); k.box(1.0, 0.05, 0.55, m.marble, 2.3, 0.4, 2.6); k.box(0.8, 0.36, 0.4, m.walnutSolid, 2.3, 0.19, 2.6); return k; }
  function tvScreen(k, x, y, z, w, ry) {
    var h = w * 0.5625, g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry || 0; k.root.add(g);
    k.box(w, h, 0.035, k.mats.glass, 0, 0, 0, g);
    k.box(w - 0.03, h - 0.03, 0.002, M({ color: 0x10161d, emissive: 0x2a4256, emissiveIntensity: 0.5, roughness: 0.15 }), 0, 0, 0.0185, g, true);
    return g;
  }
  function tvConsole(k, x, y, z, w, n, h) {
    var m = k.mats; h = h || 0.32; k.box(w, h, 0.42, m.carcass, x, y, z + 0.21);
    var dw = w / n;
    for (var i = 0; i < n; i++) { var cx = x - w / 2 + dw * (i + 0.5); k.box(dw - 0.006, h - 0.01, 0.02, m.base, cx, y, z + 0.43); k.handles.push(k.box(Math.min(0.4, dw * 0.5), 0.012, 0.022, m.handle, cx, y + h / 2 - 0.04, z + 0.45)); }
    k.leds.push(k.box(w - 0.1, 0.01, 0.02, m.led, x, y - h / 2 - 0.006, z + 0.36, null, true));
    var l = new THREE.PointLight(0xffd59a, 0.35, 1.4, 2); l.position.set(x, y - h / 2 - 0.1, z + 0.4); k.root.add(l); k.leds.push(l);
  }
  function decor(k, x, y, z, i) { var m = k.mats; if (i % 3 === 0) k.sph(0.06, m.brass, x, y + 0.06, z); else if (i % 3 === 1) { k.cyl(0.05, 0.04, 0.18, m.acrylic, x, y + 0.09, z); k.sph(0.05, m.leaf, x, y + 0.2, z); } else k.box(0.04, 0.2, 0.15, m.terracotta, x, y + 0.1, z); }
  var TVV = { front: { p: [2.3, 1.55, 5.4], t: [2.3, 1.2, 0.5] }, corner: { p: [4.7, 1.9, 4.4], t: [2.1, 1.1, 0.6] }, top: { p: [2.3, 5.6, 2.6], t: [2.3, 0.6, 1.0] } };
  function buildTvFloat(ctx) {
    var k = tvRoom(ctx), m = k.mats, box = k.box;
    box(3.0, 2.5, 0.03, m.upper, 2.3, 1.25, 0.015);
    tvConsole(k, 2.3, 0.45, 0.03, 2.4, 3); tvScreen(k, 2.3, 1.38, 0.07, 1.45);
    [0.95, 1.35, 1.75].forEach(function (y, i) { box(0.7, 0.03, 0.25, m.base, 0.45, y, 0.125); decor(k, 0.3 + (i % 2) * 0.25, y + 0.015, 0.12, i); });
    k.cyl(0.16, 0.12, 0.42, m.pot, 4.15, 0.21, 0.35); k.sph(0.25, m.leaf, 4.15, 0.66, 0.35); k.sph(0.18, m.leaf, 4.1, 0.92, 0.3);
    k.views = TVV; k.az = [-0.8, 0.9]; k.dist = [1.6, 8]; return k;
  }
  function buildTvMarble(ctx) {
    var k = tvRoom(ctx), m = k.mats, box = k.box;
    box(2.4, 2.5, 0.04, m.counter, 2.3, 1.25, 0.02);
    k.leds.push(box(2.44, 0.012, 0.02, m.led, 2.3, 2.49, 0.06, null, true));
    for (var i = 0; i < 8; i++) { box(0.045, 2.5, 0.05, m.base, 0.55 + i * 0.075, 1.25, 0.04); box(0.045, 2.5, 0.05, m.base, 3.53 + i * 0.075, 1.25, 0.04); }
    tvConsole(k, 2.3, 0.42, 0.04, 2.2, 3); tvScreen(k, 2.3, 1.4, 0.08, 1.4);
    var l = new THREE.PointLight(0xffd59a, 0.45, 2.5, 2); l.position.set(2.3, 2.3, 0.3); k.root.add(l); k.leds.push(l);
    k.views = TVV; k.az = [-0.8, 0.9]; k.dist = [1.6, 8]; return k;
  }
  function buildTvDisplay(ctx) {
    var k = tvRoom(ctx), m = k.mats, box = k.box;
    box(2.0, 2.5, 0.03, m.upper, 2.3, 1.25, 0.015);
    tvConsole(k, 2.3, 0.42, 0.03, 2.0, 2); tvScreen(k, 2.3, 1.32, 0.07, 1.35);
    box(2.0, 0.42, 0.35, m.base, 2.3, 2.3, 0.175); k.handles.push(box(0.6, 0.012, 0.022, m.handle, 2.3, 2.13, 0.37));
    [1.0, 3.6].forEach(function (x, si) {
      box(0.6, 2.4, 0.42, m.base, x, 1.25, 0.21); box(0.52, 2.2, 0.4, M({ color: 0x2c2018, roughness: 0.7 }), x, 1.25, 0.215);
      [0.55, 0.95, 1.35, 1.75].forEach(function (y, i) { box(0.52, 0.02, 0.38, m.warm, x, y, 0.21, null, true); decor(k, x + (i % 2 ? 0.1 : -0.1), y + 0.01, 0.2, i + si); });
      box(0.54, 2.22, 0.01, m.glassClear, x, 1.25, 0.425, null, true);
      var l = new THREE.PointLight(0xffd59a, 0.4, 1.6, 2); l.position.set(x, 1.3, 0.5); k.root.add(l); k.leds.push(l);
    });
    k.views = TVV; k.az = [-0.8, 0.9]; k.dist = [1.6, 8]; return k;
  }
  function buildTvFluted(ctx) {
    var k = tvRoom(ctx), m = k.mats, box = k.box;
    for (var i = 0; i < 30; i++) box(0.07, 2.5, 0.04, m.upper, 0.92 + i * 0.095, 1.25, 0.02);
    box(2.6, 0.55, 0.45, m.base, 2.3, 0.4, 0.26);
    for (var d = 0; d < 4; d++) { box(0.004, 0.5, 0.005, m.hood, 1.0 + 0.65 * (d + 1) - 0.65 + 0.65, 0.4, 0.486); k.handles.push(box(0.012, 0.18, 0.022, m.handle, 1.3 + d * 0.65, 0.45, 0.5)); }
    [[1.1, 0.25], [3.5, 0.25], [1.1, 0.42], [3.5, 0.42]].forEach(function (p) { k.cyl(0.015, 0.012, 0.13, m.brass, p[0], 0.065, p[1], 8); });
    tvScreen(k, 2.3, 1.42, 0.08, 1.45);
    box(0.03, 2.0, 0.32, m.base, 3.95, 1.0, 0.16); box(0.03, 2.0, 0.32, m.base, 4.55, 1.0, 0.16);
    [0.02, 0.5, 1.0, 1.5, 1.99].forEach(function (y, i) { box(0.6, 0.025, 0.32, m.base, 4.25, y, 0.16); if (i < 4) decor(k, 4.25, y + 0.012, 0.16, i); });
    k.views = TVV; k.az = [-0.8, 0.9]; k.dist = [1.6, 8]; return k;
  }
  function buildTvCorner(ctx) {
    var k = bedRoom(ctx), m = k.mats, box = k.box;
    box(2.4, 0.01, 2.0, m.rug, 2.0, 0.006, 2.0, null, true);
    box(1.8, 0.32, 0.42, m.carcass, 1.32, 0.42, 0.21); box(0.42, 0.32, 1.38, m.carcass, 0.21, 0.42, 1.11);
    [0.75, 1.35, 1.95].forEach(function (x) { box(0.58, 0.31, 0.02, m.base, x, 0.42, 0.43); k.handles.push(box(0.3, 0.012, 0.022, m.handle, x, 0.54, 0.45)); });
    [1.05, 1.65].forEach(function (z) { box(0.02, 0.31, 0.58, m.base, 0.43, 0.42, z); k.handles.push(box(0.022, 0.012, 0.3, m.handle, 0.45, 0.54, z)); });
    var pg = new THREE.Group(); pg.position.set(0.62, 1.5, 0.62); pg.rotation.y = Math.PI / 4; k.root.add(pg);
    box(1.4, 1.75, 0.04, m.upper, 0, 0, 0, pg); k.leds.push(box(1.42, 0.012, 0.02, m.led, 0, -0.88, 0.04, pg, true));
    tvScreen(k, 0.62 + 0.035, 1.5, 0.62 + 0.035, 1.15, Math.PI / 4);
    box(1.0, 0.03, 0.25, m.base, 1.75, 1.55, 0.125); box(0.25, 0.03, 1.0, m.base, 0.125, 1.55, 1.75);
    decor(k, 1.5, 1.565, 0.12, 0); decor(k, 2.0, 1.565, 0.12, 1); decor(k, 0.12, 1.565, 1.6, 2);
    box(1.0, 0.05, 0.55, m.marble, 2.0, 0.4, 2.0); box(0.8, 0.36, 0.4, m.walnutSolid, 2.0, 0.19, 2.0);
    k.views = { front: { p: [3.9, 1.7, 3.9], t: [0.9, 1.05, 0.9] }, corner: { p: [2.0, 2.0, 5.0], t: [0.9, 1.0, 1.0] }, top: { p: [1.6, 5.4, 2.4], t: [1.2, 0.5, 1.2] } }; k.az = [0.05, 1.5]; k.dist = [1.6, 8];
    return k;
  }

  var DESIGNS = {
    kitchen: [
      ['k-l', 'L-shaped', 'Two walls meet in a corner for an efficient work triangle. The most popular layout in 2BHK and 3BHK apartments.', '2.7 m × 2.7 m'],
      ['k-u', 'U-shaped', 'Three walls of storage and counter space. Ideal for larger kitchens and serious everyday cooking.', '3.3 m × 2.4 m'],
      ['k-par', 'Parallel', 'Two facing counters with a walkway between. Perfect for long, narrow kitchens.', '3.0 m × 2.6 m'],
      ['k-str', 'Straight', 'Everything on one wall. Compact and budget-friendly for studios and 1BHK homes.', '3.6 m run'],
      ['k-isl', 'Island', 'A straight run plus a central island with hob and seating. Made for open-plan villas.', '3.6 m + 2.0 m island']
    ],
    bedroom: [
      ['b-master', 'Master bedroom', 'Upholstered headboard wall, backlit panel, two-tone sliding wardrobe and side tables.', 'King bed · 2.6 m wardrobe'],
      ['b-kids', 'Kids bedroom', 'Storage bed with drawers, study desk with shelves and a hinged wardrobe with loft.', 'Single bed · study unit'],
      ['b-guest', 'Guest bedroom', 'Calm and compact: queen bed, walnut wall panel, sconces and a 2-door wardrobe.', 'Queen bed · 1.6 m wardrobe']
    ],
    tv: [
      ['tv-float', 'Floating TV unit', 'A wall-mounted console with drop-down shutters, an accent back panel and floating shelves. Easy to clean under.', '2.4 m console'],
      ['tv-marble', 'Marble feature wall', 'A marble-finish panel framed by fluted slats, with a backlit edge and floating console, like our Deeraj living rooms.', '2.4 m panel'],
      ['tv-display', 'With display cabinets', 'Glass-front display cabinets with lit shelves on both sides, plus bridge storage above the TV.', '3.2 m wall-to-wall'],
      ['tv-fluted', 'Fluted panel wall', 'Full-height fluted panelling, a long credenza on brass legs and an open shelf tower.', '2.8 m wall'],
      ['tv-corner', 'Corner TV unit', 'An L-shaped low unit that wraps the corner with an angled TV panel. Smart for compact living rooms.', '1.8 m × 1.8 m']
    ],
    wardrobe: [
      ['w-slide', 'Sliding wardrobe', 'Space-saving sliding shutters with accent strips. Watch a shutter glide open.', '3.0 m × 2.4 m, 3 shutters'],
      ['w-hinged', 'Hinged wardrobe with loft', 'Four doors that open fully to show hanging, shelves and drawers, with loft storage above.', '2.4 m × 2.5 m'],
      ['w-walk', 'Walk-in wardrobe', 'Open shelving on three walls, hanging zones, a drawer island and LED lighting.', 'U-shaped, 3.6 m']
    ]
  };

  var BUILD = { kitchen: buildKitchen, living: buildLiving, bedroom: buildBedroom, assembly: buildAssembly, office: buildOffice, towers: buildTowers, storefront: buildStore, turntable: buildTurntable, map: buildMap,
    'k-l': buildKitchen, 'k-u': buildKitU, 'k-par': buildKitPar, 'k-str': buildKitStr, 'k-isl': buildKitIsl,
    'b-master': buildMaster, 'b-kids': buildKids, 'b-guest': buildGuest, 'w-slide': buildWSlide, 'w-hinged': buildWHinged, 'w-walk': buildWWalk,
    'tv-float': buildTvFloat, 'tv-marble': buildTvMarble, 'tv-display': buildTvDisplay, 'tv-fluted': buildTvFluted, 'tv-corner': buildTvCorner };

  /* ---- viewer ---- */
  function Viewer(el, opts) {
    var self = this; this.el = el; this.opts = opts || {};
    var r = this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
    el.insertBefore(r.domElement, el.firstChild);
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    var c = this.controls = new THREE.OrbitControls(this.camera, r.domElement);
    c.enableDamping = true; c.dampingFactor = 0.08; c.enablePan = false; c.minDistance = 1.8; c.maxDistance = 9; c.maxPolarAngle = Math.PI * 0.49;
    this.lastTouch = 0; c.addEventListener('start', function () { self.anim = null; self.lastTouch = performance.now(); self.userMoved = true; });
    this.ro = window.ResizeObserver ? new ResizeObserver(function () { self.resize(); }) : null; if (this.ro) this.ro.observe(el); else window.addEventListener('resize', function () { self.resize(); });
    this.alive = true; this.visible = true; this.t0 = performance.now();
    if (window.IntersectionObserver) { this.io = new IntersectionObserver(function (en) { self.visible = en[0].isIntersecting; }); this.io.observe(el); }
    this.loop = function (now) {
      if (!self.alive) return;
      if (self.anim) { var k = Math.min(1, (now - self.anim.s) / self.anim.d), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; self.camera.position.lerpVectors(self.anim.fp, self.anim.tp, e); c.target.lerpVectors(self.anim.ft, self.anim.tt, e); if (k >= 1) self.anim = null; }
      if (self.opts.sway && self.pivot && !reduce) { var idle = now - self.lastTouch > 2500; var target = idle ? Math.sin((now - self.t0) / 4200) * 0.22 : self.pivot.rotation.y; self.pivot.rotation.y += (target - self.pivot.rotation.y) * 0.03; }
      if (self.opts.spin && self.pivot && !reduce && now - self.lastTouch > 2500) self.pivot.rotation.y += 0.0035;
      if (self.k && self.k.update) self.k.update((now - self.t0) / 1000, self);
      if (!self.visible) { self.raf = requestAnimationFrame(self.loop); return; }
      c.update(); r.render(self.scene, self.camera); self.raf = requestAnimationFrame(self.loop);
    };
  }
  Viewer.prototype.resize = function () { var w = this.el.clientWidth, h = this.el.clientHeight; if (!w || !h) return; this.renderer.setSize(w, h, false); this.camera.aspect = w / h; this.camera.fov = w / h < 0.9 ? 54 : 40; this.camera.updateProjectionMatrix(); };
  Viewer.prototype.load = function (name, view) {
    var old = this.scene;
    if (old) old.traverse(function (o) { if (o.geometry) o.geometry.dispose(); if (o.material && o.material.dispose) o.material.dispose(); });
    var scene = this.scene = new THREE.Scene(), pivot = this.pivot = new THREE.Group(), inner = new THREE.Group();
    scene.add(pivot); pivot.add(inner);
    var ctx = { scene: scene, root: inner, opts: this.opts }, k = this.k = BUILD[name](ctx);
    var vw = k.views[view] ? view : Object.keys(k.views)[0], tgt = k.views[vw].t;
    pivot.position.set(tgt[0], 0, tgt[2]); inner.position.set(-tgt[0], 0, -tgt[2]);
    this.controls.minAzimuthAngle = k.az ? k.az[0] : -Infinity; this.controls.maxAzimuthAngle = k.az ? k.az[1] : Infinity;
    if (k.dist) { this.controls.minDistance = k.dist[0]; this.controls.maxDistance = k.dist[1]; }
    this.name = name; this.resize(); this.go(vw, true);
    applyCfg(this);
    if (!this.raf) this.raf = requestAnimationFrame(this.loop);
    var ld = this.el.querySelector('.s-load'); if (ld) ld.hidden = true;
  };
  Viewer.prototype.go = function (view, instant) {
    var v = this.k.views[view]; if (!v) return;
    var tp = new THREE.Vector3().fromArray(v.p), tt = new THREE.Vector3().fromArray(v.t);
    this.el.querySelectorAll('[data-view]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === view)); });
    if (instant || reduce) { this.camera.position.copy(tp); this.controls.target.copy(tt); this.controls.update(); this.anim = null; return; }
    this.anim = { fp: this.camera.position.clone(), ft: this.controls.target.clone(), tp: tp, tt: tt, s: performance.now(), d: 900 };
  };
  Viewer.prototype.dispose = function () {
    this.alive = false; cancelAnimationFrame(this.raf); this.raf = null; if (this.ro) this.ro.disconnect(); if (this.io) this.io.disconnect();
    if (this.scene) this.scene.traverse(function (o) { if (o.geometry) o.geometry.dispose(); if (o.material && o.material.dispose) o.material.dispose(); });
    this.controls.dispose(); this.renderer.dispose(); if (this.renderer.forceContextLoss) this.renderer.forceContextLoss();
    if (this.renderer.domElement.parentNode) this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
  };

  function applyCfg(v) {
    if (!v || !v.k || !v.k.mats) return; var F = finishes(), k = v.k;
    applyFin(k.mats.base, find(F.shutter, CFG.base)); applyFin(k.mats.upper, find(F.shutter, CFG.upper)); applyFin(k.mats.counter, find(F.counter, CFG.counter));
    var h = find(F.handle, CFG.handle); k.handles.forEach(function (m) { m.visible = !h.hidden; }); if (!h.hidden) applyFin(k.mats.handle, h);
    k.leds.forEach(function (m) { m.visible = CFG.led; });
  }
  function updateLabels() {
    var F = finishes();
    var b = find(F.shutter, CFG.base).name, u = find(F.shutter, CFG.upper).name, c = find(F.counter, CFG.counter).name, h = find(F.handle, CFG.handle).name;
    setText('lb-base', b); setText('lb-upper', u); setText('lb-counter', c); setText('lb-handle', h);
    setHref('quote', 'https://wa.me/919000700930?text=' + encodeURIComponent('Hi Deeraj Interiors, I would like a quote for an L-shaped modular kitchen: base shutters ' + b + ', upper shutters ' + u + ', ' + c + ' countertop, ' + h + ' handles.'));
    ['base', 'upper', 'counter', 'handle'].forEach(function (key, i) { var e = document.getElementById('d-lb-' + key); if (e) e.textContent = [b, u, c, h][i]; });
    var d = curDesign(); if (!d) return;
    setText('d-name', d[1]); setText('d-desc', d[2]); setText('d-size', d[3]);
    var txt = 'Hi Deeraj Interiors, I would like a quote for a ' + d[1] + (dCat === 'kitchen' ? ' kitchen' : '') + ': shutters ' + b + ', ' + (dCat === 'kitchen' ? 'upper shutters ' + u + ', ' + c + ' countertop, ' : dCat === 'tv' ? 'back panel ' + u + ', ' + c + ' feature panel, ' : 'accent ' + u + ', ') + h + ' handles.';
    setHref('d-quote', 'https://wa.me/919000700930?text=' + encodeURIComponent(txt));
  }
  var dCat = 'kitchen', dType = { kitchen: 'k-l', bedroom: 'b-master', wardrobe: 'w-slide', tv: 'tv-marble' };
  var DSEC = { 'gallery-kitchens': 'kitchen', 'gallery-bedrooms': 'bedroom', 'gallery-wardrobes': 'wardrobe', 'gallery-tvunits': 'tv' };
  function curDesign() { var list = DESIGNS[dCat]; for (var i = 0; i < list.length; i++) if (list[i][0] === dType[dCat]) return list[i]; return list[0]; }
  function drawTypes() {
    var el = document.getElementById('d-types'); if (!el) return;
    el.innerHTML = DESIGNS[dCat].map(function (d) { return '<button type="button" data-type="' + d[0] + '" aria-pressed="' + (d[0] === dType[dCat]) + '"><b>' + esc(d[1]) + '</b><span>' + esc(d[3]) + '</span></button>'; }).join('');
    el.querySelectorAll('button').forEach(function (b) { b.onclick = function () { dType[dCat] = b.getAttribute('data-type'); drawTypes(); loadDesign(); }; });
    setHidden('d-counter-grp', !(dCat === 'kitchen' || dCat === 'tv'));
    setText('d-counter-label', dCat === 'tv' ? 'Feature panel' : 'Countertop');
    setText('d-upper-label', dCat === 'kitchen' ? 'Upper shutters' : dCat === 'tv' ? 'Back panel & flutes' : 'Accent & drawers');
    document.querySelectorAll('[data-cat]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === dCat)); });
  }
  function loadDesign() { updateLabels(); var v = viewers['st-gallery'], d = curDesign(); if (v) v.load(d[0], dCat === 'kitchen' ? 'corner' : 'front'); }
  function setCat(c) { if (!DESIGNS[c]) return; dCat = c; drawTypes(); loadDesign(); }

  var viewers = {};
  function mountViewer(id, scene, opts, view) {
    var el = document.getElementById(id);
    if (!has3D) { var ld = el.querySelector('.s-load'); if (ld) ld.textContent = '3D needs a browser with WebGL. Try Chrome or Safari.'; return null; }
    var v = new Viewer(el, opts); v.load(scene, view); viewers[id] = v;
    el.querySelectorAll('[data-view]').forEach(function (b) { b.onclick = function () { v.go(b.getAttribute('data-view')); }; });
    return v;
  }
  var storeProd = 'vase', mapPin = 'all';
    var STAGES = {
    home: [['st-home', 'tv-marble', { sway: true }, 'front']],
    about: [['st-about', 'assembly', { spin: true, variant: 'wardrobe' }, 'front']],
    services: [['st-services', 'office', { sway: true }, 'front']],
    factory: [['st-factory', 'kitchen', {}, 'corner'], ['st-assembly', 'assembly', { spin: true, variant: 'kitchen', onStep: function (s) { document.querySelectorAll('#flow > div').forEach(function (d, i) { d.classList.toggle('on', i === s); }); } }, 'front']],
    projects: [['st-projects', 'towers', { spin: true }, 'front']],
    gallery: [['st-gallery', null, {}, 'front']],
    partner: [['st-partner', 'storefront', { sway: true }, 'front']],
    store: [['st-store', 'turntable', { spin: true }, 'front']],
    contact: [['st-contact', 'map', {}, 'all']]
  };
  var stageIO = [];
  function afterMount(id, v) {
    if (!v) return;
    if (id === 'st-store') {
      v.k.setProduct(storeProd);
      document.querySelectorAll('[data-prod]').forEach(function (b) { b.onclick = function () { storeProd = b.getAttribute('data-prod'); document.querySelectorAll('[data-prod]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); v.k.setProduct(storeProd); v.pivot.rotation.y = 0; }; });
    }
    if (id === 'st-contact') {
      document.querySelectorAll('[data-pin]').forEach(function (b) { b.onclick = function () { mapPin = b.getAttribute('data-pin'); document.querySelectorAll('[data-pin]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); v.k.selected = mapPin; v.go(mapPin); }; });
    }
  }
  function mount3D(page) {
    Object.keys(viewers).forEach(function (id) { viewers[id].dispose(); delete viewers[id]; });
    stageIO.forEach(function (o) { o.disconnect(); }); stageIO = [];
    if (!THREE) return;
    (STAGES[page] || []).forEach(function (s) {
      var el = document.getElementById(s[0]); if (!el) return;
      var go = function () { if (viewers[s[0]]) return; var v = mountViewer(s[0], s[1] || curDesign()[0], s[2], s[1] ? s[3] : (dCat === 'kitchen' ? 'corner' : 'front')); afterMount(s[0], v); };
      if (window.IntersectionObserver) { var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { go(); io.disconnect(); } }, { rootMargin: '300px' }); io.observe(el); stageIO.push(io); }
      else go();
    });
  }


  /* ================= studio finish pickers ================= */
  // configurator panel
  function bindStudio() {
    var F = finishes();
    [['g-base', F.shutter, 'base'], ['g-upper', F.shutter, 'upper'], ['g-counter', F.counter, 'counter'], ['g-handle', F.handle, 'handle'],
     ['d-base', F.shutter, 'base'], ['d-upper', F.shutter, 'upper'], ['d-counter', F.counter, 'counter'], ['d-handle', F.handle, 'handle']].forEach(function (g) {
      var el = document.getElementById(g[0]); if (!el || el.dataset.bound) return; el.dataset.bound = '1';
      g[1].forEach(function (f) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'swb'; b.id = g[0] + '-' + f.id; b.setAttribute('aria-pressed', String(CFG[g[2]] === f.id));
        var chip = document.createElement('span'); chip.className = 'swc'; chip.style.background = chipCss(f);
        var lb = document.createElement('span'); lb.textContent = f.name; b.appendChild(chip); b.appendChild(lb);
        b.setAttribute('data-key', g[2]); b.setAttribute('data-id', f.id);
        b.addEventListener('click', function () { CFG[g[2]] = f.id; document.querySelectorAll('.swb[data-key="' + g[2] + '"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-id') === f.id)); }); updateLabels(); Object.keys(viewers).forEach(function (id) { applyCfg(viewers[id]); }); });
        el.appendChild(b);
      });
    });
    updateLabels();
    var led = document.querySelector('#st-factory .s-led');
    if (led && !led.dataset.bound) { led.dataset.bound = '1'; led.addEventListener('click', function () { CFG.led = !CFG.led; led.setAttribute('aria-pressed', String(CFG.led)); applyCfg(viewers['st-factory']); }); }
    bindLooks();
  }
  var LOOKS = [
    ['Warm walnut', { base: 'walnut', upper: 'acrylic', counter: 'quartz', handle: 'brass' }],
    ['Scandi oak', { base: 'oak', upper: 'ivory', counter: 'marble', handle: 'gola' }],
    ['Modern graphite', { base: 'graphite', upper: 'oak', counter: 'granite', handle: 'black' }],
    ['Royal navy', { base: 'navy', upper: 'acrylic', counter: 'calacatta', handle: 'brass' }],
    ['Sage &amp; teak', { base: 'sage', upper: 'teak', counter: 'kashmir', handle: 'rosegold' }],
    ['Glossy noir', { base: 'noir', upper: 'cashmere', counter: 'nero', handle: 'chrome' }],
    ['Earthy terracotta', { base: 'terra', upper: 'ivory', counter: 'terrazzo', handle: 'gunmetal' }],
    ['Urban concrete', { base: 'olive', upper: 'oak', counter: 'concrete', handle: 'black' }]
  ];
  function applyLook(look) {
    Object.keys(look).forEach(function (key) { CFG[key] = look[key]; document.querySelectorAll('.swb[data-key="' + key + '"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-id') === look[key])); }); });
    updateLabels(); Object.keys(viewers).forEach(function (id) { applyCfg(viewers[id]); });
  }
  function bindLooks() {
  ['g-looks', 'd-looks'].forEach(function (id) {
    var el = document.getElementById(id); if (!el || el.dataset.bound) return; el.dataset.bound = '1'; var F = finishes();
    el.innerHTML = LOOKS.map(function (l, i) {
      var sw = [find(F.shutter, l[1].base).chip, find(F.shutter, l[1].upper).chip, find(F.counter, l[1].counter).chip];
      return '<button type="button" data-look="' + i + '"><span class="lk-sw"><i style="background:' + sw[0] + '"></i><i style="background:' + sw[1] + '"></i><i style="background:' + sw[2] + '"></i></span>' + l[0] + '</button>';
    }).join('');
    el.querySelectorAll('button').forEach(function (b) { b.addEventListener('click', function () { applyLook(LOOKS[+b.getAttribute('data-look')][1]); document.querySelectorAll('.looks button').forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-look') === b.getAttribute('data-look')); }); }); });
  });
  document.querySelectorAll('.swb:not([data-lk])').forEach(function (b) { b.setAttribute('data-lk', '1'); b.addEventListener('click', function () { document.querySelectorAll('.looks button').forEach(function (x) { x.classList.remove('on'); }); }); });
  }

  var cats = function () {
    document.querySelectorAll('[data-cat]:not([data-cb])').forEach(function (b) { b.setAttribute('data-cb', '1'); b.addEventListener('click', function () { setCat(b.getAttribute('data-cat')); }); });
  };

  /** Called by each page after it renders. Returns a cleanup function. */
  function mountPage(page) {
    if (!has3D) {
      document.querySelectorAll('.s-load').forEach(function (e) { e.textContent = '3D needs a browser with WebGL. Try Chrome or Safari.'; });
    }
    bindStudio();
    cats();
    if (page === 'gallery') drawTypes();
    updateLabels();
    mount3D(page);
    return function () {
      Object.keys(viewers).forEach(function (id) { viewers[id].dispose(); delete viewers[id]; });
      stageIO.forEach(function (o) { o.disconnect(); }); stageIO = [];
    };
  }
  /** Gallery sub-links (#gallery-kitchens …) switch the 3D design category. */
  function showDesignFor(hash) { var c = DSEC[String(hash || '').replace('#', '')]; if (c) setCat(c); }

  export { mountPage, showDesignFor };
