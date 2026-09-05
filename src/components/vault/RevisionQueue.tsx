import { definitions, notes, reactions } from "@/lib/data/catalogue";
import { quizBank } from "@/lib/data/quiz-bank";
import { reactionKey } from "@/lib/reaction-filters";
import { useStudent } from "@/lib/student/store";
import { BookOpen, Lightbulb, Star, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";

export function RevisionQueue({ onOpenQuiz }: { onOpenQuiz: (id?: string) => void }) {
  const stars = useStudent((s) => s.stars);
  const mastery = useStudent((s) => s.mastery);
  const bookDefs = useStudent((s) => s.bookDefs);
  const bookNotes = useStudent((s) => s.bookNotes);
  const bookQuiz = useStudent((s) => s.bookQuiz);
  const quizLog = useStudent((s) => s.quizLog);
  const toggleStar = useStudent((s) => s.toggleStar);
  const toggleBook = useStudent((s) => s.toggleBook);

  const starredRx = reactions.filter((r) => stars.includes(reactionKey(r)));
  const reviewRx = reactions.filter((r) => mastery[reactionKey(r)] === "review");
  const defs = definitions.filter((d) => bookDefs.includes(d.title));
  const noteRows = notes.filter((n) => bookNotes.includes(n.title));
  const wrongIds = [...new Set(quizLog.flatMap((l) => l.wrong))];
  const questions = quizBank.filter((q) => bookQuiz.includes(q.id) || wrongIds.includes(q.id));

  const empty =
    starredRx.length + reviewRx.length + defs.length + noteRows.length + questions.length === 0;

  return (
    <section id="revision" className="scroll-mt-24 py-12">
      <div className="mb-6">
        <h2 className="font-display text-3xl text-fg">My Revision</h2>
        <p className="mt-1 text-sm text-muted">
          Starred reactions, needs-review cards, saved definitions and questions you missed.
        </p>
      </div>
      {empty ? (
        <p className="rounded-2xl border border-dashed border-border px-6 py-14 text-center text-muted">
          Nothing queued yet. Star a reaction, mark it for review, or miss a quiz item — it lands
          here.
        </p>
      ) : (
        <div className="grid gap-4">
          {reviewRx.length > 0 && (
            <Block title="Needs review" icon={<RotateCcw className="size-4 text-gold" />}>
              {reviewRx.map((r) => (
                <li key={reactionKey(r)} className="rounded-2xl bg-bg px-4 py-3 text-sm text-fg">
                  {r.title}
                  <span className="mt-1 block text-xs text-muted">{r.eq}</span>
                </li>
              ))}
            </Block>
          )}
          {starredRx.length > 0 && (
            <Block title="Starred reactions" icon={<Star className="size-4 text-gold" />}>
              {starredRx.map((r) => (
                <li key={reactionKey(r)} className="flex items-start justify-between gap-3 rounded-2xl bg-bg px-4 py-3">
                  <div>
                    <p className="text-sm text-fg">{r.title}</p>
                    <p className="eq mt-1 text-xs text-primary">{r.eq}</p>
                  </div>
                  <button type="button" className="text-xs text-muted" onClick={() => toggleStar(reactionKey(r))}>
                    Remove
                  </button>
                </li>
              ))}
            </Block>
          )}
          {defs.length > 0 && (
            <Block title="Saved definitions" icon={<BookOpen className="size-4 text-primary" />}>
              {defs.map((d) => (
                <li key={d.title} className="flex items-start justify-between gap-3 rounded-2xl bg-bg px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-fg">{d.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{d.body}</p>
                  </div>
                  <button type="button" className="text-xs text-muted" onClick={() => toggleBook("def", d.title)}>
                    Remove
                  </button>
                </li>
              ))}
            </Block>
          )}
          {noteRows.length > 0 && (
            <Block title="Saved notes" icon={<Lightbulb className="size-4 text-gold" />}>
              {noteRows.map((n) => (
                <li key={n.title} className="flex items-start justify-between gap-3 rounded-2xl bg-bg px-4 py-3">
                  <p className="text-sm text-fg">{n.title}</p>
                  <button type="button" className="text-xs text-muted" onClick={() => toggleBook("note", n.title)}>
                    Remove
                  </button>
                </li>
              ))}
            </Block>
          )}
          {questions.length > 0 && (
            <Block title="Questions to retry" icon={<Star className="size-4 text-primary" />}>
              {questions.map((q) => (
                <li key={q.id} className="flex items-start justify-between gap-3 rounded-2xl bg-bg px-4 py-3">
                  <p className="text-sm text-fg">{q.q.replace(/\n/g, " ")}</p>
                  <button type="button" className="shrink-0 text-xs font-semibold text-primary" onClick={() => onOpenQuiz(q.id)}>
                    Retry
                  </button>
                </li>
              ))}
            </Block>
          )}
        </div>
      )}
    </section>
  );
}

function Block({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5">
      <h3 className="mb-3 flex items-center gap-2 font-display text-lg text-fg">
        {icon}
        {title}
      </h3>
      <ul className="grid gap-2">{children}</ul>
    </div>
  );
}
