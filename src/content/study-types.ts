export type LessonStudyGuide = {
  startingPoint: string;
  whyItMatters: string;
  required: string[];
  optional: { topic: string; reason: string }[];
  terms: { term: string; meaning: string }[];
  walkthrough: { title: string; instruction: string; expected: string }[];
  commandDetails: {
    command: string;
    breakdown: string;
    expected: string;
    pitfall: string;
  }[];
  readiness: string[];
};
