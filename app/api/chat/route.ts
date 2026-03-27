import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

export async function POST(req: NextRequest) {
  try {
    const { answers, result, messages } = await req.json();

    if (!answers || !result || !messages) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const context = `
You are a helpful assistant for BR Contractors, a construction company.
The user just received a quote estimate with this context:
- Project type: ${answers.projectType}
- Size: ${answers.size}
- Timeline: ${answers.timeline}
- Location: ${answers.location}
- Additional notes: ${answers.notes || "none"}
- Estimated range: $${fmt(result.low)} – $${fmt(result.high)}
- Summary: ${result.summary}

Now answer follow-up questions from the user. Be concise (2-3 sentences max), helpful, and professional. If asked about pricing, refer to the estimate. If asked something you can't know without an inspection, say so honestly.
`.trim();

    // Map the messages to the OpenAI expected format
    const apiMessages = [
      { role: "system", content: context },
      { role: "assistant", content: "Understood. I'm ready to answer follow-up questions about the estimate." },
      ...messages.map((m: any) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: apiMessages as any,
      temperature: 0.5,
      max_tokens: 300,
    });

    const reply = completion.choices[0].message.content || "I'm not sure, but feel free to call us for more details.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
