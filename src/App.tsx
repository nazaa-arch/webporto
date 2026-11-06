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
import { ArrowRight, Gauge, Globe, Clock, Ship } from "lucide-react";

const VIDEO_SRC = "https://go.screenpal.com/player/stream/cOeifenZ3wA";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ---------- Animation helpers ---------- */

/** Fade + naik saat masuk viewport */
function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Garis yang memanjang dari kiri */
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

/** Teks naik dari balik mask (untuk headline hero) */
function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden py-[0.04em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Angka menghitung naik saat terlihat */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (l) => setV(Math.round(l)) });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/** Satu kata yang "menyala" mengikuti progres scroll */
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
  const opacity = useTransform(progress, range, [0.12, to]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

/* ---------- Sections ---------- */

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <polygon points="16,1 29,8.5 29,23.5 16,31 3,23.5 3,8.5" stroke="white" strokeWidth="1.2" fill="none" />
        <line x1="3" y1="8.5" x2="29" y2="23.5" stroke="white" strokeWidth="0.8" />
        <line x1="29" y1="8.5" x2="3" y2="23.5" stroke="white" strokeWidth="0.8" />
        <line x1="16" y1="1" x2="16" y2="31" stroke="white" strokeWidth="0.8" />
      </svg>
      <span className="text-xl font-medium uppercase tracking-tighter">Targo</span>
    </a>
  );
}

function Header() {
  const links = ["Home", "About", "Contact Us"];
  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-8 py-6 md:px-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
    >
      <Logo />
      <nav className="hidden items-center gap-10 md:flex">
        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="relative text-sm text-foreground/80 transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {l}
          </a>
        ))}
      </nav>
      <motion.a
        href="#"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="clip-corner bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Contact Us
      </motion.a>
    </motion.header>
  );
}

function Hero() {
  const info = [
    "Worldwide Logistics",
    "Premium freight solutions by Targo",
    "Delivering excellence across continents with precision and care.",
  ];
  const ctas = [
    { label: "Get a Quote", border: true },
    { label: "Track Shipment", border: false },
  ];
  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden">
      <video className="absolute inset-0 h-full w-full object-cover" src={VIDEO_SRC} autoPlay loop muted playsInline />

      <div className="absolute inset-x-0 top-24 px-8 md:px-16">
        <motion.div
          className="grid grid-cols-1 gap-4 border-b border-foreground/10 pb-6 md:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } } }}
        >
          {info.map((t) => (
            <motion.p
              key={t}
              className="text-xs text-foreground/50"
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
            >
              {t}
            </motion.p>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-20 px-8 md:px-16">
        <div className="flex items-end gap-6">
          <motion.span
            className="mb-2 hidden text-xs text-foreground/30 md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            001
          </motion.span>
          <h1 className="text-[40px] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[72px]">
            <MaskLine delay={0.5}>Swift and Simple</MaskLine>
            <MaskLine delay={0.65}>Transport.</MaskLine>
          </h1>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 border-t border-foreground/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
      >
        <div className="flex">
          {ctas.map(({ label, border }) => (
            <a
              key={label}
              href="#"
              className={`group flex flex-1 items-center justify-between px-8 py-5 transition-colors hover:bg-foreground/5 md:px-16 ${
                border ? "border-r border-foreground/10" : ""
              }`}
            >
              <span className="text-sm text-foreground/80">{label}</span>
              <ArrowRight
                size={16}
                className="text-foreground/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
              />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

const HEADLINE_A = "From express deliveries to full-scale freight operations,".split(" ");
const HEADLINE_B = "Targo offers an exceptional network and trusted, personalised service.".split(" ");

function About() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = [
    ...HEADLINE_A.map((w) => ({ w, to: 1 })),
    ...HEADLINE_B.map((w) => ({ w, to: 0.4 })),
  ];
  const n = words.length;
  return (
    <section className="px-8 py-24 md:px-16 md:py-36">
      <div className="mb-16 flex items-center gap-4">
        <GrowLine className="h-px w-10 bg-foreground/30" />
        <FadeUp>
          <span className="text-xs uppercase tracking-widest text-foreground/50">About Us</span>
        </FadeUp>
      </div>
      <h2
        ref={ref}
        className="max-w-5xl text-[28px] font-medium leading-[1.1] tracking-tighter md:text-[56px]"
      >
        {words.map(({ w, to }, i) => (
          <Word key={i} word={w} to={to} progress={scrollYProgress} range={[i / n, (i + 1) / n]} />
        ))}
      </h2>
      <div className="mt-16 border-t border-foreground/10 pt-8">
        <FadeUp>
          <p className="max-w-lg text-sm leading-relaxed text-foreground/50">
            Our comprehensive logistics solutions include air freight, sea freight, road transport,
            warehousing, and customs brokerage — all tailored to your unique supply chain requirements.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function Fleet() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const stats = [
    { Icon: Gauge, label: "Routes", node: <CountUp to={150} suffix="+" /> },
    { Icon: Globe, label: "Countries", node: <CountUp to={80} /> },
    { Icon: Clock, label: "Support", node: <>24/7</> },
  ];

  return (
    <section className="px-8 py-24 md:px-16 md:py-36">
      <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <GrowLine className="h-px w-10 bg-primary" />
          <FadeUp>
            <span className="text-xs uppercase tracking-widest text-primary">Our Fleet</span>
          </FadeUp>
        </div>
        <FadeUp delay={0.1} className="flex items-center gap-3">
          {["Get a Quote", "Our Services"].map((label) => (
            <motion.a
              key={label}
              href="#"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-primary px-5 py-2 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {label}
            </motion.a>
          ))}
        </FadeUp>
      </div>

      <div ref={stageRef} className="relative flex items-center justify-center py-20">
        <motion.span
          style={{ y: parallaxY }}
          className="pointer-events-none absolute select-none text-[100px] font-medium uppercase tracking-tighter text-foreground/[0.04] md:text-[200px]"
        >
          Targo
        </motion.span>

        <motion.div
          className="relative flex aspect-[2.2/1] w-full max-w-xl items-center justify-center rounded-[50%] border border-foreground/10"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <Ship size={120} strokeWidth={1} className="text-foreground/20" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.span
          className="absolute bottom-8 text-xs uppercase tracking-widest text-foreground/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Global Fleet
        </motion.span>
        <motion.span
          className="absolute left-0 hidden rotate-180 text-xs uppercase tracking-widest text-foreground/20 [writing-mode:vertical-lr] md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Freight Class
        </motion.span>
      </div>

      <motion.div
        className="mt-8 grid grid-cols-1 items-start gap-8 border-t border-foreground/10 pt-8 md:grid-cols-[1fr_auto_auto]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}>
          <h3 className="mb-2 text-lg font-medium text-foreground">Express Air Freight</h3>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/40">
            Time-critical shipments delivered globally with guaranteed schedules and real-time tracking
            across our premium carrier network.
          </p>
        </motion.div>

        <motion.div
          className="flex gap-8"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
        >
          {stats.map(({ Icon, label, node }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} strokeWidth={1.5} className="text-foreground/30" />
              <div>
                <p className="text-sm font-medium tabular-nums text-foreground">{node}</p>
                <p className="text-xs text-foreground/40">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full border border-foreground/20 px-5 py-2 text-xs text-foreground/50 transition-colors hover:border-foreground hover:text-foreground"
        >
          View Details
        </motion.a>
      </motion.div>
    </section>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <About />
          <Fleet />
        </main>
      </div>
    </MotionConfig>
  );
}
