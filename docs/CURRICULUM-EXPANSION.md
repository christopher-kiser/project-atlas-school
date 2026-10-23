# Atlas Academy curriculum expansion

This pilot adds **24 authored, released lessons and 96 retrieval exercises** in `src/content/expanded.ts`. Existing lesson IDs and content remain intact. Each added lesson includes explanations, a worked example, practice prompts, at least four graded exercises, a guided practical, evidence requirements, a rubric, hints, a solution, and an independent challenge.

The addition covers a path from ordinary computing to local infrastructure tools and operational reasoning. It does **not** certify production competence or claim exhaustive cloud coverage. The authored time estimates total 1,295 minutes (about 21 hours 35 minutes); setup, repeated practice, independent challenges, review delays, and evidence assessment can take substantially longer.

## Added lessons and practical depth

| Section | Stable lesson ID        | Practical evidence                                                                                                                                                           |
| ------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0       | `computing-basics`      | Create, save, close, reopen, and inspect an ordinary text file; distinguish persistent storage from a running program.                                                       |
| 0       | `web-foundations`       | Inspect a public browser request and explain client, server, URL, response, and browser-local data.                                                                          |
| 1       | `editor-workflow`       | Save and execute a short Python file; diagnose and repair an actual syntax error.                                                                                            |
| 6       | `bash-values`           | Preserve spaces in filenames and arguments, compare quoted and unquoted expansion.                                                                                           |
| 6       | `bash-decisions`        | Validate arguments and file inputs, return distinct statuses, and separate diagnostics from normal output.                                                                   |
| 6       | `bash-loops`            | Process a safe filename glob with empty-directory and missing-directory cases.                                                                                               |
| 6       | `bash-functions`        | Copy a fixture without replacing an existing destination, verify hashes, and test a restoration.                                                                             |
| 7       | `python-data`           | Transform typed service records with a loop and function; distinguish data types and return values.                                                                          |
| 7       | `python-files-json`     | Read UTF-8 JSON and reject malformed content, wrong shapes, invalid ports, and boolean-as-integer input.                                                                     |
| 7       | `python-http-api`       | Query a loopback JSON endpoint with timeout, size limit, and separate HTTP, transport, and response-contract failures.                                                       |
| 7       | `python-testing`        | Prove a deliberate port-validation regression is caught, then repair and extend the tests.                                                                                   |
| 9       | `database-sql`          | Use in-memory SQLite schema constraints, parameter binding, filtering, and explicit result ordering.                                                                         |
| 9       | `database-transactions` | Inject failure between debit and credit, roll back, and verify individual balances and the total.                                                                            |
| 10      | `aws-availability`      | Calculate remaining capacity after a fictional Zone loss and identify a shared stateful dependency. **Simulation, not AWS operation.**                                       |
| 10      | `aws-operations`        | Reconstruct a synthetic change/error/recovery timeline and test the suspected configuration effect locally. **Synthetic records, not actual CloudTrail exports.**            |
| 11      | `terraform-modules`     | Initialize a local child module, reject invalid inputs, review a built-in-resource plan, and verify outputs.                                                                 |
| 11      | `terraform-state`       | Compare an unintended replacement plan with a `moved` migration and preserve the tracked object ID.                                                                          |
| 12      | `docker-build`          | Build a local image, inspect its identity/user, observe that a rebuild does not update a running container, replace, verify, and clean up.                                   |
| 12      | `docker-compose`        | Validate a Compose project, deliberately break a health-check path, inspect diagnostics, recover, and remove the named project.                                              |
| 13      | `cicd-artifacts`        | Test and hash a release, reject an invalid candidate, promote the tested bytes, and verify a rollback. **Local pipeline mechanics, not a hosted deployment.**                |
| 14      | `observability-signals` | Compute scoped request/error signals, handle missing observations, test the report, and investigate a correlated request.                                                    |
| 14      | `reliability-incident`  | Back up a temporary SQLite database through its API, damage only the fixture, restore separately, verify contents, and disclose lost changes and measured recovery duration. |
| 15      | `security-threat-model` | Model a report-access boundary, catch a missing object-authorization check, and test owner/nonowner/anonymous/missing-object cases.                                          |
| 16      | `kubernetes-workloads`  | Operate a disposable local kind cluster, break only a Service selector, inspect EndpointSlices, recover in-cluster requests, and delete that named lab cluster.              |

The added lessons use existing resource IDs. Optional external videos are curated separately by the research lane. Atlas does not claim ownership of those videos, and watching them is not evidence of completing a practical.

## Learning sequence and assessment boundaries

New learners begin with `computing-basics` and `web-foundations`; neither assumes the original user's history. `editor-workflow` follows foundational file navigation. The existing terminal, Linux, network, troubleshooting, and Git lessons supply prerequisites before scripting. The new Bash and Python skills then lead to the existing introductory cloud/tool lessons and their expanded practicals.

The personal site orders prerequisite lessons before dependent lessons within each section. Computing and web basics appear first for learners who need them; the dashboard retains the original learner’s continuation preferences. Stable IDs preserve saved evidence and bookmarks.

Commands and code identifiers retain case-sensitive grading where spelling changes behavior. Conceptual terms such as authentication, Availability Zone, EndpointSlice, RPO, and RTO accept case-insensitive answers. Every new lesson has at least four meaningful exercises, including core recall. A successful answer demonstrates the specific retrieval item; it does not prove the external practical occurred.

Practical evidence is manually produced by the learner. The site executes no local commands. A missing Python, Terraform, Docker, Compose, kind, or kubectl prerequisite is incomplete setup, not a successful practical. A diagram can support an architecture lesson but cannot replace actual tool observations in a tool-operation lab. The original AWS field checkpoint remains a separate requirement for real, authorized cloud evidence.

## Local execution boundaries

- Linux examples use the learner's own Ubuntu WSL2 environment or disposable Ubuntu VM. macOS and Windows can be clients; Linux service-management commands are not represented as native macOS commands.
- Authored files live below `~/atlas-labs/expanded`; the recovery example uses a freshly created Python temporary directory and never accepts an existing database path.
- HTTP fixtures bind to loopback. The Python client disables environment proxies for its fixed local URL. Docker host publishing explicitly binds `127.0.0.1`.
- Terraform lessons use only the built-in `terraform_data` resource, no external provider or backend, no credentials, and no paid resources. Learners review the plan before their local apply.
- Container lessons require the learner's verified local Linux-container context. They use named resources, no privileged mode, no host Docker socket mount, and no global prune operation.
- Kubernetes uses only a newly created local kind cluster named `atlas-expanded`; every kubectl cluster operation states the intended context and namespace when relevant. Two replicas on one local node are not multi-Zone availability evidence.
- AWS additions perform no AWS API calls, provisioning, account changes, or spending. No live prices or free-tier promises are embedded.
- All report identities, incident events, and database records are invented. No real secrets or production logs are requested.

## Verification performed for this addition

Checked on 2026-10-22:

- Standalone TypeScript compilation and ESLint for `expanded.ts` passed.
- An independent content check resolved prerequisite references and cycles across existing foundation/advanced lessons and this addition, existing resource IDs, globally unique exercise IDs, and the new teaching/evidence contracts. The added set contains exactly 24 lessons and 96 exercises.
- All authored Python demo programs parsed; all four Bash demo scripts passed `bash -n`.
- Executed Bash fixtures for quoted arguments, missing/invalid inputs, a leading-dash filename, empty and populated log globs, copy integrity, and refused overwrite. JSON validation also accepted the intended fixture and rejected boolean/invalid ports, wrong root shape, and an empty name.
- Parsed both Compose and Kubernetes YAML, checked the embedded health-check Python syntax, and verified that the initial Service selector matches the Deployment's Pod labels.
- Executed the Python data, SQL, transaction, availability-model, incident-timeline, signal-report, and SQLite recovery fixtures in isolated local processes/temporary directories. Their expected results passed.
- Executed both included unittest examples: port validation and object authorization passed their four original tests each.
- Exercised the local HTTP client against a temporary loopback server: valid JSON succeeded; malformed JSON, wrong schema, excessive body, HTTP 404, and connection refusal returned the intended status categories.

Terraform, Docker, and kind were not installed in this authoring runtime. Their labs were checked against primary documentation and reviewed for syntax, scope, prerequisites, failure injection, and verification logic, but were **not executed here**. They still need a clean-machine run on the supported learner environment before operational reproducibility is asserted. The parent integration lane owns combined catalog tests and browser workflow testing; this document does not claim those checks were performed by the content lane.

## Official technical sources checked

These sources support specific implementation decisions; they do not replace the original authored explanations or grant permission to redistribute external videos.

| Source                                                                                                                          | Decision supported                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Python sqlite3 documentation](https://docs.python.org/3/library/sqlite3.html)                                                  | Bound SQL parameters, explicit transaction ownership, and the connection backup API.                                     |
| [Python http.server documentation](https://docs.python.org/3/library/http.server.html)                                          | Keep the simple fixture server local and avoid representing it as a production web server.                               |
| [AWS Availability Zones](https://docs.aws.amazon.com/whitepapers/latest/aws-fault-isolation-boundaries/availability-zones.html) | Distinguish Zones from individual hosts and reason about physical failure isolation.                                     |
| [AWS CloudTrail overview](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)                | Separate account activity auditing from application health; synthetic event rows are explicitly not the provider schema. |
| [Terraform built-in terraform_data](https://developer.hashicorp.com/terraform/language/resources/terraform-data)                | Practice Terraform resource mechanics without an external provider or cloud account.                                     |
| [Terraform resource refactoring](https://developer.hashicorp.com/terraform/language/modules/develop/refactoring)                | Use an explicit moved block to preserve tracked identity through an address rename.                                      |
| [Terraform sensitive data](https://developer.hashicorp.com/terraform/language/manage-sensitive-data)                            | State and saved plans can contain sensitive values; display redaction is not encryption.                                 |
| [Docker build practices](https://docs.docker.com/build/building/best-practices/)                                                | Limit build context, distinguish immutable image contents from mutable tags, and run a minimal local workload.           |
| [Docker Compose startup order](https://docs.docker.com/compose/how-tos/startup-order/)                                          | `service_healthy` controls startup dependency readiness; it is not perpetual application recovery.                       |
| [kind quick start](https://kind.sigs.k8s.io/docs/user/quick-start/)                                                             | Named local clusters, loading a locally built image, explicit image pull policy, and scoped cluster cleanup.             |
| [Kubernetes Service](https://kubernetes.io/docs/concepts/services-networking/service/)                                          | Relate selectors and backend discovery through EndpointSlices.                                                           |
| [Kubernetes probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)      | Distinguish readiness from restart-oriented liveness; the practical configures readiness only.                           |

## Remaining curriculum depth

This expansion provides a broader beginner path and bounded practicals. It does not cover every service or every production scenario. Material work still includes:

- A fully guided live AWS provisioning sequence with account-specific authorization, current cost review, policy review, cleanup, and independently reviewed evidence. The existing field checkpoint asks for real evidence but is not a full provisioning tutorial.
- Deeper IPv4/IPv6 subnetting, TLS certificate failure/recovery, VPN/multiple-route diagnosis, and provider network controls.
- Cloud SDK pagination, bounded retry/backoff design, safe subprocess use, concurrency, and larger application test design.
- Managed database operation, migrations, indexes/query plans, concurrent isolation behavior, failover, and measured restore drills on managed services.
- Terraform remote-state access/locking/versioning, import and drift workflows, provider-version changes, and reviewed production changes.
- Persistent container storage, multi-service database integration, supply-chain verification, image scanning, and registry/release policies.
- Hosted CI/CD identity federation, protected deployment environments, provenance/signing, production rollout strategies, and data-compatible rollback.
- Real distributed tracing/instrumentation, representative load testing, alert tuning, and production SLO/error-budget operation.
- Full authentication/session security, secrets lifecycle, infrastructure policy evaluation, network policy, and adversarial testing.
- Kubernetes scheduling across failure domains, storage, ingress/gateway/TLS, RBAC, network policies, Helm, autoscaling, and control-plane operation.
- Independent technical review, broader supported-platform walkthroughs, and human review of learner portfolio claims before career-readiness conclusions.

Remaining work should be represented as future depth or separate field requirements, not silently described as mastered through these local lessons.
