/* =====================================================
   TechNeural — Site Data Store
   ALL content for every page lives here. Pages are
   rendered from this single source by server-side EJS templates.
   ===================================================== */

const siteData = {
  /* ---------- Brand / contact ---------- */
  site: {
    name: "TechNeural",
    logo: "assets/logo.png",
    logoFooter: "assets/logo-footer.png",
    favicon: "assets/icon.png",
    email: "the.techneural@gmail.com",
    phone: "+91 91932 57838",
    whatsapp: "919193257838",
    hours: "Mon–Sat · 9am–7pm GMT",
    tagline:
      "We design and engineer premium websites, AI automation and growth systems for ambitious businesses around the world.",
    socials: [
      { icon: "linkedin", url: "https://www.linkedin.com/company/107535474/", label: "LinkedIn" },
      { icon: "facebook", url: "https://www.facebook.com/profile.php?id=61573328364639", label: "Facebook" },
      { icon: "instagram", url: "https://www.instagram.com/the.techneural/", label: "Instagram" },
      { icon: "github", url: "https://www.github.com", label: "GitHub" },
    ],
  },

  /* ---------- Navigation ---------- */
  nav: [
    { label: "Home", href: "/", page: "home" },
    { label: "About", href: "/about", page: "about" },
    { label: "Services", href: "/services", page: "services" },
    { label: "Work", href: "/work", page: "work" },
    { label: "Blog", href: "/blog", page: "blog" },
    { label: "Contact", href: "/contact", page: "contact" },
  ],

  /* ---------- Stat sets (keyed by page) ---------- */
  stats: {
    home: [
      { value: 200, suffix: "+", label: "Projects Delivered" },
      { value: 98, suffix: "%", label: "Client Satisfaction" },
      { value: 24, suffix: "h", label: "Avg. Response Time" },
      { value: 40, suffix: "+", label: "Industries Served" },
    ],
    about: [
      { value: 50, suffix: "+", label: "Team Members" },
      { value: 200, suffix: "+", label: "Projects Shipped" },
      { value: 12, suffix: "", label: "Years Building" },
      { value: 15, suffix: "+", label: "Awards Won" },
    ],
    work: [
      { value: 200, suffix: "+", label: "Projects Shipped" },
      { value: 40, suffix: "+", label: "Industries" },
      { value: 98, suffix: "%", label: "On-time Delivery" },
      { value: 73, suffix: "%", label: "Avg. Speed Gain" },
    ],
  },

  /* ---------- Services ---------- */
  services: [
    {
      id: "web",
      icon: "code-2",
      title: "Website Development",
      desc: "Blazing-fast, conversion-focused websites and web apps engineered with modern tooling and pixel-perfect care.",
      points: ["Responsive, mobile-first builds", "SEO-ready architecture", "Lightning performance scores"],
    },
    {
      id: "seo",
      icon: "search-check",
      title: "SEO Optimization",
      desc: "Technical SEO, content strategy and authority building that lifts you up the rankings — backed by honest reporting.",
      points: ["Technical SEO audits", "Content that ranks", "Transparent monthly reports"],
    },
    {
      id: "ai",
      icon: "workflow",
      title: "AI Automation",
      desc: "Put AI to work on the busywork — smart workflows that save your team hours and reduce costly human error.",
      points: ["Custom workflow automation", "LLM & RAG integrations", "Data pipelines that scale"],
    },
    {
      id: "marketing",
      icon: "megaphone",
      title: "Digital Marketing",
      desc: "Performance campaigns and content that reach the right people and turn attention into measurable revenue.",
      points: ["Paid & organic campaigns", "Content that converts", "Clear ROI reporting"],
    },
    {
      id: "chatbots",
      icon: "messages-square",
      title: "AI Chatbots & Assistants",
      desc: "Always-on assistants that answer instantly, qualify leads and book meetings while you sleep.",
      points: ["24/7 instant replies", "Lead qualification", "Calendar & CRM hooks"],
    },
    {
      id: "growth",
      icon: "rocket",
      title: "Business Growth Solutions",
      desc: "Strategy, analytics and automation woven into one growth engine tuned to your specific goals.",
      points: ["Growth strategy & analytics", "Automation that compounds", "Quarterly roadmaps"],
    },
  ],

  /* ---------- Why-us feature cards ---------- */
  features: [
    { icon: "cpu", title: "AI-First Engineering", desc: "Automation and intelligence designed into the architecture from day one." },
    { icon: "gauge", title: "Performance Obsessed", desc: "Sub-second loads and rock-solid Core Web Vitals as standard, not an upsell." },
    { icon: "trending-up", title: "Built to Scale", desc: "Clean, modular systems that grow with you instead of holding you back." },
    { icon: "handshake", title: "True Partnership", desc: "One senior team, end to end — and we stick around long after go-live." },
  ],

  whyPoints: [
    "Custom solutions, never cookie-cutter templates",
    "AI-driven workflows baked into everything we build",
    "Obsessed with performance and accessibility",
    "Transparent pricing and weekly progress demos",
  ],

  /* ---------- Process ---------- */
  process: [
    { num: "01", icon: "compass", title: "Discovery", desc: "We learn your business, goals and users, then define what winning actually looks like." },
    { num: "02", icon: "lightbulb", title: "Strategy", desc: "A clear roadmap, architecture and design direction — agreed before we build a thing." },
    { num: "03", icon: "hammer", title: "Build", desc: "Tight sprints with weekly demos so you watch it come to life and steer as we go." },
    { num: "04", icon: "rocket", title: "Launch", desc: "We ship with confidence — tested, optimized, and monitored from the first minute." },
    { num: "05", icon: "line-chart", title: "Scale", desc: "Data, iteration and automation that compound results month after month." },
  ],

  /* ---------- Values (About) ---------- */
  values: [
    { icon: "gem", title: "Craft over corners", desc: "We'd rather take an extra day than ship something we know could be better." },
    { icon: "message-square", title: "Honesty by default", desc: "If a deadline's at risk, you'll hear it early. Hard truths beat pleasant surprises." },
    { icon: "users", title: "We, not us-and-them", desc: "We work as an extension of your team. Your wins are our wins." },
    { icon: "sprout", title: "Always learning", desc: "We carve out real time to experiment so you get tomorrow's tools." },
    { icon: "infinity", title: "In it for the long run", desc: "The relationships we're proudest of are measured in years, not invoices." },
    { icon: "accessibility", title: "Build for everyone", desc: "Accessibility isn't an extra. If it doesn't work for everyone, it isn't finished." },
  ],

  /* ---------- Timeline (About) ---------- */
  timeline: [
    { year: "2014", title: "The first commit", desc: "Five friends, a borrowed office, and our very first client project." },
    { year: "2017", title: "Going remote-first", desc: "We hired our best designer from another continent and never looked back." },
    { year: "2020", title: "100 projects in", desc: "We crossed a hundred shipped products and launched our AI practice." },
    { year: "2023", title: "Across 10+ countries", desc: "From Mumbai to Madrid, our work found homes around the world." },
    { year: "Today", title: "Still just getting started", desc: "Same belief, bigger reach. Building the studio we always wished existed." },
  ],

  /* ---------- Team (About) ---------- */
  team: [
    {
      initial: "N",
      name: "Nikhil Verma",
      role: "Founder & Lead Engineer",
      bio: "Turns coffee into architecture and keeps everyone shipping.",
      socials: {
        instagram: "https://www.instagram.com/__nikkverma__/",
        linkedin: "https://www.linkedin.com/in/nikhil-verma-5a997a202/"
      }
    }
  ],

  /* ---------- Portfolio ---------- */
  projects: [
    { title: "Nimbus Commerce", cat: "Web App", img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200", desc: "A headless storefront with AI recommendations that lifted conversions by 34%.", tags: ["React", "Node", "AI"] },
    { title: "Pulse Analytics", cat: "AI Platform", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200", desc: "Real-time dashboards with ML forecasting that turn raw data into decisions.", tags: ["Python", "TensorFlow", "AWS"] },
    { title: "Vault Banking", cat: "Mobile", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200", desc: "Secure mobile banking with biometric login and instant transfers, built for trust.", tags: ["Flutter", "Firebase", "Plaid"] },
    { title: "Mentor AI", cat: "AI Platform", img: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1200", desc: "An adaptive learning assistant that personalizes every lesson path in real time.", tags: ["Next.js", "OpenAI", "Edge"] },
    { title: "Ascend Growth", cat: "Growth", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200", desc: "An SEO + automation engine that tripled qualified organic traffic in six months.", tags: ["SEO", "Automation", "Analytics"] },
    { title: "Atlas Support", cat: "Chatbot", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200", desc: "A 24/7 AI support assistant that deflects 70% of tickets and books demos automatically.", tags: ["LLM", "RAG", "Node"] },
    { title: "Atlas Real Estate", cat: "Web App", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200", desc: "A premium listings platform with virtual tours and a search that understands intent.", tags: ["Next.js", "Mapbox", "Postgres"] },
    { title: "CareSync Health", cat: "Mobile", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200", desc: "A HIPAA-compliant patient and clinical workflow app for a growing clinic network.", tags: ["Flutter", "Node", "Oracle"] },
  ],

  /* ---------- Testimonials ---------- */
  testimonials: [
    { initial: "A", name: "Arjun Sharma", role: "Founder, Nimbusmart", quote: "TechNeural shipped in six weeks what other agencies quoted six months for. They genuinely felt like part of our team — not just another vendor." },
    { initial: "P", name: "Priya Mehrotra", role: "COO, Vedanta SaaS", quote: "Their AI automation quietly saved our support team 30 hours a week. The ROI was obvious within the very first month of going live." },
    { initial: "R", name: "Rahul Kapoor", role: "Marketing Lead, Ascend Digital", quote: "Our organic traffic tripled in six months. What I loved most — the reporting was totally honest, no vanity metrics, just real growth numbers." },
    { initial: "S", name: "Sneha Patil", role: "CEO, Vault Fintech", quote: "Premium design, flawless performance and a team that actually cares. We've recommended TechNeural to every founder we know." },
  ],

  /* ---------- Blog ---------- */
  blog: [
    { feature: true, tag: "Engineering", title: "Why we ship small, and ship often", date: "Jun 18, 2026", read: "6 min", author: "Nikhil", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200", excerpt: "Big launches are exciting and terrifying. Here's how we trade the drama for steady, weekly progress that clients can actually see — and why it makes for better software." },
    { tag: "Design", title: "Designing for the first five seconds", date: "Jun 10, 2026", read: "4 min", author: "Aanya", img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=900", excerpt: "Most visitors decide whether to stay before they read a word. We break down the small choices that earn that first bit of trust." },
    { tag: "AI", title: "A practical guide to adding AI (without the hype)", date: "May 28, 2026", read: "7 min", author: "Rohan", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=900", excerpt: "AI isn't magic dust you sprinkle on a product. Here's how we decide where it genuinely helps — and where it just adds risk." },
    { tag: "Growth", title: "SEO in 2026: what still actually works", date: "May 15, 2026", read: "5 min", author: "Maya", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900", excerpt: "Search keeps changing, but the fundamentals are stubbornly the same. A no-nonsense look at what moves the needle this year." },
    { tag: "Culture", title: "How a remote team of 50 stays close", date: "Apr 30, 2026", read: "4 min", author: "Nikhil", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900", excerpt: "Ten countries, one shared doc, and a few rituals that keep us human. Our honest take on remote work that doesn't feel lonely." },
    { tag: "Engineering", title: "The performance budget that saved a launch", date: "Apr 12, 2026", read: "6 min", author: "Rohan", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=900", excerpt: "A page that loads in one second feels like a different product. Here's the budget we set and how we held the line under deadline." },
  ],

  /* ---------- FAQ ---------- */
  faqs: [
    { q: "How quickly can you start?", a: "Most projects kick off within 1–2 weeks of our discovery call. Urgent work? Tell us — we'll find a way to fit you in." },
    { q: "How much does a project cost?", a: "It depends on scope, but you'll always get a fixed proposal before we begin — no surprise invoices, ever." },
    { q: "Do you work with businesses outside your country?", a: "Absolutely. We're remote-first and currently partner with teams across 10+ countries and time zones." },
    { q: "What happens after launch?", a: "Every project includes 30 days of free support, and most clients stay on a light retainer for ongoing growth and updates." },
    { q: "Can you add AI to an existing product?", a: "Yes — we specialize in layering automation and AI assistants onto live products without disrupting what already works." },
  ],
};

module.exports = siteData;
