import "fake-indexeddb/auto";
import { IDBObjectStore } from "fake-indexeddb";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createInitialData,
  type ExerciseAttempt,
  type LabSubmission,
} from "../src/lib/learning";
import {
  createStorage,
  exportBackup,
  mergeData,
  parseBackup,
  safeUrl,
  StorageError,
  validateData,
} from "../src/lib/storage";
const start = "2026-10-01T09:00:00.000Z";
const event = (id = "attempt-1"): ExerciseAttempt => ({
  id,
  lessonId: "terminal-map",
  exerciseId: "map-1",
  answer: "pwd",
  correct: true,
  hintUsed: false,
  at: start,
  context: "lesson",
});
const storage = () => createStorage(`atlas-test-${crypto.randomUUID()}`);
afterEach(() => vi.restoreAllMocks());

describe("Backups and browser persistence", () => {
  it("round-trips every evidence entity including screenshot bytes", () => {
    const data = createInitialData(start);
    data.attempts.push(event());
    const base64 =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jQksAAAAASUVORK5CYII=";
    const submission: LabSubmission = {
      id: "lab-1",
      lessonId: "terminal-map",
      at: start,
      title: "Lab",
      commands: "pwd",
      output: "/home/atlas",
      notes: "Notes",
      explanation: "My explanation",
      code: "echo atlas",
      config: "port=80",
      links: ["https://example.com/project"],
      screenshots: [
        {
          id: "screen-1",
          name: "evidence.png",
          type: "image/png",
          size: atob(base64).length,
          dataUrl: `data:image/png;base64,${base64}`,
        },
      ],
      rubricChecks: [true, false],
      independent: false,
      hintsUsed: true,
    };
    data.submissions.push(submission);
    data.projects.push({
      id: "linux-service",
      url: "https://example.com/repo",
      summary: "Summary",
      evidence: "Evidence",
      rubricChecks: [false],
      submittedAt: start,
    });
    data.certifications.push({
      id: "score-1",
      certificationId: "aws-clf",
      score: 76,
      at: start,
      source: "Official practice",
    });
    expect(parseBackup(exportBackup(data))).toEqual(data);
  });
  it("merges stable IDs without duplicating attempts, submissions, or imported history", () => {
    const a = createInitialData(start);
    a.attempts.push(event());
    const b = createInitialData("2026-10-02T09:00:00.000Z");
    b.attempts.push(event(), event("attempt-2"));
    const merged = mergeData(a, b);
    expect(merged.attempts).toHaveLength(2);
    expect(merged.priorHistory).toHaveLength(16);
    expect(mergeData(merged, b).attempts).toHaveLength(2);
    b.attempts[0].answer = "forged";
    expect(() => mergeData(a, b)).toThrow(/conflicting/);
  });
  it("rejects malformed, unsupported, nonfinite, unsafe, and oversized structures", () => {
    expect(() => parseBackup("not json")).toThrow(/valid JSON/);
    expect(() => parseBackup('{"version":2}')).toThrow(/version/);
    expect(() => parseBackup('{"version":1}')).toThrow();
    const valid = createInitialData(start);
    expect(() =>
      validateData({ ...valid, attempts: [{ ...event(), correct: "yes" }] }),
    ).toThrow();
    expect(() =>
      validateData({ ...valid, attempts: [{ ...event(), at: "tomorrow" }] }),
    ).toThrow();
    expect(() =>
      validateData({
        ...valid,
        attempts: [{ ...event(), context: "mastered" }],
      }),
    ).toThrow();
    expect(() =>
      validateData({
        ...valid,
        certifications: [
          {
            id: "score",
            certificationId: "aws",
            score: Infinity,
            at: start,
            source: "",
          },
        ],
      }),
    ).toThrow();
    expect(() =>
      validateData({
        ...valid,
        projects: [
          {
            id: "made-up",
            url: "",
            summary: "",
            evidence: "",
            rubricChecks: [],
            submittedAt: start,
          },
        ],
      }),
    ).toThrow();
    expect(() => safeUrl("javascript:alert(1)")).toThrow();
    expect(() => safeUrl("https://user:password@example.com")).toThrow();
    expect(() => safeUrl("data:text/html,<script>")).toThrow();
    expect(() => safeUrl("https://example.com/\nattack")).toThrow();
    expect(() =>
      validateData({
        ...valid,
        attempts: [{ ...event(), answer: "a".repeat(10_001) }],
      }),
    ).toThrow();
  });
  it("rejects forged executable image types and mismatched image payloads", () => {
    const data = createInitialData(start);
    const base = {
      id: "lab-1",
      lessonId: "terminal-map",
      at: start,
      title: "",
      output: "",
      commands: "",
      notes: "",
      explanation: "",
      code: "",
      config: "",
      links: [],
      rubricChecks: [],
      independent: false,
      hintsUsed: false,
    };
    expect(() =>
      validateData({
        ...data,
        submissions: [
          {
            ...base,
            screenshots: [
              {
                id: "x",
                name: "x.svg",
                type: "image/svg+xml",
                size: 3,
                dataUrl: "data:image/svg+xml;base64,PHN2Zz4=",
              },
            ],
          },
        ],
      }),
    ).toThrow();
    expect(() =>
      validateData({
        ...data,
        submissions: [
          {
            ...base,
            screenshots: [
              {
                id: "x",
                name: "x.png",
                type: "image/png",
                size: 3,
                dataUrl: "data:image/png;base64,YWJj",
              },
            ],
          },
        ],
      }),
    ).toThrow(/format/);
  });
  it("persists across clients and serializes concurrent read-modify-write saves", async () => {
    const name = `atlas-test-${crypto.randomUUID()}`;
    const a = createStorage(name);
    const b = createStorage(name);
    await a.loadData();
    await Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        (i % 2 ? a : b).appendAttempt(event(`attempt-${i}`)),
      ),
    );
    const saved = await createStorage(name).loadData();
    expect(saved.attempts).toHaveLength(12);
    expect(saved.priorHistory).toHaveLength(16);
  });
  it("imports transactionally and rejects invalid data without replacing existing saves", async () => {
    const db = storage();
    await db.appendAttempt(event());
    await expect(async () => db.importBackup('{"version":3}')).rejects.toThrow(
      /version/,
    );
    expect((await db.loadData()).attempts).toHaveLength(1);
    const backup = exportBackup(await db.loadData());
    await db.importBackup(backup);
    await db.importBackup(backup);
    expect((await db.loadData()).attempts).toHaveLength(1);
  });
  it("surfaces quota/save failure and rolls back instead of reporting success", async () => {
    const db = storage();
    await db.appendAttempt(event());
    const spy = vi
      .spyOn(IDBObjectStore.prototype, "put")
      .mockImplementationOnce(() => {
        throw new DOMException("Full", "QuotaExceededError");
      });
    await expect(db.appendAttempt(event("attempt-2"))).rejects.toThrow(
      /storage is full/,
    );
    spy.mockRestore();
    expect((await db.loadData()).attempts.map((a) => a.id)).toEqual([
      "attempt-1",
    ]);
  });
  it("surfaces unavailable storage without silently using an unsaved fallback", async () => {
    const original = globalThis.indexedDB;
    Object.defineProperty(globalThis, "indexedDB", {
      configurable: true,
      value: undefined,
    });
    try {
      await expect(storage().loadData()).rejects.toBeInstanceOf(StorageError);
    } finally {
      Object.defineProperty(globalThis, "indexedDB", {
        configurable: true,
        value: original,
      });
    }
  });
});
