import { NextResponse } from "next/server";

// Follow-up chat was removed. No AI services are used in this project.
export function POST() {
  return NextResponse.json({ error: "Not used" }, { status: 410 });
}
