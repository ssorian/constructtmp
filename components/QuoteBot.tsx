"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, Phone, Mail, TriangleAlert } from "lucide-react";
import { CONTENT } from "@/lib/content";

/* ─── Types ─────────────────────────────────────────────────────────── */
type Step = "intro" | "questions" | "result";

interface QuoteResult {
  low: number;
  high: number;
  summary: string;
  breakdown: string[];
}

interface Answers {
  projectType: string;
  size: string;
  finish?: string;
  timeline: string;
  location: string;
  notes: string;
  [key: string]: string | undefined;
}

/* ─── Question tree ─────────────────────────────────────────────────── */
type QuestionNode = {
  key: string;
  text: string;
  options?: string[];
  type: "choice" | "text" | "text-optional";
  placeholder?: string;
};

const baseQuestions: QuestionNode[]                        = CONTENT.quoteBot.baseQuestions as QuestionNode[];
const adaptiveQuestions: Record<string, QuestionNode[]>    = CONTENT.quoteBot.adaptiveQuestions as Record<string, QuestionNode[]>;
const sharedTailQuestions: QuestionNode[]                  = CONTENT.quoteBot.sharedTailQuestions as QuestionNode[];

/* ─── Static estimate calculator ───────────────────────────────────── */
function computeResult(answers: Partial<Answers>): QuoteResult {
  const pricing = CONTENT.quoteBot.pricing as Record<string, {
    ranges: Record<string, { low: number; high: number }>;
    finishMultipliers?: Record<string, number>;
    breakdown: string[];
    summaries: Record<string, string>;
  }>;

  const type   = answers.projectType ?? "Other";
  const size   = answers.size        ?? "";
  const finish = answers.finish      ?? "Not sure";

  const typePricing = pricing[type] ?? pricing["Other"];

  // Find matching range key (first key that fits, fallback to last)
  const rangeKeys = Object.keys(typePricing.ranges);
  const rangeKey  = rangeKeys.find((k) => k === size) ?? rangeKeys[rangeKeys.length - 1];
  const base      = typePricing.ranges[rangeKey];

  // Apply finish multiplier if applicable
  const multiplier = typePricing.finishMultipliers?.[finish] ?? 1.0;
  const low  = Math.round(base.low  * multiplier);
  const high = Math.round(base.high * multiplier);

  const summary = typePricing.summaries[rangeKey] ?? "";

  return { low, high, summary, breakdown: typePricing.breakdown };
}

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
        CM
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

/* ─── Main Component ────────────────────────────────────────────────── */
export default function QuoteBot() {
  const [step, setStep]               = useState<Step>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers]         = useState<Partial<Answers>>({});
  const [textInput, setTextInput]     = useState("");
  const [result, setResult]           = useState<QuoteResult | null>(null);
  const [questions, setQuestions]     = useState<QuestionNode[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isTyping, setIsTyping]       = useState(false);

  // Email capture
  const [email, setEmail]         = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const currentQuestion = questions[questionIndex];

  const progress =
    step === "questions" ? ((questionIndex) / Math.max(questions.length, 1)) * 100
    : step === "result"  ? 100
    : 0;

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

    if (currentQuestion.key === "projectType") {
      const adaptive = adaptiveQuestions[value] ?? adaptiveQuestions["Other"];
      const fullList = [...baseQuestions, ...adaptive, ...sharedTailQuestions];
      setQuestions(fullList);
      advance(updated, fullList, 0);
    } else {
      advance(updated, questions, questionIndex);
    }
  }

  function handleTextSubmit() {
    if (currentQuestion.type === "text" && !textInput.trim()) return;
    const updated = { ...answers, [currentQuestion.key]: textInput.trim() };
    setAnswers(updated);
    setTextInput("");
    advance(updated, questions, questionIndex);
  }

  function advance(updated: Partial<Answers>, qList: QuestionNode[], currentIdx: number) {
    setShowOptions(false);
    setIsTyping(true);

    if (currentIdx < qList.length - 1) {
      setTimeout(() => {
        setIsTyping(false);
        setQuestionIndex(currentIdx + 1);
        setShowOptions(true);
      }, 700);
    } else {
      setTimeout(() => {
        setIsTyping(false);
        setResult(computeResult(updated));
        setStep("result");
      }, 700);
    }
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
            <p className="section-subtitle mx-auto">{CONTENT.quoteBot.intro.subtitle}</p>
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
                    style={{ background: "rgba(159,27,30,0.12)", border: "1px solid rgba(159,27,30,0.25)" }}
                  >
                    <span className="font-display text-3xl md:text-4xl" style={{ color: "var(--accent)" }}>?</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{CONTENT.quoteBot.intro.cardTitle}</h3>
                  <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
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
                  {isTyping ? (
                    <div className="flex gap-3 mb-6">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{ background: "var(--accent)", color: "#FFFFFF" }}
                      >
                        CM
                      </div>
                      <TypingDots />
                    </div>
                  ) : (
                    <div className="mb-6 fade-in">
                      <BotBubble text={currentQuestion.text} animate={true} />
                    </div>
                  )}

                  <p className="text-xs mb-5 text-right" style={{ color: "#64748B" }}>
                    {CONTENT.quoteBot.questions.progressPrefix} {questionIndex + 1} {CONTENT.quoteBot.questions.progressSeparator} {questions.length}
                  </p>

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
                                style={{ color: "var(--text-secondary)" }}
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
                      ${fmt(result.low)}
                      <span style={{ color: "var(--text-secondary)" }}> — </span>
                      ${fmt(result.high)}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {result.summary}
                  </p>

                  {/* Cost drivers */}
                  {result.breakdown.length > 0 && (
                    <div className="mb-6 rounded-xl p-4 flex flex-col gap-2" style={{ background: "var(--bg-card)" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#64748B" }}>
                        {CONTENT.quoteBot.result.costFactorsLabel}
                      </p>
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
                      <p className="text-sm text-center" style={{ color: "var(--text-secondary)" }}>
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

                  <button
                    onClick={handleReset}
                    className="mt-4 text-xs cursor-pointer hover:text-white transition-colors"
                    style={{ color: "#64748B" }}
                  >
                    {CONTENT.quoteBot.result.startOverText}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
