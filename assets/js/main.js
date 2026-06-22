/* =============================================================
   LA MAISON TESS — interactions
   ============================================================= */
(function () {
  'use strict';

  /* ---- Pre-filled WhatsApp booking link ---- */
  var WA_PHONE = '9613280059';
  var WA_TEXT =
    'Hello La Maison Tess ✨\n\n' +
    'I would like to book an appointment.\n\n' +
    '• Name:\n' +
    '• Service(s):\n' +
    '• Preferred date:\n' +
    '• Preferred time:\n\n' +
    'Thank you!';
  var BOOK_URL =
    'https://api.whatsapp.com/send/?phone=' + WA_PHONE +
    '&text=' + encodeURIComponent(WA_TEXT) +
    '&type=phone_number&app_absent=0';

  document.querySelectorAll('[data-book]').forEach(function (el) {
    // keep in-page anchor for the #book scroll target; but make booking CTAs open WhatsApp
    if (el.getAttribute('href') === '#book') {
      el.setAttribute('href', BOOK_URL);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    }
  });

  /* ---- Pre-filled WhatsApp gift-card link ---- */
  var GIFT_TEXT =
    'Hello La Maison Tess ✨\n\n' +
    'I would like to offer a gift card.\n\n' +
    '• Recipient name:\n' +
    '• Amount or service:\n' +
    '• Occasion (birthday, wedding…):\n' +
    '• My name:\n\n' +
    'Thank you!';
  var GIFT_URL =
    'https://api.whatsapp.com/send/?phone=' + WA_PHONE +
    '&text=' + encodeURIComponent(GIFT_TEXT) +
    '&type=phone_number&app_absent=0';

  document.querySelectorAll('[data-gift]').forEach(function (el) {
    el.setAttribute('href', GIFT_URL);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ---- Year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Nav scrolled state + action bar visibility ---- */
  var nav = document.getElementById('nav');
  var actionbar = document.querySelector('.actionbar');
  var heroEl = document.getElementById('top');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('is-scrolled', y > 20);
    // action bar: fully visible everywhere except while the hero is on screen
    if (actionbar) {
      var heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : 0;
      actionbar.classList.toggle('is-visible', heroBottom <= 80);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('is-open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
    });
  }

  /* ---- Fan cards: tap to jump (mobile) ---- */
  document.querySelectorAll('.fan__card').forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('is-bump');
    });
  });

  /* ---- Menu tabs ---- */
  var tabs = document.querySelectorAll('.menu__tab');
  var panels = document.querySelectorAll('.menu__panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        p.classList.toggle('is-active', p.getAttribute('data-panel') === target);
      });
    });
  });

  /* ---- Scroll reveals ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
