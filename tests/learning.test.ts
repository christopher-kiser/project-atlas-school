import { describe, expect, it } from "vitest";
import type { Exercise, Lesson } from "../src/content/types";
import {
  DAY,
  assessAnswer,
  createInitialData,
  getCalibrationProgress,
  getExerciseProgress,
  getLessonProgress,
  getReviewQueue,
  getWeakAreas,
  isProjectVerified,
  makeAttempt,
  type AtlasData,
  type LabSubmission,
} from "../src/lib/learning";

const start = "2026-10-01T09:00:00.000Z";
const epoch = Date.parse(start);
const exercises: Exercise[] = [
  {
    id: "recall-status",
    kind: "recall",
    prompt: "Check service",
    answers: ["systemctl status nginx"],
    explanation: "",
    hint: "",
  },
  {
    id: "recall-listen",
    kind: "recall",
    prompt: "Check socket",
    answers: ["ss -tuln"],
    explanation: "",
    hint: "",
  },
  {
    id: "choice-service",
    kind: "choice",
    prompt: "Choose service tool",
    answers: ["systemctl"],
    explanation: "",
    hint: "",
  },
];
const lesson: Lesson = {
  id: "troubleshoot-nginx",
  section: 4,
  title: "Restore Nginx",
  summary: "",
  minutes: 30,
  status: "released",
  prerequisites: [],
  outcomes: [],
  concepts: [],
  commands: [],
  demo: { title: "", code: "", explanation: "" },
  practice: [],
  exercises,
  lab: {
    title: "Recovery",
    environment: "",
    scenario: "",
    steps: [],
    evidence: [],
    rubric: ["Service is active", "HTTP recovery proven"],
    hints: [],
    solution: "",
    challenge: "",
  },
  resourceIds: [],
};
const passingLab = (at = start, independent = false): LabSubmission => ({
  id: "lab-1",
  lessonId: lesson.id,
  at,
  title: "Recovery",
  output: "HTTP/1.1 200 OK\nServer: nginx",
  commands: "systemctl start nginx\ncurl -I localhost",
  notes: "",
  explanation:
    "I checked the service, observed the stopped state, restarted it, and verified an HTTP response.",
  code: "",
  config: "",
  links: [],
  screenshots: [],
  rubricChecks: [true, true],
  independent,
  hintsUsed: false,
});
function recall(data: AtlasData, at = start, hintUsed = false) {
  return {
    ...data,
    attempts: [
      ...data.attempts,
      ...exercises
        .slice(0, 2)
        .map((e) =>
          makeAttempt(lesson.id, e, e.answers[0], hintUsed, "lesson", at),
        ),
    ],
  };
}

describe("Evidence-based progress", () => {
  it("imports reported prior history separately from current validated evidence", () => {
    const data = createInitialData(start);
    const progress = getLessonProgress(lesson, data, epoch);
    expect(progress.reportedState).toBe("Demonstrated");
    expect(progress.state).toBe("Learning");
    expect(progress.independentRecall).toBe(0);
    expect(progress.labSatisfied).toBe(false);
    expect(data.attempts).toEqual([]);
    expect(data.priorHistory).toHaveLength(16);
  });
  it("does not allow a practical checkbox or one answer to complete a lesson", () => {
    let data = createInitialData(start);
    data.submissions.push({
      ...passingLab(),
      output: "",
      commands: "",
      explanation: "",
    });
    data.attempts.push(
      makeAttempt(
        lesson.id,
        exercises[0],
        exercises[0].answers[0],
        false,
        "lesson",
        start,
      ),
    );
    expect(getLessonProgress(lesson, data, epoch).state).toBe("Practicing");
    expect(getLessonProgress(lesson, data, epoch).labSatisfied).toBe(false);
    data = { ...data, submissions: [passingLab()] };
    expect(getLessonProgress(lesson, data, epoch).state).toBe("Practicing");
  });
  it("requires two independent recalls AND rubric-supported evidence to demonstrate", () => {
    const data = recall(createInitialData(start));
    expect(getLessonProgress(lesson, data, epoch).state).toBe("Practicing");
    data.submissions.push(passingLab());
    expect(getLessonProgress(lesson, data, epoch).state).toBe("Demonstrated");
    data.submissions[0].rubricChecks[1] = false;
    expect(getLessonProgress(lesson, data, epoch).state).toBe("Practicing");
  });
  it("does not count choice recognition or hinted answers as independent recall", () => {
    const data = recall(createInitialData(start), start, true);
    data.attempts.push(
      makeAttempt(lesson.id, exercises[2], "systemctl", false, "lesson", start),
    );
    data.submissions.push(passingLab(start, true));
    expect(getLessonProgress(lesson, data, epoch).independentRecall).toBe(0);
    expect(getLessonProgress(lesson, data, epoch).state).toBe("Guided");
    expect(getWeakAreas([lesson], data, epoch)[0].weakExerciseIds).toHaveLength(
      2,
    );
  });
  it("treats typed binary responses as recognition and requires core recall beyond predictions", () => {
    const binary: Exercise = {
      ...exercises[0],
      id: "binary",
      kind: "diagnose",
      answers: ["no"],
    };
    const attempt = makeAttempt(
      lesson.id,
      binary,
      "no",
      false,
      "lesson",
      start,
    );
    expect(getExerciseProgress(binary, [attempt], epoch).retentionState).toBe(
      "Recognized",
    );
    expect(
      getExerciseProgress(binary, [attempt], epoch).independentlyRecalled,
    ).toBe(false);
    const predictions = exercises
      .slice(0, 2)
      .map((e) => ({ ...e, kind: "predict" as const }));
    const predictionLesson = { ...lesson, exercises: predictions };
    const data = recall(createInitialData(start));
    data.submissions.push(passingLab(start, true));
    const progress = getLessonProgress(predictionLesson, data, epoch);
    expect(progress.independentRecall).toBe(2);
    expect(progress.coreIndependentRecall).toBe(0);
    expect(progress.state).toBe("Practicing");
    expect(progress.reasons.join(" ")).toContain("core command or concept");
  });
  it("requires a delayed core retrieval even when two other exercises have been retained", () => {
    const predictionExercises = exercises
      .slice(0, 2)
      .map((e) => ({ ...e, kind: "predict" as const }));
    const core: Exercise = { ...exercises[0], id: "core", kind: "recall" };
    const variant = { ...lesson, exercises: [...predictionExercises, core] };
    const data = recall(
      recall(createInitialData(start)),
      new Date(epoch + DAY).toISOString(),
    );
    data.attempts.push(
      makeAttempt(
        lesson.id,
        core,
        core.answers[0],
        false,
        "lesson",
        new Date(epoch + DAY).toISOString(),
      ),
    );
    data.submissions.push(passingLab(start, true));
    expect(getLessonProgress(variant, data, epoch + DAY).retainedRecall).toBe(
      2,
    );
    expect(getLessonProgress(variant, data, epoch + DAY).state).toBe(
      "Demonstrated",
    );
    data.attempts.push(
      makeAttempt(
        lesson.id,
        core,
        core.answers[0],
        false,
        "review",
        new Date(epoch + 2 * DAY).toISOString(),
      ),
    );
    expect(getLessonProgress(variant, data, epoch + 2 * DAY).state).toBe(
      "Independent",
    );
  });
  it("prevents repeated same-session answers from creating retained or independent evidence", () => {
    let data = createInitialData(start);
    for (let i = 0; i < 30; i++)
      data = recall(data, new Date(epoch + i * 1000).toISOString());
    data.submissions.push(passingLab(start, true));
    const progress = getLessonProgress(lesson, data, epoch + DAY - 1);
    expect(progress.retainedRecall).toBe(0);
    expect(progress.state).toBe("Demonstrated");
    expect(Date.parse(progress.dueAt!)).toBe(epoch + DAY);
  });
  it("only awards Independent with delayed retrieval plus an independent unhinted lab", () => {
    let data = recall(createInitialData(start));
    data = recall(data, new Date(epoch + DAY).toISOString());
    data.submissions.push(passingLab());
    expect(getLessonProgress(lesson, data, epoch + DAY).retainedRecall).toBe(2);
    expect(getLessonProgress(lesson, data, epoch + DAY).state).toBe(
      "Demonstrated",
    );
    data.submissions[0].independent = true;
    expect(getLessonProgress(lesson, data, epoch + DAY).state).toBe(
      "Independent",
    );
    data.submissions[0].hintsUsed = true;
    expect(getLessonProgress(lesson, data, epoch + DAY).state).toBe(
      "Demonstrated",
    );
  });
  it("schedules mistakes for review and removes independent recall after a later error", () => {
    const data = recall(
      recall(createInitialData(start)),
      new Date(epoch + DAY).toISOString(),
    );
    data.submissions.push(passingLab(start, true));
    data.attempts.push(
      makeAttempt(
        lesson.id,
        exercises[0],
        "rm nginx",
        false,
        "review",
        new Date(epoch + DAY + 1000).toISOString(),
      ),
    );
    const now = epoch + DAY + 601_000;
    expect(getLessonProgress(lesson, data, now).state).toBe("Practicing");
    expect(
      getReviewQueue([lesson], data, now).map((e) => e.exercise.id),
    ).toEqual(["recall-status"]);
  });
  it("does not count a duplicate event twice or future events as current evidence", () => {
    const one = makeAttempt(
      lesson.id,
      exercises[0],
      exercises[0].answers[0],
      false,
      "lesson",
      start,
    );
    const next = makeAttempt(
      lesson.id,
      exercises[0],
      exercises[0].answers[0],
      false,
      "review",
      new Date(epoch + DAY).toISOString(),
    );
    const progress = getExerciseProgress(exercises[0], [one, one, next], epoch);
    expect(progress.attempts).toBe(1);
    expect(progress.retained).toBe(false);
  });
  it("rechecks stored correctness before awarding recall and excludes future calibration", () => {
    const forged = {
      ...makeAttempt(
        lesson.id,
        exercises[0],
        "wrong",
        false,
        "calibration",
        start,
      ),
      correct: true,
    };
    expect(
      getExerciseProgress(exercises[0], [forged], epoch).independentlyRecalled,
    ).toBe(false);
    const data = createInitialData(start);
    data.attempts.push({ ...forged, at: new Date(epoch + DAY).toISOString() });
    expect(getCalibrationProgress(data, epoch).attempted).toBe(0);
  });
  it("keeps demonstrated retention when review is overdue, until contrary evidence arrives", () => {
    const data = recall(
      recall(createInitialData(start)),
      new Date(epoch + DAY).toISOString(),
    );
    data.submissions.push(passingLab(start, true));
    const progress = getLessonProgress(lesson, data, epoch + 31 * DAY);
    expect(progress.state).toBe("Independent");
    expect(progress.isDue).toBe(true);
  });
  it("calibration counts distinct exercises and never changes imported history", () => {
    const data = createInitialData(start);
    const history = JSON.stringify(data.priorHistory);
    data.attempts = Array.from({ length: 10 }, () =>
      makeAttempt(
        lesson.id,
        exercises[0],
        "wrong",
        false,
        "calibration",
        start,
      ),
    );
    expect(getCalibrationProgress(data)).toEqual({
      attempted: 1,
      correct: 0,
      completed: false,
    });
    expect(JSON.stringify(data.priorHistory)).toBe(history);
  });
  it("matches explicit command aliases while preserving case and punctuation", () => {
    expect(assessAnswer(exercises[0], "  systemctl   status nginx  ")).toBe(
      true,
    );
    expect(assessAnswer(exercises[0], "Systemctl status nginx")).toBe(false);
    expect(assessAnswer(exercises[0], "systemctl status nginx; rm -rf /")).toBe(
      false,
    );
    expect(assessAnswer(exercises[0], "systemctl\nstatus nginx")).toBe(false);
    expect(
      assessAnswer({ ...exercises[0], answers: ['echo "a  b"'] }, 'echo "a b"'),
    ).toBe(false);
    expect(
      assessAnswer(
        { ...exercises[0], answers: ["CloudTrail"], caseSensitive: false },
        "cloudtrail",
      ),
    ).toBe(true);
    expect(
      assessAnswer(
        { ...exercises[0], answers: ["CloudTrail"], caseSensitive: true },
        "cloudtrail",
      ),
    ).toBe(false);
  });
  it("requires review evidence before a portfolio-verification attestation", () => {
    const project = {
      id: "linux-service",
      url: "https://example.com/repo",
      summary:
        "A reproducible Linux service deployment with a documented incident recovery.",
      evidence:
        "The README includes exact installation commands, service logs, HTTP verification, security decisions, and a reproducible recovery runbook.",
      rubricChecks: [true, true, true, true, true],
      submittedAt: start,
    };
    expect(isProjectVerified(project)).toBe(false);
    const reviewed = {
      ...project,
      reviewer: "Peer",
      reviewNotes:
        "I cloned the repository, followed its commands, and reproduced the recovery successfully.",
    };
    expect(isProjectVerified(reviewed)).toBe(true);
    expect(
      isProjectVerified({ ...reviewed, rubricChecks: [true, true, true] }),
    ).toBe(false);
    expect(isProjectVerified({ ...reviewed, reviewer: "self" })).toBe(false);
  });
});
