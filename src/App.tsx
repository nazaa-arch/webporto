import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import ProjectDetail, { projectHref } from "./ProjectDetail";
import { findProject } from "./projects";
import { PromoTile, thisMePromos } from "./MobileMock";
import { WebPromoTile, webPromos } from "./WebPromo";
import { KelarifyTile } from "./KelarifyPromo";

/* -------------------------------------------------------------------------- */
/*                      STEAMCRAFT + ECOSYSTEM APPS (REAL SCREENSHOTS)                    */
/* -------------------------------------------------------------------------- */

const steamcraftProjects: {
  id: string;
  sub: string;
  slug: string;
  folder: string;
  domain: string;
  name: string;
  tags: string;
  desc: string;
  cta: string;
  shots: [string, string, string];
}[] = [
  {
    id: "project-hub",
    sub: "hub",
    slug: "steamcraft-hub",
    folder: "hub",
    domain: "steamcraft.online",
    name: "STEAM Team Hub",
    tags: "Brand & web design · Team Research Portal",
    desc: "The official hub of a three-person multidisciplinary research team: visual identity, member profiles and a gateway to the team's projects, from the SteamCraft platform prototype to IoT and biotech projects in development.",
    cta: "Visit the hub",
    shots: ["Research Team Members", "Team Projects Gateway", "Research Pillars & Ecosystem"],
  },
  {
    id: "project-02",
    sub: "app",
    slug: "steamcraft",
    folder: "app",
    domain: "app.steamcraft.online",
    name: "SteamCraft Ecosystem",
    tags: "Product design · Research Collaboration Platform",
    desc: "A multidisciplinary research workspace for students and lecturers: five scientific checkpoints, research logbooks with PDF export, empirical data repositories and a five-axis STEAM competency radar.",
    cta: "View platform",
    shots: ["Workspace Sign-in", "Research Dashboard", "STEAM Competency Radar"],
  },
  {
    id: "project-sim",
    sub: "sim",
    slug: "sim",
    folder: "sim",
    domain: "sim.steamcraft.online",
    name: "SteamSim Lab",
    tags: "Interactive simulation · Physics, Chemistry & Math",
    desc: "A virtual science studio with projectile motion under air drag, acid-base titration and a chaotic double pendulum, plus sensor-noise data export to CSV.",
    cta: "Open the lab",
    shots: ["Projectile Motion", "Titration pH Curve", "Chaos Pendulum"],
  },
  {
    id: "project-maker",
    sub: "maker",
    slug: "maker",
    folder: "maker",
    domain: "maker.steamcraft.online",
    name: "MakerCraft 3D",
    tags: "Generative art · WebGL Parametric Studio",
    desc: "A mathematical art studio that renders parametric surfaces in real time, with tunable equations, material themes and 3D-print-ready OBJ export.",
    cta: "Open the studio",
    shots: ["Torus Knot · Cyberpunk", "Hologram Material", "Emerald Matrix Material"],
  },
  {
    id: "project-verilab",
    sub: "verilab",
    slug: "verilab",
    folder: "verilab",
    domain: "verilab.steamcraft.online",
    name: "VeriLab AI",
    tags: "AI research tool · Scientific Reproducibility",
    desc: "A metrology and reproducibility engine: sensor calibration with Gaussian Process Regression, paper-claim replication and Monte Carlo & Sobol sensitivity analysis.",
    cta: "Open VeriLab",
    shots: ["Calibration & GPR", "Replicability Check", "Monte Carlo & Sobol"],
  },
  {
    id: "project-scholar",
    sub: "scholar",
    slug: "scholar",
    folder: "scholar",
    domain: "scholar.steamcraft.online",
    name: "PaperCraft AI",
    tags: "AI writing assistant · Academic UX",
    desc: "An academic manuscript assistant that scores IMRaD structure against Scopus Q1/Q2 targets, with section word budgets, statistics checks and an AI audit.",
    cta: "Open PaperCraft",
    shots: ["IMRaD Manuscript Score", "Statistics Check", "AI Manuscript Audit"],
  },
  {
    id: "project-geo",
    sub: "geo",
    slug: "geo",
    folder: "geo",
    domain: "geo.steamcraft.online",
    name: "SteamGeo Intelligence",
    tags: "Data visualisation · Spatial GIS Dashboard",
    desc: "A dengue early-warning dashboard for 38 East Java regions, combining geographically weighted regression (GWR), LISA clusters and rainfall layers.",
    cta: "Open the map",
    shots: ["Dengue Incidence Map", "LISA Clusters", "Rainfall Layer"],
  },
  {
    id: "project-arena",
    sub: "arena",
    slug: "arena",
    folder: "arena",
    domain: "arena.steamcraft.online",
    name: "SteamArena",
    tags: "Product design · Innovation Competition Platform",
    desc: "A national STEAM hackathon arena with a project leaderboard, five-axis STEAM radar scoring and structured peer review.",
    cta: "Open the arena",
    shots: ["Project Leaderboard", "Peer-Review Scoring", "Category Filter"],
  },
];

/* -------------------------------------------------------------------------- */
/*                        MORE EXPLORATIONS (SIDE PROJECTS)                   */
/* -------------------------------------------------------------------------- */

const explorations = [
  { label: "This Me UI", title: "Gesture Gamification App", meta: "30+ Figma interfaces", tone: "blue" },
  { label: "SteamSim Lab", title: "Virtual Science Simulation", meta: "sim.steamcraft.online", tone: "teal" },
  { label: "MakerCraft 3D", title: "Parametric 3D Art Studio", meta: "maker.steamcraft.online", tone: "pink" },
  { label: "A-KERE Finance", title: "Frictionless Expense Logging", meta: "Mobile prototyping", tone: "amber" },
  { label: "Cyberbullying NLP", title: ">88% Accuracy, 7 Classes", meta: "1,100+ posts from Instagram & X", tone: "indigo" },
  { label: "Spatial Dengue GWR", title: "East Java Geodata Science", meta: "Geographic regression", tone: "green" },
];

/* -------------------------------------------------------------------------- */
/*                      3D INTERACTIVE CARD CONTAINER                         */
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

function Home({ onOpen }: { onOpen: (slug: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // a project card opens its case study; real links/buttons inside keep their own job
  const cardClick = (slug: string) => (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    onOpen(slug);
  };
  const titleLink = (slug: string, name: string) => (
    <a
      className="work-title-link"
      href={projectHref(slug)}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        onOpen(slug);
      }}
    >
      {name}
    </a>
  );

  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const startProjectRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<SVGSVGElement>(null);
  const selRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------
  // Hero signature: Figma-style prototype links from the title to
  // each tile, a selection frame, and a "Naza" collaborator cursor
  // that hops between tiles once the intro has finished.
  // -------------------------------------------------------------
  useEffect(() => {
    const hero = heroRef.current;
    const svg = linksRef.current;
    const sel = selRef.current;
    const cur = cursorRef.current;
    if (!hero || !svg || !sel || !cur) return;

    const root = document.documentElement;
    const desk = window.matchMedia("(min-width: 760px)");
    const calm = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const title = hero.querySelector<HTMLElement>(".hero-title");
    const tiles = Array.from(hero.querySelectorAll<HTMLElement>(".tile"));
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path.link"));
    const sizeLabel = sel.querySelector<HTMLElement>(".sel-size");
    if (!title) return;

    let ready = false;
    let alive = true;
    let raf = 0;
    let hopTimer = 0;
    let selectTimer = 0;
    let selected: HTMLElement | null = null;
    let hovered: HTMLElement | null = null;
    let last = -1;

    const textBox = () => {
      const range = document.createRange();
      range.selectNodeContents(title);
      return range.getBoundingClientRect();
    };

    const draw = () => {
      if (!ready || !desk.matches) return;
      const hr = hero.getBoundingClientRect();
      const t = textBox();

      // fade the whole layer out as the hero scrolls away
      const p = Math.min(Math.max(-hr.top / (hero.offsetHeight * 0.3), 0), 1);
      hero.style.setProperty("--links-fade", (1 - p).toFixed(3));

      tiles.forEach((tile, i) => {
        const r = tile.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const gapX = cx < t.left ? t.left - r.right : cx > t.right ? r.left - t.right : -1;
        const gapY = cy < t.top ? t.top - r.bottom : cy > t.bottom ? r.top - t.bottom : -1;
        const inY = cy >= t.top && cy <= t.bottom;
        const inX = cx >= t.left && cx <= t.right;
        const horizontal = inY || (!inX && gapX >= gapY);
        const path = paths[i];
        // a tile sitting on the text has no room for a link: hide it
        if (path) path.style.display = (horizontal ? gapX : gapY) < 36 ? "none" : "";
        let d: string;
        if (horizontal) {
          const left = cx < t.left;
          const sx = (left ? t.left - 12 : t.right + 12) - hr.left;
          const sy = Math.min(Math.max(cy, t.top + 16), t.bottom - 16) - hr.top;
          const ex = (left ? r.right + 10 : r.left - 10) - hr.left;
          const ey = cy - hr.top;
          const mx = (sx + ex) / 2;
          d = `M${sx.toFixed(1)} ${sy.toFixed(1)} C${mx.toFixed(1)} ${sy.toFixed(1)} ${mx.toFixed(1)} ${ey.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
        } else {
          const above = cy < t.top;
          const sx = Math.min(Math.max(cx, t.left + 16), t.right - 16) - hr.left;
          const sy = (above ? t.top - 10 : t.bottom + 10) - hr.top;
          const ex = cx - hr.left;
          const ey = (above ? r.bottom + 10 : r.top - 10) - hr.top;
          const my = (sy + ey) / 2;
          d = `M${sx.toFixed(1)} ${sy.toFixed(1)} C${sx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
        }
        if (path) {
          path.setAttribute("d", d);
          path.classList.toggle("active", tile === (hovered || selected));
        }
      });

      const target = hovered || selected;
      if (target) {
        const r = target.getBoundingClientRect();
        sel.style.transform = `translate(${(r.left - hr.left).toFixed(1)}px, ${(r.top - hr.top).toFixed(1)}px)`;
        sel.style.width = `${r.width.toFixed(1)}px`;
        sel.style.height = `${r.height.toFixed(1)}px`;
        if (sizeLabel) sizeLabel.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
        sel.classList.add("on");
      } else {
        sel.classList.remove("on");
      }
    };

    // keep lines glued to tiles while they parallax or fly away
    let visible = true;
    const loop = () => {
      draw();
      raf = visible && alive ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf && ready) raf = requestAnimationFrame(loop);
    });
    io.observe(hero);

    const hop = () => {
      if (!alive) return;
      const heroGone = window.scrollY > hero.offsetHeight * 0.25;
      if (!desk.matches || heroGone || hovered) {
        cur.classList.toggle("on", !heroGone && desk.matches);
        hopTimer = window.setTimeout(hop, 1200);
        return;
      }
      let i = Math.floor(Math.random() * tiles.length);
      if (i === last) i = (i + 1) % tiles.length;
      last = i;
      const hr = hero.getBoundingClientRect();
      const r = tiles[i].getBoundingClientRect();
      const x = r.left - hr.left + r.width * 0.62;
      const y = r.top - hr.top + r.height * 0.58;
      cur.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      cur.classList.add("on");
      selected = null;
      selectTimer = window.setTimeout(() => {
        selected = tiles[i];
        cur.classList.add("click");
        window.setTimeout(() => cur.classList.remove("click"), 220);
      }, 950);
      hopTimer = window.setTimeout(hop, 3000);
    };

    const start = () => {
      if (ready || !alive) return;
      ready = true;
      draw();
      // next frame so the draw-on transition runs from an empty line
      requestAnimationFrame(() => svg.classList.add("on"));
      if (!raf) raf = requestAnimationFrame(loop);
      if (!calm) hopTimer = window.setTimeout(hop, 1100);
    };

    const mo = new MutationObserver(() => {
      if (!root.classList.contains("intro")) start();
    });
    if (root.classList.contains("intro")) {
      mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    } else {
      start();
    }

    const enter = (e: Event) => {
      hovered = e.currentTarget as HTMLElement;
    };
    const leave = () => {
      hovered = null;
    };
    tiles.forEach((t) => {
      t.addEventListener("pointerenter", enter);
      t.addEventListener("pointerleave", leave);
    });

    return () => {
      alive = false;
      mo.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(hopTimer);
      clearTimeout(selectTimer);
      tiles.forEach((t) => {
        t.removeEventListener("pointerenter", enter);
        t.removeEventListener("pointerleave", leave);
      });
      svg.classList.remove("on");
    };
  }, []);

  useEffect(() => {
    // every window/hero listener below is removed on unmount (route change)
    const ac = new AbortController();
    const signal = ac.signal;
    // -------------------------------------------------------------
    // 1. Nav scrolled toggle
    // -------------------------------------------------------------
    const nav = navRef.current;
    const onScrollNav = () => {
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 24);
      }
    };
    window.addEventListener("scroll", onScrollNav, { passive: true, signal });
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
    let disposed = false;
    let introAnims: Animation[] = [];
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
      if (introDone || disposed) return;
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
        // React StrictMode runs this effect twice in dev: clear any leftover
        // intro animation so tiles are measured at their real resting spot.
        hero.getAnimations({ subtree: true }).forEach((a) => a.cancel());
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
          introAnims = anims;

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

      window.addEventListener("scroll", onScrollFly, { passive: true, signal });
      window.addEventListener("resize", () => {
        measureFly();
        updateFly();
      }, { signal });

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
        hero.addEventListener("pointermove", onPointerMove, { signal });
        hero.addEventListener("pointerleave", onPointerLeave, { signal });
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

    return () => {
      disposed = true;
      ac.abort();
      introAnims.forEach((a) => a.cancel());
      window.removeEventListener("scroll", onScrollNav);
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

          {/* Figma-style prototype links (drawn by JS after the intro) */}
          <svg className="hero-links" ref={linksRef} aria-hidden="true">
            <defs>
              <marker id="lk-dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7">
                <circle cx="5" cy="5" r="3.5" fill="#fff" stroke="currentColor" strokeWidth="2" />
              </marker>
              <marker
                id="lk-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path
                  d="M2 1.5 L8 5 L2 8.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                className="link"
                pathLength={1}
                markerStart="url(#lk-dot)"
                markerEnd="url(#lk-arrow)"
                style={{ "--i": i } as React.CSSProperties}
              />
            ))}
          </svg>

          <div className="sel-box" ref={selRef} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <span className="sel-size" />
          </div>

          <div className="collab-cursor" ref={cursorRef} aria-hidden="true">
            <svg viewBox="0 0 16 20" width="16" height="20">
              <path d="M1.5 1.5 L1.5 16 L5.4 12.3 L8.2 18.6 L10.9 17.4 L8.2 11.3 L13.6 11.3 Z" />
            </svg>
            <span>Naza</span>
          </div>

          <div className="tiles">
            {/* Tile 1 */}
            <div className="tile t1">
              <PromoTile promo={thisMePromos[0]} />
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
                <span>04 / NLP Research</span>
                <strong>2 Manuscripts in Prep</strong>
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
                <strong>Data Science, 2024&ndash;now</strong>
              </div>
            </div>
          </div>

          <h1 className="hero-title">
            <span>Designing products</span>
            <span>that make data</span>
            <span>feel human.</span>
          </h1>

          <p className="eyebrow left">
            Naza Firmansyah
            <br />
            UI/UX Designer
            <br />
            &amp; Data Science
          </p>
          <p className="eyebrow right">
            Surabaya
            <br />
            Indonesia
            <br />
            2024&ndash;2026
          </p>
        </section>

        {/* -------------------- SELECTED WORKS (3D MOUSE TRACKING) -------------------- */}
        <section className="section work" id="work">
          <div className="container wide">
            <div className="display-head reveal">
              <h2 className="display-title">
                Selected works <span className="count-pill">12 projects</span>
              </h2>
              <div className="display-sub-row">
                <p className="display-sub">2024 – 2026</p>
                <div className="clients">
                  <div className="flag-stack" role="list" aria-label="Achievements and credentials">
                    <span className="flag" role="listitem" style={{ "--i": 0 } as React.CSSProperties} data-name="Medali Perak DIMAS TI">
                      🥈
                    </span>
                    <span className="flag" role="listitem" style={{ "--i": 1 } as React.CSSProperties} data-name="UNESA Sains Data">
                      🎓
                    </span>
                    <span className="flag" role="listitem" style={{ "--i": 2 } as React.CSSProperties} data-name="PUSPRESNAS OSN 2x">
                      🏅
                    </span>
                  </div>
                  <p className="clients-caption">
                    <strong>National Silver Medal</strong>
                    <span>DIMAS TI 2025 &middot; UI/UX</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="works-list">
              {/* Project 01: This Me */}
              <div className="reveal work-card-link" id="project-01" data-project="this-me" onClick={cardClick("this-me")}>
                <Card3D maxTilt={7}>
                  <article className="work-row">
                    <div className="work-info">
                      <h3>{titleLink("this-me", "This Me")}</h3>
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
                      {thisMePromos.map((promo) => (
                        <ShotCard3D key={promo.title} className="shot-promo">
                          <PromoTile promo={promo} />
                        </ShotCard3D>
                      ))}
                    </div>
                  </article>
                </Card3D>
              </div>

              {/* Kelarify: brand mascot & identity (design only, no service link) */}
              <div className="reveal work-card-link" id="project-kelarify" data-project="kelarify" onClick={cardClick("kelarify")}>
                <Card3D maxTilt={7}>
                  <article className="work-row">
                    <div className="work-info">
                      <h3>{titleLink("kelarify", "Kelarify")}</h3>
                      <p className="work-tags">Client project · UI/UX &amp; Web Design</p>
                      <p className="work-desc">
                        Contracted as UI/UX and web designer for Kelarify: the website&rsquo;s look and flow,
                        built around an animated owl mascot and a deep-teal, warm-gold and green palette.
                      </p>
                      <a
                        className="btn-secondary"
                        href={projectHref("kelarify")}
                        onClick={(e) => {
                          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                          e.preventDefault();
                          onOpen("kelarify");
                        }}
                      >
                        View case study <ArrowRight size={15} />
                      </a>
                    </div>
                    <div className="work-shots">
                      {[0, 1, 2].map((i) => (
                        <ShotCard3D key={i} className="shot-promo">
                          <KelarifyTile index={i} />
                        </ShotCard3D>
                      ))}
                    </div>
                  </article>
                </Card3D>
              </div>

              {/* Project 02: SteamCraft + its six ecosystem apps (real screenshots) */}
              {steamcraftProjects.map((proj) => (
                <div
                  className="reveal work-card-link"
                  id={proj.id}
                  key={proj.slug}
                  data-project={proj.slug}
                  onClick={cardClick(proj.slug)}
                >
                  <Card3D maxTilt={7}>
                    <article className="work-row">
                      <div className="work-info">
                        <h3>{titleLink(proj.slug, proj.name)}</h3>
                        <p className="work-tags">{proj.tags}</p>
                        <p className="work-desc">{proj.desc}</p>
                        <p className="eco-count">
                          <span className={`eco-dot ${proj.sub === "hub" ? "" : "proto"}`} aria-hidden="true" />
                          {proj.domain}
                          {proj.sub !== "hub" && <> &middot; Prototype</>}
                          {!["app", "hub"].includes(proj.sub) && <> &middot; SteamCraft Ecosystem</>}
                        </p>
                        <a
                          className="btn-secondary"
                          href={`https://${proj.domain}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {proj.cta} <ArrowRight size={15} />
                        </a>
                      </div>
                      <div className="work-shots">
                        {webPromos[proj.slug]
                          ? [0, 1, 2].map((i) => (
                              <ShotCard3D key={i} className="shot-promo">
                                <WebPromoTile set={webPromos[proj.slug]} index={i} />
                              </ShotCard3D>
                            ))
                          : proj.shots.map((label, i) => (
                          <ShotCard3D key={label} className="shot-media">
                            <img
                              className="shot-img"
                              src={`${import.meta.env.BASE_URL}work/${proj.folder}/${i + 1}.jpg`}
                              alt={`${proj.name}: ${label}`}
                              loading="lazy"
                              decoding="async"
                            />
                            <span className="shot-tag">
                              <span>0{i + 1}</span>
                              <strong>{label}</strong>
                            </span>
                          </ShotCard3D>
                        ))}
                      </div>
                    </article>
                  </Card3D>
                </div>
              ))}

              {/* Project 03: A-KERE */}
              <div className="reveal work-card-link" id="project-03" data-project="a-kere" onClick={cardClick("a-kere")}>
                <Card3D maxTilt={7}>
                  <article className="work-row">
                    <div className="work-info">
                      <h3>{titleLink("a-kere", "A-KERE")}</h3>
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
              <div className="reveal work-card-link" id="project-04" data-project="naza-cell" onClick={cardClick("naza-cell")}>
                <Card3D maxTilt={7}>
                  <article className="work-row">
                    <div className="work-info">
                      <h3>{titleLink("naza-cell", "Naza Cell POS")}</h3>
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

        {/* -------------------- MORE EXPLORATIONS -------------------- */}
        <section className="explore" aria-labelledby="explore-title">
          <div className="container wide">
            <div className="explore-head reveal">
              <div>
                <p className="explore-kicker">Side projects &amp; research</p>
                <h2 className="explore-title" id="explore-title">More explorations</h2>
              </div>
              <p>Concepts, side projects, and data science experiments.</p>
            </div>

            <ul className="explore-grid">
              {explorations.map((x, i) => (
                <li className={`explore-card reveal tone-${x.tone}`} key={x.label} style={{ "--rd": `${(i % 3) * 70}ms` } as React.CSSProperties}>
                  <span className="explore-label">{x.label}</span>
                  <strong>{x.title}</strong>
                  <span className="explore-meta">{x.meta}</span>
                </li>
              ))}
            </ul>

            <div className="explore-cta reveal">
              <div>
                <strong>Like what you see?</strong>
                <span>Open for new UI/UX projects &middot; Let&rsquo;s build something together</span>
              </div>
              <div className="explore-btns">
                <a className="btn-primary" href="#contact">
                  Contact me <ArrowRight size={15} />
                </a>
                <a className="btn-secondary" href="mailto:firmannaza307@gmail.com?subject=CV%20Request">
                  Request CV <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------- ABOUT + SERVICES -------------------- */}
        <div className="about-services">
          <section className="about" id="about">
            <div className="meet">
              <figure className="meet-photo">
                <img
                  className="meet-img"
                  src={`${import.meta.env.BASE_URL}images/naza.jpg`}
                  alt="Naza Firmansyah tersenyum dan berpose peace di depan Menara Eiffel, Paris"
                  width={1924}
                  height={2048}
                  loading="lazy"
                  decoding="async"
                />
                <p className="meet-tag" aria-hidden="true">
                  <span>Hi, I&rsquo;m</span>
                  <span>Naza.</span>
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
                      Sebagai mahasiswa Sains Data di Universitas Negeri Surabaya, saya bekerja
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
                  Services <span className="count-pill">6 services</span>
                </h2>
              </div>

              <div className="service-list">
                <a className="service-row reveal" href="#contact">
                  <span className="service-num">01</span>
                  <h3 className="service-name">Product strategy</h3>
                  <p className="service-desc">
                    Turning business goals and user behaviors into clear product roadmaps through user interviews, empathy mapping, and information architecture.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact" style={{ "--rd": "80ms" } as React.CSSProperties}>
                  <span className="service-num">02</span>
                  <h3 className="service-name">UI/UX &amp; product design</h3>
                  <p className="service-desc">
                    Designing seamless digital experiences through user journeys, wireframes, high-fidelity interfaces, and interactive prototypes.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact" style={{ "--rd": "160ms" } as React.CSSProperties}>
                  <span className="service-num">03</span>
                  <h3 className="service-name">Web &amp; dashboard design</h3>
                  <p className="service-desc">
                    Creating modern, responsive websites, retail POS dashboards, and data visualization tools balancing visual clarity with dense information.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact">
                  <span className="service-num">04</span>
                  <h3 className="service-name">App design</h3>
                  <p className="service-desc">
                    Crafting user-friendly mobile applications with thoughtful micro-interactions, WCAG accessibility, and frictionless checkout flows.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact" style={{ "--rd": "80ms" } as React.CSSProperties}>
                  <span className="service-num">05</span>
                  <h3 className="service-name">Design systems</h3>
                  <p className="service-desc">
                    Building scalable Figma token architectures, reusable component variants, and consistent visual guidelines that accelerate development.
                  </p>
                  <span className="service-arrow">
                    <ArrowRight size={18} />
                  </span>
                </a>

                <a className="service-row reveal" href="#contact" style={{ "--rd": "160ms" } as React.CSSProperties}>
                  <span className="service-num">06</span>
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

/* -------------------------------------------------------------------------- */
/*          ROUTER: home page, or a case study at ?project=<slug>             */
/* -------------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;
const readSlug = () => new URLSearchParams(window.location.search).get("project");

export default function App() {
  const [slug, setSlug] = useState<string | null>(readSlug);
  const returnTo = useRef<string | null>(null);
  const slugRef = useRef(slug);
  slugRef.current = slug;

  useEffect(() => {
    const onPop = () => {
      const next = readSlug();
      if (!next && slugRef.current) returnTo.current = slugRef.current;
      setSlug(next);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (next: string | null) => {
    if (next) {
      window.history.pushState(null, "", projectHref(next));
    } else {
      returnTo.current = slugRef.current;
      window.history.pushState(null, "", `${BASE}#work`);
    }
    setSlug(next);
  };

  // case study: start at the top; back home: land on the card you came from
  useLayoutEffect(() => {
    if (slug) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const from = returnTo.current;
    returnTo.current = null;
    if (from) {
      document.querySelector(`[data-project="${from}"]`)?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [slug]);

  const project = findProject(slug);
  return project ? <ProjectDetail project={project} onNavigate={navigate} /> : <Home onOpen={navigate} />;
}
