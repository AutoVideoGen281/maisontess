/* La Maison Tess — hero switcher */
(function () {
  'use strict';
  var heroes = Array.prototype.slice.call(document.querySelectorAll('.hv'));
  var numEl = document.getElementById('num');
  var nameEl = document.getElementById('name');
  var dotsWrap = document.getElementById('dots');
  var i = 0;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // build dots
  heroes.forEach(function (h, idx) {
    var b = document.createElement('button');
    b.textContent = pad(idx + 1);
    b.setAttribute('aria-label', 'Hero ' + (idx + 1) + ': ' + h.dataset.name);
    b.addEventListener('click', function () { show(idx); });
    dotsWrap.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function show(idx) {
    i = (idx + heroes.length) % heroes.length;
    heroes.forEach(function (h, k) { h.classList.toggle('is-active', k === i); });
    dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
    numEl.textContent = pad(i + 1);
    nameEl.textContent = heroes[i].dataset.name;
  }

  document.getElementById('prev').addEventListener('click', function () { show(i - 1); });
  document.getElementById('next').addEventListener('click', function () { show(i + 1); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(i - 1);
    else if (e.key === 'ArrowRight') show(i + 1);
    else if (/^[1-9]$/.test(e.key)) show(parseInt(e.key, 10) - 1);
    else if (e.key === '0') show(9);
  });

  show(0);
})();
