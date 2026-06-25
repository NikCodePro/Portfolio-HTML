/* =====================================================
   TechNeural — Smooth Scroll
   Lenis + GSAP ScrollTrigger sync.
   Exposes window.lenis for anchor navigation (main.js).
   ===================================================== */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof Lenis === "undefined" || reduce) {
    // No Lenis (or user prefers reduced motion) → rely on native scrolling.
    window.lenis = null;
    return;
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.6,
  });

  window.lenis = lenis;
  document.documentElement.classList.add("lenis"); // disables CSS smooth-behavior fallback

  // Sync with GSAP ScrollTrigger when present
  if (window.gsap && window.ScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    // Standalone RAF loop
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }
})();
