import { pathwayLessons } from "./pathway-lessons";
export { engineeringMonths, portfolioMilestones } from "./pathway";
export { certificationPractice } from "./certification-practice";
import { foundations } from "./foundations";
import { advanced } from "./advanced";
import { expanded } from "./expanded";
import type { Lesson } from "./types";
import { studyGuides } from "./study-guides";
export { sections } from "./sections";
export { resources } from "./resources";
export { certifications } from "./certifications";
export { projects } from "./projects";
const field: Lesson = {
  id: "aws-field",
  section: 10,
  title: "AWS field checkpoint: prove the request path",
  summary:
    "Capture real EC2, VPC, S3, and IAM evidence from your own reviewed sandbox.",
  minutes: 60,
  status: "released",
  prerequisites: ["aws-plan", "aws-operations", "security-review"],
  outcomes: [
    "Explain a real cloud request path",
    "Distinguish identity denial from network failure",
    "Demonstrate cleanup and current cost awareness",
  ],
  concepts: [
    {
      title: "This checkpoint needs real evidence",
      body: "A diagram or simulator cannot prove that you operated AWS. Use a sandbox you already have permission to use, following current official setup guidance. A design-only submission is useful practice but cannot satisfy this field checkpoint.",
    },
    {
      title: "Set the boundary first",
      body: "Before creating anything, review current regional prices and your account’s eligibility, identify ownership, set cost alerts, and write a cleanup checklist. Alerts are not a hard cap. Atlas neither creates resources nor receives credentials.",
    },
    {
      title: "Prove each layer",
      body: "Capture the application response, the compute instance and subnet relationship, the relevant routes and security-group rules, and an S3 request using scoped identity. Redact account identifiers and never submit keys, cookies, or access tokens.",
    },
  ],
  commands: [
    {
      command: "aws sts get-caller-identity",
      purpose:
        "Identify the current AWS principal before read-only inspection.",
      example: "aws sts get-caller-identity",
      caution:
        "Keep account-specific output private or redact it in portfolio evidence.",
    },
  ],
  demo: {
    title: "Evidence checklist · execute nothing automatically",
    code: "Identity: principal type and intended scope\nNetwork: instance → subnet → route → security boundary\nApplication: original request and response\nStorage: one allowed S3 request and one intentional denial\nCleanup: resource inventory before and after",
    explanation:
      "Use actual redacted observations and distinguish them from expected results. If you have no AWS sandbox, complete aws-plan and return here later.",
  },
  practice: [
    "Identify the current principal using your approved authentication method.",
    "Prepare a redacted evidence template before testing.",
    "Name the exact resource and action in an allowed/denied S3 test.",
  ],
  exercises: [
    {
      id: "field-policy",
      kind: "recall",
      caseSensitive: false,
      prompt:
        "Which AWS policy system controls which API actions an identity may perform?",
      answers: ["iam", "iam policy", "iam policies"],
      hint: "Identity and Access Management.",
      explanation:
        "An IAM policy scopes actions and resources; a security group scopes network traffic.",
    },
    {
      id: "field-principal",
      kind: "recall",
      prompt: "Which AWS CLI command identifies your current principal?",
      answers: ["aws sts get-caller-identity"],
      hint: "Use the STS get-caller-identity operation.",
      explanation: "Always identify which account and role a tool will use.",
    },
    {
      id: "field-denial",
      caseSensitive: false,
      kind: "diagnose",
      prompt:
        "An S3 API returns AccessDenied. Is opening port 22 a justified fix? yes or no",
      answers: ["no"],
      hint: "Identity policy is a different boundary from SSH.",
      explanation:
        "Inspect identity and resource permissions for the specific API request.",
    },
    {
      id: "field-cleanup",
      caseSensitive: false,
      kind: "diagnose",
      prompt:
        "Does stopping an EC2 instance guarantee all associated costs stop? yes or no",
      answers: ["no"],
      hint: "Storage and other allocated resources may remain.",
      explanation:
        "Inventory and remove unnecessary billed resources explicitly.",
    },
  ],
  lab: {
    title: "Independent AWS field evidence",
    environment:
      "Your own authorized AWS sandbox. Current official instructions and an explicit cost review are prerequisites; no paid action is automated.",
    scenario:
      "A reviewer needs evidence that you can operate and explain a small AWS web service, not just name services.",
    steps: [
      "Complete a reviewed manual EC2/VPC/S3 lab using official documentation.",
      "Capture identity, request path, application response, and allowed/denied storage tests.",
      "Capture cleanup inventory and write an incident-style explanation of one real failure.",
    ],
    evidence: [
      "Redacted real AWS observations",
      "Application and S3 request results",
      "Cost/cleanup record and failure explanation",
    ],
    rubric: [
      "Evidence comes from real EC2/VPC/S3 operation, not a diagram",
      "IAM scope and a denied action are explained",
      "Routes and security groups match the successful request",
      "Current cost review and cleanup are documented",
    ],
    hints: [
      "Start with the smallest reviewed setup; do not troubleshoot by granting administrator access.",
    ],
    solution:
      "There is no universal output: record your actual account-specific observations, explain each boundary, and show recovery from a real failure. A peer should be able to follow the sanitized record without your credentials.",
    challenge:
      "Explain an unfamiliar failure without a prepared command list, then prove the smallest fix worked.",
  },
  resourceIds: ["aws", "security"],
};
// Keep section order, placing prerequisites from that section before their dependents.
const catalog: Lesson[] = [
  ...expanded.filter((l) => l.section === 0),
  ...foundations,
  ...pathwayLessons,
  ...advanced,
  field,
  ...expanded.filter((l) => l.section !== 0),
]
  .map((lesson) => ({
    ...lesson,
    study: lesson.study ?? studyGuides[lesson.id],
  }))
  .sort((a, b) => a.section - b.section);
const byId = new Map(catalog.map((l) => [l.id, l]));
const ordered: Lesson[] = [];
const placed = new Set<string>();
const visiting = new Set<string>();
function place(lesson: Lesson) {
  if (placed.has(lesson.id)) return;
  if (visiting.has(lesson.id))
    throw new Error(`Circular lesson prerequisite: ${lesson.id}`);
  visiting.add(lesson.id);
  for (const id of lesson.prerequisites) {
    const prerequisite = byId.get(id);
    if (prerequisite?.section === lesson.section) place(prerequisite);
  }
  visiting.delete(lesson.id);
  placed.add(lesson.id);
  ordered.push(lesson);
}
catalog.forEach(place);
export const lessons = ordered;
export const lessonById = (id: string) => byId.get(id);
export { expansionBacklog } from "./backlog";
export { videos, videosForLesson } from "./videos";
