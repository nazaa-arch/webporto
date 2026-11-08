/* -------------------------------------------------------------------------- */
/*   Kelarify: client web-design project. Promo posters show the website I    */
/*   designed (desktop + mobile) and the animated owl mascot.                  */
/*   The 5 MB mascot video only loads and plays while it is on screen.        */
/* -------------------------------------------------------------------------- */

import { useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;
const asset = (f: string) => `${BASE}work/kelarify/${f}`;

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Muted looping video that loads lazily and plays only while visible. */
function LazyVideo({ label }: { label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || reduceMotion() || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={asset("mascot.mp4")}
      poster={asset("poster.jpg")}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}

function Phone({ video, src, alt, className = "" }: { video?: boolean; src?: string; alt?: string; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        {video ? (
          <LazyVideo label="Kelarify owl mascot greeting animation" />
        ) : (
          <img src={asset(src ?? "poster.jpg")} alt={alt ?? ""} loading="lazy" decoding="async" />
        )}
        <span className="phone-island" aria-hidden="true" />
      </div>
    </div>
  );
}

function Browser({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={`bmock kel-window ${className}`}>
      <div className="bmock-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>kelarify.store</span>
      </div>
      <div className="kel-window-screen">
        <img src={asset(src)} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      </div>
    </div>
  );
}

function Brand() {
  return (
    <span className="promo-brand">
      Kela<b>rify</b>
    </span>
  );
}

const tiles = [
  { title: "Hi, I’m Kelarify!", sub: "An animated owl mascot greets every visitor", chip: "10-second loop" },
  { title: "A calm, trustworthy landing page", sub: "Deep-teal hero with clear actions" },
  { title: "Made for thumbs, too", sub: "Responsive layout with full-width actions" },
];

export function KelarifyTile({ index, size = "card" }: { index: number; size?: "card" | "large" }) {
  const t = tiles[index];
  return (
    <div className={`promo promo-kelarify promo-${size} kel-${index}`}>
      <div className="promo-copy">
        <Brand />
        <strong className="promo-title">{t.title}</strong>
        <span className="promo-sub">{t.sub}</span>
        {t.chip && <span className="promo-chip kel-chip">{t.chip}</span>}
      </div>

      {index === 0 && <Phone video className="kel-phone" />}

      {index === 1 && (
        <div className="kel-windows">
          <Browser src="web-priority.jpg" alt="" className="kel-window-back" />
          <Browser src="web-hero.jpg" alt="Kelarify website landing page, desktop" className="kel-window-front" />
        </div>
      )}

      {index === 2 && (
        <div className="kel-phones">
          <Phone src="mobile-queue.jpg" alt="" className="kel-phone-back" />
          <Phone src="mobile-hero.jpg" alt="Kelarify website on a phone" className="kel-phone-front" />
        </div>
      )}
    </div>
  );
}

export function KelarifyStage() {
  return (
    <div className="kel-stage">
      <div className="kel-stage-copy">
        <span className="kel-kicker">Client project · Web design</span>
        <Brand />
        <strong>Website design for Kelarify</strong>
        <span>Landing page, responsive mobile layout and an animated owl mascot, in one deep-teal and gold system.</span>
      </div>
      <div className="kel-stage-art">
        <Browser src="web-hero.jpg" alt="Kelarify website landing page, desktop" className="kel-stage-window" eager />
        <Phone src="mobile-hero.jpg" alt="Kelarify website on a phone" className="kel-stage-phone" />
      </div>
    </div>
  );
}
