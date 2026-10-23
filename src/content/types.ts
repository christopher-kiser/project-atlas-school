import type { LessonStudyGuide } from "./study-types";

export type Exercise = {
  id: string;
  /** Default true for commands; concept names can explicitly opt out. */
  caseSensitive?: boolean;
  kind: "recall" | "predict" | "diagnose" | "fill" | "choice";
  prompt: string;
  answers: string[];
  explanation: string;
  hint: string;
  options?: string[];
};
export type Lesson = {
  study?: LessonStudyGuide;
  id: string;
  section: number;
  title: string;
  summary: string;
  minutes: number;
  status: "released" | "blueprint";
  prerequisites: string[];
  outcomes: string[];
  concepts: { title: string; body: string; analogy?: string }[];
  commands: {
    command: string;
    purpose: string;
    example: string;
    caution?: string;
  }[];
  demo: { title: string; code: string; explanation: string };
  practice: string[];
  exercises: Exercise[];
  lab: {
    title: string;
    environment: string;
    scenario: string;
    steps: string[];
    evidence: string[];
    rubric: string[];
    hints: string[];
    solution: string;
    challenge: string;
  };
  resourceIds: string[];
};
export type Section = {
  id: number;
  title: string;
  subtitle: string;
  phase: string;
  topics: string[];
  resourceIds: string[];
};
export type Resource = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  why: string;
  when: string;
  required: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  kind: "Documentation" | "Course" | "Lab" | "Video" | "Reference";
  checked: string;
};
