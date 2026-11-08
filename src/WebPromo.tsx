/* -------------------------------------------------------------------------- */
/*   Promo tiles for web apps: a real screenshot in a browser window on the   */
/*   app's own brand colour, with a headline, like a product launch image.    */
/*   Kept separate from MobileMock.tsx so the This Me tiles stay untouched.   */
/* -------------------------------------------------------------------------- */

import type { CSSProperties } from "react";

const BASE = import.meta.env.BASE_URL;

export type WebTheme = {
  /** brand name split so the second part takes the accent colour */
  name: [string, string];
  bg: string;
  accent: string;
  url: string;
  folder: string;
};

export type WebPromo = { label: string; title: string; sub: string; chip?: string };

type WebSet = { theme: WebTheme; promos: [WebPromo, WebPromo, WebPromo]; cover: { title: string; sub: string } };

const vars = (t: WebTheme) => ({ "--promo-bg": t.bg, "--accent": t.accent }) as CSSProperties;

function Brand({ theme }: { theme: WebTheme }) {
  return (
    <span className="promo-brand">
      {theme.name[0]}
      <b>{theme.name[1]}</b>
    </span>
  );
}

function BrowserMock({ src, alt, url, className = "", eager = false }: { src: string; alt: string; url: string; className?: string; eager?: boolean }) {
  return (
    <div className={`bmock ${className}`}>
      <div className="bmock-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      <div className="bmock-screen">
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      </div>
    </div>
  );
}

/** One screen (shot n = 1..3) on the brand stage. */
export function WebPromoTile({ set, index, size = "card" }: { set: WebSet; index: number; size?: "card" | "large" }) {
  const { theme } = set;
  const p = set.promos[index];
  return (
    <div className={`promo promo-web promo-${size}`} style={vars(theme)}>
      <div className="promo-copy">
        <Brand theme={theme} />
        <strong className="promo-title">{p.title}</strong>
        <span className="promo-sub">{p.sub}</span>
      </div>
      <BrowserMock
        src={`${BASE}work/${theme.folder}/${index + 1}.jpg`}
        alt={`${theme.name.join("")}: ${p.label}`}
        url={theme.url}
        className="promo-window"
      />
      {p.chip && <span className="promo-chip">{p.chip}</span>}
    </div>
  );
}

/** Wide case-study cover: headline left, the cover screenshot in a large window right. */
export function WebPromoStage({ set }: { set: WebSet }) {
  const { theme, cover } = set;
  return (
    <div className="promo-web-stage" style={vars(theme)}>
      <div className="promo-web-stage-copy">
        <Brand theme={theme} />
        <strong>{cover.title}</strong>
        <span>{cover.sub}</span>
      </div>
      <BrowserMock
        src={`${BASE}work/${theme.folder}/cover.jpg`}
        alt={`${theme.name.join("")} overview`}
        url={theme.url}
        className="promo-web-stage-window"
        eager
      />
    </div>
  );
}

/* ---------------------------------- data ---------------------------------- */
/* Every chip quotes a value that is visible in that screenshot.             */

const set = (
  theme: WebTheme,
  cover: WebSet["cover"],
  rows: [string, string, string, string?][]
): WebSet => ({
  theme,
  cover,
  promos: rows.map(([label, title, sub, chip]) => ({ label, title, sub, chip })) as WebSet["promos"],
});

export const webPromos: Record<string, WebSet> = {
  "steamcraft-hub": set(
    { name: ["STEAM ", "Hub"], bg: "linear-gradient(150deg, #2b3fb8 0%, #18256e 75%)", accent: "#a8c4ff", url: "steamcraft.online", folder: "hub" },
    { title: "Build skills, create solutions, make an impact", sub: "The official portal of a three-person STEAM research team." },
    [
      ["Research team members", "Three innovators, one research team", "Software, IoT hardware & research design", "3 team members"],
      ["Team projects gateway", "Every team project in one gateway", "Platform prototype plus projects in development"],
      ["Research pillars", "Four pillars behind every project", "Methodology, FAIR data, instruments & dossiers"],
    ]
  ),
  steamcraft: set(
    { name: ["Steam", "Craft"], bg: "linear-gradient(155deg, #2f6fe0 0%, #163f9c 75%)", accent: "#bcd6ff", url: "app.steamcraft.online", folder: "app" },
    { title: "One workspace for cross-disciplinary research", sub: "Checkpoints, logbooks, data and a STEAM competency radar." },
    [
      ["Workspace sign-in", "One workspace for curious minds", "Role-based entry for students & lecturers"],
      ["Research dashboard", "Every project, checkpoint and blocker", "Five scientific checkpoints per project", "57% average progress"],
      ["STEAM competency radar", "Your research, on a five-axis radar", "Science, Tech, Engineering, Art & Math", "94.2 / 100 score"],
    ]
  ),
  sim: set(
    { name: ["SteamSim ", "Lab"], bg: "linear-gradient(150deg, #0f8aa6 0%, #0b4f66 75%)", accent: "#8ff0ff", url: "sim.steamcraft.online", folder: "sim" },
    { title: "Science you can actually play with", sub: "Physics, chemistry and math simulations with real parameters." },
    [
      ["Projectile motion simulation", "Physics you can actually play with", "Projectile motion with quadratic air drag", "Range 100 m · 5.16 s"],
      ["Titration pH curve", "Watch the pH curve bend", "Acid-base titration, step by step"],
      ["Chaos pendulum", "Tiny changes, completely new paths", "A chaotic double pendulum"],
    ]
  ),
  maker: set(
    { name: ["MakerCraft ", "3D"], bg: "linear-gradient(150deg, #b0248f 0%, #5b1270 75%)", accent: "#ffb3ec", url: "maker.steamcraft.online", folder: "maker" },
    { title: "Equations you can hold in 3D", sub: "Parametric surfaces rendered live and ready for 3D printing." },
    [
      ["Torus knot in cyberpunk material", "Equations you can hold in 3D", "Parametric surfaces rendered live", "3D-print export"],
      ["Hologram material", "One shape, endless looks", "Switch material themes instantly"],
      ["Emerald matrix material", "From formula to printable model", "Export any surface as .OBJ"],
    ]
  ),
  verilab: set(
    { name: ["VeriLab ", "AI"], bg: "radial-gradient(110% 90% at 80% 10%, #0f4a5c 0%, #07121f 65%)", accent: "#38d6f2", url: "verilab.steamcraft.online", folder: "verilab" },
    { title: "Research results you can verify", sub: "Calibration, replication and sensitivity checks in one engine." },
    [
      ["Calibration and GPR metrology", "Calibrate sensors with real confidence", "Gaussian Process Regression + 95% band"],
      ["Replicability check", "Does the paper's claim replicate?", "Seeded sandbox runs against reported metrics"],
      ["Monte Carlo and Sobol indices", "Find the inputs that really matter", "Monte Carlo & Sobol sensitivity", "4,096 iterations"],
    ]
  ),
  scholar: set(
    { name: ["PaperCraft ", "AI"], bg: "linear-gradient(150deg, #5a4fe0 0%, #2c2496 75%)", accent: "#c9c4ff", url: "scholar.steamcraft.online", folder: "scholar" },
    { title: "Write a paper journals want to read", sub: "IMRaD editing, readiness scoring and an AI manuscript audit." },
    [
      ["IMRaD manuscript editor", "Write a paper journals want to read", "Section-by-section IMRaD editor", "Readiness 87 / 100"],
      ["Statistics check", "Statistics that hold up to review", "Reported results, checked before submission"],
      ["AI manuscript audit", "Audit your manuscript in one click", "Journal criteria, met or still missing"],
    ]
  ),
  geo: set(
    { name: ["SteamGeo ", "Intelligence"], bg: "linear-gradient(150deg, #10a37f 0%, #0b5c4a 75%)", accent: "#a7f3d0", url: "geo.steamcraft.online", folder: "geo" },
    { title: "See dengue risk before it spreads", sub: "A spatial early-warning dashboard for 38 East Java regions." },
    [
      ["Dengue incidence map", "See dengue risk before it spreads", "Incidence per 100,000 across East Java", "38 regions"],
      ["LISA clusters", "Hotspots, mapped and ranked", "Local spatial clusters (LISA)"],
      ["Rainfall layer", "Where rain and outbreaks meet", "Rainfall layer against incidence"],
    ]
  ),
  arena: set(
    { name: ["Steam", "Arena"], bg: "linear-gradient(150deg, #f07a2a 0%, #b5400f 75%)", accent: "#ffe0a3", url: "arena.steamcraft.online", folder: "arena" },
    { title: "Where the best STEAM projects compete", sub: "Leaderboard, five-axis radar scoring and structured peer review." },
    [
      ["Project leaderboard", "Where the best STEAM projects compete", "National STEAM innovation hackathon", "Top score 93"],
      ["Peer-review scoring", "Fair scores from structured peer review", "Rate accuracy, innovation & design"],
      ["Category filter", "Every track, one arena", "AI, simulation, geospatial, 3D & IoT"],
    ]
  ),
};
