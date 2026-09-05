import { useStudent } from "@/lib/student/store";
import { Bookmark, FlaskConical, Search, Sparkles } from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    title: "Your Class 10 chemistry lab",
    body: "Reactions, colours, definitions, exam notes and a full quiz bank — written to NCERT language, not watered down.",
    icon: FlaskConical,
  },
  {
    title: "Find anything in a second",
    body: "Search HCl, hydrochloric acid, or just “acid”. Aliases, formulae, colours and questions all live in one index. Press ⌘K anytime.",
    icon: Search,
  },
  {
    title: "Mark it. Master it.",
    body: "Toggle Learned or Needs review on every reaction. Stars, definitions and missed questions collect in My Revision.",
    icon: Bookmark,
  },
  {
    title: "Quiz like the board paper",
    body: "1-mark MCQs, assertion–reason, case-based, timed mode, exam simulation, retry-wrong and a daily streak. Sign in to sync devices.",
    icon: Sparkles,
  },
];

export function Onboarding() {
  const done = useStudent((s) => s.onboardingDone);
  const hydrated = useStudent((s) => s.hydrated);
  const finish = useStudent((s) => s.finishOnboarding);
  const [i, setI] = useState(0);

  if (!hydrated || done) return null;
  const step = STEPS[i]!;
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-end bg-bg/70 p-4 backdrop-blur-sm sm:place-items-center">
      <div className="modal-enter w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <Icon className="size-5" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {i + 1} / {STEPS.length}
        </p>
        <h2 className="mt-2 font-display text-2xl text-fg">{step.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
        <div className="mt-5 flex gap-1.5">
          {STEPS.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 flex-1 rounded-full ${idx <= i ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => finish()}
            className="h-11 flex-1 rounded-xl border border-border text-sm font-medium text-muted"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={() => {
              if (i + 1 >= STEPS.length) finish();
              else setI((n) => n + 1);
            }}
            className="h-11 flex-1 rounded-xl bg-primary text-sm font-semibold text-bg"
          >
            {i + 1 >= STEPS.length ? "Start studying" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
