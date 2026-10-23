import { useState } from "react";
import { CommandExplanation } from "./LessonStudy";
import { useDraftState } from "../lib/useDraftState";
import {
  ArrowRight,
  Check,
  CircleHelp,
  Copy,
  FileUp,
  FlaskConical,
  Lightbulb,
  Play,
  RotateCcw,
  Save,
  Terminal,
  X,
} from "lucide-react";
import type { Exercise, Lesson } from "../content/types";
import {
  getLessonProgress,
  makeAttempt,
  newId,
  type AtlasData,
  type AttemptContext,
  type Attachment,
  type LabSubmission,
} from "../lib/learning";
import {
  appendAttempt,
  fileToAttachment,
  saveSubmission,
} from "../lib/storage";

export type DataProps = {
  data: AtlasData;
  onData: (data: AtlasData) => void;
  notify: (message: string) => void;
};
export function CodeBlock({
  code,
  title = "Terminal · read before running",
}: {
  code: string;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="code-block">
      <div className="code-top">
        <span>
          <Terminal size={14} />
          {title}
        </span>
        <button
          className="icon-button"
          aria-label="Copy code"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
export function ExerciseCard({
  lesson,
  exercise,
  data,
  onData,
  notify,
  context = "lesson",
}: DataProps & {
  lesson: Lesson;
  exercise: Exercise;
  context?: AttemptContext;
}) {
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const attempts = data.attempts.filter(
    (a) => a.lessonId === lesson.id && a.exerciseId === exercise.id,
  );
  const last = attempts.at(-1);
  const recentlyShown =
    !!last && Date.now() - Date.parse(last.at) < 10 * 60 * 1000;
  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim() || busy) return;
    setBusy(true);
    const attempt = makeAttempt(
      lesson.id,
      exercise,
      answer,
      hint || revealed || recentlyShown,
      context,
    );
    try {
      onData(await appendAttempt(attempt));
      setResult(attempt.correct);
      setRevealed(true);
    } catch (error) {
      notify((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <article className="exercise-card">
      <div className="eyebrow">
        <span className="tiny-dot" />
        {exercise.kind === "recall"
          ? "Retrieve from memory"
          : exercise.kind === "predict"
            ? "Predict the result"
            : exercise.kind === "fill"
              ? "Complete the command"
              : exercise.kind === "choice"
                ? "Knowledge check"
                : "Diagnose the problem"}
        <span className="spacer" />
        {attempts.length > 0 && (
          <span>
            {attempts.length} attempt{attempts.length === 1 ? "" : "s"}
          </span>
        )}
      </div>
      <h3>{exercise.prompt}</h3>
      <form onSubmit={check}>
        {exercise.options ? (
          <div className="answer-options">
            {exercise.options.map((o) => (
              <label key={o}>
                <input
                  type="radio"
                  name={exercise.id}
                  checked={answer === o}
                  onChange={() => setAnswer(o)}
                />
                {o}
              </label>
            ))}
          </div>
        ) : (
          <label className="sr-only" htmlFor={exercise.id}>
            Your answer
          </label>
        )}
        {!exercise.options && (
          <input
            id={exercise.id}
            className="command-input"
            placeholder="Type your answer from memory…"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setResult(null);
            }}
            autoComplete="off"
            spellCheck={false}
            maxLength={10000}
          />
        )}
        <div className="form-actions">
          <button
            className="button primary small"
            disabled={!answer.trim() || busy}
          >
            {busy ? "Saving…" : "Check answer"}
            <ArrowRight size={14} />
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => setHint(true)}
          >
            <Lightbulb size={15} />
            Need a hint
          </button>
        </div>
      </form>
      {hint && (
        <p className="hint">
          <Lightbulb size={16} />
          {exercise.hint}
        </p>
      )}
      {recentlyShown && result === null && (
        <p className="fine">
          You recently saw this answer. Another attempt within 10 minutes counts
          as practice with support.
        </p>
      )}
      {result !== null && (
        <div
          className={`feedback ${result ? "correct" : "incorrect"}`}
          role="status"
        >
          <strong>
            {result
              ? "Correct — evidence saved."
              : "Not quite — this is useful evidence."}
          </strong>
          <p>{exercise.explanation}</p>
          <code>{exercise.answers[0]}</code>
          <p className="fine">
            {hint || recentlyShown
              ? "Recorded with support. Try an unaided retrieval later."
              : "Review is scheduled. One correct answer does not establish mastery."}
          </p>
        </div>
      )}
    </article>
  );
}

export function CommandExplorer({ lesson }: { lesson: Lesson }) {
  const [index, setIndex] = useState(0);
  const command = lesson.commands[index];
  if (!command) return null;
  const detail = lesson.study?.commandDetails.find(
    (item) => item.command === command.command,
  );
  const extra =
    lesson.study?.commandDetails.filter(
      (item) =>
        !lesson.commands.some((known) => known.command === item.command),
    ) ?? [];
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Command explorer</h2>
        <span className="muted">One tool at a time</span>
      </div>
      <p className="muted">
        Choose each command to read its parts, expected result, and common
        mistakes. The supporting syntax below explains other expressions used in
        the worked example.
      </p>
      <div className="command-tabs" role="group" aria-label="Choose a command">
        {lesson.commands.map((c, i) => (
          <button
            className={i === index ? "selected" : ""}
            aria-pressed={i === index}
            key={c.command}
            onClick={() => setIndex(i)}
          >
            {c.command}
          </button>
        ))}
      </div>
      <h3>{command.purpose}</h3>
      <CodeBlock code={command.example} />
      {detail && <CommandExplanation detail={detail} />}
      {command.caution && (
        <p className="notice amber">
          <CircleHelp size={17} />
          {command.caution}
        </p>
      )}
      {extra.length > 0 && (
        <details className="study-extra-syntax" open>
          <summary>Supporting syntax to understand</summary>
          {extra.map((item) => (
            <div key={item.command}>
              <h3>
                <code>{item.command}</code>
              </h3>
              <CommandExplanation detail={item} />
            </div>
          ))}
        </details>
      )}
    </section>
  );
}

export function LabWorkspace({
  lesson,
  data,
  onData,
  notify,
}: DataProps & { lesson: Lesson }) {
  const history = data.submissions
    .filter((s) => s.lessonId === lesson.id)
    .sort((a, b) => a.at.localeCompare(b.at));
  const saved = history.at(-1);
  const hasAttempt =
    !!saved &&
    ([
      saved.output,
      saved.commands,
      saved.notes,
      saved.explanation,
      saved.code,
      saved.config,
    ].some((v) => v.trim().length >= 20) ||
      saved.screenshots.length > 0);
  const blank = (): LabSubmission => ({
    id: newId(),
    lessonId: lesson.id,
    at: new Date().toISOString(),
    title: lesson.lab.title,
    output: "",
    commands: "",
    notes: "",
    explanation: "",
    code: "",
    config: "",
    links: [],
    screenshots: [],
    rubricChecks: lesson.lab.rubric.map(() => false),
    independent: false,
    hintsUsed: false,
  });
  const draft = useDraftState<LabSubmission>(`lab:${lesson.id}`, () =>
    saved
      ? {
          ...saved,
          screenshots: [...saved.screenshots],
          rubricChecks: [...saved.rubricChecks],
        }
      : blank(),
  );
  const form = draft.value;
  const setForm = draft.update;
  const links = form.links.join("\n");
  const setLinks = (value: string) =>
    setForm((f) => ({ ...f, links: value.split("\n") }));
  const [tab, setTab] = useState<
    "output" | "commands" | "code" | "config" | "notes"
  >("output");
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [busy, setBusy] = useState(false);
  const dirty = draft.hasDraft;
  const field = <K extends keyof LabSubmission>(
    key: K,
    value: LabSubmission[K],
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };
  async function save() {
    setBusy(true);
    try {
      const next = {
        ...form,
        at: new Date().toISOString(),
        links: links
          .split("\n")
          .map((x) => x.trim())
          .filter(Boolean),
        hintsUsed: form.hintsUsed || showHints || showSolution,
      };
      onData(await saveSubmission(next));
      setForm(next);
      await draft.discard();
      notify("Practical evidence saved on this device.");
    } catch (e) {
      notify((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function addImages(files: FileList | null) {
    if (!files) return;
    setBusy(true);
    try {
      const images = await Promise.all([...files].map(fileToAttachment));
      if (form.screenshots.length + images.length > 6)
        throw new Error("Attach up to six screenshots per practical.");
      field("screenshots", [...form.screenshots, ...images]);
    } catch (e) {
      notify((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const progress = getLessonProgress(lesson, data);
  if (!draft.ready)
    return <p role="status">Restoring your evidence notebook…</p>;
  return (
    <div className="lab-layout">
      <div className="lab-instructions">
        <div className="eyebrow mint">
          <FlaskConical size={15} />
          REAL-WORLD PRACTICAL
        </div>
        <h2>{lesson.lab.title}</h2>
        <p>{lesson.lab.scenario}</p>
        <div className="notice">
          <strong>Your environment</strong>
          <p>{lesson.lab.environment}</p>
        </div>
        <h3>Mission steps</h3>
        <ol className="steps">
          {lesson.lab.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <h3>Evidence to capture</h3>
        <ul className="check-list">
          {lesson.lab.evidence.map((e) => (
            <li key={e}>
              <FileUp size={15} />
              {e}
            </li>
          ))}
        </ul>
        <button
          className="text-button"
          disabled={busy}
          onClick={() => {
            setShowHints(true);
            field("hintsUsed", true);
          }}
        >
          <Lightbulb size={16} />
          Open hint drawer
        </button>
        {showHints && (
          <div className="hint-drawer">
            {lesson.lab.hints.map((h) => (
              <p key={h}>{h}</p>
            ))}
          </div>
        )}
        <button
          className="text-button"
          disabled={!hasAttempt || busy}
          onClick={() => {
            setShowSolution(true);
            field("hintsUsed", true);
          }}
        >
          Reveal solution{!hasAttempt ? " · save an attempt first" : ""}
        </button>
        {showSolution && (
          <CodeBlock
            code={lesson.lab.solution}
            title="Worked solution · support recorded"
          />
        )}
        <div className="independent-challenge">
          <span className="eyebrow">Then work independently</span>
          <p>{lesson.lab.challenge}</p>
          <button
            className="text-button"
            disabled={dirty || busy}
            onClick={() => {
              setForm(blank());
              setShowHints(false);
              setShowSolution(false);
              notify(
                "New practical attempt. Complete the independent challenge before attesting to it.",
              );
            }}
          >
            Start a new attempt
            <ArrowRight size={14} />
          </button>
          {dirty && (
            <p className="fine">
              Save your draft before starting another attempt.
            </p>
          )}
        </div>
      </div>
      <fieldset disabled={busy} className="panel submission-panel">
        <div className="section-heading">
          <h2>Evidence notebook</h2>
          <span className="pill">
            {draft.saving
              ? "Saving draft…"
              : dirty
                ? "Draft autosaved"
                : saved
                  ? "Saved locally"
                  : "Local only"}
          </span>
        </div>
        {draft.error && (
          <p role="alert" className="notice amber">
            {draft.error}
          </p>
        )}
        <p className="fine">
          Drafts save locally as you type. Use Save evidence to assess and
          include them in backups. Use Evidence for terminal output or a design
          artifact, and Notes for your working notes. Remove credentials and
          private information. The app checks completeness; it cannot verify
          your machine.
        </p>
        <div className="tabs compact" role="group" aria-label="Evidence type">
          {(["output", "commands", "code", "config", "notes"] as const).map(
            (t) => (
              <button
                key={t}
                className={tab === t ? "active" : ""}
                onClick={() => setTab(t)}
              >
                {t === "output"
                  ? "Evidence"
                  : t === "commands"
                    ? "Commands"
                    : t === "config"
                      ? "Config"
                      : t === "code"
                        ? "Code"
                        : "Notes"}
              </button>
            ),
          )}
        </div>
        <label className="sr-only" htmlFor="evidence-input">
          {tab} evidence
        </label>
        <textarea
          id="evidence-input"
          className="code-editor"
          spellCheck={false}
          placeholder={
            tab === "output"
              ? "Paste terminal output, a text diagram, or another expected artifact here…"
              : `Paste your ${tab} here…`
          }
          value={form[tab]}
          maxLength={100000}
          onChange={(e) => field(tab, e.target.value)}
        />
        <label htmlFor="lab-explanation">
          Explain your reasoning{" "}
          <span className="muted">(at least 40 characters)</span>
        </label>
        <textarea
          id="lab-explanation"
          value={form.explanation}
          placeholder="What did you observe? What did it rule out? Why did your fix work, and how did you prove it?"
          onChange={(e) => field("explanation", e.target.value)}
          maxLength={100000}
          rows={4}
        />
        <details className="attachment-details">
          <summary>Attach screenshots or project links</summary>
          <label htmlFor="lab-links">
            Project/reference links · one per line
          </label>
          <textarea
            id="lab-links"
            value={links}
            onChange={(e) => {
              setLinks(e.target.value);
            }}
            placeholder="https://github.com/…"
            rows={2}
          />
          <label className="file-label">
            <FileUp size={16} />
            Add screenshots
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              onChange={(e) => {
                void addImages(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          <p className="fine">
            PNG, JPEG, WebP · up to 3 MB each · 6 per attempt. Included in JSON
            backups.
          </p>
          <div className="attachments">
            {form.screenshots.map((a: Attachment) => (
              <figure key={a.id}>
                <img src={a.dataUrl} alt={a.name} />
                <button
                  className="icon-button"
                  aria-label={`Remove ${a.name}`}
                  onClick={() =>
                    field(
                      "screenshots",
                      form.screenshots.filter((x) => x.id !== a.id),
                    )
                  }
                >
                  <X size={14} />
                </button>
                <figcaption>{a.name}</figcaption>
              </figure>
            ))}
          </div>
        </details>
        <fieldset>
          <legend>Self-check against the evidence</legend>
          {lesson.lab.rubric.map((r, i) => (
            <label className="checkbox-row" key={r}>
              <input
                type="checkbox"
                checked={form.rubricChecks[i] ?? false}
                onChange={(e) =>
                  field(
                    "rubricChecks",
                    lesson.lab.rubric.map((_, j) =>
                      i === j
                        ? e.target.checked
                        : (form.rubricChecks[j] ?? false),
                    ),
                  )
                }
              />
              <span>{r}</span>
            </label>
          ))}
        </fieldset>
        <label className="checkbox-row independent-check">
          <input
            type="checkbox"
            checked={form.independent}
            disabled={form.hintsUsed || showHints || showSolution}
            onChange={(e) => field("independent", e.target.checked)}
          />
          <span>
            I completed this attempt independently, without AI, hints, or the
            worked solution.
          </span>
        </label>
        {form.hintsUsed && (
          <p className="fine">
            Support was used in this attempt. Save it as guided practice, then
            try the independent challenge later.
          </p>
        )}
        <button
          className="button primary full"
          onClick={() => void save()}
          disabled={busy}
        >
          <Save size={17} />
          {busy ? "Saving evidence…" : "Save evidence & assess"}
        </button>
        <div className="assessment-note">
          <strong>Current state: {progress.state}</strong>
          {progress.reasons.slice(0, 3).map((r) => (
            <p key={r}>{r}</p>
          ))}
        </div>
        {history.length > 0 && (
          <details>
            <summary>Attempt history</summary>
            {history
              .slice()
              .reverse()
              .map((s) => (
                <details key={s.id}>
                  <summary>
                    {new Date(s.at).toLocaleString()} ·{" "}
                    {s.independent && !s.hintsUsed
                      ? "Independent declaration"
                      : "Guided / draft"}
                  </summary>
                  <p>{s.explanation || "No explanation recorded."}</p>
                  {(["output", "commands", "code", "config", "notes"] as const)
                    .filter((k) => s[k])
                    .map((k) => (
                      <CodeBlock key={k} title={k} code={s[k]} />
                    ))}
                  {s.screenshots.map((a) => (
                    <img
                      className="history-image"
                      key={a.id}
                      src={a.dataUrl}
                      alt={a.name}
                    />
                  ))}
                  {s.links.map((url) => (
                    <p key={url}>
                      <a href={url} target="_blank" rel="noreferrer">
                        {url}
                      </a>
                    </p>
                  ))}
                </details>
              ))}
          </details>
        )}
      </fieldset>
    </div>
  );
}

export function TerminalSimulator() {
  const [running, setRunning] = useState(false);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("/home/learner");
  const [lines, setLines] = useState<string[]>([
    "Atlas sandbox · a limited browser simulation",
    "Ticket: localhost is refusing HTTP connections.",
    "Type help to see supported commands. Nothing runs on your computer.",
  ]);
  const [verified, setVerified] = useState(false);
  function execute(e: React.FormEvent) {
    e.preventDefault();
    const command = input.trim().replace(/\s+/g, " ");
    if (!command) return;
    let out =
      "Unsupported in this simulation. Type help; use your real Ubuntu terminal for real labs.";
    if (command === "help")
      out =
        "Supported: pwd, ls, cd /var/log, cd ~, systemctl status nginx, journalctl -u nginx, ss -tuln, curl localhost, sudo systemctl start nginx, sudo systemctl stop nginx";
    else if (command === "pwd") out = cwd;
    else if (command === "ls")
      out =
        cwd === "/var/log" ? "nginx/  syslog  apt/" : "atlas-labs/  notes.txt";
    else if (command === "cd /var/log") {
      setCwd("/var/log");
      out = "";
    } else if (command === "cd ~") {
      setCwd("/home/learner");
      out = "";
    } else if (command === "systemctl status nginx")
      out = running
        ? "● nginx.service — active (running)\nMain PID: 421 (nginx)"
        : "○ nginx.service — inactive (dead)\nLast event: stopped by operator";
    else if (command.startsWith("journalctl -u nginx"))
      out = running
        ? "[simulated] Started nginx.service."
        : "[simulated] Stopping nginx.service…\n[simulated] Stopped nginx.service. Clean shutdown.";
    else if (command === "ss -tuln" || command === "ss -tln")
      out = running
        ? "State  Local Address:Port\nLISTEN 0.0.0.0:80"
        : "State  Local Address:Port\n(no HTTP listener)";
    else if (
      [
        "curl localhost",
        "curl http://localhost",
        "curl -I localhost",
        "curl -I http://localhost",
      ].includes(command)
    ) {
      out = running
        ? "HTTP/1.1 200 OK\nServer: nginx (simulated)"
        : "curl: (7) Failed to connect to localhost port 80: Connection refused";
      if (running) setVerified(true);
    } else if (command === "sudo systemctl start nginx") {
      setRunning(true);
      out = "[simulated] Service started. Now prove recovery.";
    } else if (command === "sudo systemctl stop nginx") {
      setRunning(false);
      setVerified(false);
      out = "[simulated] Service stopped.";
    }
    setLines((l) => [...l, `${cwd} $ ${command}`, out].slice(-70));
    setInput("");
  }
  return (
    <section className="terminal-simulator">
      <div className="code-top">
        <span>
          <span className="terminal-dots">
            <i />
            <i />
            <i />
          </span>
          atlas@practice:~
        </span>
        <span className="pill">SIMULATION</span>
      </div>
      <div
        className="terminal-screen"
        role="log"
        aria-label="Simulation output"
      >
        {lines.map((l, i) => (
          <div key={i} className={l.includes(" $ ") ? "terminal-command" : ""}>
            {l || " "}
          </div>
        ))}
      </div>
      <form onSubmit={execute} className="terminal-prompt">
        <span>$</span>
        <label className="sr-only" htmlFor="sim-command">
          Simulation command
        </label>
        <input
          id="sim-command"
          autoComplete="off"
          spellCheck={false}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start with an observation…"
        />
        <button className="icon-button" aria-label="Run simulated command">
          <Play size={16} />
        </button>
      </form>
      <div className="sim-footer">
        <span>
          {verified
            ? "HTTP recovery observed. Explain the cause in your real lab."
            : "Inspect → hypothesize → repair → verify"}
        </span>
        <button
          className="text-button"
          onClick={() => {
            setLines(["Simulation reset. HTTP service is stopped."]);
            setRunning(false);
            setVerified(false);
            setCwd("/home/learner");
          }}
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>
      <p className="fine simulator-note">
        This model supports a small command vocabulary. It does not execute
        Linux, contact AWS, or award real-lab competence.
      </p>
    </section>
  );
}

export function DiagnosticTree() {
  const [answer, setAnswer] = useState("");
  return (
    <section className="panel">
      <span className="eyebrow">Incident reasoning</span>
      <h2>Connection refused. What next?</h2>
      <p>
        A local request fails immediately. DNS has already resolved. Choose the
        observation that most directly tests whether something is accepting the
        connection.
      </p>
      <div className="decision-options">
        {[
          "Inspect the listening sockets",
          "Change the DNS resolver",
          "Open every firewall port",
        ].map((a) => (
          <button
            className={answer === a ? "selected" : ""}
            key={a}
            onClick={() => setAnswer(a)}
          >
            {a}
            <ArrowRight size={15} />
          </button>
        ))}
      </div>
      {answer && (
        <div
          className={`feedback ${answer.startsWith("Inspect") ? "correct" : "incorrect"}`}
          role="status"
        >
          {answer.startsWith("Inspect")
            ? "Inspect ss -tuln, then service status and logs. No listener supports an application/service hypothesis. A refusal can also come from an explicit reject rule; keep the interpretation bounded."
            : answer.startsWith("Change")
              ? "The name already resolved. Changing the resolver does not test the listening endpoint. Inspect the socket and service first."
              : "Opening every port increases exposure without establishing the cause. Inspect the listener and use a targeted rule only if evidence points to policy."}
        </div>
      )}
    </section>
  );
}
