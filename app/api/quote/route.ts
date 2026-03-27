import { NextResponse } from "next/server";

// Estimates are now computed client-side from the static pricing table in lib/content.ts.
// This endpoint is no longer used.
export function POST() {
  return NextResponse.json({ error: "Not used" }, { status: 410 });
}
