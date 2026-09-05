import { chapters } from "@/lib/data/catalogue";
import { overallMastery, topicMastery } from "@/lib/mastery";
import { useStudent } from "@/lib/student/store";
import { useMemo } from "react";

export function MasteryStrip() {
  const mastery = useStudent((s) => s.mastery);
  const quizLog = useStudent((s) => s.quizLog);
  const streak = useStudent((s) => s.streak);
  const stars = useStudent((s) => s.stars);
  const snap = useMemo(
    () => ({
      v: 1 as const,
      updatedAt: 0,
      theme: "dark" as const,
      onboardingDone: true,
      stars,
      bookDefs: [] as string[],
      bookNotes: [] as string[],
      bookQuiz: [] as string[],
      mastery,
      quizLog,
      streak,
    }),
    [mastery, quizLog, stars, streak],
  );
  const overall = overallMastery(snap);

  return (
    <section className="scroll-mt-24 rounded-3xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Mastery</p>
          <p className="mt-1 font-display text-3xl tabular-nums text-fg">{overall}%</p>
          <p className="mt-1 text-sm text-muted">
            Built from learned reactions, review flags and recent quiz scores — per chapter, not a
            vague page count.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-bg px-4 py-3 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Streak</p>
          <p className="font-display text-2xl tabular-nums text-primary">{streak.count}</p>
          <p className="text-xs text-muted">day{streak.count === 1 ? "" : "s"}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {chapters.map((ch) => {
          const m = topicMastery(ch.id, snap);
          return (
            <div key={ch.id} className="rounded-2xl bg-bg p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-muted">Ch {ch.num}</p>
                <p className="text-sm font-semibold tabular-nums text-fg">{m.pct}%</p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-raised">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300"
                  style={{ width: `${m.pct}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-muted">
                {m.learned}/{m.total} learned · quiz {m.quizPct}%
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
