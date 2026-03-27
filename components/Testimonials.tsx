import { Star } from "lucide-react";
import { avatarUrl } from "@/lib/unsplash";
import { CONTENT } from "@/lib/content";

const testimonials = CONTENT.testimonials.items;

export default function Testimonials() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="section-container px-4 md:px-6">
        <p className="section-label text-center">{CONTENT.testimonials.label}</p>
        <h2 className="section-title text-center mx-auto" style={{ maxWidth: "36rem" }}>
          {CONTENT.testimonials.title}
        </h2>
        <p className="section-subtitle text-center mx-auto mb-12">
          {CONTENT.testimonials.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="p-7 rounded-xl"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--accent)" style={{ color: "var(--accent)" }} />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-sm leading-relaxed mb-6 italic"
                style={{ color: "#CBD5E1" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-3">
                <img
                  src={avatarUrl(t.name)}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="rounded-full flex-shrink-0"
                />
                <div>
                  <p className="font-bold text-sm text-white">{t.name}</p>
                  <p className="text-xs" style={{ color: "#94A3B8" }}>
                    {t.location} · {t.project}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
