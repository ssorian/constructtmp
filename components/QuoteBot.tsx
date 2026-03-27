"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, Loader2, ArrowRight, Phone, Mail, TriangleAlert, Send } from "lucide-react";
import { CONTENT } from "@/lib/content";

/* ─── Types ─────────────────────────────────────────────────────────── */
type Step = "intro" | "questions" | "loading" | "result";

interface Message {
  role: "bot" | "user";
  text: string;
}

interface QuoteResult {
  low: number;
  high: number;
  summary: string;
  breakdown: string[];
  followUpHint: string;
}

interface Answers {
  projectType: string;
  size: string;
  timeline: string;
  location: string;
  notes: string;
  [key: string]: string;
}

/* ─── Adaptive question trees ───────────────────────────────────────── */
type QuestionNode = {
  key: string;
  text: string;
  options?: string[];
  type: "choice" | "text" | "text-optional";
  placeholder?: string;
};

const baseQuestions: QuestionNode[] = CONTENT.quoteBot.baseQuestions as QuestionNode[];

const adaptiveQuestions: Record<string, QuestionNode[]> = CONTENT.quoteBot.adaptiveQuestions as Record<string, QuestionNode[]>;

const sharedTailQuestions: QuestionNode[] = CONTENT.quoteBot.sharedTailQuestions as QuestionNode[];

/* ─── Utility ───────────────────────────────────────────────────────── */
function fmt(n: number) {
  return n.toLocaleString("en-US");
}

/* ─── Typewriter hook ───────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 18, enabled = true) {
  const [displayed, setDisplayed] = useState(enabled ? "" : text);
  const [done, setDone] = useState(!enabled);

  useEffect(() => {
    if (!enabled) { setDisplayed(text); setDone(true); return; }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, enabled]);

  return { displayed, done };
}

/* ─── TypingDots ────────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-5 py-4" style={{ background: "var(--bg-card)", borderRadius: "12px", borderTopLeftRadius: "2px", width: "fit-content" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
            animation: "dotBounce 1s ease-in-out " + (i * 0.2) + "s infinite",
          }}
        />
      ))}
    </div>
  );
}

/* ─── BotBubble ─────────────────────────────────────────────────────── */
function BotBubble({ text, animate = true }: { text: string; animate?: boolean }) {
  const { displayed } = useTypewriter(text, 16, animate);
  return (
    <div className="flex gap-3">
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
        style={{ background: "var(--accent)", color: "#FFFFFF" }}
      >
        BR
      </div>
      <div
        className="rounded-xl rounded-tl-none px-5 py-4 flex-1"
        style={{ background: "var(--bg-card)" }}
      >
        <p className="text-white text-sm font-medium leading-relaxed" style={{ minHeight: "1.4em" }}>
          {displayed}
          <span style={{ opacity: 0.4 }}>▋</span>
        </p>
      </div>
    </div>
  );
}

/* ─── Chat Follow-up ────────────────────────────────────────────────── */
function FollowUpChat({ answers, result }: { answers: Partial<Answers>; result: QuoteResult }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: result.followUpHint },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const newMessages: Message[] = [...messages, { role: "user", text: trimmed }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          result,
          messages: newMessages,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");

      const reply = data.reply || CONTENT.quoteBot.result.followUp.defaultReply;
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: CONTENT.quoteBot.result.followUp.errorReply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8" style={{ borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
        {CONTENT.quoteBot.result.followUp.title}
      </p>
      <div className="flex flex-col gap-4 mb-4" style={{ maxHeight: 320, overflowY: "auto" }}>
        {messages.map((m, i) => (
          m.role === "bot" ? (
            <BotBubble key={i} text={m.text} animate={i === messages.length - 1 && i > 0} />
          ) : (
            <div key={i} className="flex justify-end">
              <div
                className="rounded-xl rounded-tr-none px-5 py-3 text-sm"
                style={{ background: "var(--accent)", color: "#FFFFFF", maxWidth: "80%" }}
              >
                {m.text}
              </div>
            </div>
          )
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: "var(--accent)", color: "#FFFFFF" }}>BR</div>
            <TypingDots />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={CONTENT.quoteBot.result.followUp.inputPlaceholder}
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl text-sm text-white outline-none"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="btn-primary px-4 py-3"
          style={{ opacity: loading || !input.trim() ? 0.5 : 1 }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────── */
export default function QuoteBot() {
  const [step, setStep] = useState<Step>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionNode[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Email capture
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const currentQuestion = questions[questionIndex];

  const progress =
    step === "questions"
      ? ((questionIndex) / Math.max(questions.length, 1)) * 100
      : step === "loading" ? 95
        : step === "result" ? 100
          : 0;

  // When entering questions, build the base question list
  function startQuestions() {
    setQuestions(baseQuestions);
    setQuestionIndex(0);
    setShowOptions(false);
    setIsTyping(true);
    setStep("questions");
    setTimeout(() => { setIsTyping(false); setShowOptions(true); }, 900);
  }

  function handleChoice(value: string) {
    const updated = { ...answers, [currentQuestion.key]: value };
    setAnswers(updated);

    // If this is the first question (projectType), inject adaptive questions
    if (currentQuestion.key === "projectType") {
      const adaptive = adaptiveQuestions[value] || adaptiveQuestions["Other"];
      const fullList = [...baseQuestions, ...adaptive, ...sharedTailQuestions];
      setQuestions(fullList);
      advanceWithQuestions(updated, fullList, 0);
    } else {
      advanceWithQuestions(updated, questions, questionIndex);
    }
  }

  function handleTextSubmit() {
    if (currentQuestion.type === "text" && !textInput.trim()) return;
    const val = textInput.trim();
    const updated = { ...answers, [currentQuestion.key]: val };
    setAnswers(updated);
    setTextInput("");
    advanceWithQuestions(updated, questions, questionIndex);
  }

  function advanceWithQuestions(updated: Partial<Answers>, qList: QuestionNode[], currentIdx: number) {
    setShowOptions(false);
    setIsTyping(true);

    if (currentIdx < qList.length - 1) {
      setTimeout(() => {
        setIsTyping(false);
        setQuestionIndex(currentIdx + 1);
        setShowOptions(true);
      }, 800);
    } else {
      // Submit
      setTimeout(async () => {
        setIsTyping(false);
        setStep("loading");
        try {
          const aiResult = await generateQuoteWithAI(updated);
          setResult(aiResult);
          setStep("result");
        } catch {
          setError(CONTENT.quoteBot.errorMsg);
          setStep("questions");
          setIsTyping(false);
          setShowOptions(true);
        }
      }, 800);
    }
  }

  async function generateQuoteWithAI(ans: Partial<Answers>): Promise<QuoteResult> {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: ans }),
    });

    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("[QuoteBot] Lead:", email, answers, result);
    setEmailSent(true);
  }

  function handleReset() {
    setStep("intro");
    setQuestionIndex(0);
    setAnswers({});
    setTextInput("");
    setResult(null);
    setError(null);
    setEmail("");
    setEmailSent(false);
    setQuestions([]);
    setShowOptions(false);
    setIsTyping(false);
  }

  return (
    <>
      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeSlideIn 0.35s ease forwards; }
      `}</style>

      <section id="quote-bot" className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="section-label">{CONTENT.quoteBot.intro.label}</p>
            <h2 className="section-title">{CONTENT.quoteBot.intro.title}</h2>
            <p className="section-subtitle mx-auto">
              {CONTENT.quoteBot.intro.subtitle}
            </p>
          </div>

          {/* Bot card */}
          <div
            className="mx-auto rounded-2xl overflow-hidden"
            style={{
              maxWidth: "680px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            }}
          >
            {/* Progress bar */}
            {step !== "intro" && (
              <div style={{ height: "3px", background: "var(--bg-card)" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "var(--accent)",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            )}

            <div className="p-6 md:p-10">

              {/* ── INTRO ── */}
              {step === "intro" && (
                <div className="text-center fade-in">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "rgba(226,74,34,0.12)", border: "1px solid rgba(226,74,34,0.25)" }}
                  >
                    <span className="font-display text-3xl md:text-4xl" style={{ color: "var(--accent)" }}>?</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{CONTENT.quoteBot.intro.cardTitle}</h3>
                  <p className="text-sm mb-8" style={{ color: "#94A3B8" }}>
                    {CONTENT.quoteBot.intro.cardSubtitle}
                  </p>
                  <button
                    id="quotebot-start-btn"
                    onClick={startQuestions}
                    className="btn-primary text-base px-8 py-4 mx-auto"
                  >
                    {CONTENT.quoteBot.intro.button} <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* ── QUESTIONS ── */}
              {step === "questions" && currentQuestion && (
                <div>
                  {/* Typing indicator OR bot bubble */}
                  {isTyping ? (
                    <div className="flex gap-3 mb-6">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{ background: "var(--accent)", color: "#FFFFFF" }}
                      >
                        BR
                      </div>
                      <TypingDots />
                    </div>
                  ) : (
                    <div className="mb-6 fade-in">
                      <BotBubble text={currentQuestion.text} animate={true} />
                    </div>
                  )}

                  {/* Step counter */}
                  <p className="text-xs mb-5 text-right" style={{ color: "#64748B" }}>
                    {CONTENT.quoteBot.questions.progressPrefix} {questionIndex + 1} {CONTENT.quoteBot.questions.progressSeparator} {questions.length}
                  </p>

                  {/* Error */}
                  {error && (
                    <div
                      className="flex items-center gap-2 text-sm mb-4 px-4 py-3 rounded-lg"
                      style={{ background: "rgba(147,0,10,0.2)", color: "#ffb4ab" }}
                    >
                      <TriangleAlert size={14} />
                      {error}
                    </div>
                  )}

                  {/* Options — only show when not typing */}
                  {showOptions && (
                    <div className="fade-in">
                      {currentQuestion.type === "choice" && (
                        <div className="flex flex-col gap-2">
                          {currentQuestion.options!.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleChoice(opt)}
                              className="text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                              style={{
                                background: "var(--bg-card)",
                                color: "#F1F5F9",
                                border: "1px solid var(--border)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "var(--accent)";
                                e.currentTarget.style.color = "#FFFFFF";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--border)";
                                e.currentTarget.style.color = "#F1F5F9";
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {(currentQuestion.type === "text" || currentQuestion.type === "text-optional") && (
                        <div>
                          <input
                            type="text"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                            placeholder={currentQuestion.placeholder}
                            className="w-full px-5 py-4 rounded-xl text-sm text-white outline-none transition-all duration-200"
                            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                            autoFocus
                          />
                          <div className="mt-3 flex gap-2 justify-end">
                            {currentQuestion.type === "text-optional" && (
                              <button
                                onClick={() => { setTextInput(""); handleTextSubmit(); }}
                                className="text-sm px-4 py-2 cursor-pointer transition-colors duration-200"
                                style={{ color: "#94A3B8" }}
                              >
                                {CONTENT.quoteBot.questions.skipButton}
                              </button>
                            )}
                            <button
                              onClick={handleTextSubmit}
                              className="btn-primary text-sm px-5 py-2"
                              disabled={currentQuestion.type === "text" && !textInput.trim()}
                            >
                              {CONTENT.quoteBot.questions.continueButton} <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ── LOADING ── */}
              {step === "loading" && (
                <div className="text-center py-8 fade-in">
                  <Loader2
                    size={40}
                    className="mx-auto mb-5 animate-spin"
                    style={{ color: "var(--accent)" }}
                  />
                  <p className="text-white font-medium text-lg mb-2">{CONTENT.quoteBot.loading.title}</p>
                  <p className="text-sm" style={{ color: "#94A3B8" }}>
                    {CONTENT.quoteBot.loading.subtitle}
                  </p>
                </div>
              )}

              {/* ── RESULT ── */}
              {step === "result" && result && (
                <div className="fade-in">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                    {CONTENT.quoteBot.result.badge}
                  </p>

                  {/* Price range */}
                  <div className="mb-4">
                    <p
                      className="font-mono-price font-bold leading-none"
                      style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", color: "#FFFFFF" }}
                    >
                      \${fmt(result.low)}
                      <span style={{ color: "#94A3B8" }}> — </span>
                      \${fmt(result.high)}
                    </p>
                  </div>

                  {/* Personalized AI summary */}
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: "#94A3B8" }}>
                    {result.summary}
                  </p>

                  {/* Cost drivers */}
                  {result.breakdown?.length > 0 && (
                    <div className="mb-6 rounded-xl p-4 flex flex-col gap-2" style={{ background: "var(--bg-card)" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#64748B" }}>{CONTENT.quoteBot.result.costFactorsLabel}</p>
                      {result.breakdown.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span style={{ color: "var(--accent)", marginTop: "2px", fontSize: "12px" }}>▸</span>
                          <p className="text-sm" style={{ color: "#CBD5E1" }}>{item}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <a id="result-call-cta" href="tel:+15550000000" className="btn-primary flex-1 justify-center">
                      <Phone size={16} />
                      {CONTENT.quoteBot.result.callCTA}
                    </a>
                    <button
                      onClick={() => document.getElementById("result-email-section")?.scrollIntoView({ behavior: "smooth" })}
                      className="btn-outline flex-1 justify-center"
                    >
                      <Mail size={16} />
                      {CONTENT.quoteBot.result.emailCTA}
                    </button>
                  </div>

                  {/* Email capture */}
                  <div id="result-email-section" className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    {!emailSent ? (
                      <form onSubmit={handleEmailSubmit}>
                        <p className="text-sm font-medium text-white mb-3">{CONTENT.quoteBot.result.formTitle}</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={CONTENT.quoteBot.result.formPlaceholder}
                            required
                            className="flex-1 px-4 py-3 rounded-lg text-sm text-white outline-none transition-all"
                            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                          />
                          <button id="email-submit-btn" type="submit" className="btn-primary flex-shrink-0 text-sm px-5 py-3 justify-center">
                            {CONTENT.quoteBot.result.formButton}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="text-sm text-center" style={{ color: "#94A3B8" }}>
                        {CONTENT.quoteBot.result.successMessage}
                      </p>
                    )}
                  </div>

                    <div className="mt-5 flex items-start gap-2">
                    <TriangleAlert size={12} style={{ color: "#64748B", marginTop: "2px", flexShrink: 0 }} />
                    <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
                      {CONTENT.quoteBot.result.disclaimer}
                    </p>
                  </div>

                  {/* Start over */}
                  <button
                    onClick={handleReset}
                    className="mt-4 text-xs cursor-pointer hover:text-white transition-colors"
                    style={{ color: "#64748B" }}
                  >
                    {CONTENT.quoteBot.result.startOverText}
                  </button>

                  {/* ── FOLLOW-UP CHAT ── */}
                  <FollowUpChat answers={answers} result={result} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
