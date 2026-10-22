import { lessons } from "../content";
import {
  getLessonProgress,
  isProjectVerified,
  type AtlasData,
} from "./learning";
export type Gate = {
  id: string;
  title: string;
  timing: string;
  roles: string[];
  skills: string[];
  independent: string[];
  projects: string[];
  projectCount: number;
  certs: string;
  description: string;
};
export const gates: Gate[] = [
  {
    id: "foundation",
    title: "Foundation Technician",
    timing: "First capability milestone",
    roles: ["IT support trainee", "Technical support technician"],
    skills: [
      "terminal-map",
      "terminal-streams",
      "linux-permissions",
      "linux-processes",
      "linux-services",
      "network-dns",
      "troubleshoot-nginx",
    ],
    independent: ["terminal-map", "troubleshoot-nginx"],
    projects: ["linux-service"],
    projectCount: 1,
    certs: "Optional: Linux Essentials or LFCA. Choose one only if useful.",
    description:
      "Inspect a Linux machine, diagnose a local service failure, and communicate a reproducible recovery.",
  },
  {
    id: "month4",
    title: "Cloud Support Ready",
    timing: "Month-4 target · evidence decides",
    roles: [
      "Cloud support associate",
      "Junior operations technician",
      "Technical AI-workflow support",
    ],
    skills: [
      "terminal-map",
      "terminal-streams",
      "linux-permissions",
      "linux-processes",
      "linux-services",
      "linux-resources",
      "network-addresses",
      "network-dns",
      "network-http",
      "troubleshoot-nginx",
      "git-basics",
      "git-collaboration",
      "bash-health",
      "cloud-model",
      "aws-plan",
      "aws-field",
      "ai-verify",
    ],
    independent: [
      "terminal-map",
      "linux-processes",
      "troubleshoot-nginx",
      "git-basics",
      "bash-health",
    ],
    projects: ["linux-service", "health-monitor"],
    projectCount: 2,
    certs:
      "Cloud Practitioner is a vocabulary option; no certification substitutes for the practical gate.",
    description:
      "Demonstrate Linux, networking, Git, scripting, real AWS identity/EC2/VPC/S3 work, documentation, and two credible projects. Begin applying when your evidence matches real role requirements.",
  },
  {
    id: "month6",
    title: "Junior Cloud Engineer",
    timing: "Month-6 target · evidence decides",
    roles: [
      "Junior cloud engineer",
      "Junior infrastructure engineer",
      "Cloud operations engineer",
    ],
    skills: [
      "linux-permissions",
      "linux-processes",
      "linux-services",
      "network-addresses",
      "network-dns",
      "cloud-packet",
      "git-basics",
      "git-collaboration",
      "bash-health",
      "python-inventory",
      "aws-field",
      "terraform-local",
      "docker-local",
      "ci-contract",
      "reliability-sli",
      "security-review",
      "architecture-tradeoffs",
    ],
    independent: [
      "troubleshoot-nginx",
      "bash-health",
      "python-inventory",
      "terraform-local",
      "docker-local",
    ],
    projects: [
      "terraform-deploy",
      "container-app",
      "cicd-pipeline",
      "capstone",
    ],
    projectCount: 4,
    certs:
      "Prioritize one AWS associate aligned with target roles; consider Terraform after project use.",
    description:
      "Own a reproducible cloud system through change, incident, recovery, and review. The substantial capstone is required, including live evidence rather than a design-only submission.",
  },
  {
    id: "engineer",
    title: "Cloud Engineer",
    timing: "Beyond month 6",
    roles: ["Cloud engineer", "Platform engineer", "DevOps engineer"],
    skills: [
      "aws-field",
      "terraform-local",
      "docker-local",
      "ci-contract",
      "reliability-sli",
      "security-review",
      "architecture-tradeoffs",
      "python-inventory",
    ],
    independent: [
      "aws-field",
      "terraform-local",
      "docker-local",
      "ci-contract",
      "reliability-sli",
      "architecture-tradeoffs",
    ],
    projects: ["aws-ha", "terraform-deploy", "cicd-pipeline", "capstone"],
    projectCount: 5,
    certs: "Add specializations only after repeated operational practice.",
    description:
      "Repeat the engineering gates in unfamiliar environments, deepen the expansion labs, and obtain real operational experience. Atlas can organize evidence; it cannot certify professional experience.",
  },
  {
    id: "advanced",
    title: "Advanced Track",
    timing: "After core engineering capability",
    roles: [
      "Platform engineering specialization",
      "Cloud reliability specialization",
    ],
    skills: [
      "kubernetes-read",
      "architecture-tradeoffs",
      "security-review",
      "cloud-packet",
    ],
    independent: ["kubernetes-read", "architecture-tradeoffs"],
    projects: ["capstone"],
    projectCount: 5,
    certs:
      "Consider CKA or deeper networking/security only when the role calls for it.",
    description:
      "The Kubernetes bridge is introductory. Complete deeper local cluster, distributed-system, and security labs from the expansion backlog before claiming specialization.",
  },
];
export function evaluateGate(gate: Gate, data: AtlasData) {
  const skillIds = [...new Set([...gate.skills, ...gate.independent])];
  const skills = skillIds.map((id) => {
    const lesson = lessons.find((l) => l.id === id);
    const state = lesson
      ? getLessonProgress(lesson, data).state
      : "Not Yet Introduced";
    const needsIndependent = gate.independent.includes(id);
    return {
      id,
      title: lesson?.title ?? id,
      state,
      required: needsIndependent ? "Independent" : "Demonstrated",
      met: needsIndependent
        ? state === "Independent"
        : ["Demonstrated", "Independent"].includes(state),
    };
  });
  const projects = gate.projects.map((id) => ({
    id,
    met: data.projects.some((p) => p.id === id && isProjectVerified(p)),
  }));
  const count = data.projects.filter(isProjectVerified).length;
  return {
    skills,
    projects,
    count,
    met:
      gate.id !== "advanced" &&
      skills.every((s) => s.met) &&
      projects.every((p) => p.met) &&
      count >= gate.projectCount,
  };
}
