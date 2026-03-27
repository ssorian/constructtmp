import { MessageSquare, Zap, Phone } from "lucide-react";
import { CONTENT } from "@/lib/content";

const steps = [
  { ...CONTENT.howItWorks.steps[0], icon: MessageSquare },
  { ...CONTENT.howItWorks.steps[1], icon: Zap },
  { ...CONTENT.howItWorks.steps[2], icon: Phone },
];

export default function HowItWorks() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="section-container px-4 md:px-6">
        <p className="section-label text-center">{CONTENT.howItWorks.label}</p>
        <h2 className="section-title text-center mx-auto" style={{ maxWidth: "40rem" }}>
          {CONTENT.howItWorks.title}
        </h2>
        <p className="section-subtitle text-center mx-auto mb-16">
          {CONTENT.howItWorks.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "#334155" }}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-6 md:p-10"
                style={{ background: "var(--bg-primary)" }}
              >
                {/* Step number */}
                <span
                  className="font-display block mb-6 leading-none"
                  style={{
                    fontSize: "5rem",
                    color: "rgba(226,74,34,0.12)",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
                <Icon size={28} style={{ color: "var(--accent)" }} className="mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                  {step.description}
                </p>

                {/* Connector arrow (desktop only, not on last item) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-4 w-8 h-px z-10"
                    style={{ background: "var(--accent)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
