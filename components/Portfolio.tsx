import { unsplashUrl } from "@/lib/unsplash";
import { CONTENT } from "@/lib/content";

const projects = CONTENT.portfolio.projects;

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding" style={{ background: "#020817" }}>
      <div className="section-container px-4 md:px-6">
        <p className="section-label">{CONTENT.portfolio.label}</p>
        <h2 className="section-title">{CONTENT.portfolio.title}</h2>
        <p className="section-subtitle mb-12">
          {CONTENT.portfolio.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="relative rounded-xl overflow-hidden h-72 group cursor-pointer img-container"
              style={{
                backgroundImage: `url(${unsplashUrl(project.query, 900, 600, project.seed)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Base overlay */}
              <div
                className="absolute inset-0 transition-colors duration-300"
                style={{ background: "rgba(0,0,0,0.50)" }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0,0,0,0.25)" }} />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-sm"
                  style={{ background: "var(--accent)", color: "#FFFFFF", letterSpacing: "0.05em" }}
                >
                  {project.badge}
                </span>
              </div>

              {/* Info */}
              <div
                className="absolute bottom-0 inset-x-0 p-5 z-10"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}
              >
                <p className="text-white font-bold text-base leading-tight">{project.title}</p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {project.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
