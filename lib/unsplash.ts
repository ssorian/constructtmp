/**
 * Curated construction & architecture photo IDs from Picsum Photos.
 * https://picsum.photos — free, no API key, stable, CDN-backed.
 *
 * NOTE: Picsum does NOT support keyword search. We map semantic names
 * to specific numeric IDs that match the visual intent. All IDs confirmed
 * to return construction/architecture/outdoor imagery.
 */

// Specific image ID map for each page section
const PHOTO_IDS: Record<string, number> = {
  // Hero — dramatic construction site / industrial
  "hero-bg": 1078,
  // Services
  "svc-roof": 209,        // aerial architecture / rooftop
  "svc-newcon": 164,      // concrete structure / building
  "svc-concrete": 1060,   // concrete / stone surface
  // Portfolio
  "port-1": 157,          // residential building exterior
  "port-2": 279,          // modern house / construction
  "port-3": 1067,         // road / concrete / infrastructure
  // Why Us
  "whyus-bg": 318,        // people working / team outdoors
};

/**
 * Returns a Picsum Photos URL with a fixed seed image ID.
 * Use in components that need placeholder construction imagery.
 *
 * Instead of next/image, use <img> with loading="lazy" or CSS background-image.
 */
export function unsplashUrl(
  _query: string,   // kept for API compat — Picsum doesn't use queries
  width: number,
  height: number,
  seed: string
): string {
  const id = PHOTO_IDS[seed];
  if (id !== undefined) {
    return `https://picsum.photos/id/${id}/${width}/${height}`;
  }
  // Fallback: deterministic hash-based ID from seed string
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return `https://picsum.photos/id/${(hash % 800) + 100}/${width}/${height}`;
}

/**
 * Generates a UI Avatars URL with client initials on the accent background.
 * Used for testimonial placeholder avatars — no legal risk vs. real portraits.
 */
export function avatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=F5A623&color=000000&size=80&bold=true`;
}
