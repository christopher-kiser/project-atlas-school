import { useId, useRef, useState, type FormEvent } from "react";
import { certificationPractice, lessonById } from "../content";
import { newId } from "../lib/learning";
import { link } from "../lib/navigation";
import { safeUrl, saveCertificationScore } from "../lib/storage";
import type { DataProps } from "./Practice";

type CertificationProps = DataProps & {
  certificationId: string;
  certificationName: string;
};
type StudyAnswer = { questionId: string; choice: number; correct: boolean };

function LessonLinks({ lessonIds }: { lessonIds: string[] }) {
  return (
    <p className="fine">
      Review foundations (opens in a new tab to keep this study session):{" "}
      {lessonIds.map((id, index) => (
        <span key={id}>
          {index > 0 && " · "}
          <a
            href={link(`lesson/${id}`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {lessonById(id)?.title ?? id}
          </a>
        </span>
      ))}
    </p>
  );
}

export function CertificationStudy(props: CertificationProps) {
  return <StudySession key={props.certificationId} {...props} />;
}

function StudySession({
  data,
  onData,
  notify,
  certificationId,
  certificationName,
}: CertificationProps) {
  const questions = certificationPractice.filter(
    (question) => question.certificationId === certificationId,
  );
  const history = data.certifications
    .filter(
      (record) =>
        record.certificationId === certificationId && record.kind === "study",
    )
    .slice()
    .sort((a, b) => b.at.localeCompare(a.at));
  const radioId = useId();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<StudyAnswer[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const saving = useRef(false);
  const question = questions[index];
  const correct = answers.filter((answer) => answer.correct).length;
  const score = questions.length
    ? Math.round((correct / questions.length) * 100)
    : 0;

  function start() {
    setSessionId(newId());
    setStarted(true);
    setIndex(0);
    setChoice(null);
    setChecked(false);
    setAnswers([]);
    setCompletedAt("");
    setSaved(false);
    setError("");
  }

  function check(event: FormEvent) {
    event.preventDefault();
    if (choice === null || checked || !question) return;
    setAnswers((previous) => [
      ...previous,
      {
        questionId: question.id,
        choice,
        correct: choice === question.answer,
      },
    ]);
    setChecked(true);
  }

  function next() {
    if (!checked) return;
    if (index === questions.length - 1) {
      setCompletedAt(new Date().toISOString());
    } else {
      setIndex((previous) => previous + 1);
      setChoice(null);
      setChecked(false);
    }
  }

  async function save() {
    if (!completedAt || saved || saving.current) return;
    saving.current = true;
    setBusy(true);
    setError("");
    try {
      onData(
        await saveCertificationScore({
          id: sessionId,
          certificationId,
          score,
          at: completedAt,
          source: `Atlas original study set · ${correct}/${questions.length} correct · repeated teaching questions, not a full unseen practice exam`,
          kind: "study",
        }),
      );
      setSaved(true);
      notify(
        "Study result saved to your learning record. Lesson mastery and exam readiness are unchanged.",
      );
    } catch (failure) {
      const message =
        failure instanceof Error
          ? failure.message
          : "Study result could not be saved.";
      setError(message);
      notify(message);
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }

  if (!questions.length && !history.length) return null;

  return (
    <section
      className="panel"
      aria-label={`Atlas study for ${certificationName}`}
    >
      <h3>Atlas study practice</h3>
      <p className="fine">
        Original teaching questions with explanations. This short, repeatable
        set is separate from unseen practice exams, lesson mastery, and provider
        credentials. It does not predict an exam result.
      </p>
      {!started && questions.length > 0 && (
        <button className="button secondary small" onClick={start}>
          Start {questions.length}-question study set
        </button>
      )}
      {started && !completedAt && question && (
        <>
          <p className="fine" aria-live="polite">
            Question {index + 1} of {questions.length} · {question.domain}
          </p>
          <form onSubmit={check}>
            <fieldset disabled={checked}>
              <legend>{question.prompt}</legend>
              <div className="answer-options">
                {question.options.map((option, optionIndex) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={`${radioId}-${question.id}`}
                      value={optionIndex}
                      checked={choice === optionIndex}
                      onChange={() => setChoice(optionIndex)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
            {!checked && (
              <button
                className="button primary small"
                disabled={choice === null}
              >
                Check answer
              </button>
            )}
          </form>
          {checked && choice !== null && (
            <div
              className={`feedback ${choice === question.answer ? "correct" : "incorrect"}`}
              role="status"
            >
              <strong>
                {choice === question.answer
                  ? "Correct."
                  : "Review this choice."}
              </strong>
              {choice !== question.answer && (
                <p>{question.wrongAnswerExplanations[choice]}</p>
              )}
              <p>{question.explanation}</p>
              {choice !== question.answer && (
                <p>Best answer: {question.options[question.answer]}</p>
              )}
              <LessonLinks lessonIds={question.lessonIds} />
              <button
                type="button"
                className="button secondary small"
                onClick={next}
              >
                {index === questions.length - 1
                  ? "Finish study set"
                  : "Next question"}
              </button>
            </div>
          )}
        </>
      )}
      {completedAt && (
        <>
          <p className="notice" role="status">
            Study result: {correct} of {questions.length} correct ({score}%).
            {saved
              ? " Saved to your learning record."
              : " Save this result to your study history."}
          </p>
          <p className="fine">
            Repeating these questions can improve recall. Use a legitimate
            unseen practice set and the practical readiness checklist to assess
            remaining gaps.
          </p>
          {answers.some((answer) => !answer.correct) && (
            <details>
              <summary>Review missed questions</summary>
              {answers
                .filter((answer) => !answer.correct)
                .map((answer) => {
                  const missed = questions.find(
                    (item) => item.id === answer.questionId,
                  );
                  return missed ? (
                    <article key={missed.id}>
                      <h4>{missed.prompt}</h4>
                      <p>Your choice: {missed.options[answer.choice]}</p>
                      <p>{missed.wrongAnswerExplanations[answer.choice]}</p>
                      <p>Best answer: {missed.options[missed.answer]}</p>
                      <p>{missed.explanation}</p>
                      <LessonLinks lessonIds={missed.lessonIds} />
                    </article>
                  ) : null;
                })}
            </details>
          )}
          <button
            className="button primary small"
            disabled={busy || saved}
            onClick={() => void save()}
          >
            {busy
              ? "Saving study result…"
              : saved
                ? "Study result saved"
                : error
                  ? "Retry saving study result"
                  : "Save study result"}
          </button>
        </>
      )}
      {error && (
        <p className="notice amber" role="alert">
          {error} Your answers are still here. Retry saving before restarting.
        </p>
      )}
      {started && (
        <p>
          <button className="text-button" disabled={busy} onClick={start}>
            Restart study set
          </button>
        </p>
      )}
      <h4>Atlas study history</h4>
      <p className="fine">
        Study scores are recorded separately from full practice-exam scores and
        self-reported provider credentials.
      </p>
      {history.length === 0 ? (
        <p className="fine">No saved study results yet.</p>
      ) : (
        history.map((record) => (
          <div className="simple-row" key={record.id}>
            <span>{record.source}</span>
            <span>
              {record.score}% · {new Date(record.at).toLocaleDateString()}
            </span>
          </div>
        ))
      )}
    </section>
  );
}

function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function CredentialEvidence(props: CertificationProps) {
  return <CredentialForm key={props.certificationId} {...props} />;
}

function CredentialForm({
  data,
  onData,
  notify,
  certificationId,
  certificationName,
}: CertificationProps) {
  const fieldId = useId();
  const recordId = useRef("");
  const saving = useRef(false);
  const [source, setSource] = useState("");
  const [note, setNote] = useState("");
  const [url, setUrl] = useState("");
  const [earnedDate, setEarnedDate] = useState(today);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const reports = data.certifications
    .filter(
      (record) =>
        record.certificationId === certificationId &&
        record.kind === "credential",
    )
    .slice()
    .sort((a, b) => b.at.localeCompare(a.at));

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!source.trim() || saving.current) return;
    setError("");
    saving.current = true;
    setBusy(true);
    try {
      const at = `${earnedDate}T12:00:00.000Z`;
      const date = new Date(at);
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(earnedDate) ||
        !Number.isFinite(date.getTime()) ||
        date.toISOString().slice(0, 10) !== earnedDate ||
        earnedDate > today()
      )
        throw new Error("Choose a valid earned date on or before today.");
      const credentialUrl = url.trim()
        ? safeUrl(url.trim(), "Credential link")
        : undefined;
      if (!recordId.current) recordId.current = newId();
      onData(
        await saveCertificationScore({
          id: recordId.current,
          certificationId,
          kind: "credential",
          score: 0,
          at,
          source: `${source.trim()}${note.trim() ? `\nNote: ${note.trim()}` : ""}`,
          ...(credentialUrl ? { credentialUrl } : {}),
        }),
      );
      recordId.current = "";
      setSource("");
      setNote("");
      setUrl("");
      setEarnedDate(today());
      notify(
        "Self-reported credential saved to your learning record. Atlas has not verified the provider award.",
      );
    } catch (failure) {
      const message =
        failure instanceof Error
          ? failure.message
          : "Credential report could not be saved.";
      setError(message);
      notify(message);
    } finally {
      saving.current = false;
      setBusy(false);
    }
  }

  return (
    <section
      className="panel"
      aria-label={`Credential evidence for ${certificationName}`}
    >
      <h3>Reported provider credential</h3>
      <p className="notice">
        This is your self-reported record. Atlas does not verify the provider,
        credential link, or award and does not issue this credential. Recording
        it does not change lesson mastery or practice-exam readiness.
      </p>
      <form onSubmit={(event) => void save(event)}>
        <fieldset disabled={busy}>
          <legend>Record an award you have earned</legend>
          <div className="score-inputs">
            <label htmlFor={`${fieldId}-date`}>
              Earned date
              <input
                id={`${fieldId}-date`}
                type="date"
                required
                max={today()}
                value={earnedDate}
                onChange={(event) => setEarnedDate(event.target.value)}
              />
            </label>
            <label htmlFor={`${fieldId}-source`}>
              Provider / award source
              <input
                id={`${fieldId}-source`}
                required
                maxLength={400}
                value={source}
                onChange={(event) => setSource(event.target.value)}
                placeholder="Provider and exact credential awarded"
              />
            </label>
          </div>
          <label htmlFor={`${fieldId}-note`}>Your note (optional)</label>
          <textarea
            id={`${fieldId}-note`}
            rows={3}
            maxLength={1400}
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <label htmlFor={`${fieldId}-url`}>
            Public credential link (optional)
          </label>
          <input
            id={`${fieldId}-url`}
            type="url"
            maxLength={2048}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://…"
            aria-describedby={`${fieldId}-url-help`}
          />
          <p id={`${fieldId}-url-help`} className="fine">
            Use an absolute HTTP or HTTPS link without embedded credentials.
            Share only information you intend to keep in your learning record
            and backups.
          </p>
          <button
            className="button secondary small"
            disabled={busy || !source.trim()}
          >
            {busy ? "Saving report…" : "Save self-reported credential"}
          </button>
        </fieldset>
      </form>
      {error && (
        <p className="notice amber" role="alert">
          {error} Your form is unchanged so you can correct it or retry.
        </p>
      )}
      <h4>Self-reported credential history</h4>
      {reports.length === 0 ? (
        <p className="fine">No provider credentials reported yet.</p>
      ) : (
        reports.map((record) => (
          <article key={record.id}>
            <p>{record.source}</p>
            <p className="fine">
              Earned <time dateTime={record.at}>{record.at.slice(0, 10)}</time>
              {" · "}Self-reported; provider award not verified by Atlas.
            </p>
            {record.credentialUrl && (
              <a
                href={record.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open reported credential link
              </a>
            )}
          </article>
        ))
      )}
    </section>
  );
}
