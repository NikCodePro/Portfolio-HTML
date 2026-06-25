/* =====================================================
   TechNeural — Animations (GSAP + ScrollTrigger)
   - Hero entrance timeline (+ SplitType)
   - Scroll reveals: [data-reveal] and [data-stagger]
   - Floating hero cards + scroll parallax
   - Animated counters: [data-count]

   Flash strategy: CSS (.gsap-loading) hides elements before
   JS runs. We mirror those hidden states inline with gsap.set()
   and only THEN remove the class, so GSAP owns visibility from
   that point on — no flash, no gsap.from() "stuck" bug.
   ===================================================== */
(function () {
  "use strict";

  const html = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // No GSAP or reduced motion → show everything, set final counters, bail.
  if (typeof gsap === "undefined" || reduce) {
    html.classList.remove("gsap-loading");
    setCountersInstant();
    return;
  }

  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const EASE = "power3.out";
  const ST = !!window.ScrollTrigger;

  /* ---------- 1. Lock hidden states inline (mirror CSS) ---------- */
  function prepare() {
    gsap.set(".hero-headline", { opacity: 0 });
    gsap.set([".hero-eyebrow", ".hero-sub", ".hero-actions"], { opacity: 0, y: 24 });
    gsap.set(".hero-visual", { opacity: 0, y: 40, scale: 0.96 });

    gsap.set("[data-reveal]", { opacity: 0, y: 46 });
    gsap.utils.toArray("[data-stagger]").forEach((group) => {
      gsap.set(gsap.utils.toArray(group.children), { opacity: 0, y: 40 });
    });

    // Inline styles now hold visibility — safe to drop the CSS guard.
    html.classList.remove("gsap-loading");
  }

  /* ---------- 2. Hero entrance ---------- */
  function heroIntro() {
    const tl = gsap.timeline({ defaults: { ease: EASE } });
    const headline = document.querySelector(".hero-headline");

    if (headline) {
      gsap.set(headline, { opacity: 1 });
      let lines = [headline];
      if (typeof SplitType !== "undefined") {
        const split = new SplitType(headline, { types: "lines" });
        if (split.lines && split.lines.length) lines = split.lines;
      }
      tl.from(lines, { yPercent: 115, opacity: 0, duration: 0.9, stagger: 0.12 });
    }

    tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
      .to(".hero-actions", { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.4")
      .to(".hero-visual", { opacity: 1, y: 0, scale: 1, duration: 0.95 }, "-=0.75");
  }

  /* ---------- 3. Floating hero cards + parallax ---------- */
  function floatCards() {
    gsap.utils.toArray("[data-float]").forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? -16 : 14,
        x: i % 2 === 0 ? 8 : -6,
        rotation: i % 2 === 0 ? 1.2 : -1.2,
        duration: 3.2 + i * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1 + i * 0.2,
      });
    });

    if (ST) {
      gsap.to(".hero__visual", {
        y: -50,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }
  }

  /* ---------- 4. Scroll reveals ---------- */
  function reveals() {
    if (!ST) {
      gsap.to("[data-reveal]", { opacity: 1, y: 0, duration: 0.6 });
      gsap.utils.toArray("[data-stagger]").forEach((g) =>
        gsap.to(gsap.utils.toArray(g.children), { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 })
      );
      return;
    }

    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: EASE,
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
    });

    gsap.utils.toArray("[data-stagger]").forEach((group) => {
      gsap.to(gsap.utils.toArray(group.children), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: group, start: "top 82%" },
      });
    });
  }

  /* ---------- 5. Counters ---------- */
  function counters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const isInt = target % 1 === 0;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: ST ? { trigger: el, start: "top 92%", once: true } : undefined,
        onUpdate: () => {
          el.textContent = (isInt ? Math.round(obj.v) : obj.v.toFixed(1)) + suffix;
        },
      });
    });
  }

  function setCountersInstant() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const t = parseFloat(el.dataset.count);
      el.textContent = (t % 1 === 0 ? t : t.toFixed(1)) + (el.dataset.suffix || "");
    });
  }

  /* ---------- Boot ---------- */
  prepare();
  heroIntro();
  floatCards();
  reveals();
  counters();

  if (ST) {
    window.addEventListener("load", () => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 700);
  }
})();
