import { foundationGuides } from "./guides-foundations";
import { advancedGuides } from "./guides-advanced";
import { expandedGuides } from "./guides-expanded";
import type { LessonStudyGuide } from "./study-types";

// Authored teaching content: import only from the server catalog in Academy.
export const studyGuides: Record<string, LessonStudyGuide> = {
  ...foundationGuides,
  ...advancedGuides,
  ...expandedGuides,
};
