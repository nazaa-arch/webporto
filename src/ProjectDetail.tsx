import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projectDetails, type ProjectDetail as Project } from "./projects";
import { PromoStage, PromoTile, thisMePromos, thisMeScreens } from "./MobileMock";

const BASE = import.meta.env.BASE_URL;
const img = (folder: string, file: string) => `${BASE}work/${folder}/${file}`;

export const projectHref = (slug: string) => `${BASE}?project=${slug}`;

/** Browser-window frame around a screenshot (or a placeholder when none exists yet). */
function Frame({
  project,
  file,
  label,
  index,
  eager = false,
}: {
  project: Project;
  file: string;
  label: string;
  index: number;
  eager?: boolean;
}) {
  const url = project.link?.display ?? project.name.toLowerCase().replace(/\s+/g, "-");
  return (
    <figure className="pd-frame">
      <div className="pd-frame-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      <div className="pd-frame-body">
        {project.folder ? (
          <img
            src={img(project.folder, file)}
            alt={`${project.name}: ${label}`}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div className={`pd-ph pd-ph-${index % 3}`}>
            <span>
              0{index + 1} / {label}
            </span>
            <strong>{project.name}</strong>
          </div>
        )}
      </div>
    </figure>
  );
}

export default function ProjectDetail({
  project,
  onNavigate,
}: {
  project: Project;
  onNavigate: (slug: string | null) => void;
}) {
  const idx = projectDetails.findIndex((p) => p.slug === project.slug);
  const next = projectDetails[(idx + 1) % projectDetails.length];

  useEffect(() => {
    document.documentElement.classList.remove("intro");
    const prev = document.title;
    document.title = `${project.name} — Naza Firmansyah`;
    return () => {
      document.title = prev;
    };
  }, [project]);

  // internal links: keep it a single-page app, but stay real <a href>s
  const go = (slug: string | null) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(slug);
  };

  return (
    <div className="pd" key={project.slug}>
      <header className="nav scrolled pd-nav">
        <a className="nav-logo" href={BASE} onClick={go(null)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" strokeDasharray="9.6 4.54" strokeDashoffset="-2.27" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <span>Naza Firmansyah</span>
        </a>
        <a className="btn-secondary pd-back-top" href={`${BASE}#work`} onClick={go(null)}>
          <ArrowLeft size={15} /> All works
        </a>
      </header>

      <main className="pd-main">
        {/* ---------- Intro ---------- */}
        <section className="container wide pd-hero">
          <div className="pd-hero-text">
            <p className="pd-step">
              Project {String(idx + 1).padStart(2, "0")} <span>/ {String(projectDetails.length).padStart(2, "0")}</span>
            </p>
            <p className="work-tags">{project.tags}</p>
            <h1 className="pd-title">{project.name}</h1>
            <p className="pd-lead">{project.lead}</p>
          </div>

          <aside className="pd-meta" aria-label="Project facts">
            <dl>
              {project.meta.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>
                    {m.value === "Live" && <span className="eco-dot" aria-hidden="true" />}
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
            {project.link && (
              <a className="btn-primary pd-visit" href={project.link.href} target="_blank" rel="noopener noreferrer">
                {project.link.label} <ArrowUpRight size={15} />
              </a>
            )}
          </aside>
        </section>

        {/* ---------- Cover ---------- */}
        <section className="container wide pd-cover">
          {project.mobile ? (
            <PromoStage
              screens={[thisMeScreens.home, thisMeScreens.loading, thisMeScreens.alphabet]}
              title="Sign language, made friendly"
              sub="A BISINDO learning app with video lessons, daily progress and camera practice."
            />
          ) : (
            <Frame project={project} file="cover.jpg" label={project.features[0].title} index={0} eager />
          )}
        </section>

        {/* ---------- Overview ---------- */}
        <section className="container wide pd-overview">
          <h2 className="pd-label">Overview</h2>
          <div className="pd-overview-body">
            {project.overview.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <ul className="pd-highlights" aria-label="Highlights">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Key screens ---------- */}
        <section className="container wide pd-features" aria-labelledby="pd-features-title">
          <h2 className="pd-label" id="pd-features-title">
            Key screens
          </h2>
          {project.features.map((f, i) => (
            <article className={`pd-feature ${i % 2 ? "flip" : ""}`} key={f.title}>
              {project.mobile ? (
                <PromoTile promo={thisMePromos[i]} size="large" />
              ) : (
                <Frame project={project} file={`${i + 1}.jpg`} label={f.title} index={i} />
              )}
              <div className="pd-feature-text">
                <span className="pd-num">0{i + 1}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </article>
          ))}
        </section>

        {/* ---------- Next project ---------- */}
        <section className="container wide pd-next-wrap">
          <a className="pd-next" href={projectHref(next.slug)} onClick={go(next.slug)}>
            <div className="pd-next-text">
              <span className="pd-next-label">Next project</span>
              <strong>{next.name}</strong>
              <span className="pd-next-tags">{next.tags}</span>
              <span className="pd-next-cta">
                View case study <ArrowRight size={16} />
              </span>
            </div>
            <div className="pd-next-thumb" aria-hidden="true">
              {next.mobile ? (
                <PromoTile promo={thisMePromos[0]} />
              ) : next.folder ? (
                <img src={img(next.folder, "cover.jpg")} alt="" loading="lazy" decoding="async" />
              ) : (
                <div className="pd-ph pd-ph-1">
                  <strong>{next.name}</strong>
                </div>
              )}
            </div>
          </a>
        </section>

        <footer className="container wide footer pd-footer">
          <span>&copy; {new Date().getFullYear()} Muhammad Naza Firmansyah</span>
          <a href={`${BASE}#work`} onClick={go(null)}>
            Back to all works <ArrowUpRight size={16} />
          </a>
        </footer>
      </main>
    </div>
  );
}
