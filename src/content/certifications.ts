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
  kind?:
    | "Professional certification"
    | "Skills credential"
    | "Digital badge"
    | "Course certificate";
  trainingCost?: string;
  assessmentCost?: string;
  eligibility?: string;
  learningUrl?: string;
  lessonIds?: string[];
  gaps?: string[];
  assessmentUrl?: string;
  curriculumMilestone?: {
    label: string;
    lessonIds: string[];
    projectIds?: string[];
    extraPreparation: string[];
  };
  freeStatus?:
    | "Free credential"
    | "Free training; paid assessment"
    | "Verify availability/price";
}

export const certificationStrategy =
  "Build engineering evidence and use a free credential first: Cisco for networking, IBM or OCI for cloud foundations, then a relevant practical skills assessment. Choose a small number that close real gaps; this catalogue is a menu. Continue Linux, networking, scripting, Git, security, and project practice throughout. Consider the paid AWS Cloud Practitioner exam only if a specific goal justifies it; later, select SAA or CloudOps when your independent work and target roles support the expense. Terraform and specialist exams remain later options. Priorities are Atlas curriculum judgments, not measured hiring or salary returns. No external credential is required to pass an Atlas career gate.";
export const certificationReadinessNote =
  "The curriculum milestone shows when to begin the final provider preparation and readiness review. Finish its lessons and any listed project verification, close the remaining preparation gaps, and meet the provider rules before deciding to sit the assessment. Atlas completion does not award a provider credential or prove exam readiness. Readiness checklists and practice thresholds are Atlas recommendations, except where an explicit provider rule is identified. Use official learning paths, permitted documentation, and legitimate unseen practice; never exam dumps or leaked tasks. Recheck account eligibility, language, accessibility, assessment availability, regional fees, taxes, and ID rules on the official provider site before starting. Free learning does not authorize paid labs or cloud provisioning.";

const knowledgeThreshold =
  "Atlas target: at least 85% on two different legitimate timed practice sets, at least 7 days apart; explain each missed answer without AI. Finish the practical checklist as well. This is not the vendor passing score.";

export const certifications: Certification[] = [
  {
    id: "cisco-networking-basics",
    curriculumMilestone: {
      label: "After networking foundations and layered troubleshooting",
      lessonIds: [
        "network-addresses",
        "network-dns",
        "network-http",
        "troubleshoot-layers",
      ],
      extraPreparation: [
        "Complete Cisco network-device, media, wireless, and Packet Tracer activities, then meet the comprehensive course assessment criteria.",
      ],
    },
    name: "Cisco Networking Basics",
    code: "Networking Academy learning badge",
    kind: "Digital badge",
    freeStatus: "Free credential",
    cost: "Free self-paced course and assessed learning badge; separate CCST/CCNA certification exams have fees.",
    trainingCost: "Free self-paced Networking Academy course.",
    assessmentCost:
      "Free course assessment for this badge; no professional certification exam included.",
    eligibility:
      "Register with Cisco Networking Academy and meet current course and badge-claim requirements. Verify enrollment and language availability in your account.",
    priority: "Recommended",
    timing:
      "First credential option after networking foundations; complete the provider activities while continuing Linux troubleshooting.",
    why: "A focused first milestone for network-support learning. Pair the shareable badge with your own packet-path and fault-diagnosis evidence.",
    roles: [
      "Help desk trainee",
      "Network support trainee",
      "Cloud support trainee",
    ],
    prerequisites: [
      "Atlas recommendation: complete basic addressing, DNS, and HTTP lessons.",
      "Use the official NetAcad course and its authorized Packet Tracer activities.",
    ],
    sections: [3, 4, 8],
    lessonIds: [
      "network-addresses",
      "network-dns",
      "network-http",
      "troubleshoot-layers",
      "cloud-packet",
    ],
    readiness: [
      "Trace a local request through address, route, DNS, port, and HTTP checks without AI hints.",
      "Explain a network fault and justify the next diagnostic test.",
      "Finish the official course, its activities, and its comprehensive assessment.",
    ],
    gaps: [
      "Add network media, device roles, wireless/home network setup, and Packet Tracer activities from Cisco; Atlas concentrates on host and cloud troubleshooting.",
    ],
    practiceThreshold:
      "Atlas target: diagnose two unfamiliar addressing or DNS faults and explain the packet path without hints. Cisco lists 70% on its comprehensive course exam as the badge earning rule; that is separate from Atlas readiness.",
    url: "https://www.credly.com/org/cisco/badge/networking-basics",
    learningUrl: "https://www.netacad.com/courses/networking-basics",
    assessmentUrl: "https://www.netacad.com/courses/networking-basics",
    verified:
      "2026-10-23 · Cisco course catalogue and Cisco-issued Credly badge criteria checked; actual account enrollment not tested",
  },
  {
    id: "ibm-cloud-fundamentals",
    curriculumMilestone: {
      label: "After cloud foundations and basic access control",
      lessonIds: ["web-foundations", "linux-permissions", "cloud-model"],
      extraPreparation: [
        "Finish IBM virtualization, cloud-service, security, and container material plus its quizzes, final assessments, and simulations.",
      ],
    },
    name: "IBM SkillsBuild Cloud Computing Fundamentals",
    code: "Cloud Computing Fundamentals",
    kind: "Digital badge",
    freeStatus: "Free credential",
    cost: "Free learning credential; course quizzes, final assessments, and simulations required.",
    trainingCost: "Free SkillsBuild learning path.",
    assessmentCost: "Free credential assessments within the prescribed path.",
    eligibility:
      "Available to registered SkillsBuild users. IBM lists all learners; the adult route is age 18+, with a separate high-school student/educator route. Use the appropriate account route.",
    priority: "Recommended",
    timing:
      "Choose this OR OCI Foundations for an initial cloud vocabulary milestone; do not collect both just to increase badge count.",
    why: "A provider-neutral cloud learning checkpoint that connects service models, containers, and security to later engineering work.",
    roles: [
      "Cloud support trainee",
      "IT support trainee",
      "Cloud operations trainee",
    ],
    prerequisites: [
      "Atlas recommendation: understand how a web request reaches a service.",
      "Register on the appropriate official IBM SkillsBuild learning route.",
    ],
    sections: [0, 9, 12, 15],
    lessonIds: [
      "web-foundations",
      "cloud-model",
      "database-sql",
      "docker-local",
      "security-review",
    ],
    readiness: [
      "Explain IaaS, PaaS, and SaaS using a concrete workload.",
      "Explain a container boundary and shared responsibility without prompts.",
      "Complete IBM quizzes, final assessments, and practice simulations through SkillsBuild.",
    ],
    gaps: [
      "Complete IBM-specific simulations and virtualization/orchestration topics; Atlas local work does not automatically satisfy the provider path.",
      "This conceptual learning badge does not prove independent cloud deployment or incident handling.",
    ],
    practiceThreshold:
      "Atlas target: explain two different workload choices and defend a security/responsibility boundary without AI, then satisfy the provider earning criteria. No provider passing percentage was verified.",
    url: "https://www.credly.com/org/ibm-skillsbuild/badge/cloud-computing-fundamentals",
    learningUrl:
      "https://skills.yourlearning.ibm.com/activity/PLAN-2EC3A305F2C3",
    assessmentUrl: "https://skillsbuild.org/digital-credentials",
    verified:
      "2026-10-23 · IBM digital-credential catalogue and IBM-issued Credly criteria checked; signed-in learning access not tested",
  },
  {
    id: "oci-foundations",
    curriculumMilestone: {
      label: "After cloud foundations, packet paths, and the AWS service plan",
      lessonIds: ["cloud-packet", "cloud-model", "aws-plan"],
      extraPreparation: [
        "Study the current OCI identity, networking, compute, storage, security, pricing, and support objectives; complete Oracle practice preparation.",
      ],
    },
    name: "Oracle Cloud Infrastructure Foundations Associate",
    code: "1Z0-1085-26 · confirm current exam in MyLearn",
    kind: "Professional certification",
    freeStatus: "Free credential",
    cost: "Free course and certification under Oracle’s current Foundations policy; confirm the selected exam is still free before launching.",
    trainingCost: "Free official Foundations learning path.",
    assessmentCost:
      "Free Foundations certification exam under the current Oracle policy.",
    eligibility:
      "Oracle MyLearn sign-in required. Oracle describes Foundations as entry level with no prior technical background; confirm current registration, identity, language, and regional requirements.",
    priority: "Recommended",
    timing:
      "Alternative to IBM for a first cloud credential after cloud foundations. Keep AWS-specific practice alongside it when AWS remains the career target.",
    why: "A free formal cloud foundation checkpoint with a clear next step into OCI architecture if relevant to your target work.",
    roles: ["Cloud support trainee", "Infrastructure support trainee"],
    prerequisites: [
      "Atlas recommendation: cloud responsibility, networks, identity, storage, and cost basics.",
      "Review Oracle’s current exam topics and preparation modules in MyLearn.",
    ],
    sections: [8, 9, 10, 15, 19],
    lessonIds: [
      "cloud-packet",
      "cloud-model",
      "aws-plan",
      "security-review",
      "architecture-tradeoffs",
    ],
    readiness: [
      "Compare cloud service models and explain a responsibility boundary.",
      "Draw a provider-neutral network/compute/storage design.",
      "Translate AWS examples to OCI identity, network, compute, storage, security, and cost terms using Oracle documentation.",
    ],
    gaps: [
      "Atlas teaches AWS examples. Complete OCI-specific service, identity, networking, security, pricing, and support objectives in the official path.",
    ],
    practiceThreshold:
      "Atlas target: explain the mapped concepts without AI and complete the official preparation and practice assessment. Recheck the current provider exam requirements; no raw passing percentage is asserted here.",
    url: "https://www.oracle.com/education/certification/",
    learningUrl:
      "https://mylearn.oracle.com/ou/learning-path/-become-an-oci-foundations-associate-2026/163541",
    assessmentUrl:
      "https://mylearn.oracle.com/ou/learning-path/-become-an-oci-foundations-associate-2026/163541",
    verified:
      "2026-10-23 · Oracle University 2026 policy and official indexed learning path checked; signed-in exam launch not tested",
  },
  {
    id: "oci-architect-associate",
    curriculumMilestone: {
      label:
        "After architecture, recovery, security, and the resilient AWS project",
      lessonIds: [
        "aws-availability",
        "reliability-incident",
        "security-threat-model",
        "architecture-tradeoffs",
      ],
      projectIds: ["aws-ha"],
      extraPreparation: [
        "Complete OCI-specific architecture exercises and the entire current exam topic list; use Oracle practice results to close remaining gaps.",
      ],
    },
    name: "Oracle Cloud Infrastructure Architect Associate",
    code: "1Z0-1072-26 · confirm current exam in MyLearn",
    kind: "Professional certification",
    freeStatus: "Free credential",
    cost: "Oracle announced the course and certification are free in August 2026; confirm the current selected exam before launching.",
    trainingCost:
      "Free OCI Architect Associate course under the August 2026 policy.",
    assessmentCost:
      "Free OCI Architect Associate certification under that current policy; no paid Professional exam included.",
    eligibility:
      "Oracle MyLearn sign-in required. Check current exam registration, delivery, identity, language, and regional rules; no signed-in eligibility check was performed.",
    priority: "Optional",
    timing:
      "After cloud foundations, network/security work, and a design review. A useful no-fee architecture branch when OCI fits your goals; avoid diverting from AWS engineering solely for another title.",
    why: "Provides an architecture assessment option without the current AWS associate exam fee. Engineering competence still needs independent design, troubleshooting, and recovery work.",
    roles: ["Cloud engineer trainee", "Infrastructure engineer trainee"],
    prerequisites: [
      "Atlas recommendation: complete cloud networking, security, availability, and architecture work first.",
      "Complete the OCI-specific official learning and practice path; a foundation badge alone is insufficient preparation.",
    ],
    sections: [8, 9, 10, 14, 15, 19],
    lessonIds: [
      "cloud-packet",
      "cloud-model",
      "aws-plan",
      "aws-availability",
      "reliability-incident",
      "security-threat-model",
      "architecture-tradeoffs",
    ],
    readiness: [
      "Defend an architecture against a zone failure, permission denial, and recovery requirement.",
      "Compare storage and network choices against workload requirements.",
      "Review an OCI design using official service constraints and explain how it differs from your AWS design.",
    ],
    gaps: [
      "Complete the entire OCI exam topic list and OCI-specific design exercises; AWS familiarity does not establish OCI service knowledge.",
      "Confirm lab access terms separately before using a personal cloud account or provisioning resources.",
    ],
    practiceThreshold:
      "Atlas target: complete two independent architecture reviews and explain unfamiliar failures without AI. Use the official practice exam to find gaps; no pass guarantee or provider raw passing percentage is asserted.",
    url: "https://blogs.oracle.com/oracleuniversity/oci-certification-learning-paths-and-exams-2026-updates-now-available",
    learningUrl:
      "https://mylearn.oracle.com/ou/learning-path/become-an-oci-architect-associate/162234",
    assessmentUrl:
      "https://mylearn.oracle.com/ou/learning-path/become-an-oci-architect-associate/162234",
    verified:
      "2026-10-23 · Oracle University August 10 2026 announcement and current indexed learning path checked; account launch not tested",
  },
  {
    id: "microsoft-azure-management",
    curriculumMilestone: {
      label: "After cloud planning, network boundaries, and security review",
      lessonIds: ["cloud-packet", "aws-plan", "security-review"],
      extraPreparation: [
        "Complete the current Azure learning path and practice resource tags/locks, NSGs, virtual machines/disks, and storage access; verify the assessment terms and fee.",
      ],
    },
    name: "Microsoft Applied Skills: Get started with Azure management tasks",
    code: "APL-0100 study guide",
    kind: "Skills credential",
    freeStatus: "Verify availability/price",
    cost: "Free Microsoft Learn preparation. Current assessment fee was not stated on the credential page checked; verify availability and any fee before launch.",
    trainingCost:
      "Free self-paced Microsoft Learn resources; optional instructor-led training or personal Azure practice can cost extra.",
    assessmentCost:
      "Current fee not exposed in the official credential page reviewed; verify in the provider launch flow. Do not buy AZ-900 or AZ-104 for this credential.",
    eligibility:
      "Microsoft Learn profile and compatible browser/connectivity required. Familiarity with Azure services is expected. The assessment uses a supplied virtual environment; re-launch has a 72-hour wait.",
    priority: "Optional",
    timing:
      "After cloud/network/security basics if Azure operations is relevant. This is a specific practical branch, with additional Azure preparation required.",
    why: "Checks basic resource administration in a task-based lab and can extend cloud operations practice beyond vocabulary.",
    roles: ["Cloud support trainee", "Azure support trainee"],
    prerequisites: [
      "Complete the linked official APL-0100 study guide and supporting Azure resource-management learning.",
      "Review Microsoft’s assessment connectivity check, permitted tools, and candidate agreement.",
    ],
    sections: [8, 9, 10, 15],
    lessonIds: [
      "cloud-packet",
      "cloud-model",
      "aws-plan",
      "linux-resources",
      "security-review",
    ],
    readiness: [
      "Explain resource inventory, network boundaries, storage access, and cost/permission consequences.",
      "Practice the current Azure subscription, network, VM, and storage tasks using authorized learning resources.",
      "Complete an unfamiliar provider practice scenario without AI hints before launching the assessment.",
    ],
    gaps: [
      "Atlas’s AWS design lessons do not teach Azure Portal administration. Add resource tags/locks, NSGs, VM settings/disks, and Azure storage access exercises from the current study guide.",
      "A supplied assessment lab does not make personal Azure subscriptions or practice deployments free.",
    ],
    practiceThreshold:
      "Atlas target: independently complete two different practice scenarios covering the current task list. The provider uses lab scoring; Atlas does not invent a required raw percentage.",
    url: "https://learn.microsoft.com/en-us/credentials/applied-skills/get-started-with-azure-management-tasks/",
    learningUrl:
      "https://learn.microsoft.com/en-us/credentials/applied-skills/resources/study-guides/apl-0100",
    assessmentUrl:
      "https://learn.microsoft.com/en-us/credentials/applied-skills/get-started-with-azure-management-tasks/",
    verified:
      "2026-10-23 · current credential, June 2026 study guide, and assessment FAQ checked; signed-in fee/availability unverified",
  },
  {
    id: "aws-cloud-essentials-badge",
    curriculumMilestone: {
      label: "After cloud foundations and the AWS service plan",
      lessonIds: ["cloud-model", "aws-plan"],
      extraPreparation: [
        "Complete the official Cloud Essentials path, AWS pricing/support topics, and associated knowledge assessment; confirm the selected badge route remains free.",
      ],
    },
    name: "AWS Knowledge: Cloud Essentials",
    code: "Skill Builder training badge",
    kind: "Digital badge",
    freeStatus: "Free credential",
    cost: "Free knowledge-badge route; optional premium labs or subscriptions are separate. This does not award AWS Certified Cloud Practitioner.",
    trainingCost:
      "AWS identifies Cloud Essentials as a free readiness path. Confirm the free path/assessment; optional paid lab products are separate.",
    assessmentCost:
      "Free training-badge assessment route; badge claim through Credly is free.",
    eligibility:
      "Free AWS Skill Builder account and provider earning criteria apply; Credly is used to claim the badge. Verify current path access and language before enrolling.",
    priority: "Recommended",
    timing:
      "First AWS-specific checkpoint after cloud basics, before deciding whether paying for CLF-C02 would serve a concrete goal.",
    why: "A focused checkpoint for AWS service vocabulary when paired with the Atlas design and security evidence.",
    roles: ["Cloud support trainee", "AWS operations trainee"],
    prerequisites: [
      "Atlas recommendation: understand shared responsibility, identity, cloud service models, and basic cost controls.",
      "Use the provider’s Cloud Essentials readiness path and assessment.",
    ],
    sections: [9, 10, 15, 19],
    lessonIds: [
      "cloud-model",
      "aws-plan",
      "aws-availability",
      "aws-operations",
      "security-review",
      "architecture-tradeoffs",
    ],
    readiness: [
      "Explain an AWS compute, storage, networking, and database choice.",
      "Distinguish customer security responsibilities from AWS responsibilities.",
      "Describe how you would investigate costs and clean up an authorized practice environment.",
    ],
    gaps: [
      "Review AWS pricing/support and service breadth in the official path. A knowledge assessment does not verify implementation or incident recovery.",
    ],
    practiceThreshold:
      "Atlas target: explain missed practice answers without AI and finish the practical checklist. AWS’s general knowledge-badge process lists at least 80% on the associated assessment; check current badge criteria.",
    url: "https://www.credly.com/org/amazon-web-services/badge/aws-knowledge-cloud-essentials-training-badge",
    learningUrl:
      "https://skillbuilder.aws/learning-plan/XKS3J4FAS7/cloud-essentials--knowledge-badge-readiness-path--includes-labs/Y4YASRJEVX",
    assessmentUrl:
      "https://skillbuilder.aws/learning-plan/XKS3J4FAS7/cloud-essentials--knowledge-badge-readiness-path--includes-labs/Y4YASRJEVX",
    verified:
      "2026-10-23 · AWS training-badge rules, official Cloud Essentials path announcement, and AWS-issued Credly criteria checked; signed-in path not tested",
  },
  {
    id: "aws-serverless-demonstrated",
    curriculumMilestone: {
      label:
        "After API scripting, AWS operations, observability, and threat modeling",
      lessonIds: [
        "python-http-api",
        "aws-operations",
        "observability-signals",
        "security-threat-model",
      ],
      extraPreparation: [
        "Practice Lambda permissions, API Gateway integration, Step Functions failures/retries, and DynamoDB behavior in authorized environments before the hands-on assessment.",
      ],
    },
    name: "AWS Serverless Demonstrated",
    code: "AWS hands-on microcredential",
    kind: "Skills credential",
    freeStatus: "Free credential",
    cost: "Free microcredential assessment; AWS announced no Skill Builder subscription is required. Separate practice products may have fees.",
    trainingCost:
      "Free AWS documentation and digital resources available; optional paid courses/labs are separate.",
    assessmentCost:
      "Free under AWS’s April 23 2026 microcredential policy; supplied assessment environment.",
    eligibility:
      "AWS Skill Builder account required. AWS says availability follows countries where Skill Builder is offered; verify current launch, language, system, and assessment rules.",
    priority: "Optional",
    timing:
      "Later practical extension after AWS fundamentals, scripting, APIs, observability, and security. Complete dedicated serverless learning first.",
    why: "A useful practical checkpoint for implementation and troubleshooting that complements later architecture study.",
    roles: [
      "Cloud engineer trainee",
      "Serverless developer trainee",
      "Cloud support trainee",
    ],
    prerequisites: [
      "Atlas recommendation: Python/API error handling, permission reasoning, request tracing, and incident investigation.",
      "Complete additional Lambda, API Gateway, Step Functions, and DynamoDB preparation from AWS; core Atlas coverage is partial.",
    ],
    sections: [7, 10, 14, 15, 19],
    lessonIds: [
      "python-http-api",
      "python-testing",
      "aws-operations",
      "observability-signals",
      "security-threat-model",
      "architecture-tradeoffs",
    ],
    readiness: [
      "Explain a failing API request using logs, permissions, and service boundaries.",
      "Design safe retries and describe idempotency for repeated work.",
      "Practice serverless implementation and recovery in authorized provider learning environments before the assessment.",
    ],
    gaps: [
      "Add Lambda execution/permissions, API Gateway integration, Step Functions error handling, and DynamoDB behavior; the Atlas mappings teach prerequisite reasoning only.",
    ],
    practiceThreshold:
      "Atlas target: independently diagnose two unfamiliar serverless failures using permitted documentation. Follow the provider’s hands-on scoring and integrity rules; no raw passing score was verified.",
    url: "https://aws.amazon.com/blogs/training-and-certification/microcredentials-from-aws-are-now-free-heres-why-that-matters/",
    learningUrl:
      "https://skillbuilder.aws/learn/XV3B4RGA8Q/aws-serverless-demonstrated/BYD5SH8R5C",
    assessmentUrl:
      "https://skillbuilder.aws/learn/XV3B4RGA8Q/aws-serverless-demonstrated/BYD5SH8R5C",
    verified:
      "2026-10-23 · AWS April 23 2026 free-microcredential announcement and linked assessment checked; signed-in launch not tested",
  },
  {
    id: "cisco-linux-unhatched",
    name: "Cisco / NDG Linux Unhatched",
    kind: "Digital badge",
    freeStatus: "Free credential",
    code: "Networking Academy assessed learning badge",
    cost: "Free self-paced course, course assessment, and learning badge; no separate professional certification exam included.",
    trainingCost: "Free official self-paced Networking Academy course.",
    assessmentCost: "No fee for this course assessment and learning badge.",
    eligibility:
      "Use a Cisco Networking Academy account and the current self-paced course. Complete its learning and badge requirements; verify language, age/account terms, and enrollment availability.",
    priority: "Optional",
    verified:
      "2026-10-23 · official NetAcad/supplier pricing and Cisco-issued badge assessment criteria checked; account enrollment not tested",
    timing:
      "After terminal navigation, file handling, permissions, and Bash values; finish the official course and remaining topic practice before its assessment.",
    why: "An assessed, no-fee first Linux checkpoint before deciding whether a paid Linux exam serves your goals.",
    roles: ["IT support trainee", "Cloud support trainee"],
    prerequisites: [
      "Atlas milestones are preparation recommendations, not Cisco admission requirements.",
      "Follow the official course sequence and enrollment requirements.",
    ],
    sections: [1, 2, 6],
    lessonIds: [
      "terminal-map",
      "terminal-files",
      "terminal-streams",
      "linux-permissions",
      "bash-values",
    ],
    curriculumMilestone: {
      label:
        "After terminal navigation, file handling, permissions, and Bash values",
      lessonIds: [
        "terminal-map",
        "terminal-files",
        "terminal-streams",
        "linux-permissions",
        "bash-values",
      ],
      extraPreparation: [
        "Finish NDG/Cisco command, editor, process, ownership, and simple-script activities in the official browser-based lab. This badge does not award LPI Linux Essentials.",
      ],
    },
    readiness: [
      "Navigate with absolute and relative paths and preserve quoted values.",
      "Create and inspect disposable files, explain permissions, and complete the comprehensive course exam.",
    ],
    gaps: [
      "Finish NDG/Cisco command, editor, process, ownership, and simple-script activities in the official browser-based lab. This badge does not award LPI Linux Essentials.",
    ],
    practiceThreshold:
      "Atlas target: solve two unfamiliar mapped tasks and explain your choices without AI, then satisfy the provider comprehensive assessment. No provider passing percentage was verified.",
    url: "https://www.credly.com/org/cisco/badge/linux-unhatched",
    learningUrl: "https://www.netacad.com/courses/linux-unhatched",
    assessmentUrl: "https://www.netacad.com/courses/linux-unhatched",
  },
  {
    id: "cisco-intro-cybersecurity",
    name: "Cisco Introduction to Cybersecurity",
    kind: "Digital badge",
    freeStatus: "Free credential",
    code: "Networking Academy assessed learning badge",
    cost: "Free self-paced course, course assessment, and learning badge; no separate professional certification exam included.",
    trainingCost: "Free official self-paced Networking Academy course.",
    assessmentCost: "No fee for this course assessment and learning badge.",
    eligibility:
      "Use a Cisco Networking Academy account and the current self-paced course. Complete its learning and badge requirements; verify language, age/account terms, and enrollment availability.",
    priority: "Optional",
    verified:
      "2026-10-23 · official NetAcad/supplier pricing and Cisco-issued badge assessment criteria checked; account enrollment not tested",
    timing:
      "After web foundations, permissions, and HTTP basics; finish the official course and remaining topic practice before its assessment.",
    why: "A short assessed introduction to threats and protective controls that can accompany early support learning.",
    roles: ["IT support trainee", "Cloud support trainee"],
    prerequisites: [
      "Atlas milestones are preparation recommendations, not Cisco admission requirements.",
      "Follow the official course sequence and enrollment requirements.",
    ],
    sections: [0, 2, 3, 15],
    lessonIds: ["web-foundations", "linux-permissions", "network-http"],
    curriculumMilestone: {
      label: "After web foundations, permissions, and HTTP basics",
      lessonIds: ["web-foundations", "linux-permissions", "network-http"],
      extraPreparation: [
        "Complete Cisco personal-data, social-engineering, organizational-defense, and legal/ethical material before the final exam; Atlas early lessons supply technical context.",
      ],
    },
    readiness: [
      "Explain a threat, vulnerability, and protective control using a concrete example.",
      "Complete the official activities and pass its comprehensive final exam.",
    ],
    gaps: [
      "Complete Cisco personal-data, social-engineering, organizational-defense, and legal/ethical material before the final exam; Atlas early lessons supply technical context.",
    ],
    practiceThreshold:
      "Atlas target: solve two unfamiliar mapped tasks and explain your choices without AI, then satisfy the provider comprehensive assessment. No provider passing percentage was verified.",
    url: "https://www.credly.com/org/cisco/badge/introduction-to-cybersecurity",
    learningUrl:
      "https://www.netacad.com/courses/introduction-to-cybersecurity",
    assessmentUrl:
      "https://www.netacad.com/courses/introduction-to-cybersecurity",
  },
  {
    id: "cisco-python-essentials-1",
    name: "Cisco / OpenEDG Python Essentials 1",
    kind: "Digital badge",
    freeStatus: "Free credential",
    code: "Networking Academy assessed learning badge",
    cost: "Free self-paced course, course assessment, and learning badge; no separate professional certification exam included.",
    trainingCost: "Free official self-paced Networking Academy course.",
    assessmentCost: "No fee for this course assessment and learning badge.",
    eligibility:
      "Use a Cisco Networking Academy account and the current self-paced course. Complete its learning and badge requirements; verify language, age/account terms, and enrollment availability.",
    priority: "Optional",
    verified:
      "2026-10-23 · official NetAcad/supplier pricing and Cisco-issued badge assessment criteria checked; account enrollment not tested",
    timing:
      "After Python data, file handling, and testing foundations; finish the official course and remaining topic practice before its assessment.",
    why: "An assessed programming foundation that supports later inventory and automation tools.",
    roles: ["Infrastructure automation trainee", "Cloud support trainee"],
    prerequisites: [
      "Atlas milestones are preparation recommendations, not Cisco admission requirements.",
      "Follow the official course sequence and enrollment requirements.",
    ],
    sections: [1, 7],
    lessonIds: [
      "editor-workflow",
      "python-data",
      "python-files-json",
      "python-testing",
    ],
    curriculumMilestone: {
      label: "After Python data, file handling, and testing foundations",
      lessonIds: [
        "editor-workflow",
        "python-data",
        "python-files-json",
        "python-testing",
      ],
      extraPreparation: [
        "Complete provider exercises for operators, control flow, functions, collections, and exception handling; the separate PCEP certification exam is not included.",
      ],
    },
    readiness: [
      "Write and explain a small program with decisions, loops, functions, and collections.",
      "Repair an unfamiliar input/logic error and pass the comprehensive course test.",
    ],
    gaps: [
      "Complete provider exercises for operators, control flow, functions, collections, and exception handling; the separate PCEP certification exam is not included.",
    ],
    practiceThreshold:
      "Atlas target: solve two unfamiliar mapped tasks and explain your choices without AI, then satisfy the provider comprehensive assessment. No provider passing percentage was verified.",
    url: "https://www.credly.com/org/cisco/badge/python-essentials-1.1",
    learningUrl: "https://www.netacad.com/courses/python-essentials-1",
    assessmentUrl: "https://www.netacad.com/courses/python-essentials-1",
  },
  {
    id: "cisco-python-essentials-2",
    name: "Cisco / OpenEDG Python Essentials 2",
    kind: "Digital badge",
    freeStatus: "Free credential",
    code: "Networking Academy assessed learning badge",
    cost: "Free self-paced course, course assessment, and learning badge; no separate professional certification exam included.",
    trainingCost: "Free official self-paced Networking Academy course.",
    assessmentCost: "No fee for this course assessment and learning badge.",
    eligibility:
      "Use a Cisco Networking Academy account and the current self-paced course. Complete its learning and badge requirements; verify language, age/account terms, and enrollment availability.",
    priority: "Optional",
    verified:
      "2026-10-23 · official NetAcad/supplier pricing and Cisco-issued badge assessment criteria checked; account enrollment not tested",
    timing:
      "After the Python CLI and HTTP API lessons, plus intermediate Python study; finish the official course and remaining topic practice before its assessment.",
    why: "An optional intermediate programming branch for learners who need reusable Python automation.",
    roles: ["Infrastructure automation trainee", "Cloud support trainee"],
    prerequisites: [
      "Atlas milestones are preparation recommendations, not Cisco admission requirements.",
      "Follow the official course sequence and enrollment requirements.",
    ],
    sections: [7],
    lessonIds: [
      "python-files-json",
      "python-testing",
      "python-cli",
      "python-http-api",
    ],
    curriculumMilestone: {
      label:
        "After the Python CLI and HTTP API lessons, plus intermediate Python study",
      lessonIds: [
        "python-files-json",
        "python-testing",
        "python-cli",
        "python-http-api",
      ],
      extraPreparation: [
        "Finish Python Essentials 1 or equivalent, then study modules/packages, OOP, inheritance, iterators/generators, strings, and exceptions in the provider course. The separate PCAP exam has its own terms and fees.",
      ],
    },
    readiness: [
      "Explain module imports, exception boundaries, and file processing in your code.",
      "Complete intermediate OOP and generator exercises absent from Atlas, then pass the comprehensive test.",
    ],
    gaps: [
      "Finish Python Essentials 1 or equivalent, then study modules/packages, OOP, inheritance, iterators/generators, strings, and exceptions in the provider course. The separate PCAP exam has its own terms and fees.",
    ],
    practiceThreshold:
      "Atlas target: solve two unfamiliar mapped tasks and explain your choices without AI, then satisfy the provider comprehensive assessment. No provider passing percentage was verified.",
    url: "https://www.credly.com/org/cisco/badge/python-essentials-2",
    learningUrl: "https://www.netacad.com/courses/python-essentials-2",
    assessmentUrl: "https://www.netacad.com/courses/python-essentials-2",
  },
  {
    id: "cisco-networking-devices",
    name: "Cisco Networking Devices and Initial Configuration",
    kind: "Digital badge",
    freeStatus: "Free credential",
    code: "Networking Academy assessed learning badge",
    cost: "Free self-paced course, course assessment, and learning badge; no separate professional certification exam included.",
    trainingCost: "Free official self-paced Networking Academy course.",
    assessmentCost: "No fee for this course assessment and learning badge.",
    eligibility:
      "Use a Cisco Networking Academy account and the current self-paced course. Complete its learning and badge requirements; verify language, age/account terms, and enrollment availability.",
    priority: "Optional",
    verified:
      "2026-10-23 · official NetAcad/supplier pricing and Cisco-issued badge assessment criteria checked; account enrollment not tested",
    timing:
      "After addressing, DNS, subnetting, and cloud concepts; finish the official course and remaining topic practice before its assessment.",
    why: "Extends host troubleshooting into device configuration and a small simulated network.",
    roles: ["IT support trainee", "Cloud support trainee"],
    prerequisites: [
      "Atlas milestones are preparation recommendations, not Cisco admission requirements.",
      "Follow the official course sequence and enrollment requirements.",
    ],
    sections: [3, 8, 9],
    lessonIds: [
      "network-addresses",
      "network-dns",
      "network-cidr",
      "cloud-model",
    ],
    curriculumMilestone: {
      label: "After addressing, DNS, subnetting, and cloud concepts",
      lessonIds: [
        "network-addresses",
        "network-dns",
        "network-cidr",
        "cloud-model",
      ],
      extraPreparation: [
        "Add Cisco IOS configuration, ARP, DHCP, Ethernet, binary addressing, and the official Packet Tracer activities. Follow Cisco Networking Basics first if these concepts are new.",
      ],
    },
    readiness: [
      "Calculate an addressing plan and explain a device-to-device packet path.",
      "Configure and diagnose a small network using the official simulator activities.",
    ],
    gaps: [
      "Add Cisco IOS configuration, ARP, DHCP, Ethernet, binary addressing, and the official Packet Tracer activities. Follow Cisco Networking Basics first if these concepts are new.",
    ],
    practiceThreshold:
      "Cisco badge earning rule: 70% on its comprehensive course exam. Atlas target: explain and solve two unfamiliar mapped tasks without hints; this is separate from the vendor score.",
    url: "https://www.credly.com/org/cisco/badge/networking-devices-and-initial-configuration",
    learningUrl:
      "https://www.netacad.com/courses/networking-devices-and-initial-configuration",
    assessmentUrl:
      "https://www.netacad.com/courses/networking-devices-and-initial-configuration",
  },
  {
    id: "cisco-network-addressing",
    name: "Cisco Network Addressing and Basic Troubleshooting",
    kind: "Digital badge",
    freeStatus: "Free credential",
    code: "Networking Academy assessed learning badge",
    cost: "Free self-paced course, course assessment, and learning badge; no separate professional certification exam included.",
    trainingCost: "Free official self-paced Networking Academy course.",
    assessmentCost: "No fee for this course assessment and learning badge.",
    eligibility:
      "Use a Cisco Networking Academy account and the current self-paced course. Complete its learning and badge requirements; verify language, age/account terms, and enrollment availability.",
    priority: "Optional",
    verified:
      "2026-10-23 · official NetAcad/supplier pricing and Cisco-issued badge assessment criteria checked; account enrollment not tested",
    timing:
      "After networking foundations, subnetting, and layered troubleshooting; finish the official course and remaining topic practice before its assessment.",
    why: "Adds assessed IPv6 and link-layer troubleshooting breadth before considering a paid networking exam.",
    roles: ["IT support trainee", "Cloud support trainee"],
    prerequisites: [
      "Atlas milestones are preparation recommendations, not Cisco admission requirements.",
      "Follow the official course sequence and enrollment requirements.",
    ],
    sections: [3, 4, 8],
    lessonIds: [
      "network-addresses",
      "network-dns",
      "troubleshoot-layers",
      "network-cidr",
    ],
    curriculumMilestone: {
      label:
        "After networking foundations, subnetting, and layered troubleshooting",
      lessonIds: [
        "network-addresses",
        "network-dns",
        "troubleshoot-layers",
        "network-cidr",
      ],
      extraPreparation: [
        "Complete provider IPv6 addressing/neighbor discovery, physical/data-link concepts, cabling, and Packet Tracer troubleshooting. Atlas subnet labs concentrate on IPv4.",
      ],
    },
    readiness: [
      "Explain why a failed request needs a link, route, address, or DNS check next.",
      "Complete the provider IPv6 and unfamiliar simulator-fault activities.",
    ],
    gaps: [
      "Complete provider IPv6 addressing/neighbor discovery, physical/data-link concepts, cabling, and Packet Tracer troubleshooting. Atlas subnet labs concentrate on IPv4.",
    ],
    practiceThreshold:
      "Cisco badge earning rule: 70% on its comprehensive course exam. Atlas target: explain and solve two unfamiliar mapped tasks without hints; this is separate from the vendor score.",
    url: "https://www.credly.com/org/cisco/badge/network-addressing-and-basic-troubleshooting",
    learningUrl:
      "https://www.netacad.com/courses/network-addressing-and-basic-troubleshooting",
    assessmentUrl:
      "https://www.netacad.com/courses/network-addressing-and-basic-troubleshooting",
  },
  {
    id: "cisco-network-support-security",
    name: "Cisco Network Support and Security",
    kind: "Digital badge",
    freeStatus: "Free credential",
    code: "Networking Academy assessed learning badge",
    cost: "Free self-paced course, course assessment, and learning badge; no separate professional certification exam included.",
    trainingCost: "Free official self-paced Networking Academy course.",
    assessmentCost: "No fee for this course assessment and learning badge.",
    eligibility:
      "Use a Cisco Networking Academy account and the current self-paced course. Complete its learning and badge requirements; verify language, age/account terms, and enrollment availability.",
    priority: "Optional",
    verified:
      "2026-10-23 · official NetAcad/supplier pricing and Cisco-issued badge assessment criteria checked; account enrollment not tested",
    timing:
      "After network troubleshooting and the cloud security review; finish the official course and remaining topic practice before its assessment.",
    why: "An assessed support branch focused on endpoint diagnosis, user support, and clear escalation records.",
    roles: ["IT support trainee", "Cloud support trainee"],
    prerequisites: [
      "Atlas milestones are preparation recommendations, not Cisco admission requirements.",
      "Follow the official course sequence and enrollment requirements.",
    ],
    sections: [3, 4, 15, 17],
    lessonIds: [
      "network-addresses",
      "network-dns",
      "troubleshoot-layers",
      "security-review",
    ],
    curriculumMilestone: {
      label: "After network troubleshooting and the cloud security review",
      lessonIds: [
        "network-addresses",
        "network-dns",
        "troubleshoot-layers",
        "security-review",
      ],
      extraPreparation: [
        "Follow the preceding Cisco networking courses or equivalent skills. Add endpoint/remote-support workflows, help-desk documentation, and official simulator activities; Atlas focuses on Linux/cloud systems.",
      ],
    },
    readiness: [
      "Write a fault record containing symptoms, tests, findings, and an appropriate escalation.",
      "Diagnose an unfamiliar endpoint/network scenario and finish the provider labs.",
    ],
    gaps: [
      "Follow the preceding Cisco networking courses or equivalent skills. Add endpoint/remote-support workflows, help-desk documentation, and official simulator activities; Atlas focuses on Linux/cloud systems.",
    ],
    practiceThreshold:
      "Cisco badge earning rule: 70% on its comprehensive course exam. Atlas target: explain and solve two unfamiliar mapped tasks without hints; this is separate from the vendor score.",
    url: "https://www.credly.com/org/cisco/badge/network-support-and-security",
    learningUrl: "https://www.netacad.com/courses/network-support-security",
    assessmentUrl: "https://www.netacad.com/courses/network-support-security",
  },
  {
    id: "ibm-cybersecurity-fundamentals",
    name: "IBM SkillsBuild Cybersecurity Fundamentals",
    code: "Cybersecurity Fundamentals",
    kind: "Digital badge",
    freeStatus: "Free credential",
    cost: "Free learning badge after the course and an end-of-course assessment score of at least 80%.",
    trainingCost: "Free IBM SkillsBuild course.",
    assessmentCost: "Free end-of-course assessment and digital badge.",
    eligibility:
      "Registered IBM SkillsBuild users: IBM lists an adult route for age 18+ and a separate high-school student/educator route. Choose the appropriate account route.",
    priority: "Optional",
    timing:
      "After access-control and network basics; use the official course to add threat and defense breadth before the assessment.",
    why: "A no-fee alternative introductory security checkpoint covering attack patterns and organizational defenses.",
    roles: [
      "IT support trainee",
      "Security operations trainee",
      "Cloud support trainee",
    ],
    prerequisites: [
      "Atlas recommendation: explain access, data exposure, and a network request.",
      "Register through the correct official SkillsBuild route.",
    ],
    sections: [2, 3, 15],
    lessonIds: ["linux-permissions", "network-http", "security-review"],
    curriculumMilestone: {
      label: "After permissions, HTTP, and the cloud security review",
      lessonIds: ["linux-permissions", "network-http", "security-review"],
      extraPreparation: [
        "Complete IBM threat groups, attack types, social engineering, cryptography, and prevention/detection/response material, then its end-of-course assessment.",
      ],
    },
    readiness: [
      "Explain an attack path, the affected asset, and a relevant preventive or detective control.",
      "Complete the official course and distinguish security vocabulary from demonstrated incident-response ability.",
    ],
    gaps: [
      "Add IBM threat intelligence, cryptography, social engineering, case studies, and security-process breadth; this badge does not establish operational SOC readiness.",
    ],
    practiceThreshold:
      "IBM earning rule: at least 80% on the end-of-course assessment. Atlas target: explain two unfamiliar threat/control scenarios without hints before attempting it.",
    url: "https://www.credly.com/org/ibm-skillsbuild/badge/cybersecurity-fundamentals",
    learningUrl:
      "https://skills.yourlearning.ibm.com/activity/ILB-DNRPWDGQGMMY7GGD",
    assessmentUrl: "https://skillsbuild.org/digital-credentials",
    verified:
      "2026-10-23 · IBM badge page and IBM-issued cost, assessment, and account-route criteria checked; signed-in access not tested",
  },
  {
    id: "aws-application-networking-demonstrated",
    name: "AWS Application Networking Demonstrated",
    code: "AWS hands-on microcredential",
    kind: "Skills credential",
    freeStatus: "Free credential",
    cost: "Free microcredential assessment under the April 2026 AWS policy; no Skill Builder subscription required.",
    trainingCost:
      "Free documentation and digital learning exist; optional premium preparation labs are separate.",
    assessmentCost: "Free hands-on assessment in the supplied AWS environment.",
    eligibility:
      "Use AWS Skill Builder; AWS says microcredentials are offered where Skill Builder is available. Confirm current account, region, language, and assessment requirements.",
    priority: "Optional",
    timing:
      "After cloud networking, AWS operations, and container foundations; complete dedicated provider practice before launching the hands-on assessment.",
    why: "A free practical extension for application-delivery and cloud-support work after the packet-path foundations.",
    roles: ["Cloud support trainee", "Cloud operations trainee"],
    prerequisites: [
      "Atlas milestone is a planning checkpoint, not an AWS eligibility rule.",
      "Complete the current assessment-specific learning and practical preparation.",
    ],
    sections: [8, 10, 12],
    lessonIds: [
      "cloud-packet",
      "aws-plan",
      "aws-availability",
      "aws-operations",
      "docker-local",
    ],
    curriculumMilestone: {
      label:
        "After cloud networking, AWS operations, and container foundations",
      lessonIds: [
        "cloud-packet",
        "aws-plan",
        "aws-availability",
        "aws-operations",
        "docker-local",
      ],
      extraPreparation: [
        "Add official practice with Elastic Load Balancing, VPC Lattice, API Gateway, CloudFront, and ECS application-delivery tasks; Atlas provides preparation foundations, not full assessment coverage.",
      ],
    },
    readiness: [
      "Diagnose a failed application request across name, route, load balancer, service, and permission boundaries.",
      "Practice unfamiliar application-delivery faults in authorized AWS learning environments.",
    ],
    gaps: [
      "Add official practice with Elastic Load Balancing, VPC Lattice, API Gateway, CloudFront, and ECS application-delivery tasks; Atlas provides preparation foundations, not full assessment coverage.",
    ],
    practiceThreshold:
      "Atlas target: resolve two different unfamiliar practice scenarios, verify the result, and explain the evidence without AI. Complete provider preparation before attempting the live assessment; no raw provider passing score is asserted.",
    url: "https://aws.amazon.com/blogs/training-and-certification/microcredentials-from-aws-are-now-free-heres-why-that-matters/",
    learningUrl: "https://skillbuilder.aws/category/type/microcredentials",
    assessmentUrl:
      "https://skillbuilder.aws/learn/EM5GTXEQB6/aws-application-networking-demonstrated/GS9ZN623HY",
    verified:
      "2026-10-23 · AWS April 23 2026 free-access policy and official assessment scope checked; account launch not tested",
  },
  {
    id: "aws-incident-response-demonstrated",
    name: "AWS Incident Response Demonstrated",
    code: "AWS hands-on microcredential",
    kind: "Skills credential",
    freeStatus: "Free credential",
    cost: "Free microcredential assessment under the April 2026 AWS policy; no Skill Builder subscription required.",
    trainingCost:
      "Free documentation and digital learning exist; optional premium preparation labs are separate.",
    assessmentCost: "Free hands-on assessment in the supplied AWS environment.",
    eligibility:
      "Use AWS Skill Builder; AWS says microcredentials are offered where Skill Builder is available. Confirm current account, region, language, and assessment requirements.",
    priority: "Optional",
    timing:
      "After AWS operations, observability, recovery, and security threat modeling; complete dedicated provider practice before launching the hands-on assessment.",
    why: "A free hands-on security assessment branch for learners progressing from operational evidence into cloud incident response.",
    roles: ["Cloud support trainee", "Cloud operations trainee"],
    prerequisites: [
      "Atlas milestone is a planning checkpoint, not an AWS eligibility rule.",
      "Complete the current assessment-specific learning and practical preparation.",
    ],
    sections: [10, 14, 15],
    lessonIds: [
      "aws-operations",
      "observability-signals",
      "reliability-incident",
      "security-review",
      "security-threat-model",
    ],
    curriculumMilestone: {
      label:
        "After AWS operations, observability, recovery, and security threat modeling",
      lessonIds: [
        "aws-operations",
        "observability-signals",
        "reliability-incident",
        "security-review",
        "security-threat-model",
      ],
      extraPreparation: [
        "Complete dedicated AWS security-incident identification, containment, remediation, and evidence-preservation practice. Atlas database recovery and threat-model labs cover only part of this security assessment.",
      ],
    },
    readiness: [
      "Explain an incident timeline, limit access deliberately, and justify evidence-preserving containment.",
      "Practice security incident investigation and remediation in authorized AWS learning environments.",
    ],
    gaps: [
      "Complete dedicated AWS security-incident identification, containment, remediation, and evidence-preservation practice. Atlas database recovery and threat-model labs cover only part of this security assessment.",
    ],
    practiceThreshold:
      "Atlas target: resolve two different unfamiliar practice scenarios, verify the result, and explain the evidence without AI. Complete provider preparation before attempting the live assessment; no raw provider passing score is asserted.",
    url: "https://aws.amazon.com/blogs/training-and-certification/microcredentials-from-aws-are-now-free-heres-why-that-matters/",
    learningUrl: "https://skillbuilder.aws/category/type/microcredentials",
    assessmentUrl:
      "https://skillbuilder.aws/learn/UQWKF19DT7/aws-incident-response-demonstrated/VH96JY5RJZ",
    verified:
      "2026-10-23 · AWS April 23 2026 free-access policy and official assessment scope checked; account launch not tested",
  },
  {
    id: "linux-essentials",
    curriculumMilestone: {
      label:
        "After terminal skills, Linux administration, and the Linux service project",
      lessonIds: [
        "terminal-map",
        "terminal-streams",
        "terminal-control",
        "linux-permissions",
        "linux-services",
        "troubleshoot-layers",
      ],
      projectIds: ["linux-service"],
      extraPreparation: [
        "Review the current LPI objectives for open-source licensing, hardware, SSH, and other uncovered topics; meet the legitimate practice target before booking.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "terminal-map",
      "terminal-streams",
      "terminal-control",
      "linux-permissions",
      "linux-services",
      "troubleshoot-layers",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
    curriculumMilestone: {
      label:
        "After Linux and network foundations, cloud concepts, and the Linux service project",
      lessonIds: [
        "linux-permissions",
        "linux-services",
        "network-addresses",
        "cloud-model",
      ],
      projectIds: ["linux-service"],
      extraPreparation: [
        "Complete the current LFCA domains for security, availability, backup, open source, and project practices; meet the practice target before booking.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "linux-permissions",
      "linux-services",
      "network-addresses",
      "cloud-model",
      "security-review",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
    curriculumMilestone: {
      label: "After networking, subnetting, and layered troubleshooting",
      lessonIds: [
        "network-addresses",
        "network-dns",
        "network-http",
        "troubleshoot-layers",
        "network-cidr",
      ],
      extraPreparation: [
        "Add Cisco device/media, endpoint, support, and authorized simulator exercises from the complete current CCST objectives; meet the practice target.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "network-addresses",
      "network-dns",
      "network-http",
      "troubleshoot-layers",
      "cloud-packet",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
    curriculumMilestone: {
      label: "After the Git and GitHub workflow lessons",
      lessonIds: [
        "git-basics",
        "git-branches",
        "git-conflicts",
        "git-collaboration",
        "github-workflow",
      ],
      extraPreparation: [
        "Complete several real reviewable pull requests and review GitHub administration, Projects, community, privacy, and security objectives; meet the practice target.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "git-basics",
      "git-branches",
      "git-conflicts",
      "git-collaboration",
      "github-workflow",
      "ci-contract",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
    curriculumMilestone: {
      label:
        "After cloud foundations, the AWS service plan, and security review",
      lessonIds: ["cloud-model", "aws-plan", "security-review"],
      extraPreparation: [
        "Review every current CLF-C02 domain, especially billing/support and service breadth; meet the practice target and verify exam eligibility before spending.",
      ],
    },
    freeStatus: "Free training; paid assessment",
    trainingCost:
      "Free AWS digital preparation exists; optional subscriptions, instructor-led training, and labs may cost extra.",
    assessmentCost:
      "$100 USD base exam price; check regional currency and taxes before booking.",
    eligibility:
      "No prior AWS certification required. Check AWS candidate age, ID, language, and delivery policies before registering.",
    learningUrl: "https://aws.amazon.com/training/digital/",
    assessmentUrl:
      "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    gaps: [
      "Review all CLF-C02 domains: cloud concepts 24%, security/compliance 30%, technology/services 34%, billing/pricing/support 12%.",
      "Extend beyond Atlas examples to the current in-scope services, support plans, pricing models, and governance topics. Implementation and troubleshooting are outside this exam's scope.",
    ],
    kind: "Professional certification",
    lessonIds: [
      "cloud-model",
      "aws-plan",
      "aws-availability",
      "aws-operations",
      "security-review",
      "architecture-tradeoffs",
    ],
    name: "AWS Certified Cloud Practitioner",
    code: "CLF-C02",
    cost: "$100 USD base exam price; local taxes and exchange rates may apply.",
    priority: "Optional",
    timing:
      "After a useful free cloud credential and cloud foundations, consider this paid exam only for a specific goal. Skip purchasing it if the concepts are already secure and an associate exam is the better next step.",
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
    verified:
      "2026-10-23 · official exam page and CLF-C02 guide checked; $100 base exam fee",
  },
  {
    id: "solutions-architect",
    curriculumMilestone: {
      label:
        "After architecture, security, recovery, and the resilient AWS project",
      lessonIds: [
        "cloud-packet",
        "aws-availability",
        "aws-operations",
        "database-sql",
        "reliability-incident",
        "security-threat-model",
        "architecture-tradeoffs",
      ],
      projectIds: ["aws-ha"],
      extraPreparation: [
        "Extend independent AWS design work across the current SAA-C03 objectives and meet the practice target. Compare experience against AWS recommendations before booking.",
      ],
    },
    freeStatus: "Free training; paid assessment",
    trainingCost:
      "Free AWS digital preparation exists; optional subscriptions, instructor-led training, and labs may cost extra.",
    assessmentCost:
      "$150 USD base exam price; check regional currency and taxes before booking.",
    eligibility:
      "No earlier AWS certification required. AWS targets at least one year of hands-on AWS solution-design experience; check candidate policies before registering.",
    learningUrl:
      "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html",
    assessmentUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    gaps: [
      "Review all SAA-C03 domains: secure architectures 30%, resilient 26%, high-performing 24%, cost-optimized 20%.",
      "Complete additional AWS storage, database, integration, networking, migration, and disaster-recovery scenarios from the official guide. Atlas's local labs and design proposals are partial preparation.",
    ],
    kind: "Professional certification",
    lessonIds: [
      "cloud-packet",
      "cloud-model",
      "aws-plan",
      "aws-availability",
      "aws-operations",
      "database-sql",
      "security-threat-model",
      "architecture-tradeoffs",
    ],
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
    verified:
      "2026-10-23 · official exam page and SAA-C03 guide checked; $150 base exam fee",
  },
  {
    id: "cloudops",
    curriculumMilestone: {
      label: "After AWS operations, monitoring, recovery, and the capstone",
      lessonIds: [
        "aws-operations",
        "aws-availability",
        "observability-signals",
        "reliability-incident",
        "security-review",
      ],
      projectIds: ["capstone"],
      extraPreparation: [
        "Add AWS-specific deployment, CloudFormation, automation, capacity, incident, and cost exercises from the current SOA-C03 guide; meet the practice target and experience recommendations.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "troubleshoot-layers",
      "aws-operations",
      "aws-availability",
      "bash-health",
      "ci-contract",
      "observability-signals",
      "reliability-incident",
      "security-review",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
    curriculumMilestone: {
      label:
        "After Terraform modules, state handling, and the Terraform project",
      lessonIds: [
        "terraform-local",
        "terraform-modules",
        "terraform-state",
        "security-review",
      ],
      projectIds: ["terraform-deploy"],
      extraPreparation: [
        "Practice imports, drift, remote state/locking, recovery, and HCP Terraform against the current 004 objectives; meet the practice target.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "terraform-local",
      "terraform-modules",
      "terraform-state",
      "security-review",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
    curriculumMilestone: {
      label:
        "After Linux administration, service recovery, and the Linux service project",
      lessonIds: [
        "linux-permissions",
        "linux-processes",
        "linux-services",
        "linux-resources",
        "troubleshoot-nginx",
        "bash-health",
      ],
      projectIds: ["linux-service"],
      extraPreparation: [
        "Complete the full current LFCS networking, storage, and administration objectives in disposable VMs; pass the two independent timed Atlas mock-lab targets.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "linux-permissions",
      "linux-processes",
      "linux-services",
      "linux-resources",
      "troubleshoot-nginx",
      "bash-health",
      "cloud-packet",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
    curriculumMilestone: {
      label:
        "After containers, Kubernetes fundamentals, observability, and the container project",
      lessonIds: [
        "docker-local",
        "docker-build",
        "kubernetes-read",
        "kubernetes-workloads",
        "observability-signals",
      ],
      projectIds: ["container-app"],
      extraPreparation: [
        "Review the broader current cloud-native ecosystem, orchestration, application delivery, and security topics; meet the practice target.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "docker-local",
      "docker-build",
      "docker-compose",
      "kubernetes-read",
      "kubernetes-workloads",
      "observability-signals",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
    curriculumMilestone: {
      label:
        "After Kubernetes recovery practice and the production-style capstone",
      lessonIds: [
        "linux-services",
        "cloud-packet",
        "kubernetes-read",
        "kubernetes-workloads",
        "reliability-incident",
      ],
      projectIds: ["capstone"],
      extraPreparation: [
        "Complete substantial dedicated cluster lifecycle, networking, storage, security, and troubleshooting practice for the current CKA curriculum; meet both timed mock-lab targets.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "linux-services",
      "cloud-packet",
      "docker-local",
      "kubernetes-read",
      "kubernetes-workloads",
      "reliability-incident",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
    curriculumMilestone: {
      label:
        "After subnetting and packet-path troubleshooting, followed by dedicated Cisco labs",
      lessonIds: [
        "network-addresses",
        "network-dns",
        "network-cidr",
        "cloud-packet",
        "troubleshoot-layers",
      ],
      extraPreparation: [
        "Complete the entire current CCNA switching, routing, wireless, security, and automation curriculum with authorized simulator labs; meet the practice target before booking.",
      ],
    },
    kind: "Professional certification",
    lessonIds: [
      "network-addresses",
      "network-dns",
      "network-http",
      "cloud-packet",
      "troubleshoot-layers",
    ],
    trainingCost:
      "Preparation cost not re-verified in this free-first review; check the linked official provider resources before choosing paid training.",
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
