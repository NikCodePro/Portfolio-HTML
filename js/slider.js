/* =====================================================
   TechNeural — Sliders (Swiper)
   Testimonials carousel. Add more instances here as the
   site grows (e.g. a portfolio slider).
   ===================================================== */
(function () {
  "use strict";

  if (typeof Swiper === "undefined") return;

  const testimonialEl = document.querySelector(".testimonials__swiper");
  if (testimonialEl) {
    new Swiper(testimonialEl, {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".testimonials__swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        860: { slidesPerView: 2, spaceBetween: 24 },
      },
    });
  }
})();
