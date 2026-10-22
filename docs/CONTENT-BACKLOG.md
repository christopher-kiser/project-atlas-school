# Content depth and expansion backlog

Atlas has a complete competency map, foundational lessons, usable later bridge lessons, project briefs, and evidence gates. It does **not** yet contain the full teaching depth required to independently learn every advanced topic or prepare for every listed certification. A released bridge is a real bounded lesson; it is not a claim that its entire section is complete.

`src/content/index.ts` owns the executable `expansionBacklog`. The bullets labeled **Manifest items** below reproduce that list. Additional bullets make the original topic breadth and acceptance work explicit. `sections.ts` remains the full topic map. Keep the manifest and this document aligned when work is released; do not remove an obligation merely because its heading exists in the interface.

## Release standard for new lessons

An expansion is ready when it has a concrete explanation, a tested demonstration on its declared environment, guided practice, at least two distinct unaided retrieval opportunities, a practical with evidence and rubric, an intentional failure, a verification step, hints/solution, and delayed reuse in a later task. Introduce a small command set at a time. A broad service survey should not masquerade as an operational lab.

Each lesson must distinguish a real system observation from a simulated result or a proposed design. Cloud labs require current provider instructions, an account-specific cost preflight, resource ownership, minimal permissions, and cleanup verification. No content expansion should silently turn a free local task into an automatic paid deployment.

## Foundation reinforcement: sections 0–5

The foundation sequence covers the existing learner’s terminal, Linux, network, Nginx, and Git path. After the released teaching, add more unfamiliar scenarios and delayed assessments rather than making the learner repeat a long introductory course.

- **0 Engineering mindset:** add varied observation/hypothesis/fix/verification tickets; documentation lookup exercises; command-safety explanations; AI-generated command review followed by an unaided repeat.
- **1 Terminal/filesystem:** extend mixed exercises combining paths, wildcards, redirection, file descriptors, pipelines, search, file operations, `$PATH`, builtins, history, completion, manual lookup, exit codes, `&&`, and `||`. Include spaces in filenames, empty results, failed pipeline stages, overwritten files in a disposable fixture, and a delayed command-recall circuit.
- **2 Linux administration:** revisit users/groups, symbolic and numeric permissions, ownership, `sudo`/root boundaries, PID/PPID, `ps`/`top`, foreground/background jobs, signals, services, packages, logs, disk, and memory. Require selecting evidence and verifying the smallest repair without rehearsed command order. Distinguish installed/enabled/active and available memory from unused memory.
- **3 Networking foundations:** deepen IPv4/IPv6, private/public/loopback addresses, CIDR, gateways/routes, DNS resolvers, `/etc/resolv.conf`, `ping`, `getent`, `dig`/`nslookup`, TCP/UDP, ports/sockets, `ss`, HTTP/HTTPS, `curl`, NAT, and firewalls. Build contrasting cases for refused connections, timeouts, DNS failures, and route failures; no single symptom should be taught as proof of one cause.
- **4 Troubleshooting:** expand the known Nginx stopped-service lab into incorrect bind address, wrong port, application error, permissions, configuration validation, and upstream failure cases. Keep the ladder service → process/application → socket → interface → route → DNS/firewall/upstream as a hypothesis guide, not an inflexible universal order. Verify recovery from the original client perspective.
- **5 Git/GitHub:** add unfamiliar merge conflicts, remote divergence, narrow staging, secret-free `.gitignore` review, issue-to-PR workflows, README reproduction by another person, and a small failing/passing Actions exercise. Revisit `init`, `clone`, `status`, `add`, `commit`, `log`, `diff`, `switch`, `merge`, `pull`, `push`, and remotes in realistic tickets.

These are reinforcement and scenario-expansion obligations, not assertions that the current foundations omit every named concept. The released lesson objects provide the exact current scope.

## 6 — Bash and automation

Current bridge: `bash-health`, a bounded HTTP check using an argument, quoting, branching, and truthful exit status.

**Manifest items**

- Loops, functions, arguments, and defensive quoting
- Backup rotation and restore tests
- Idempotent deployment helpers

**Additional breadth and proof**

- Teach variables versus environment variables, positional parameters, shell expansion, shebangs, execute permissions, and conditions in separate small tasks before combining them.
- Add log parsing, safe file traversal, malformed-input handling, and failure propagation through pipelines. Explain the limitations of generic “strict mode” recipes instead of prescribing them blindly.
- Make the backup practical prove restoration and preserve originals; make the deployment helper safe to rerun, with preview, failure, and recovery behavior.

## 7 — Python for cloud engineers

Current bridge: `python-inventory`, a JSON report with a small function, malformed-data behavior, and standard-library testing.

**Manifest items**

- HTTP APIs with timeouts and retries
- subprocess argument safety
- Cloud SDK pagination, error handling, and tests

**Additional breadth and proof**

- Add beginner steps for syntax, variables, strings/numbers/booleans, lists/dictionaries/sets, loops, functions, return values, modules, and imports. Do not assume one list comprehension teaches programming fluency.
- Expand files/JSON, context managers, specific exceptions, input schemas, CLI arguments, virtual environments, and dependency installation/reproducibility.
- Teach `requests`, status/error handling, bounded retries and backoff, rate limits, pagination, and test doubles against local fixtures before contacting a cloud API.
- Add `subprocess.run` argument lists, return codes, timeout behavior, and output inspection. A string passed to a shell is not interchangeable with an argument list.
- Build a read-only SDK inventory tool with scoped authentication, empty-page cases, permission denial, and mocked tests. Never embed credentials in examples or fixtures.

## 8 — Networking for cloud

Current bridge: `cloud-packet`, packet-path reasoning and separation of routes, listeners, firewall controls, and TLS.

**Manifest items**

- Subnetting drills and IPv6 packet paths
- TLS/reverse-proxy failure lab
- VPN and multi-network route diagnosis

**Additional breadth and proof**

- Extend CIDR beyond a single `/24`: address ranges, overlapping networks, prefix selection, and provider reservations. Check both forward and return paths.
- Add NAT behavior, DNS caching/delegation, reverse proxies, load-balancer listeners and health checks, and the distinction between transport success and application success.
- Introduce certificates, names, trust, expiration, and time-related failures. Disabling certificate verification is not an acceptable repair.
- Use local or authorized simulated networks before paid cloud networking. CCNA switching/wireless depth remains an optional separate specialization.

## 9 — Cloud foundations

Current bridge: `cloud-model`, responsibility boundaries, regions/zones, small-system choices, and cost-aware planning.

**Manifest items**

- Managed databases and responsibility boundaries
- High availability vs disaster recovery
- Cost estimation with current regional inputs

**Additional breadth and proof**

- Add focused comparisons of compute, object/block/file storage, networking, managed databases, IAM, serverless, scaling, load balancing, and observability.
- Teach elasticity, high availability, fault tolerance, backup, recovery-point and recovery-time objectives through different failure cases.
- Compare fixed and usage-based costs, request/storage/transfer charges, ownership, quotas, and the limits of free offers. Avoid time-independent “always free” assumptions.

## 10 — AWS core

Current bridge: `aws-plan`, a design-only service proposal. Separate checkpoint: `aws-field`, requiring real, redacted EC2/VPC/S3/IAM observations. The field checkpoint is an evidence assignment; it is not a complete guided AWS provisioning course.

**Manifest items**

- Guided EC2/VPC/S3 provisioning with budget preflight
- EBS, Elastic IP, Route 53, and Systems Manager labs
- RDS, ALB, and Auto Scaling failure drills
- CloudWatch/CloudTrail investigation
- Lambda and SQS/SNS failure/retry patterns

**Additional breadth and proof**

- This is a high-priority expansion for the cloud-support gate: provide small, independently testable labs for AWS CLI context, IAM roles/policies, EC2, EBS, S3, VPC, subnets, route tables, Internet Gateway, public/private access, NAT concepts, security groups, and NACLs.
- Add current identity setup guidance without storing credentials, read-only inspection before mutation, denial diagnosis, and scoped allowed/denied access tests.
- Make Route 53, HTTPS delivery, Elastic IP/public IPv4 allocation, Systems Manager dependencies, RDS backup/restore, and ALB health checks explicit tasks with cost and cleanup checks.
- Introduce Auto Scaling desired capacity versus health, CloudWatch logs/metrics/alarms versus CloudTrail API audit evidence, and event-driven Lambda/SQS/SNS behavior including duplicate delivery, retry, and dead-letter handling.
- For every live lab, provide an ownership inventory, current-price input worksheet, teardown steps, and post-teardown inspection. A stopped instance does not prove charges have ended.

## 11 — Infrastructure as code

Current bridge: `terraform-local`, the lifecycle of a local built-in resource. It does not claim proficiency with an AWS provider or team-managed state.

**Manifest items**

- Provider modules, imports, lifecycle and data sources
- Remote state locking and recovery
- Separate environment deployment practical

**Additional breadth and proof**

- Expand HCL types/expressions, providers, resources, variables, outputs, data sources, dependencies, module contracts, and version constraints through isolated exercises.
- Add reviewed AWS plans, replacement/destroy detection, drift versus configuration changes, import strategy, lifecycle tradeoffs, remote state access, locking contention, state recovery, and separate environments.
- Include the current Terraform Associate 004 scope such as validation conditions and sensitive-data handling, while distinguishing an exam objective from a production authorization boundary.

## 12 — Containers

Current bridge: `docker-local`, a local Nginx container with loopback port publication, logs, stop/start, and narrow cleanup.

**Manifest items**

- Dockerfile layering and build cache
- Compose health, volumes, and networks
- Registry digests and image review

**Additional breadth and proof**

- Teach Dockerfile authoring, build contexts, build/run differences, `logs`, `exec`, environment variables, users, filesystems, and lifecycle in a small application.
- Demonstrate persistence across container replacement, named volumes versus bind mounts, inter-container DNS/networking, health checks, Compose startup limitations, and configuration failures.
- Build and pull from a registry, explain tags versus digests, review image provenance/vulnerabilities, and test deploy/restart/rollback behavior without privileged containers or exposing the Docker socket.

## 13 — CI/CD

Current bridge: `ci-contract`, a check workflow and a deliberately failing test. Its example does not deploy an application.

**Manifest items**

- OIDC deployment identity
- Approvals, branch protection, and artifact promotion
- Blue/green and canary rollout exercises

**Additional breadth and proof**

- Build separate test, build, artifact, and deployment jobs with explicit dependencies. Prove that the exact tested artifact is the one deployed.
- Add secrets/environment handling, untrusted PR boundaries, minimum permissions, supported runtime selection, action version review, and deployment approvals.
- Demonstrate a blocked release, a controlled deployment failure, and rollback to a named revision/digest. Verify current free-runner and usage limits before execution.

## 14 — Observability and reliability

Current bridge: `reliability-sli`, a request-success calculation and a runbook/incident exercise.

**Manifest items**

- Instrumented logs/metrics/traces lab
- Alert tuning and burn rates
- Timed incident simulation

**Additional breadth and proof**

- Instrument a real small service and correlate a user symptom with structured logs, metrics, and traces; add dashboards without treating chart creation as proof of observability.
- Expand health-check scope, SLI denominator/window, SLOs, SLA distinctions, missing data, delayed signals, false alarms, and action-oriented alerts.
- Run an unfamiliar failure, preserve a timeline, separate contributing factors from symptoms, verify recovery, and test a prevention action in a postmortem follow-up.

## 15 — Cloud security

Current bridge: `security-review`, least-privilege reasoning and a concrete review exercise.

**Manifest items**

- SSH hardening and patch verification
- Secrets rotation drill
- Cloud vulnerability and audit investigation

**Additional breadth and proof**

- Expand IAM evaluation and resource scope, MFA, temporary credentials, secret storage/rotation, encryption at rest/in transit, TLS, and least-privilege network boundaries.
- Add backup-before-change, patch validation, SSH identity/configuration review, deliberate allowed/denied requests, and audit-log interpretation.
- Teach vulnerability triage, dependency/image review, secure pipeline identity, and remediation verification. Do not equate a scanner’s absence of findings with proof of security.

## 16 — Kubernetes and cloud native

Current bridge: `kubernetes-read`, a manifest-reading lesson. Cluster administration remains a substantial later expansion.

**Manifest items**

- Local cluster installation lab
- ConfigMap/Secret and namespace boundaries
- Ingress, Helm, scaling and rollout failures

**Additional breadth and proof**

- Teach cluster/control plane/node/pod/deployment/service relationships, YAML, `kubectl` context and namespace selection, logs/events, and local application deployment.
- Add configuration and secret limitations, service discovery, ingress controllers, resource requests/limits, health/readiness, scaling, rollout/rollback, and Helm release management.
- Diagnose pending pods, image failures, crash loops, readiness failures, and broken service selection. Separate local exercises from managed-cloud cluster costs.
- CKA preparation additionally needs its complete current cluster-lifecycle, storage, networking, and troubleshooting curriculum; this section alone must not be labeled exam-complete.

## 17 — Windows and PowerShell

Current bridge: `powershell-bridge`, translating Linux inspection habits to an object pipeline.

**Manifest items**

- PowerShell environment and permissions lab
- Remote administration boundaries
- Windows network diagnostic practical

**Additional breadth and proof**

- Add filesystem navigation, filtering/formatting objects, `Get-Process`, `Get-Service`, and safely stopping a learner-created test process with `Stop-Process`.
- Practice environment variables, services, permissions, networking tools, WSL host/guest paths, and differences between PowerShell, Bash, and macOS tooling.
- Introduce remote administration as an identity, transport, authorization, and audit problem. Use an explicitly authorized lab endpoint rather than a shared or production host.

## 18 — AI-assisted engineering

Current bridge: `ai-verify`, a proposed-change review with independent explanation and verification.

**Manifest items**

- AI-generated patch adversarial review
- Test generation and architecture critique
- Delayed unaided troubleshooting assessment

**Additional breadth and proof**

- Add separate exercises for command/code generation, debugging, log analysis, architecture review, documentation, test generation, and automation.
- Include plausible but wrong flags, invented APIs, weak tests, unnecessary privileges, missing timeouts, and inaccurate summaries. Require sources or local verification for technical claims.
- Redact private input, limit scope, inspect the actual patch, run meaningful tests, and explain critical commands. Finish with an equivalent task without AI so assistance cannot conceal a dependency.

## 19 — System design and architecture

Current bridge: `architecture-tradeoffs`, requirements and failure reasoning for a small system.

**Manifest items**

- Caching and database tradeoffs
- Queue retry/idempotency implementation
- Restore rehearsal and cost/performance study

**Additional breadth and proof**

- Give availability, scalability, latency, throughput, caching, queues, databases, state, stateless services, redundancy, and failure domains concrete examples and measurable constraints.
- Implement stale-cache behavior, duplicate-message handling, retry limits, durable versus ephemeral state, and database backup/restore in small systems before discussing large architectures.
- Compare a single-node and redundant design, measure one performance tradeoff, run failure/recovery experiments, and record which requirements remain unmet. Distinguish expected behavior from tested behavior.

## 20 — Portfolio studio

The eight briefs are present in `projects.ts`; each still requires learner implementation, evidence, and review. Project completion is never implied by the existence of its brief.

- Provide worked teaching companions and starter fixtures for the Linux service and health monitor without replacing the independent project attempt.
- Expand the AWS static website and resilient web architecture assignments into staged milestones with current HTTPS/access guidance, actual failure tests, cost review, and teardown.
- Add provider/state scaffolding for the Terraform project; Dockerfile/Compose teaching for the container project; and artifact promotion plus a working rollback for the CI/CD project.
- Add capstone variants appropriate to a small budget, acceptance fixtures, monitoring demonstrations, recovery rehearsals, architecture-review prompts, and an independent reviewer guide.
- Keep all repositories readable: setup, architecture, decisions, verification, known limitations, operational runbook, cost assumptions, and cleanup. A screenshot without context is not reproducibility evidence.

## 21 — Career and independent gates

Career gates are capability checks, not promises or calendar awards. Month-4 and Month-6 remain planning targets conditional on demonstrated skills and credible projects.

- Expand the cloud-support gate into varied service, network, identity, and scripting tickets requiring an explanation and evidence, not a memorized command chain.
- Expand the engineering gate into end-to-end unfamiliar change and incident scenarios covering AWS, Terraform, containers, CI/CD, monitoring, security, architecture, and the capstone.
- Add role-specific project walkthroughs and interview prompts for IT support, NOC, cloud support, junior cloud engineering, and later platform/operations roles. Compare requirements with actual target vacancies rather than publishing a numerical employability score.
- Make reviewer identity and machine-verification limits clear. An editable local attestation cannot authenticate the reviewer or independently verify a remote system.

## Resource, certification, and assessment maintenance

- Recheck version-sensitive sources when expanding content. The dated research identified Linux Essentials 010-200, Terraform Associate 004, AWS CloudOps SOA-C03, and GitHub Foundations GH-900; do not silently revert to older labels.
- Verify current CompTIA objectives and pricing before adding Tech+/A+ options. Their first-party pages were not recoverable in the initial research, so the catalog deliberately avoids invented current details.
- Review external links on reported failure or scheduled editorial review. HTTP 403/429 from an automated fetch is a restriction, not proof that a human-facing page is broken. A successful HTTP response alone does not prove a lab or video works end to end.
- The two selected MIT YouTube links have verified titles and official lecture-page provenance. Playback, captions, and geographic availability remain untested.
- Expand retrieval variants and delayed scenarios before increasing the number of badges. Static deterministic answer matching cannot assess every valid shell solution, natural-language explanation, or real-world configuration; practical review remains necessary.
- Keep exam practice scores separate from earned external credentials and practical ability. The Atlas practice threshold is an editorial target, not a vendor pass score or employment predictor.

## Priority order

First expand the operational path needed by the cloud-support gate: Git fluency, Bash/Python basics, network diagnosis, and guided cost-aware AWS work. Then deepen the engineering path: provider-backed Terraform, application containers, real artifact delivery/rollback, instrumentation, and security verification. Expand the capstone alongside those lessons. Kubernetes, advanced networking/security certifications, and broader distributed-systems topics follow demonstrated foundations rather than displacing them.
