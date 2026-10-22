export interface Certification {
  id: string;
  name: string;
  code: string;
  cost: string;
  priority: "Optional" | "Recommended" | "High priority";
  timing: string;
  why: string;
  roles: string[];
  prerequisites: string[];
  sections: number[];
  readiness: string[];
  practiceThreshold: string;
  url: string;
  verified: string;
}

export const certificationStrategy =
  "Build evidence before buying an exam. Choose at most one early foundation credential, then one AWS associate credential aligned with target roles. Add Terraform or a specialist exam only when a project and relevant job descriptions justify it. These are alternatives and later options, not a twelve-exam shopping list. Priorities are Atlas curriculum judgments, not measured hiring or salary returns. No certification is required to pass an Atlas career gate.";
export const certificationReadinessNote =
  "Section coverage is preparation, not proof of exam readiness. Readiness checklists and practice thresholds below are Atlas recommendations, not vendor passing scores or pass guarantees. Use legitimate, unseen practice questions; a memorized answer bank is not evidence. Recheck the official objectives, regional price, taxes, ID rules, and exam availability before booking.";

const knowledgeThreshold =
  "Atlas target: at least 85% on two different legitimate timed practice sets, at least 7 days apart; explain each missed answer without AI. Finish the practical checklist as well. This is not the vendor passing score.";

export const certifications: Certification[] = [
  {
    id: "linux-essentials",
    name: "LPI Linux Essentials",
    code: "010-200 (version 2.0)",
    cost: "US reference price: $120 USD; regional pricing and taxes may differ.",
    priority: "Optional",
    timing:
      "Early option after Linux foundations and the migration assessment. Choose this OR LFCA if an early credential helps; skip both if project work is the better use of time.",
    why: "Offers a bounded foundation checkpoint for a new Linux learner. It can support entry support applications, but it does not replace independent service troubleshooting.",
    roles: [
      "IT support technician",
      "Linux support trainee",
      "Junior operations assistant",
    ],
    prerequisites: [
      "No formal exam prerequisite.",
      "Atlas recommendation: use an Ubuntu terminal independently and explain the effect of each command.",
      "Use current 010-200 objectives. Previous 010-160 remains available until April 2027 according to LPI.",
    ],
    sections: [0, 1, 2, 3, 4, 6, 9, 12, 15],
    readiness: [
      "Navigate and inspect files without prompts.",
      "Explain streams, quoting, permissions, users, and groups.",
      "Diagnose a stopped service using process, socket, and log evidence.",
      "Review current objectives for licensing, SSH, cloud, and container gaps.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://www.lpi.org/our-certifications/linux-essentials-overview/",
    verified:
      "2026-10-22 · current version and pricing checked on LPI overview and exam-pricing pages",
  },
  {
    id: "lfca",
    name: "Linux Foundation Certified IT Associate",
    code: "LFCA",
    cost: "$250 USD exam-only list price; verify current checkout, taxes, and regional offers.",
    priority: "Optional",
    timing:
      "Early broad-IT alternative after foundation labs. Do not stack with Linux Essentials solely to collect badges.",
    why: "Combines Linux, basic administration, cloud, security, and development workflow vocabulary. Useful when breadth is the gap; the cost may be better reserved for an AWS associate exam.",
    roles: [
      "IT support trainee",
      "Operations trainee",
      "Cloud support trainee",
    ],
    prerequisites: [
      "No formal exam prerequisite.",
      "Atlas recommendation: complete the Linux troubleshooting project and introductory cloud concepts.",
    ],
    sections: [0, 1, 2, 3, 4, 5, 9, 12, 15, 20],
    readiness: [
      "Explain how an operating system, process, network, and application fit together.",
      "Demonstrate a package, permission, or service repair.",
      "Explain backup, availability, security, and basic cloud cost decisions.",
      "Review project-management and open-source topics in the official domain list.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://training.linuxfoundation.org/certification/certified-it-associate/",
    verified: "2026-10-22 · exam page and exam-only list price checked",
  },
  {
    id: "ccst",
    name: "Cisco Certified Support Technician Networking",
    code: "100-150",
    cost: "$125 USD list price; verify regional taxes and registration price.",
    priority: "Optional",
    timing:
      "After local networking and troubleshooting; choose if support/NOC vacancies emphasize networking. CCST is not a prerequisite for CCNA.",
    why: "A focused networking checkpoint can complement a Linux portfolio. Use the free learning path regardless of whether you buy the exam.",
    roles: [
      "Network support technician",
      "Help desk technician",
      "NOC trainee",
    ],
    prerequisites: [
      "No formal exam prerequisite.",
      "Atlas recommendation: distinguish local addressing, routes, DNS, ports, and application failures.",
    ],
    sections: [3, 4, 8, 17],
    readiness: [
      "Explain IP addressing, network devices, and common protocols.",
      "Distinguish bandwidth from throughput.",
      "Capture a clear network fault diagnosis and escalation note.",
      "Practice device/media and support topics beyond the Linux-only labs.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccst-networking.html",
    verified: "2026-10-22 · exam code and $125 price checked",
  },
  {
    id: "github-foundations",
    name: "GitHub Foundations",
    code: "GH-900",
    cost: "Regional price shown by Microsoft/Pearson VUE at scheduling; a universal USD price was not exposed in the official page reviewed.",
    priority: "Optional",
    timing:
      "After several real pull requests and a readable portfolio repository. Prefer the repository evidence when budget is limited.",
    why: "Provides a vocabulary and collaboration checkpoint for GitHub workflows. A clean commit history, reviewed PR, and reproducible project usually make a stronger Atlas submission than the badge alone.",
    roles: [
      "Junior developer",
      "Cloud support associate",
      "Junior DevOps practitioner",
    ],
    prerequisites: [
      "Atlas recommendation: make local commits and push a branch independently.",
      "Understand issues, pull requests, repository visibility, and basic security.",
    ],
    sections: [5, 13, 15, 20],
    readiness: [
      "Explain working tree, staging area, commits, branches, and remotes.",
      "Open and merge a small pull request and resolve a deliberate conflict.",
      "Use an issue and README to communicate a change.",
      "Review GitHub project, administration, community, and privacy objectives.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/",
    verified:
      "2026-10-22 · current GH-900 study-guide link and regional pricing policy checked",
  },
  {
    id: "cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    code: "CLF-C02",
    cost: "$100 USD base exam price; local taxes and exchange rates may apply.",
    priority: "Recommended",
    timing:
      "Optional first AWS exam after cloud foundations. Skip purchasing it if the concepts are already secure and an associate exam is the better next step.",
    why: "For this beginner pathway, a small cloud vocabulary checkpoint can make later AWS work easier. The exam does not test implementation or troubleshooting, so it cannot establish cloud-support readiness by itself.",
    roles: [
      "Cloud support trainee",
      "Technical customer support associate",
      "Cloud operations coordinator",
    ],
    prerequisites: [
      "No earlier AWS certification is required.",
      "Atlas recommendation: understand shared responsibility, IAM, service categories, and pricing before booking.",
    ],
    sections: [9, 10, 15, 19],
    readiness: [
      "Explain EC2, S3, VPC, IAM, managed databases, and serverless use cases.",
      "Separate AWS responsibilities from customer responsibilities.",
      "Describe MFA, least privilege, basic billing, and cleanup controls.",
      "Explain two documented architecture or service-choice tradeoffs.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    verified: "2026-10-22 · exam page, CLF-C02 guide, and $100 price checked",
  },
  {
    id: "solutions-architect",
    name: "AWS Certified Solutions Architect – Associate",
    code: "SAA-C03",
    cost: "$150 USD base exam price; local taxes and exchange rates may apply.",
    priority: "High priority",
    timing:
      "Primary AWS credential after the core AWS projects and design review. A Month-6 target is conditional on evidence; it is not a booking deadline.",
    why: "The strongest general fit in this catalog for Atlas’s AWS engineering direction: it organizes design choices around security, resilience, performance, and cost. Pair preparation with deployed or reproducible project evidence.",
    roles: [
      "Junior cloud engineer",
      "Cloud support engineer",
      "Infrastructure engineer trainee",
    ],
    prerequisites: [
      "Atlas recommendation: Linux, networking, Git, and practical AWS foundations.",
      "AWS recommends hands-on cloud design experience; an earlier certification alone does not supply that experience.",
    ],
    sections: [8, 9, 10, 14, 15, 19, 20],
    readiness: [
      "Draw a request path across DNS, load balancer, subnets, compute, and storage.",
      "Defend storage and database choices against access, durability, and cost requirements.",
      "Explain failure domains, scaling, backups, and recovery objectives.",
      "Present a secure AWS project with verification, cost assumptions, and teardown instructions.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    verified: "2026-10-22 · SAA-C03 guide and $150 exam price checked",
  },
  {
    id: "cloudops",
    name: "AWS Certified CloudOps Engineer – Associate",
    code: "SOA-C03",
    cost: "$150 USD base exam price; local taxes and exchange rates may apply.",
    priority: "Recommended",
    timing:
      "Operations branch after repeated AWS incident, deployment, recovery, and monitoring exercises. Choose this or SAA first based on roles; taking both immediately is unnecessary.",
    why: "Closely fits the operational work Atlas emphasizes: maintaining workloads, investigating faults, implementing controls, and recovering service. This is the current credential name; older SysOps preparation needs a scope review.",
    roles: [
      "Cloud operations specialist",
      "Cloud support engineer",
      "CloudOps engineer",
    ],
    prerequisites: [
      "AWS targets candidates with roughly a year of hands-on AWS operations experience.",
      "Atlas recommendation: complete monitoring, deployment, security, and recovery projects; review CloudFormation and AWS-specific gaps against the official guide.",
    ],
    sections: [2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 20],
    readiness: [
      "Diagnose an unavailable service from logs, metrics, networking, and IAM evidence.",
      "Automate a repeatable change and demonstrate rollback.",
      "Test a backup restore and record recovery results.",
      "Explain cost, capacity, security, and monitoring tradeoffs in an operations runbook.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://aws.amazon.com/certification/certified-cloudops-engineer-associate/",
    verified:
      "2026-10-22 · current SOA-C03 name, guide, and $150 price checked",
  },
  {
    id: "terraform-associate",
    name: "HashiCorp Certified: Terraform Associate",
    code: "004 · Terraform 1.12",
    cost: "$70.50 USD plus local taxes and fees; free retake not included.",
    priority: "Recommended",
    timing:
      "After a reproducible Terraform project with state handling, reviewable plans, and safe teardown. A complement to engineering evidence, not a substitute.",
    why: "A comparatively small exam expense for a tool used directly in the Atlas infrastructure projects. Its value depends on targeting roles that use Terraform.",
    roles: [
      "Junior cloud engineer",
      "Infrastructure automation trainee",
      "Junior DevOps engineer",
    ],
    prerequisites: [
      "Basic terminal skills and cloud architecture understanding.",
      "Hands-on use of init, fmt, validate, plan, apply, outputs, modules, and state.",
      "Review 004 additions and HCP Terraform; do not rely solely on 003 preparation.",
    ],
    sections: [5, 9, 10, 11, 15, 20],
    readiness: [
      "Explain what the plan changes before applying it.",
      "Separate provider configuration, resource declarations, inputs, and outputs.",
      "Explain state sensitivity, locking, drift, imports, and recovery.",
      "Build a small module, validate its inputs, and describe HCP Terraform features.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://developer.hashicorp.com/certifications/terraform-associate",
    verified:
      "2026-10-22 · version 004, Terraform 1.12, and $70.50 price checked",
  },
  {
    id: "lfcs",
    name: "Linux Foundation Certified System Administrator",
    code: "LFCS",
    cost: "$445 USD exam list price in the official catalog; verify checkout, taxes, and promotions.",
    priority: "Optional",
    timing:
      "Later Linux specialization after independent administration practice. Foundation Atlas labs alone do not cover the whole current exam.",
    why: "A practical administration exam is a useful fit for Linux-focused roles. Choose it when those roles justify the cost, and extend storage, networking, and recovery practice first.",
    roles: [
      "Junior Linux administrator",
      "Linux support engineer",
      "Infrastructure operations technician",
    ],
    prerequisites: [
      "Atlas recommendation: confidently administer disposable Linux systems.",
      "Study the complete current LFCS domains, including storage and advanced administration beyond Atlas foundations.",
    ],
    sections: [1, 2, 3, 4, 6, 8, 15, 20],
    readiness: [
      "Configure and diagnose users, permissions, services, and processes independently.",
      "Recover from a deliberately broken system configuration in a disposable VM.",
      "Practice current networking and storage objectives with command-line evidence.",
      "Use only the permitted documentation and exam environment described by the provider.",
    ],
    practiceThreshold:
      "Atlas target: finish two different timed administration mock labs at least 7 days apart, meeting at least 85% of each rubric without hints. Repeat every failed task. This is not the vendor passing score.",
    url: "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/",
    verified:
      "2026-10-22 · exam page and $445 official catalog listing checked",
  },
  {
    id: "kcna",
    name: "Kubernetes and Cloud Native Associate",
    code: "KCNA",
    cost: "$250 USD exam list price in the official catalog; verify checkout, taxes, and promotions.",
    priority: "Optional",
    timing:
      "After containers and introductory Kubernetes. Skip the purchase if you can already explain the concepts and would benefit more from operating a cluster.",
    why: "A terminology checkpoint for the cloud-native ecosystem, with less operational depth than a hands-on administrator exam. Kubernetes is a later option in Atlas, not an early employability dependency.",
    roles: [
      "Cloud-native support trainee",
      "Platform engineering trainee",
      "Junior DevOps practitioner",
    ],
    prerequisites: [
      "Atlas recommendation: Docker, cloud networking, basic YAML, and a local Kubernetes deployment.",
      "Review the wider cloud-native ecosystem beyond the Atlas Kubernetes introduction.",
    ],
    sections: [9, 12, 13, 14, 16, 19],
    readiness: [
      "Explain how pods, nodes, deployments, and services relate.",
      "Deploy, expose, scale, and inspect a small local application.",
      "Describe containers, orchestration, observability, and application delivery.",
      "Explain what Kubernetes adds and when a simpler service is sufficient.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://training.linuxfoundation.org/certification/kubernetes-cloud-native-associate/",
    verified:
      "2026-10-22 · exam page and $250 official catalog listing checked",
  },
  {
    id: "cka",
    name: "Certified Kubernetes Administrator",
    code: "CKA · confirm current curriculum and Kubernetes version before booking",
    cost: "$445 USD exam list price in the official catalog; verify checkout, taxes, and promotions.",
    priority: "Optional",
    timing:
      "Advanced track after substantial cluster administration practice and a capstone. Do not schedule merely because Month 6 has arrived.",
    why: "A practical operational checkpoint when Kubernetes administration is relevant to target roles. Requires a dedicated extension beyond the introductory Atlas section.",
    roles: [
      "Kubernetes administrator",
      "Platform engineer",
      "Cloud engineer with Kubernetes responsibilities",
    ],
    prerequisites: [
      "Strong Linux, networking, containers, and Kubernetes operations skills.",
      "Complete the current official CKA curriculum, including cluster lifecycle, storage, networking, and troubleshooting.",
    ],
    sections: [2, 4, 8, 12, 14, 15, 16, 20],
    readiness: [
      "Diagnose pending pods, failed readiness checks, image failures, and service connectivity.",
      "Practice cluster administration, configuration, storage, and recovery objectives.",
      "Operate with the provider’s permitted documentation and exam constraints.",
      "Explain and verify recovery after several unfamiliar cluster failures.",
    ],
    practiceThreshold:
      "Atlas target: two distinct timed cluster mock exams at least 7 days apart with at least 85% of the lab rubric met without hints, plus repeat recovery of failed tasks. This is not the vendor passing score.",
    url: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/",
    verified:
      "2026-10-22 · exam page and $445 official catalog listing checked; runtime version intentionally not frozen",
  },
  {
    id: "ccna",
    name: "Cisco Certified Network Associate",
    code: "200-301 CCNA v1.1",
    cost: "$300 USD base exam price; local taxes and registration prices may differ.",
    priority: "Optional",
    timing:
      "Later network specialization if network-support or infrastructure vacancies justify it. Use the useful concepts early without taking the whole exam track.",
    why: "Provides deeper networking structure than the core cloud path needs. Worth considering for network-oriented roles; it should not delay Linux, scripting, AWS, and portfolio practice for general cloud roles.",
    roles: [
      "Network support engineer",
      "Network administrator trainee",
      "NOC technician",
    ],
    prerequisites: [
      "No formal previous certification is required.",
      "Atlas recommendation: reliable subnetting and packet-path troubleshooting.",
      "Complete additional Cisco switching, routing, wireless, security, and automation labs from the full exam objectives.",
    ],
    sections: [3, 8, 15, 19],
    readiness: [
      "Calculate subnets and explain forwarding decisions without hints.",
      "Build and troubleshoot routed and switched networks in an authorized simulator.",
      "Diagnose DNS, addressing, access, and routing failures from evidence.",
      "Review all current Cisco exam domains; Atlas cloud networking is only partial preparation.",
    ],
    practiceThreshold: knowledgeThreshold,
    url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html",
    verified: "2026-10-22 · current 200-301 v1.1 exam and $300 price checked",
  },
];
