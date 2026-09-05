import { searchVault, type SearchHit } from "@/lib/vault-search";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

const KIND_LABEL: Record<SearchHit["kind"], string> = {
  reaction: "Reaction",
  colour: "Colour",
  definition: "Definition",
  note: "Note",
  quiz: "Question",
  chapter: "Chapter",
};

export function GlobalSearch({
  open,
  query,
  onQuery,
  onClose,
  onPick,
}: {
  open: boolean;
  query: string;
  onQuery: (v: string) => void;
  onClose: () => void;
  onPick: (hit: SearchHit) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => searchVault(query, 18), [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-bg/70 p-3 pt-[12vh] backdrop-blur-sm">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close search" onClick={onClose} />
      <div className="modal-enter relative w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <label className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search reactions, HCl, colours, notes, questions…"
            className="h-14 min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
          />
          <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted sm:block">
            ESC
          </kbd>
        </label>
        <div className="max-h-[min(24rem,50vh)] overflow-y-auto p-2">
          {query.trim() && hits.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">No matches. Try a formula or an alias.</p>
          ) : (
            hits.map((hit) => (
              <button
                key={`${hit.kind}-${hit.id}`}
                type="button"
                onClick={() => onPick(hit)}
                className="flex w-full flex-col rounded-2xl px-3 py-2.5 text-left hover:bg-raised"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {KIND_LABEL[hit.kind]}
                </span>
                <span className="text-sm font-medium text-fg">{hit.title}</span>
                <span className="line-clamp-2 text-xs text-muted">{hit.snippet}</span>
              </button>
            ))
          )}
        </div>
        <p className={cn("border-t border-border px-4 py-2 text-[11px] text-muted")}>
          Aliases work: HCl, hydrochloric acid, acid · CuSO₄, blue vitriol · POP, gypsum
        </p>
      </div>
    </div>
  );
}
