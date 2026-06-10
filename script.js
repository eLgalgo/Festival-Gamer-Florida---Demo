/* ===== Florida Gamer Festival 5 ===== */

/* --- Juegos / torneos --- */
const GAMES = [
  { ico:'⚽', name:'FIFA / EA FC', desc:'Modalidades 1v1 y 11v11. ¡Defendé tu equipo!', tag:'1v1 · 11v11', color:'#a4d233' },
  { ico:'🔫', name:'Valorant', desc:'Táctico 5v5. Estrategia, puntería y trabajo en equipo.', tag:'5v5', color:'#e63451' },
  { ico:'🏆', name:'League of Legends', desc:'El MOBA por excelencia. Llaves eliminatorias.', tag:'5v5', color:'#5b8def' },
  { ico:'🪂', name:'Fortnite', desc:'Battle Royale. El último en pie se lleva la corona.', tag:'Solo', color:'#f7941d' },
  { ico:'⛏️', name:'Minecraft', desc:'Build Battle. Creatividad contra reloj.', tag:'Creativo', color:'#7ed957' },
  { ico:'🚗', name:'Rocket League', desc:'Fútbol con autos a toda velocidad.', tag:'3v3', color:'#3fb8d2' },
  { ico:'💥', name:'Counter-Strike 2', desc:'El shooter competitivo más icónico.', tag:'5v5', color:'#f2b134' },
  { ico:'🥋', name:'Mortal Kombat', desc:'Pelea uno a uno. Que gane el más hábil.', tag:'1v1', color:'#e85d2a' },
];

const gamesGrid = document.getElementById('gamesGrid');
if (gamesGrid) {
  gamesGrid.innerHTML = GAMES.map(g => `
    <article class="game-card reveal" style="--accent:${g.color}">
      <span class="g-tag">${g.tag}</span>
      <div>
        <div class="g-ico">${g.ico}</div>
        <h3>${g.name}</h3>
      </div>
      <p>${g.desc}</p>
    </article>
  `).join('');
}

/* --- Countdown al 4 de julio 2026, 13:00 --- */
const TARGET = new Date('2026-07-04T13:00:00').getTime();
const cd = {
  d: document.getElementById('cd-days'),
  h: document.getElementById('cd-hours'),
  m: document.getElementById('cd-mins'),
  s: document.getElementById('cd-secs'),
};
function pad(n){ return String(n).padStart(2,'0'); }
function tick() {
  const diff = TARGET - Date.now();
  if (diff <= 0) {
    cd.d.textContent = cd.h.textContent = cd.m.textContent = cd.s.textContent = '00';
    const box = document.getElementById('countdown');
    if (box && !box.dataset.live) { box.dataset.live = '1'; box.insertAdjacentHTML('afterend', '<p style="color:var(--green);font-weight:700;margin-top:-1.5rem;margin-bottom:2rem;">¡El festival está en vivo! 🎮</p>'); }
    return;
  }
  cd.d.textContent = pad(Math.floor(diff / 864e5));
  cd.h.textContent = pad(Math.floor(diff % 864e5 / 36e5));
  cd.m.textContent = pad(Math.floor(diff % 36e5 / 6e4));
  cd.s.textContent = pad(Math.floor(diff % 6e4 / 1e3));
}
tick();
setInterval(tick, 1000);

/* --- Navbar scroll + menú móvil --- */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* --- Reveal on scroll --- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.about-text, .about-media, .game-card, .day-card, .feature, .register-inner, .location-info, .location-map, .section-head')
  .forEach(el => { el.classList.add('reveal'); io.observe(el); });

/* --- Contador de stats --- */
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    let cur = 0; const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = cur;
    }, 28);
    statIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat strong[data-count]').forEach(el => statIO.observe(el));

/* --- Formulario de inscripción --- */
const form = document.getElementById('registerForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.nombre || !data.email || !data.nick || !data.juego) {
    msg.textContent = 'Completá todos los campos para inscribirte.';
    msg.className = 'form-msg err';
    return;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    msg.textContent = 'Ingresá un correo electrónico válido.';
    msg.className = 'form-msg err';
    return;
  }
  // Guardamos localmente (demo). En producción se enviaría a un backend.
  try {
    const subs = JSON.parse(localStorage.getItem('fg5_inscripciones') || '[]');
    subs.push({ ...data, fecha: new Date().toISOString() });
    localStorage.setItem('fg5_inscripciones', JSON.stringify(subs));
  } catch (_) {}
  msg.textContent = `¡Listo ${data.nombre.split(' ')[0]}! Te anotaste en ${data.juego}. Te contactamos por correo. 🎮`;
  msg.className = 'form-msg ok';
  form.reset();
});

/* --- Barra de progreso de scroll --- */
const progress = document.getElementById('scrollProgress');
const toTop = document.getElementById('toTop');
function onScroll() {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  if (progress) progress.style.width = (scrolled * 100) + '%';
  if (toTop) toTop.classList.toggle('show', h.scrollTop > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* --- Agregar al calendario (.ics universal) --- */
const calBtn = document.getElementById('addCalendar');
if (calBtn) {
  calBtn.addEventListener('click', () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Florida Gamer Festival//ES',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:fg5-2026@floridagamer',
      'DTSTAMP:20260601T000000Z',
      'DTSTART:20260704T160000Z',
      'DTEND:20260705T230000Z',
      'SUMMARY:Florida Gamer Festival 5',
      'DESCRIPTION:Este mundial vivilo en Florida Gamer. Torneos de FIFA\\, Fortnite\\, Valorant\\, League of Legends\\, Minecraft y más. Entrada gratuita.',
      'LOCATION:Estadio 10 de Julio, Florida, Uruguay',
      'URL:https://elgalgo.github.io/Festival-Gamer-Florida---Demo/',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'florida-gamer-festival-5.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}

/* --- Partículas del hero --- */
const canvas = document.getElementById('heroParticles');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  const colors = ['#a4d233', '#f7941d', '#e63451', '#8e3fb8'];
  let particles = [], raf;
  function size() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    const count = Math.min(70, Math.floor(canvas.width / 22));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.6,
      vy: -(Math.random() * 0.5 + 0.12),
      vx: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.2,
      c: colors[Math.floor(Math.random() * colors.length)]
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.vy; p.x += p.vx;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      ctx.globalAlpha = p.a;
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }
  size(); draw();
  let resizeT;
  window.addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(size, 200); });
  // Pausar cuando el hero no está visible (ahorra batería)
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  }, { threshold: 0 }).observe(hero);
}

/* --- Año dinámico en footer (por si cambia) --- */
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
