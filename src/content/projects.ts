export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  stage: string;
  lessons: string[];
  brief: string;
  deliverables: string[];
  rubric: string[];
  steps: string[];
  cost: string;
};
export const projects: Project[] = [
  {
    id: "linux-service",
    number: "01",
    title: "Linux web service",
    subtitle: "Deploy. Break. Diagnose. Recover.",
    stage: "Foundation",
    lessons: ["troubleshoot-nginx", "git-basics"],
    brief:
      "Operate Nginx in a disposable Ubuntu environment. Capture a real outage, isolate the cause, recover the service, and make the process reproducible for someone else.",
    deliverables: [
      "README with environment and setup",
      "Service/HTTP/socket evidence before and after an incident",
      "Runbook and incident timeline",
      "Architecture sketch and cleanup instructions",
    ],
    rubric: [
      "A reader can reproduce the setup",
      "A deliberate failure is documented",
      "Recovery is proven with HTTP and socket evidence",
      "Commands and decisions are explained",
      "Public repository contains no secrets",
    ],
    steps: [
      "Create the repository after the Git lessons.",
      "Document the Linux environment and expected HTTP behavior.",
      "Stop the lab service and investigate from the user symptom.",
      "Restore service, collect evidence, and write a concise incident review.",
      "Ask someone to reproduce the runbook and record their feedback.",
    ],
    cost: "Local Ubuntu/WSL only. No cloud spend.",
  },
  {
    id: "health-monitor",
    number: "02",
    title: "Automated health monitor",
    subtitle: "A small tool with a trustworthy signal.",
    stage: "Foundation",
    lessons: ["bash-health", "python-inventory"],
    brief:
      "Build a bounded health checker that reports HTTP availability and a useful exit status. Add tests, structured output, and clear operator instructions.",
    deliverables: [
      "Bash or Python tool",
      "Success/failure/timeout tests",
      "Sample redacted output",
      "README and limitations",
    ],
    rubric: [
      "Inputs are validated and quoted",
      "Timeout and failure behavior are tested",
      "Exit status agrees with actual health",
      "The tool has repeatable tests",
      "README explains false positives and limitations",
    ],
    steps: [
      "Start with one HTTP endpoint.",
      "Implement success and failure paths.",
      "Add timeout and malformed-input cases.",
      "Produce human-readable and machine-readable evidence.",
      "Get an independent review of one failure test.",
    ],
    cost: "Run against your local service.",
  },
  {
    id: "aws-static",
    number: "03",
    title: "AWS static website",
    subtitle: "A narrow cloud surface, deliberately designed.",
    stage: "Builder",
    lessons: ["aws-plan", "security-review"],
    brief:
      "Document a static website architecture with S3 and a deliberate HTTPS delivery path. A live project must include current cost review, access controls, and verified cleanup; a design-only submission remains a design artifact.",
    deliverables: [
      "Architecture and threat sketch",
      "Infrastructure or repeatable setup instructions",
      "HTTPS and permission verification",
      "Cost assumptions and teardown evidence",
    ],
    rubric: [
      "The website behavior is verified in a real AWS sandbox",
      "S3 access and delivery permissions are explained",
      "HTTPS and unintended public access are checked",
      "Costs and cleanup are documented",
      "A reviewer can reproduce the deployment",
    ],
    steps: [
      "Prepare the design-only lesson first.",
      "Read current official service setup and account-specific pricing.",
      "Proceed with live resources only after your own cost review and authorization.",
      "Capture redacted requests and access denial tests.",
      "Teardown unused resources and request a review.",
    ],
    cost: "Potential AWS charges. Design mode is free; Atlas never provisions resources.",
  },
  {
    id: "aws-ha",
    number: "04",
    title: "Resilient AWS web architecture",
    subtitle: "Trace a request and survive a compute failure.",
    stage: "Builder",
    lessons: ["aws-plan", "aws-field", "architecture-tradeoffs"],
    brief:
      "Build and explain a small EC2/VPC architecture, compare single-instance and redundant designs, and test a controlled failure. Include S3 access via workload identity. Use a sandbox and explicit cost boundaries.",
    deliverables: [
      "VPC/subnet/route/security-group diagram",
      "EC2 and IAM evidence",
      "S3 allowed/denied access proof",
      "Failure experiment and teardown log",
    ],
    rubric: [
      "Real EC2/VPC/S3 operation is evidenced",
      "IAM and network boundaries are justified",
      "An instance failure and recovery are tested",
      "Availability claims match the tested architecture",
      "Costs and cleanup are reviewed",
    ],
    steps: [
      "Complete the AWS field checkpoint.",
      "Estimate every component before provisioning.",
      "Record forward and return request paths.",
      "Run a controlled failure with a rollback plan.",
      "Document what still fails and have a peer review it.",
    ],
    cost: "Can incur compute, IPv4, load-balancing, storage, and transfer charges. A diagram alone is not live evidence.",
  },
  {
    id: "terraform-deploy",
    number: "05",
    title: "Terraform deployment",
    subtitle: "An environment you can review and reproduce.",
    stage: "Engineer",
    lessons: ["terraform-local", "aws-field"],
    brief:
      "Turn a reviewed AWS design into versioned infrastructure. Demonstrate plan review, remote-state decisions, import/recovery reasoning, and verified teardown.",
    deliverables: [
      "HCL modules and variable contracts",
      "Redacted plans",
      "State access and recovery strategy",
      "Build and destroy verification",
    ],
    rubric: [
      "Plans are reviewed before each change",
      "State and credentials are not public",
      "Environment boundaries are explicit",
      "Deployment and cleanup are repeatable",
      "Failure recovery is demonstrated",
    ],
    steps: [
      "Start with the local terraform_data lab.",
      "Write a plan for the smallest live architecture.",
      "Choose state storage and access controls.",
      "Test a change and rollback in the sandbox.",
      "Demonstrate teardown and review.",
    ],
    cost: "Local prerequisite is free. AWS resources may incur charges; review the plan and current pricing.",
  },
  {
    id: "container-app",
    number: "06",
    title: "Containerized application",
    subtitle: "Package the process and explain its boundaries.",
    stage: "Engineer",
    lessons: ["docker-local", "python-inventory"],
    brief:
      "Package a small HTTP application with a reviewed Dockerfile and Compose configuration. Define health, persistence, ports, and a safe default identity.",
    deliverables: [
      "App source and tests",
      "Dockerfile and Compose file",
      "Health and persistence tests",
      "Build/run/cleanup instructions",
    ],
    rubric: [
      "A clean checkout builds successfully",
      "Image and runtime inputs are explicit",
      "Container failure is diagnosed from logs",
      "Ports and persistence match the design",
      "No privileged execution or embedded secrets",
    ],
    steps: [
      "Build the local container lab.",
      "Package your own small application.",
      "Bind the local service to loopback.",
      "Test restart, unhealthy behavior, and data persistence.",
      "Have a peer follow the README.",
    ],
    cost: "Local container engine; verify installer licensing yourself. No hosted cluster needed.",
  },
  {
    id: "cicd-pipeline",
    number: "07",
    title: "Verified delivery pipeline",
    subtitle: "A failed test blocks a bad release.",
    stage: "Engineer",
    lessons: ["ci-contract", "container-app-placeholder"],
    brief:
      "Build a pipeline that tests, packages, and deploys a known artifact with minimal permissions. Demonstrate both a blocked release and rollback.",
    deliverables: [
      "Workflow YAML",
      "Failing and passing check evidence",
      "Deployment identity rationale",
      "Version-specific rollback proof",
    ],
    rubric: [
      "A failing check blocks deployment",
      "The deployed artifact is identified",
      "Permissions and secrets are constrained",
      "Rollback is tested",
      "Branch and environment protections are documented",
    ],
    steps: [
      "Choose a small application and free deployment target.",
      "Add meaningful checks.",
      "Break one check and prove the gate works.",
      "Deploy the tested revision only.",
      "Roll back a controlled bad release and record evidence.",
    ],
    cost: "Use a free target and check Actions limits. Avoid paid runners and automatic cloud provisioning.",
  },
  {
    id: "capstone",
    number: "08",
    title: "Production-style cloud system",
    subtitle: "One coherent system. End-to-end ownership.",
    stage: "Engineer",
    lessons: [
      "terraform-local",
      "docker-local",
      "ci-contract",
      "reliability-sli",
      "security-review",
      "architecture-tradeoffs",
    ],
    brief:
      "Combine Linux, AWS, Terraform, Docker, CI/CD, security, and observability in a small system. “Production-style” describes discipline, not a claim that it serves real customers or meets an SLA.",
    deliverables: [
      "Working source and infrastructure",
      "Architecture decisions and cost model",
      "CI/CD and rollback evidence",
      "Monitoring, incident runbook, recovery rehearsal",
      "Independent review and presentation",
    ],
    rubric: [
      "A clean deployment is reproducible",
      "Identity/network/secrets controls are tested",
      "Monitoring detects a deliberate failure",
      "Rollback and data recovery are rehearsed",
      "A reviewer can explain and reproduce the system",
    ],
    steps: [
      "Write requirements, threat model, and cost boundary.",
      "Implement the smallest system satisfying them.",
      "Prove tests and delivery controls.",
      "Run and document a realistic incident and recovery.",
      "Present a ten-minute walkthrough and respond to independent review.",
    ],
    cost: "Requires an explicit budget and current pricing review before any live AWS build. Atlas does not spend on your behalf.",
  },
];
// This project depends on the container project, represented separately from lesson prerequisites.
projects.find((p) => p.id === "cicd-pipeline")!.lessons = [
  "ci-contract",
  "docker-local",
];
