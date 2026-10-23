# Atlas curriculum

Atlas develops the ability to inspect a system, explain its behavior, make a small justified change, and prove the result. The pathway starts with Linux and terminal fluency, moves through networking and automation, and builds toward operating cloud systems. Certifications support that work; they do not define the course or replace project evidence.

The curriculum now has 61 released lessons across 22 competency sections rather than a weekly schedule. It includes 24 expanded beginner/tool lessons and 24 supporting video selections. Every lesson has its own Videos stage; videos supplement written teaching and practical evidence. `src/content/sections.ts` owns the topic map; `src/content/index.ts` assembles the released lessons and the expansion backlog. The topic map describes the intended breadth, not a claim that every topic already has a full lesson. See [CONTENT-BACKLOG.md](CONTENT-BACKLOG.md) for unfinished depth and [RESEARCH.md](RESEARCH.md) for dated source verification.

## What a lesson must accomplish

The learning loop is:

**Explain → demonstrate → guided practice → retrieval → practical evidence → fault diagnosis → independent attempt → delayed reinforcement.**

Each released lesson has outcomes, concrete concepts, a bounded demonstration, practice tasks, retrieval questions, a lab scenario, expected evidence, a rubric, hints, a solution, and a harder challenge. Short command sets reduce the number of unfamiliar ideas competing for attention. Commands recur in later tasks: `systemctl`, `journalctl`, `ss`, and `curl` first answer narrow questions, then support an independent outage investigation.

The instructional questions are consistent: What is this? Why does it matter? What does it look like? What fails? How can I inspect it? What is the smallest justified fix? What observation would prove recovery? A successful command or a green process status is evidence about one layer, not proof that an entire service is healthy.

## Beginner learning path

Every released lesson now has an authored study guide, reviewed using the knowledge available from its prerequisites. The guide states the starting environment and purpose, separates required learning from optional exploration, explains new vocabulary, and walks through observations before asking for independent work. Optional topics are extensions beyond the lesson's evidence requirements; they are not a claim that the topic will never matter in an engineering role.

The command explorer explains each listed command's program, flags or operands, expected output or side effects, and a common mistake. Supporting syntax from examples is also explained. Learners should understand what a command will do and consult help for unfamiliar syntax; the course does not require memorizing every option a tool supports.

The page sequence is **prepare → understand → explain commands → read a worked example → follow observable steps → rehearse with less help → recall → practical evidence**. Videos remain available for every lesson as support within this sequence. Readiness questions are self-checks, not new completion buttons or assessment credit. Lesson and exercise IDs, saved evidence, and the distinction between guided and independent work remain stable.

Content is owned by the three `guides-*.ts` files and assembled in `study-guides.ts`. `LessonStudy.tsx` renders the common flow. Academy attaches this teaching content in the server catalog; signed-out visitors receive no study guide. The personal school includes the same teaching material with its existing local progress storage.

The beginner review checks explanations, prerequisites, syntax, expected observations, and recovery from common mistakes for all 61 lessons. Structural and browser checks support that editorial review; they do not establish that a real beginner has completed the course or that every tool lab ran in every supported environment.

### Beginner review evidence — October 23, 2026

All 61 lessons received a prerequisite-aware beginner review and an authored guide. All 206 listed command entries have explanations of syntax, results, and mistakes; supporting examples add further syntax explanations. Structural checks protect this coverage. Browser checks open every lesson, select every listed command, and check the study plan, vocabulary, walkthrough, and retained video stage.

Safe local fixtures exercised 35 lessons: 16 foundation lessons, 16 expanded lesson demonstrations (38 success/failure cases), the Python inventory example and four tests, and the Bash health/Python HTTP client demonstrations. The last two ran through 12 loopback-only checks covering valid and unhealthy replies, HTTP failure, malformed/oversized responses, stopped-server transport failure, and recovery. Temporary fixtures were removed.

These are selected command/demo executions within those lessons, not proof of every practical or supported platform. Systemd/Nginx operation and actual editor/pager/browser keyboard interactions were reviewed. Terraform, Docker, Kubernetes/kind, and PowerShell tool labs were source-reviewed because the tools were unavailable in this runtime. Some host network inspection was sandbox-restricted. No cloud environment or paid resource was provisioned for the review.

The review also corrected configuration-change versus Terraform-drift wording, qualified Docker loopback exposure for current engines, made the Python demo's missing validation explicit, and fixed the Bash helper's dangling-symlink target guard. Bash decisions now precede the applied health script, and Python data/validation/testing precede the inventory report. Stable content IDs and progress formats are unchanged.

## Sequence and artifacts

| Section | Competency                    | Expected evidence or practical direction                                                             |
| ------- | ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| 0       | Engineering mindset           | A note separating attempted action, observation, hypothesis, and verification                        |
| 1       | Terminal and filesystem       | Safe navigation, file operations, stream routing, searching, and exit-status reasoning               |
| 2       | Linux administration          | Permission repair, process identity, job control, service-state report, and resource inspection      |
| 3       | Networking foundations        | Address, route, resolver, socket, and HTTP observations tied to specific questions                   |
| 4       | Linux troubleshooting         | A controlled Nginx outage, cause isolation, recovery, and proof using the original request           |
| 5       | Git and GitHub                | A readable history, branch, merge or conflict repair, pull request, and reproducible README          |
| 6       | Bash and automation           | A local HTTP health check with bounded waits and truthful exit statuses                              |
| 7       | Python for cloud engineers    | A JSON inventory report with valid, empty, and malformed-input tests                                 |
| 8       | Networking for cloud          | A forward/return packet-path diagram and discriminating tests for competing hypotheses               |
| 9       | Cloud foundations             | A small system mapped to responsibility, failure domains, ownership, and costs                       |
| 10      | AWS core                      | First a reviewable design; separately, actual redacted EC2/VPC/S3/IAM field evidence                 |
| 11      | Infrastructure as code        | Local Terraform plans, state reasoning, repeatability, and verified teardown                         |
| 12      | Containers                    | Local port mapping, process/log inspection, a stopped-service incident, and recovery                 |
| 13      | CI/CD                         | A meaningful failing test that blocks a check, a corrected run, and a version-specific recovery plan |
| 14      | Observability and reliability | A defined request indicator, objective, runbook, and incident explanation                            |
| 15      | Cloud security                | A concrete least-privilege review with allowed/denied behavior and verification                      |
| 16      | Kubernetes and cloud native   | An introductory manifest review before any cluster administration claim                              |
| 17      | Windows and PowerShell        | Object-pipeline inspection and an explanation of Windows/Linux/WSL differences                       |
| 18      | AI-assisted engineering       | An inspected suggestion, rejected unsafe assumptions, tests, and an unaided explanation              |
| 19      | System design                 | Requirements, state ownership, failure domains, recovery, and defended cost/performance choices      |
| 20      | Portfolio studio              | Reproducible projects with source, tests, evidence, operational notes, and review                    |
| 21      | Career and independent gates  | A capability inventory, project walkthrough, and specific remaining evidence                         |

Linux remains the server environment. Windows and macOS are supported client environments; they are not treated as interchangeable shells. `apt` and `systemctl` belong in an appropriate Ubuntu environment. PowerShell’s object pipeline is taught explicitly rather than presented as Bash with different command names.

## Present depth and truthful release labels

The foundational lesson family is in `foundations.ts`, with computing/web basics and additional hands-on depth in `expanded.ts`. It provides small-step teaching and repeated terminal practice around the learner’s existing Linux work. Sections 6–19 currently have usable bridge lessons in `advanced.ts`: each contains real teaching and a practical, but one bridge does not exhaust its section’s topic map. The separate `aws-field` checkpoint in `index.ts` requires actual AWS observations and cannot be satisfied by a design diagram alone.

The 24 expanded lessons add beginner computing/editor work, Bash and Python practice, SQLite constraints/transactions, local Terraform modules/state refactoring, Docker builds/Compose health, artifact promotion, observability, threat modeling and a local Kubernetes workload. See [CURRICULUM-EXPANSION.md](CURRICULUM-EXPANSION.md) for exact scope and tool-execution limits. Introductory bridges remain useful preparation; these additions do not exhaust production cloud engineering.

Examples of deliberate boundaries: Terraform uses local built-in resources; AWS examples distinguish simulations from the separate real-account field checkpoint; local Kubernetes work does not establish production cluster administration.

Sections 20–21 are supported by project briefs and capability gates rather than presented as a complete collection of additional lecture lessons. The eight project briefs are actionable assignments, but advanced projects can require official documentation and additional study beyond the released bridges.

## Evidence and progress

Progress records distinguish prior history, retrieval attempts, hints, practical submissions, independent attempts, project review notes, and certification practice scores. The implementation in `src/lib/learning.ts` is authoritative for the exact state calculation. The current model requires multiple distinct unaided retrieval successes plus practical evidence for a demonstrated lesson; independence also requires delayed retrieval and an independent practical without hints. A page view or a single answer is insufficient.

Delayed recall uses at least a 24-hour separation between successful retrieval attempts, with longer review intervals as success continues. A later mistake or hinted answer identifies a review need. A multiple-choice success is recognition evidence, not the same as producing a command unaided. These intervals are a simple learning policy, not a clinically or experimentally validated personal learning model.

Practical submission fields support command/output evidence, explanations, notes, code, configuration, links, and supported screenshots. The browser does not execute or inspect the learner’s real Linux system, validate a cloud deployment remotely, authenticate a reviewer, or award an external certification. Rubric checks and independence claims are learner assertions. Project review notes improve the record, but an editable local record is not a signed professional credential. Keep this limitation visible when interpreting readiness states.

The initial Atlas migration preserves reported practice rather than restarting the learner. Previously practiced terminal, permissions, processes, services, resources, networking, and Nginx work appear as prior history. Previously passed practicals can be recorded as reported demonstration. A short calibration and current submissions establish fresh evidence; importing history does not automatically establish independent mastery.

## Portfolio progression

`src/content/projects.ts` defines the project briefs, deliverables, rubrics, prerequisites, and cost boundaries.

1. **Linux web service:** reproduce an Nginx setup, deliberately stop the lab service, diagnose it, recover it, and write a runbook.
2. **Automated health monitor:** build a small tool with tested success, failure, timeout, and input behavior.
3. **AWS static website:** explain HTTPS delivery and storage access, then supply actual deployment and cleanup evidence if claiming a live project.
4. **Resilient AWS web architecture:** document EC2/VPC/IAM/S3 relationships and test the failure claims made by the design.
5. **Terraform deployment:** manage a reviewed environment through plan, state, change, recovery, and teardown.
6. **Containerized application:** build a reproducible application with explicit runtime identity, ports, persistence, and health.
7. **Verified delivery pipeline:** prove that a failed check blocks release and that rollback restores a known artifact.
8. **Production-style capstone:** combine source control, Linux, AWS, Terraform, containers, delivery, security, observability, incident response, and independent review.

“Production-style” describes operational discipline; it does not assert that the learner has operated a business-critical service or achieved an SLA. A design-only artifact is labeled as such. Static browser exercises never provision AWS resources or accept costs on behalf of the learner. Live cloud work requires an authorized sandbox, current account/region price review, an explicit resource inventory, and cleanup evidence. Budget alerts are not a universal hard spending cap.

## Career gates and pacing

Month 4 and Month 6 are aspirational planning targets. Time elapsed, streaks, lesson views, and exam purchases cannot satisfy a career gate. The learner may reach the required evidence earlier or later depending on practice, available time, feedback, prior experience, and the jobs being targeted. Atlas does not guarantee employment or assign a precise hiring probability.

**Foundation Technician** means the learner can use the terminal, inspect a Linux system, and explain basic network observations. Relevant role families include IT support, operations trainee, and technical support technician. A Linux troubleshooting project is more useful here than a long list of untested commands.

**Cloud Support Ready / Month-4 target** requires terminal competence, service/process troubleshooting, networking foundations, Git collaboration, basic scripting, AWS concepts, identity reasoning, actual EC2/VPC/S3 evidence, useful documentation, at least two credible portfolio projects, and a clear account of the troubleshooting process. Missing evidence should appear as the next work to do. A cloud vocabulary exam or a design-only AWS lesson cannot replace actual operating evidence.

**Junior Cloud Engineer / Month-6 target** adds Linux administration, deeper networking, Bash/Python, practical AWS, Terraform, Docker, CI/CD, monitoring/logging, security, architecture reasoning, multiple projects, and a substantial capstone. Introductory bridges prepare the path; they are not by themselves proof of this entire capability set.

**Cloud Engineer** develops repeatable automation, delivery, reliability, incident ownership, and defended architectural choices across the same system. **Advanced Track** adds Kubernetes, deeper network/security administration, and distributed-systems reasoning only when the foundations and role direction justify it.

## Why these sources and certifications

The source comparison and current exam details are maintained in [RESEARCH.md](RESEARCH.md). The strongest influences are:

- Linux Foundation/LPI for foundation coverage, combined with Ubuntu and WSL guidance for the actual operating environment.
- Cisco for layered networking, Pro Git/GitHub for reviewable collaboration, and the Bash/Python references for precise automation behavior.
- AWS architecture and operations objectives for cloud scope, with Terraform and Docker supplying reproducibility and process packaging.
- GitHub Actions, OpenTelemetry, Google SRE, IAM guidance, and Well-Architected for failure detection, recovery, security, and tradeoffs.
- Kubernetes for the later orchestration branch, PowerShell for mixed environments, and responsible-AI guidance for verifying generated work.

Certification readiness uses additional checklists and legitimate practice exams. The catalog is a menu of alternatives: usually one optional foundation checkpoint, one relevant AWS associate credential, and a tool/specialty credential only when project work and target jobs justify it. The catalog’s practice threshold is an Atlas study target, not a vendor pass score. Do not buy all twelve exams merely because twelve options are listed.

## Expanding a section

Add depth in the smallest useful lesson units. Every new lesson needs a concrete task, likely failure, observable evidence, a recovery test, and later retrieval of earlier skills. Test demonstrations on the declared environment, verify version-sensitive documentation, and distinguish local simulation from real operation. Add a released lesson only when its practical can be attempted honestly; a topic name, diagram, or future idea remains backlog until teaching and evidence requirements exist.
