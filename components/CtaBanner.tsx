"use client";

import { CONTENT } from "@/lib/content";

export default function CtaBanner() {
  const scrollToQuote = () =>
    document.getElementById("quote-bot")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="section-padding"
      style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}
    >
      <div className="section-container px-6 text-center">
        <h2
          className="font-display text-white mb-4"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
        >
          {CONTENT.ctaBanner.title}
        </h2>
        <p className="section-subtitle mx-auto mb-8">
          {CONTENT.ctaBanner.subtitle}
        </p>
        <button
          onClick={scrollToQuote}
          className="btn-primary text-lg px-10 py-5 mx-auto"
          id="cta-banner-button"
        >
          {CONTENT.ctaBanner.button}
        </button>
      </div>
    </section>
  );
}
