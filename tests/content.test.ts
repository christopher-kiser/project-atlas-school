import { describe, expect, it } from "vitest";
import {
  certifications,
  expansionBacklog,
  lessons,
  projects,
  resources,
  sections,
  videos,
  videosForLesson,
} from "../src/content";
import { assessAnswer, isRecognitionExercise } from "../src/lib/learning";
import { safeUrl } from "../src/lib/storage";

function expectUnique(values: (string | number)[], label: string) {
  expect(new Set(values).size, `${label} must be unique`).toBe(values.length);
}

describe("Curriculum contracts", () => {
  it("gives every lesson a beginner path and explains every listed command", () => {
    for (const lesson of lessons) {
      const guide = lesson.study;
      expect(guide, `${lesson.id}: missing beginner guide`).toBeDefined();
      if (!guide) continue;
      expect(
        guide.startingPoint.trim(),
        `${lesson.id}: starting point`,
      ).not.toBe("");
      expect(guide.whyItMatters.trim(), `${lesson.id}: purpose`).not.toBe("");
      expect(
        guide.required.length,
        `${lesson.id}: required learning`,
      ).toBeGreaterThanOrEqual(3);
      expect(
        guide.optional.length,
        `${lesson.id}: optional depth`,
      ).toBeGreaterThanOrEqual(1);
      expect(
        guide.terms.length,
        `${lesson.id}: new vocabulary`,
      ).toBeGreaterThanOrEqual(3);
      expect(
        guide.walkthrough.length,
        `${lesson.id}: observable walkthrough`,
      ).toBeGreaterThanOrEqual(3);
      expect(
        guide.readiness.length,
        `${lesson.id}: readiness questions`,
      ).toBeGreaterThanOrEqual(2);
      expectUnique(
        guide.commandDetails.map((detail) => detail.command),
        `${lesson.id}: command explanations`,
      );
      for (const command of lesson.commands) {
        const detail = guide.commandDetails.find(
          (item) => item.command === command.command,
        );
        expect(
          detail,
          `${lesson.id}: explain ${command.command}`,
        ).toBeDefined();
      }
      for (const detail of guide.commandDetails) {
        for (const value of [
          detail.command,
          detail.breakdown,
          detail.expected,
          detail.pitfall,
        ])
          expect(
            value.trim(),
            `${lesson.id}: complete command explanation`,
          ).not.toBe("");
      }
      for (const step of guide.walkthrough) {
        expect(step.title.trim()).not.toBe("");
        expect(step.instruction.trim()).not.toBe("");
        expect(
          step.expected.trim(),
          `${lesson.id}: explain what to observe`,
        ).not.toBe("");
      }
    }
  });

  it("has unique stable IDs for all content and globally unique exercises", () => {
    expectUnique(
      lessons.map((l) => l.id),
      "Lesson IDs",
    );
    expectUnique(
      lessons.flatMap((l) => l.exercises.map((e) => e.id)),
      "Exercise IDs",
    );
    expectUnique(
      sections.map((s) => s.id),
      "Section IDs",
    );
    expectUnique(
      resources.map((r) => r.id),
      "Resource IDs",
    );
    expectUnique(
      projects.map((p) => p.id),
      "Project IDs",
    );
    expectUnique(
      certifications.map((c) => c.id),
      "Certification IDs",
    );
    for (const id of [
      ...lessons.map((l) => l.id),
      ...lessons.flatMap((l) => l.exercises.map((e) => e.id)),
    ]) {
      expect(
        id,
        "Content IDs must survive backup and route serialization",
      ).toMatch(/^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/);
    }
  });

  it("resolves lesson prerequisites without self-dependencies or cycles", () => {
    const byId = new Map(lessons.map((l) => [l.id, l]));
    const visited = new Set<string>();
    const active = new Set<string>();
    const visit = (id: string, route: string[]) => {
      expect(
        byId.has(id),
        `Missing prerequisite ${[...route, id].join(" → ")}`,
      ).toBe(true);
      expect(
        active.has(id),
        `Circular prerequisite ${[...route, id].join(" → ")}`,
      ).toBe(false);
      if (visited.has(id)) return;
      active.add(id);
      const lesson = byId.get(id)!;
      expectUnique(lesson.prerequisites, `${id} prerequisites`);
      for (const prerequisite of lesson.prerequisites)
        visit(prerequisite, [...route, id]);
      active.delete(id);
      visited.add(id);
    };
    for (const lesson of lessons) visit(lesson.id, []);
  });

  it("resolves every section, resource, certification-section, and project-lesson reference", () => {
    const sectionIds = new Set(sections.map((s) => s.id));
    const lessonIds = new Set(lessons.map((l) => l.id));
    const resourceIds = new Set(resources.map((r) => r.id));
    for (const section of sections) {
      expect(Number.isInteger(section.id)).toBe(true);
      expect(section.id).toBeGreaterThanOrEqual(0);
      for (const resource of section.resourceIds)
        expect(resourceIds.has(resource), `${section.title}: ${resource}`).toBe(
          true,
        );
    }
    for (const video of videos) {
      for (const id of video.lessonIds)
        expect(lessonIds.has(id), `Video references ${id}`).toBe(true);
    }
    for (const lesson of lessons) {
      expect(
        videosForLesson(lesson.id).length,
        `${lesson.id} needs a relevant video`,
      ).toBeGreaterThan(0);
      for (const id of lesson.prerequisites) {
        const prerequisite = lessons.find((l) => l.id === id)!;
        if (prerequisite.section === lesson.section)
          expect(lessons.indexOf(prerequisite)).toBeLessThan(
            lessons.indexOf(lesson),
          );
      }
      expect(sectionIds.has(lesson.section), `${lesson.id} section`).toBe(true);
      expect(
        lesson.resourceIds.length,
        `${lesson.id} needs supporting sources`,
      ).toBeGreaterThan(0);
      for (const resource of lesson.resourceIds)
        expect(resourceIds.has(resource), `${lesson.id}: ${resource}`).toBe(
          true,
        );
    }
    for (const project of projects) {
      expect(
        project.lessons.length,
        `${project.id} needs a preparation path`,
      ).toBeGreaterThan(0);
      for (const lesson of project.lessons)
        expect(lessonIds.has(lesson), `${project.id}: ${lesson}`).toBe(true);
      expect(
        project.rubric.length,
        `${project.id} matches the portfolio assessment contract`,
      ).toBe(5);
    }
    for (const certification of certifications)
      for (const section of certification.sections)
        expect(
          sectionIds.has(section),
          `${certification.id}: section ${section}`,
        ).toBe(true);
    for (const item of expansionBacklog)
      expect(
        sectionIds.has(item.section),
        `Backlog section ${item.section}`,
      ).toBe(true);
  });

  it.each(
    lessons
      .filter((l) => l.status === "released")
      .map((l) => [l.id, l] as const),
  )(
    "%s supplies teaching, retrieval, and a practical evidence contract",
    (_id, lesson) => {
      expect(lesson.summary.trim().length).toBeGreaterThan(25);
      expect(lesson.minutes).toBeGreaterThan(0);
      expect(lesson.outcomes.length).toBeGreaterThanOrEqual(2);
      expect(lesson.concepts.length).toBeGreaterThanOrEqual(2);
      for (const concept of lesson.concepts) {
        expect(concept.title.trim()).not.toBe("");
        expect(
          concept.body.trim().length,
          `${lesson.id}: ${concept.title} must explain a usable idea`,
        ).toBeGreaterThanOrEqual(80);
      }
      expect(lesson.demo.code.trim().length).toBeGreaterThan(20);
      expect(lesson.demo.explanation.trim().length).toBeGreaterThan(40);
      expect(lesson.practice.length).toBeGreaterThanOrEqual(2);
      expect(
        lesson.exercises.filter((e) => !isRecognitionExercise(e)).length,
        `${lesson.id} must allow two independent retrievals beyond recognition`,
      ).toBeGreaterThanOrEqual(2);
      expect(
        lesson.exercises.some(
          (e) =>
            ["recall", "fill"].includes(e.kind) && !isRecognitionExercise(e),
        ),
        `${lesson.id} must include core recall or fill`,
      ).toBe(true);
      for (const exercise of lesson.exercises) {
        expect(exercise.prompt.trim().length).toBeGreaterThan(10);
        expect(exercise.answers.length).toBeGreaterThan(0);
        expect(exercise.explanation.trim().length).toBeGreaterThan(8);
        expect(exercise.hint.trim()).not.toBe("");
        for (const answer of exercise.answers)
          expect(
            assessAnswer(exercise, answer),
            `${exercise.id}: canonical answer must be accepted`,
          ).toBe(true);
        if (exercise.kind === "choice") {
          expect(
            exercise.options?.length,
            `${exercise.id} needs visible choices`,
          ).toBeGreaterThanOrEqual(2);
          for (const answer of exercise.answers)
            expect(exercise.options).toContain(answer);
        }
      }
      expect(lesson.lab.environment.trim().length).toBeGreaterThan(30);
      expect(lesson.lab.scenario.trim().length).toBeGreaterThan(30);
      expect(lesson.lab.steps.length).toBeGreaterThanOrEqual(3);
      expect(lesson.lab.evidence.length).toBeGreaterThanOrEqual(2);
      expect(lesson.lab.rubric.length).toBeGreaterThanOrEqual(3);
      expect(lesson.lab.solution.trim().length).toBeGreaterThan(60);
      expect(lesson.lab.challenge.trim().length).toBeGreaterThan(30);
    },
  );

  it("uses safe absolute reference links with explanatory source metadata", () => {
    for (const resource of resources) {
      expect(() => safeUrl(resource.url), resource.id).not.toThrow();
      expect(resource.publisher.trim()).not.toBe("");
      expect(resource.why.trim().length).toBeGreaterThan(40);
      expect(resource.when.trim().length).toBeGreaterThan(30);
      expect(resource.checked).toMatch(/^\d{4}-\d{2}-\d{2}/);
    }
    for (const certification of certifications)
      expect(() => safeUrl(certification.url), certification.id).not.toThrow();
  });
});
