import { chapters } from "@/lib/data/catalogue";
import { quizBank, quizByChapter, type BankItem } from "@/lib/data/quiz-bank";
import type { ChapterId, QuizKind } from "@/lib/data/quiz";
import { weakestChapter, wrongQuestionIds } from "@/lib/mastery";
import { sessionSeed, shuffle } from "@/lib/shuffle";
import { useStudent } from "@/lib/student/store";
import { cn } from "@/lib/utils";
import { Clock, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "practice" | "timed" | "exam" | "adaptive" | "retry";
type ChSel = ChapterId | "mix";
type Prepared = BankItem & { seed: number };

function prepare(items: BankItem[], seed: number): Prepared[] {
  return shuffle(items, seed).map((item, idx) => {
    const order = shuffle(
      item.options.map((text, i) => ({ text, i })),
      seed + idx * 97 + 13,
    );
    return {
      ...item,
      options: order.map((o) => o.text),
      ans: order.findIndex((o) => o.i === item.ans),
      seed,
    };
  });
}

function filterBank(ch: ChSel, kind: QuizKind | "all", mark: "all" | "1" | "2" | "3"): BankItem[] {
  let src = quizByChapter(ch);
  if (kind !== "all") src = src.filter((q) => q.kind === kind);
  if (mark !== "all") src = src.filter((q) => q.mark === mark);
  return src;
}

export function QuizEngine({ focusId, onConsumedFocus }: { focusId?: string; onConsumedFocus?: () => void }) {
  const [ch, setCh] = useState<ChSel | null>(null);
  const [mode, setMode] = useState<Mode>("practice");
  const [kind, setKind] = useState<QuizKind | "all">("all");
  const [bank, setBank] = useState<Prepared[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);
  const startedAt = useRef(0);
  const seedRef = useRef(sessionSeed());
  const closingRef = useRef(false);
  const recordQuiz = useStudent((s) => s.recordQuiz);
  const toggleBook = useStudent((s) => s.toggleBook);
  const bookQuiz = useStudent((s) => s.bookQuiz);
  const mastery = useStudent((s) => s.mastery);
  const quizLog = useStudent((s) => s.quizLog);
  const stars = useStudent((s) => s.stars);

  const q = bank[i];
  const examMode = mode === "exam";
  const timed = mode === "timed" || mode === "exam";

  const analytics = useMemo(() => {
    const recent = quizLog.slice(-8);
    const byCh = (id: ChapterId) => {
      const rows = recent.filter((l) => l.ch === id || l.ch === "mix");
      if (!rows.length) return null;
      return Math.round((100 * rows.reduce((s, l) => s + l.score / Math.max(l.total, 1), 0)) / rows.length);
    };
    return { recent, byCh };
  }, [quizLog]);

  const start = (id: ChSel, nextMode: Mode = mode) => {
    seedRef.current = sessionSeed();
    let source = filterBank(id, kind, "all");
    if (nextMode === "retry") {
      const ids = wrongQuestionIds({
        v: 1,
        updatedAt: 0,
        theme: "dark",
        onboardingDone: true,
        stars,
        bookDefs: [],
        bookNotes: [],
        bookQuiz,
        mastery,
        quizLog,
        streak: { count: 0, lastDay: "" },
      });
      source = quizBank.filter((item) => ids.includes(item.id) || bookQuiz.includes(item.id));
      if (source.length === 0) source = filterBank(id, kind, "all");
    }
    if (nextMode === "adaptive") {
      const weak = weakestChapter({
        v: 1,
        updatedAt: 0,
        theme: "dark",
        onboardingDone: true,
        stars,
        bookDefs: [],
        bookNotes: [],
        bookQuiz,
        mastery,
        quizLog,
        streak: { count: 0, lastDay: "" },
      });
      source = filterBank(weak, kind, "all");
      id = weak;
    }
    const cap = nextMode === "exam" ? 20 : nextMode === "practice" ? 12 : 16;
    const sliced = shuffle(source, seedRef.current).slice(0, Math.min(cap, source.length));
    setCh(id);
    setMode(nextMode);
    setBank(prepare(sliced, seedRef.current));
    setI(0);
    setScore(0);
    setPicked(null);
    setDone(false);
    setWrong([]);
    closingRef.current = false;
    startedAt.current = Date.now();
    setSeconds(nextMode === "exam" ? 12 * 60 : nextMode === "timed" ? 45 : 0);
  };

  useEffect(() => {
    if (focusId) {
      const item = quizBank.find((x) => x.id === focusId);
      if (item) {
        seedRef.current = sessionSeed();
        setCh(item.ch);
        setMode("practice");
        setBank(prepare([item], seedRef.current));
        setI(0);
        setScore(0);
        setPicked(null);
        setDone(false);
        setWrong([]);
        startedAt.current = Date.now();
      }
      onConsumedFocus?.();
    }
  }, [focusId, onConsumedFocus]);

  useEffect(() => {
    if (!timed || done || !ch || !q) return;
    if (seconds <= 0) {
      if (mode === "timed" && picked === null) {
        setWrong((w) => [...w, q.id]);
        setPicked(-1);
      }
      if (mode === "exam") {
        finishPaper(score, wrong);
      }
      return;
    }
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [timed, seconds, done, ch, q, mode, picked, score, wrong]);

  const finishPaper = (finalScore: number, finalWrong: string[]) => {
    if (!ch || closingRef.current) return;
    closingRef.current = true;
    setDone(true);
    recordQuiz({
      id: `${Date.now()}`,
      at: Date.now(),
      mode,
      ch,
      score: finalScore,
      total: bank.length,
      wrong: finalWrong,
      durationMs: Date.now() - startedAt.current,
    });
  };

  const choose = (idx: number) => {
    if (picked !== null || !q) return;
    setPicked(idx);
    const correct = idx === q.ans;
    if (correct) setScore((s) => s + 1);
    else setWrong((w) => [...w, q.id]);
    if (examMode) {
      window.setTimeout(() => next(correct ? score + 1 : score, correct ? wrong : [...wrong, q.id]), 280);
    }
  };

  const next = (scoreNow = score, wrongNow = wrong) => {
    if (i + 1 >= bank.length) {
      finishPaper(scoreNow, wrongNow);
      return;
    }
    setI((n) => n + 1);
    setPicked(null);
    if (mode === "timed") setSeconds(45);
  };

  const clock =
    mode === "exam"
      ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
      : mode === "timed"
        ? `${seconds}s`
        : null;

  return (
    <section id="quiz" className="scroll-mt-24 py-12">
      <div className="mb-6">
        <h2 className="font-display text-3xl text-fg">Chapter-wise quiz</h2>
        <p className="mt-1 text-sm text-muted">
          {quizBank.length} items · 1-mark MCQs, assertion–reason and case-based. Instant marking,
          step-by-step reasons, retry-wrong, timed and exam modes.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["practice", "Practice"],
            ["timed", "Timed"],
            ["exam", "Exam sim"],
            ["adaptive", "Adaptive"],
            ["retry", "Retry wrong"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={cn(
              "h-11 rounded-xl border px-3 text-sm font-medium",
              mode === id ? "border-primary bg-primary text-bg" : "border-border bg-surface text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["all", "All types"],
            ["mcq", "1-mark MCQ"],
            ["assertion", "Assertion–Reason"],
            ["case", "Case-based"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setKind(id)}
            className={cn(
              "h-11 rounded-xl border px-3 text-sm",
              kind === id ? "border-gold bg-gold/10 text-gold" : "border-border text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {chapters.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => start(c.id, mode)}
            className={cn(
              "h-11 rounded-xl border px-4 text-sm font-medium transition-transform active:scale-[0.96]",
              ch === c.id ? "border-primary bg-primary text-bg" : "border-border bg-surface text-fg",
            )}
          >
            Chapter {c.num}
          </button>
        ))}
        <button
          type="button"
          onClick={() => start("mix", mode)}
          className={cn(
            "h-11 rounded-xl border px-4 text-sm font-medium transition-transform active:scale-[0.96]",
            ch === "mix" ? "border-primary bg-primary text-bg" : "border-border bg-surface text-fg",
          )}
        >
          Mixed set
        </button>
      </div>

      {analytics.recent.length > 0 && (
        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {chapters.map((c) => (
            <div key={c.id} className="rounded-2xl border border-border bg-surface px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-muted">Ch {c.num} accuracy</p>
              <p className="tabular-nums text-sm font-semibold text-fg">{analytics.byCh(c.id) ?? "—"}%</p>
            </div>
          ))}
        </div>
      )}

      {!ch ? (
        <p className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-muted">
          Pick a chapter. Practice shows the explanation immediately. Exam sim withholds it until
          the end.
        </p>
      ) : (
        <div className="rounded-3xl border border-border bg-raised p-5 sm:p-6">
          {done ? (
            <div>
              <Sparkles className="size-6 text-gold" />
              <h3 className="mt-3 font-display text-2xl">Quiz complete</h3>
              <p className="mt-2 text-lg">
                Score <span className="tabular-nums text-primary">{score}</span> / {bank.length} (
                {Math.round((score / Math.max(bank.length, 1)) * 100)}%)
              </p>
              {wrong.length > 0 && (
                <p className="mt-2 text-sm text-muted">{wrong.length} missed — they are in My Revision.</p>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => start(ch, mode)}
                  className="h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-bg"
                >
                  Shuffle and retry
                </button>
                {wrong.length > 0 && (
                  <button
                    type="button"
                    onClick={() => start(ch, "retry")}
                    className="h-11 rounded-xl border border-border px-4 text-sm font-semibold text-fg"
                  >
                    Retry missed only
                  </button>
                )}
              </div>
            </div>
          ) : q ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold tracking-wide text-primary">
                  Question {i + 1} of {bank.length} · {q.mark}-mark · {q.kind}
                </p>
                {clock && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs tabular-nums text-fg">
                    <Clock className="size-3.5" />
                    {clock}
                  </span>
                )}
              </div>
              <p className="mt-2 whitespace-pre-line font-display text-[clamp(1.15rem,3.6vw,1.65rem)] leading-snug">
                {q.q}
              </p>
              <div className="mt-5 grid gap-2">
                {q.options.map((opt, idx) => {
                  const show = picked !== null && !examMode;
                  const correct = idx === q.ans;
                  const wrongPick = show && idx === picked && !correct;
                  return (
                    <button
                      key={`${idx}-${opt}`}
                      type="button"
                      onClick={() => choose(idx)}
                      className={cn(
                        "min-h-12 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                        !show && "border-border bg-bg/60 hover:border-primary",
                        show && correct && "border-ok bg-ok/20 text-ok",
                        wrongPick && "border-danger bg-danger/20 text-danger",
                        show && !correct && !wrongPick && "border-border opacity-60",
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {picked !== null && !examMode && (
                <div className="card-enter mt-4 rounded-2xl border border-border bg-bg/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    {picked === q.ans ? "Correct" : "Not quite — step by step"}
                  </p>
                  {picked !== q.ans && picked >= 0 && (
                    <p className="mt-2 text-sm text-danger">
                      You chose “{q.options[picked]}”. Correct answer: {q.options[q.ans]}.
                    </p>
                  )}
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-fg">{q.why}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => toggleBook("quiz", q.id)}
                      className="h-11 rounded-xl border border-border px-4 text-sm font-semibold text-fg"
                    >
                      {bookQuiz.includes(q.id) ? "Saved" : "Save to revision"}
                    </button>
                    <button
                      type="button"
                      onClick={() => next()}
                      className="h-11 rounded-xl bg-fg px-5 text-sm font-semibold text-bg"
                    >
                      {i + 1 >= bank.length ? "Finish" : "Next question"}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted">No questions match these filters. Clear a filter and try again.</p>
          )}
        </div>
      )}
    </section>
  );
}
