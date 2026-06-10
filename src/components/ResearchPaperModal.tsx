import { useEffect } from "react";
import { X, BookOpen, Target, Flag, Users, ListChecks, FlaskConical, Wrench, ClipboardList, GraduationCap, Sparkles } from "lucide-react";
import infographic from "@/assets/research-infographic.jpg.asset.json";

// Research paper content extracted from "مقرر في التخصص.pdf"
// To update content, edit the strings/arrays below.

interface Props {
  open: boolean;
  onClose: () => void;
}

const subQuestions = [
  "What are the digital content production skills that need to be developed among educational technology students?",
  "What is the impact of an e-learning environment based on AI applications on developing the cognitive aspects of digital content production skills?",
  "What is the impact of an e-learning environment based on AI applications on developing the performance aspects of digital content production skills?",
  "What are the design standards for an e-learning environment based on AI applications to develop digital content production skills?",
  "What are the technological competencies that need to be developed among educational technology students?",
];

const objectives = [
  "The digital content production skills required for educational technology students.",
  "The impact of an AI-based e-learning environment on cognitive aspects of digital content production skills.",
  "The impact of an AI-based e-learning environment on performance aspects of digital content production skills.",
  "Design standards for an AI-based e-learning environment aimed at developing digital content production skills.",
  "Technological competencies required for educational technology students.",
];

const delimitations = [
  { label: "Human Limit", text: "A random sample of 60 male and female third-year students from the Computer Division, Department of Educational Technology, Faculty of Specific Education." },
  { label: "Objective Limit", text: "Digital content production skills." },
  { label: "Time Limit", text: "Pilot and main experiments during the second semester of the academic year 2024/2025." },
  { label: "Learning Environment", text: "Students trained electronically through the Moodle platform." },
];

const procedures = [
  "Reviewing previous literature to prepare the theoretical framework and formulate hypotheses.",
  "Selecting a general instructional design model and designing the experimental treatment.",
  "Preparing design standards for an AI-based e-learning environment and presenting to arbitrators.",
  "Determining the research sample and analyzing cognitive/technical characteristics.",
  "Preparing the list of digital content production skills.",
  "Analyzing educational content, tasks, and behavioral objectives.",
  "Preparing the achievement test (cognitive aspects).",
  "Preparing the digital content evaluation card.",
  "Preparing the technological competencies scale.",
  "Conducting a pilot experiment for treatment and measurement tools.",
  "Administering the pre-test, then the AI-based learning treatment.",
  "Administering post-test tools (Scale / Achievement Test / Evaluation Card).",
  "Statistical analysis, discussion, interpretation, and recommendations.",
];

const terminology = [
  {
    title: "E-Learning Environment Based on AI Applications",
    text: "An integrated e-learning management system (e.g., Moodle or a custom-designed platform) integrating generative AI tools to present educational content, interactions, and course activities — helping educational technology students learn and practice required tasks efficiently and intelligently.",
  },
  {
    title: "AI Applications",
    text: "A collection of smart technological tools (ChatGPT, Midjourney, Canva AI, Gamma, voice generation, smart editing) that rely on machine learning algorithms — used within the e-learning environment to assist students in data analysis, idea generation, and rapidly designing, developing, and modifying digital content.",
  },
  {
    title: "Digital Content Production Skills",
    text: "The ability of educational technology students to plan, design, develop, and publish various digital educational materials (interactive texts, images, infographics, presentations, educational videos) using AI applications. Measured via the Cognitive Test and Product Evaluation Card.",
  },
  {
    title: "Technological Competencies",
    text: "The set of knowledge, skills, attitudes, and ethical practices that enable a student to interact safely and use e-learning environments and AI applications effectively and critically in educational contexts. Measured via the Technological Competencies Scale.",
  },
];

export function ResearchPaperModal({ open, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="research-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-4 w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-border bg-card/95 px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-hero text-white shadow-glow">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Research Paper · رسالة بحثية</p>
              <h2 id="research-title" className="mt-0.5 text-base font-bold leading-tight sm:text-lg">
                AI-Based E-Learning Environment & Digital Content Skills
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground transition hover:border-primary hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6 sm:px-10 sm:py-10">
          {/* Title block */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-transparent to-primary/5 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Educational Technology · Minia University
            </div>
            <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              The Impact of an E-Learning Environment Based on Artificial Intelligence Applications on Developing Digital Content Production Skills and Technological Competencies Among Educational Technology Students
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Researcher: </span>
                <span className="font-semibold">Abdelrahman Ali Khaled</span>
                <span dir="rtl" className="ms-2 text-muted-foreground">عبدالرحمن علي خالد</span>
              </div>
              <div>
                <span className="text-muted-foreground">Supervisor: </span>
                <span className="font-semibold">Prof. Dr. Eman El-Sherif</span>
                <span dir="rtl" className="ms-2 text-muted-foreground">أ.د/ إيمان الشريف</span>
              </div>
            </div>
          </div>

          {/* Infographic */}
          <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-muted/30">
            <img
              src={infographic.url}
              alt="Conceptual framework infographic: research problem, variables, methodology, tools, and expected importance"
              className="w-full"
              loading="lazy"
            />
            <figcaption className="px-4 py-2 text-center text-xs text-muted-foreground">
              Conceptual framework of the study
            </figcaption>
          </figure>

          {/* Sections */}
          <Section icon={<Flag className="h-4 w-4" />} title="Statement of the Problem">
            <p>
              The research problem is evident in shortcomings of digital content production skills
              (cognitive and performance aspects) and technological competencies among third-year students in the
              Computer Division (Department of Educational Technology), Faculty of Specific Education, Minia University.
            </p>
            <p className="mt-3 rounded-xl border border-primary/30 bg-primary/5 p-4 font-medium">
              Main question: <em>What is the impact of building an e-learning environment based on Artificial Intelligence
              applications on developing digital content production skills (cognitive/performance) and technological
              competencies among educational technology students?</em>
            </p>
            <ol className="mt-4 list-decimal space-y-2 ps-5 text-muted-foreground">
              {subQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </Section>

          <Section icon={<Target className="h-4 w-4" />} title="Research Objectives">
            <ul className="space-y-2">
              {objectives.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{o}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={<GraduationCap className="h-4 w-4" />} title="Significance of the Research">
            <h4 className="font-semibold">Theoretical & Research Significance</h4>
            <p className="mt-1 text-muted-foreground">
              An applied study identifying the impact of an AI-based e-learning environment on students' digital
              content production skills — addressing a gap in Arabic research that mostly investigates opinions and
              obstacles rather than measured impact.
            </p>
            <h4 className="mt-4 font-semibold">Practical Significance</h4>
            <p className="mt-1 text-muted-foreground">
              Provides a general framework for employing AI-based e-learning specifically for digital content
              production, identifies required skills and competencies for the digital labor market, and highlights the
              importance of creating AI-based learning environments using specialized platforms.
            </p>
          </Section>

          <Section icon={<Users className="h-4 w-4" />} title="Research Delimitations">
            <div className="grid gap-3 sm:grid-cols-2">
              {delimitations.map((d) => (
                <div key={d.label} className="rounded-xl border border-border bg-background/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{d.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d.text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={<ListChecks className="h-4 w-4" />} title="Research Variables">
            <div className="grid gap-3 sm:grid-cols-2">
              <Pill heading="Independent" body="E-learning environment based on Artificial Intelligence applications." />
              <Pill heading="Dependent #1" body="Digital content production skills (Cognitive / Performance)." />
              <Pill heading="Dependent #2" body="Technological competencies." />
            </div>
          </Section>

          <Section icon={<FlaskConical className="h-4 w-4" />} title="Methodology & Design">
            <p className="text-muted-foreground">
              Developmental research using the <strong className="text-foreground">descriptive approach</strong> in the study,
              analysis, and design phases, and the <strong className="text-foreground">experimental approach</strong> to measure
              the effect of the independent variable on the dependent variables during evaluation.
            </p>
            <p className="mt-3 text-muted-foreground">
              A <strong className="text-foreground">one-group quasi-experimental design</strong> was used: pre-test → AI-based
              treatment → post-test, with statistical analysis of the difference to determine effectiveness.
            </p>
          </Section>

          <Section icon={<Wrench className="h-4 w-4" />} title="Research Tools">
            <div className="grid gap-3 md:grid-cols-3">
              <ToolCard title="Data Collection" items={[
                "Questionnaire — digital content production skills",
                "Questionnaire — technological competencies",
                "Unstructured meetings and interviews",
              ]} />
              <ToolCard title="Experimental Material" items={[
                "AI-based e-learning environment (Moodle + ChatGPT, Midjourney, Canva AI, …)",
              ]} />
              <ToolCard title="Measurement Tools" items={[
                "Achievement Test (cognitive)",
                "Evaluation Card (performance)",
                "Technological Competencies Scale",
              ]} />
            </div>
          </Section>

          <Section icon={<ClipboardList className="h-4 w-4" />} title="Research Procedures">
            <ol className="space-y-2">
              {procedures.map((p, i) => (
                <li key={p} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section icon={<BookOpen className="h-4 w-4" />} title="Research Terminology">
            <div className="space-y-4">
              {terminology.map((t) => (
                <div key={t.title} className="rounded-xl border border-border bg-background/40 p-4">
                  <h4 className="font-semibold text-foreground">{t.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Footer */}
          <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Educational Technology Research · Minia University
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</span>
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function Pill({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{heading}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function ToolCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
