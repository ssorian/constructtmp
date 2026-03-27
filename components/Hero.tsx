"use client";

import { CONTENT } from "@/lib/content";

const heroImg = CONTENT.hero.heroImage;

export default function Hero() {
  const scrollToQuote = () =>
    document.getElementById("quote-bot")?.scrollIntoView({ behavior: "smooth" });
  const scrollToPortfolio = () =>
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#181412", // fallback
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.70) 60%, rgba(0,0,0,0.90) 100%)" }}
      />

      {/* Ken Burns animation */}
      <div
        className="absolute inset-0 ken-burns"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 section-container px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-20">
        {/* Stat bar */}
        <p
          className="text-center text-[10px] md:text-xs font-medium tracking-widest uppercase mb-6 md:mb-10"
          style={{ color: "#94A3B8" }}
        >
          <span style={{ color: "var(--accent)" }}>{CONTENT.hero.stats.projects}</span>
          <span className="hidden sm:inline"> {" · "}{CONTENT.hero.stats.licensed}</span>
          <br className="sm:hidden" />
          <span className="sm:hidden">{CONTENT.hero.stats.licensed} {" · "}</span>
          {" · "}{CONTENT.hero.stats.experience}
          {" · "}
          <span style={{ color: "var(--accent)" }}>{CONTENT.hero.stats.rating}</span>
        </p>

        {/* Headline */}
        <h1
          className="font-display text-center leading-[0.95]"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          {CONTENT.hero.headline.part1}
          <br />
          <span style={{ color: "var(--accent)" }}>{CONTENT.hero.headline.part2}</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-center mt-6 mx-auto px-2"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#94A3B8",
            maxWidth: "42rem",
            lineHeight: "1.7",
          }}
        >
          {CONTENT.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-10">
          <button
            onClick={scrollToQuote}
            className="btn-primary w-full sm:w-auto text-base px-8 py-4 justify-center"
            id="hero-primary-cta"
          >
            {CONTENT.hero.primaryCta}
          </button>
          <button
            onClick={scrollToPortfolio}
            className="btn-outline w-full sm:w-auto text-base px-8 py-4 justify-center"
            id="hero-secondary-cta"
          >
            {CONTENT.hero.secondaryCta}
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to bottom, transparent, #181412)" }}
      />
    </section>
  );
}
