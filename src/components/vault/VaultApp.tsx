import { AuthSlot } from "@/components/vault/AuthSlot";
import { ChemLab } from "@/components/vault/ChemLab";
import { ColorChips } from "@/components/vault/ColorChips";
import { GlobalSearch } from "@/components/vault/GlobalSearch";
import { MasteryStrip } from "@/components/vault/MasteryStrip";
import { Onboarding } from "@/components/vault/Onboarding";
import { PwaRegister } from "@/components/vault/PwaRegister";
import { QuizEngine } from "@/components/vault/QuizEngine";
import { ReactionCard } from "@/components/vault/ReactionCard";
import { RevisionQueue } from "@/components/vault/RevisionQueue";
import { StudentHydrate } from "@/components/vault/StudentHydrate";
import { ThemeToggle } from "@/components/vault/ThemeToggle";
import { askChem } from "@/lib/ask-chem";
import {
  chapters,
  colours,
  definitions,
  notes,
  quizData,
  reactions,
} from "@/lib/data/catalogue";
import { credits, functionalGroups, indicators, pHGuide, series } from "@/lib/data/more";
import type { ChapterId } from "@/lib/data/quiz";
import { bucketsFor, matchesReagent, REAGENTS, reactionKey, TYPE_BUCKETS, type TypeBucket } from "@/lib/reaction-filters";
import { useStudent } from "@/lib/student/store";
import { cn } from "@/lib/utils";
import type { SearchHit } from "@/lib/vault-search";
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  FlaskConical,
  Lightbulb,
  MessageCircle,
  Search,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Section =
  | "all"
  | ChapterId
  | "colours"
  | "lab"
  | "definitions"
  | "notes"
  | "quiz"
  | "revision"
  | "ai"
  | "credits";

const NAV: { id: Section; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ch1", label: "Reactions" },
  { id: "ch2", label: "Acids" },
  { id: "ch3", label: "Metals" },
  { id: "ch4", label: "Carbon" },
  { id: "colours", label: "Colours" },
  { id: "lab", label: "Lab bench" },
  { id: "definitions", label: "Definitions" },
  { id: "notes", label: "Exam notes" },
  { id: "quiz", label: "Quiz" },
  { id: "revision", label: "My Revision" },
  { id: "ai", label: "Ask AI" },
  { id: "credits", label: "Credits" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function VaultApp() {
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState<"all" | ChapterId>("all");
  const [section, setSection] = useState<Section>("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeBucket | "all">("all");
  const [reagent, setReagent] = useState<string>("all");
  const [progressFilter, setProgressFilter] = useState<"all" | "learned" | "review" | "unseen">("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [quizFocus, setQuizFocus] = useState<string | undefined>();
  const searchRef = useRef<HTMLInputElement>(null);
  const stars = useStudent((s) => s.stars);
  const mastery = useStudent((s) => s.mastery);
  const bookDefs = useStudent((s) => s.bookDefs);
  const bookNotes = useStudent((s) => s.bookNotes);
  const toggleBook = useStudent((s) => s.toggleBook);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reactions.filter((r) => {
      if (chapter !== "all" && r.ch !== chapter) return false;
      const key = reactionKey(r);
      if (savedOnly && !stars.includes(key)) return false;
      if (typeFilter !== "all" && !bucketsFor(r.type).includes(typeFilter)) return false;
      if (reagent !== "all" && !matchesReagent(r, reagent)) return false;
      const flag = mastery[key] ?? "unset";
      if (progressFilter === "learned" && flag !== "learned") return false;
      if (progressFilter === "review" && flag !== "review") return false;
      if (progressFilter === "unseen" && flag !== "unset") return false;
      if (!q) return true;
      const blob = `${r.title} ${r.eq} ${r.type} ${r.colour} ${r.obs} ${r.cond} ${r.tip} ${r.desc}`.toLowerCase();
      return blob.includes(q);
    });
  }, [query, chapter, savedOnly, stars, typeFilter, reagent, progressFilter, mastery]);

  const go = (id: Section) => {
    setSection(id);
    if (id === "all" || id === "ch1" || id === "ch2" || id === "ch3" || id === "ch4") {
      setChapter(id === "all" ? "all" : id);
      scrollTo("reactions");
    } else {
      scrollTo(id);
    }
  };

  const pickHit = (hit: SearchHit) => {
    setSearchOpen(false);
    if (hit.kind === "reaction") {
      const found = reactions.find((r) => reactionKey(r) === hit.id);
      if (found) setChapter(found.ch);
      setSection("all");
      scrollTo("reactions");
      return;
    }
    if (hit.kind === "quiz") {
      setQuizFocus(hit.id);
      setSection("quiz");
      scrollTo("quiz");
      return;
    }
    if (hit.kind === "chapter") {
      go(hit.id as ChapterId);
      return;
    }
    setSection(hit.href as Section);
    scrollTo(hit.href);
  };

  return (
    <div className="relative min-h-dvh w-full max-w-[100vw] overflow-x-clip">
      <StudentHydrate />
      <ChemLab />
      <Onboarding />
      <GlobalSearch
        open={searchOpen}
        query={query}
        onQuery={setQuery}
        onClose={() => setSearchOpen(false)}
        onPick={pickHit}
      />

      <header className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:pt-16 safe-pad">
        <div className="mb-6 flex items-center justify-end gap-2">
          <PwaRegister />
          <ThemeToggle />
          <AuthSlot />
        </div>
        <div className="stagger">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-primary">
            <FlaskConical className="size-3.5" />
            CBSE · Class 10 · Chemistry
          </div>
          <h1 className="font-display wordmark text-[clamp(2.05rem,9.5vw,4.6rem)] font-semibold leading-[1.05] tracking-tight">
            ChemVault 10
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            A complete NCERT revision lab — every high-yield reaction, colour, definition and exam
            rule, with mastery tracking, rotating chapter quizzes, and a live chemistry tutor.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <label className="relative flex min-h-12 min-w-0 flex-1 items-center">
              <Search className="pointer-events-none absolute left-4 size-4 text-muted" />
              <input
                ref={searchRef}
                value={query}
                suppressHydrationWarning
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                placeholder="Search a reaction, HCl, colour, definition…"
                className="h-12 w-full min-w-0 rounded-2xl border border-border bg-surface pl-11 pr-16 text-sm text-fg outline-none transition placeholder:text-muted focus:border-primary"
              />
              <kbd className="absolute right-3 hidden rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted sm:block">
                ⌘K
              </kbd>
            </label>
            <button
              type="button"
              onClick={() => scrollTo("chapter-map")}
              className="h-12 shrink-0 rounded-2xl bg-primary px-5 text-sm font-semibold text-bg transition-transform duration-150 active:scale-[0.96]"
            >
              Explore chapters
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted">
            <span className="rounded-full border border-border px-3 py-1">{reactions.length} reactions</span>
            <span className="rounded-full border border-border px-3 py-1">{definitions.length} definitions</span>
            <span className="rounded-full border border-border px-3 py-1">{colours.length} colours</span>
            <span className="rounded-full border border-border px-3 py-1">
              {Object.values(quizData).reduce((n, q) => n + q.length, 0)} quiz items
            </span>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden safe-pad">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                "min-h-11 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                section === item.id ? "bg-primary/15 text-primary" : "text-muted hover:bg-raised hover:text-fg",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-24 safe-pad">
        <section id="chapter-map" className="scroll-mt-24 py-12">
          <SectionHead title="Chapter map" sub="Jump straight into the four NCERT chemistry chapters." />
          <div className="grid gap-4 sm:grid-cols-2">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => go(ch.id)}
                className="group rounded-3xl border border-border bg-surface p-6 text-left shadow-[0_20px_40px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-gold">{ch.num}</span>
                  <ChevronRight className="size-4 text-muted transition-transform group-hover:translate-x-1" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-fg">{ch.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{ch.blurb}</p>
              </button>
            ))}
          </div>
        </section>

        <MasteryStrip />

        <section id="reactions" className="scroll-mt-24 py-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <SectionHead title="Important reactions" sub={`Showing ${filtered.length} of ${reactions.length}`} />
            <button
              type="button"
              onClick={() => setSavedOnly((v) => !v)}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-xl border px-3 text-sm",
                savedOnly ? "border-gold bg-gold/10 text-gold" : "border-border text-muted",
              )}
            >
              {savedOnly ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
              Saved
            </button>
          </div>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Chip active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>
              All types
            </Chip>
            {TYPE_BUCKETS.map((b) => (
              <Chip key={b} active={typeFilter === b} onClick={() => setTypeFilter(b)}>
                {b}
              </Chip>
            ))}
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            <Chip active={reagent === "all"} onClick={() => setReagent("all")}>
              Any reagent
            </Chip>
            {REAGENTS.map((r) => (
              <Chip key={r.id} active={reagent === r.id} onClick={() => setReagent(r.id)}>
                {r.id}
              </Chip>
            ))}
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            {(
              [
                ["all", "All progress"],
                ["unseen", "Unseen"],
                ["learned", "Learned"],
                ["review", "Needs review"],
              ] as const
            ).map(([id, label]) => (
              <Chip key={id} active={progressFilter === id} onClick={() => setProgressFilter(id)}>
                {label}
              </Chip>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-muted">
              No reactions match. Clear a filter or try another keyword.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((r, i) => (
                <ReactionCard key={reactionKey(r)} r={r} index={i} />
              ))}
            </div>
          )}
        </section>

        <section id="colours" className="scroll-mt-24 py-12">
          <SectionHead title="Colours of compounds" sub="The appearance list examiners actually ask." />
          <div className="overflow-x-auto rounded-3xl border border-border bg-surface">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-raised text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3">Compound</th>
                  <th className="px-4 py-3">Formula</th>
                  <th className="px-4 py-3">Colour</th>
                  <th className="px-4 py-3">Exam remark</th>
                </tr>
              </thead>
              <tbody>
                {colours.map((c, ci) => (
                  <tr key={`${c.name}-${c.formula}-${ci}`} className="border-t border-border/70">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="size-4 shrink-0 rounded-md border border-border"
                          style={{ background: c.swatch }}
                        />
                        {c.name}
                      </span>
                    </td>
                    <td className="eq px-4 py-3 text-primary">{c.formula}</td>
                    <td className="px-4 py-3 text-fg">
                      <ColorChips text={c.colour} />
                    </td>
                    <td className="px-4 py-3 text-muted">{c.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <LabBench />

        <section id="definitions" className="scroll-mt-24 py-12">
          <SectionHead title="Quick definitions" sub="Board-ready wording. Memorise these as written." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {definitions.map((d) => (
              <article key={d.title} className="rounded-3xl border border-border bg-surface p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="flex items-center gap-2 font-display text-lg text-fg">
                    <BookOpen className="size-4 shrink-0 text-primary" />
                    {d.title}
                  </h3>
                  <button
                    type="button"
                    aria-label="Save definition"
                    onClick={() => toggleBook("def", d.title)}
                    className="text-muted"
                  >
                    <Star className={cn("size-4", bookDefs.includes(d.title) && "fill-gold text-gold")} />
                  </button>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">{d.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="notes" className="scroll-mt-24 py-12">
          <SectionHead title="Core exam notes" sub="Shortcuts, traps, and the rules that win marks." />
          <div className="grid gap-3 md:grid-cols-2">
            {notes.map((n) => (
              <article key={n.title} className="rounded-3xl border border-border bg-surface p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="flex items-center gap-2 font-display text-lg text-fg">
                    <Lightbulb className="size-4 shrink-0 text-gold" />
                    {n.title}
                  </h3>
                  <button
                    type="button"
                    aria-label="Save note"
                    onClick={() => toggleBook("note", n.title)}
                    className="text-muted"
                  >
                    <Star className={cn("size-4", bookNotes.includes(n.title) && "fill-gold text-gold")} />
                  </button>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">{n.body}</p>
              </article>
            ))}
          </div>
        </section>

        <QuizEngine focusId={quizFocus} onConsumedFocus={() => setQuizFocus(undefined)} />
        <RevisionQueue
          onOpenQuiz={(id) => {
            if (id) setQuizFocus(id);
            scrollTo("quiz");
            setSection("quiz");
          }}
        />
        <AiSection />
        <CreditsSection />
      </main>

      <footer className="border-t border-border py-10 text-center text-xs text-muted">
        ChemVault 10 — always cross-check with the latest NCERT textbook.
      </footer>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 shrink-0 rounded-xl border px-3 text-sm whitespace-nowrap",
        active ? "border-primary bg-primary/15 text-primary" : "border-border text-muted",
      )}
    >
      {children}
    </button>
  );
}

function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-3xl text-fg">{title}</h2>
      <p className="mt-1 text-sm text-muted">{sub}</p>
    </div>
  );
}

function LabBench() {
  return (
    <section id="lab" className="scroll-mt-24 py-12">
      <SectionHead
        title="Lab bench"
        sub="Indicators, pH memory, reactivity series and functional groups — the tables you rewrite in the paper."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="overflow-x-auto rounded-3xl border border-border bg-surface">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="bg-raised text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Indicator</th>
                <th className="px-4 py-3">In acid</th>
                <th className="px-4 py-3">In base</th>
              </tr>
            </thead>
            <tbody>
              {indicators.map((row) => (
                <tr key={row.name} className="border-t border-border/70">
                  <td className="px-4 py-3 text-fg">
                    {row.name}
                    <div className="text-xs text-muted">{row.notes}</div>
                  </td>
                  <td className="px-4 py-3">
                    <ColorChips text={row.acid} />
                  </td>
                  <td className="px-4 py-3">
                    <ColorChips text={row.base} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-5">
          <h3 className="font-display text-lg">pH strip</h3>
          <ul className="mt-3 grid gap-2">
            {pHGuide.map((p) => (
              <li key={p.item} className="flex items-center justify-between gap-3 rounded-xl bg-bg px-3 py-2 text-sm">
                <span>{p.item}</span>
                <span className="shrink-0 font-mono text-primary">
                  {p.pH} · {p.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 rounded-3xl border border-border bg-surface p-5">
        <h3 className="font-display text-lg">Reactivity series</h3>
        <p className="mt-1 text-sm text-muted">Most reactive on the left. Hydrogen sits between lead and copper.</p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {series.map((m, i) => (
            <span
              key={m}
              className={cn(
                "flex h-12 min-w-12 items-center justify-center rounded-xl border px-3 font-mono text-sm",
                m === "H" ? "border-gold text-gold" : "border-border text-fg",
              )}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {functionalGroups.map((g) => (
          <article key={g.name} className="rounded-3xl border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wider text-muted">{g.name}</p>
            <p className="eq mt-2 text-primary">{g.group}</p>
            <p className="mt-1 text-sm text-fg">{g.example}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AiSection() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Ask any Class 10 Chemistry question — reactions, colours, pH, extraction, ethanol, esters…",
    },
  ]);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const send = async () => {
    const message = input.trim();
    if (!message || busy) return;
    setInput("");
    const history = msgs.filter((m, idx) => idx > 0);
    setMsgs((m) => [...m, { role: "user", content: message }]);
    setBusy(true);
    try {
      const res = await askChem({ data: { message, history } });
      const text = res.ok ? res.text : res.error;
      setMsgs((m) => [...m, { role: "assistant", content: text }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "Could not reach the tutor. Try again." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="ai" className="scroll-mt-24 py-12">
      <SectionHead title="Ask ChemVault AI" sub="Powered by Grok. User-initiated, Class 10 focused." />
      <div className="overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <MessageCircle className="size-4 text-primary" />
          <span className="text-sm font-semibold">Tutor</span>
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">Grok</span>
        </div>
        <div ref={box} className="flex h-80 flex-col gap-3 overflow-y-auto px-4 py-4">
          {msgs.map((m, idx) => (
            <div
              key={idx}
              className={cn(
                "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                m.role === "user" ? "ml-auto bg-primary text-bg" : "bg-raised text-fg",
              )}
            >
              {m.content}
            </div>
          ))}
          {busy && <div className="rounded-2xl bg-raised px-4 py-3 text-sm italic text-muted">Thinking…</div>}
        </div>
        <div className="flex gap-2 border-t border-border p-3">
          <input
            value={input}
            suppressHydrationWarning
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void send();
            }}
            placeholder="e.g. Why is ZnO yellow when hot?"
            className="h-12 min-w-0 flex-1 rounded-xl border border-border bg-bg px-4 text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => void send()}
            className="h-12 shrink-0 rounded-xl bg-primary px-5 text-sm font-semibold text-bg disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}

function CreditsSection() {
  return (
    <section id="credits" className="scroll-mt-24 py-12">
      <SectionHead title="Credits" sub="The people who made this vault." />
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">The credit of making this website goes to</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {credits.map((c) => (
            <li key={c.name} className="flex items-center gap-3 rounded-2xl border border-border bg-bg px-4 py-4">
              <Users className="size-4 text-primary" />
              <div>
                <p className="font-display text-2xl text-fg">{c.name}</p>
                <p className="text-xs text-muted">{c.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
