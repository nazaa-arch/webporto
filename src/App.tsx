import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*              3D INTERACTIVE CARD CONTAINER (ZYXKOO.DEV STYLE)              */
/* -------------------------------------------------------------------------- */

function Card3D({
  children,
  className = "",
  maxTilt = 7,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setRotate({ x: rotX, y: rotY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="card-3d-wrapper">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) translateZ(10px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
        className={`card-3d-panel ${className}`}
      >
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle 480px at ${glare.x}% ${glare.y}%, rgba(16, 102, 255, 0.12), transparent 75%)`,
            }}
          />
        )}
        <div
          style={{
            transform: isHovered ? "translateZ(18px)" : "translateZ(0px)",
            transition: "transform 0.2s ease",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*              3D SHOT PREVIEW CARD (CURSOR TRACKING TILT)                   */
/* -------------------------------------------------------------------------- */

function ShotCard3D({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const shotRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shotRef.current) return;
    const rect = shotRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotX, y: rotY });
  };

  return (
    <div
      ref={shotRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
      style={{
        ...style,
        transform: isHovered
          ? `rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) scale(1.04) translateZ(16px)`
          : "rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)",
        transition: isHovered
          ? "transform 0.08s ease-out, box-shadow 0.2s ease"
          : "transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.4s ease",
        transformStyle: "preserve-3d",
      }}
      className={`shot ${className}`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN APP COMPONENT                            */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const arcTrackRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const startProjectRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // -------------------------------------------------------------
    // 1. Nav scrolled toggle
    // -------------------------------------------------------------
    const nav = navRef.current;
    const onScrollNav = () => {
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 24);
      }
    };
    window.addEventListener("scroll", onScrollNav, { passive: true });
    onScrollNav();

    // -------------------------------------------------------------
    // 2. Start a project Gmail compose on desktop
    // -------------------------------------------------------------
    const startBtn = startProjectRef.current;
    if (startBtn && window.matchMedia("(pointer:fine)").matches) {
      startBtn.href =
        "https://mail.google.com/mail/?view=cm&fs=1&to=firmannaza307@gmail.com&su=New%20project%20inquiry";
      startBtn.target = "_blank";
      startBtn.rel = "noopener noreferrer";
    }

    // -------------------------------------------------------------
    // 3. Intro animation & Hero Fly-away scroll animation
    // -------------------------------------------------------------
    const hero = heroRef.current;
    const root = document.documentElement;
    let introDone = !root.classList.contains("intro");
    const rot = [-9, 6, -4, 8, -6, 3];

    let flyTiles: HTMLElement[] = [];
    let eyebrows: HTMLElement[] = [];
    let fly: { dx: number; dy: number; dist: number; rot: number }[] = [];
    let flyTick = false;
    const flyOn = !window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    const measureFly = () => {
      if (!flyOn || !hero) return;
      const hr = hero.getBoundingClientRect();
      const title = hero.querySelector(".hero-title");
      if (!title) return;
      const t = title.getBoundingClientRect();
      const cx = t.left + t.width / 2 - hr.left;
      const cy = t.top + t.height / 2 - hr.top;
      const vw = hero.clientWidth;
      const vh = hero.clientHeight;
      const m = 80;

      fly = flyTiles.map((el, i) => {
        const prev = el.style.transform;
        el.style.transform = "none";
        const r = el.getBoundingClientRect();
        el.style.transform = prev;
        const x = r.left - hr.left;
        const y = r.top - hr.top;
        let dx = x + r.width / 2 - cx;
        let dy = y + r.height / 2 - cy;
        if (dy > 0) dy = 0;
        if (Math.abs(dx) < 20 && dy === 0) dx = i % 2 ? 1 : -1;
        const len = Math.hypot(dx, dy) || 1;
        dx /= len;
        dy /= len;

        const out: number[] = [];
        if (dx < -0.01) out.push((x + r.width + m) / -dx);
        if (dx > 0.01) out.push((vw - x + m) / dx);
        if (dy < -0.01) out.push((y + r.height + m) / -dy);
        return { dx, dy, dist: Math.min(...out, vh * 1.5), rot: rot[i] || 0 };
      });
    };

    const updateFly = () => {
      flyTick = false;
      if (!flyOn || !introDone || !fly.length || !hero) return;
      const range = hero.offsetHeight * 0.7;
      const p = Math.min(Math.max(-hero.getBoundingClientRect().top / range, 0), 1);
      const e = p * (0.35 + 0.65 * p);

      flyTiles.forEach((el, i) => {
        const f = fly[i];
        if (!f) return;
        el.style.transform =
          p === 0
            ? ""
            : `translate(${(f.dx * f.dist * e).toFixed(1)}px, ${(f.dy * f.dist * e).toFixed(1)}px) rotate(${(f.rot * 2 * e).toFixed(2)}deg)`;
      });

      eyebrows.forEach((el) => {
        el.style.opacity = Math.max(0, 1 - p * 2.5).toFixed(3);
      });
    };

    const onScrollFly = () => {
      if (!flyTick) {
        flyTick = true;
        requestAnimationFrame(updateFly);
      }
    };

    const finishIntro = (anims: Animation[]) => {
      if (introDone) return;
      introDone = true;
      root.classList.remove("intro");
      anims.forEach((a) => a.cancel());
      measureFly();
      updateFly();
    };

    if (hero) {
      flyTiles = Array.from(hero.querySelectorAll<HTMLElement>(".tile"));
      eyebrows = Array.from(hero.querySelectorAll<HTMLElement>(".eyebrow"));

      if (!introDone) {
        const title = hero.querySelector<HTMLElement>(".hero-title");
        if (title) {
          const t = title.getBoundingClientRect();
          const cx = t.left + t.width / 2;
          const cy = t.top + t.height / 2;
          const jit = [
            [-14, 6],
            [12, -8],
            [-6, -12],
            [10, 10],
            [-10, 12],
            [4, -4],
          ];
          const DEAL = 90;
          const APPEAR = 520;
          const HOLD = 260;
          const SPREAD = 1050;
          const FAN = 45;
          const spreadAt = (flyTiles.length - 1) * DEAL + APPEAR + HOLD;
          const anims: Animation[] = [];

          flyTiles.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const dx = cx - (r.left + r.width / 2) + (jit[i]?.[0] || 0);
            const dy = cy - (r.top + r.height / 2) + (jit[i]?.[1] || 0);
            const start = i * DEAL;
            const end = spreadAt + i * FAN + SPREAD;
            const dur = end - start;
            const stacked = `translate(${dx}px,${dy}px) rotate(${rot[i]}deg) scale(1.15)`;

            anims.push(
              el.animate(
                [
                  {
                    offset: 0,
                    opacity: 0,
                    transform: `translate(${dx}px,${dy + 48}px) rotate(${rot[i] * 1.6}deg) scale(.85)`,
                    easing: "cubic-bezier(.2,.7,.2,1)",
                  },
                  { offset: APPEAR / dur, opacity: 1, transform: stacked },
                  {
                    offset: (spreadAt + i * FAN - start) / dur,
                    opacity: 1,
                    transform: stacked,
                    easing: "cubic-bezier(.7,0,.15,1)",
                  },
                  { offset: 1, opacity: 1, transform: "translate(0,0) rotate(0deg) scale(1)" },
                ],
                { duration: dur, delay: start, fill: "both" }
              )
            );
          });

          const textAt = spreadAt + SPREAD * 0.55;
          hero.querySelectorAll<HTMLElement>(".hero-title span").forEach((el, i) => {
            anims.push(
              el.animate(
                [
                  { opacity: 0, transform: "translateY(32px)" },
                  { opacity: 1, transform: "none" },
                ],
                { duration: 750, delay: textAt + i * 90, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" }
              )
            );
          });

          hero.querySelectorAll<HTMLElement>(".hero-lines, .eyebrow").forEach((el) => {
            anims.push(
              el.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 800,
                delay: spreadAt,
                easing: "ease",
                fill: "both",
              })
            );
          });

          Promise.all(anims.map((a) => a.finished))
            .then(() => finishIntro(anims))
            .catch(() => finishIntro(anims));

          setTimeout(() => finishIntro(anims), 5500);
        }
      } else {
        measureFly();
        updateFly();
      }

      window.addEventListener("scroll", onScrollFly, { passive: true });
      window.addEventListener("resize", () => {
        measureFly();
        updateFly();
      });

      // Pointermove smooth parallax for hero tiles
      const fine = window.matchMedia("(pointer:fine)").matches;
      if (fine) {
        const onPointerMove = (e: PointerEvent) => {
          if (!introDone) return;
          const r = hero.getBoundingClientRect();
          hero.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
          hero.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
        };
        const onPointerLeave = () => {
          hero.style.setProperty("--mx", "0");
          hero.style.setProperty("--my", "0");
        };
        hero.addEventListener("pointermove", onPointerMove);
        hero.addEventListener("pointerleave", onPointerLeave);
      }
    }

    // -------------------------------------------------------------
    // 4. Reveal on scroll (IntersectionObserver)
    // -------------------------------------------------------------
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("in"));
    }

    // -------------------------------------------------------------
    // 5. Curved Arc Gallery (Parabolic formula & scroll boost)
    // -------------------------------------------------------------
    const arcTrack = arcTrackRef.current;
    let arcCancel: number | null = null;
    if (arcTrack) {
      const arcView = arcTrack.parentElement as HTMLElement;
      let arcCards: HTMLElement[] = [];
      let arcOffset = 0;
      let arcLast = 0;
      let arcOn = false;
      let arcBoost = 0;
      let arcStep = 0;
      let arcTotal = 0;
      let arcW = 0;
      let arcCurve = 0;
      let arcLastY = window.scrollY;
      const arcCalm = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      const ARC_GAP = 24;
      const ARC_SPEED = 40;

      const arcSetup = () => {
        arcTrack.querySelectorAll(".arc-clone").forEach((c) => c.remove());
        const originals = Array.from(arcTrack.children) as HTMLElement[];
        if (!originals.length) return;
        arcW = originals[0].offsetWidth || 300;
        arcStep = arcW + ARC_GAP;
        const need = arcView.clientWidth + arcStep * 2;
        let total = originals.length * arcStep;
        while (total < need) {
          originals.forEach((c) => {
            const k = c.cloneNode(true) as HTMLElement;
            k.classList.add("arc-clone");
            arcTrack.appendChild(k);
          });
          total += originals.length * arcStep;
        }
        arcCards = Array.from(arcTrack.children) as HTMLElement[];
        arcTotal = arcCards.length * arcStep;
        arcCurve = arcW * 0.42;
      };

      const arcRender = () => {
        const half = arcView.clientWidth / 2;
        const radius = Math.max(half, arcW * 1.6);
        for (let i = 0; i < arcCards.length; i++) {
          const x = (((i * arcStep + arcOffset) % arcTotal) + arcTotal) % arcTotal - arcStep;
          const u = (x + arcW / 2 - half) / radius;
          arcCards[i].style.transform = `translate3d(${x.toFixed(1)}px, ${(arcCurve * u * u).toFixed(
            1
          )}px, 0) rotate(${(u * 9).toFixed(2)}deg)`;
        }
      };

      const arcTick = (t: number) => {
        if (!arcOn) {
          arcLast = 0;
          return;
        }
        const dt = arcLast ? Math.min(t - arcLast, 64) / 1000 : 0;
        arcLast = t;
        arcOffset -= (ARC_SPEED + arcBoost) * dt;
        arcBoost *= 0.94;
        arcRender();
        arcCancel = requestAnimationFrame(arcTick);
      };

      arcSetup();
      arcRender();

      window.addEventListener("resize", () => {
        arcSetup();
        arcRender();
      });

      if (!arcCalm) {
        window.addEventListener(
          "scroll",
          () => {
            const y = window.scrollY;
            arcBoost = Math.min(500, arcBoost + Math.abs(y - arcLastY) * 3);
            arcLastY = y;
          },
          { passive: true }
        );

        if ("IntersectionObserver" in window) {
          new IntersectionObserver((entries) => {
            const vis = entries[0].isIntersecting;
            if (vis && !arcOn) {
              arcOn = true;
              requestAnimationFrame(arcTick);
            } else if (!vis) {
              arcOn = false;
            }
          }).observe(arcView);
        } else {
          arcOn = true;
          requestAnimationFrame(arcTick);
        }
      }
    }

    // -------------------------------------------------------------
    // 6. Stacking Animation: About -> Services
    // -------------------------------------------------------------
    const stack = stackRef.current;
    if (stack) {
      const about = stack.querySelector<HTMLElement>(".about");
      const services = stack.querySelector<HTMLElement>(".services");
      let stackTick = false;

      const setStick = () => {
        if (!about) return;
        const t = Math.min(0, window.innerHeight - about.offsetHeight);
        about.style.setProperty("--stick", `${t}px`);
        about.style.setProperty("--origin", `${window.innerHeight / 2 - t}px`);
      };

      const updateStack = () => {
        stackTick = false;
        if (!about || !services) return;
        const p = 1 - services.getBoundingClientRect().top / window.innerHeight;
        about.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
      };

      setStick();
      updateStack();
      window.addEventListener("resize", () => {
        setStick();
        updateStack();
      });
      window.addEventListener(
        "scroll",
        () => {
          if (!stackTick) {
            stackTick = true;
            requestAnimationFrame(updateStack);
          }
        },
        { passive: true }
      );
    }

    return () => {
      window.removeEventListener("scroll", onScrollNav);
      if (arcCancel) cancelAnimationFrame(arcCancel);
    };
  }, []);

  const handleCopy = () => {
    const email = "firmannaza307@gmail.com";
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done, () => {
        window.location.href = `mailto:${email}`;
      });
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      {/* -------------------- HEADER / NAV -------------------- */}
      <header className="nav" id="nav" ref={navRef}>
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
            href="https://portofolionaza.steamcraft.online"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>SteamCraft</span>
            <ArrowUpRight size={15} />
          </a>
          <button
            className="nav-burger"
            id="navBurger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Panel */}
      <div className={`nav-mobile-panel ${mobileMenuOpen ? "open" : ""}`} id="navPanel">
        <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        <hr />
        <a
          className="btn-primary"
          href="https://portofolionaza.steamcraft.online"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span>SteamCraft Ecosystem</span>
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

          <div className="tiles">
            {/* Tile 1 */}
            <div className="tile t1">
              <div className="ph ph-1">
                <span>01 / This Me UI</span>
                <strong>BISINDO Mobile App</strong>
              </div>
            </div>

            {/* Tile 2 */}
            <div className="tile t2">
              <div className="ph ph-2">
                <span>02 / SteamSim Lab</span>
                <strong>Interactive 3D Sim</strong>
              </div>
            </div>

            {/* Tile 3 */}
            <div className="tile t3">
              <div className="ph ph-3">
                <span>03 / DIMAS TI 2025</span>
                <strong>Medali Perak UI/UX</strong>
              </div>
            </div>

            {/* Tile 4 */}
            <div className="tile t4">
              <div className="ph ph-4">
                <span>04 / GEMASTIK XVIII</span>
                <strong>Finalis UX Design</strong>
              </div>
            </div>

            {/* Tile 5 */}
            <div className="tile t5">
              <div className="ph ph-5">
                <span>05 / A-KERE</span>
                <strong>Smart Finance Flow</strong>
              </div>
            </div>

            {/* Tile 6 */}
            <div className="tile t6">
              <div className="ph ph-6">
                <span>06 / UNESA Sains Data</span>
                <strong>GPA 3.80 / 4.00</strong>
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

        {/* -------------------- SELECTED WORKS (3D MOUSE TRACKING) -------------------- */}
        <section className="section work" id="work">
          <div className="container wide">
            <div className="display-head reveal">
              <h2 className="display-title">
                Selected works<sup className="display-count">(04)</sup>
              </h2>
              <div className="display-sub-row">
                <p className="display-sub">2024 – 2026</p>
                <div className="clients">
                  <div className="flag-stack" role="list" aria-label="Achievements and credentials">
                    <span className="flag" role="listitem" style={{ "--i": 0 } as React.CSSProperties} data-name="Medali Perak DIMAS TI">
                      🥈
                    </span>
                    <span className="flag" role="listitem" style={{ "--i": 1 } as React.CSSProperties} data-name="Finalis GEMASTIK XVIII">
                      🏆
                    </span>
                    <span className="flag" role="listitem" style={{ "--i": 2 } as React.CSSProperties} data-name="UNESA Sains Data GPA 3.80">
                      🎓
                    </span>
                    <span className="flag" role="listitem" style={{ "--i": 3 } as React.CSSProperties} data-name="PUSPRESNAS OSN 2x">
                      🏅
                    </span>
                  </div>
                  <p className="clients-caption">
                    <strong>National UI/UX Recognition</strong>
                    <span>Validated by design competitions</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="works-list">
              {/* Project 01: This Me */}
              <div className="reveal" id="project-01">
                <Card3D maxTilt={7}>
                  <article className="work-row">
                    <div className="work-info">
                      <h3>This Me</h3>
                      <p className="work-tags">Product design · Inclusive App Design</p>
                      <p className="work-desc">
                        An interactive Indonesian Sign Language (BISINDO) learning app featuring 30+ Figma
                        interfaces, gamified camera recognition, and inclusive UX for the Deaf community.
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
                      <ShotCard3D>
                        <div className="ph ph-1">
                          <span>01 / Onboarding Flow</span>
                          <strong>Gesture Gamification</strong>
                        </div>
                      </ShotCard3D>
                      <ShotCard3D>
                        <div className="ph ph-alt-a">
                          <span>02 / Design System</span>
                          <strong>Figma Auto-Layout &amp; Tokens</strong>
                        </div>
                      </ShotCard3D>
                      <ShotCard3D>
                        <div className="ph ph-alt-b">
                          <span>03 / Usability Study</span>
                          <strong>SUS Score 92.5 (Silver Medal)</strong>
                        </div>
                      </ShotCard3D>
                    </div>
                  </article>
                </Card3D>
              </div>

              {/* Project 02: SteamCraft */}
              <div className="reveal" id="project-02">
                <Card3D maxTilt={7}>
                  <article className="work-row">
                    <div className="work-info">
                      <h3>SteamCraft Ecosystem</h3>
                      <p className="work-tags">Product design · 3D Simulation &amp; Web App</p>
                      <p className="work-desc">
                        An interactive science simulation lab (SteamSim) and generative 3D modeling canvas
                        (MakerCraft 3D) engineered with complex parameter workbench controls.
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
                      <ShotCard3D>
                        <div className="ph ph-2">
                          <span>01 / SteamSim Lab</span>
                          <strong>Physics &amp; Chemistry Studio</strong>
                        </div>
                      </ShotCard3D>
                      <ShotCard3D>
                        <div className="ph ph-alt-a">
                          <span>02 / MakerCraft 3D</span>
                          <strong>Generative Math 3D Canvas</strong>
                        </div>
                      </ShotCard3D>
                      <ShotCard3D>
                        <div className="ph ph-alt-b">
                          <span>03 / Ecosystem</span>
                          <strong>Multi-Subdomain Architecture</strong>
                        </div>
                      </ShotCard3D>
                    </div>
                  </article>
                </Card3D>
              </div>

              {/* Project 03: A-KERE */}
              <div className="reveal" id="project-03">
                <Card3D maxTilt={7}>
                  <article className="work-row">
                    <div className="work-info">
                      <h3>A-KERE</h3>
                      <p className="work-tags">App design · Fintech Mobile UX</p>
                      <p className="work-desc">
                        A streamlined personal budgeting application that cuts transaction logging steps by
                        50% through rapid-input flow and visual cash flow distribution.
                      </p>
                      <a className="btn-secondary" href="#contact">
                        View case study <ArrowRight size={15} />
                      </a>
                    </div>
                    <div className="work-shots">
                      <ShotCard3D>
                        <div className="ph ph-3">
                          <span>01 / Fast Transaction</span>
                          <strong>3-Second Input Flow</strong>
                        </div>
                      </ShotCard3D>
                      <ShotCard3D>
                        <div className="ph ph-alt-a">
                          <span>02 / Budget Envelopes</span>
                          <strong>Real-Time Cash Analytics</strong>
                        </div>
                      </ShotCard3D>
                      <ShotCard3D>
                        <div className="ph ph-alt-b">
                          <span>03 / Usability Test</span>
                          <strong>50% Time Saved</strong>
                        </div>
                      </ShotCard3D>
                    </div>
                  </article>
                </Card3D>
              </div>

              {/* Project 04: Naza Cell POS */}
              <div className="reveal" id="project-04">
                <Card3D maxTilt={7}>
                  <article className="work-row">
                    <div className="work-info">
                      <h3>Naza Cell POS</h3>
                      <p className="work-tags">Product design · Enterprise Retail System</p>
                      <p className="work-desc">
                        High-efficiency cashier POS interface and multi-supplier inventory management platform
                        handling 100+ SKUs and continuous daily financial transactions.
                      </p>
                      <a className="btn-secondary" href="#contact">
                        View system <ArrowRight size={15} />
                      </a>
                    </div>
                    <div className="work-shots">
                      <ShotCard3D>
                        <div className="ph ph-4">
                          <span>01 / Cashier POS</span>
                          <strong>Keyboard-Driven Checkout</strong>
                        </div>
                      </ShotCard3D>
                      <ShotCard3D>
                        <div className="ph ph-alt-a">
                          <span>02 / Inventory Matrix</span>
                          <strong>100+ SKU Tracking</strong>
                        </div>
                      </ShotCard3D>
                      <ShotCard3D>
                        <div className="ph ph-alt-b">
                          <span>03 / Operations</span>
                          <strong>50-80 Daily Transactions</strong>
                        </div>
                      </ShotCard3D>
                    </div>
                  </article>
                </Card3D>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------- CURVED ARC GALLERY -------------------- */}
        <section className="arc" aria-label="More explorations">
          <div className="container wide arc-head reveal">
            <h3>More explorations</h3>
            <p>Concepts, side projects, and data science experiments.</p>
          </div>

          <div className="arc-viewport" aria-hidden="true">
            <div className="arc-track" id="arcTrack" ref={arcTrackRef}>
              <div className="arc-card">
                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)" }}>THIS ME UI</span>
                <strong>Gesture Gamification App</strong>
                <span style={{ fontSize: "12px", color: "var(--neutral-500)" }}>30+ Figma Interfaces</span>
              </div>
              <div className="arc-card">
                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)" }}>STEAMSIM LAB</span>
                <strong>Virtual Science Simulation</strong>
                <span style={{ fontSize: "12px", color: "var(--neutral-500)" }}>sim.steamcraft.online</span>
              </div>
              <div className="arc-card">
                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)" }}>MAKERCRAFT 3D</span>
                <strong>Parametric 3D Art Studio</strong>
                <span style={{ fontSize: "12px", color: "var(--neutral-500)" }}>maker.steamcraft.online</span>
              </div>
              <div className="arc-card">
                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)" }}>A-KERE FINANCE</span>
                <strong>Frictionless Expense Logging</strong>
                <span style={{ fontSize: "12px", color: "var(--neutral-500)" }}>Mobile Prototyping</span>
              </div>
              <div className="arc-card">
                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)" }}>CYBERBULLYING NLP</span>
                <strong>93% Accuracy Model</strong>
                <span style={{ fontSize: "12px", color: "var(--neutral-500)" }}>3,000+ Text Datasets</span>
              </div>
              <div className="arc-card">
                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)" }}>SPATIAL DENGUE GWR</span>
                <strong>East Java Geodata Science</strong>
                <span style={{ fontSize: "12px", color: "var(--neutral-500)" }}>Geographic Regression</span>
              </div>
            </div>
          </div>

          <div className="arc-cta reveal">
            <div className="arc-cta-text">
              <div>
                <strong>Like what you see?</strong>
                <span>Open for new UI/UX projects &middot; Let&rsquo;s build something together</span>
              </div>
            </div>
            <div className="arc-cta-btns">
              <a className="btn-primary" href="#contact">
                Contact me <ArrowRight size={15} />
              </a>
              <a
                className="btn-secondary"
                href="mailto:firmannaza307@gmail.com?subject=CV%20Request"
              >
                Request CV <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* -------------------- STACKING (ABOUT + SERVICES) -------------------- */}
        <div className="stack" ref={stackRef}>
          <section className="about" id="about">
            <div className="meet">
              <figure className="meet-photo">
                <p className="meet-tag" aria-hidden="true">
                  <span>[Naza</span>
                  <span>Firmansyah]</span>
                </p>
                <div className="meet-roles">
                  <p>
                    Product designer
                    <br />
                    UI/UX researcher
                    <br />
                    Data science student
                    <br />
                    System architect
                  </p>
                </div>
              </figure>

              <div className="meet-panel">
                <div className="meet-content">
                  <h2 className="meet-title reveal" style={{ "--rd": "80ms" } as React.CSSProperties}>
                    <span>Meet</span>
                    <span>Naza Firmansyah</span>
                  </h2>
                  <p className="meet-role reveal" style={{ "--rd": "140ms" } as React.CSSProperties}>
                    <strong>Product designer &amp; Data Science student</strong>
                    <span>/ Strategy &times; Design &times; Data &times; Development</span>
                  </p>
                  <blockquote className="meet-quote reveal" style={{ "--rd": "200ms" } as React.CSSProperties}>
                    <p className="meet-lead">
                      I turn complex data and user needs into intuitive digital products.
                    </p>
                    <p>
                      Sebagai mahasiswa Sains Data di Universitas Negeri Surabaya (IPK 3.80), saya bekerja
                      pada persimpangan antara logika analitik data kuantitatif dan empati desain manusia &mdash;
                      mentransformasi gagasan awal menjadi antarmuka intuitif dan produk yang terukur.
                    </p>
                    <p>
                      Di luar desain estetis, saya memanfaatkan analisis perilaku pengguna dan metodologi riset
                      (SUS Benchmarking) untuk memvalidasi bahwa setiap keputusan desain terbukti efektif.
                    </p>
                  </blockquote>
                  <ul className="meet-skills reveal" style={{ "--rd": "260ms" } as React.CSSProperties}>
                    <li>
                      <span className="skill-art">🎯</span>
                      <span>Strategy</span>
                    </li>
                    <li>
                      <span className="skill-art">🎨</span>
                      <span>Design</span>
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

          <section className="section services" id="services">
            <div className="container wide">
              <div className="display-head reveal">
                <h2 className="display-title">
                  Services<sup className="display-count">(06)</sup>
                </h2>
              </div>

              <div className="service-list">
                <a className="service-row reveal" href="#contact">
                  <span className="service-num">(01)</span>
                  <h3 className="service-name">Product strategy</h3>
                  <p className="service-desc">
                    Turning business goals and user behaviors into clear product roadmaps through user interviews, empathy mapping, and information architecture.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact" style={{ "--rd": "80ms" } as React.CSSProperties}>
                  <span className="service-num">(02)</span>
                  <h3 className="service-name">UI/UX &amp; product design</h3>
                  <p className="service-desc">
                    Designing seamless digital experiences through user journeys, wireframes, high-fidelity interfaces, and interactive prototypes.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact" style={{ "--rd": "160ms" } as React.CSSProperties}>
                  <span className="service-num">(03)</span>
                  <h3 className="service-name">Web &amp; dashboard design</h3>
                  <p className="service-desc">
                    Creating modern, responsive websites, retail POS dashboards, and data visualization tools balancing visual clarity with dense information.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact">
                  <span className="service-num">(04)</span>
                  <h3 className="service-name">App design</h3>
                  <p className="service-desc">
                    Crafting user-friendly mobile applications with thoughtful micro-interactions, WCAG accessibility, and frictionless checkout flows.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact" style={{ "--rd": "80ms" } as React.CSSProperties}>
                  <span className="service-num">(05)</span>
                  <h3 className="service-name">Design systems</h3>
                  <p className="service-desc">
                    Building scalable Figma token architectures, reusable component variants, and consistent visual guidelines that accelerate development.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact" style={{ "--rd": "160ms" } as React.CSSProperties}>
                  <span className="service-num">(06)</span>
                  <h3 className="service-name">Data &amp; usability evaluation</h3>
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
            <div className="cta-panel reveal">
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
                  ref={startProjectRef}
                  href="mailto:firmannaza307@gmail.com?subject=New%20project%20inquiry"
                >
                  Start a project <ArrowRight size={16} />
                </a>
                <button
                  className={`btn-secondary ${copied ? "copied" : ""}`}
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
                    <a href="https://linkedin.com/in/nazafirman" target="_blank" rel="noopener noreferrer">
                      LinkedIn <ArrowUpRight size={12} />
                    </a>
                    <a href="https://github.com/nazaa-arch" target="_blank" rel="noopener noreferrer">
                      GitHub <ArrowUpRight size={12} />
                    </a>
                    <a href="https://wa.me/6285236019625" target="_blank" rel="noopener noreferrer">
                      WhatsApp <ArrowUpRight size={12} />
                    </a>
                    <a
                      href="https://portofolionaza.steamcraft.online"
                      target="_blank"
                      rel="noopener noreferrer"
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
