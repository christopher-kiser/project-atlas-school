import { describe, expect, it } from "vitest";
import { lessons, certifications, projects } from "../src/content";

describe("Beginner command guidance", () => {
  it("gives every lesson explicit programs, syntax and execution contexts", () => {
    for (const lesson of lessons) {
      const guide = lesson.study?.commandLesson;
      expect(guide, lesson.id).toBeDefined();
      if (!guide) continue;
      expect(guide.environment.length, lesson.id).toBeGreaterThan(20);
      expect(guide.orientation.length, lesson.id).toBeGreaterThan(30);
      expect(guide.demoWhere.length, lesson.id).toBeGreaterThan(20);
      expect(["terminal", "editor", "graphical", "reference"]).toContain(
        guide.demoMode,
      );
      expect(
        guide.entries.map((e) => e.command),
        lesson.id,
      ).toEqual(lesson.commands.map((c) => c.command));
      expect(new Set(guide.topics.map((t) => t.id)).size, lesson.id).toBe(
        guide.topics.length,
      );
      expect(guide.topics.length, lesson.id).toBeGreaterThan(0);
      for (const entry of guide.entries) {
        expect(["terminal", "editor", "graphical", "reference"]).toContain(
          entry.mode,
        );
        expect(
          entry.where.length,
          `${lesson.id}: ${entry.command}`,
        ).toBeGreaterThan(20);
      }
      for (const topic of guide.topics) {
        expect(topic.parts.length, topic.id).toBeGreaterThan(0);
        expect(topic.example.trim(), topic.id).not.toBe("");
        for (const text of [
          topic.explanation,
          topic.expected,
          topic.question,
          topic.answer,
        ])
          expect(text.trim().length, topic.id).toBeGreaterThan(12);
      }
    }
  });
  it("classifies graphical actions, Python source and planning as non-shell input", () => {
    for (const id of ["computing-basics", "web-foundations"]) {
      const guide = lessons.find((l) => l.id === id)!.study!.commandLesson!;
      expect(guide.entries.every((e) => e.mode === "graphical")).toBe(true);
      expect(["graphical", "reference"]).toContain(guide.demoMode);
    }
    const python = lessons.find((l) => l.id === "python-files-json")!.study!
      .commandLesson!;
    expect(python.entries.every((e) => e.mode === "editor")).toBe(true);
    expect(python.demoMode).toBe("editor");
    const streams = lessons.find((l) => l.id === "terminal-streams")!.study!
      .commandLesson!;
    expect(streams.topics.map((t) => t.id)).toEqual(
      expect.arrayContaining([
        "pipe",
        "redirect-out",
        "redirect-in",
        "redirect-error",
      ]),
    );
    for (const lesson of lessons.filter((l) => l.commands.length === 0))
      expect(lesson.study!.commandLesson!.demoMode).toBe("reference");
  });
  it("maps every credential to real curriculum checkpoints without awarding it", () => {
    for (const credential of certifications) {
      const checkpoint = credential.curriculumMilestone;
      expect(checkpoint, credential.id).toBeDefined();
      if (!checkpoint) continue;
      expect(checkpoint.label, credential.id).toMatch(/^After /);
      expect(checkpoint.lessonIds.length, credential.id).toBeGreaterThan(0);
      expect(checkpoint.extraPreparation.length, credential.id).toBeGreaterThan(
        0,
      );
      checkpoint.lessonIds.forEach((id) =>
        expect(
          lessons.some((l) => l.id === id),
          `${credential.id}: ${id}`,
        ).toBe(true),
      );
      checkpoint.projectIds?.forEach((id) =>
        expect(
          projects.some((p) => p.id === id),
          `${credential.id}: ${id}`,
        ).toBe(true),
      );
    }
  });
});
