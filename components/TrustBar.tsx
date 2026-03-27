import { CheckCircle2 } from "lucide-react";

import { CONTENT } from "@/lib/content";

const items = CONTENT.trustBar;

export default function TrustBar() {
  return (
    <section
      className="w-full py-5"
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div
        className="section-container px-4 md:px-6 flex flex-wrap justify-center gap-x-8 gap-y-3"
      >
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircle2 size={14} style={{ color: "var(--accent)" }} aria-hidden="true" />
            <span
              className="text-sm font-medium whitespace-nowrap"
              style={{ color: "#94A3B8" }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
