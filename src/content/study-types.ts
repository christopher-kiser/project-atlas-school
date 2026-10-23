export type CommandTopic = {
  id: string;
  title: string;
  kind: "program" | "syntax" | "workflow";
  explanation: string;
  example: string;
  parts: { token: string; meaning: string }[];
  expected: string;
  question: string;
  answer: string;
};
export type CommandLesson = {
  demoMode: "terminal" | "editor" | "graphical" | "reference";
  demoWhere: string;
  environment: string;
  orientation: string;
  topics: CommandTopic[];
  entries: {
    command: string;
    mode: "terminal" | "editor" | "graphical" | "reference";
    where: string;
  }[];
};

export type LessonStudyGuide = {
  commandLesson?: CommandLesson;
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
