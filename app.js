/* =====================================================
   techNeural – Business Website JS
   ===================================================== */

/* ─── DATA ─────────────────────────────────────── */
const SERVICES = [
  { id: 'web-dev', icon:'<i class="fas fa-laptop-code"></i>', title:'Web Development',         gradient:'linear-gradient(135deg,#5B21B6,#7C3AED)',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    description:'Modern, responsive websites that engage visitors and drive conversions using cutting-edge frameworks and best practices.',
    extendedDescription:'Our web development services deliver dynamic, SEO-optimised websites that blend stunning design with robust functionality. We specialise in interactive front-end interfaces built with React, Vue, and Angular, paired with high-performance back-end systems.',
    features:['Responsive & Mobile-First Design','SEO-Friendly Architecture','Cross-Browser Compatibility','Performance Optimisation','Scalable Cloud Infrastructure'] },

  { id: 'mobile-app', icon:'<i class="fas fa-mobile-alt"></i>', title:'Mobile App Development',  gradient:'linear-gradient(135deg,#7C3AED,#C026D3)',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
    description:'Native and cross-platform mobile applications that deliver seamless, delightful user experiences across all devices.',
    extendedDescription:'Transform your app ideas into engaging, high-performance mobile solutions. Whether native iOS/Android or hybrid React Native/Flutter, our process focuses on robust security, user-centric design, and scalable performance.',
    features:['Native & Hybrid Development','User-Centric Design','Cross-Platform Compatibility','Push Notifications & Offline Mode','App Store Optimisation'] },

  { id: 'software-dev', icon:'<i class="fas fa-microchip"></i>', title:'Software Development',    gradient:'linear-gradient(135deg,#2D0E8A,#5B21B6)',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    description:'Custom software solutions tailored to your business workflows — clean, efficient, maintainable, and built to scale.',
    extendedDescription:'Our engineers craft bespoke software using agile methodologies and modern tech stacks to deliver secure, scalable, and efficient systems that fuel growth and operational efficiency.',
    features:['Custom Business Applications','Agile Development Sprints','Scalable & Secure Architecture','Cloud & API Integration','Comprehensive Documentation'] },

  { id: 'qa-testing', icon:'<i class="fas fa-check-double"></i>', title:'Software Testing & QA',   gradient:'linear-gradient(135deg,#C026D3,#D946EF)',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    description:'Comprehensive QA services to ensure your software is bug-free, secure, and delivers an exceptional user experience.',
    extendedDescription:'Our QA team employs manual and automated testing strategies to detect and resolve issues early. From functional testing to penetration testing, we ensure your product is release-ready.',
    features:['Functional & Regression Testing','Performance & Load Testing','Security & Penetration Testing','Automated Test Suites','User Acceptance Testing'] },

  { id: 'prod-mgmt', icon:'<i class="fas fa-project-diagram"></i>', title:'Product Management',       gradient:'linear-gradient(135deg,#4C1D95,#7C3AED)',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop',
    description:'Strategic product planning and execution to bring your vision to market with maximum impact and measurable ROI.',
    extendedDescription:'Our product management services combine market analysis, agile methodologies, and iterative development to transform innovative ideas into market-ready products that users love.',
    features:['Product Strategy & Roadmapping','User Research & Journey Mapping','MVP Development & Validation','Agile Product Development','Analytics & Product Optimisation'] },

  { id: 'ui-ux', icon:'<i class="fas fa-wand-magic-sparkles"></i>', title:'UI/UX Design',             gradient:'linear-gradient(135deg,#6B1A9E,#C026D3)',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    description:'User-centred design that creates intuitive, visually stunning experiences while maintaining brand consistency.',
    extendedDescription:'Our creative team crafts visually breathtaking interfaces and seamless user experiences — from initial wireframes to polished design systems and interactive prototypes.',
    features:['User Interface & Visual Design','UX Research & Usability Testing','Wireframing & Prototyping','Design Systems & Style Guides','Accessibility Compliance (WCAG)'] },

  { id: 'ecommerce', icon:'<i class="fas fa-cart-shopping"></i>', title:'E-commerce Solutions',     gradient:'linear-gradient(135deg,#7C3AED,#9B1DB0)',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
    description:'End-to-end e-commerce development with seamless payment processing, inventory management, and superior customer experience.',
    extendedDescription:'We build secure, scalable e-commerce platforms integrating payment gateways, efficient inventory management, and powerful customer analytics to drive sales.',
    features:['Custom E-commerce Platforms','Optimised Cart & Checkout Flow','Payment Gateway Integration','Inventory & Order Management','Customer Analytics & Personalisation'] },

  { id: 'seo-marketing', icon:'<i class="fas fa-magnifying-glass-chart"></i>', title:'SEO & Digital Marketing',  gradient:'linear-gradient(135deg,#2D0E8A,#7C3AED)',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    description:'Data-driven strategies to improve your search rankings and maximise online visibility and qualified traffic.',
    extendedDescription:'Our SEO and digital marketing experts use advanced analytics and proven techniques to elevate your brand\'s visibility, acquire targeted traffic, and increase conversions.',
    features:['Keyword Research & On-page SEO','Technical SEO Audits','Content Marketing Strategy','Link Building Campaigns','Analytics & Performance Reporting'] },

  { id: 'social-media', icon:'<i class="fas fa-hashtag"></i>', title:'Social Media Marketing',   gradient:'linear-gradient(135deg,#5B21B6,#C026D3)',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    description:'Engaging social media campaigns that build brand awareness, foster loyalty, and grow your community.',
    extendedDescription:'We create tailored strategies that drive engagement, enhance reach, and build strong customer relationships through compelling content and data-driven insight.',
    features:['Content Strategy & Creation','Community Management','Performance Analytics','Influencer Partnership','Paid Social Campaigns'] },
];

const PROJECTS = [
  { title:'E-Commerce Platform',         image:'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80', description:'Modern e-commerce solution with real-time inventory and AI-powered recommendations', category:'Web Application',   clientType:'Retail',                technologies:['React','Node.js','MongoDB','Stripe API'] },
  { title:'Mobile Banking App',          image:'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80', description:'Secure and intuitive mobile banking with biometric authentication and instant transfers', category:'Mobile Application', clientType:'Financial Services', technologies:['React Native','Firebase','Plaid API'] },
  { title:'AI-Powered Analytics',        image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80', description:'Advanced analytics platform with machine learning capabilities and real-time dashboards', category:'Data Analytics',      clientType:'Enterprise',          technologies:['Python','TensorFlow','D3.js','AWS'] },
  { title:'Corporate WordPress Site',    image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80', description:'Custom WordPress solution with advanced security features and CMS workflows', category:'WordPress Development', clientType:'Financial Services', technologies:['WordPress','PHP','MySQL','Custom Theme'] },
  { title:'Real Estate Showcase',        image:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80', description:'Premium property listing site with virtual tours and smart search', category:'WordPress Development', clientType:'Real Estate',          technologies:['WordPress','WooCommerce','JavaScript','Google Maps API'] },
  { title:'AI Learning Assistant',       image:'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80', description:'Personalised educational platform using AI to adapt and optimise learning paths', category:'AI Educational Tool', clientType:'Education',           technologies:['Python','TensorFlow','React','Node.js'] },
  { title:'Healthcare Management System',image:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',description:'Comprehensive patient management and clinical workflow platform (HIPAA-compliant)', category:'Enterprise Solution', clientType:'Healthcare',           technologies:['Angular','Java Spring','Oracle','HIPAA'] },
  { title:'Virtual Classroom Platform',  image:'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80', description:'Interactive virtual learning environment with real-time collaboration tools', category:'Education Platform',  clientType:'Education',           technologies:['React','WebRTC','Node.js','MongoDB'] },
  { title:'Database Management Tool',    image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80', description:'Enterprise database management solution with visual schema builder and analytics', category:'Desktop Application',  clientType:'Technology',          technologies:['Electron','React','PostgreSQL','SQLite'] },
];

const EXPERTISE = [
  { icon:'💻', title:'Advanced Development',     subtitle:'Cutting-edge implementation strategies',
    keyPoints:['React, Angular & Vue for dynamic frontends','Node.js, Python & Go for high-performance backends','GraphQL & REST for efficient API design'],
    statistic:{ label:'Average performance improvement', value:'68%' } },
  { icon:'🖥️', title:'Scalable Infrastructure',  subtitle:'Enterprise-grade cloud architecture',
    keyPoints:['Kubernetes orchestration for container management','Auto-scaling for traffic fluctuations','Multi-region redundancy & load balancing'],
    statistic:{ label:'Uptime guarantee', value:'99.99%' } },
  { icon:'🌐', title:'Global Delivery',           subtitle:'Worldwide service & support',
    keyPoints:['Multi-region deployment strategies','Edge computing for reduced latency','24/7 global support operations'],
    statistic:{ label:'Countries served', value:'137+' } },
  { icon:'🛡️', title:'Enterprise Security',       subtitle:'Multi-layered protection framework',
    keyPoints:['Zero-trust architecture implementation','End-to-end encryption for sensitive data','Compliance: GDPR, HIPAA, SOC2 & ISO 27001'],
    statistic:{ label:'Vulnerabilities prevented annually', value:'850+' } },
  { icon:'⚡', title:'Performance Engineering',   subtitle:'Maximum efficiency, minimum latency',
    keyPoints:['Sub-100ms response time benchmarks','Comprehensive APM monitoring','Advanced image & asset optimisation pipeline'],
    statistic:{ label:'Average page-load improvement', value:'73%' } },
  { icon:'📊', title:'Data & Analytics',          subtitle:'Actionable, real-time intelligence',
    keyPoints:['Real-time analytics dashboards','Machine learning for predictive modelling','Custom KPI tracking & executive reporting'],
    statistic:{ label:'Average ROI for clients', value:'285%' } },
  { icon:'☁️', title:'Cloud Architecture',        subtitle:'Optimised, cost-efficient cloud',
    keyPoints:['Multi-cloud & hybrid cloud solutions','FinOps cost optimisation strategies','Disaster recovery & business continuity'],
    statistic:{ label:'Average cloud cost reduction', value:'42%' } },
];

const TECH_STACK = [
  { name:'Python',      color:'#3776AB', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python"/>' },
  { name:'JavaScript',  color:'#F7DF1E', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript"/>' },
  { name:'React',       color:'#61DAFB', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React"/>' },
  { name:'Django',      color:'#092E20', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django"/>' },
  { name:'Java',        color:'#ED8B00', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java"/>' },
  { name:'PHP',         color:'#777BB4', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP"/>' },
  { name:'Node.js',     color:'#339933', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js"/>' },
  { name:'TypeScript',  color:'#3178C6', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript"/>' },
  { name:'Flutter',     color:'#02569B', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter"/>' },
  { name:'Docker',      color:'#2496ED', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker"/>' },
  { name:'MongoDB',     color:'#47A248', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB"/>' },
  { name:'MySQL',       color:'#4479A1', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL"/>' },
  { name:'TensorFlow',  color:'#FF6F00', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow"/>' },
  { name:'Firebase',    color:'#FFCA28', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase"/>' },
  { name:'C++',         color:'#00599C', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++"/>' },
  { name:'Kubernetes',  color:'#326CE5', icon:'<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes"/>' },
];

const FAQ_ITEMS = [
  { q: 'How quickly will you respond to my inquiry?', a: 'We respond to all inquiries within 4 business hours. For urgent matters, please call us directly. Our support team operates Monday to Friday, 9:00–18:00 GMT.' },
  { q: 'Do you work with clients internationally?', a: 'Absolutely! We\'re a remote-first company serving clients across 10+ countries. We use tools like Slack, Notion, and Zoom to collaborate seamlessly across time zones.' },
  { q: 'What does a typical project timeline look like?', a: 'Simple websites take 3–6 weeks. Complex web apps or mobile applications typically range from 2–6 months depending on scope, integrations, and testing requirements.' },
  { q: 'Do you provide ongoing maintenance & support?', a: 'Yes! All projects include a free 30-day post-launch support period. We also offer flexible monthly maintenance retainers for ongoing updates, performance monitoring, and feature development.' },
  { q: 'How do you handle project pricing?', a: 'We offer both fixed-price project quotes and time-and-materials engagements. After an initial discovery call, we provide a detailed proposal with full cost transparency — no hidden fees.' },
  { q: 'What technologies do you specialise in?', a: 'Our tech stack includes React, Next.js, Node.js, Python, React Native, Flutter, PostgreSQL, MongoDB, AWS, and more. We select the best tools for each project\'s specific requirements.' },
];

const SHOWCASE_CATEGORIES = ['All','Web Application','Mobile Application','Desktop Application','WordPress Development','AI Educational Tool','Enterprise Solution','Education Platform'];

const FOOTER_LINKS = [
  { title:'Navigation', links:[{name:'Home',href:'#home'},{name:'About',href:'#about'},{name:'Services',href:'#services'},{name:'Showcase',href:'#showcase'},{name:'Contact',href:'#contact'}] },
  { title:'Services',   links:[{name:'Web Development',svc:'web-dev'},{name:'Mobile Apps',svc:'mobile-app'},{name:'UI/UX Design',svc:'ui-ux'},{name:'SEO & Marketing',svc:'seo-marketing'}] },
  { title:'Contact',    links:[{name:'the.techneural@gmail.com',href:'mailto:the.techneural@gmail.com'},{name:'+91 9193257838',href:'tel:+919193257838'},{name:'Get a Quote',href:'#contact'}] },
];


/* ─── STATE ─────────────────────────────────────── */
let currentPage    = 'home';
let carouselIndex  = 0;
let carouselTimer  = null;
let menuOpen       = false;
let selectedFilter = 'All';


/* ─── INIT ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildHeroBubbles();
  buildAboutParticles();
  buildServicesGrid();
  buildCarousel();
  buildExpertise();
  buildTechGrid();
  buildShowcaseFilter();
  buildShowcaseGrid();
  buildServiceCards();
  buildFooters();
  buildFAQ();
  buildAboutParticles();
  buildServicesParticles();
  initScrollHandlers();
  showPage('home');
  startWelcomeToast();
});


/* ─── NAVIGATION ────────────────────────────────── */
function navigate(page) {
  showPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}

function showPage(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  setTimeout(() => observeReveal(), 100);
}


/* ─── MOBILE MENU ───────────────────────────────── */
function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('mobileMenu').classList.toggle('open', menuOpen);
}


/* ─── SCROLL HANDLERS ───────────────────────────── */
function initScrollHandlers() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', window.scrollY > 20);

    const btn = document.getElementById('backToTop');
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  const expertiseScroll = document.getElementById('expertiseScroll');
  if (expertiseScroll) {
    expertiseScroll.addEventListener('scroll', () => {
      const fill = document.getElementById('scrollFill');
      const max  = expertiseScroll.scrollWidth - expertiseScroll.clientWidth;
      const pct  = max > 0 ? (expertiseScroll.scrollLeft / max) * 100 : 0;
      if (fill) fill.style.width = pct + '%';
    });
  }
}


/* ─── REVEAL ANIMATIONS ─────────────────────────── */
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('#page-' + currentPage + ' .reveal').forEach(el => {
    if (!el.classList.contains('revealed')) observer.observe(el);
  });
}


/* ─── HERO BUBBLES ──────────────────────────────── */
function buildHeroBubbles() {
  const container = document.getElementById('heroBg');
  if (!container) return;
  for (let i = 0; i < 22; i++) {
    const div  = document.createElement('div');
    const size = Math.random() * 280 + 60;
    div.className = 'hero-circle';
    div.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation-duration:${22 + Math.random() * 28}s;
      animation-delay:${-Math.random() * 20}s;
      opacity:${0.02 + Math.random() * 0.07};
    `;
    container.appendChild(div);
  }
}


/* ─── ABOUT PARTICLES ───────────────────────────── */
function buildAboutParticles() {
  const container = document.getElementById('aboutParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 4 + 1.5;
    const duration = 12 + Math.random() * 18;
    const delay = -Math.random() * duration;
    dot.className = 'about-particle';
    dot.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 20}%;
      animation-duration:${duration}s;
      animation-delay:${delay}s;
      opacity:${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(dot);
  }
}

function buildServicesParticles() {
  const container = document.getElementById('servicesParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 4 + 1.5;
    const duration = 12 + Math.random() * 18;
    const delay = -Math.random() * duration;
    dot.className = 'about-particle';
    dot.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 20}%;
      animation-duration:${duration}s;
      animation-delay:${delay}s;
      opacity:${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(dot);
  }
}


/* ─── SERVICES PREVIEW GRID (Home) ─────────────── */
function buildServicesGrid() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  SERVICES.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'svc-card reveal';
    div.style.animationDelay = (i * 0.06) + 's';
    div.innerHTML = `
      <div class="svc-card-inner" style="background:${s.gradient}">
        <div class="svc-icon">${s.icon}</div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>`;
    div.onclick = () => viewServiceDetail(s.id);
    grid.appendChild(div);
  });
}


/* ─── SERVICE CARDS (Services page) ────────────── */
function buildServiceCards() {
  const grid = document.getElementById('serviceCardsGrid');
  if (!grid) return;
  SERVICES.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'svc-glass-card reveal';
    div.style.animationDelay = (i * 0.06) + 's';
    div.innerHTML = `
      <div class="svc-hover-bg"></div>
      <div class="svc-glass-icon" style="background:${s.gradient}">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <div class="svc-arrow">→</div>`;
    div.onclick = () => viewServiceDetail(s.id);
    grid.appendChild(div);
  });
}


/* ─── SERVICE MODAL ─────────────────────────────── */
function openServiceModal(s) {
  const content = document.getElementById('serviceModalContent');
  content.innerHTML = `
    <div class="service-modal-bg-anim"></div>
    <button class="service-modal-close" onclick="closeServiceModal()">✕</button>
    <div class="service-modal-head">
      <div class="service-modal-icon" style="background:${s.gradient}">${s.icon}</div>
      <h2>${s.title}</h2>
    </div>
    <p class="service-modal-desc">${s.extendedDescription}</p>
    ${s.features ? `
    <div class="service-modal-features">
      ${s.features.map(f => `
        <div class="service-modal-feature">
          <div class="feature-dot" style="background:${s.gradient}"></div>
          <span>${f}</span>
        </div>`).join('')}
    </div>` : ''}
    <button class="btn-gradient-full" style="background:${s.gradient};width:auto;padding:.8rem 2rem;border-radius:9999px;display:inline-flex" onclick="navigate('contact');closeServiceModal()">Get Started →</button>
  `;
  document.getElementById('serviceModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ─── SERVICE DETAIL PAGE ───────────────────────── */
function viewServiceDetail(serviceId) {
  const s = SERVICES.find(sv => sv.id === serviceId);
  if (!s) return;

  const content = document.getElementById('serviceDetailPageContent');
  if (!content) return;

  content.innerHTML = `
    <section class="svc-detail-hero">
      <div class="svc-detail-hero-img">
        <img src="${s.image}" alt="${s.title}" />
      </div>
      <div class="svc-detail-hero-overlay" style="background:${s.gradient}"></div>
      <div class="container text-center svc-detail-hero-content reveal">
        <div class="svc-detail-icon">${s.icon}</div>
        <h1>${s.title}</h1>
        <p>${s.description}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="svc-detail-content-wrap">
          <div class="svc-detail-text reveal">
            <h2>Experience Engineering <span class="gradient-text">Excellence</span></h2>
            <p>${s.extendedDescription}</p>
            <div class="svc-detail-features">
              ${s.features.map(f => `
                <div class="svc-detail-feature">
                  <span class="feat-dot" style="background:${s.gradient}"></span>
                  <span>${f}</span>
                </div>
              `).join('')}
            </div>
            <button class="btn-brand mt-8" onclick="navigate('contact')">Get a Free Quote for ${s.title}</button>
          </div>
          <div class="svc-detail-infographic reveal">
            <div class="info-card-inner" style="border-color:rgba(255,255,255,0.1)">
               <div class="info-icon" style="background:${s.gradient}">✨</div>
               <h3>${s.title} Specialized</h3>
               <p>We use industry-leading tools and 10+ years of expertise to deliver world-class ${s.title} results for our clients.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-section">
      <div class="container text-center reveal">
        <div class="badge">🚀 Let's Build Something Great</div>
        <h2>Ready to transform your business?</h2>
        <p class="max-w-3xl mb-8">Partner with us to leverage ${s.title} and drive your digital success forward. Our team is ready to help you innovate and scale.</p>
        <div class="hero-btns" style="justify-content:center">
          <button class="btn-primary" onclick="navigate('contact')">Start Your Project</button>
          <button class="btn-outline" onclick="navigate('services')">All Services</button>
        </div>
      </div>
    </section>
  `;

  navigate('service-detail');
}


/* ─── STORY MODAL ───────────────────────────────── */
function openStoryModal() {
  document.getElementById('storyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeStoryModal(e) {
  if (e && e.target !== document.getElementById('storyModal')) return;
  document.getElementById('storyModal').classList.remove('open');
  document.body.style.overflow = '';
}


/* ─── CAROUSEL ──────────────────────────────────── */
function buildCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots  = document.getElementById('carouselDots');
  if (!track || !dots) return;

  PROJECTS.forEach((p, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `
      <img src="${p.image}" alt="${p.title}" loading="lazy"/>
      <div class="carousel-overlay">
        <div class="carousel-tags">
          <span class="carousel-tag category">${p.category}</span>
          <span class="carousel-tag client">${p.clientType}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="carousel-tech">
          ${p.technologies.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>`;
    track.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dots.appendChild(dot);
  });

  startCarouselAuto();
}

function goToSlide(idx) {
  carouselIndex = (idx + PROJECTS.length) % PROJECTS.length;
  const track = document.getElementById('carouselTrack');
  if (track) track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === carouselIndex));
}

function carouselNext() { goToSlide(carouselIndex + 1); resetCarouselAuto(); }
function carouselPrev() { goToSlide(carouselIndex - 1); resetCarouselAuto(); }

function startCarouselAuto() {
  carouselTimer = setInterval(() => goToSlide(carouselIndex + 1), 5000);
}
function resetCarouselAuto() {
  clearInterval(carouselTimer);
  startCarouselAuto();
}


/* ─── EXPERTISE HORIZONTAL ──────────────────────── */
function buildExpertise() {
  const container = document.getElementById('expertiseScroll');
  if (!container) return;
  EXPERTISE.forEach(item => {
    const div = document.createElement('div');
    div.className = 'expertise-card';
    div.innerHTML = `
      <div class="expertise-card-header">
        <div class="expertise-card-icon">${item.icon}</div>
        <h3>${item.title}</h3>
      </div>
      <h4>${item.subtitle}</h4>
      <ul>${item.keyPoints.map(p => `<li>${p}</li>`).join('')}</ul>
      ${item.statistic ? `
      <div class="expertise-stat">
        <span class="expertise-stat-label">${item.statistic.label}</span>
        <span class="expertise-stat-value">${item.statistic.value}</span>
      </div>` : ''}
    `;
    container.appendChild(div);
  });
}

function scrollExpertise(amount) {
  const el = document.getElementById('expertiseScroll');
  if (el) el.scrollBy({ left: amount, behavior: 'smooth' });
}


/* ─── TECH STACK GRID (About) ───────────────────── */
function buildTechGrid() {
  const grid = document.getElementById('techGrid');
  if (!grid) return;
  TECH_STACK.forEach((t, i) => {
    const div = document.createElement('div');
    div.className = 'tech-card reveal';
    div.style.animationDelay = (i * 0.05) + 's';
    div.innerHTML = `
      <div class="tech-icon-bg" style="--tech-color:${t.color}">
        ${t.icon}
      </div>
      <h3>${t.name}</h3>
      <div class="tech-hover-bar" style="background:${t.color};opacity:.85"></div>
    `;
    grid.appendChild(div);
  });
}


/* ─── SHOWCASE ──────────────────────────────────── */
function buildShowcaseFilter() {
  const container = document.getElementById('showcaseFilter');
  if (!container) return;
  SHOWCASE_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === 'All' ? ' active' : '');
    btn.textContent = cat;
    btn.onclick = () => {
      selectedFilter = cat;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildShowcaseGrid();
    };
    container.appendChild(btn);
  });
}

function buildShowcaseGrid() {
  const grid = document.getElementById('showcaseGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = selectedFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedFilter);

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;grid-column:1/-1;padding:3rem">No projects found in this category.</p>';
    return;
  }

  filtered.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'showcase-card reveal';
    div.style.animationDelay = (i * 0.07) + 's';
    div.innerHTML = `
      <div class="showcase-card-img">
        <img src="${p.image}" alt="${p.title}" loading="lazy"/>
      </div>
      <div class="showcase-card-body">
        <div class="showcase-cat">${p.category}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="showcase-techs">
          ${p.technologies.map(t => `<span class="showcase-tech">${t}</span>`).join('')}
        </div>
      </div>`;
    grid.appendChild(div);
  });
  setTimeout(() => observeReveal(), 50);
}


/* ─── FAQ ACCORDION ─────────────────────────────── */
function buildFAQ() {
  const container = document.getElementById('faqContainer');
  if (!container) return;
  FAQ_ITEMS.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'faq-item';
    div.innerHTML = `
      <div class="faq-item-head" onclick="toggleFAQ(${i})">
        <h3>${item.q}</h3>
        <span class="faq-chevron">▾</span>
      </div>
      <div class="faq-item-body">
        <p>${item.a}</p>
      </div>`;
    container.appendChild(div);
  });
}

function toggleFAQ(idx) {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item, i) => {
    if (i === idx) {
      item.classList.toggle('open');
    } else {
      item.classList.remove('open');
    }
  });
}


/* ─── FOOTER BUILDER ────────────────────────────── */
function buildFooters() {
  ['home','about','services','showcase','contact','service-detail'].forEach(page => {
    const el = document.getElementById('footer-' + page);
    if (!el) return;
    el.innerHTML = `
      <div class="footer-top-bar"></div>
      <div class="footer-glow-left"></div>
      <div class="footer-glow-right"></div>
      <div class="container" style="position:relative;z-index:1">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <img src="nikhil logo.png" alt="techNeural" />
            <p>Transforming ideas into digital excellence through innovative solutions, cutting-edge technology, and a passion for engineering.</p>
            <div class="footer-newsletter">
              <h4>Stay in the Loop</h4>
              <div class="footer-newsletter-row">
                <input type="email" placeholder="Your Email"/>
                <button>Join</button>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          ${FOOTER_LINKS.map(col => `
            <div class="footer-col">
              <h3>${col.title}</h3>
              <ul>
                ${col.links.map(link => {
                  let action = '';
                  if (link.svc) action = `onclick="viewServiceDetail('${link.svc}')" style="cursor:pointer"`;
                  else if (link.href) action = `href="${link.href}" onclick="handleFooterLink(event,'${link.href}')"`;
                  return `<li><a ${action}>${link.name}</a></li>`;
                }).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="footer-bottom">
          <div class="footer-socials">
            <a href="https://www.linkedin.com/company/107535474/" target="_blank" class="footer-social"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61573328364639" target="_blank" class="footer-social"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.github.com" target="_blank" class="footer-social"><i class="fab fa-github"></i></a>
            <a href="https://www.instagram.com/the.techneural/" target="_blank" class="footer-social"><i class="fab fa-instagram"></i></a>
          </div>
          <div class="footer-copyright">
            &copy; 2024 techNeural Solutions. All rights reserved.
          </div>
          <button class="footer-scroll-btn" onclick="window.scrollTo({top:0,behavior:'smooth'})">
            <i class="fas fa-chevron-up"></i>
          </button>
        </div>
      </div>
    `;
  });
}

function handleFooterLink(e, href) {
  if (href.startsWith('#')) {
    e.preventDefault();
    const page = href.replace('#','') || 'home';
    navigate(page);
  }
}


/* ─── CONTACT FORM ──────────────────────────────── */
function handleContactSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('cName').value.trim();
  const email   = document.getElementById('cEmail').value.trim();
  const message = document.getElementById('cMessage').value.trim();
  let valid = true;

  document.getElementById('errName').textContent    = '';
  document.getElementById('errEmail').textContent   = '';
  document.getElementById('errMessage').textContent = '';

  if (!name)    { document.getElementById('errName').textContent = 'Full name is required'; valid = false; }
  if (!email)   { document.getElementById('errEmail').textContent = 'Email address is required'; valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('errEmail').textContent = 'Please enter a valid email address'; valid = false; }
  if (!message) { document.getElementById('errMessage').textContent = 'Please tell us about your project'; valid = false; }

  if (!valid) return;

  const btn     = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoad = document.getElementById('btnLoading');

  btn.disabled          = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';

  // Simulate async send
  setTimeout(() => {
    btn.disabled          = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';
    document.getElementById('contactForm').reset();
    const success = document.getElementById('formSuccess');
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 6000);
    showToast('🎉 Message sent! We\'ll respond within 24 hours.');
  }, 1800);
}


/* ─── TOAST ─────────────────────────────────────── */
function showToast(msg, duration = 4000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function startWelcomeToast() {
  setTimeout(() => showToast('👋 Welcome to techNeural! Explore our services or get a free quote.', 5000), 2500);
}


/* ─── KEYBOARD SHORTCUTS ────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('serviceModal').classList.remove('open');
    document.getElementById('storyModal').classList.remove('open');
    document.body.style.overflow = '';
    if (menuOpen) { menuOpen = false; document.getElementById('mobileMenu').classList.remove('open'); }
  }
});
