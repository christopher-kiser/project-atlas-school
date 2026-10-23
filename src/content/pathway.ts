export type MonthPlan = {
  month: number;
  title: string;
  focus: string;
  lessonIds: string[];
  projectIds: string[];
  certificationIds: string[];
  evidence: string[];
  independentTask: string;
  review: string;
  remainingDepth: string;
};

export const engineeringMonths: MonthPlan[] = [
  {
    month: 1,
    title: "Operate and explain a local system",
    focus:
      "Computing, Linux, networking, Git, Bash and Python fundamentals. This is a demanding foundation phase: extend it when the independent task is still difficult.",
    lessonIds: [
      "computing-basics",
      "web-foundations",
      "orientation",
      "terminal-map",
      "terminal-files",
      "terminal-cleanup",
      "terminal-streams",
      "terminal-search",
      "terminal-control",
      "editor-workflow",
      "linux-permissions",
      "linux-processes",
      "linux-jobs",
      "linux-services",
      "linux-resources",
      "network-addresses",
      "network-dns",
      "network-http",
      "troubleshoot-nginx",
      "troubleshoot-layers",
      "git-basics",
      "git-branches",
      "git-conflicts",
      "git-collaboration",
      "github-workflow",
      "bash-values",
      "bash-decisions",
      "bash-loops",
      "bash-functions",
      "bash-health",
      "python-data",
      "python-files-json",
      "python-testing",
      "python-inventory",
      "python-cli",
    ],
    projectIds: ["linux-service", "health-monitor"],
    certificationIds: ["cisco-networking-basics", "ibm-cloud-fundamentals"],
    evidence: [
      "Reproduce a Linux service fault, repair it, and repeat the original HTTP test.",
      "Push a reviewed Git branch containing a tested health tool, setup instructions, and a failure table.",
      "Explain paths, permissions, streams, DNS, ports, functions, JSON and exit status without an AI answer.",
    ],
    independentTask:
      "Ask a peer to choose a stopped process, wrong path, or permission fault in your disposable lab. Diagnose from observations without the prepared solution and write a short escalation note if you cannot safely repair it.",
    review:
      "Use the review queue daily. Revisit different command families together; repeat the practical unaided at least a day after the guided attempt.",
    remainingDepth:
      "A month label is a planning target, not permission to skip foundation evidence. Free networking credentials can reinforce this phase; do not buy a Linux exam by default.",
  },
  {
    month: 2,
    title: "Reason about cloud identity, networking and cost",
    focus:
      "AWS service categories, shared responsibility, IAM, EC2/S3/VPC design, CIDR, data and safe account boundaries. Prepare Cloud Practitioner through engineering examples.",
    lessonIds: [
      "network-cidr",
      "cloud-packet",
      "cloud-model",
      "database-sql",
      "database-transactions",
      "aws-plan",
      "aws-availability",
      "aws-operations",
      "security-review",
    ],
    projectIds: ["aws-static"],
    certificationIds: ["cloud-practitioner"],
    evidence: [
      "Trace a request through DNS, routes, security boundaries, compute and storage; separate network permission from IAM permission.",
      "Compare service and storage choices, responsibility boundaries and ongoing cost components.",
      "Use official training and explain every wrong answer in the Atlas teaching set; take separate legitimate timed mocks before deciding on an exam.",
    ],
    independentTask:
      "Given a new small-business requirement, defend a minimal design, one denial test, a cost worksheet and a cleanup checklist. Without an authorized sandbox, submit design evidence and label it as such.",
    review:
      "Interleave earlier Linux/DNS faults with AWS scenarios. Recheck missed concepts after a delay rather than immediately repeating the same questions.",
    remainingDepth:
      "AWS provisioning and paid exam booking require their own authorization and current pricing. Local or diagram work does not satisfy the real AWS field checkpoint.",
  },
  {
    month: 3,
    title: "Make delivery reproducible and reversible",
    focus:
      "Terraform, Docker, scripting, reproducible configuration and CI/CD. Use local tool labs first, then explicitly reviewed provider work when available.",
    lessonIds: [
      "python-http-api",
      "terraform-local",
      "terraform-modules",
      "terraform-state",
      "docker-local",
      "docker-build",
      "docker-compose",
      "ci-contract",
      "cicd-artifacts",
    ],
    projectIds: ["terraform-deploy", "container-app", "cicd-pipeline"],
    certificationIds: ["oci-foundations", "aws-cloud-essentials-badge"],
    evidence: [
      "Review a plan, explain resource/state addresses and protect state; show a no-change rerun.",
      "Build and replace an image, inspect health and preserve the intended data boundary.",
      "Make a check fail, reject the candidate, promote the tested artifact and verify rollback.",
    ],
    independentTask:
      "Introduce one change that fails a test or health condition. Demonstrate why it must not be promoted, restore a known candidate and prove recovery from the original request.",
    review:
      "Mix shell/Python failures with container and pipeline failures. Explain which layer owns each symptom before looking up syntax.",
    remainingDepth:
      "Month 3 builds local project scaffolds. The Terraform deployment brief requires the authorized AWS field checkpoint: defer its provider-backed completion to Month 5. Local terraform_data and artifact fixtures do not prove remote state, provider authentication or hosted production delivery. Record tools and versions actually used.",
  },
  {
    month: 4,
    title: "Investigate, protect and recover",
    focus:
      "Kubernetes foundations, observability, incident response, security and measured backup/recovery.",
    lessonIds: [
      "reliability-sli",
      "observability-signals",
      "reliability-incident",
      "security-threat-model",
      "kubernetes-read",
      "kubernetes-workloads",
      "powershell-bridge",
      "ai-verify",
    ],
    projectIds: ["container-app", "capstone"],
    certificationIds: ["aws-serverless-demonstrated"],
    evidence: [
      "Differentiate process state, readiness, traffic success and user-visible reliability.",
      "Diagnose a selector or health fault in a disposable cluster; explain what one local node cannot prove.",
      "Restore data, measure recovery time and disclose the recovery point and any lost writes.",
      "Test a denied action as well as an allowed one; redact secrets and review AI-generated changes.",
    ],
    independentTask:
      "Respond to an unfamiliar incident brief: state impact, preserve observations, choose the smallest reversible action, repeat the failing user request and write a prevention follow-up.",
    review:
      "Use delayed incidents with different symptoms, not the same memorized repair sequence. Include a previous networking or permission problem.",
    remainingDepth:
      "A green local workload is not proof of multi-zone availability. Deeper cluster operations, instrumentation and real identity lifecycle remain additional practical work.",
  },
  {
    month: 5,
    title: "Defend an AWS architecture",
    focus:
      "Solutions Architect Associate preparation through security, resilience, performance and cost tradeoffs; substantial project evidence.",
    lessonIds: [
      "architecture-tradeoffs",
      "aws-availability",
      "aws-operations",
      "aws-field",
      "cloud-packet",
      "database-transactions",
      "reliability-incident",
    ],
    projectIds: ["aws-ha", "terraform-deploy", "capstone"],
    certificationIds: ["oci-architect-associate", "solutions-architect"],
    evidence: [
      "Compare at least two designs against requirements, failure domains, throughput/latency, RTO/RPO and cost assumptions.",
      "Explain queue retries/idempotency, database and storage selection, private networking and least privilege using official objective references.",
      "Provide real redacted AWS field evidence only when an authorized sandbox is available; keep design-only work separately labeled.",
    ],
    independentTask:
      "Defend a new architecture requirement aloud without generated notes, then handle a changed constraint such as a lost zone, tighter budget or lower recovery time.",
    review:
      "Interleave CLF foundations and SAA scenarios. Use short Atlas questions for learning; use different legitimate full mocks for booking readiness.",
    remainingDepth:
      "This catalog is a foundation for the official objectives, not a complete SAA course or exam-pass guarantee. Follow each credential card's remaining preparation gaps.",
  },
  {
    month: 6,
    title: "Prove readiness and present your work",
    focus:
      "Independent assessments, delayed recall, defensible portfolio, appropriate credentials and interviews. The original study target is April 2027; competency determines the actual pace.",
    lessonIds: [
      "architecture-tradeoffs",
      "ai-verify",
      "aws-field",
      "reliability-incident",
    ],
    projectIds: [
      "linux-service",
      "health-monitor",
      "aws-static",
      "aws-ha",
      "terraform-deploy",
      "container-app",
      "capstone",
      "cicd-pipeline",
    ],
    certificationIds: ["cloud-practitioner", "solutions-architect"],
    evidence: [
      "Reproduce a chosen system from its README, perform an unfamiliar change, break and recover it, and defend the decisions.",
      "Present source, tests, architecture, deployment, monitoring, recovery, cost and known limitations with no credentials in public evidence.",
      "Record provider-issued credential evidence separately from self-reported practice scores. Book a paid exam only after a separate deliberate decision.",
    ],
    independentTask:
      "Give a timed project walkthrough and incident explanation to a reviewer, answer follow-up changes without AI, and document gaps honestly. AyerOps or another existing project can be a case study if you can reproduce and defend its engineering.",
    review:
      "Repeat selected earlier tasks after at least 24 hours and revisit any weak domains. Use career gates and reviewer evidence rather than elapsed time or badge count.",
    remainingDepth:
      "Six months, a completed checklist or a certification does not guarantee employment. The capability gates and portfolio evidence remain the decision basis.",
  },
];

export const portfolioMilestones: Record<string, string[]> = {
  "linux-service": [
    "A second person can follow setup in a disposable Ubuntu environment.",
    "A new service fault is diagnosed from request, process, socket and log evidence.",
    "A dated incident record proves recovery and cleanup; a delayed repeat is explained unaided.",
  ],
  "health-monitor": [
    "Command arguments, timeout and exit-status contract are documented and tested.",
    "Success, timeout, HTTP error and malformed input cases have reproducible fixtures.",
    "A peer changes the endpoint requirement and you adapt and defend the checks without AI.",
  ],
  "aws-static": [
    "Requirements, public/private boundaries and current cost/ownership assumptions are reviewed before any resources.",
    "Authorized real deployment evidence includes original request, intended allowed/denied access, and cleanup inventory.",
    "Design-only submissions remain clearly labeled and do not claim the live milestone.",
  ],
  "aws-ha": [
    "Two candidate designs are compared against explicit availability, latency, data and budget requirements.",
    "A zone-loss capacity calculation and an RTO/RPO recovery argument are reproduced.",
    "A reviewer changes one constraint and you defend the tradeoff with assumptions and limitations.",
  ],
  "terraform-deploy": [
    "Formatting, validation and a reviewed plan run in a scoped environment.",
    "State ownership, sensitive data and recovery are documented; a no-change rerun is shown.",
    "A controlled change and rollback/import/move scenario include before/after evidence without hiding replacement risk.",
  ],
  "container-app": [
    "Image identity, build context, health, configuration and persistence are reproducible.",
    "A failing candidate is blocked by checks; the tested artifact is promoted and rollback is proven.",
    "Named-resource cleanup and an independent network/health diagnosis are recorded.",
  ],
  capstone: [
    "An unfamiliar reviewer can locate architecture, infrastructure, tests, deployment and operating instructions.",
    "Security, monitoring, backup/recovery and a deliberate incident have reproducible evidence and stated limits.",
    "The author handles a new requirement unaided and explains any AI-assisted code; private project files stay in the learner's own storage.",
  ],
  "cicd-pipeline": [
    "A pull request runs meaningful tests and a failing candidate is rejected before promotion.",
    "One tested immutable artifact moves through promotion and health verification; a known version can be restored.",
    "Another person reproduces the workflow, permission boundaries and rollback from redacted evidence.",
  ],
};
