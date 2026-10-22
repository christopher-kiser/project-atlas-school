import { foundations } from "./foundations";
import { advanced } from "./advanced";
import type { Lesson } from "./types";
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
  prerequisites: ["aws-plan", "security-review"],
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
export const lessons: Lesson[] = [...foundations, ...advanced, field].sort(
  (a, b) => a.section - b.section,
);
export const lessonById = (id: string) => lessons.find((l) => l.id === id);
export const expansionBacklog = [
  {
    section: 6,
    items: [
      "Loops, functions, arguments, and defensive quoting",
      "Backup rotation and restore tests",
      "Idempotent deployment helpers",
    ],
  },
  {
    section: 7,
    items: [
      "HTTP APIs with timeouts and retries",
      "subprocess argument safety",
      "Cloud SDK pagination, error handling, and tests",
    ],
  },
  {
    section: 8,
    items: [
      "Subnetting drills and IPv6 packet paths",
      "TLS/reverse-proxy failure lab",
      "VPN and multi-network route diagnosis",
    ],
  },
  {
    section: 9,
    items: [
      "Managed databases and responsibility boundaries",
      "High availability vs disaster recovery",
      "Cost estimation with current regional inputs",
    ],
  },
  {
    section: 10,
    items: [
      "Guided EC2/VPC/S3 provisioning with budget preflight",
      "EBS, Elastic IP, Route 53, and Systems Manager labs",
      "RDS, ALB, and Auto Scaling failure drills",
      "CloudWatch/CloudTrail investigation",
      "Lambda and SQS/SNS failure/retry patterns",
    ],
  },
  {
    section: 11,
    items: [
      "Provider modules, imports, lifecycle and data sources",
      "Remote state locking and recovery",
      "Separate environment deployment practical",
    ],
  },
  {
    section: 12,
    items: [
      "Dockerfile layering and build cache",
      "Compose health, volumes, and networks",
      "Registry digests and image review",
    ],
  },
  {
    section: 13,
    items: [
      "OIDC deployment identity",
      "Approvals, branch protection, and artifact promotion",
      "Blue/green and canary rollout exercises",
    ],
  },
  {
    section: 14,
    items: [
      "Instrumented logs/metrics/traces lab",
      "Alert tuning and burn rates",
      "Timed incident simulation",
    ],
  },
  {
    section: 15,
    items: [
      "SSH hardening and patch verification",
      "Secrets rotation drill",
      "Cloud vulnerability and audit investigation",
    ],
  },
  {
    section: 16,
    items: [
      "Local cluster installation lab",
      "ConfigMap/Secret and namespace boundaries",
      "Ingress, Helm, scaling and rollout failures",
    ],
  },
  {
    section: 17,
    items: [
      "PowerShell environment and permissions lab",
      "Remote administration boundaries",
      "Windows network diagnostic practical",
    ],
  },
  {
    section: 18,
    items: [
      "AI-generated patch adversarial review",
      "Test generation and architecture critique",
      "Delayed unaided troubleshooting assessment",
    ],
  },
  {
    section: 19,
    items: [
      "Caching and database tradeoffs",
      "Queue retry/idempotency implementation",
      "Restore rehearsal and cost/performance study",
    ],
  },
];
