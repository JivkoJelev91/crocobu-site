// Shows the Bulgarian or the English half of a page: ?lang=en, the remembered choice, or the browser's language.
(function () {
  var pick = function (lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) { el.hidden = el.getAttribute('data-lang') !== lang; });
    document.querySelectorAll('.langs button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.set === lang)); });
    try { localStorage.setItem('croco.site.lang', lang); } catch (e) {}
  };
  var q = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('croco.site.lang'); } catch (e) {}
  var nav = (navigator.language || 'bg').slice(0, 2) === 'bg' ? 'bg' : 'en';
  pick(q === 'en' || q === 'bg' ? q : saved || nav);
  document.querySelectorAll('.langs button').forEach(function (b) { b.onclick = function () { pick(b.dataset.set); }; });
})();
