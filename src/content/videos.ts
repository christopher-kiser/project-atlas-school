/** Optional third-party teaching. A checked source link is not a playback guarantee. */
export type VideoLesson = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  embedUrl?: string;
  /** Official publisher-hosted stream; never copied into Atlas. */
  mediaUrl?: string;
  captionsUrl?: string;
  transcriptUrl?: string;
  section: number;
  lessonIds: string[];
  /** Publisher-stated length, verified recording metadata, or an actual series. */
  durationLabel: string;
  summary: string;
  watchFor: string[];
  practiceAfter: string;
  checked: "2026-10-22";
  accessNote?: string;
};

export const videos: VideoLesson[] = [
  {
    id: "video-computing-cs50",
    title: "CS50: start with Lecture 0 — Scratch",
    publisher: "Harvard University · CS50",
    url: "https://cs50.harvard.edu/x/weeks/0/",
    mediaUrl: "https://cdn.cs50.net/2025/fall/lectures/0/lecture0-360p.mp4",
    transcriptUrl:
      "https://cdn.cs50.net/2025/fall/lectures/0/lang/en/lecture0.txt",
    section: 0,
    lessonIds: ["computing-basics", "orientation", "web-foundations"],
    durationLabel: "2 hr 0 min 53 sec",
    summary:
      "Start the CS50 series with this complete Lecture 0, which explains information, algorithms, and programs through Scratch. The source opens the actual lecture page with its player, notes, and official YouTube link.",
    watchFor: [
      "How information becomes bits",
      "An algorithm's inputs and outputs",
      "Functions, decisions, and loops in a program",
    ],
    practiceAfter:
      "Draw the path from a keyboard action through a program to saved output. Explain the difference between memory, persistent storage, and a remote service without replaying the lecture.",
    checked: "2026-10-22",
    accessNote:
      "Streams directly from Harvard. Use the English transcript below to read along; captions are available through the publisher's lesson page.",
  },
  {
    id: "video-shell-mit",
    title: "Course Overview + Introduction to the Shell",
    publisher: "MIT · The Missing Semester (2026)",
    url: "https://missing.csail.mit.edu/2026/course-shell/",
    section: 1,
    lessonIds: [
      "terminal-map",
      "terminal-files",
      "terminal-cleanup",
      "terminal-streams",
    ],
    durationLabel: "1 hr 14 min 43 sec",
    summary:
      "See how a shell locates programs, handles paths, and connects command input and output. Pause the demonstrations and predict each result before running your own local example.",
    watchFor: [
      "Terminal versus shell",
      "Absolute and relative paths",
      "Redirection and pipelines",
    ],
    practiceAfter:
      "Create a disposable directory, navigate without the file explorer, and build a pipeline that writes a small report. Explain which program reads each stream.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/MSgoeuMqUmU",
  },
  {
    id: "video-linux-environment",
    title: "Command-line Environment",
    publisher: "MIT · The Missing Semester (2026)",
    url: "https://missing.csail.mit.edu/2026/command-line-environment/",
    section: 2,
    lessonIds: [
      "terminal-control",
      "linux-processes",
      "linux-jobs",
      "linux-permissions",
      "linux-services",
      "bash-values",
    ],
    durationLabel: "1 hr 6 min 19 sec",
    summary:
      "Connect arguments, streams, environment variables, return codes, and signals into a model of how command-line programs cooperate. This is a useful bridge from memorized commands to Linux operation.",
    watchFor: [
      "Environment inherited by a child process",
      "Exit status versus printed output",
      "Signals and foreground/background work",
    ],
    practiceAfter:
      "Start a harmless local sleep process, inspect it, suspend and resume it, then terminate only that process. Record the PID and explain each state change.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/ccBGsPedE9Q",
  },
  {
    id: "video-editor-mit",
    title: "Development Environment and Tools",
    publisher: "MIT · The Missing Semester (2026)",
    url: "https://missing.csail.mit.edu/2026/development-environment/",
    section: 1,
    lessonIds: ["editor-workflow", "git-basics", "python-testing"],
    durationLabel: "53 min 48 sec",
    summary:
      "Compare an IDE with a terminal editing workflow and learn why navigation, code intelligence, and formatting matter. Begin with one editor; the demonstrations are not a requirement to adopt every tool.",
    watchFor: [
      "Editing versus executing a file",
      "Language-server feedback",
      "Finding and changing code safely",
    ],
    practiceAfter:
      "Open a small local script, make one change, run its check, and inspect the Git diff. Explain the change before committing it.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/QnM1nVzrkx8",
  },
  {
    id: "video-network-microsoft",
    title: "Networking Fundamentals: Working with Networking Services",
    publisher: "Microsoft Learn · Microsoft Virtual Academy",
    url: "https://learn.microsoft.com/en-us/shows/networking-fundamentals/06",
    section: 3,
    lessonIds: [
      "network-addresses",
      "network-cidr",
      "network-dns",
      "cloud-packet",
    ],
    durationLabel: "56 min 13 sec",
    summary:
      "Watch the selected networking-services episode directly. Follow how address configuration and services make a network usable, then use the Atlas DNS and packet-path labs to test your own observations.",
    watchFor: [
      "Address allocation through DHCP",
      "Why a network service can fail independently of a link",
      "Separating configuration from connectivity",
    ],
    practiceAfter:
      "Inspect your local address and route, resolve an example hostname, and explain why a successful name lookup does not prove the application is reachable.",
    checked: "2026-10-22",
    accessNote:
      "The 2013 Windows demonstrations use an older interface; follow current Atlas commands for your practical. Open the publisher player to watch without signing in.",
  },
  {
    id: "video-web-cs50",
    title: "CS50 Web: Scalability and Security",
    publisher: "Harvard University · CS50",
    url: "https://cs50.harvard.edu/web/weeks/8/",
    section: 8,
    lessonIds: [
      "web-foundations",
      "network-http",
      "cloud-packet",
      "architecture-tradeoffs",
    ],
    durationLabel: "1 hr 27 min 46 sec",
    summary:
      "This selected lecture explains how a web application scales and how encrypted traffic and application controls address different risks. Revisit it after the introductory HTTP lab; some programming experience is helpful.",
    watchFor: [
      "Load balancing and state",
      "Public-key encryption and HTTPS",
      "Application risks that transport encryption does not fix",
    ],
    practiceAfter:
      "Trace one request to your local web service. Capture a status code and headers, then explain where TLS would terminate and which risks encryption alone would leave unresolved.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/6PWTxRGh_dk",
  },
  {
    id: "video-git-mit",
    title: "Version Control and Git",
    publisher: "MIT · The Missing Semester (2026)",
    url: "https://missing.csail.mit.edu/2026/version-control/",
    section: 5,
    lessonIds: [
      "git-basics",
      "git-branches",
      "git-conflicts",
      "git-collaboration",
      "github-workflow",
    ],
    durationLabel: "1 hr 9 min 32 sec",
    summary:
      "Understand Git as a history of snapshots before relying on command recipes. Relate branches, commits, and merges to the history you can inspect in a small repository.",
    watchFor: [
      "Working changes versus committed snapshots",
      "Branch references and commit history",
      "Why a merge needs human judgment",
    ],
    practiceAfter:
      "Make two branches change the same line, resolve the conflict deliberately, and explain the resulting history using git log and git diff.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/9K8lB61dl3Y",
  },
  {
    id: "video-bash-mit",
    title: "Shell Tools and Scripting",
    publisher: "MIT · The Missing Semester (2020)",
    url: "https://missing.csail.mit.edu/2020/shell-tools/",
    section: 6,
    lessonIds: [
      "bash-values",
      "bash-decisions",
      "bash-loops",
      "bash-functions",
      "bash-health",
      "terminal-search",
    ],
    durationLabel: "48 min 55 sec",
    summary:
      "Study Bash variables, quoting, arguments, control flow, and reusable functions. The 2020 recording remains useful for these concepts; validate tool-specific details against the current lab environment.",
    watchFor: [
      "Single versus double quoting",
      "Arguments and return codes",
      "Loops and functions that operate on files",
    ],
    practiceAfter:
      "Write a local health-check script that accepts a quoted path, handles a missing file, and exits nonzero on failure. Test it against a filename containing spaces.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/kgII-YWo3Zw",
  },
  {
    id: "video-python-cs50",
    title: "CS50 Python: Functions and Variables",
    publisher: "Harvard University · CS50",
    url: "https://cs50.harvard.edu/python/weeks/0/",
    section: 7,
    lessonIds: ["python-data", "python-cli", "python-inventory"],
    durationLabel: "1 hr 45 min 38 sec",
    summary:
      "Begin the Python sequence with functions, variables, values, and output. Predict each small program before running it, then transfer the same input-and-output reasoning to an operational tool.",
    watchFor: [
      "Function arguments and return values",
      "Values and variable names",
      "Formatting predictable output",
    ],
    practiceAfter:
      "Write a small function that accepts a service name and returns a formatted inventory line. Test an ordinary name and an empty value.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/JP7ITIXGpHk",
  },
  {
    id: "video-sql-cs50",
    title: "CS50 SQL: Querying",
    publisher: "Harvard University · CS50",
    url: "https://cs50.harvard.edu/sql/weeks/0/",
    section: 9,
    lessonIds: ["database-sql"],
    durationLabel: "1 hr 19 min 13 sec",
    summary:
      "Learn how a query selects, filters, and summarizes rows in a relational database. The direct source opens the Querying lecture and its notes; writing and transactions have a separate supporting video.",
    watchFor: [
      "Selecting named columns",
      "Filtering and ordering rows",
      "Aggregating without losing the meaning of the result",
    ],
    practiceAfter:
      "Query a disposable SQLite service table. Filter failed services, order the results, and count the matching rows.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/vHYeChEf2lA",
  },
  {
    id: "video-cloud-aws",
    title: "What is AWS?",
    publisher: "Amazon Web Services",
    url: "https://www.youtube.com/watch?v=a9__D53WsUs",
    embedUrl: "https://www.youtube-nocookie.com/embed/a9__D53WsUs",
    section: 9,
    lessonIds: ["cloud-model", "aws-plan"],
    durationLabel: "3 min 11 sec",
    summary:
      "A short vendor introduction to obtaining computing resources on demand. Use it to name the basic model, then challenge the assumptions about responsibility, ongoing cost, and availability in your own design.",
    watchFor: [
      "Resources delivered as services",
      "Provisioning on demand",
      "How usage changes spending",
    ],
    practiceAfter:
      "Compare a local server with a small cloud service in a responsibility table. Identify costs that can continue when an application stops serving requests; do not provision anything.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
  },
  {
    id: "video-aws-architecture",
    title: "AWS: Static Stability and Circuit Breaker Patterns",
    publisher: "Amazon Web Services · Training and Certification",
    url: "https://aws.amazon.com/video/watch/b462c7a3cbc/",
    section: 10,
    lessonIds: [
      "aws-plan",
      "aws-field",
      "aws-availability",
      "aws-operations",
      "architecture-tradeoffs",
    ],
    durationLabel: "5 min 23 sec",
    summary:
      "This short architecture lesson shows how a system can survive a failure using capacity and isolation that already exist. Connect Availability Zones, control-plane dependencies, and circuit breakers to a concrete recovery design.",
    watchFor: [
      "Control plane versus data plane",
      "Capacity available before a failure",
      "Isolating a failed zone or dependency",
    ],
    practiceAfter:
      "Draw a two-zone design, name its remaining single points of failure, and write a recovery test. Keep this as design evidence unless you separately operate an authorized sandbox.",
    checked: "2026-10-22",
    accessNote:
      "Watch on AWS without an account. Follow with the diagramming practical; no cloud provisioning is required.",
  },
  {
    id: "video-terraform-hashicorp",
    title: "What is Infrastructure as Code with Terraform?",
    publisher: "HashiCorp Developer",
    url: "https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code",
    section: 11,
    lessonIds: ["terraform-local", "terraform-modules", "terraform-state"],
    durationLabel: "3 min 35 sec",
    summary:
      "Start with the actual introductory video on this tutorial page. It connects configuration, a repeatable lifecycle, state, and collaboration; the page links the remaining get-started tutorials.",
    watchFor: [
      "Configuration as a reviewable description",
      "A consistent infrastructure workflow",
      "State and collaboration",
    ],
    practiceAfter:
      "Use the Atlas local Terraform practical to make, review, apply, and reverse a harmless change. Explain how losing state differs from deleting a managed resource.",
    checked: "2026-10-22",
    accessNote:
      "The direct tutorial contains the official Wistia player. Use its Play Video control; optional cookie settings may appear. AWS/HCP examples may incur costs, while the Atlas exercise remains local.",
  },
  {
    id: "video-docker-inner-loop",
    title: "Docker 101: Inner Loop Mastery",
    publisher: "Docker",
    url: "https://www.youtube.com/watch?v=IZ0nrSsIUkE",
    embedUrl: "https://www.youtube-nocookie.com/embed/IZ0nrSsIUkE",
    section: 12,
    lessonIds: ["docker-local", "docker-build", "docker-compose"],
    durationLabel: "50 min 15 sec",
    summary:
      "Watch an image move through a development workflow, then see a local application stack coordinated with Compose. Focus on repeatable builds and dependencies; commercial product demonstrations are optional.",
    watchFor: [
      "Pulling an image versus building one",
      "Image inspection and scanning",
      "Starting a multi-container stack with Compose",
    ],
    practiceAfter:
      "Build your small local service, run it on a loopback-bound port, inspect its logs, and explain how its data survives container replacement. Stop and remove the disposable stack afterward.",
    checked: "2026-10-22",
    accessNote:
      "If the player does not load, use the publisher link below. The public recording is linked by Docker; no webinar registration is required for this selected player.",
  },
  {
    id: "video-ci-quality",
    title: "Code Quality: tests, linting, and continuous integration",
    publisher: "MIT · The Missing Semester (2026)",
    url: "https://missing.csail.mit.edu/2026/code-quality/",
    section: 13,
    lessonIds: [
      "ci-contract",
      "cicd-artifacts",
      "python-testing",
      "github-workflow",
      "ai-verify",
    ],
    durationLabel: "1 hr 15 min 14 sec",
    summary:
      "Connect automated feedback to a reviewable release process. Distinguish formatting, linting, tests, and continuous integration instead of treating a green check as proof that every failure is impossible.",
    watchFor: [
      "What each check can and cannot detect",
      "Running checks consistently",
      "Continuous integration on a repository change",
    ],
    practiceAfter:
      "Create a local check command, make a meaningful test fail, and show that it blocks success. Describe which checks belong before an artifact is promoted.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/XBiLUNx84CQ",
  },
  {
    id: "video-debugging-mit",
    title: "Debugging and Profiling",
    publisher: "MIT · The Missing Semester (2026)",
    url: "https://missing.csail.mit.edu/2026/debugging-profiling/",
    section: 4,
    lessonIds: [
      "troubleshoot-layers",
      "troubleshoot-nginx",
      "linux-resources",
      "reliability-incident",
    ],
    durationLabel: "1 hr 13 min 9 sec",
    summary:
      "See how observations, logs, debuggers, and measurements narrow a fault. Use profiling to test a performance hypothesis instead of guessing which code or process needs attention.",
    watchFor: [
      "Useful structured log context",
      "Reproducing a failure",
      "Measuring before optimizing",
    ],
    practiceAfter:
      "Introduce one harmless fault into a disposable local service. Record the symptom, hypothesis, decisive observation, smallest fix, and a recovery check in an incident note.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/8VYT9TcUmKs",
  },
  {
    id: "video-observability-grafana",
    title: "Exploring Logs, Metrics, and Traces with Grafana",
    publisher: "Grafana Labs",
    url: "https://www.youtube.com/watch?v=1q3YzX2DDM4",
    section: 14,
    lessonIds: [
      "observability-signals",
      "reliability-sli",
      "reliability-incident",
    ],
    durationLabel: "12 min 57 sec",
    summary:
      "This public beginner episode demonstrates three telemetry signals and how to explore them in Grafana. Use each signal to answer a specific operational question instead of treating a dashboard as proof of reliability.",
    watchFor: [
      "Questions answered by each signal",
      "Exploring observations around a failure",
      "Correlating a request with its context",
    ],
    practiceAfter:
      "Generate local structured logs and a request-success count. Define one service indicator and show which observation would help investigate a failed request.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/1q3YzX2DDM4",
  },
  {
    id: "video-opentelemetry-grafana",
    title: "What is Grafana Alloy, and When Should You Use It?",
    publisher: "Grafana Labs",
    url: "https://www.youtube.com/watch?v=bFyGd_Sr5W4",
    section: 14,
    lessonIds: ["observability-signals", "reliability-sli"],
    durationLabel: "3 min 46 sec",
    summary:
      "This short beginner episode introduces a telemetry collector and its place between services and storage. Grafana Alloy is a distribution of the OpenTelemetry Collector; distinguish collecting signals from instrumenting an application.",
    watchFor: [
      "The purpose of a telemetry collector",
      "Receiving, processing, and exporting signals",
      "Choosing where collection belongs",
    ],
    practiceAfter:
      "Draw your local service, its logs or metrics, a collector, and a destination. Explain which component produces each signal and which only transports it.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/bFyGd_Sr5W4",
  },
  {
    id: "video-security-cs50",
    title: "CS50 Cybersecurity: Securing Accounts",
    publisher: "Harvard University · CS50",
    url: "https://cs50.harvard.edu/cybersecurity/weeks/0/",
    section: 15,
    lessonIds: ["security-review", "security-threat-model"],
    durationLabel: "1 hr 13 min 7 sec",
    summary:
      "Begin security study with the assets and attacks around an account. Use passwords, password storage, and additional authentication factors to reason about a threat and its control.",
    watchFor: [
      "Password guessing and reuse",
      "Protecting stored credentials",
      "Multi-factor authentication and its limits",
    ],
    practiceAfter:
      "Threat-model a local learning service. Name its assets, entry points, trust boundaries, and three testable controls; use synthetic data and document one residual risk.",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
    embedUrl: "https://www.youtube-nocookie.com/embed/fJYdAN4Vh5c",
  },
  {
    id: "video-kubernetes-google",
    title: "What is Kubernetes?",
    publisher: "Google Cloud",
    url: "https://www.youtube.com/watch?v=cC46cg5FFAM",
    section: 16,
    lessonIds: ["kubernetes-read", "kubernetes-workloads", "docker-compose"],
    durationLabel: "4 min 41 sec",
    summary:
      "Start with Google Cloud’s short explanation of why container orchestration exists. Connect the cluster and desired-state model to the Pods, controllers, and Services you read in the Atlas manifests.",
    watchFor: [
      "Managing a group of containers",
      "Desired state and orchestration",
      "Scaling and recovering workloads",
    ],
    practiceAfter:
      "Read a local Deployment and Service manifest, explain the selector relationship, and predict the effect of changing replicas. Use only the Atlas local cluster exercise if running it.",
    checked: "2026-10-22",
    accessNote:
      "If the player does not load, use the publisher link below. No Google Cloud account or GKE deployment is required.",
    embedUrl: "https://www.youtube-nocookie.com/embed/cC46cg5FFAM",
  },
  {
    id: "video-powershell-microsoft",
    title: "PowerShell: Don't fear the shell",
    publisher: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/shows/getting-started-with-microsoft-powershell/don%27t-fear-the-shell",
    section: 17,
    lessonIds: ["powershell-bridge"],
    durationLabel: "38 min 56 sec",
    summary:
      "Start the official PowerShell series with its introductory episode. Compare the shell's command-discovery and administration model with Bash before learning the object pipeline in the Atlas practical.",
    watchFor: [
      "What the shell does",
      "Discovering commands",
      "Automation as a repeatable procedure",
    ],
    practiceAfter:
      "Use Get-Command and Get-Help, inspect a harmless process object, and compare an object pipeline with a Bash text pipeline.",
    checked: "2026-10-22",
    accessNote:
      "Watch on Microsoft Learn without signing in. The 2019 demonstration uses an older Windows environment; use current Atlas PowerShell 7 commands for your practical.",
  },
  {
    id: "video-python-files-cs50",
    title: "CS50 Python: File I/O",
    url: "https://cs50.harvard.edu/python/weeks/6/",
    embedUrl: "https://www.youtube-nocookie.com/embed/KD-Yoel6EVQ",
    section: 7,
    lessonIds: ["python-files-json", "python-inventory"],
    durationLabel: "Series · File I/O lecture",
    summary:
      "Study how Python opens, reads, writes, and structures data from files. Apply the file-handling model to the Atlas JSON exercise; this lecture also demonstrates CSV and images.",
    watchFor: [
      "Opening and closing files",
      "Rows and structured records",
      "Separating input parsing from presentation",
    ],
    practiceAfter:
      "Read a local sample file, handle a missing path, and produce a deterministic inventory report without changing the original.",
    publisher: "Harvard University · CS50",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
  },
  {
    id: "video-python-libraries-cs50",
    title: "CS50 Python: Libraries and APIs",
    url: "https://cs50.harvard.edu/python/weeks/4/",
    embedUrl: "https://www.youtube-nocookie.com/embed/MztLZWibctI",
    section: 7,
    lessonIds: ["python-http-api", "python-data"],
    durationLabel: "Series · Libraries lecture",
    summary:
      "Use imports, packages, command-line arguments, and a web API to see how a small Python program connects to existing code and services. Keep network input untrusted and validate it in the Atlas practice.",
    watchFor: [
      "Importing a module deliberately",
      "Passing command-line arguments",
      "Requesting an API and reading JSON",
    ],
    practiceAfter:
      "Use a captured JSON fixture first, then test success, invalid data, and timeout behavior in the local HTTP practical.",
    publisher: "Harvard University · CS50",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
  },
  {
    id: "video-sql-writing-cs50",
    title: "CS50 SQL: Writing and Transactions",
    url: "https://cs50.harvard.edu/sql/weeks/3/",
    embedUrl: "https://www.youtube-nocookie.com/embed/BD08USRd2M8",
    section: 9,
    lessonIds: ["database-transactions", "architecture-tradeoffs"],
    durationLabel: "Series · Writing lecture",
    summary:
      "Follow how inserts, updates, deletions, and transactions change a database. Connect a constraint failure and rollback to the invariant the application must preserve.",
    watchFor: [
      "Targeting an update safely",
      "Constraints that protect a write",
      "A transaction grouping related changes",
    ],
    practiceAfter:
      "Transfer a value between two rows in a disposable SQLite database. Make one operation fail and demonstrate that rollback preserves the original total.",
    publisher: "Harvard University · CS50",
    checked: "2026-10-22",
    accessNote: "If the player does not load, use the publisher link below.",
  },
];

/** Explicit assignments take precedence; broad section matches can be misleading. */
export function videosForLesson(
  lessonId: string,
  _section?: number,
): VideoLesson[] {
  void _section;
  return videos.filter((video) => video.lessonIds.includes(lessonId));
}
