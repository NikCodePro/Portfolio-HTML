/* =====================================================
   TechNeural — Main UI
   Runs AFTER render.js, so nav/footer/section content
   already exist in the DOM.
   Handles: Lucide icons, navbar scroll state, mobile menu,
   smooth anchor scroll, FAQ accordion, contact form,
   newsletter, toast, back-to-top, footer year.
   ===================================================== */
(function () {
  "use strict";

  /* ---------- Lucide icons ---------- */
  function renderIcons() {
    if (window.lucide && typeof lucide.createIcons === "function") lucide.createIcons();
  }
  renderIcons();

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Toast ---------- */
  let toastEl = document.getElementById("toast");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.id = "toast";
    document.body.appendChild(toastEl);
  }
  function showToast(msg, dur = 4000) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("show"), dur);
  }

  /* ---------- Navbar scroll state + back-to-top ---------- */
  const nav = document.getElementById("nav");
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("is-scrolled", y > 24);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => scrollToTarget(0));

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  function closeMenu() {
    if (!mobileMenu) return;
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = !mobileMenu.classList.contains("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      mobileMenu.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---------- Smooth anchor scroll (Lenis-aware) ---------- */
  function scrollToTarget(target) {
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -10 });
    } else {
      const top =
        typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      scrollToTarget(el);
    });
  });

  /* ---------- FAQ accordion (event-delegated; content is injected) ---------- */
  document.addEventListener("click", (e) => {
    const q = e.target.closest(".faq-item__q");
    if (!q) return;
    const item = q.closest(".faq-item");
    const list = item.parentElement;
    const a = item.querySelector(".faq-item__a");
    const isOpen = item.classList.contains("is-open");

    list.querySelectorAll(".faq-item").forEach((other) => {
      other.classList.remove("is-open");
      const oa = other.querySelector(".faq-item__a");
      if (oa) oa.style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add("is-open");
      a.style.maxHeight = a.scrollHeight + "px";
    }
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#cName");
      const email = form.querySelector("#cEmail");
      const phone = form.querySelector("#cPhone");
      const service = form.querySelector("#cService");
      const msg = form.querySelector("#cMessage");
      let ok = true;
      const setErr = (input, text) => {
        const err = input.closest(".field").querySelector(".err");
        if (err) err.textContent = text;
        if (text) ok = false;
      };
      setErr(name, name.value.trim() ? "" : "Please tell us your name");
      setErr(
        email,
        !email.value.trim()
          ? "We need an email to reply"
          : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
          ? ""
          : "That email looks off — mind checking?"
      );
      setErr(msg, msg.value.trim() ? "" : "A few words about your project helps");
      if (!ok) return;

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = "Sending…";

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          phone: phone ? phone.value.trim() : '',
          service: service ? service.value : '',
          message: msg.value.trim()
        })
      })
      .then(res => res.json())
      .then(data => {
        btn.disabled = false;
        btn.innerHTML = original;
        renderIcons();
        if (data.success) {
          form.reset();
          showToast("🎉 Thanks! We'll be in touch within a day.");
        } else {
          showToast("❌ " + (data.error || "Something went wrong. Please try again."));
        }
      })
      .catch(err => {
        btn.disabled = false;
        btn.innerHTML = original;
        renderIcons();
        showToast("❌ Network error. Please check your connection.");
        console.error(err);
      });
    });
  }

  /* ---------- Newsletter ---------- */
  document.querySelectorAll(".js-newsletter").forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = f.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.value.trim()) return;

      const btn = f.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Subscribing…";
      }

      fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.value.trim() })
      })
      .then(res => res.json())
      .then(data => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
        if (data.success) {
          f.reset();
          showToast("✅ You're subscribed. Talk soon!");
        } else {
          showToast("❌ " + (data.error || "Subscription failed."));
        }
      })
      .catch(err => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
        showToast("❌ Network error. Please try again.");
        console.error(err);
      });
    });
  });

  /* ---------- Work Filter (SSR-compatible toggle) ---------- */
  const workFilter = document.getElementById("workFilter");
  const workGrid = document.getElementById("workGrid");
  if (workFilter && workGrid) {
    const cards = workGrid.querySelectorAll(".work-card");
    workFilter.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      
      const cat = btn.dataset.cat;
      
      // Update active button state
      workFilter.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
      });
      
      // Toggle card visibility
      cards.forEach((card) => {
        if (cat === "All" || card.dataset.cat === cat) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
      
      // Refresh GSAP ScrollTrigger if active
      if (window.ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    });
  }

  /* ---------- ESC closes mobile menu ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Re-render icons after full load (late inserts) ---------- */
  window.addEventListener("load", renderIcons);
})();
