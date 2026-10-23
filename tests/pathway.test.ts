import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  certifications,
  lessons,
  projects,
  engineeringMonths,
  portfolioMilestones,
  certificationPractice,
} from "../src/content";

describe("Shared engineering pathway", () => {
  it("retains every original lesson and exercise identity", () => {
    const previous = JSON.parse(
      readFileSync("tests/fixtures/legacy-content-ids.json", "utf8"),
    ) as { ids: string[] };
    const current = new Set(
      lessons.flatMap((lesson) => [
        lesson.id,
        ...lesson.exercises.map((exercise) => exercise.id),
      ]),
    );
    expect(previous.ids.length).toBeGreaterThan(200);
    for (const id of previous.ids)
      expect(current.has(id), `Legacy content ID: ${id}`).toBe(true);
  });
  it("maps six phases to real lessons, all eight unchanged projects, and credentials", () => {
    expect(engineeringMonths.map((m) => m.month)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(Object.keys(portfolioMilestones).sort()).toEqual(
      projects.map((p) => p.id).sort(),
    );
    for (const m of engineeringMonths) {
      for (const id of m.lessonIds)
        expect(
          lessons.some((l) => l.id === id),
          `month ${m.month}: ${id}`,
        ).toBe(true);
      for (const id of m.projectIds)
        expect(
          projects.some((p) => p.id === id),
          id,
        ).toBe(true);
      for (const id of m.certificationIds)
        expect(
          certifications.some((c) => c.id === id),
          id,
        ).toBe(true);
      expect(m.evidence.length).toBeGreaterThanOrEqual(3);
      expect(m.independentTask.length).toBeGreaterThan(80);
    }
    for (const c of certifications)
      for (const id of c.lessonIds ?? [])
        expect(
          lessons.some((l) => l.id === id),
          `${c.id}: ${id}`,
        ).toBe(true);
  });
  it("provides original teaching scenarios across all CLF and SAA domains", () => {
    expect(certificationPractice).toHaveLength(28);
    expect(new Set(certificationPractice.map((q) => q.id)).size).toBe(28);
    for (const id of ["cloud-practitioner", "solutions-architect"]) {
      const bank = certificationPractice.filter(
        (q) => q.certificationId === id,
      );
      expect(bank).toHaveLength(14);
      expect(new Set(bank.map((q) => q.domain)).size).toBe(4);
    }
    for (const q of certificationPractice) {
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(40);
      expect(q.wrongAnswerExplanations).toHaveLength(4);
      q.wrongAnswerExplanations.forEach((e) =>
        expect(e.length).toBeGreaterThan(20),
      );
      q.lessonIds.forEach((id) =>
        expect(
          lessons.some((l) => l.id === id),
          id,
        ).toBe(true),
      );
    }
  });
  it("matches the reviewed shared-content manifest without a sibling checkout", () => {
    const manifest = JSON.parse(
      readFileSync("curriculum-manifest.json", "utf8"),
    ) as { files: Record<string, string> };
    for (const [file, hash] of Object.entries(manifest.files))
      expect(
        createHash("sha256").update(readFileSync(file)).digest("hex"),
        file,
      ).toBe(hash);
  });
});
