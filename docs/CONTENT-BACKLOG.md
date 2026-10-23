# Remaining curriculum depth

The personal Atlas School has **61 released lessons**: 22 foundational lessons, 14 introductory advanced lessons, 24 expanded lessons, and one AWS field checkpoint. Computing/web basics are available for beginners; the personal site preserves its existing prior-history record and saved evidence. The 22-section map expresses the intended breadth, not completion of every advanced subject or certification.

`src/content/index.ts` assembles the static lesson catalog. This document is an editorial gap register based on those lessons, not a verbatim copy of an `expansionBacklog` array. Client summaries and any code backlog should be reconciled when content is released. [CURRICULUM.md](CURRICULUM.md) describes current coverage; [CURRICULUM-EXPANSION.md](CURRICULUM-EXPANSION.md) lists the 24 additions and their verification limits.

## Work already released

Do not continue listing these as absent introductory teaching:

- Computing/file persistence, browser requests, and the editor/save/run loop.
- Bash values, defensive quoting, argument validation, branches, loops, functions, and a verified disposable file-copy/restore exercise.
- Python data/functions, JSON validation, a loopback HTTP client with timeout and explicit failure cases, and behavioral unit tests.
- SQLite schema constraints, bound queries, transactions, rollback, and a separate measured backup/restore exercise.
- Synthetic AWS Zone-capacity and change/error/recovery analysis, explicitly separated from provider operation.
- Local Terraform modules, input validation, outputs, and a state-preserving `moved` refactor.
- Dockerfile/build-context work, image replacement, Compose health diagnostics, and recovery.
- Local tested-artifact promotion, rejection of a bad candidate, digest comparison, and rollback.
- Scoped request signals, no-data handling, an object-authorization threat model, and permission tests.
- A local kind workload with explicit context/namespace, Service-selector failure, EndpointSlice inspection, in-cluster verification, and cleanup.

These are bounded practicals. For example, local artifact promotion does not complete hosted CI/CD, and a synthetic audit timeline does not complete CloudTrail operation.

## Acceptance and review priorities

1. **Clean-environment tool verification.** Execute the authored Terraform, Docker/Compose, and kind practicals on supported learner environments. Their authoring runtime lacked those tools; YAML parsing and documentation review are not runtime proof. Record setup/version details, intentional failure, recovery, and cleanup.
2. **Guided live AWS learning.** Turn the existing real-evidence checkpoint into a small sequence of account-aware provisioning/inspection/recovery lessons. Preserve cost review, scope, ownership, minimal permissions, and cleanup. Do not turn a free local exercise into an automatic paid action.
3. **Production-oriented integration.** Connect provider-backed Terraform, persistent application containers, protected hosted delivery, instrumentation, and security review through one reproducible small system.
4. **Independent assessment.** Add unfamiliar failure variants, delayed unaided tasks, accessible setup walkthroughs, and reviewer guidance before treating a larger lesson count as stronger career evidence.

New lessons need explanations, a runnable demonstration, guided practice, meaningful retrieval, a practical evidence contract, deliberate failure/recovery, hints/solution, and an independent challenge. New additions should offer at least four substantive retrieval items, with core recall and more than binary recognition. State exactly what was executed and what remains unverified.

## Remaining depth by section

| Section                               | Current foundation for further work                                                                     | Remaining teaching or proof                                                                                                                                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0–1: Computing, web, terminal, editor | Zero-start computing/web lessons plus terminal/file/stream/search/control and editor practice.          | More accessible environment setup; mixed unfamiliar tasks involving paths, quoting, pipelines, command lookup, and delayed recall.                                                                                                  |
| 2: Linux                              | Permissions, processes, jobs, services, logs, and resource inspection.                                  | Broader users/groups/ownership, package maintenance and patch verification; unrehearsed service/resource incidents and recovery checks.                                                                                             |
| 3–4: Networking and troubleshooting   | Address/DNS/HTTP observations and controlled Nginx failure/recovery.                                    | Contrasting bind, port, route, timeout, permissions, configuration, and upstream failures; diagnose from evidence rather than a memorized ladder.                                                                                   |
| 5: Git/GitHub                         | Commits, branches/conflicts, collaboration, README verification, and a failing/passing workflow.        | Unfamiliar remote divergence, issue-to-PR work, review quality, protected collaboration, and reproduction by another person.                                                                                                        |
| 6: Bash                               | Four focused language lessons plus the health-check introduction.                                       | Safe traversal and pipeline failure propagation; backup retention/rotation; idempotent deployment helpers with preview, rerun, and recovery behavior.                                                                               |
| 7: Python                             | Data/functions, file/JSON contracts, local HTTP failure handling, tests, and inventory.                 | CLI design, dependency/virtual-environment reproducibility, bounded retries/backoff, pagination, test doubles, safe subprocess argument lists, and scoped read-only SDK work.                                                       |
| 8: Cloud networking                   | Forward/return packet-path reasoning.                                                                   | Deeper CIDR/IPv6, overlapping networks, DNS caching/delegation, TLS trust/expiry failures, reverse proxies, VPNs, and multiple-route diagnosis.                                                                                     |
| 9: Cloud foundations/databases        | Responsibility/cost reasoning and local SQL/transactions.                                               | Managed database responsibility, indexes/query plans, migrations, concurrent isolation, replication/failover, provider restore drills, and current regional cost worksheets.                                                        |
| 10: AWS                               | Design and synthetic availability/incident lessons plus real-evidence field checkpoint.                 | Guided CLI identity/IAM/EC2/VPC/S3 operation; EBS, public IPv4, Route 53/HTTPS and Systems Manager; RDS/ALB/Auto Scaling failures; real CloudWatch/CloudTrail investigation; Lambda and queue retry/duplicate/dead-letter behavior. |
| 11: Terraform                         | Local lifecycle, module interface/validation, and address migration.                                    | Providers/data sources, imports and drift, lifecycle/replacement tradeoffs, remote-state access/versioning/locking/recovery, environment separation, and reviewed provider changes.                                                 |
| 12: Containers                        | Local image operation, custom build and replacement, Compose health failure/recovery.                   | Build-cache/layer investigation, persistent volumes/bind mounts, multi-service data integration, deeper network/DNS diagnosis, registry digests, provenance and vulnerability review.                                               |
| 13: CI/CD                             | Failing checks and local tested-artifact promotion/rollback.                                            | Hosted multi-job delivery, identity federation, untrusted-PR boundaries, minimum permissions, protected environments/approvals, artifact provenance/signing, canary/blue-green rollout, and data-compatible rollback.               |
| 14: Observability/reliability         | Request indicators, scoped fixture signals, runbooks, and measured local SQLite recovery.               | Instrument a real service with logs/metrics/distributed traces; representative load, dashboards, missing/delayed signals, alert tuning/burn rates, full incident timing, and tested prevention follow-ups.                          |
| 15: Security                          | Least-privilege review and tested object authorization.                                                 | Real authentication/session lifecycle, MFA/temporary identity, secret rotation, IAM evaluation, network policy, TLS/encryption, SSH/patch hardening, dependency/image triage, and remediation verification.                         |
| 16: Kubernetes                        | Manifest reading and local Deployment/readiness/Service recovery.                                       | Broader setup troubleshooting, events/logs, pending/image/crash-loop failures, configuration/secrets, RBAC/network policy, persistent storage, ingress/gateway/TLS, scaling, rollout/rollback, Helm, and control-plane operation.   |
| 17: PowerShell                        | Introductory object pipeline and mixed-environment distinctions.                                        | More filesystem/environment/permission practice, Windows networking, safe process/service tasks, and explicitly authorized remote administration.                                                                                   |
| 18: AI-assisted work                  | Suggestion review, verification, and unaided explanation.                                               | Adversarial code/command reviews, weak-test detection, architecture critique, private-input handling, and delayed equivalent tasks without assistance.                                                                              |
| 19: Architecture                      | Requirements/tradeoffs, failure domains, synthetic capacity, SQL and local recovery supporting lessons. | Caching behavior, queue idempotency/retry implementation, measured latency/throughput tradeoffs, representative load, and end-to-end failure/dependency experiments.                                                                |
| 20: Portfolio                         | Eight project briefs with stronger scripting/container/delivery/recovery preparation.                   | Staged AWS/provider milestones, persistent application integration, budget-appropriate capstone variants, acceptance fixtures, reviewer guides, and independently reproduced evidence.                                              |
| 21: Career gates                      | Evidence-based capability gates and project requirements.                                               | Varied support tickets, unfamiliar end-to-end change/incidents, role-specific walkthroughs, and clear reviewer/evidence provenance.                                                                                                 |

## Boundaries that remain visible

A local simulation is not a live provider observation. A healthy process is not proof of an entire request path. One local node does not demonstrate physical redundancy. A successful restoration must disclose its recovery point and any lost changes; a backup file alone is insufficient. A protected artifact digest is useful integrity evidence, not automatic proof of trusted provenance.

Cloud practicals require current provider guidance, explicit ownership, account/region cost inputs, authorized scope, and post-cleanup inspection. A stopped resource does not establish that associated charges ended. Kubernetes and provider certification preparation require their complete current objectives; the lessons are not advertised as exam-complete.

Saved rubric checks, independence declarations, and reviewer notes remain assertions unless independently verified. Account-backed persistence does not authenticate a reviewer or validate a remote system. Calendar targets and completed lesson counts do not guarantee career readiness or employment.

## Source, video, and assessment maintenance

- Recheck version-sensitive references when revising a lesson. Use the dated research records for certification names/objectives and verify current provider prices before paid work.
- Maintain the optional external video catalog, checking lesson alignment, official provenance, link behavior, captions, and accessible alternatives. Do not retain the old assumption that the library contains only two MIT links. Link inspection alone does not prove playback in every region.
- Preserve attribution and distinguish curated external teaching from Atlas-authored content. Video views do not satisfy practical evidence.
- Expand retrieval variants and delayed scenarios. Deterministic answer matching cannot judge every valid shell solution or explanation; practical review remains necessary.
- Keep legitimate exam practice scores separate from external credentials and operating ability. Atlas thresholds are study targets, not vendor pass scores.

When closing an item, record the lesson IDs and verification evidence, then remove the satisfied introductory scope from code summaries and this register. Preserve the remaining operational depth explicitly instead of either repeating completed work or declaring the entire topic finished.
