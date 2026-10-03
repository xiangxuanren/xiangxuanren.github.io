(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const motion = new Set();
  function lift(el, amount = 4, delay = 0) {
    if (reduced.matches || document.hidden || !el.animate) return;
    const animation = el.animate([
      {transform: 'translateY(0)'},
      {transform: `translateY(-${amount}px)`, offset: .34},
      {transform: 'translateY(.6px)', offset: .73},
      {transform: 'translateY(0)'}
    ], {duration: 720, delay, easing: 'cubic-bezier(.22,.61,.36,1)'});
    motion.add(animation);
    const release = () => motion.delete(animation);
    animation.onfinish = release;
    animation.oncancel = release;
  }
  const headings = [...document.querySelectorAll('.academic-body h2')];
  headings.forEach(heading => {
    const nodes = [...heading.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);
    const title = nodes.map(node => node.textContent).join('').trim();
    if (!title) return;
    const readable = document.createElement('span');
    readable.className = 'heading-readable';
    readable.textContent = title;
    const ink = document.createElement('span');
    ink.className = 'heading-ink';
    ink.setAttribute('aria-hidden', 'true');
    title.split(/(\s+)/).forEach(word => {
      if (/^\s+$/.test(word)) { ink.append(document.createTextNode(word)); return; }
      const group = document.createElement('span');
      group.className = 'heading-word';
      for (const character of word) {
        const glyph = document.createElement('span');
        glyph.className = 'heading-glyph';
        glyph.textContent = character;
        group.append(glyph);
      }
      ink.append(group);
    });
    nodes.forEach(node => node.remove());
    heading.append(readable, ink);
    const glyphs = [...ink.querySelectorAll('.heading-glyph')];
    const recent = new WeakMap();
    ink.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch' || reduced.matches) return;
      const now = performance.now();
      glyphs.forEach(glyph => {
        const rect = glyph.getBoundingClientRect();
        const distance = Math.abs(event.clientX - rect.left - rect.width / 2);
        if (distance < 28 && now - (recent.get(glyph) ?? -1000) > 760) {
          recent.set(glyph, now);
          lift(glyph, 2 + 3 * (1 - distance / 28));
        }
      });
    });
    heading.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      glyphs.forEach((glyph, index) => lift(glyph, 3, index * 15));
    }, {passive: true});
    heading.addEventListener('pointerenter', () => {
      const icon = heading.querySelector('.section-icon');
      if (icon) lift(icon, 3);
    });
  });
  // A single greeting on arrival; prose never hides or moves while reading.
  if ('IntersectionObserver' in window) {
    const arrival = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const icon = entry.target.querySelector('.section-icon');
        if (icon) lift(icon, 3);
        entry.target.querySelectorAll('.heading-word').forEach((word, index) => lift(word, 2, index * 80));
        arrival.unobserve(entry.target);
      });
    }, {threshold: .9});
    headings.forEach(heading => arrival.observe(heading));
  }
  function settle() { motion.forEach(animation => animation.cancel()); motion.clear(); }
  reduced.addEventListener('change', () => { if (reduced.matches) settle(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) settle(); });
})();
