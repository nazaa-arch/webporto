import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  Copy,
  Linkedin,
  Github,
  Phone,
  Globe,
  Trophy,
  Briefcase,
  Monitor,
  Lightbulb,
  Sparkles,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                     SPOTLIGHT COMPONENT (ROYAL BLUE GLOW)                  */
/* -------------------------------------------------------------------------- */

function Spotlight({ className, fill }: { className?: string; fill?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute z-[1] h-[160%] w-[130%] lg:w-[80%] opacity-0 animate-spotlight ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#spotlight-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "#1066FF"}
          fillOpacity="0.18"
        />
      </g>
      <defs>
        <filter
          id="spotlight-filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                     ARIQ ARVY STYLE PRIMARY BUTTON                         */
/* -------------------------------------------------------------------------- */

function ActionButton({
  title,
  icon,
  position = "right",
  handleClick,
  asLink,
  href,
  variant = "primary",
}: {
  title: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
  handleClick?: () => void;
  asLink?: boolean;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  const baseClasses =
    variant === "primary"
      ? "inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-md hover:bg-primary-hover active:bg-primary-pressed transition-all duration-200 gap-2 cursor-pointer"
      : "inline-flex h-12 items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 text-sm font-semibold text-ink hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200 gap-2 cursor-pointer";

  if (asLink && href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className={baseClasses}
      >
        {position === "left" && icon}
        <span>{title}</span>
        {position === "right" && icon}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={baseClasses}>
      {position === "left" && icon}
      <span>{title}</span>
      {position === "right" && icon}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                               FLOATING NAVBAR                              */
/* -------------------------------------------------------------------------- */

function FloatingNav() {
  const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Experience", link: "#experience" },
    { name: "Approach", link: "#approach" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex max-w-fit fixed z-[5000] top-6 inset-x-0 mx-auto px-6 sm:px-8 py-3 rounded-2xl border border-neutral-200/80 bg-white/85 shadow-md backdrop-blur-md items-center justify-center space-x-6"
    >
      <a href="#" className="flex items-center gap-2.5 pr-2 border-r border-neutral-200 group">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-container text-xs font-bold text-primary font-mono group-hover:scale-105 transition-transform">
          NF
        </span>
        <span className="hidden sm:inline font-semibold text-xs text-ink tracking-tight">
          Naza Firmansyah
        </span>
      </a>

      <div className="flex items-center space-x-5">
        {navItems.map((navItem, idx) => (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            className="text-neutral-500 hover:text-ink text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            {navItem.name}
          </a>
        ))}
      </div>

      <a
        href="mailto:firmannaza307@gmail.com"
        className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-hover shadow-sm transition-colors"
      >
        <span>Hire Me</span>
        <ArrowRight size={13} />
      </a>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO SECTION                                */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <div className="pb-16 pt-32 sm:pt-40 relative overflow-hidden">
      {/* Ambient Blue Spotlights (Ariq Arvy Electric & Sky Glow) */}
      <div>
        <Spotlight
          className="-top-32 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="#1066FF"
        />
        <Spotlight
          className="top-10 left-3/4 h-[75vh] w-[45vw]"
          fill="#93C5FD"
        />
        <Spotlight
          className="top-24 left-1/3 h-[60vh] w-[40vw]"
          fill="#E0EEFE"
        />
      </div>

      {/* Grid Background with Soft Radial Fade */}
      <div className="h-full w-full bg-grid-ariq absolute top-0 left-0 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F8FE]/80 to-[#F5F8FE]" />
      </div>

      {/* Content Container */}
      <div className="flex justify-center relative my-12 z-10">
        <div className="max-w-[90vw] md:max-w-2xl lg:max-w-[62vw] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-container/70 px-3.5 py-1 text-xs font-semibold text-primary font-mono mb-5"
          >
            <Sparkles size={13} />
            <span>DATA-DRIVEN UI/UX &amp; PRODUCT DESIGN</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[38px] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.12]"
          >
            Transforming Data &amp; Concepts into{" "}
            <span className="text-primary bg-clip-text">Intuitive Digital Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center mb-8 text-base md:text-lg text-neutral-500 mt-5 max-w-2xl font-normal leading-relaxed"
          >
            Hi! I'm <span className="text-ink font-semibold">Muhammad Naza Firmansyah</span>, a UI/UX
            Designer &amp; Data Science student at UNESA. Silver Medalist DIMAS TI &amp; GEMASTIK XVIII
            Finalist.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-3.5"
          >
            <ActionButton
              title="Explore My Work"
              icon={<ArrowRight size={16} />}
              position="right"
              asLink
              href="#projects"
              variant="primary"
            />
            <ActionButton
              title="Connect on LinkedIn"
              icon={<Linkedin size={16} />}
              position="left"
              asLink
              href="https://linkedin.com/in/nazafirman"
              variant="secondary"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                       BENTO GRID (ARIQ ARVY CLEAN STYLE)                   */
/* -------------------------------------------------------------------------- */

function BentoGrid() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("firmannaza307@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const leftLists = ["Figma", "FigJam", "Design Systems", "Prototyping"];
  const rightLists = ["Usability Testing", "Python", "Data-Driven UX", "React/Tailwind"];

  return (
    <section id="about" className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-5 lg:gap-6 mx-auto">
        {/* Item 1: Large Card (Philosophy & ThisMe Mockup) */}
        <div className="md:col-span-3 lg:col-span-3 md:row-span-2 relative overflow-hidden rounded-3xl bg-white border border-neutral-200/90 shadow-sm glass-card-hover p-6 lg:p-8 flex flex-col justify-between">
          <div className="z-10">
            <span className="font-mono text-xs text-primary font-semibold tracking-wider">
              DESIGN PHILOSOPHY
            </span>
            <h3 className="font-bold text-xl md:text-2xl text-ink mt-2 max-w-md tracking-tight">
              I prioritize user-centered design, inclusive accessibility, and data-backed product decisions.
            </h3>
            <p className="text-neutral-500 text-xs md:text-sm mt-3 max-w-md font-normal leading-relaxed">
              Menjembatani presisi analisa data sains dengan estetika antarmuka modern untuk menghasilkan solusi digital yang terukur dan berdampak nyata.
            </p>
          </div>

          {/* Interactive Visual Element */}
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-semibold text-ink">
                  ThisMe BISINDO Prototype
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold text-primary bg-primary-container px-2.5 py-0.5 rounded-full">
                Juara 2 DIMAS TI
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="rounded-xl border border-primary/20 bg-primary-container/40 p-2.5">
                <div className="text-base">🤟</div>
                <div className="text-[10px] font-mono font-bold text-ink mt-1">30+ Screens</div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-2.5">
                <div className="text-base">🎯</div>
                <div className="text-[10px] font-mono font-bold text-ink mt-1">92.5 SUS Score</div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-2.5">
                <div className="text-base">♿</div>
                <div className="text-[10px] font-mono font-bold text-ink mt-1">WCAG 2.1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Item 2: Location & Collaboration */}
        <div className="md:col-span-3 lg:col-span-2 relative overflow-hidden rounded-3xl bg-white border border-neutral-200/90 shadow-sm glass-card-hover p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-primary font-semibold tracking-wider">
              LOCATION &amp; COLLABORATION
            </span>
            <h3 className="font-bold text-lg md:text-xl text-ink mt-2 tracking-tight">
              Flexible with remote team collaboration &amp; agile workflows.
            </h3>
            <p className="text-neutral-500 text-xs mt-2 font-normal leading-relaxed">
              Based in Surabaya &amp; Sidoarjo, Indonesia (GMT+7). Terbiasa berkolaborasi aktif lintas tim produk dan software engineering.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container text-primary shrink-0">
              <Globe size={22} />
            </div>
            <div>
              <div className="text-xs font-bold text-ink">Universitas Negeri Surabaya</div>
              <div className="text-[11px] font-mono text-neutral-500">Bachelor of Data Science (GPA 3.80)</div>
            </div>
          </div>
        </div>

        {/* Item 3: Tech Stack Badge Columns */}
        <div className="md:col-span-3 lg:col-span-2 relative overflow-hidden rounded-3xl bg-white border border-neutral-200/90 shadow-sm glass-card-hover p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-primary font-semibold tracking-wider">
              MY TOOLKIT
            </span>
            <h3 className="font-bold text-lg md:text-xl text-ink mt-1 tracking-tight">
              Constantly refining my UI/UX &amp; data stack.
            </h3>
          </div>

          <div className="flex gap-2.5 w-fit mt-4">
            <div className="flex flex-col gap-2">
              {leftLists.map((item, i) => (
                <span
                  key={i}
                  className="py-1.5 px-3 text-[11px] font-mono rounded-lg text-center bg-neutral-50 text-neutral-700 font-medium border border-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {rightLists.map((item, i) => (
                <span
                  key={i}
                  className="py-1.5 px-3 text-[11px] font-mono rounded-lg text-center bg-neutral-50 text-neutral-700 font-medium border border-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Item 4: Data-Driven Mindset */}
        <div className="md:col-span-3 lg:col-span-2 relative overflow-hidden rounded-3xl bg-white border border-neutral-200/90 shadow-sm glass-card-hover p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-primary font-semibold tracking-wider">
              ANALYTIC ADVANTAGE
            </span>
            <h3 className="font-bold text-lg md:text-xl text-ink mt-2 tracking-tight">
              Data-informed thinker passionate about digital experience.
            </h3>
            <p className="text-neutral-500 text-xs mt-2 font-normal leading-relaxed">
              Mampu mengekstraksi insight dari data pengguna, memvalidasi asumsi desain dengan bukti kuantitatif, dan mengukur usability metrik secara empiris.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-3 text-xs font-mono text-neutral-500">
            <span>A/B Testing Mindset</span>
            <span className="text-primary font-semibold">100% Empathetic</span>
          </div>
        </div>

        {/* Item 5: The Inside Scoop (Live Ecosystem) */}
        <div className="md:col-span-3 lg:col-span-3 relative overflow-hidden rounded-3xl bg-white border border-neutral-200/90 shadow-sm glass-card-hover p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-primary font-semibold tracking-wider">
              THE INSIDE SCOOP
            </span>
            <h3 className="font-bold text-lg md:text-2xl text-ink mt-1 tracking-tight">
              Currently designing ThisMe (BISINDO) &amp; SteamCraft ecosystem.
            </h3>
            <p className="text-neutral-500 text-xs md:text-sm mt-2 font-normal leading-relaxed">
              Membangun antarmuka simulasi edukasi sains interaktif (SteamSim Lab) dan kanvas pemodelan 3D generatif di steamcraft.online.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <a
              href="https://portofolionaza.steamcraft.online"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline font-mono"
            >
              <span>Explore portofolionaza.steamcraft.online</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Item 6: Copy Email CTA */}
        <div className="md:col-span-6 lg:col-span-5 relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-wash/50 via-white to-sky-wash/30 border border-neutral-200/90 shadow-sm p-6 lg:p-8 text-center flex flex-col items-center justify-center">
          <h3 className="font-bold text-xl md:text-2xl text-ink max-w-md tracking-tight">
            Do you want to start a project or collaboration together?
          </h3>
          <p className="text-neutral-500 text-xs md:text-sm mt-1 max-w-sm">
            Feel free to reach out directly via email or chat.
          </p>
          <div className="mt-5">
            <button
              onClick={handleCopy}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-md hover:bg-primary-hover active:bg-primary-pressed transition-all duration-200 gap-2 cursor-pointer"
            >
              {copied ? <Check size={16} className="text-white" /> : <Copy size={16} />}
              <span>{copied ? "Email Address Copied!" : "Copy My Email Address"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               RECENT PROJECTS                              */
/* -------------------------------------------------------------------------- */

function RecentProjects() {
  const projects = [
    {
      id: 1,
      title: "This Me — BISINDO Sign Language Learning App",
      des: "Aplikasi pembelajaran Bahasa Isyarat Indonesia (BISINDO) interaktif dengan 30+ antarmuka di Figma, design system komprehensif, dan pengujian kegunaan ramah komunitas Tuli.",
      badge: "Juara 2 DIMAS TI • GEMASTIK XVIII Finalist",
      iconLists: ["Figma", "Design System", "WCAG", "Mobile UX"],
      link: "https://github.com/nazaa-arch/webporto",
      category: "Mobile UI/UX • EdTech",
    },
    {
      id: 2,
      title: "SteamCraft — Web Simulation Lab & 3D Studio",
      des: "Perancangan antarmuka modular studio simulasi sains interaktif (SteamSim) dan pemodelan parametrik 3D generatif (MakerCraft 3D) dengan workbench UI yang ergonomis.",
      badge: "Live Platform • Lead System Architect",
      iconLists: ["Web UI", "3D Canvas", "Figma", "Complex Systems"],
      link: "https://portofolionaza.steamcraft.online",
      category: "Web App • 3D Canvas UX",
    },
    {
      id: 3,
      title: "A-KERE — Smart Personal Financial Tracker",
      des: "Redesain alur pencatatan keuangan harian untuk generasi muda. Mengurangi langkah input transaksi hingga 50% lebih efisien dengan visualisasi budget yang intuitif.",
      badge: "Product & UI/UX Design",
      iconLists: ["Mobile UX", "Fintech Flow", "User Journey", "Figma"],
      link: "#",
      category: "Fintech • Mobile App",
    },
    {
      id: 4,
      title: "Naza Cell POS & Retail Management Dashboard",
      des: "Dashboard kasir dan manajemen inventaris untuk 100+ SKU dan puluhan transaksi layanan keuangan digital harian (PPOB, pulsa, e-money) dengan kecepatan operasional tinggi.",
      badge: "Dashboard & Operations",
      iconLists: ["Dashboard UI", "POS System", "Information Architecture"],
      link: "#",
      category: "Desktop Dashboard • B2B UX",
    },
  ];

  return (
    <section id="projects" className="py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="font-mono text-xs text-primary font-semibold tracking-wider uppercase">
          PORTFOLIO SHOWCASE
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mt-1">
          A small selection of <span className="text-primary">recent projects</span>
        </h2>
        <p className="text-neutral-500 text-xs sm:text-sm mt-2">
          Perancangan antarmuka, studi kasus desain produk, dan sistem digital terkini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl bg-white border border-neutral-200/90 shadow-sm glass-card-hover p-6 lg:p-7 flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Mockup Container */}
              <div className="relative flex items-center justify-center w-full overflow-hidden h-[200px] sm:h-[240px] mb-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 p-4">
                <div className="w-full h-full rounded-xl border border-neutral-200 bg-white p-4 flex flex-col justify-between relative shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-primary bg-primary-container px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">{item.category}</span>
                  </div>

                  <div className="my-auto py-2">
                    <div className="text-lg font-bold text-ink group-hover:text-primary transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-neutral-500 font-normal mt-1 line-clamp-2">
                      {item.des}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-neutral-200 pt-2">
                    <span>Muhammad Naza Firmansyah</span>
                    <span className="text-primary font-semibold">High-Fidelity UI</span>
                  </div>
                </div>
              </div>

              <h3 className="font-bold lg:text-xl text-lg text-ink group-hover:text-primary transition-colors line-clamp-1 tracking-tight">
                {item.title}
              </h3>

              <p className="text-xs lg:text-sm text-neutral-500 line-clamp-2 my-2.5 leading-relaxed font-normal">
                {item.des}
              </p>
            </div>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-200">
              <div className="flex flex-wrap items-center gap-1.5">
                {item.iconLists.map((icon, index) => (
                  <span
                    key={index}
                    className="border border-neutral-200 bg-neutral-50 rounded-lg px-2.5 py-0.5 text-[10px] font-mono text-neutral-700 font-medium"
                  >
                    {icon}
                  </span>
                ))}
              </div>

              <a
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center text-xs lg:text-sm text-primary hover:text-primary-hover font-semibold gap-1 shrink-0 ml-2"
              >
                <span>Check Details</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                          EXPERIENCE & ACHIEVEMENTS                         */
/* -------------------------------------------------------------------------- */

function Experience() {
  const experiences = [
    {
      id: 1,
      title: "Juara 2 Lomba UI/UX DIMAS TI (Medali Perak)",
      desc: "Meraih Medali Perak tingkat nasional dalam perancangan aplikasi 'This Me', aplikasi pembelajaran Bahasa Isyarat Indonesia (BISINDO) dengan 30+ antarmuka di Figma.",
      issuer: "DIMAS TI National Competition 2025",
      icon: <Trophy className="text-primary" size={26} />,
    },
    {
      id: 2,
      title: "Finalis GEMASTIK XVIII (Divisi UX Design)",
      desc: "Terpilih mewakili Universitas Negeri Surabaya (UNESA) dalam kompetisi prestisius GEMASTIK XVIII oleh Puspresnas Kemendikbudristek melalui karya 'This Me'.",
      issuer: "Puspresnas / BPTI 2025",
      icon: <Award className="text-primary" size={26} />,
    },
    {
      id: 3,
      title: "UI/UX & Lead System Architect - SteamCraft",
      desc: "Memimpin perancangan antarmuka dan arsitektur sistem pada platform SteamCraft, studio simulasi virtual SteamSim Lab, dan kanvas 3D MakerCraft.",
      issuer: "steamcraft.online & portofolionaza.steamcraft.online",
      icon: <Monitor className="text-primary" size={26} />,
    },
    {
      id: 4,
      title: "Business & Operations Manager - Toko Naza Cell",
      desc: "Mengelola operasional ritel, integrasi 100+ SKU inventaris toko, dan puluhan transaksi layanan keuangan digital (PPOB, transfer, e-money) secara terstruktur.",
      issuer: "Naza Cell (2019 - Sekarang)",
      icon: <Briefcase className="text-primary" size={26} />,
    },
  ];

  return (
    <section id="experience" className="py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="font-mono text-xs text-primary font-semibold tracking-wider uppercase">
          RECOGNITION &amp; JOURNEY
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mt-1">
          My work experience &amp; <span className="text-primary">achievements</span>
        </h2>
      </div>

      <div className="w-full grid lg:grid-cols-4 grid-cols-1 gap-5">
        {experiences.map((card) => (
          <div
            key={card.id}
            className="lg:col-span-2 rounded-2xl bg-white border border-neutral-200/90 shadow-sm glass-card-hover p-6 flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-primary-container/60 border border-primary/20 shrink-0">
              {card.icon}
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-ink tracking-tight">{card.title}</h3>
              <span className="text-xs font-mono font-semibold text-primary block mt-0.5">
                {card.issuer}
              </span>
              <p className="text-neutral-500 text-xs md:text-sm mt-2.5 font-normal leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 MY APPROACH                                */
/* -------------------------------------------------------------------------- */

function Approach() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Planning & User Research",
      desc: "Memulai dengan riset mendalam terhadap target pengguna, pemetaan empati (empathy mapping), arsitektur informasi, dan perumusan alur pengguna sebelum menyentuh kanvas desain.",
      tag: "Research & Strategy",
    },
    {
      phase: "Phase 2",
      title: "Design System & Prototyping",
      desc: "Membangun sistem desain modular, auto-layout variants, wireframing, hingga high-fidelity interactive prototype di Figma yang memenuhi standar aksesibilitas WCAG.",
      tag: "Craft & Interaction",
    },
    {
      phase: "Phase 3",
      title: "Testing, Metrics & Validation",
      desc: "Melakukan pengujian kegunaan langsung (Usability Testing), evaluasi skor SUS (System Usability Scale), dan iterasi berkelanjutan berbasis data perilaku pengguna nyata.",
      tag: "Data & Validation",
    },
  ];

  return (
    <section id="approach" className="py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="font-mono text-xs text-primary font-semibold tracking-wider uppercase">
          METHODOLOGY
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mt-1">
          My <span className="text-primary">approach</span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        {phases.map((item, index) => (
          <div
            key={index}
            className="w-full lg:w-1/3 rounded-3xl bg-white border border-neutral-200/90 shadow-sm glass-card-hover p-7 relative overflow-hidden flex flex-col justify-between min-h-[300px] group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="inline-block rounded-full bg-primary-container px-3 py-1 font-mono text-xs text-primary font-semibold">
                  {item.phase}
                </span>
                <span className="font-mono text-[11px] text-neutral-500">{item.tag}</span>
              </div>

              <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors tracking-tight">
                {item.title}
              </h3>

              <p className="text-neutral-500 text-xs md:text-sm mt-3 font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-3.5 flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Lightbulb size={14} className="text-primary" />
              <span>User-Centered Iteration</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FOOTER                                   */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer id="contact" className="w-full pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="w-full absolute left-0 bottom-0 min-h-80 pointer-events-none opacity-40">
        <div className="h-full w-full bg-grid-ariq" />
      </div>

      <div className="flex flex-col items-center text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-ink max-w-2xl tracking-tight leading-tight">
          Ready to take <span className="text-primary">your digital experience</span> to the next level?
        </h2>
        <p className="text-neutral-500 text-sm md:text-base mt-4 max-w-lg font-normal">
          Reach out to me today and let's discuss how I can help you craft intuitive, user-centered digital products.
        </p>

        <div className="mt-7">
          <ActionButton
            title="Let's get in touch"
            icon={<ArrowRight size={16} />}
            position="right"
            asLink
            href="mailto:firmannaza307@gmail.com"
            variant="primary"
          />
        </div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-4 border-t border-neutral-200 pt-8 relative z-10">
        <p className="md:text-sm text-xs font-normal text-neutral-500 font-mono">
          &copy; {new Date().getFullYear()} Muhammad Naza Firmansyah. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/nazaa-arch"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 cursor-pointer flex justify-center items-center bg-white rounded-xl border border-neutral-200 hover:border-primary text-neutral-700 hover:text-primary shadow-sm transition-all"
          >
            <Github size={18} />
          </a>

          <a
            href="https://linkedin.com/in/nazafirman"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 cursor-pointer flex justify-center items-center bg-white rounded-xl border border-neutral-200 hover:border-primary text-neutral-700 hover:text-primary shadow-sm transition-all"
          >
            <Linkedin size={18} />
          </a>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 cursor-pointer flex justify-center items-center bg-white rounded-xl border border-neutral-200 hover:border-primary text-neutral-700 hover:text-primary shadow-sm transition-all"
          >
            <Phone size={18} />
          </a>

          <a
            href="https://portofolionaza.steamcraft.online"
            target="_blank"
            rel="noreferrer"
            aria-label="SteamCraft Portfolio"
            className="w-10 h-10 cursor-pointer flex justify-center items-center bg-white rounded-xl border border-neutral-200 hover:border-primary text-neutral-700 hover:text-primary shadow-sm transition-all"
          >
            <Globe size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function App() {
  return (
    <main className="relative bg-background flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 text-ink selection:bg-primary selection:text-white">
      <div className="max-w-7xl w-full">
        <FloatingNav />
        <Hero />
        <BentoGrid />
        <RecentProjects />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
