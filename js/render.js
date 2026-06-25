/* =====================================================
   TechNeural — Renderer
   Reads window.APP (js/app.js) and injects the shared
   nav + footer plus every data-driven section into the
   current page (identified by <body data-page="...">).

   Runs BEFORE slider.js / animations.js / main.js so the
   injected DOM exists when those modules initialise.
   ===================================================== */
(function () {
  "use strict";

  const APP = window.APP;
  if (!APP) return;
  const page = document.body.dataset.page || "home";

  /* ---------- helpers ---------- */
  const $ = (sel) => document.querySelector(sel);
  const icon = (name) => `<i data-lucide="${name}"></i>`;
  function fill(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  /* ---------- NAV ---------- */
  function renderNav() {
    const links = APP.nav
      .map((l) => `<a href="${l.href}" class="${l.page === page ? "is-active" : ""}">${l.label}</a>`)
      .join("");
    const mLinks = APP.nav
      .map((l) => `<a href="${l.href}" class="${l.page === page ? "is-active" : ""}">${l.label}</a>`)
      .join("");

    const header = document.createElement("header");
    header.className = "nav";
    header.id = "nav";
    header.innerHTML = `
      <div class="container nav__inner">
        <a href="index.html" class="nav__logo">
          <img src="${APP.site.logo}" alt="${APP.site.name}" />
        </a>
        <nav class="nav__links">${links}</nav>
        <a href="contact.html" class="btn btn--primary nav__cta">Book a Call ${icon("arrow-up-right")}</a>
        <button class="nav__burger" id="burger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        ${mLinks}
        <a href="contact.html" class="btn btn--primary">Book a Call</a>
      </div>`;
    document.body.prepend(header);
  }

  /* ---------- FOOTER ---------- */
  function renderFooter() {
    const socials = APP.site.socials
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.icon)}</a>`)
      .join("");

    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="index.html" class="nav__logo"><img src="${APP.site.logoFooter}" alt="${APP.site.name}" /></a>
            <p>${APP.site.tagline}</p>
            <div class="footer__socials">${socials}</div>
          </div>
          <div class="footer__col">
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="work.html">Work</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>Services</h4>
            <ul>${APP.services.slice(0, 4).map((s) => `<li><a href="services.html">${s.title}</a></li>`).join("")}</ul>
          </div>
          <div class="footer__col">
            <h4>Get in touch</h4>
            <ul>
              <li><a href="mailto:${APP.site.email}">${icon("mail")} ${APP.site.email}</a></li>
              <li><a href="https://wa.me/${APP.site.whatsapp}" target="_blank" rel="noopener">${icon("phone")} ${APP.site.phone}</a></li>
              <li><span>${icon("clock")} ${APP.site.hours}</span></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>&copy; <span id="year"></span> ${APP.site.name}. All rights reserved.</span>
          <span>Crafted with precision &amp; a little obsession.</span>
        </div>
      </div>`;
    document.body.appendChild(footer);
  }

  /* ---------- reusable section builders ---------- */
  function statsHTML(set) {
    return (APP.stats[set] || APP.stats.home)
      .map(
        (s) => `
        <div class="stat-card">
          <span class="stat-card__num"><span data-count="${s.value}" data-suffix="${s.suffix}">0</span></span>
          <span class="stat-card__label">${s.label}</span>
        </div>`
      )
      .join("");
  }

  function serviceCardsHTML(full) {
    return APP.services
      .map(
        (s) => `
        <article class="service-card glass-card" data-tilt>
          <span class="service-card__icon">${icon(s.icon)}</span>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          ${full ? `<ul class="mini-list">${s.points.map((p) => `<li>${icon("check")} ${p}</li>`).join("")}</ul>` : ""}
          <a class="service-card__link" href="${full ? "contact.html" : "services.html"}">${full ? "Get a quote" : "Learn more"} ${icon("arrow-right")}</a>
        </article>`
      )
      .join("");
  }

  function processHTML() {
    return APP.process
      .map(
        (p) => `
        <div class="process-step glass-card">
          <span class="process-step__num">${p.num}</span>
          <span class="process-step__icon">${icon(p.icon)}</span>
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
        </div>`
      )
      .join("");
  }

  function featuresHTML() {
    return APP.features
      .map(
        (f) => `
        <div class="feature-card glass-card">
          <span class="feature-card__icon">${icon(f.icon)}</span>
          <h4>${f.title}</h4>
          <p>${f.desc}</p>
        </div>`
      )
      .join("");
  }

  function workCardsHTML(list) {
    return list
      .map(
        (p) => `
        <article class="work-card glass-card" data-cat="${p.cat}">
          <div class="work-card__media">
            <img src="${p.img}" alt="${p.title}" loading="lazy" />
            <span class="work-card__cat">${p.cat}</span>
            <div class="work-card__overlay"><a href="contact.html">View project ${icon("arrow-up-right")}</a></div>
          </div>
          <div class="work-card__body">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="work-card__tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
          </div>
        </article>`
      )
      .join("");
  }

  function testimonialsHTML() {
    return APP.testimonials
      .map(
        (t) => `
        <div class="swiper-slide">
          <blockquote class="testimonial glass-card">
            <p>"${t.quote}"</p>
            <footer>
              <span class="testimonial__av">${t.initial}</span>
              <cite><strong>${t.name}</strong>${t.role}</cite>
            </footer>
          </blockquote>
        </div>`
      )
      .join("");
  }

  function faqHTML() {
    return APP.faqs
      .map(
        (f) => `
        <div class="faq-item">
          <button class="faq-item__q"><span>${f.q}</span>${icon("plus")}</button>
          <div class="faq-item__a"><p>${f.a}</p></div>
        </div>`
      )
      .join("");
  }

  function valuesHTML() {
    return APP.values
      .map(
        (v) => `
        <div class="feature-card glass-card">
          <span class="feature-card__icon">${icon(v.icon)}</span>
          <h4>${v.title}</h4>
          <p>${v.desc}</p>
        </div>`
      )
      .join("");
  }

  function timelineHTML() {
    return APP.timeline
      .map(
        (t) => `
        <div class="tl-item">
          <span class="tl-item__year">${t.year}</span>
          <h4>${t.title}</h4>
          <p>${t.desc}</p>
        </div>`
      )
      .join("");
  }

  function teamHTML() {
    return APP.team
      .map(
        (m) => `
        <div class="team-card glass-card">
          <span class="team-card__av">${m.initial}</span>
          <h4>${m.name}</h4>
          <span class="team-card__role">${m.role}</span>
          <p>${m.bio}</p>
        </div>`
      )
      .join("");
  }

  function whyListHTML() {
    return APP.whyPoints.map((p) => `<li>${icon("check")} ${p}</li>`).join("");
  }

  function blogHTML() {
    const feat = APP.blog.find((b) => b.feature);
    const rest = APP.blog.filter((b) => !b.feature);
    if (feat) {
      fill(
        "blogFeature",
        `
        <div class="blog-feature__img"><img src="${feat.img}" alt="${feat.title}" /></div>
        <div class="blog-feature__body">
          <div class="blog-meta"><span class="blog-tag">${feat.tag}</span><span>${feat.date}</span><span>${feat.read} read</span></div>
          <h2>${feat.title}</h2>
          <p>${feat.excerpt}</p>
          <a href="#" class="btn btn--primary">Read article ${icon("arrow-right")}</a>
        </div>`
      );
    }
    return rest
      .map(
        (b) => `
        <article class="blog-card glass-card">
          <div class="blog-card__img"><img src="${b.img}" alt="${b.title}" loading="lazy" /></div>
          <div class="blog-card__body">
            <div class="blog-meta"><span class="blog-tag">${b.tag}</span><span>${b.date}</span><span>${b.read}</span></div>
            <h3>${b.title}</h3>
            <p>${b.excerpt}</p>
            <div class="blog-author"><span class="blog-author__av">${b.author[0]}</span> By ${b.author}</div>
          </div>
        </article>`
      )
      .join("");
  }

  /* ---------- WORK FILTER (work page) ---------- */
  function renderWorkPage() {
    const grid = document.getElementById("workGrid");
    const bar = document.getElementById("workFilter");
    if (!grid) return;
    const cats = ["All", ...Array.from(new Set(APP.projects.map((p) => p.cat)))];
    let active = "All";

    const draw = () => {
      const list = active === "All" ? APP.projects : APP.projects.filter((p) => p.cat === active);
      grid.innerHTML = workCardsHTML(list);
      if (window.lucide) lucide.createIcons();
    };

    if (bar) {
      bar.innerHTML = cats
        .map((c) => `<button class="filter-btn ${c === "All" ? "is-active" : ""}" data-cat="${c}">${c}</button>`)
        .join("");
      bar.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        active = btn.dataset.cat;
        bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("is-active", b === btn));
        draw();
      });
    }
    draw();
  }

  /* ---------- PER-PAGE WIRING ---------- */
  renderNav();
  renderFooter();

  if (page === "home") {
    fill("homeStats", statsHTML("home"));
    fill("homeServices", serviceCardsHTML(false));
    fill("homeWhyList", whyListHTML());
    fill("homeFeatures", featuresHTML());
    fill("homeProcess", processHTML());
    fill("homeWork", workCardsHTML(APP.projects.slice(0, 3)));
    fill("homeTestimonials", testimonialsHTML());
  }

  if (page === "about") {
    fill("aboutStats", statsHTML("about"));
    fill("aboutValues", valuesHTML());
    fill("aboutTimeline", timelineHTML());
    fill("aboutTeam", teamHTML());
  }

  if (page === "services") {
    fill("servicesGrid", serviceCardsHTML(true));
    fill("servicesProcess", processHTML());
    fill("servicesFaq", faqHTML());
  }

  if (page === "work") {
    fill("workStats", statsHTML("work"));
    renderWorkPage();
  }

  if (page === "blog") {
    fill("blogGrid", blogHTML());
  }

  if (page === "contact") {
    fill("contactFaq", faqHTML());
  }
})();
