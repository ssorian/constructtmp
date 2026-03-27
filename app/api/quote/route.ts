import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers?.projectType || !answers?.size || !answers?.timeline || !answers?.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = `
You are a construction cost estimator for BR Contractors, specializing in roofing, new construction, concrete & masonry, and repairs in the US.

Based on these project details, provide a realistic cost estimate:
- Project type: ${answers.projectType}
- Additional detail: ${answers.roofType || answers.constructionType || answers.concreteType || answers.repairType || answers.otherDescription || "N/A"}
- Issue/scope: ${answers.roofIssue || answers.constructionPhase || "N/A"}
- Size: ${answers.size}
- Timeline: ${answers.timeline}
- Location: ${answers.location}
- Notes: ${answers.notes || "none"}

Respond ONLY with a valid JSON object, no markdown, no backticks, no explanation outside JSON:
{
  "low": <number, realistic low estimate in USD, no commas>,
  "high": <number, realistic high estimate in USD, no commas>,
  "summary": "<2-3 sentence personalized summary that mentions the specific project type, location, and size. Explain what's included and key cost drivers.>",
  "breakdown": ["<factor 1>", "<factor 2>", "<factor 3>"],
  "followUpHint": "<a friendly, specific opening message inviting the user to ask questions about their estimate. Mention their project type and location.>"
}
Use realistic US market prices. The range should reflect genuine variability based on location and project scope.
`.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 300,
    });

    const raw = completion.choices[0].message.content || "";

    try {
      // Strip markdown code fences if present
      const cleaned = raw.replace(/```(?:json)?\n?/g, "").trim();
      const result = JSON.parse(cleaned);
      return NextResponse.json(result);
    } catch {
      console.error("Failed to parse OpenAI response:", raw);
      return NextResponse.json({ error: "Failed to parse estimate" }, { status: 500 });
    }
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
