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
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                               SPOTLIGHT SVG                                */
/* -------------------------------------------------------------------------- */

function Spotlight({ className, fill }: { className?: string; fill?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 animate-spotlight ${className}`}
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
          fill={fill || "white"}
          fillOpacity="0.21"
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
/*                                MAGIC BUTTON                                */
/* -------------------------------------------------------------------------- */

function MagicButton({
  title,
  icon,
  position = "right",
  handleClick,
  otherClasses = "",
  asLink,
  href,
}: {
  title: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
  handleClick?: () => void;
  otherClasses?: string;
  asLink?: boolean;
  href?: string;
}) {
  const content = (
    <>
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </>
  );

  if (asLink && href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="relative inline-flex h-12 w-full md:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="relative inline-flex h-12 w-full md:w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none"
    >
      {content}
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
      className="flex max-w-fit fixed z-[5000] top-8 inset-x-0 mx-auto px-8 py-3.5 rounded-full border border-white/[0.15] bg-black-200/80 shadow-[0px_2px_12px_rgba(0,0,0,0.5)] items-center justify-center space-x-6 backdrop-blur-md"
    >
      <a href="#" className="flex items-center gap-2 pr-2 border-r border-white/10 group">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple/20 text-[11px] font-bold text-purple font-mono group-hover:scale-110 transition-transform">
          NF
        </span>
        <span className="hidden sm:inline font-mono text-xs font-semibold text-white/90">
          Naza.
        </span>
      </a>

      {navItems.map((navItem, idx) => (
        <a
          key={`link-${idx}`}
          href={navItem.link}
          className="relative text-neutral-300 hover:text-white text-xs md:text-sm font-medium transition-colors cursor-pointer"
        >
          {navItem.name}
        </a>
      ))}

      <a
        href="mailto:firmannaza307@gmail.com"
        className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-purple/40 bg-purple/10 px-3.5 py-1 text-xs font-medium text-purple hover:bg-purple/20 transition-colors"
      >
        <span>Hire Me</span>
        <ArrowRight size={12} />
      </a>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO SECTION                                */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <div className="pb-20 pt-36 relative">
      {/* Aceternity Spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight
          className="top-28 left-80 h-[80vh] w-[50vw]"
          fill="#3B82F6"
        />
      </div>

      {/* Grid Background with Radial Mask */}
      <div className="h-screen w-full bg-black-100 bg-grid-white absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Content Container */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80 font-mono mb-4"
          >
            DATA-DRIVEN UI/UX &amp; PRODUCT DESIGN
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[40px] md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Transforming Data &amp; Concepts into{" "}
            <span className="text-purple">Intuitive User Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center md:tracking-wider mb-8 text-sm md:text-lg lg:text-xl text-white-100 mt-5 max-w-2xl font-light"
          >
            Hi! I'm <span className="text-white font-medium">Muhammad Naza Firmansyah</span>, a
            passionate UI/UX Designer &amp; Data Science student at UNESA. Silver Medalist DIMAS TI &amp;
            GEMASTIK XVIII Finalist.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <MagicButton
              title="Explore My Work"
              icon={<ArrowRight size={16} />}
              position="right"
              asLink
              href="#projects"
            />
            <a
              href="https://linkedin.com/in/nazafirman"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-black-200/80 px-6 text-sm font-medium text-white hover:border-purple hover:text-purple transition-colors gap-2"
            >
              <Linkedin size={16} />
              <span>Connect on LinkedIn</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 BENTO GRID                                 */
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
    <section id="about" className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto">
        {/* Item 1: Large Card (Philosophy & ThisMe Mockup) */}
        <div className="md:col-span-3 lg:col-span-3 md:row-span-2 relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#0e122b] to-[#04071d] p-6 lg:p-8 flex flex-col justify-between">
          <div className="z-20">
            <span className="font-mono text-xs text-purple font-medium">DESIGN PHILOSOPHY</span>
            <h3 className="font-bold text-lg md:text-2xl text-white mt-2 max-w-md">
              I prioritize user-centered design, inclusive accessibility, and data-backed product decisions.
            </h3>
            <p className="text-white-100 text-xs md:text-sm mt-3 max-w-sm font-light">
              Menjembatani presisi analisa data sains dengan estetika antarmuka modern untuk menghasilkan solusi digital yang terukur dan berdampak.
            </p>
          </div>

          {/* Interactive Visual Element */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-black-100/70 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-white/80">ThisMe BISINDO Prototype</span>
              </div>
              <span className="text-[10px] font-mono text-purple bg-purple/10 px-2 py-0.5 rounded border border-purple/30">
                Juara 2 DIMAS TI
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg border border-purple/40 bg-purple/10 p-2">
                <div className="text-base">🤟</div>
                <div className="text-[9px] font-mono text-white mt-1">30+ Screens</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <div className="text-base">🎯</div>
                <div className="text-[9px] font-mono text-white mt-1">92.5 SUS Score</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <div className="text-base">♿</div>
                <div className="text-[9px] font-mono text-white mt-1">WCAG 2.1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Item 2: Location & Collaboration */}
        <div className="md:col-span-3 lg:col-span-2 relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#04071D] p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-purple font-medium">LOCATION &amp; COLLABORATION</span>
            <h3 className="font-bold text-lg md:text-xl text-white mt-2">
              Flexible with remote team collaboration &amp; sprint workflows.
            </h3>
            <p className="text-white-100 text-xs mt-2 font-light">
              Based in Surabaya &amp; Sidoarjo, Indonesia (GMT+7). Terbiasa berkolaborasi lintas disiplin tim software engineering.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-black-200/80 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/20 text-purple">
              <Globe size={20} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Universitas Negeri Surabaya</div>
              <div className="text-[11px] font-mono text-white-100">Bachelor of Data Science (GPA 3.80)</div>
            </div>
          </div>
        </div>

        {/* Item 3: Tech Stack Badge Columns */}
        <div className="md:col-span-3 lg:col-span-2 relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-r from-[#04071D] to-[#0C0E23] p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-purple font-medium">MY TOOLKIT</span>
            <h3 className="font-bold text-lg md:text-xl text-white mt-1">
              Constantly refining my UI/UX &amp; data stack.
            </h3>
          </div>

          <div className="flex gap-2 lg:gap-3 w-fit mt-4">
            <div className="flex flex-col gap-2">
              {leftLists.map((item, i) => (
                <span
                  key={i}
                  className="py-1.5 px-3 text-[11px] font-mono opacity-80 lg:opacity-100 rounded-lg text-center bg-[#10132E] text-white/90 border border-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {rightLists.map((item, i) => (
                <span
                  key={i}
                  className="py-1.5 px-3 text-[11px] font-mono opacity-80 lg:opacity-100 rounded-lg text-center bg-[#10132E] text-white/90 border border-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Item 4: Data-Driven Mindset */}
        <div className="md:col-span-3 lg:col-span-2 relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#04071D] p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-purple font-medium">ANALYTIC ADVANTAGE</span>
            <h3 className="font-bold text-lg md:text-xl text-white mt-2">
              Data-informed thinker passionate about digital experience.
            </h3>
            <p className="text-white-100 text-xs mt-2 font-light">
              Mampu mengekstraksi insight dari data pengguna, memvalidasi asumsi desain dengan kuantitatif data, dan mengukur usability metrik secara empiris.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-mono text-white/60">
            <span>A/B Testing Mindset</span>
            <span className="text-purple">100% Empathetic</span>
          </div>
        </div>

        {/* Item 5: The Inside Scoop (Live Ecosystem) */}
        <div className="md:col-span-3 lg:col-span-3 relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-r from-[#0e122b] to-[#04071d] p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-purple font-medium">THE INSIDE SCOOP</span>
            <h3 className="font-bold text-lg md:text-2xl text-white mt-1">
              Currently designing ThisMe (BISINDO) &amp; SteamCraft ecosystem.
            </h3>
            <p className="text-white-100 text-xs md:text-sm mt-2 font-light">
              Membangun antarmuka simulasi edukasi sains interaktif (SteamSim Lab) dan kanvas pemodelan 3D generatif di steamcraft.online.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <a
              href="https://portofolionaza.steamcraft.online"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-purple hover:underline font-mono"
            >
              <span>Explore portofolionaza.steamcraft.online</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Item 6: Copy Email CTA */}
        <div className="md:col-span-6 lg:col-span-5 relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#04071D] p-6 lg:p-8 text-center flex flex-col items-center justify-center">
          <h3 className="font-bold text-xl md:text-2xl text-white max-w-md">
            Do you want to start a project or collaboration together?
          </h3>
          <div className="mt-5">
            <button
              onClick={handleCopy}
              className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#161A31] px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? "Email Address Copied!" : "Copy My Email Address"}
              </span>
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
      des: "Perancangan antarmuka modular studio simulasi sains interaktif (SteamSim) dan pemodelan parametrik 3D generatif (MakerCraft 3D) dengan dark workbench UI yang ergonomis.",
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
    <section id="projects" className="py-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
        A small selection of <span className="text-purple">recent projects</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-14">
        {projects.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-3xl border border-white/[0.1] bg-[#13162D] p-6 lg:p-8 hover:border-purple/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Mockup Container */}
              <div className="relative flex items-center justify-center w-full overflow-hidden h-[200px] sm:h-[260px] mb-6 rounded-2xl bg-[#0e122b] border border-white/5 p-4">
                <div className="w-full h-full rounded-xl border border-white/10 bg-black-100/80 p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-purple bg-purple/10 px-2.5 py-0.5 rounded border border-purple/30">
                      {item.badge}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">{item.category}</span>
                  </div>

                  <div className="my-auto py-2">
                    <div className="text-lg font-bold text-white group-hover:text-purple transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-white-100 font-light mt-1 line-clamp-2">
                      {item.des}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-white/50 border-t border-white/10 pt-2">
                    <span>Muhammad Naza Firmansyah</span>
                    <span className="text-emerald-400">High-Fidelity</span>
                  </div>
                </div>
              </div>

              <h3 className="font-bold lg:text-2xl md:text-xl text-base text-white group-hover:text-purple transition-colors line-clamp-1">
                {item.title}
              </h3>

              <p className="lg:text-sm lg:font-normal font-light text-xs line-clamp-2 text-[#BEC1DD] my-3">
                {item.des}
              </p>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-1.5">
                {item.iconLists.map((icon, index) => (
                  <span
                    key={index}
                    className="border border-white/[0.1] bg-black-100 rounded-full px-2.5 py-0.5 text-[10px] font-mono text-white/70"
                  >
                    {icon}
                  </span>
                ))}
              </div>

              <a
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center text-xs lg:text-sm text-purple hover:underline gap-1 font-medium shrink-0 ml-2"
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
      icon: <Trophy className="text-yellow-400" size={28} />,
    },
    {
      id: 2,
      title: "Finalis GEMASTIK XVIII (Divisi UX Design)",
      desc: "Terpilih mewakili Universitas Negeri Surabaya (UNESA) dalam kompetisi prestisius GEMASTIK XVIII oleh Puspresnas Kemendikbudristek melalui karya 'This Me'.",
      issuer: "Puspresnas / BPTI 2025",
      icon: <Award className="text-purple" size={28} />,
    },
    {
      id: 3,
      title: "UI/UX & Lead System Architect - SteamCraft",
      desc: "Memimpin perancangan antarmuka dan arsitektur sistem pada platform SteamCraft, studio simulasi virtual SteamSim Lab, dan kanvas 3D MakerCraft.",
      issuer: "steamcraft.online & portofolionaza.steamcraft.online",
      icon: <Monitor className="text-blue-400" size={28} />,
    },
    {
      id: 4,
      title: "Business & Operations Manager - Toko Naza Cell",
      desc: "Mengelola operasional ritel, integrasi 100+ SKU inventaris toko, dan puluhan transaksi layanan keuangan digital (PPOB, transfer, e-money) secara terstruktur.",
      issuer: "Naza Cell (2019 - Sekarang)",
      icon: <Briefcase className="text-emerald-400" size={28} />,
    },
  ];

  return (
    <section id="experience" className="py-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
        My work experience &amp; <span className="text-purple">achievements</span>
      </h2>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-6">
        {experiences.map((card) => (
          <div
            key={card.id}
            className="lg:col-span-2 rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#0c0e23] to-[#04071d] p-6 lg:p-8 flex items-start gap-4 hover:border-purple/50 transition-all duration-300"
          >
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
              {card.icon}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white">{card.title}</h3>
              <span className="text-xs font-mono text-purple block mt-0.5">{card.issuer}</span>
              <p className="text-white-100 text-xs md:text-sm mt-3 font-light leading-relaxed">
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
      desc: "Memulai dengan riset mendalam terhadap target pengguna, pemetaan empati (empathy mapping), arsitektur informasi, dan perumusan alur pengguna (user flow) sebelum menyentuh kanvas desain.",
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
    <section id="approach" className="py-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
        My <span className="text-purple">approach</span>
      </h2>

      <div className="my-14 flex flex-col lg:flex-row items-center justify-center gap-6">
        {phases.map((item, index) => (
          <div
            key={index}
            className="w-full lg:w-1/3 rounded-3xl border border-white/[0.1] bg-[#0c0e23] p-8 relative overflow-hidden flex flex-col justify-between min-h-[320px] hover:border-purple/50 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block rounded-full border border-purple/40 bg-purple/10 px-3 py-1 font-mono text-xs text-purple font-semibold">
                  {item.phase}
                </span>
                <span className="font-mono text-[11px] text-white/40">{item.tag}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple transition-colors">
                {item.title}
              </h3>

              <p className="text-white-100 text-xs md:text-sm mt-4 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 flex items-center gap-2 text-xs font-mono text-white/40">
              <Lightbulb size={14} className="text-purple" />
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
    <footer id="contact" className="w-full pt-20 pb-10 relative overflow-hidden">
      {/* Background Grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96 pointer-events-none opacity-20">
        <div className="h-full w-full bg-grid-white" />
      </div>

      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl">
          Ready to take <span className="text-purple">your digital experience</span> to the next level?
        </h2>
        <p className="text-white-100 text-sm md:text-base mt-4 max-w-lg font-light">
          Reach out to me today and let's discuss how I can help you craft intuitive, user-centered digital products.
        </p>

        <div className="mt-8">
          <MagicButton
            title="Let's get in touch"
            icon={<ArrowRight size={16} />}
            position="right"
            asLink
            href="mailto:firmannaza307@gmail.com"
          />
        </div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-4 border-t border-white/10 pt-8">
        <p className="md:text-sm text-xs md:font-normal font-light text-white/60 font-mono">
          Copyright &copy; {new Date().getFullYear()} Muhammad Naza Firmansyah
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          <a
            href="https://github.com/nazaa-arch"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg bg-opacity-75 bg-black-200 rounded-lg border border-white/10 hover:border-purple text-white hover:text-purple transition-colors"
          >
            <Github size={18} />
          </a>

          <a
            href="https://linkedin.com/in/nazafirman"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg bg-opacity-75 bg-black-200 rounded-lg border border-white/10 hover:border-purple text-white hover:text-purple transition-colors"
          >
            <Linkedin size={18} />
          </a>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg bg-opacity-75 bg-black-200 rounded-lg border border-white/10 hover:border-purple text-white hover:text-purple transition-colors"
          >
            <Phone size={18} />
          </a>

          <a
            href="https://portofolionaza.steamcraft.online"
            target="_blank"
            rel="noreferrer"
            aria-label="SteamCraft Portfolio"
            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg bg-opacity-75 bg-black-200 rounded-lg border border-white/10 hover:border-purple text-white hover:text-purple transition-colors"
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
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 text-white">
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
