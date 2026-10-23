# Dual-site implementation report · October 23, 2026

Repository: `christopher-kiser/project-atlas-school`. Branch: `feat/six-month-cloud-pathway`. This is a review change; no merge or deployment was performed.

## Audit and preserved behavior

The initial implementation contained 61 released lessons, 22 sections, eight portfolio briefs, 12 credential checkpoints and 24 videos. Existing guides, retrieval grading, hint tracking, spaced review, delayed practical evidence, competency gates, draft recovery and validated export/import were inspected rather than inferred from documentation. The A–T domain analysis and all eight portfolio reviews are in [EDUCATIONAL-AUDIT.md](EDUCATIONAL-AUDIT.md).

The application remains public, free and browser-local. No sign-in, payment dependency or automatic GitHub backup has been added.

## Implemented educational changes

- Six competency-paced monthly phases targeting April 2027, with linked lessons, credential options, portfolio work, independent tasks and interleaved/delayed review. Month 3 provider-backed Terraform completion is explicitly deferred until the authorized AWS field checkpoint.
- Two substantive prerequisite lessons: `python-cli` (help, required options, quoted paths, JSON shape, stdout/stderr, tested statuses) and `network-cidr` (alignment, address capacity, ordinary AWS reservations, overlap, failure and repair). Each has five retrieval items and guided/independent evidence. Total: 63 released lessons and 223 exercises, retaining all original 61 lesson and 213 exercise IDs.
- Seven researched credential routes added to the 12 preserved IDs: Cisco Networking Basics, IBM Cloud Computing Fundamentals, OCI Foundations, OCI Architect Associate, Microsoft Azure management Applied Skills, AWS Cloud Essentials badge, and AWS Serverless Demonstrated. Six are verified free credential routes; Microsoft assessment pricing remains conditional. Cards separate credential type, training/assessment costs, eligibility, mapped lessons and missing preparation. Sources and dated limits: [CREDENTIAL-RESEARCH.md](CREDENTIAL-RESEARCH.md).
- 28 original AWS teaching scenarios, 14 each for CLF-C02/SAA-C03, covering all eight exam domains with four options, rationales and lesson remediation. They are short repeatable teaching sets, not unseen full mocks or a pass prediction. Remedial links open in a new tab to preserve the current session.
- Separate saved study results and self-reported earned credentials, with earned dates and optional safe links. Neither awards lesson mastery, provider verification, course entitlement or mock readiness. Failed saves retain the form/session for retry.
- Three staged evidence milestones for each of the existing eight projects. Original project IDs and five-item acceptance rubrics remain unchanged. AyerOps appears only as an optional defensible case study; its repository was not accessed or modified.
- A 17-module content allowlist and SHA-256 manifest keep equivalent content reviewable across both apps. `npm run check:curriculum` works independently; copying requires explicit `--from <reviewed-checkout> --write` and refuses dirty target content. Application adapters remain separate.

## Progress compatibility and access

Optional `kind` and `credentialUrl` fields extend the existing version-1 certification collection. Old records retain absent fields and their original values. Legacy records are still practice scores; new teaching sets are `study`; reported awards are `credential` with a zero sentinel that is never shown as a percentage. `isPracticeScore` restricts exam-readiness selection to legacy/explicit practice records.

Validation and immutable merge reject unsafe URLs, invalid combinations and conflicting IDs atomically. Repeated imports deduplicate; failed writes retain the old record. No migration or reset is needed. A frozen pre-change content identity fixture protects historical lesson/exercise references. Compatibility is directional: older deployed strict readers reject new optional fields. A later rollout must retain compatible readers, and Academy client/Worker must update together. Preserve an export before any rollback; never strip evidence to make an old reader accept it.

Academy serves the new question bank only to entitled accounts, through its existing authenticated server response; no question prompt or explanation is bundled in public JavaScript. Anonymous outlines and the existing three registered preview lessons retain their boundaries. Public school material remains open.

## Verification

| Gate                       | Result                                                           |
| -------------------------- | ---------------------------------------------------------------- |
| `npm run lint`             | Passed                                                           |
| `npm test`                 | 114/114 passed                                                   |
| `npm run build`            | Passed                                                           |
| `npm run test:e2e`         | 15/15 Chromium checks passed against the built local application |
| `npm run check:curriculum` | 17/17 modules match manifest; both repositories match each other |
| `git diff --check`         | Passed                                                           |

The initial new legacy-ID fixture used a source-text scan that missed generated exercises; it was replaced with a frozen actual pre-change catalog (61 lessons / 213 exercises). Initial browser selectors assumed the old default credential and a guessed title; they were corrected to the actual UI and the complete suites rerun. No failing checks are being reported as passes. Hosted GitHub CI status is separate from these local results and is recorded in the pull request.

Browser curriculum tests open every released lesson, select every listed command and check guides, vocabulary, walkthrough, breadcrumbs and video availability. Progress tests cover correct/incorrect/hinted retrieval, practical image evidence, backup restoration to a fresh browser, duplicate/malformed imports, drafts, portfolio attestations and refresh. Added browser coverage saves separate study/credential records without lesson credit, checks six-month navigation, mobile width and accessible credential forms. Academy additionally exercises real Worker access policy against fixture provider responses and checks the built public assets for teaching leakage.

The two new Python demonstrations were executed with synthetic local fixtures: ten CLI status/stream cases, a path with spaces, unchanged inputs, invalid-data recovery, CIDR rejection/capacity/overlap and repair. No learner commands were executed against a host service, real cloud account or paid resource.

## Remaining gaps and deployment readiness

This is a stronger foundation, not an exhaustive professional program. A–T gaps include deeper Linux administration, IPv6/TLS/routing, Python environments/retries/pagination, guided real IAM/EC2/VPC/S3 operations, remote Terraform state, production delivery, multi-node Kubernetes, instrumented telemetry and repeated backup/recovery incidents. Next milestone: one reviewed end-to-end AWS field practical with denied-access, failure, recovery, cost and cleanup evidence, only after separate authorization.

Live account sign-in across browsers, real provider-issued awards, live payment/refund acceptance, hosted performance and real AWS competency were not established by local fixtures. The commercial product's existing payment/legal launch gates remain separate. No external services were provisioned or paid for.

Ready for source review once the verification table passes; production rollout remains withheld by instruction. Personal build emits the existing large-curriculum-chunk warning (about 797 kB uncompressed / 254 kB gzip); future lesson-level loading would reduce the initial content payload. No production behavior has changed until a separately authorized merge/deployment.
