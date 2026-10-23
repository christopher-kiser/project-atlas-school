import { VideoLibrary } from "./Videos";
import { useState } from "react";
import { link } from "../lib/navigation";
import { useDraftState } from "../lib/useDraftState";
import {
  Activity,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  Download,
  ExternalLink,
  FileCheck2,
  FolderGit2,
  GraduationCap,
  Layers3,
  ListChecks,
  LockKeyhole,
  Milestone,
  Monitor,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Target,
  Terminal,
  Upload,
  X,
} from "lucide-react";
import {
  certifications,
  expansionBacklog,
  lessonById,
  lessons,
  projects,
  resources,
  sections,
} from "../content";
import {
  certificationReadinessNote,
  certificationStrategy,
} from "../content/certifications";
import type { Lesson } from "../content/types";
import { evaluateGate, gates } from "../lib/gates";
import {
  getCalibrationProgress,
  getLessonProgress,
  getReviewQueue,
  getWeakAreas,
  isProjectVerified,
  newId,
  type AtlasData,
  type ProjectSubmission,
} from "../lib/learning";
import {
  exportBackup,
  importBackup,
  MAX_BACKUP_BYTES,
  parseBackup,
  saveCertificationScore,
  saveProject,
} from "../lib/storage";
import {
  CodeBlock,
  CommandExplorer,
  DiagnosticTree,
  ExerciseCard,
  LabWorkspace,
  TerminalSimulator,
  type DataProps,
} from "./Practice";

export function StatePill({ state }: { state: string }) {
  return (
    <span
      className={`pill ${state === "Independent" || state === "Demonstrated" || state === "Portfolio Verified" ? "mint" : state === "Learning" || state === "Practicing" ? "amber" : ""}`}
    >
      {state}
    </span>
  );
}
export function PageTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="page-title">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  );
}
export function ResourceLinks({ ids }: { ids: string[] }) {
  return (
    <div className="resource-links">
      {ids.map((id) => {
        const r = resources.find((x) => x.id === id);
        return r ? (
          <a key={id} href={r.url} target="_blank" rel="noreferrer">
            <BookOpen size={17} />
            <span>
              <strong>{r.title}</strong>
              <small>{r.why}</small>
            </span>
            <ArrowUpRight size={16} />
          </a>
        ) : null;
      })}
    </div>
  );
}
function Topology() {
  return (
    <svg className="topology" viewBox="0 0 410 210" aria-hidden="true">
      <defs>
        <linearGradient id="line" x1="0" x2="1">
          <stop stopColor="#79debd" />
          <stop offset="1" stopColor="#7598df" />
        </linearGradient>
      </defs>
      <ellipse cx="205" cy="106" rx="182" ry="77" />
      <ellipse cx="205" cy="106" rx="140" ry="55" />
      <path d="M25 106H385M205 17V196M70 54 342 159M70 159 342 54" />
      <path
        className="active-line"
        d="m70 106 68-40 68 40 68-40 68 40-68 40-68-40-68 40-68-40"
      />
      {[
        [70, 106],
        [138, 66],
        [206, 106],
        [274, 66],
        [342, 106],
        [274, 146],
        [138, 146],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={i === 2 ? 17 : 9}
            className={i === 2 ? "center-node" : "node"}
          />
          {i === 2 && <path d="m201 106 4-6 4 6m-6-2h4" className="a-node" />}
        </g>
      ))}
      <text x="145" y="190">
        LOCAL → CLOUD → ENGINEERING
      </text>
    </svg>
  );
}

export function Dashboard({ data }: DataProps) {
  const calibrated = getCalibrationProgress(data);
  const due = getReviewQueue(lessons, data);
  const weak = getWeakAreas(lessons, data);
  const progress = lessons.map((l) => ({
    lesson: l,
    ...getLessonProgress(l, data),
  }));
  const demonstrated = progress.filter((p) =>
    ["Demonstrated", "Independent"].includes(p.state),
  );
  const preferred = [
    "troubleshoot-nginx",
    "git-basics",
    "git-branches",
    "git-conflicts",
    "git-collaboration",
    "github-workflow",
    "bash-health",
    "python-inventory",
  ];
  const next =
    weak[0]?.lesson ??
    due[0]?.lesson ??
    preferred
      .map((id) => lessonById(id)!)
      .find(
        (l) =>
          !["Demonstrated", "Independent"].includes(
            getLessonProgress(l, data).state,
          ),
      ) ??
    lessons.find(
      (l) =>
        !["Demonstrated", "Independent"].includes(
          getLessonProgress(l, data).state,
        ),
    ) ??
    lessonById("architecture-tradeoffs")!;
  const nextSection = sections.find((s) => s.id === next.section)!;
  const nextProject =
    projects.find(
      (p) => !data.projects.some((s) => s.id === p.id && isProjectVerified(s)),
    ) ?? projects[7];
  const independent = progress.filter((p) => p.state === "Independent").length;
  return (
    <>
      <div className="dashboard-heading">
        <div>
          <div className="eyebrow">YOUR ENGINEERING WORKSPACE</div>
          <h1>
            Welcome back, builder<span className="mint">.</span>
          </h1>
          <p>Understanding is the beginning. Evidence is the next step.</p>
        </div>
        <span className="local-badge">
          <span className="tiny-dot" />
          Learning locally · no account needed
        </span>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow mint">
            <span className="tiny-dot" />
            FOUNDATION TRACK · LINUX OPERATIONS
          </div>
          <h2>
            Build the skill.
            <br />
            <span>Prove the work.</span>
          </h2>
          <p>
            Your Linux foundation is already in motion. Pick up with a focused
            practical, then come back to prove what stuck.
          </p>
          <div className="button-row">
            <a
              className="button primary"
              href={link(
                calibrated.completed ? `lesson/${next.id}` : "migration",
              )}
            >
              {calibrated.completed
                ? "Continue your learning"
                : "Calibrate existing progress"}
              <ArrowRight size={17} />
            </a>
            <a className="text-button" href={link("curriculum")}>
              Explore the path
              <ChevronRight size={15} />
            </a>
          </div>
        </div>
        <div className="hero-art">
          <Topology />
          <div className="hero-art-label">
            <span className="tiny-dot" />
            SYSTEM STATUS: LEARNING BY DOING
          </div>
        </div>
      </section>
      <div className="metric-grid">
        <div>
          <span className="metric-icon">
            <Layers3 size={19} />
          </span>
          <span>
            <strong>
              {data.priorHistory.length}
              <small>prior competency records</small>
            </strong>
            <p>
              {calibrated.completed
                ? "Calibration attempted"
                : "Your Atlas history is preserved"}
            </p>
          </span>
        </div>
        <div>
          <span className="metric-icon">
            <CheckCircle2 size={19} />
          </span>
          <span>
            <strong>
              {demonstrated.length}
              <small>demonstrated here</small>
            </strong>
            <p>{independent} independently retained</p>
          </span>
        </div>
        <div>
          <span className="metric-icon">
            <RotateCcw size={19} />
          </span>
          <span>
            <strong>
              {due.length}
              <small>retrievals due</small>
            </strong>
            <p>
              {due.length
                ? "Make today’s recall count"
                : "A little repetition goes a long way"}
            </p>
          </span>
        </div>
        <div>
          <span className="metric-icon">
            <FolderGit2 size={19} />
          </span>
          <span>
            <strong>
              {data.projects.filter(isProjectVerified).length}
              <small>portfolio verified</small>
            </strong>
            <p>With recorded peer review</p>
          </span>
        </div>
      </div>
      <div className="dashboard-columns">
        <div>
          <section className="panel next-session">
            <div className="section-heading">
              <h2>Your next session</h2>
              <span className="pill amber">
                {weak.length ? "Reinforcement" : "Recommended"}
              </span>
            </div>
            <div className="session-main">
              <div className="large-icon">
                <Terminal size={28} />
              </div>
              <div>
                <span className="eyebrow">
                  {String(nextSection.id).padStart(2, "0")} /{" "}
                  {nextSection.title.toUpperCase()}
                </span>
                <h3>{next.title}</h3>
                <p>{next.summary}</p>
                <span className="meta">
                  <Clock3 size={14} />
                  {next.minutes} min<span>·</span>Real terminal practical
                </span>
              </div>
            </div>
            <div className="session-bottom">
              <span>
                <span className="tiny-dot" />
                Observe → diagnose → restore → verify
              </span>
              <a
                className="button secondary small"
                href={link(`lesson/${next.id}`)}
              >
                Open lesson
                <ArrowRight size={16} />
              </a>
            </div>
          </section>
          <section className="panel path-preview">
            <div className="section-heading">
              <h2>Your learning path</h2>
              <a className="text-button" href={link("curriculum")}>
                Full curriculum
                <ArrowUpRight size={15} />
              </a>
            </div>
            {sections.slice(1, 6).map((s, i) => {
              const inSection = progress.filter(
                (p) => p.lesson.section === s.id,
              );
              const done = inSection.filter((p) =>
                ["Demonstrated", "Independent"].includes(p.state),
              ).length;
              return (
                <a
                  className={`path-row ${s.id === 4 ? "current" : ""}`}
                  key={s.id}
                  href={link(`section/${s.id}`)}
                >
                  <span className="path-node">
                    {String(s.id).padStart(2, "0")}
                  </span>
                  <span className="path-copy">
                    <strong>{s.title}</strong>
                    <small>
                      {s.id === 4 ? "Recommended checkpoint" : s.subtitle}
                    </small>
                  </span>
                  <span className="path-stats">
                    {done}/{inSection.length}
                    <small>demonstrated</small>
                  </span>
                  {i === 3 ? (
                    <span className="pill mint">Continue</span>
                  ) : (
                    <ChevronRight size={17} />
                  )}
                </a>
              );
            })}
            <p className="fine">
              Advance with evidence. Every section remains available for
              exploration.
            </p>
          </section>
          <section className="panel">
            <div className="section-heading">
              <h2>Recently demonstrated</h2>
              <CheckCircle2 size={17} />
            </div>
            {demonstrated.length ? (
              demonstrated.slice(-3).map((p) => (
                <a
                  className="simple-row"
                  key={p.lesson.id}
                  href={link(`lesson/${p.lesson.id}`)}
                >
                  <span>{p.lesson.title}</span>
                  <StatePill state={p.state} />
                </a>
              ))
            ) : (
              <div className="empty-inline">
                <FileCheck2 size={25} />
                <div>
                  <strong>Your first fresh evidence belongs here.</strong>
                  <p>
                    Prior practical passes are preserved as reported history.
                    Calibration and new submissions establish current evidence.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
        <aside className="right-stack">
          <section className="panel review-panel">
            <div className="section-heading">
              <h2>Keep it sharp</h2>
              <RotateCcw size={17} />
            </div>
            <p>Short retrieval. Lasting understanding.</p>
            <div className="review-orbit">
              <span>{due.length}</span>
              <small>DUE FOR REVIEW</small>
            </div>
            <a className="button secondary full" href={link("review")}>
              {due.length ? "Start retrieval practice" : "Open review queue"}
              <ArrowRight size={16} />
            </a>
            <p className="fine">1 → 3 → 7 → 14 → 30 days</p>
          </section>
          <section className="panel">
            <div className="section-heading">
              <h2>Skills to reinforce</h2>
              <Activity size={17} />
            </div>
            {weak.length ? (
              weak.slice(0, 3).map((w) => (
                <a
                  className="weak-row"
                  key={w.lesson.id}
                  href={link(`lesson/${w.lesson.id}`)}
                >
                  {w.lesson.title}
                  <span>{w.weakExerciseIds.length} signals</span>
                </a>
              ))
            ) : (
              <p className="muted">
                No weak areas measured yet. A wrong answer will help Atlas
                choose the next review.
              </p>
            )}
            <a className="text-button" href={link("migration")}>
              Run the short calibration
              <ArrowRight size={15} />
            </a>
          </section>
          <section className="panel project-teaser">
            <span className="eyebrow amber">NEXT PORTFOLIO PROJECT</span>
            <FolderGit2 size={26} />
            <h3>{nextProject.title}</h3>
            <p>{nextProject.subtitle}</p>
            <a
              className="text-button"
              href={link(`portfolio/${nextProject.id}`)}
            >
              Open project brief
              <ArrowUpRight size={15} />
            </a>
          </section>
          <section className="panel">
            <span className="eyebrow">CERTIFICATION CHECKPOINT</span>
            <h3>Linux Essentials</h3>
            <p>Optional early checkpoint. First, prove the Linux skills.</p>
            <a className="text-button" href={link("certifications")}>
              Check preparation
              <ArrowRight size={15} />
            </a>
          </section>
        </aside>
      </div>
      <section className="career-strip">
        <span className="large-icon">
          <Milestone size={26} />
        </span>
        <div>
          <span className="eyebrow">SKILLS BEFORE TIMELINES</span>
          <h3>Your next career milestone: Cloud Support Ready</h3>
          <p>
            Linux + networking + Git + scripting + real AWS evidence + two
            credible projects.
          </p>
        </div>
        <a className="button secondary" href={link("career")}>
          View the evidence gate
          <ArrowRight size={16} />
        </a>
      </section>
    </>
  );
}

export function Curriculum({
  data,
  sectionId,
}: DataProps & { sectionId?: string }) {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState("All");
  const selected = sections.find((s) => String(s.id) === sectionId);
  const visible = selected
    ? [selected]
    : sections.filter(
        (s) =>
          (phase === "All" || s.phase === phase) &&
          [s.title, ...s.topics]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()),
      );
  return (
    <>
      <PageTitle
        eyebrow="COMPETENCY MAP"
        title={
          selected ? selected.title : "Your path to independent engineering"
        }
        description={
          selected
            ? selected.subtitle
            : "Learn in small steps. Revisit old skills. Demonstrate the work before moving your competency state."
        }
        action={
          selected ? (
            <a className="button secondary" href={link("curriculum")}>
              <ArrowLeft size={16} />
              All sections
            </a>
          ) : (
            <span className="pill">
              {sections.length} sections · {lessons.length} released lessons
            </span>
          )
        }
      />
      {!selected && (
        <div className="filter-bar">
          <div className="search-field">
            <Search size={17} />
            <input
              aria-label="Search curriculum"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a skill, command, or section…"
            />
          </div>
          <select
            aria-label="Filter by phase"
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
          >
            {[
              "All",
              "Foundation",
              "Builder",
              "Engineer",
              "Advanced",
              "Cross-platform",
              "Career",
            ].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      )}
      <div className="curriculum-grid">
        {visible.map((s) => {
          const children = lessons.filter((l) => l.section === s.id);
          return (
            <section key={s.id} className="panel curriculum-card">
              <div className="section-heading">
                <span className="section-number">
                  {String(s.id).padStart(2, "0")}
                </span>
                <span className="pill">{s.phase}</span>
              </div>
              <h2>
                <a href={link(`section/${s.id}`)}>{s.title}</a>
              </h2>
              <p>{s.subtitle}</p>
              <div className="topic-tags">
                {s.topics.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="curriculum-lessons">
                {children.map((l) => (
                  <a
                    key={l.id}
                    className="lesson-row"
                    href={link(`lesson/${l.id}`)}
                  >
                    <BookOpen size={16} />
                    <span>
                      <strong>{l.title}</strong>
                      <small>
                        {l.minutes} min · {l.exercises.length} retrievals ·
                        practical
                      </small>
                    </span>
                    <StatePill state={getLessonProgress(l, data).state} />
                    <ChevronRight size={14} />
                  </a>
                ))}
              </div>
              {!children.length && (
                <a
                  className="button secondary"
                  href={link(s.id === 20 ? "portfolio" : "career")}
                >
                  {s.id === 20 ? "Open portfolio studio" : "Open career gates"}
                  <ArrowRight size={15} />
                </a>
              )}
              {expansionBacklog.some((b) => b.section === s.id) && (
                <details className="backlog">
                  <summary>What still needs deeper lessons</summary>
                  <p className="fine">
                    The topic map is broader than the released bridge lesson.
                    These expansions are not presented as finished teaching.
                  </p>
                  <ul>
                    {expansionBacklog
                      .find((b) => b.section === s.id)!
                      .items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                  </ul>
                </details>
              )}
              {selected && (
                <>
                  <h3>Curated references</h3>
                  <ResourceLinks ids={s.resourceIds} />
                </>
              )}
            </section>
          );
        })}
      </div>
      {visible.length === 0 && (
        <p className="empty">No matching sections. Try a broader search.</p>
      )}
    </>
  );
}

export function LessonPage(props: DataProps & { id: string }) {
  const lesson = lessonById(props.id);
  const [tab, setTab] = useState("Learn");
  if (!lesson) return <NotFound />;
  const progress = getLessonProgress(lesson, props.data);
  const section = sections.find((s) => s.id === lesson.section)!;
  const missing = lesson.prerequisites.filter((id) => {
    const l = lessonById(id);
    return (
      !l ||
      !["Demonstrated", "Independent"].includes(
        getLessonProgress(l, props.data).state,
      )
    );
  });
  const next = lessons[lessons.indexOf(lesson) + 1];
  return (
    <>
      <a className="back-link" href={link(`section/${section.id}`)}>
        <ArrowLeft size={15} />
        {String(section.id).padStart(2, "0")} / {section.title}
      </a>
      <PageTitle
        eyebrow={`${lesson.minutes} MIN · CONCEPT → PRACTICE → EVIDENCE`}
        title={lesson.title}
        description={lesson.summary}
        action={<StatePill state={progress.state} />}
      />
      {progress.reportedState && (
        <div className="notice slim">
          <Layers3 size={17} />
          <span>
            Existing Atlas history: <strong>{progress.reportedState}</strong>.
            This is reported prior experience, separate from fresh assessment.
          </span>
        </div>
      )}
      {missing.length > 0 && (
        <details className="prerequisites">
          <summary>
            Recommended preparation · {missing.length} competencies still need
            evidence
          </summary>
          <p>
            Reading ahead is welcome. Your competency state only advances when
            you demonstrate the skills.
          </p>
          <div className="topic-tags">
            {missing.map((id) => (
              <a key={id} href={link(`lesson/${id}`)}>
                {lessonById(id)?.title ?? id}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </details>
      )}
      <nav className="tabs" aria-label="Lesson stages">
        {["Learn", "Videos", "Retrieve", "Practical", "Resources"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
          >
            {t === "Learn" ? (
              <BookOpen size={16} />
            ) : t === "Videos" ? (
              <Play size={16} />
            ) : t === "Retrieve" ? (
              <RotateCcw size={16} />
            ) : t === "Practical" ? (
              <Terminal size={16} />
            ) : (
              <ExternalLink size={16} />
            )}{" "}
            {t}
          </button>
        ))}
      </nav>
      {tab === "Learn" && (
        <>
          <div className="lesson-video-shortcut">
            <div>
              <Play size={20} />
              <span>
                <strong>Video support for this lesson</strong>
                <small>
                  Watch the explanation, then return here to practice.
                </small>
              </span>
            </div>
            <button className="button primary" onClick={() => setTab("Videos")}>
              Watch this lesson
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="lesson-columns">
            <div>
              <section className="panel lesson-outcomes">
                <span className="eyebrow mint">AFTER THIS LESSON, YOU CAN</span>
                <ul className="check-list">
                  {lesson.outcomes.map((o) => (
                    <li key={o}>
                      <Target size={16} />
                      {o}
                    </li>
                  ))}
                </ul>
              </section>
              <div className="concept-grid">
                {lesson.concepts.map((c, i) => (
                  <article className="panel concept-card" key={c.title}>
                    <span className="concept-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2>{c.title}</h2>
                    <p>{c.body}</p>
                    {c.analogy && <blockquote>{c.analogy}</blockquote>}
                  </article>
                ))}
              </div>
            </div>
            <aside className="lesson-side">
              <div className="panel">
                <span className="eyebrow">HOW THIS SKILL GROWS</span>
                <div className="retention-ladder">
                  {[
                    "Introduced",
                    "Recognized",
                    "Recalled with hint",
                    "Recalled independently",
                    "Used in guided practical",
                    "Used in independent practical",
                    "Retained after delay",
                  ].map((s, i) => (
                    <div key={s}>
                      <span>{i + 1}</span>
                      {s}
                    </div>
                  ))}
                </div>
                <p className="fine">
                  Opening this lesson does not mark it complete.
                </p>
              </div>
              <div className="panel">
                <span className="eyebrow">NEXT EVIDENCE</span>
                {progress.reasons.slice(0, 3).map((r) => (
                  <p key={r}>{r}</p>
                ))}
              </div>
            </aside>
          </div>
          <CommandExplorer lesson={lesson} />
          <section className="panel">
            <h2>Watch the reasoning</h2>
            <CodeBlock code={lesson.demo.code} title={lesson.demo.title} />
            <p>{lesson.demo.explanation}</p>
          </section>
          <section className="panel">
            <h2>Your guided rehearsal</h2>
            <ol className="steps">
              {lesson.practice.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <button
              className="button primary"
              onClick={() => setTab("Retrieve")}
            >
              Close the notes. Try retrieval.
              <ArrowRight size={17} />
            </button>
          </section>
        </>
      )}
      {tab === "Retrieve" && (
        <div className="retrieval-stack">
          <div className="notice">
            <RotateCcw size={19} />
            <div>
              <strong>Recall before you look.</strong>
              <p>
                Typed answers are checked against a small answer key. Commands
                and paths are case-sensitive; equivalent commands may need an
                accepted form. Hints and retries after seeing feedback count as
                supported practice.
              </p>
            </div>
          </div>
          {lesson.exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              {...props}
              lesson={lesson}
              exercise={ex}
            />
          ))}
          <button
            className="button primary"
            onClick={() => setTab("Practical")}
          >
            Apply it in your environment
            <ArrowRight size={17} />
          </button>
        </div>
      )}
      {tab === "Practical" && (
        <LabWorkspace key={lesson.id} {...props} lesson={lesson} />
      )}
      {tab === "Videos" && (
        <>
          <VideoLibrary lessonId={lesson.id} section={lesson.section} />
          <div className="button-row lesson-video-next">
            <button className="button" onClick={() => setTab("Learn")}>
              Back to the explanation
            </button>
            <button
              className="button primary"
              onClick={() => setTab("Retrieve")}
            >
              Ready? Practice recall
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
      {tab === "Resources" && (
        <section className="panel">
          <h2>Go to the source</h2>
          <p>
            Use the references to answer a specific question after your first
            attempt.
          </p>
          <ResourceLinks ids={lesson.resourceIds} />
        </section>
      )}
      <div className="lesson-footer">
        <a className="text-button" href={link(`section/${lesson.section}`)}>
          <ArrowLeft size={15} />
          Back to section
        </a>
        {next && (
          <a className="text-button" href={link(`lesson/${next.id}`)}>
            Explore next: {next.title}
            <ArrowRight size={15} />
          </a>
        )}
      </div>
    </>
  );
}

export function Migration(props: DataProps) {
  const selected = [
    "terminal-map",
    "linux-permissions",
    "linux-processes",
    "network-dns",
  ]
    .map((id) => lessonById(id))
    .filter((x): x is Lesson => !!x);
  const calibration = getCalibrationProgress(props.data);
  return (
    <>
      <PageTitle
        eyebrow="EXISTING ATLAS PROGRESS"
        title="Pick up where you left off."
        description="Your terminal, Linux, networking, and Nginx practice is preserved. Four short retrievals help calibrate what is available from memory today."
      />
      <div className="notice">
        <Layers3 size={20} />
        <div>
          <strong>
            {props.data.priorHistory.length} prior competency records · no
            forced restart
          </strong>
          <p>
            System inspection, process/job control, and Nginx practical passes
            are recorded as reported demonstrations. Other covered skills start
            as practiced. None are silently marked mastered.
          </p>
        </div>
      </div>
      <div className="calibration-progress">
        <strong>{calibration.attempted}/4 attempted</strong>
        <span>{calibration.correct} recalled without support</span>
      </div>
      {selected.map((l) => (
        <ExerciseCard
          key={l.id}
          {...props}
          context="calibration"
          lesson={l}
          exercise={
            l.exercises.find((e) => e.kind === "recall") ?? l.exercises[0]
          }
        />
      ))}
      {calibration.completed && (
        <section className="panel">
          <h2>Calibration recorded.</h2>
          <p>
            {calibration.correct === 4
              ? "Your starting recall is strong. Move to the Nginx checkpoint for current practical evidence."
              : "Keep your prior progress. Revisit the highlighted weak areas, then repeat retrieval after a delay."}{" "}
            This short sample does not validate every historical skill.
          </p>
          <div className="button-row">
            <a
              className="button primary"
              href={link("lesson/troubleshoot-nginx")}
            >
              Continue Linux troubleshooting
              <ArrowRight size={16} />
            </a>
            <a className="button secondary" href={link("review")}>
              See reinforcement
            </a>
          </div>
        </section>
      )}
      <details className="panel">
        <summary>Imported competency history</summary>
        {props.data.priorHistory.map((h) => (
          <div className="simple-row" key={h.id}>
            <a href={link(`lesson/${h.lessonId}`)}>
              {lessonById(h.lessonId)?.title ?? h.lessonId}
            </a>
            <StatePill state={`Reported ${h.state}`} />
          </div>
        ))}
      </details>
    </>
  );
}
export function Review(props: DataProps) {
  const due = getReviewQueue(lessons, props.data);
  const weak = getWeakAreas(lessons, props.data);
  const scheduled = lessons
    .flatMap((l) =>
      getLessonProgress(l, props.data).exercises.map((e) => ({
        ...e,
        lesson: l,
      })),
    )
    .filter((e) => e.dueAt && !e.isDue)
    .sort((a, b) => a.dueAt!.localeCompare(b.dueAt!));
  return (
    <>
      <PageTitle
        eyebrow="SPACED RETRIEVAL"
        title="Make it available from memory."
        description="Mistakes return soon. Independent successes return after 1, 3, 7, 14, and 30 days. Same-session repetition does not count as retained skill."
      />
      <div className="review-summary">
        <div>
          <strong>{due.length}</strong>
          <span>due now</span>
        </div>
        <div>
          <strong>{weak.length}</strong>
          <span>skills need reinforcement</span>
        </div>
        <div>
          <strong>{scheduled.length}</strong>
          <span>scheduled next</span>
        </div>
      </div>
      {due.length ? (
        due.slice(0, 12).map((item) => (
          <div key={`${item.lesson.id}:${item.exercise.id}`}>
            <a className="back-link" href={link(`lesson/${item.lesson.id}`)}>
              {item.lesson.title}
            </a>
            <ExerciseCard
              {...props}
              lesson={item.lesson}
              exercise={item.exercise}
              context="review"
            />
          </div>
        ))
      ) : (
        <section className="panel empty">
          <RotateCcw size={32} />
          <h2>No retrievals due right now.</h2>
          <p>
            {props.data.attempts.length
              ? "Let the delay do its work. You can continue with a practical or explore a new lesson."
              : "Start the short calibration or answer a lesson’s retrieval questions. Atlas will schedule the next review from your results."}
          </p>
          <a
            className="button primary"
            href={link(props.data.attempts.length ? "practice" : "migration")}
          >
            {props.data.attempts.length
              ? "Open practical workspace"
              : "Calibrate existing progress"}
            <ArrowRight size={16} />
          </a>
        </section>
      )}
      {weak.length > 0 && (
        <section className="panel">
          <h2>Weak areas & mistakes</h2>
          {weak.map((w) => (
            <div className="simple-row" key={w.lesson.id}>
              <div>
                <a href={link(`lesson/${w.lesson.id}`)}>{w.lesson.title}</a>
                <small>
                  {w.weakExerciseIds.length} incorrect or supported retrievals
                </small>
              </div>
              <a className="text-button" href={link(`lesson/${w.lesson.id}`)}>
                Revisit
                <ArrowRight size={15} />
              </a>
            </div>
          ))}
        </section>
      )}
      {scheduled.length > 0 && (
        <section className="panel">
          <h2>Coming back later</h2>
          {scheduled.slice(0, 10).map((e) => (
            <div className="simple-row" key={`${e.lesson.id}:${e.exercise.id}`}>
              <span>
                {e.lesson.title}
                <small>{e.retentionState}</small>
              </span>
              <span>
                {new Date(e.dueAt!).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
export function PracticeHub(props: DataProps) {
  return (
    <>
      <PageTitle
        eyebrow="PRACTICE LAB"
        title="A safe place to get it wrong."
        description="Rehearse the diagnostic sequence here, then prove it in your real Linux environment."
      />
      <div className="practice-hub-grid">
        <div>
          <TerminalSimulator />
          <DiagnosticTree />
        </div>
        <aside className="panel">
          <span className="eyebrow mint">NEXT REAL-WORLD CHALLENGE</span>
          <h2>The web service is down.</h2>
          <p>
            Restore Nginx without guessing. Capture the symptom, your
            hypothesis, the decisive observation, the fix, and recovery
            evidence.
          </p>
          <div className="ticket-meta">
            <span>
              <Clock3 size={15} />
              30–45 minutes
            </span>
            <span>
              <Monitor size={15} />
              Ubuntu / WSL2
            </span>
            <span>
              <ShieldCheck size={15} />
              Disposable local lab
            </span>
          </div>
          <a
            className="button primary full"
            href={link("lesson/troubleshoot-nginx")}
          >
            Open real practical
            <ArrowRight size={16} />
          </a>
          <p className="fine">
            Simulation success stays separate from real-world evidence.
          </p>
        </aside>
      </div>
      <section className="panel">
        <h2>Saved practical evidence</h2>
        {props.data.submissions.length ? (
          props.data.submissions
            .slice()
            .reverse()
            .map((s) => (
              <a
                className="simple-row"
                key={s.id}
                href={link(`lesson/${s.lessonId}`)}
              >
                <span>
                  {s.title}
                  <small>{new Date(s.at).toLocaleString()}</small>
                </span>
                <StatePill
                  state={
                    s.independent && !s.hintsUsed
                      ? "Independent declaration"
                      : "Guided / draft"
                  }
                />
              </a>
            ))
        ) : (
          <p className="muted">
            Your first saved output, explanation, or screenshot will appear
            here. Submissions stay on this device and travel with your JSON
            backup.
          </p>
        )}
      </section>
    </>
  );
}

export function Portfolio(props: DataProps & { id?: string }) {
  const selected = projects.find((p) => p.id === props.id);
  if (selected)
    return <ProjectEditor key={selected.id} {...props} project={selected} />;
  return (
    <>
      <PageTitle
        eyebrow="PORTFOLIO STUDIO"
        title="Proof you can point to."
        description="Build systems, explain the decisions, and make the work reproducible. A submitted link is a starting point; verification requires evidence and a peer review."
      />
      <div className="portfolio-grid">
        {projects.map((p) => {
          const saved = props.data.projects.find((s) => s.id === p.id);
          return (
            <a
              key={p.id}
              className={`panel portfolio-card ${p.id === "capstone" ? "capstone" : ""}`}
              href={link(`portfolio/${p.id}`)}
            >
              <div className="section-heading">
                <span className="project-number">PROJECT {p.number}</span>
                <span className="pill">{p.stage}</span>
              </div>
              <div className="project-illustration">
                <FolderGit2 size={38} />
                <div className="project-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <h2>{p.title}</h2>
              <p>{p.subtitle}</p>
              <div className="section-heading">
                <StatePill
                  state={
                    saved
                      ? isProjectVerified(saved)
                        ? "Portfolio Verified"
                        : "Evidence in progress"
                      : "Not yet submitted"
                  }
                />
                <ArrowUpRight size={18} />
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
function ProjectEditor({
  project,
  ...props
}: DataProps & { project: (typeof projects)[number] }) {
  const saved = props.data.projects.find((p) => p.id === project.id);
  const draft = useDraftState<ProjectSubmission>(
    `project:${project.id}`,
    () =>
      saved ?? {
        id: project.id,
        url: "",
        summary: "",
        evidence: "",
        rubricChecks: project.rubric.map(() => false),
        submittedAt: new Date().toISOString(),
        reviewer: "",
        reviewNotes: "",
      },
  );
  const form = draft.value;
  const setForm = draft.update;
  const [busy, setBusy] = useState(false);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      props.onData(
        await saveProject({ ...form, submittedAt: new Date().toISOString() }),
      );
      await draft.discard();
      props.notify(
        "Project evidence saved. Verification is peer-attested, not remotely authenticated.",
      );
    } catch (e) {
      props.notify((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  if (!draft.ready) return <p role="status">Restoring your project draft…</p>;
  return (
    <>
      <a className="back-link" href={link("portfolio")}>
        <ArrowLeft size={15} />
        Portfolio studio
      </a>
      <PageTitle
        eyebrow={`PROJECT ${project.number} · ${project.stage}`}
        title={project.title}
        description={project.brief}
      />
      <div className="lab-layout">
        <section>
          <div className="panel">
            <h2>Build brief</h2>
            <ol className="steps">
              {project.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <h3>Portfolio artifacts</h3>
            <ul className="check-list">
              {project.deliverables.map((d) => (
                <li key={d}>
                  <FileCheck2 size={16} />
                  {d}
                </li>
              ))}
            </ul>
            <div className="notice amber">
              <p>{project.cost}</p>
            </div>
            <h3>Preparation</h3>
            {project.lessons.map((id) => (
              <a className="simple-row" key={id} href={link(`lesson/${id}`)}>
                {lessonById(id)?.title ?? id}
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </section>
        <form className="panel" onSubmit={save}>
          <fieldset className="editor-fields" disabled={busy}>
            <h2>Submit your work</h2>
            {draft.error && (
              <p role="alert" className="notice amber">
                {draft.error}
              </p>
            )}
            <p className="fine">
              Drafts save locally as you type. Submit to assess and include this
              work in your backup.
            </p>
            <label htmlFor="project-url">Public project link</label>
            <input
              id="project-url"
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://github.com/you/project"
            />
            <label htmlFor="project-summary">What did you build and why?</label>
            <textarea
              id="project-summary"
              rows={3}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              placeholder="At least 40 characters. Explain the problem and resulting behavior."
            />
            <label htmlFor="project-evidence">
              Verification evidence and artifact locations
            </label>
            <textarea
              id="project-evidence"
              rows={5}
              value={form.evidence}
              onChange={(e) => setForm({ ...form, evidence: e.target.value })}
              placeholder="At least 80 characters. Link or describe test logs, incident evidence, setup instructions, architecture, and cleanup."
            />
            <fieldset>
              <legend>Project acceptance rubric</legend>
              {project.rubric.map((r, i) => (
                <label key={r} className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={form.rubricChecks[i] ?? false}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        rubricChecks: project.rubric.map((_, j) =>
                          i === j
                            ? e.target.checked
                            : (form.rubricChecks[j] ?? false),
                        ),
                      })
                    }
                  />
                  {r}
                </label>
              ))}
            </fieldset>
            <details className="peer-review">
              <summary>Record an independent peer review</summary>
              <p className="fine">
                Ask a peer to inspect and reproduce the work. Enter their
                feedback with permission. Reviewer identity is an
                unauthenticated local declaration.
              </p>
              <label htmlFor="reviewer">Reviewer name or handle</label>
              <input
                id="reviewer"
                value={form.reviewer}
                onChange={(e) => setForm({ ...form, reviewer: e.target.value })}
              />
              <label htmlFor="review-notes">
                What did the reviewer verify?
              </label>
              <textarea
                id="review-notes"
                rows={3}
                value={form.reviewNotes}
                onChange={(e) =>
                  setForm({ ...form, reviewNotes: e.target.value })
                }
                placeholder="At least 40 characters describing reproduction, findings, and resolved issues."
              />
            </details>
            <button className="button primary full" disabled={busy}>
              {busy ? "Saving…" : "Save project evidence"}
              <ArrowRight size={16} />
            </button>
            <p className="fine">
              Portfolio Verified requires all five checks, a valid project link,
              substantive evidence, and a named peer’s review notes. It is not
              an employer credential.
            </p>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export function Career(props: DataProps) {
  return (
    <>
      <PageTitle
        eyebrow="CAPABILITY ROADMAP"
        title="Readiness follows the evidence."
        description="Month 4 and Month 6 are planning targets, not deadlines or employment promises. Each gate explains the work still needed, with no invented employability percentage."
      />
      <div className="notice">
        <Target size={20} />
        <p>
          Use job descriptions to test relevance. Apply when your evidence
          matches the role; continue learning while applying. Atlas states
          reflect app-checked retrieval and learner/peer attestations, not
          independently audited credentials.
        </p>
      </div>
      {gates.map((g) => {
        const status = evaluateGate(g, props.data);
        return (
          <section className="panel gate-card" key={g.id}>
            <div className="section-heading">
              <span className="eyebrow">{g.timing}</span>
              <StatePill
                state={
                  g.id === "advanced"
                    ? "Deeper assessment pending"
                    : status.met
                      ? "Atlas evidence recorded"
                      : "Evidence still needed"
                }
              />
            </div>
            <h2>{g.title}</h2>
            <p>{g.description}</p>
            {g.id === "advanced" && (
              <div className="notice amber">
                <p>
                  The current Kubernetes bridge is a reading/diagnosis
                  checkpoint. Advanced readiness cannot be awarded until the
                  deeper cluster, rollout, networking, and security practicals
                  are released and assessed.
                </p>
              </div>
            )}
            <div className="topic-tags">
              {g.roles.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
            <details open={g.id === "month4" || g.id === "month6"}>
              <summary>
                {status.skills.filter((s) => s.met).length}/
                {status.skills.length} skill requirements · {status.count}/
                {g.projectCount} portfolio projects
              </summary>
              <div className="gate-grid">
                {status.skills.map((s) => (
                  <a
                    className="gate-skill"
                    href={link(`lesson/${s.id}`)}
                    key={s.id}
                  >
                    {s.met ? <CheckCircle2 size={17} /> : <Circle size={17} />}
                    <span>
                      {s.title}
                      <small>
                        {s.state} → needs {s.required}
                      </small>
                    </span>
                  </a>
                ))}
              </div>
              <h3>Required projects</h3>
              {status.projects.map((p) => (
                <a
                  className="simple-row"
                  key={p.id}
                  href={link(`portfolio/${p.id}`)}
                >
                  <span>{projects.find((x) => x.id === p.id)?.title}</span>
                  <span>
                    {p.met
                      ? "Peer-attested evidence recorded"
                      : "Portfolio evidence + review needed"}
                  </span>
                </a>
              ))}
              <p className="fine">{g.certs}</p>
            </details>
          </section>
        );
      })}
    </>
  );
}

export function Certifications(props: DataProps) {
  const [expanded, setExpanded] = useState<string | null>("linux-essentials");
  const [score, setScore] = useState("");
  const [source, setSource] = useState("");
  const [busy, setBusy] = useState(false);
  async function save(id: string) {
    if (
      !source.trim() ||
      score === "" ||
      Number(score) < 0 ||
      Number(score) > 100
    )
      return;
    setBusy(true);
    try {
      props.onData(
        await saveCertificationScore({
          id: newId(),
          certificationId: id,
          score: Number(score),
          at: new Date().toISOString(),
          source,
        }),
      );
      setScore("");
      setSource("");
      props.notify(
        "Practice result saved. This is your reported practice score, not an exam result.",
      );
    } catch (e) {
      props.notify((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageTitle
        eyebrow="CERTIFICATION ROADMAP"
        title="Credentials that support the work."
        description="Official details checked October 22, 2026. Start with practical competence; buy an exam only when it serves a clear next step."
      />
      <div className="notice">
        <GraduationCap size={24} />
        <p>{certificationStrategy}</p>
      </div>
      <p className="fine">{certificationReadinessNote}</p>
      <div className="cert-list">
        {certifications.map((c) => {
          const scores = props.data.certifications.filter(
            (s) => s.certificationId === c.id,
          );
          const relevant = lessons.filter((l) =>
            c.sections.includes(l.section),
          );
          const demonstrated = relevant.filter((l) =>
            ["Demonstrated", "Independent"].includes(
              getLessonProgress(l, props.data).state,
            ),
          ).length;
          const qualifying = scores.filter((s) => s.score >= 85);
          const spaced = qualifying.some((a) =>
            qualifying.some(
              (b) =>
                Math.abs(Date.parse(a.at) - Date.parse(b.at)) >= 7 * 86400000,
            ),
          );
          return (
            <article className="panel cert-card" key={c.id}>
              <button
                className="cert-toggle"
                onClick={() => {
                  setExpanded(expanded === c.id ? null : c.id);
                  setScore("");
                  setSource("");
                }}
                aria-expanded={expanded === c.id}
              >
                <span className="cert-icon">
                  <GraduationCap size={23} />
                </span>
                <span>
                  <small>{c.code}</small>
                  <h2>{c.name}</h2>
                  <p>{c.cost}</p>
                </span>
                <span
                  className={`pill ${c.priority === "High priority" ? "mint" : ""}`}
                >
                  {c.priority}
                </span>
                <ChevronRight
                  className={expanded === c.id ? "rotated" : ""}
                  size={18}
                />
              </button>
              {expanded === c.id && (
                <div className="cert-detail">
                  <p>{c.why}</p>
                  <div className="cert-columns">
                    <div>
                      <h3>When it makes sense</h3>
                      <p>{c.timing}</p>
                      <h3>Roles it can support</h3>
                      <p>{c.roles.join(" · ")}</p>
                      <h3>Prerequisites</h3>
                      <ul>
                        {c.prerequisites.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      <h3>Atlas preparation</h3>
                      <div className="topic-tags">
                        {c.sections.map((id) => (
                          <a key={id} href={link(`section/${id}`)}>
                            {sections.find((s) => s.id === id)?.title}
                          </a>
                        ))}
                      </div>
                      <p className="fine">
                        {demonstrated}/{relevant.length} released preparation
                        lessons demonstrated. Topic coverage has explicit
                        expansion gaps.
                      </p>
                    </div>
                    <div>
                      <h3>Readiness checklist</h3>
                      <ul className="check-list">
                        {c.readiness.map((r) => (
                          <li key={r}>
                            <Circle size={14} />
                            {r}
                          </li>
                        ))}
                      </ul>
                      <div className="notice">
                        <p>{c.practiceThreshold}</p>
                      </div>
                      <h3>Practice-exam log</h3>
                      <p className="fine">
                        Record legitimate unseen practice sets. Date is recorded
                        now.{" "}
                        {spaced
                          ? "Two reported scores meet the 85% / 7-day target; independently verify the checklist before booking."
                          : "The standard target is two scores ≥85%, at least 7 days apart. Lab-based certifications have additional practical criteria above."}
                      </p>
                      <div className="score-inputs">
                        <label>
                          Score %
                          <input
                            aria-label={`Practice score for ${c.name}`}
                            type="number"
                            min="0"
                            max="100"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                          />
                        </label>
                        <label>
                          Practice set/source
                          <input
                            aria-label="Practice exam source"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            maxLength={2000}
                          />
                        </label>
                      </div>
                      <button
                        className="button secondary small"
                        disabled={busy || score === "" || !source.trim()}
                        onClick={() => void save(c.id)}
                      >
                        Record practice score
                      </button>
                      {scores.map((s) => (
                        <div className="simple-row" key={s.id}>
                          <span>
                            {s.source}
                            <small>{new Date(s.at).toLocaleDateString()}</small>
                          </span>
                          <strong>{s.score}%</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                  <a
                    className="button primary"
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Official exam & current price
                    <ExternalLink size={16} />
                  </a>
                  <p className="fine">{c.verified}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}

export function Resources() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const filtered = resources.filter(
    (r) =>
      (kind === "All" || r.kind === kind) &&
      `${r.title} ${r.publisher} ${r.why}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageTitle
        eyebrow="CURATED RESOURCE LIBRARY"
        title="Good references. Clear purpose."
        description="Use a source to answer a question, deepen an idea, or rehearse a skill. Start with the lesson; use these references deliberately."
      />
      <div className="filter-bar">
        <div className="search-field">
          <Search size={17} />
          <input
            aria-label="Search resources"
            placeholder="Search documentation, courses, labs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          aria-label="Resource type"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
        >
          {["All", "Documentation", "Course", "Lab", "Video", "Reference"].map(
            (k) => (
              <option key={k}>{k}</option>
            ),
          )}
        </select>
      </div>
      <div className="resource-grid">
        {filtered.map((r) => (
          <article key={r.id} className="panel resource-card">
            <div className="section-heading">
              <span className="eyebrow">{r.publisher}</span>
              <span className="pill">{r.kind}</span>
            </div>
            <h2>
              <a href={r.url} target="_blank" rel="noreferrer">
                {r.title}
                <ArrowUpRight size={16} />
              </a>
            </h2>
            <p>{r.why}</p>
            <p>
              <strong>Use it when:</strong> {r.when}
            </p>
            <div className="resource-meta">
              <span>{r.difficulty}</span>
              <span>{r.required ? "Core reference" : "Optional"}</span>
            </div>
            <p className="fine">Checked {r.checked}</p>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <p className="empty">No resources match your search.</p>
      )}
    </>
  );
}
function download(name: string, text: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "application/json" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function Settings(props: DataProps) {
  const [pending, setPending] = useState<{
    text: string;
    data: AtlasData;
    name: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  async function choose(file?: File) {
    if (!file) return;
    try {
      if (file.size > MAX_BACKUP_BYTES)
        throw new Error(
          "Backup is larger than 50 MB. Your saved progress was not changed.",
        );
      const text = await file.text();
      const data = parseBackup(text);
      setPending({ text, data, name: file.name });
    } catch (e) {
      props.notify((e as Error).message);
    }
  }
  async function merge() {
    if (!pending) return;
    setBusy(true);
    try {
      props.onData(await importBackup(pending.text));
      setPending(null);
      props.notify(
        "Backup merged safely. Existing unique attempts and submissions are preserved.",
      );
    } catch (e) {
      props.notify((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageTitle
        eyebrow="YOUR DATA, YOUR DEVICE"
        title="Take your progress with you."
        description="Atlas uses IndexedDB in this browser. Export a JSON backup before switching computers, clearing browser data, or changing browsers."
      />
      <div className="settings-grid">
        <section className="panel">
          <div className="large-icon">
            <Download size={25} />
          </div>
          <h2>Export progress</h2>
          <p>
            Includes prior history, retrieval attempts, practical submissions,
            screenshots, projects, and certification practice scores.
            Unsubmitted drafts stay on this browser; save them as evidence
            before exporting.
          </p>
          <button
            className="button primary"
            onClick={() => {
              try {
                download(
                  `atlas-backup-${new Date().toISOString().slice(0, 10)}.json`,
                  exportBackup(props.data),
                );
                props.notify(
                  "Backup downloaded. Keep it somewhere you can access from your other computer.",
                );
              } catch (e) {
                props.notify((e as Error).message);
              }
            }}
          >
            <ArrowDownToLine size={17} />
            Download JSON backup
          </button>
          <button
            className="text-button"
            onClick={() => {
              try {
                download(
                  `atlas-evidence-${new Date().toISOString().slice(0, 10)}.json`,
                  exportBackup({
                    ...props.data,
                    attempts: [],
                    priorHistory: [],
                    certifications: [],
                  }),
                );
                props.notify("Practical and portfolio evidence exported.");
              } catch (e) {
                props.notify((e as Error).message);
              }
            }}
          >
            Export submissions & portfolio only
            <ArrowRight size={14} />
          </button>
        </section>
        <section className="panel">
          <div className="large-icon">
            <Upload size={25} />
          </div>
          <h2>Import a backup</h2>
          <p>
            Choose an Atlas version 1 JSON file. Preview its contents, then
            merge. Duplicate records are not counted twice.
          </p>
          <label className="button secondary file-label">
            <Upload size={17} />
            Choose JSON file
            <input
              aria-label="Import progress JSON"
              type="file"
              accept="application/json,.json"
              onChange={(e) => {
                void choose(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
          <p className="fine">
            50 MB maximum. Validation finishes before any saved data changes.
          </p>
        </section>
      </div>
      {pending && (
        <section className="panel import-preview">
          <div className="section-heading">
            <h2>Ready to merge: {pending.name}</h2>
            <button
              className="icon-button"
              aria-label="Cancel import"
              onClick={() => setPending(null)}
            >
              <X size={18} />
            </button>
          </div>
          <p>
            {pending.data.attempts.length} retrieval attempts ·{" "}
            {pending.data.submissions.length} practical submissions ·{" "}
            {pending.data.projects.length} projects ·{" "}
            {pending.data.certifications.length} practice scores
          </p>
          <p>
            Unique evidence is added. Newer edits to the same submission or
            project win. Conflicting immutable attempts stop the import and
            preserve the current database.
          </p>
          <button
            className="button primary"
            disabled={busy}
            onClick={() => void merge()}
          >
            {busy ? "Merging…" : "Merge this backup"}
            <ArrowRight size={16} />
          </button>
        </section>
      )}
      <section className="panel">
        <h2>Storage & assessment boundaries</h2>
        <div className="privacy-grid">
          <div>
            <LockKeyhole size={21} />
            <h3>Local by design</h3>
            <p>
              No accounts, analytics, private API keys, or server-side
              submission storage. GitHub serves the public app; your evidence
              stays in your browser until you export or share it.
            </p>
          </div>
          <div>
            <ShieldCheck size={21} />
            <h3>Back up intentionally</h3>
            <p>
              Private browsing, storage eviction, or clearing site data can
              remove local records. Mac, Windows, different browsers, and
              different site origins have separate stores.
            </p>
          </div>
          <div>
            <ListChecks size={21} />
            <h3>Evidence has limits</h3>
            <p>
              Text matching checks retrieval. Practical self-checks, dates, and
              peer identities are local declarations. Atlas does not
              authenticate your terminal output or guarantee a job or exam pass.
            </p>
          </div>
        </div>
        <p className="fine">
          Last database update:{" "}
          {new Date(props.data.updatedAt).toLocaleString()} · Schema version{" "}
          {props.data.version}
        </p>
      </section>
      <section className="panel">
        <h2>What is fully released?</h2>
        <p>
          {lessons.length} lessons across foundational and bridge topics, with
          real teaching, retrieval, and practical rubrics. The 22-section map
          continues beyond those lessons. Deeper advanced labs are tracked
          below; they are not counted as completed content.
        </p>
        <details>
          <summary>Advanced content expansion manifest</summary>
          {expansionBacklog.map((b) => (
            <div key={b.section}>
              <h3>{sections.find((s) => s.id === b.section)?.title}</h3>
              <ul>
                {b.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </details>
        <p>
          <a
            href="https://github.com/christopher-kiser/project-atlas-school"
            target="_blank"
            rel="noreferrer"
          >
            Source, development instructions, and content backlog{" "}
            <ExternalLink size={14} />
          </a>
        </p>
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <section className="panel empty">
      <Search size={30} />
      <h1>This route has no lesson yet.</h1>
      <p>Your saved progress is still here. Return to the learning path.</p>
      <a className="button primary" href={link("curriculum")}>
        Open curriculum
        <ArrowRight size={16} />
      </a>
    </section>
  );
}
