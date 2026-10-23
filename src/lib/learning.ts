import type { Exercise, Lesson } from "../content/types";

export const DAY = 86_400_000;
export const SCHEMA_VERSION = 1 as const;
export const PROJECT_RUBRIC_COUNT = 5;
export type PriorState = "Introduced" | "Practiced" | "Demonstrated";
export type CompetencyState =
  | "Not Yet Introduced"
  | "Learning"
  | "Guided"
  | "Practicing"
  | "Demonstrated"
  | "Independent";
export type AttemptContext = "lesson" | "review" | "calibration" | "checkpoint";
export type PriorEvidence = {
  id: string;
  lessonId: string;
  state: PriorState;
  source: string;
  at: string;
};
export type ExerciseAttempt = {
  id: string;
  lessonId: string;
  exerciseId: string;
  answer: string;
  correct: boolean;
  hintUsed: boolean;
  at: string;
  context: AttemptContext;
};
export type Attachment = {
  id: string;
  name: string;
  type: "image/png" | "image/jpeg" | "image/webp";
  dataUrl: string;
  size: number;
};
export type LabSubmission = {
  id: string;
  lessonId: string;
  at: string;
  title: string;
  output: string;
  commands: string;
  notes: string;
  explanation: string;
  code: string;
  config: string;
  links: string[];
  screenshots: Attachment[];
  rubricChecks: boolean[];
  independent: boolean;
  hintsUsed: boolean;
};
export type ProjectSubmission = {
  id: string;
  url: string;
  summary: string;
  evidence: string;
  rubricChecks: boolean[];
  submittedAt: string;
  reviewer?: string;
  reviewNotes?: string;
};
export type CertificationScore = {
  id: string;
  certificationId: string;
  score: number;
  at: string;
  source: string;
  /** Older version-1 records omit kind and remain practice scores. */
  kind?: "practice" | "study" | "credential";
  credentialUrl?: string;
};
/** Only full practice results count toward the separate exam-readiness target. */
export function isPracticeScore(value: CertificationScore): boolean {
  return value.kind === undefined || value.kind === "practice";
}
export type AtlasData = {
  version: 1;
  createdAt: string;
  updatedAt: string;
  priorHistory: PriorEvidence[];
  attempts: ExerciseAttempt[];
  submissions: LabSubmission[];
  projects: ProjectSubmission[];
  certifications: CertificationScore[];
};

const priorLessons = [
  "terminal-map",
  "terminal-files",
  "terminal-cleanup",
  "terminal-streams",
  "terminal-search",
  "terminal-control",
  "linux-permissions",
  "linux-processes",
  "linux-jobs",
  "linux-services",
  "linux-resources",
  "network-addresses",
  "network-dns",
  "network-http",
  "troubleshoot-nginx",
  "troubleshoot-layers",
];
const demonstrated = new Set([
  "linux-processes",
  "linux-jobs",
  "linux-resources",
  "troubleshoot-nginx",
]);
export function createInitialData(now = new Date().toISOString()): AtlasData {
  return {
    version: SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    priorHistory: priorLessons.map((lessonId) => ({
      id: `prior:${lessonId}`,
      lessonId,
      state: demonstrated.has(lessonId) ? "Demonstrated" : "Practiced",
      source:
        "Reported existing Atlas history; not yet calibrated in this application.",
      at: now,
    })),
    attempts: [],
    submissions: [],
    projects: [],
    certifications: [],
  };
}
export function newId(): string {
  return globalThis.crypto.randomUUID();
}
/** Normalize outer spacing, preserving shell case, line breaks, and quoted arguments. */
export function normalizeAnswer(answer: string): string {
  const source = answer.trim().replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  let result = "";
  let quote = "";
  let escaped = false;
  let outerSpace = false;
  for (const character of source) {
    if (escaped) {
      result += character;
      escaped = false;
      outerSpace = false;
      continue;
    }
    if (character === "\\" && quote !== "'") {
      result += character;
      escaped = true;
      outerSpace = false;
      continue;
    }
    if (character === quote) quote = "";
    else if (!quote && (character === '"' || character === "'"))
      quote = character;
    if (!quote && (character === " " || character === "\t")) {
      if (!outerSpace) result += " ";
      outerSpace = true;
    } else {
      result += character;
      outerSpace = false;
    }
  }
  return result;
}
export function assessAnswer(exercise: Exercise, answer: string): boolean {
  const normalized = normalizeAnswer(answer);
  const comparison = (value: string) =>
    exercise.caseSensitive === false ? value.toLocaleLowerCase("en-US") : value;
  return (
    normalized.length > 0 &&
    exercise.answers.some(
      (expected) =>
        comparison(normalizeAnswer(expected)) === comparison(normalized),
    )
  );
}
export function makeAttempt(
  lessonId: string,
  exercise: Exercise,
  answer: string,
  hintUsed: boolean,
  context: AttemptContext = "lesson",
  at = new Date().toISOString(),
): ExerciseAttempt {
  return {
    id: newId(),
    lessonId,
    exerciseId: exercise.id,
    answer,
    correct: assessAnswer(exercise, answer),
    hintUsed,
    at,
    context,
  };
}
/** Typed binary answers still demonstrate recognition, not independent retrieval. */
export function isRecognitionExercise(exercise: Exercise): boolean {
  return (
    exercise.kind === "choice" ||
    (exercise.answers.length > 0 &&
      exercise.answers.every((answer) =>
        ["yes", "no", "true", "false"].includes(
          normalizeAnswer(answer).toLocaleLowerCase("en-US"),
        ),
      ))
  );
}
function chronological(attempts: ExerciseAttempt[]): ExerciseAttempt[] {
  return [...new Map(attempts.map((a) => [a.id, a])).values()].sort((a, b) =>
    a.at.localeCompare(b.at),
  );
}
export type RetrievalState =
  | "Introduced"
  | "Recognized"
  | "Recalled with hint"
  | "Recalled independently"
  | "Retained after delay";
export function getExerciseProgress(
  exercise: Exercise,
  attempts: ExerciseAttempt[],
  now = Date.now(),
) {
  // Backups are editable local records, not signed credentials. Recheck recorded successes
  // against the current answer key; timestamps and whether hints were used remain assertions.
  const history = chronological(
    attempts.filter(
      (a) => a.exerciseId === exercise.id && Date.parse(a.at) <= now,
    ),
  ).map((attempt) => ({
    ...attempt,
    correct: attempt.correct && assessAnswer(exercise, attempt.answer),
  }));
  const last = history.at(-1);
  let spacedSuccesses = 0;
  let lastSpacedAt = 0;
  for (const attempt of history) {
    const at = Date.parse(attempt.at);
    if (!attempt.correct || attempt.hintUsed) {
      spacedSuccesses = 0;
      lastSpacedAt = 0;
    } else if (!spacedSuccesses || at - lastSpacedAt >= DAY) {
      spacedSuccesses++;
      lastSpacedAt = at;
    }
  }
  const recognition = isRecognitionExercise(exercise);
  const independentlyRecalled =
    !!last?.correct && !last.hintUsed && !recognition;
  const retained = independentlyRecalled && spacedSuccesses >= 2;
  // An overdue reminder alone does not erase demonstrated retention. A later incorrect or
  // hinted response does reset it; the UI displays overdue review separately from competency.
  let retentionState: RetrievalState = "Introduced";
  if (last?.correct)
    retentionState = last.hintUsed
      ? "Recalled with hint"
      : recognition
        ? "Recognized"
        : retained
          ? "Retained after delay"
          : "Recalled independently";
  const intervals = [1, 3, 7, 14, 30];
  const dueAt = last
    ? new Date(
        last.correct && !last.hintUsed
          ? lastSpacedAt +
              DAY *
                intervals[
                  Math.min(
                    Math.max(spacedSuccesses - 1, 0),
                    intervals.length - 1,
                  )
                ]
          : Date.parse(last.at) + 10 * 60_000,
      ).toISOString()
    : null;
  return {
    attempts: history.length,
    correct: history.filter((a) => a.correct).length,
    last,
    independentlyRecalled,
    retained,
    retentionState,
    dueAt,
    isDue: dueAt !== null && Date.parse(dueAt) <= now,
    weak: !!last && (!last.correct || last.hintUsed),
  };
}
/** Practical checks are learner assertions, not remote machine or instructor verification. */
export function isLabSatisfied(
  lesson: Lesson,
  submission: LabSubmission,
): boolean {
  const practicalEvidence =
    [
      submission.output,
      submission.commands,
      submission.code,
      submission.config,
    ].some((value) => value.trim().length >= 20) ||
    submission.screenshots.length > 0;
  return (
    submission.lessonId === lesson.id &&
    lesson.lab.rubric.length > 0 &&
    submission.rubricChecks.length === lesson.lab.rubric.length &&
    submission.rubricChecks.every(Boolean) &&
    submission.explanation.trim().length >= 40 &&
    practicalEvidence
  );
}
export function getLessonProgress(
  lesson: Lesson,
  data: AtlasData,
  now = Date.now(),
) {
  const attempts = chronological(
    data.attempts.filter(
      (a) =>
        a.lessonId === lesson.id &&
        lesson.exercises.some((e) => e.id === a.exerciseId) &&
        Date.parse(a.at) <= now,
    ),
  );
  const exercises = lesson.exercises.map((exercise) => ({
    exercise,
    ...getExerciseProgress(exercise, attempts, now),
  }));
  const prior = data.priorHistory.find((e) => e.lessonId === lesson.id);
  const submissions = data.submissions.filter(
    (s) => s.lessonId === lesson.id && Date.parse(s.at) <= now,
  );
  const passingLabs = submissions.filter((s) => isLabSatisfied(lesson, s));
  const independentRecall = exercises.filter(
    (e) => e.independentlyRecalled,
  ).length;
  const retainedRecall = exercises.filter((e) => e.retained).length;
  const coreIndependentRecall = exercises.filter(
    (e) =>
      ["recall", "fill"].includes(e.exercise.kind) && e.independentlyRecalled,
  ).length;
  const coreRetainedRecall = exercises.filter(
    (e) => ["recall", "fill"].includes(e.exercise.kind) && e.retained,
  ).length;
  const labSatisfied = passingLabs.length > 0;
  const independentLab = passingLabs.some((s) => s.independent && !s.hintsUsed);
  let state: CompetencyState =
    prior || attempts.length ? "Learning" : "Not Yet Introduced";
  if (submissions.length) state = "Guided";
  if (independentRecall > 0) state = "Practicing";
  if (independentRecall >= 2 && coreIndependentRecall >= 1 && labSatisfied)
    state = "Demonstrated";
  if (
    independentRecall >= 2 &&
    coreIndependentRecall >= 1 &&
    retainedRecall >= 2 &&
    coreRetainedRecall >= 1 &&
    independentLab
  )
    state = "Independent";
  const dueAt =
    exercises.flatMap((e) => (e.dueAt ? [e.dueAt] : [])).sort()[0] ?? null;
  const reasons: string[] = [];
  if (independentRecall < 2)
    reasons.push(
      `Recall ${2 - independentRecall} more distinct exercises correctly without hints.`,
    );
  if (coreIndependentRecall < 1)
    reasons.push(
      "Retrieve at least one core command or concept in a Recall or Fill exercise without hints; binary recognition does not qualify.",
    );
  if (!labSatisfied)
    reasons.push(
      "Submit practical evidence, a substantive explanation, and all rubric self-checks.",
    );
  if (retainedRecall < 2)
    reasons.push(
      "Repeat two distinct retrieval exercises correctly without hints after at least 24 hours.",
    );
  if (coreRetainedRecall < 1)
    reasons.push(
      "Retain at least one core Recall or Fill exercise after the 24-hour delay.",
    );
  if (!independentLab)
    reasons.push(
      "Submit an independent practical without using hints or the solution.",
    );
  if (prior && !attempts.length)
    reasons.unshift(
      "Existing progress is reported history. Complete a short calibration to establish current evidence.",
    );
  return {
    state,
    reportedState: prior?.state,
    independentRecall,
    retainedRecall,
    coreIndependentRecall,
    coreRetainedRecall,
    labSatisfied,
    independentLab,
    dueAt,
    isDue: dueAt !== null && Date.parse(dueAt) <= now,
    attempts: attempts.length,
    correct: exercises.reduce((total, exercise) => total + exercise.correct, 0),
    weakExerciseIds: exercises.filter((e) => e.weak).map((e) => e.exercise.id),
    reasons,
    exercises,
    assessmentBasis:
      "Deterministic retrieval checks and learner-assessed practical evidence. No external verification.",
  };
}
export function getReviewQueue(
  lessons: Lesson[],
  data: AtlasData,
  now = Date.now(),
) {
  return lessons
    .filter((l) => l.status === "released")
    .flatMap((lesson) => {
      const attempts = data.attempts.filter((a) => a.lessonId === lesson.id);
      return lesson.exercises
        .map((exercise) => ({
          lesson,
          exercise,
          ...getExerciseProgress(exercise, attempts, now),
        }))
        .filter((e) => e.isDue);
    })
    .sort(
      (a, b) =>
        Number(b.weak) - Number(a.weak) ||
        (a.dueAt ?? "").localeCompare(b.dueAt ?? ""),
    );
}
export function getWeakAreas(
  lessons: Lesson[],
  data: AtlasData,
  now = Date.now(),
) {
  return lessons
    .map((lesson) => ({ lesson, ...getLessonProgress(lesson, data, now) }))
    .filter((p) => p.weakExerciseIds.length > 0)
    .sort((a, b) => b.weakExerciseIds.length - a.weakExerciseIds.length);
}
export function getCalibrationProgress(data: AtlasData, now = Date.now()) {
  const attempts = chronological(
    data.attempts.filter(
      (a) => a.context === "calibration" && Date.parse(a.at) <= now,
    ),
  );
  const latest = new Map(
    attempts.map((a) => [`${a.lessonId}:${a.exerciseId}`, a]),
  );
  return {
    attempted: latest.size,
    correct: [...latest.values()].filter((a) => a.correct && !a.hintUsed)
      .length,
    completed: latest.size >= 4,
  };
}
/** A completeness check for a peer-review attestation, never authenticated identity or remote verification. */
export function isProjectVerified(project: ProjectSubmission): boolean {
  const reviewer = project.reviewer?.trim() ?? "";
  const selfReview =
    /^(self|self[- ]?review(?:ed)?|me|myself|learner|owner|author)$/i.test(
      reviewer,
    );
  return (
    project.rubricChecks.length === PROJECT_RUBRIC_COUNT &&
    project.rubricChecks.every(Boolean) &&
    project.summary.trim().length >= 40 &&
    project.evidence.trim().length >= 80 &&
    !!project.url &&
    reviewer.length >= 2 &&
    !selfReview &&
    (project.reviewNotes?.trim().length ?? 0) >= 40
  );
}
