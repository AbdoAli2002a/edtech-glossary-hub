import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Moon, Sun, ArrowDownAZ, ArrowUpAZ, BookOpen, Sparkles, Volume2, Square, FileText, Copy, Check } from "lucide-react";
import { TERMS, CATEGORIES, type Category, type Term } from "@/data/terms";
import { ResearchPaperModal, ResearchPaperBody } from "@/components/ResearchPaperModal";

// Speak a term + its definition using the browser's built-in SpeechSynthesis API.
// Picks an Arabic voice for the Arabic term and an English voice for the English term + definition.
function speakTerm(term: Term, onEnd: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const voices = window.speechSynthesis.getVoices();
  const arVoice = voices.find((v) => v.lang?.toLowerCase().startsWith("ar"));
  const enVoice = voices.find((v) => v.lang?.toLowerCase().startsWith("en"));

  const uAr = new SpeechSynthesisUtterance(term.term_ar);
  uAr.lang = "ar-SA";
  if (arVoice) uAr.voice = arVoice;
  uAr.rate = 0.95;

  const uEn = new SpeechSynthesisUtterance(`${term.term_en}. ${term.definition_en}`);
  uEn.lang = "en-US";
  if (enVoice) uEn.voice = enVoice;
  uEn.rate = 1;
  uEn.onend = onEnd;
  uEn.onerror = onEnd;

  window.speechSynthesis.speak(uAr);
  window.speechSynthesis.speak(uEn);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EdTech Lexicon — 100 Modern Educational Technology Terms" },
      { name: "description", content: "An interactive bilingual (Arabic/English) dictionary of 100 modern EdTech terms across AI, instructional design, LMS, immersive learning, analytics, and assessment." },
      { property: "og:title", content: "EdTech Lexicon — 100 Modern Educational Technology Terms" },
      { property: "og:description", content: "Search, filter, and explore 100 modern EdTech terms in Arabic & English." },
    ],
  }),
  component: Index,
});

type SortMode = "default" | "asc" | "desc";

function Index() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<Category | "All">("All");
  const [sort, setSort] = useState<SortMode>("default");
  const [dark, setDark] = useState(false);
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [paperOpen, setPaperOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (t: Term) => {
    const text = `${t.term_ar} — ${t.term_en}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers / insecure contexts
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedId(t.id);
    setTimeout(() => setCopiedId((cur) => (cur === t.id ? null : cur)), 1500);
  };

  // Stop any ongoing speech when leaving the page
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = (t: Term) => {
    if (speakingId === t.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(t.id);
    speakTerm(t, () => setSpeakingId((cur) => (cur === t.id ? null : cur)));
  };

  // Init theme from system / localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = TERMS.filter((t) => {
      const matchCat = activeCat === "All" || t.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        t.term_en.toLowerCase().includes(q) ||
        t.term_ar.toLowerCase().includes(q) ||
        t.definition_en.toLowerCase().includes(q)
      );
    });
    if (sort === "asc") list = [...list].sort((a, b) => a.term_en.localeCompare(b.term_en));
    if (sort === "desc") list = [...list].sort((a, b) => b.term_en.localeCompare(a.term_en));
    return list;
  }, [query, activeCat, sort]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: TERMS.length };
    CATEGORIES.forEach((c) => (map[c] = TERMS.filter((t) => t.category === c).length));
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Tajawal Arabic font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet" />

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 gradient-hero opacity-10 dark:opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-16">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero text-white shadow-glow">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-bold tracking-tight">د/ ايمان الشريف</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPaperOpen(true)}
                aria-label="Open research paper"
                title="عرض الرسالة البحثية"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Research Paper</span>
              </button>
              <button
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle dark mode"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition hover:shadow-card"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="mt-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              100 modern terms · 7 specialties · Arabic & English
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              The Modern Dictionary of{" "}
              <span className="bg-clip-text text-transparent gradient-hero">Educational Technology</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              A curated, bilingual reference for educators, designers, and researchers exploring today's
              EdTech landscape — from generative AI to immersive learning and learning analytics.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search in Arabic or English… (e.g. Adaptive Learning, الفصل المقلوب)"
                className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm shadow-card outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button
              onClick={() => setSort(sort === "asc" ? "desc" : sort === "desc" ? "default" : "asc")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 text-sm font-medium shadow-card transition hover:border-primary hover:text-primary"
            >
              {sort === "desc" ? <ArrowUpAZ className="h-4 w-4" /> : <ArrowDownAZ className="h-4 w-4" />}
              Sort: {sort === "asc" ? "A→Z" : sort === "desc" ? "Z→A" : "Default"}
            </button>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="mt-5 flex flex-wrap gap-2">
            <CategoryChip
              active={activeCat === "All"}
              onClick={() => setActiveCat("All")}
              label="All"
              count={counts.All}
            />
            {CATEGORIES.map((c) => (
              <CategoryChip
                key={c}
                active={activeCat === c}
                onClick={() => setActiveCat(c)}
                label={c}
                count={counts[c]}
              />
            ))}
          </div>
        </div>
      </header>

      {/* RESULTS */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {TERMS.length} terms
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <p className="text-muted-foreground">No terms match your search. Try a different keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <article
                key={t.id}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {t.category}
                </span>
                <h3 className="mt-4 text-lg font-bold leading-tight tracking-tight">{t.term_en}</h3>
                <p
                  dir="rtl"
                  lang="ar"
                  className="mt-1 text-base font-semibold text-accent-foreground/90"
                  style={{ color: "var(--primary)" }}
                >
                  {t.term_ar}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.definition_en}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-muted-foreground/70">#{t.id.toString().padStart(3, "0")}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(t)}
                      aria-label={copiedId === t.id ? "Copied" : "Copy Arabic and English term"}
                      title={copiedId === t.id ? "تم النسخ" : "نسخ المصطلح"}
                      className={
                        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition " +
                        (copiedId === t.id
                          ? "border-transparent bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary hover:text-primary")
                      }
                    >
                      {copiedId === t.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleSpeak(t)}
                      aria-label={speakingId === t.id ? "Stop audio" : "Listen to term and definition"}
                      title={speakingId === t.id ? "إيقاف" : "استماع"}
                      className={
                        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition " +
                        (speakingId === t.id
                          ? "border-transparent gradient-hero text-white shadow-glow animate-pulse"
                          : "border-border bg-card text-foreground hover:border-primary hover:text-primary")
                      }
                    >
                      {speakingId === t.id ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground">
          Built for educators & instructional designers · Add new terms in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">src/data/terms.ts</code>
        </div>
      </footer>

      <ResearchPaperModal open={paperOpen} onClose={() => setPaperOpen(false)} />
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition " +
        (active
          ? "border-transparent gradient-hero text-white shadow-glow"
          : "border-border bg-card text-foreground hover:border-primary hover:text-primary")
      }
    >
      {label}
      <span
        className={
          "rounded-full px-1.5 text-[11px] " +
          (active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground")
        }
      >
        {count}
      </span>
    </button>
  );
}
