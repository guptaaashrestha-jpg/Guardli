/* ============================================
   GUARDLI — SCROLL ANIMATIONS
   Elements reveal themselves as you scroll.
   ============================================ */

export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once revealed, stop observing to avoid re-triggering
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  // Observe all elements with data-animate
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

  return observer;
}

// Re-initialize after DOM changes (e.g., view switch)
export function refreshScrollAnimations() {
  // Small delay to let DOM settle
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
}
