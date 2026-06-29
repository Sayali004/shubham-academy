/* ════════════════════════════════════════════════
   SHUBHAM ACADEMY — main.js
   Ghodawat.com faithful replica JS
════════════════════════════════════════════════ */

/* ── EMAILJS KEYS — replace these 3 values ── */
const EMAILJS_SERVICE_ID  = 'service_x2lgp6m';
const EMAILJS_TEMPLATE_ID = 'template_a3njqd7';
const EMAILJS_PUBLIC_KEY  = 'JH9zPM2ckL6H9N3Vs';

if (typeof emailjs !== 'undefined') emailjs.init(EMAILJS_PUBLIC_KEY);

/* ═══ PRELOADER ═══ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader')?.classList.add('gone'), 1700);
});

/* ═══ HEADER scroll ═══ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('solid', window.scrollY > 70);
}, { passive: true });

/* ═══ MOBILE NAV ═══ */
const ham   = document.getElementById('ham');
const nav   = document.getElementById('nav');
let navOvl  = null;

function openNav() {
  nav.classList.add('open');
  ham.classList.add('open');
  document.body.style.overflow = 'hidden';
  navOvl = document.createElement('div');
  navOvl.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:850;';
  navOvl.addEventListener('click', closeNav);
  document.body.appendChild(navOvl);
}
function closeNav() {
  nav.classList.remove('open');
  ham.classList.remove('open');
  document.body.style.overflow = '';
  navOvl?.remove(); navOvl = null;
}
ham?.addEventListener('click', () => nav.classList.contains('open') ? closeNav() : openNav());
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

/* ═══ SMOOTH SCROLL ═══ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ═══ HERO SLIDER ═══ */
const slides  = document.querySelectorAll('.slide');
const dots    = document.querySelectorAll('.sc-dot');
let cur       = 0;
let sliderTimer;

function goTo(idx) {
  slides[cur].classList.remove('s-active');
  dots[cur].classList.remove('active');
  cur = ((idx % slides.length) + slides.length) % slides.length;
  slides[cur].classList.add('s-active');
  dots[cur].classList.add('active');
}

function startSlider() { sliderTimer = setInterval(() => goTo(cur + 1), 5500); }
function resetSlider() { clearInterval(sliderTimer); startSlider(); }

document.getElementById('scPrev')?.addEventListener('click', () => { goTo(cur - 1); resetSlider(); });
document.getElementById('scNext')?.addEventListener('click', () => { goTo(cur + 1); resetSlider(); });
dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetSlider(); }));
startSlider();

/* ═══ SCROLL REVEAL ═══ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--d') || '0') * 1000;
    setTimeout(() => entry.target.classList.add('in'), delay);
    revObs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ═══ COUNTER ANIMATION ═══ */
function animCount(el, to) {
  if (el._done) return; el._done = true;
  const t0 = performance.now(), dur = 1800;
  const tick = now => {
    const p = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(ease * to);
    if (p < 1) requestAnimationFrame(tick); else el.textContent = to;
  };
  requestAnimationFrame(tick);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.counter[data-target]').forEach(el => animCount(el, +el.dataset.target));
    cntObs.unobserve(e.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-bar').forEach(el => cntObs.observe(el));

/* ═══ DRAGGABLE FACULTY SCROLL ═══ */
const pTrack = document.getElementById('peopleTrack');
if (pTrack) {
  const wrap = pTrack.parentElement;
  wrap.style.overflowX = 'auto';
  wrap.style.scrollbarWidth = 'none';
  wrap.style.msOverflowStyle = 'none';
  let down = false, sx = 0, sl = 0;
  pTrack.addEventListener('mousedown', e => { down = true; sx = e.pageX - pTrack.offsetLeft; sl = wrap.scrollLeft; pTrack.style.cursor = 'grabbing'; });
  window.addEventListener('mouseup',   () => { down = false; pTrack.style.cursor = 'grab'; });
  window.addEventListener('mousemove', e => {
    if (!down) return; e.preventDefault();
    wrap.scrollLeft = sl - (e.pageX - pTrack.offsetLeft - sx) * 1.2;
  });
  let tx = 0, ts = 0;
  pTrack.addEventListener('touchstart', e => { tx = e.touches[0].pageX; ts = wrap.scrollLeft; }, { passive: true });
  pTrack.addEventListener('touchmove',  e => { wrap.scrollLeft = ts + (tx - e.touches[0].pageX); }, { passive: true });
}

/* ═══ ACTIVE NAV ═══ */
const sects = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let c = '';
  sects.forEach(s => { if (window.scrollY >= s.offsetTop - 120) c = s.id; });
  document.querySelectorAll('.nav a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + c ? '#fff' : '';
  });
}, { passive: true });

/* ═══ EMAILJS FORM ═══ */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const f = { name: form.querySelector('#from_name'), phone: form.querySelector('#phone'), cls: form.querySelector('#student_class'), course: form.querySelector('#course') };
    const err = { name: document.getElementById('errName'), phone: document.getElementById('errPhone'), cls: document.getElementById('errClass'), course: document.getElementById('errCourse') };

    Object.values(f).forEach(el => el.classList.remove('err'));
    Object.values(err).forEach(el => el.textContent = '');
    let valid = true;

    if (!f.name.value.trim() || f.name.value.trim().length < 2) { f.name.classList.add('err'); err.name.textContent = 'Please enter your full name.'; valid = false; }
    if (!/^[6-9]\d{9}$/.test(f.phone.value.trim())) { f.phone.classList.add('err'); err.phone.textContent = 'Enter valid 10-digit Indian mobile.'; valid = false; }
    if (!f.cls.value)    { f.cls.classList.add('err');    err.cls.textContent    = 'Please select your class.';  valid = false; }
    if (!f.course.value) { f.course.classList.add('err'); err.course.textContent = 'Please select a course.';    valid = false; }
    if (!valid) return;

    const btn = document.getElementById('submitBtn');
    const lbl = document.getElementById('btnLabel');
    const suc = document.getElementById('formSuccess');
    const erDiv = document.getElementById('formError');

    btn.disabled = true; lbl.textContent = 'Sending...'; erDiv.style.display = 'none';

    const params = { from_name: f.name.value.trim(), phone: f.phone.value.trim(), student_class: f.cls.value, course: f.course.value, message: document.getElementById('message')?.value || 'N/A' };

    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') { form.style.display = 'none'; suc.style.display = 'block'; return; }
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
      form.style.display = 'none'; suc.style.display = 'block';
    } catch {
      btn.disabled = false; lbl.textContent = 'Submit Enquiry';
      erDiv.style.display = 'block'; document.getElementById('errMsg').textContent = 'Send failed. Please try again.';
    }
  });
}
