// GODEN.AI — Main JS
(function () {
  'use strict';

  // Theme toggle (dark/light)
  const themeBtn = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const storageKey = 'goden:theme';

  function applyTheme(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');

    if (themeBtn) {
      const isLight = theme === 'light';
      themeBtn.textContent = isLight ? '☾' : '☀';
      themeBtn.setAttribute('aria-label', isLight ? 'Přepnout na tmavý režim' : 'Přepnout na světlý režim');
      themeBtn.setAttribute('aria-pressed', String(isLight));
    }
  }

  function getPreferredTheme() {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  applyTheme(getPreferredTheme());

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const isOpen = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '✕' : '☰';
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  // Intersection Observer for fade-in
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-up');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.observe').forEach((el) => observer.observe(el));
})();
