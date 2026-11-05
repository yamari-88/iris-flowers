(function () {
  // ===== Мобильное меню =====
  var menu = document.getElementById('mobile-menu');
  var openBtn = document.getElementById('burger');
  var closeBtn = document.getElementById('menu-close');
  function toggle(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (openBtn) openBtn.addEventListener('click', function () { toggle(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { toggle(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
  if (menu) menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { toggle(false); });
  });

  // ===== Точки у каруселей (мобайл) =====
  document.querySelectorAll('.carousel').forEach(function (car) {
    var dots = car.nextElementSibling;
    if (!dots || !dots.classList.contains('dots')) return;
    var items = Array.prototype.slice.call(car.children);
    dots.innerHTML = items.map(function () { return '<i></i>'; }).join('');
    var d = dots.children;
    function update() {
      var idx = 0, min = Infinity;
      items.forEach(function (el, i) {
        var diff = Math.abs(el.offsetLeft - car.scrollLeft - items[0].offsetLeft);
        if (diff < min) { min = diff; idx = i; }
      });
      for (var i = 0; i < d.length; i++) d[i].classList.toggle('is-active', i === idx);
    }
    car.addEventListener('scroll', update, { passive: true });
    update();
  });

  // ===== Фильтры букетов =====
  var filters = document.querySelector('.filters');
  if (filters) {
    var cards = document.querySelectorAll('.bouquet');
    var empty = document.getElementById('empty');
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      filters.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active');
      var cat = b.dataset.filter, shown = 0;
      cards.forEach(function (c) {
        var ok = cat === 'all' || (c.dataset.cat || '').split(' ').indexOf(cat) !== -1;
        c.classList.toggle('hidden', !ok);
        if (ok) shown++;
      });
      if (empty) empty.classList.toggle('hidden', shown > 0);
    });
  }

  // ===== «Хочу такой букет» — подставляем название в сообщение =====
  // Когда будет мессенджер владелицы, замените CONTACT_URL ниже.
  var CONTACT_URL = 'tel:+79183335681';
  document.querySelectorAll('[data-contact]').forEach(function (a) { a.setAttribute('href', CONTACT_URL); });
})();
