import { ColorChips } from "@/components/vault/ColorChips";
import type { Reaction } from "@/lib/data/reactions";
import { reactionKey } from "@/lib/reaction-filters";
import { useStudent } from "@/lib/student/store";
import { cn } from "@/lib/utils";
import { BookmarkCheck, RotateCcw, Star } from "lucide-react";

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-bg/70 p-3">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted">{k}</dt>
      <dd className="mt-1 text-sm leading-snug text-fg">{v}</dd>
    </div>
  );
}

export function ReactionCard({ r, index }: { r: Reaction; index: number }) {
  const key = reactionKey(r);
  const starred = useStudent((s) => s.stars.includes(key));
  const flag = useStudent((s) => s.mastery[key] ?? "unset");
  const toggleStar = useStudent((s) => s.toggleStar);
  const setMastery = useStudent((s) => s.setMastery);

  return (
    <article
      className="card-enter rounded-3xl border border-border bg-surface p-5"
      style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 font-display text-xl leading-snug text-fg">{r.title}</h3>
        <button
          type="button"
          aria-label={starred ? "Unsave" : "Save"}
          onClick={() => toggleStar(key)}
          className="mt-1 shrink-0 text-muted transition-transform duration-150 active:scale-[0.96]"
        >
          <Star className={cn("size-4", starred && "fill-gold text-gold")} />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="inline-block rounded-full bg-gold/12 px-2.5 py-1 text-[11px] font-semibold text-gold">
          {r.type}
        </span>
        {flag !== "unset" ? (
          <span
            className={cn(
              "inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold",
              flag === "learned" ? "bg-ok/15 text-ok" : "bg-gold/15 text-gold",
            )}
          >
            {flag === "learned" ? "Learned" : "Needs review"}
          </span>
        ) : null}
      </div>
      <pre className="eq mt-4 max-w-full overflow-x-auto rounded-xl bg-bg px-3 py-3 text-[13px] leading-relaxed text-primary">
        {r.eq}
      </pre>
      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl bg-bg/70 p-3 sm:col-span-2">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted">Colour</dt>
          <dd className="mt-1 text-sm leading-snug text-fg">
            <ColorChips text={r.colour} />
          </dd>
        </div>
        <Meta k="Observation" v={r.obs} />
        <Meta k="Condition" v={r.cond} />
        <div className="rounded-xl bg-bg/70 p-3 sm:col-span-2">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted">Exam tip</dt>
          <dd className="mt-1 text-sm leading-snug text-fg">{r.tip}</dd>
        </div>
      </dl>
      <p className="mt-4 border-l-2 border-primary pl-3 text-sm leading-relaxed text-muted">{r.desc}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setMastery(key, flag === "learned" ? "unset" : "learned")}
          className={cn(
            "inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold",
            flag === "learned" ? "border-ok bg-ok/15 text-ok" : "border-border text-muted",
          )}
        >
          <BookmarkCheck className="size-3.5" />
          Learned
        </button>
        <button
          type="button"
          onClick={() => setMastery(key, flag === "review" ? "unset" : "review")}
          className={cn(
            "inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold",
            flag === "review" ? "border-gold bg-gold/15 text-gold" : "border-border text-muted",
          )}
        >
          <RotateCcw className="size-3.5" />
          Needs review
        </button>
      </div>
    </article>
  );
}
