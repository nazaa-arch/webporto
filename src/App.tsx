import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Copy,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const arcTrackRef = useRef<HTMLDivElement>(null);

  // Navbar scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax pointer tracking for hero tiles
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handlePointerMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const my = ((e.clientY - r.top) / r.height) * 2 - 1;
      hero.style.setProperty("--mx", mx.toFixed(3));
      hero.style.setProperty("--my", my.toFixed(3));
    };

    const handlePointerLeave = () => {
      hero.style.setProperty("--mx", "0");
      hero.style.setProperty("--my", "0");
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  // Arc carousel animation
  useEffect(() => {
    const track = arcTrackRef.current;
    if (!track) return;

    let animId: number;
    let offset = 0;
    const speed = 0.5;

    const animate = () => {
      offset -= speed;
      const cards = track.children;
      const totalWidth = 320 * cards.length;
      if (Math.abs(offset) > totalWidth / 2) {
        offset = 0;
      }
      track.style.transform = `translateX(${offset}px)`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("firmannaza307@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* -------------------- NAVIGATION -------------------- */}
      <header className={`nav ${scrolled ? "scrolled" : ""}`} id="nav">
        <a className="nav-logo" href="#top">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" strokeDasharray="9.6 4.54" strokeDashoffset="-2.27" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <span>Naza Firmansyah</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-right">
          <a
            className="btn-primary nav-cta"
            href="mailto:firmannaza307@gmail.com?subject=New%20Project%20Inquiry"
          >
            <span>Hire Me</span>
            <ArrowUpRight size={15} />
          </a>
          <button
            className="nav-burger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Panel */}
      <div className={`nav-mobile-panel ${mobileMenuOpen ? "open" : ""}`}>
        <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        <hr />
        <a
          className="btn-primary"
          href="mailto:firmannaza307@gmail.com?subject=New%20Project%20Inquiry"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span>Hire Me</span>
          <ArrowUpRight size={15} />
        </a>
      </div>

      <main id="top">
        {/* -------------------- HERO SECTION -------------------- */}
        <section className="hero" id="hero" ref={heroRef}>
          <div className="hero-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          {/* Floating Interactive Project Tiles */}
          <div className="tiles">
            {/* Tile 1 */}
            <div className="tile t1">
              <div className="tile-inner">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "10px" }}>THIS ME</span>
                  <span style={{ fontSize: "10px", color: "var(--neutral-500)" }}>BISINDO</span>
                </div>
                <div>
                  <strong style={{ fontSize: "11px", color: "var(--ink)", display: "block" }}>
                    Sign Language App
                  </strong>
                  <span style={{ fontSize: "9px", color: "var(--neutral-500)" }}>30+ Figma Screens</span>
                </div>
              </div>
            </div>

            {/* Tile 2 */}
            <div className="tile t2">
              <div className="tile-inner" style={{ background: "linear-gradient(135deg, #fff 0%, #DBE8FC 100%)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "10px" }}>STEAMCRAFT</span>
                  <span style={{ fontSize: "10px", color: "var(--neutral-500)" }}>3D Studio</span>
                </div>
                <div>
                  <strong style={{ fontSize: "11px", color: "var(--ink)", display: "block" }}>
                    Simulation Lab UX
                  </strong>
                  <span style={{ fontSize: "9px", color: "var(--neutral-500)" }}>Interactive WebGL</span>
                </div>
              </div>
            </div>

            {/* Tile 3 */}
            <div className="tile t3">
              <div className="tile-inner">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "10px" }}>A-KERE</span>
                  <span style={{ fontSize: "10px", color: "var(--neutral-500)" }}>Fintech</span>
                </div>
                <div>
                  <strong style={{ fontSize: "11px", color: "var(--ink)", display: "block" }}>
                    Fast Expense Flow
                  </strong>
                  <span style={{ fontSize: "9px", color: "var(--neutral-500)" }}>-50% Input Time</span>
                </div>
              </div>
            </div>

            {/* Tile 4 */}
            <div className="tile t4">
              <div className="tile-inner" style={{ background: "linear-gradient(135deg, #fff 0%, #BADDFC 100%)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "10px" }}>DIMAS TI</span>
                  <span style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 600 }}>🥈 Perak</span>
                </div>
                <div>
                  <strong style={{ fontSize: "11px", color: "var(--ink)", display: "block" }}>
                    National Award
                  </strong>
                  <span style={{ fontSize: "9px", color: "var(--neutral-500)" }}>UI/UX Competition</span>
                </div>
              </div>
            </div>

            {/* Tile 5 */}
            <div className="tile t5">
              <div className="tile-inner">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "10px" }}>UNESA DATA</span>
                  <span style={{ fontSize: "10px", color: "var(--neutral-500)" }}>GPA 3.80</span>
                </div>
                <div>
                  <strong style={{ fontSize: "11px", color: "var(--ink)", display: "block" }}>
                    Data-Driven UX
                  </strong>
                  <span style={{ fontSize: "9px", color: "var(--neutral-500)" }}>SUS Usability Score</span>
                </div>
              </div>
            </div>

            {/* Tile 6 */}
            <div className="tile t6">
              <div className="tile-inner" style={{ background: "linear-gradient(135deg, #fff 0%, #E0EEFE 100%)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "10px" }}>GEMASTIK XVIII</span>
                  <span style={{ fontSize: "10px", color: "var(--primary)" }}>Finalis</span>
                </div>
                <div>
                  <strong style={{ fontSize: "11px", color: "var(--ink)", display: "block" }}>
                    UX Design Division
                  </strong>
                  <span style={{ fontSize: "9px", color: "var(--neutral-500)" }}>Puspresnas 2025</span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="hero-title">
            <span>The design and UI/UX</span>
            <span>direction portfolio</span>
            <span>of Naza Firmansyah</span>
          </h1>

          <p className="eyebrow left">
            Design
            <br />
            UI/UX Direction
            <br />
            Portfolio
          </p>
          <p className="eyebrow right">
            Selected
            <br />
            Work
            <br />
            2026
          </p>
        </section>

        {/* -------------------- SELECTED WORKS -------------------- */}
        <section className="section work" id="work">
          <div className="container wide">
            <div className="display-head">
              <h2 className="display-title">
                Selected works<sup className="display-count">(04)</sup>
              </h2>
              <div className="display-sub-row">
                <p className="display-sub">2024 – 2026</p>
                <div className="clients">
                  <div className="award-badge-pill">
                    <Award size={16} className="text-primary" />
                    <span>Juara 2 DIMAS TI &amp; Finalis GEMASTIK XVIII</span>
                  </div>
                  <div className="award-badge-pill">
                    <Sparkles size={16} className="text-primary" />
                    <span>UNESA Sains Data</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="works-list">
              {/* Work 01 */}
              <article className="work-row" id="project-01">
                <div className="work-info">
                  <h3>This Me</h3>
                  <p className="work-tags">Product design · Inclusive App Design</p>
                  <p className="work-desc">
                    A gamified Indonesian Sign Language (BISINDO) interactive learning app featuring 30+
                    Figma interfaces, comprehensive component design systems, and inclusive usability research for the Deaf community.
                  </p>
                  <a
                    className="btn-secondary"
                    href="https://github.com/nazaa-arch/webporto"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View work <ArrowRight size={15} />
                  </a>
                </div>
                <div className="work-shots">
                  <div className="shot">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">01 / Onboarding</span>
                      <span className="text-[10px] text-neutral-500">BISINDO Flow</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Gesture Gamification</strong>
                      <p className="text-xs text-neutral-500 mt-1">Guided camera learning with high-contrast feedback</p>
                    </div>
                  </div>
                  <div className="shot" style={{ background: "linear-gradient(135deg, #fff 0%, #DBE8FC 100%)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">02 / Design System</span>
                      <span className="text-[10px] text-neutral-500">Figma Tokens</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Modular Components</strong>
                      <p className="text-xs text-neutral-500 mt-1">WCAG 2.1 accessible color palette &amp; typography</p>
                    </div>
                  </div>
                  <div className="shot">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">03 / Usability</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">SUS 92.5</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">User Testing Validated</strong>
                      <p className="text-xs text-neutral-500 mt-1">Silver Medalist DIMAS TI 2025</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Work 02 */}
              <article className="work-row" id="project-02">
                <div className="work-info">
                  <h3>SteamCraft Ecosystem</h3>
                  <p className="work-tags">Product design · 3D Simulation &amp; Web App</p>
                  <p className="work-desc">
                    Interactive virtual science simulation studio (SteamSim Lab) and generative 3D parametric modeling canvas (MakerCraft 3D) engineered for complex multi-parameter workbench controls.
                  </p>
                  <a
                    className="btn-secondary"
                    href="https://portofolionaza.steamcraft.online"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View platform <ArrowRight size={15} />
                  </a>
                </div>
                <div className="work-shots">
                  <div className="shot">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">01 / SteamSim Lab</span>
                      <span className="text-[10px] text-neutral-500">sim.steamcraft.online</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Physics &amp; Chemistry Studio</strong>
                      <p className="text-xs text-neutral-500 mt-1">Real-time parameters and interactive graph curves</p>
                    </div>
                  </div>
                  <div className="shot" style={{ background: "linear-gradient(135deg, #fff 0%, #E0EEFE 100%)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">02 / MakerCraft 3D</span>
                      <span className="text-[10px] text-neutral-500">maker.steamcraft.online</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Parametric 3D Canvas</strong>
                      <p className="text-xs text-neutral-500 mt-1">Torus knot, Möbius strip &amp; OBJ 3D print export</p>
                    </div>
                  </div>
                  <div className="shot">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">03 / Architecture</span>
                      <span className="text-[10px] text-neutral-500">Lead System Architect</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Multi-Subdomain Ecosystem</strong>
                      <p className="text-xs text-neutral-500 mt-1">Ergonomic dark-mode scientific workbench</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Work 03 */}
              <article className="work-row" id="project-03">
                <div className="work-info">
                  <h3>A-KERE</h3>
                  <p className="work-tags">App design · Fintech Mobile UX</p>
                  <p className="work-desc">
                    A streamlined personal budgeting and finance tracking app designed to eliminate friction in daily transaction logging, cutting user input time by 50% with intuitive visualization.
                  </p>
                  <a className="btn-secondary" href="#contact">
                    View case study <ArrowRight size={15} />
                  </a>
                </div>
                <div className="work-shots">
                  <div className="shot">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">01 / Quick-Log</span>
                      <span className="text-[10px] text-neutral-500">Fast Flow</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">3-Second Input Flow</strong>
                      <p className="text-xs text-neutral-500 mt-1">Smart category prediction &amp; numeric shortcuts</p>
                    </div>
                  </div>
                  <div className="shot" style={{ background: "linear-gradient(135deg, #fff 0%, #BADDFC 100%)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">02 / Analytics</span>
                      <span className="text-[10px] text-neutral-500">Dashboard</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Visual Budget Breakdown</strong>
                      <p className="text-xs text-neutral-500 mt-1">Color-coded daily, weekly and monthly envelopes</p>
                    </div>
                  </div>
                  <div className="shot">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">03 / Efficiency</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">+50% Faster</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Frictionless Experience</strong>
                      <p className="text-xs text-neutral-500 mt-1">Built with young professionals in mind</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Work 04 */}
              <article className="work-row" id="project-04">
                <div className="work-info">
                  <h3>Naza Cell POS</h3>
                  <p className="work-tags">Product design · Enterprise Retail System</p>
                  <p className="work-desc">
                    Cashier POS interface and inventory management system designed for 100+ stock-keeping units (SKUs) and dozens of high-frequency daily digital financial transactions (PPOB, pulses, e-money).
                  </p>
                  <a className="btn-secondary" href="#contact">
                    View system <ArrowRight size={15} />
                  </a>
                </div>
                <div className="work-shots">
                  <div className="shot">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">01 / Cashier Terminal</span>
                      <span className="text-[10px] text-neutral-500">High Speed</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Keyboard-Driven Checkout</strong>
                      <p className="text-xs text-neutral-500 mt-1">50-80 transactions processed daily</p>
                    </div>
                  </div>
                  <div className="shot" style={{ background: "linear-gradient(135deg, #fff 0%, #DBE8FC 100%)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">02 / Inventory Matrix</span>
                      <span className="text-[10px] text-neutral-500">100+ SKUs</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">Multi-Supplier Tracking</strong>
                      <p className="text-xs text-neutral-500 mt-1">100% stock availability guarantee</p>
                    </div>
                  </div>
                  <div className="shot">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className="font-mono text-xs font-semibold text-primary">03 / Operations</span>
                      <span className="text-[10px] text-neutral-500">Since 2019</span>
                    </div>
                    <div>
                      <strong className="text-sm font-semibold text-ink">End-to-End Business Flow</strong>
                      <p className="text-xs text-neutral-500 mt-1">Integrated digital financial services</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* -------------------- CURVED ARC CAROUSEL -------------------- */}
        <section className="arc" aria-label="More explorations">
          <div className="container wide arc-head">
            <div>
              <h3>More explorations</h3>
              <p>Design systems, UI prototypes, and academic research experiments.</p>
            </div>
          </div>

          <div className="arc-viewport" aria-hidden="true">
            <div
              className="arc-track"
              ref={arcTrackRef}
              style={{ display: "flex", gap: "24px", willChange: "transform" }}
            >
              {[
                { title: "ThisMe BISINDO", tag: "Figma UI / Gesture", color: "#DBE8FC" },
                { title: "SteamSim Lab", tag: "3D Parametric Canvas", color: "#BADDFC" },
                { title: "Cyberbullying Model", tag: "NLP & Logistic Reg", color: "#E0EEFE" },
                { title: "MakerCraft 3D", tag: "Generative Math Art", color: "#DBE8FC" },
                { title: "Spatial Dengue GWR", tag: "Geo Data Science", color: "#BADDFC" },
                { title: "A-KERE Finance", tag: "Mobile Prototyping", color: "#E0EEFE" },
                { title: "ThisMe BISINDO", tag: "Figma UI / Gesture", color: "#DBE8FC" },
                { title: "SteamSim Lab", tag: "3D Parametric Canvas", color: "#BADDFC" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="arc-card"
                  style={{
                    position: "relative",
                    flex: "0 0 320px",
                    background: item.color,
                  }}
                >
                  <span className="font-mono text-xs font-semibold text-primary">{item.tag}</span>
                  <div>
                    <strong className="text-base font-bold text-ink block">{item.title}</strong>
                    <span className="text-xs text-neutral-500">Naza Firmansyah Portfolio</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="arc-cta">
            <div className="arc-cta-text">
              <div>
                <strong>Like what you see?</strong>
                <span>Open for new UI/UX projects &middot; Let&rsquo;s build something together</span>
              </div>
            </div>
            <div className="arc-cta-btns">
              <a className="btn-primary" href="#contact">
                Contact me <ArrowRight size={16} />
              </a>
              <a
                className="btn-secondary"
                href="mailto:firmannaza307@gmail.com?subject=CV%20Request"
              >
                Request CV <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* -------------------- STACKING (ABOUT + SERVICES) -------------------- */}
        <div className="stack">
          {/* About Section */}
          <section className="about" id="about">
            <div className="meet">
              <figure className="meet-photo">
                <p className="meet-tag" aria-hidden="true">
                  <span>[Naza</span>
                  <span>Firmansyah]</span>
                </p>
                <div className="meet-roles">
                  <p>
                    UI/UX Designer
                    <br />
                    Data Science Student (UNESA)
                    <br />
                    Product Thinker
                    <br />
                    System Architect
                  </p>
                </div>
              </figure>

              <div className="meet-panel">
                <div className="meet-content">
                  <h2 className="meet-title">
                    <span>Meet</span>
                    <span>Naza Firmansyah</span>
                  </h2>
                  <p className="meet-role">
                    <strong>UI/UX Designer &amp; Data Science Student</strong>
                    <span>/ Strategy &times; UX &times; Data &times; Product</span>
                  </p>
                  <blockquote className="meet-quote">
                    <p className="meet-lead">
                      I turn complex data and user needs into intuitive digital products.
                    </p>
                    <p>
                      Sebagai mahasiswa Sains Data di Universitas Negeri Surabaya (IPK 3.80), saya bekerja
                      pada titik temu antara presisi analitik data kuantitatif dan empati desain antarmuka manusia.
                    </p>
                    <p>
                      Mulai dari riset pengguna, wireframing, pembentukan sistem desain modular di Figma, hingga
                      pengujian kegunaan (SUS Score), saya memastikan setiap interaksi didukung oleh data nyata.
                    </p>
                  </blockquote>
                  <ul className="meet-skills">
                    <li>
                      <span className="skill-art">🎯</span>
                      <span>Strategy</span>
                    </li>
                    <li>
                      <span className="skill-art">🎨</span>
                      <span>UI/UX</span>
                    </li>
                    <li>
                      <span className="skill-art">📊</span>
                      <span>Data</span>
                    </li>
                    <li>
                      <span className="skill-art">⚡</span>
                      <span>Product</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="section services" id="services">
            <div className="container wide">
              <div className="display-head">
                <h2 className="display-title">
                  Services<sup className="display-count">(06)</sup>
                </h2>
              </div>

              <div className="service-list">
                <a className="service-row" href="#contact">
                  <span className="service-num">(01)</span>
                  <h3 className="service-name">Product strategy &amp; research</h3>
                  <p className="service-desc">
                    Turning business goals and user behaviors into clear product roadmaps through user interviews, empathy mapping, and information architecture.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row" href="#contact">
                  <span className="service-num">(02)</span>
                  <h3 className="service-name">UI/UX &amp; product design</h3>
                  <p className="service-desc">
                    Designing seamless digital experiences through user flows, wireframes, high-fidelity interfaces, and interactive Figma prototypes.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row" href="#contact">
                  <span className="service-num">(03)</span>
                  <h3 className="service-name">Mobile application design</h3>
                  <p className="service-desc">
                    Crafting intuitive iOS and Android applications with thoughtful micro-interactions, accessibility guidelines (WCAG), and responsive layouts.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row" href="#contact">
                  <span className="service-num">(04)</span>
                  <h3 className="service-name">Web &amp; dashboard systems</h3>
                  <p className="service-desc">
                    Creating modern web applications, retail POS dashboards, and data visualization tools balancing visual clarity with dense information.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row" href="#contact">
                  <span className="service-num">(05)</span>
                  <h3 className="service-name">Design systems &amp; tokens</h3>
                  <p className="service-desc">
                    Building scalable Figma token architectures, reusable component variants, and consistent visual guidelines that accelerate development.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row" href="#contact">
                  <span className="service-num">(06)</span>
                  <h3 className="service-name">Usability &amp; data validation</h3>
                  <p className="service-desc">
                    Validating digital products through System Usability Scale (SUS) benchmarking, qualitative user feedback, and data-informed iterations.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* -------------------- CONTACT SECTION -------------------- */}
        <section className="section contact" id="contact">
          <div className="container wide">
            <div className="cta-panel">
              <p className="eyebrow">
                Let&rsquo;s
                <br />
                Build
                <br />
                Something
                <br />
                Clear
              </p>

              <h2 className="display-title">Have a project?</h2>
              <p className="cta-lead">
                Tell me what you&rsquo;re building. I&rsquo;ll get back to you with ideas, a timeline and the next steps.
              </p>

              <div className="cta-actions">
                <a
                  className="btn-primary"
                  id="startProject"
                  href="mailto:firmannaza307@gmail.com?subject=New%20Project%20Inquiry"
                >
                  Start a project <ArrowRight size={16} />
                </a>
                <button
                  className="btn-secondary"
                  type="button"
                  id="copyEmail"
                  onClick={handleCopy}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? "Copied!" : "Copy email"}</span>
                </button>
              </div>

              <div className="cta-info">
                <div>
                  <span className="cta-label">Email</span>
                  <a className="cta-email" href="mailto:firmannaza307@gmail.com">
                    firmannaza307@gmail.com
                  </a>
                </div>
                <div>
                  <span className="cta-label">Socials</span>
                  <div className="socials">
                    <a href="https://linkedin.com/in/nazafirman" target="_blank" rel="noopener">
                      LinkedIn <ArrowUpRight size={12} />
                    </a>
                    <a href="https://github.com/nazaa-arch" target="_blank" rel="noopener">
                      GitHub <ArrowUpRight size={12} />
                    </a>
                    <a href="https://wa.me/6285236019625" target="_blank" rel="noopener">
                      WhatsApp <ArrowUpRight size={12} />
                    </a>
                    <a
                      href="https://portofolionaza.steamcraft.online"
                      target="_blank"
                      rel="noopener"
                    >
                      SteamCraft <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
                <div>
                  <span className="cta-label">Availability</span>
                  <div className="cta-status">
                    <span className="status-dot" aria-hidden="true" />
                    <div>
                      <strong>Open for new projects</strong>
                      <span>UI/UX Design · Product Strategy · Internships</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="footer">
              <span>&copy; {new Date().getFullYear()} Muhammad Naza Firmansyah</span>
              <a href="#top">
                Back to top <ArrowUpRight size={16} />
              </a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
