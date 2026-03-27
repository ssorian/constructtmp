import { ArrowRight } from "lucide-react";
import { unsplashUrl } from "@/lib/unsplash";
import { CONTENT } from "@/lib/content";

const services = CONTENT.services.items;

export default function Services() {
  return (
    <section id="services" className="section-padding" style={{ background: "#020817" }}>
      <div className="section-container px-4 md:px-6">
        <p className="section-label">{CONTENT.services.label}</p>
        <h2 className="section-title">{CONTENT.services.title}</h2>
        <p className="section-subtitle mb-12">
          {CONTENT.services.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => (
            <article
              key={svc.id}
              className="card group cursor-pointer"
              style={{ background: "var(--bg-secondary)" }}
            >
              {/* Image */}
              <div
                className="relative h-48 overflow-hidden img-container"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={unsplashUrl(svc.query, 800, 500, svc.seed)}
                  alt={svc.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute bottom-0 inset-x-0 h-16"
                  style={{ background: "linear-gradient(to bottom, transparent, var(--bg-secondary))" }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="font-display text-2xl text-white uppercase mb-3"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#94A3B8" }}>
                  {svc.description}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-200"
                  style={{ color: "var(--accent)" }}
                >
                  {CONTENT.services.learnMore} <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
