import { describe, expect, it } from "vitest";
import { gates, evaluateGate } from "../src/lib/gates";
import { createInitialData } from "../src/lib/learning";
import { lessons, projects } from "../src/content";
describe("career readiness boundaries", () => {
  it("reported prior experience alone does not satisfy any career gate", () => {
    for (const gate of gates)
      expect(evaluateGate(gate, createInitialData()).met).toBe(false);
  });
  it("every requirement points to a real lesson or portfolio project", () => {
    for (const gate of gates) {
      for (const id of [...gate.skills, ...gate.independent])
        expect(lessons.some((l) => l.id === id)).toBe(true);
      for (const id of gate.projects)
        expect(projects.some((p) => p.id === id)).toBe(true);
    }
  });
  it("early support requires real AWS field evidence and two reviewed projects", () => {
    const gate = gates.find((g) => g.id === "month4")!;
    expect(gate.skills).toContain("aws-field");
    expect(gate.projectCount).toBeGreaterThanOrEqual(2);
    expect(gate.independent).toContain("troubleshoot-nginx");
  });
  it("engineering requires the substantial capstone and does not treat an introductory Kubernetes lesson as specialization", () => {
    expect(gates.find((g) => g.id === "month6")!.projects).toContain(
      "capstone",
    );
    expect(
      evaluateGate(
        gates.find((g) => g.id === "advanced")!,
        createInitialData(),
      ).met,
    ).toBe(false);
  });
});
