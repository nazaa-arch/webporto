import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useInView,
  animate,
  type MotionValue,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Sparkles,
  Layers,
  ExternalLink,
  Mail,
  Linkedin,
  Github,
  Palette,
  Compass,
  BarChart3,
  CheckCircle2,
  Phone,
  Globe,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Animation helpers ---------- */

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function GrowLine({ className }: { className: string }) {
  return (
    <motion.div
      className={`${className} origin-left`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}

function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden py-[0.04em]">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (l) => setV(Math.round(l)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

function Word({
  word,
  progress,
  range,
  to,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  to: number;
}) {
  const opacity = useTransform(progress, range, [0.15, to]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

/* ---------- Header ---------- */

function Logo() {
  return (
    <a href="#" className="flex items-center gap-3 group">
      <div className="relative flex h-9 w-9 items-center justify-center border border-foreground/20 bg-foreground/5 transition-colors group-hover:border-primary group-hover:bg-primary/10">
        <span className="font-mono text-xs font-bold tracking-tighter text-foreground group-hover:text-primary">
          NF
        </span>
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight text-foreground uppercase">
          Naza Firmansyah
        </span>
        <span className="text-[10px] text-foreground/40 font-mono tracking-wider uppercase">
          UI/UX Designer
        </span>
      </div>
    </a>
  );
}

function Header() {
  const links = [
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Awards", href: "#awards" },
    { name: "Toolkit", href: "#toolkit" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-foreground/10 bg-background/80 px-6 py-4 backdrop-blur-md md:px-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <Logo />

      <nav className="hidden items-center gap-8 md:flex">
        {links.map((l) => (
          <a
            key={l.name}
            href={l.href}
            className="text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:text-foreground"
          >
            {l.name}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="https://portofolionaza.steamcraft.online"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-primary transition-colors font-mono"
        >
          <span>steamcraft.online</span>
          <ArrowUpRight size={12} />
        </a>

        <a
          href="mailto:firmannaza307@gmail.com"
          className="clip-corner bg-primary px-5 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 flex items-center gap-2"
        >
          <span>Hire Me</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </motion.header>
  );
}

/* ---------- Hero Section ---------- */

function Hero() {
  const [activeTab, setActiveTab] = useState<"screen" | "system" | "research">("screen");

  return (
    <section className="relative min-h-screen pt-28 pb-16 px-6 md:px-16 flex flex-col justify-between overflow-hidden border-b border-foreground/10">
      {/* Background ambient grid & lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(235,64,52,0.15),rgba(255,255,255,0))]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Status Bar */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-foreground/10 pb-6 pt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <p className="text-xs font-mono text-foreground/60">
            Available for UI/UX &amp; Product Design
          </p>
        </div>
        <p className="text-xs text-foreground/50 font-mono hidden md:block">
          Sains Data UNESA • GPA 3.80/4.00
        </p>
        <p className="text-xs text-foreground/50 font-mono md:text-right">
          Surabaya &amp; Sidoarjo, Indonesia
        </p>
      </motion.div>

      {/* Main Hero Headline & Interactive Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 md:py-16">
        <div className="lg:col-span-7">
          <div className="mb-4 inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary font-mono">
            <Sparkles size={13} />
            <span>UI/UX DESIGNER &amp; PRODUCT THINKER</span>
          </div>

          <h1 className="text-[38px] sm:text-[54px] md:text-[68px] font-semibold leading-[0.98] tracking-tighter text-foreground">
            <MaskLine delay={0.3}>MUHAMMAD NAZA</MaskLine>
            <MaskLine delay={0.45}>
              <span className="text-foreground/40 font-light">FIRMANSYAH.</span>
            </MaskLine>
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed font-light"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Memadukan presisi <span className="text-foreground font-normal">analisis data</span> dengan{" "}
            <span className="text-foreground font-normal">human-centered design</span> untuk
            merancang antarmuka produk digital yang intuitif, inklusif, dan berdampak nyata.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <a
              href="#projects"
              className="clip-corner bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-primary hover:text-foreground flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight size={14} />
            </a>

            <a
              href="https://linkedin.com/in/nazafirman"
              target="_blank"
              rel="noreferrer"
              className="border border-foreground/20 px-5 py-3 text-xs font-mono uppercase tracking-wider text-foreground/80 hover:border-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://portofolionaza.steamcraft.online"
              target="_blank"
              rel="noreferrer"
              className="border border-foreground/20 px-5 py-3 text-xs font-mono uppercase tracking-wider text-foreground/80 hover:border-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Globe size={14} />
              <span>Live Ecosystem</span>
            </a>
          </motion.div>
        </div>

        {/* Hero Interactive UI Mockup Card (Replacing the old stock video!) */}
        <div className="lg:col-span-5">
          <motion.div
            className="relative rounded-lg border border-foreground/15 bg-neutral-950/80 p-5 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            {/* Top Bar of the Mockup */}
            <div className="flex items-center justify-between border-b border-foreground/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-foreground/40">
                  ThisMe_Figma_Prototype.app
                </span>
              </div>
              <span className="border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-mono text-primary">
                Silver Medalist
              </span>
            </div>

            {/* Mockup Tabs */}
            <div className="flex items-center gap-1 border-b border-foreground/10 pb-2 mb-4 text-xs font-mono">
              <button
                onClick={() => setActiveTab("screen")}
                className={`px-3 py-1 transition-colors ${
                  activeTab === "screen"
                    ? "bg-foreground/10 text-foreground border-b-2 border-primary"
                    : "text-foreground/40 hover:text-foreground/80"
                }`}
              >
                App Flow
              </button>
              <button
                onClick={() => setActiveTab("system")}
                className={`px-3 py-1 transition-colors ${
                  activeTab === "system"
                    ? "bg-foreground/10 text-foreground border-b-2 border-primary"
                    : "text-foreground/40 hover:text-foreground/80"
                }`}
              >
                Design System
              </button>
              <button
                onClick={() => setActiveTab("research")}
                className={`px-3 py-1 transition-colors ${
                  activeTab === "research"
                    ? "bg-foreground/10 text-foreground border-b-2 border-primary"
                    : "text-foreground/40 hover:text-foreground/80"
                }`}
              >
                Accessibility
              </button>
            </div>

            {/* Mockup Screen View */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded border border-foreground/10 bg-neutral-900/60 p-4">
              {activeTab === "screen" && (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                        👋
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">ThisMe (BISINDO)</div>
                        <div className="text-[10px] text-foreground/40">Modul Belajar Gestur 01</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                      Accuracy 96%
                    </span>
                  </div>

                  {/* Wireframe Mockup Preview */}
                  <div className="my-3 grid grid-cols-3 gap-2">
                    <div className="rounded border border-primary/40 bg-primary/10 p-2.5 text-center">
                      <div className="text-lg">🤟</div>
                      <div className="text-[9px] font-mono text-foreground/80 mt-1">"Halo"</div>
                      <div className="text-[8px] text-primary">Mastered</div>
                    </div>
                    <div className="rounded border border-foreground/10 bg-foreground/5 p-2.5 text-center">
                      <div className="text-lg">✋</div>
                      <div className="text-[9px] font-mono text-foreground/80 mt-1">"Terima Kasih"</div>
                      <div className="text-[8px] text-foreground/40">In Progress</div>
                    </div>
                    <div className="rounded border border-foreground/10 bg-foreground/5 p-2.5 text-center">
                      <div className="text-lg">🤞</div>
                      <div className="text-[9px] font-mono text-foreground/80 mt-1">"Semangat"</div>
                      <div className="text-[8px] text-foreground/40">Locked</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] border-t border-foreground/10 pt-2 text-foreground/50">
                    <span>30+ Screen High-Fidelity UI</span>
                    <span className="text-primary font-medium">DIMAS TI 2025</span>
                  </div>
                </div>
              )}

              {activeTab === "system" && (
                <div className="h-full flex flex-col justify-between text-xs">
                  <div>
                    <div className="font-mono text-[11px] text-foreground/50 mb-2">Color &amp; Typography Tokens</div>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="h-8 rounded bg-[#EB4034] flex items-end p-1 text-[8px] font-mono text-white">#EB4034</div>
                      <div className="h-8 rounded bg-[#1A1A1A] border border-white/20 flex items-end p-1 text-[8px] font-mono text-white">#1A1A1A</div>
                      <div className="h-8 rounded bg-[#22C55E] flex items-end p-1 text-[8px] font-mono text-white">#22C55E</div>
                      <div className="h-8 rounded bg-[#3B82F6] flex items-end p-1 text-[8px] font-mono text-white">#3B82F6</div>
                    </div>
                    <div className="space-y-1.5 font-mono text-[10px] text-foreground/70">
                      <div className="flex justify-between border-b border-foreground/5 pb-1">
                        <span>Heading 1</span>
                        <span className="text-foreground/40">Plus Jakarta Sans 64px / Bold</span>
                      </div>
                      <div className="flex justify-between border-b border-foreground/5 pb-1">
                        <span>Body Regular</span>
                        <span className="text-foreground/40">Inter 16px / 150% Line-Height</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-foreground/40">Figma Auto-Layout &amp; Variants V3</div>
                </div>
              )}

              {activeTab === "research" && (
                <div className="h-full flex flex-col justify-between text-xs">
                  <div>
                    <div className="font-semibold text-foreground mb-1">Inclusive Sign Language Experience</div>
                    <p className="text-[11px] text-foreground/60 leading-relaxed mb-3">
                      Dirancang dengan riset kebutuhan teman Tuli (Deaf community): visual feedback dengan kontras tinggi, micro-haptics, dan konfirmasi gestur tanpa audio dependency.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="border border-foreground/10 p-2 bg-foreground/5">
                        <span className="text-primary font-bold">SUS Score</span>
                        <div className="text-base text-foreground font-sans font-semibold">92.5 / 100</div>
                      </div>
                      <div className="border border-foreground/10 p-2 bg-foreground/5">
                        <span className="text-primary font-bold">Completion Rate</span>
                        <div className="text-base text-foreground font-sans font-semibold">96.8%</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-foreground/40">Usability Study with 20+ Testers</div>
                </div>
              )}
            </div>

            {/* Bottom Card Highlights */}
            <div className="mt-4 flex items-center justify-between text-xs text-foreground/50 font-mono">
              <span className="flex items-center gap-1.5">
                <Palette size={13} className="text-primary" />
                Figma Component Architecture
              </span>
              <a
                href="#projects"
                className="hover:text-foreground text-foreground/70 underline underline-offset-2 flex items-center gap-1"
              >
                Case Study <ArrowRight size={11} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Row */}
      <motion.div
        className="mt-8 grid grid-cols-2 gap-6 border-t border-foreground/10 pt-8 sm:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-mono">
            <CountUp to={30} suffix="+" />
          </p>
          <p className="text-xs text-foreground/40 mt-1 uppercase tracking-wider">Figma Interfaces</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-mono">
            <CountUp to={2} suffix=" National" />
          </p>
          <p className="text-xs text-foreground/40 mt-1 uppercase tracking-wider">UI/UX Awards</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-mono">
            3.80<span className="text-foreground/40 text-sm">/4.00</span>
          </p>
          <p className="text-xs text-foreground/40 mt-1 uppercase tracking-wider">UNESA Sains Data</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground font-mono">
            100%
          </p>
          <p className="text-xs text-foreground/40 mt-1 uppercase tracking-wider">Human-Centered</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About & Design Philosophy ---------- */

const STATEMENT_A = "Translating user behavior and data insights into seamless,".split(" ");
const STATEMENT_B = "accessible, and visually compelling product experiences that solve real problems.".split(" ");

function About() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = [
    ...STATEMENT_A.map((w) => ({ w, to: 1 })),
    ...STATEMENT_B.map((w) => ({ w, to: 0.45 })),
  ];
  const n = words.length;

  return (
    <section id="about" className="px-6 py-24 md:px-16 md:py-36 border-b border-foreground/10">
      <div className="mb-14 flex items-center gap-4">
        <GrowLine className="h-px w-12 bg-primary" />
        <FadeUp>
          <span className="text-xs uppercase tracking-widest text-primary font-mono">
            About &amp; Philosophy
          </span>
        </FadeUp>
      </div>

      <h2
        ref={ref}
        className="max-w-5xl text-[26px] font-medium leading-[1.18] tracking-tighter md:text-[50px]"
      >
        {words.map(({ w, to }, i) => (
          <Word key={i} word={w} to={to} progress={scrollYProgress} range={[i / n, (i + 1) / n]} />
        ))}
      </h2>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-foreground/10 pt-10">
        <div className="md:col-span-5">
          <FadeUp>
            <h3 className="text-lg font-semibold text-foreground tracking-tight">
              Data Scientist with a Passion for UI/UX
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60 font-light">
              Sebagai mahasiswa Sains Data di Universitas Negeri Surabaya (UNESA), saya memadukan
              dua dunia: ketajaman analisis kuantitatif dan empati desain antarmuka. Saya meyakini
              bahwa desain terbaik lahir dari perpaduan observasi pengguna yang mendalam dan data
              penggunaan yang terukur.
            </p>
          </FadeUp>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FadeUp delay={0.1}>
            <div className="border border-foreground/10 p-5 bg-foreground/[0.02]">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider mb-2">
                <Compass size={14} />
                <span>Design Process</span>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Riset Pengguna &rarr; Arsitektur Informasi &rarr; Wireframing &rarr; Design System
                &rarr; High-Fidelity Prototype &rarr; Usability Testing (SUS).
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="border border-foreground/10 p-5 bg-foreground/[0.02]">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider mb-2">
                <BarChart3 size={14} />
                <span>Data-Driven Advantage</span>
              </div>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Mampu menganalisis metrik UX, funnels konversi, heatmaps, serta melakukan evaluasi
                A/B testing untuk memastikan keputusan desain berbasis bukti nyata.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------- Featured UI/UX Projects ---------- */

function Projects() {
  const projects = [
    {
      id: "01",
      title: "This Me — BISINDO Interactive Learning App",
      badge: "Award Winner • GEMASTIK & DIMAS TI",
      category: "Mobile UI/UX • Inclusive Design • EdTech",
      role: "Lead UI/UX Designer & Researcher",
      description:
        "Perancangan aplikasi pembelajaran Bahasa Isyarat Indonesia (BISINDO) interaktif berbasis gamifikasi dan pengenalan gestur. Mengembangkan 30+ antarmuka di Figma, sistem desain komponen komprehensif, dan pengujian kegunaan untuk komunitas Tuli dan pembelajar pemula.",
      achievements: [
        "Juara 2 (Medali Perak) Lomba UI/UX DIMAS TI 2025",
        "Finalis GEMASTIK XVIII 2025 (Divisi Desain Pengalaman Pengguna)",
        "30+ High-Fidelity Screens & Complete Design System",
      ],
      tags: ["Figma", "Design System", "Accessibility", "Mobile App", "Gamification", "Prototyping"],
      link: "https://github.com/nazaa-arch/webporto",
      ctaLabel: "View Case Study",
    },
    {
      id: "02",
      title: "SteamCraft Ecosystem & Simulation Studio",
      badge: "Live Platform • Lead System Architect",
      category: "Web Platform • 3D Canvas UX • Science Sim",
      role: "UI/UX & Lead System Architect",
      description:
        "Perancangan antarmuka modular studio simulasi sains (SteamSim Lab) dan pemodelan parametrik 3D generatif (MakerCraft 3D). Mengatasi kompleksitas visualisasi multi-parameter dengan dark-mode workbench yang ergonomis dan interaktif.",
      achievements: [
        "Desain antarmuka kanvas 3D WebGL & simulator fisika/kimia",
        "Arsitektur terintegrasi lintas subdomain (steamcraft.online)",
        "Respon interaksi instan tanpa beban kognitif berlebih",
      ],
      tags: ["Web UI", "3D Modeling UX", "Workbench UI", "Complex Systems", "Design Architecture"],
      link: "https://portofolionaza.steamcraft.online",
      ctaLabel: "Visit Live Platform",
    },
    {
      id: "03",
      title: "A-KERE — Smart Personal Financial Tracker",
      badge: "Product & UI/UX",
      category: "Fintech • Mobile Application",
      role: "Product & Interaction Designer",
      description:
        "Redesain menyeluruh alur pencatatan keuangan harian untuk generasi muda. Mengurangi langkah input transaksi hingga 50% lebih efisien dan menyajikan visualisasi pembagian anggaran yang intuitif.",
      achievements: [
        "Alur pencatatan cepat 3-detik (Fast Transaction Flow)",
        "Visualisasi alokasi budget dan grafik pengeluaran real-time",
        "Peningkatan efisiensi pencatatan hingga 50%",
      ],
      tags: ["Mobile UX", "Fintech Flow", "User Journey", "Information Architecture"],
      link: "#",
      ctaLabel: "Explore Flow",
    },
    {
      id: "04",
      title: "Naza Cell POS & Retail Management Dashboard",
      badge: "Enterprise & Operations",
      category: "Desktop Dashboard • Retail POS System",
      role: "Product & System Designer",
      description:
        "Sistem dashboard kasir ritel dan manajemen inventaris untuk mengelola 100+ SKU dan transaksi layanan keuangan digital harian (PPOB, pulsa, e-money) dengan kecepatan operasional tinggi.",
      achievements: [
        "Dirancang untuk menangani 50-80 transaksi cepat per hari",
        "Arsitektur inventaris multi-supplier dengan stock tracking 100%",
        "Tata letak keyboard-friendly untuk kasir toko",
      ],
      tags: ["Dashboard Design", "POS Interface", "B2B UX", "Inventory Systems"],
      link: "#",
      ctaLabel: "View Dashboard System",
    },
  ];

  return (
    <section id="projects" className="px-6 py-24 md:px-16 md:py-36 border-b border-foreground/10">
      <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <GrowLine className="h-px w-12 bg-primary" />
            <FadeUp>
              <span className="text-xs uppercase tracking-widest text-primary font-mono">
                Featured Work
              </span>
            </FadeUp>
          </div>
          <h2 className="text-[32px] sm:text-[44px] md:text-[54px] font-semibold tracking-tighter text-foreground">
            Selected UI/UX Projects.
          </h2>
        </div>
        <p className="max-w-md text-xs font-mono text-foreground/50 leading-relaxed">
          Koleksi proyek perancangan antarmuka, studi kasus desain produk, dan sistem digital yang
          memadukan estetika dengan fungsionalitas.
        </p>
      </div>

      <div className="space-y-12">
        {projects.map((p) => (
          <FadeUp key={p.id}>
            <div className="group relative border border-foreground/15 bg-neutral-950/40 p-6 md:p-10 transition-all duration-300 hover:border-primary/50 hover:bg-neutral-950/70">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left meta & overview */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-mono text-xs text-primary font-bold">{p.id}</span>
                      <span className="border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono text-primary">
                        {p.badge}
                      </span>
                      <span className="text-xs font-mono text-foreground/40">{p.category}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>

                    <div className="mt-2 text-xs font-mono text-foreground/50">
                      Peran: <span className="text-foreground/80">{p.role}</span>
                    </div>

                    <p className="mt-4 text-sm text-foreground/70 leading-relaxed font-light">
                      {p.description}
                    </p>

                    <div className="mt-6 space-y-2 border-l-2 border-primary/30 pl-4 py-1">
                      {p.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-foreground/80">
                          <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[11px] font-mono text-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Interactive Card / Preview */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full border-t border-foreground/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:border-foreground/10 lg:pl-8">
                  <div className="rounded border border-foreground/10 bg-neutral-900/40 p-5">
                    <div className="flex items-center justify-between text-xs font-mono text-foreground/40 mb-3">
                      <span>PROJECT PREVIEW</span>
                      <Layers size={14} className="text-primary" />
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="border border-foreground/10 p-3 bg-black/40">
                        <div className="text-[10px] font-mono text-primary uppercase">Core Focus</div>
                        <div className="text-foreground/90 font-medium mt-0.5">
                          {p.id === "01" && "Gesture Usability & Inclusivity"}
                          {p.id === "02" && "Complex Parameter Workspace UI"}
                          {p.id === "03" && "3-Step Fast Financial Logging"}
                          {p.id === "04" && "Keyboard-Driven Checkout Flow"}
                        </div>
                      </div>

                      <div className="border border-foreground/10 p-3 bg-black/40">
                        <div className="text-[10px] font-mono text-primary uppercase">Tooling</div>
                        <div className="text-foreground/80 font-mono text-[11px] mt-0.5">
                          {p.id === "01" && "Figma • FigJam • Maze Testing • Color Contrast WCAG"}
                          {p.id === "02" && "Figma UI • WebGL Canvas • Modern Dark Theme"}
                          {p.id === "03" && "Figma Interactive Components • Micro-interactions"}
                          {p.id === "04" && "Figma Dashboard Design • Information Hierarchy"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <a
                      href={p.link}
                      target={p.link.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 clip-corner bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <span>{p.ctaLabel}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------- Awards & Recognitions ---------- */

function Awards() {
  const awards = [
    {
      year: "2025",
      title: "Juara 2 Lomba UI/UX DIMAS TI (Medali Perak)",
      issuer: "DIMAS TI National Competition",
      desc: "Meraih Medali Perak dalam perancangan antarmuka 'This Me', aplikasi pembelajaran Bahasa Isyarat Indonesia (BISINDO) interaktif berbasis Figma.",
      highlight: true,
    },
    {
      year: "2025",
      title: "Finalis GEMASTIK XVIII (Divisi UX Design)",
      issuer: "Puspresnas / Balai Pengembangan Talenta Indonesia",
      desc: "Terpilih mewakili Universitas Negeri Surabaya (UNESA) dalam kompetisi bergengsi GEMASTIK XVIII melalui karya desain pengalaman pengguna 'This Me'.",
      highlight: true,
    },
    {
      year: "2026",
      title: "Finalis Gayatama International Competition",
      issuer: "Gayatama International",
      desc: "Bidang Food Science Communication & Product Branding.",
      highlight: false,
    },
    {
      year: "2022 - 2024",
      title: "Perwakilan Sekolah OSN Bidang Informatika",
      issuer: "PUSPRESNAS - Kementerian Pendidikan & Kebudayaan",
      desc: "Terpilih mewakili sekolah dalam Olimpiade Sains Nasional bidang Informatika selama dua periode berturut-turut.",
      highlight: false,
    },
  ];

  return (
    <section id="awards" className="px-6 py-24 md:px-16 md:py-36 border-b border-foreground/10">
      <div className="mb-16 flex items-center gap-4">
        <GrowLine className="h-px w-12 bg-primary" />
        <FadeUp>
          <span className="text-xs uppercase tracking-widest text-primary font-mono">
            Recognition &amp; Honors
          </span>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <h2 className="text-[32px] sm:text-[44px] font-semibold tracking-tighter text-foreground">
            Proven Track Record in UI/UX Competitions.
          </h2>
          <p className="mt-4 text-sm text-foreground/60 leading-relaxed font-light">
            Pengakuan kompetitif di tingkat nasional yang memvalidasi kedalaman metodologi riset,
            kualitas visual, dan kemampuan eksekusi prototype.
          </p>

          <div className="mt-8 border border-primary/30 bg-primary/10 p-5 rounded">
            <div className="flex items-center gap-3">
              <Award size={28} className="text-primary" />
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Silver Medalist &amp; Finalist
                </div>
                <div className="text-xs text-foreground/60 font-mono">
                  DIMAS TI 2025 &amp; GEMASTIK XVIII
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 divide-y divide-foreground/10 border-y border-foreground/10">
          {awards.map((a, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary">{a.year}</span>
                    {a.highlight && (
                      <span className="bg-primary/20 text-primary text-[10px] font-mono px-2 py-0.5 rounded">
                        National Award
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-xs font-mono text-foreground/40">{a.issuer}</p>
                  <p className="text-xs text-foreground/60 leading-relaxed pt-1 max-w-xl">
                    {a.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills & Toolkit ---------- */

function Toolkit() {
  const skillCategories = [
    {
      title: "UI/UX & Product Design",
      skills: [
        "User Interface (UI) Design",
        "User Experience (UX) Research",
        "Interactive Prototyping",
        "Design Systems & Token Architecture",
        "Wireframing & User Flows",
        "Usability Testing (SUS Method)",
        "Information Architecture",
        "Accessibility (WCAG 2.1)",
      ],
    },
    {
      title: "Design & Dev Tools",
      skills: [
        "Figma (Auto-layout, Components, Variables)",
        "FigJam (Brainstorming & User Journeys)",
        "Adobe Illustrator",
        "HTML5 / Modern CSS / Tailwind",
        "React & Framer Motion",
        "Git & GitHub Workflow",
        "Prototyping Tools",
      ],
    },
    {
      title: "Data Science & Analytical Edge",
      skills: [
        "Python (Pandas, Scikit-Learn)",
        "Data-Informed UX Decision Making",
        "SQL & Relational Database Design",
        "A/B Testing Mindset",
        "User Behavior Analytics",
        "Statistical Problem Solving",
      ],
    },
  ];

  return (
    <section id="toolkit" className="px-6 py-24 md:px-16 md:py-36 border-b border-foreground/10">
      <div className="mb-16 flex items-center gap-4">
        <GrowLine className="h-px w-12 bg-primary" />
        <FadeUp>
          <span className="text-xs uppercase tracking-widest text-primary font-mono">
            Toolkit &amp; Capabilities
          </span>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((cat, idx) => (
          <FadeUp key={cat.title} delay={idx * 0.15}>
            <div className="border border-foreground/15 bg-neutral-950/40 p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-primary">0{idx + 1}</span>
                <h3 className="text-lg font-semibold text-foreground tracking-tight mt-1 mb-5">
                  {cat.title}
                </h3>
                <ul className="space-y-2.5">
                  {cat.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-xs text-foreground/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact Section & Footer ---------- */

function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:px-16 md:py-36 relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="mb-16 flex items-center gap-4">
        <GrowLine className="h-px w-12 bg-primary" />
        <FadeUp>
          <span className="text-xs uppercase tracking-widest text-primary font-mono">
            Get In Touch
          </span>
        </FadeUp>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <h2 className="text-[36px] sm:text-[54px] md:text-[68px] font-semibold leading-[0.98] tracking-tighter text-foreground">
            LET'S CREATE SOMETHING
            <br />
            <span className="text-primary">EXCEPTIONAL.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base text-foreground/60 leading-relaxed font-light">
            Terbuka untuk kolaborasi proyek UI/UX design, perancangan aplikasi web &amp; mobile,
            serta peluang magang / pekerjaan profesional.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:firmannaza307@gmail.com"
              className="clip-corner bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Mail size={15} />
              <span>firmannaza307@gmail.com</span>
            </a>

            <a
              href="https://wa.me/6285236019625"
              target="_blank"
              rel="noreferrer"
              className="border border-foreground/20 px-6 py-3 text-xs font-mono uppercase tracking-wider text-foreground hover:border-foreground transition-colors flex items-center gap-2"
            >
              <Phone size={15} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 border border-foreground/15 bg-neutral-950/60 p-6 space-y-4">
          <div className="text-xs font-mono text-foreground/40 uppercase">Direct Channels</div>

          <div className="space-y-3 text-xs">
            <a
              href="https://linkedin.com/in/nazafirman"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between py-2 border-b border-foreground/10 text-foreground/80 hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-2 font-mono">
                <Linkedin size={14} /> linkedin.com/in/nazafirman
              </span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="https://github.com/nazaa-arch"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between py-2 border-b border-foreground/10 text-foreground/80 hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-2 font-mono">
                <Github size={14} /> github.com/nazaa-arch
              </span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="https://portofolionaza.steamcraft.online"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between py-2 border-b border-foreground/10 text-foreground/80 hover:text-primary transition-colors"
            >
              <span className="flex items-center gap-2 font-mono">
                <Globe size={14} /> portofolionaza.steamcraft.online
              </span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="pt-2 text-[11px] font-mono text-foreground/40">
            Tawangsari, Taman, Sidoarjo • Jawa Timur, Indonesia
          </div>
        </div>
      </div>

      <footer className="mt-24 border-t border-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground/40">
        <div>
          &copy; {new Date().getFullYear()} Muhammad Naza Firmansyah. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-foreground transition-colors">
            Back to Top
          </a>
        </div>
      </footer>
    </section>
  );
}

/* ---------- Main Component ---------- */

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Awards />
          <Toolkit />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}
