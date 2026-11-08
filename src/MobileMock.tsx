/* -------------------------------------------------------------------------- */
/*   Mobile app presentation: a CSS phone frame and promo tiles that place    */
/*   real app screens (images or a looping video) on a brand-coloured stage.  */
/* -------------------------------------------------------------------------- */

const BASE = import.meta.env.BASE_URL;

export type Screen = {
  label: string;
  src: string; // path under public/
  video?: boolean;
  poster?: string;
};

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function PhoneMock({ screen, className = "" }: { screen: Screen; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        {screen.video ? (
          <video
            src={`${BASE}${screen.src}`}
            poster={screen.poster ? `${BASE}${screen.poster}` : undefined}
            autoPlay={!reduceMotion()}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={screen.label}
          />
        ) : (
          <img src={`${BASE}${screen.src}`} alt={screen.label} loading="lazy" decoding="async" />
        )}
        <span className="phone-island" aria-hidden="true" />
      </div>
    </div>
  );
}

export type Promo = {
  tone: "navy" | "sky" | "indigo";
  title: string;
  sub?: string;
  chip?: string;
  screen: Screen;
};

/** One screen on a brand stage: headline left, phone rising from the bottom right. */
export function PromoTile({ promo, size = "card" }: { promo: Promo; size?: "card" | "large" }) {
  return (
    <div className={`promo promo-${promo.tone} promo-${size}`}>
      <div className="promo-copy">
        <span className="promo-brand">
          This <b>Me</b>
        </span>
        <strong className="promo-title">{promo.title}</strong>
        {promo.sub && <span className="promo-sub">{promo.sub}</span>}
      </div>
      <PhoneMock screen={promo.screen} className="promo-phone" />
      {promo.chip && <span className="promo-chip">{promo.chip}</span>}
    </div>
  );
}

/** Wide cover: three phones fanned out on the navy stage. */
export function PromoStage({ screens, title, sub }: { screens: [Screen, Screen, Screen]; title: string; sub: string }) {
  return (
    <div className="promo-stage">
      <div className="promo-stage-copy">
        <span className="promo-brand">
          This <b>Me</b>
        </span>
        <strong>{title}</strong>
        <span>{sub}</span>
      </div>
      <div className="promo-stage-phones">
        <PhoneMock screen={screens[0]} className="fan fan-l" />
        <PhoneMock screen={screens[1]} className="fan fan-c" />
        <PhoneMock screen={screens[2]} className="fan fan-r" />
      </div>
    </div>
  );
}

/* ------------------------------ This Me data ------------------------------ */

export const thisMeScreens = {
  loading: {
    label: "This Me animated loading screen",
    src: "work/thisme/loading.mp4",
    video: true,
    poster: "work/thisme/poster.jpg",
  },
  home: { label: "This Me learning home with daily progress", src: "work/thisme/home.jpg" },
  alphabet: { label: "This Me alphabet lesson with video demonstration", src: "work/thisme/alphabet.jpg" },
} satisfies Record<string, Screen>;

export const thisMePromos: [Promo, Promo, Promo] = [
  {
    tone: "navy",
    title: "Learn sign language, one gesture at a time",
    sub: "Indonesian Sign Language (BISINDO)",
    screen: thisMeScreens.loading,
  },
  {
    tone: "sky",
    title: "Daily progress that keeps you going",
    sub: "Alphabet, numbers, phrases & conversation",
    chip: "75% daily progress",
    screen: thisMeScreens.home,
  },
  {
    tone: "indigo",
    title: "Practise every letter with real video",
    sub: "Watch, copy and track each sign",
    chip: "Letter A · 80% complete",
    screen: thisMeScreens.alphabet,
  },
];
