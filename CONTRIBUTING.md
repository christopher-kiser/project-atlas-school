# Contributing to Atlas

Help learners produce and explain reliable engineering evidence. A contribution should improve a specific learning outcome, correct an observed defect, or make the application easier to maintain. Preserve the distinction between reported experience, practice, delayed recall, practical evidence, and peer attestation.

Read [the architecture](docs/ARCHITECTURE.md) before changing assessment or persistence, and [the curriculum](docs/CURRICULUM.md) before adding teaching material. [The content backlog](docs/CONTENT-BACKLOG.md) records the depth still needed beyond the released bridge lessons.

## Local setup

Use Node.js 22.12 or newer within Node 22 and npm. Install the committed dependency versions:

```bash
npm ci
npm run dev
```

Open `http://localhost:5173/project-atlas-school/`, or the address Vite prints with the same base path. The current development script binds to all interfaces. Use synthetic learner records when testing; keep personal submissions, credentials, private history, generated reports, `node_modules/`, and `dist/` out of contributions.

Keep `package-lock.json` consistent with dependency changes. Avoid adding a runtime service or paid dependency merely to solve a local UI problem. The released application must continue working as a static site with browser-local persistence.

## Choose the owner of a change

| Change                                            | Primary owner                                                                    |
| ------------------------------------------------- | -------------------------------------------------------------------------------- |
| Lesson text, exercises, practicals                | `src/content/foundations.ts`, `advanced.ts`, or the lesson catalog in `index.ts` |
| Topic map and prerequisites                       | `src/content/sections.ts` and the affected lesson records                        |
| Project briefs and rubric                         | `src/content/projects.ts`                                                        |
| External teaching resources and exam checkpoints  | `src/content/resources.ts`, `certifications.ts`, and `docs/RESEARCH.md`          |
| Answer evaluation, retrieval, and evidence states | `src/lib/learning.ts`                                                            |
| Career and capability gates                       | `src/lib/gates.ts`                                                               |
| Backup validation, merge, and persistence         | `src/lib/storage.ts`                                                             |
| Autosaved unfinished practical/project forms      | `src/lib/drafts.ts` and `useDraftState.ts`                                       |
| Navigation and app lifecycle                      | `src/App.tsx`                                                                    |
| Page flows and interactive practice               | `src/components/Pages.tsx` and `Practice.tsx`                                    |
| Responsive and accessible presentation            | `src/styles.css` and the relevant component                                      |

Make the smallest coherent change at the responsible owner. Avoid copying assessment rules into views or creating a second definition of a content catalog. When a shared rule changes, update its dependents and explain the behavior change.

## Add or improve a lesson

Use the `Lesson` contract in `src/content/types.ts`. Preserve existing IDs and their meaning: IDs are part of routes, prerequisites, saved attempts, and backups. New exercise IDs must be unique across the entire curriculum. Resolve prerequisites and resource references, and keep the prerequisite graph acyclic.

A released lesson needs a clear scope, observable outcomes, substantive explanations, an explained demonstration, guided practice, and a practical with evidence and a rubric. Its environment must identify what the learner needs and where commands run. Include failure diagnosis and cleanup where relevant. State which outputs vary by machine, tool version, or account.

Write at least two distinct retrieval exercises that require more than recognition, including a core recall or command-fill exercise. Multiple-choice and typed yes/no questions are useful checks, but cannot provide the lesson's independent retrieval evidence. Supply correct accepted answers, explanations, and useful hints. Commands are case-sensitive by default; use `caseSensitive: false` only when the concept warrants it. Add legitimate answer variants rather than weakening comparison across all lessons.

Keep demonstrations, hints, and solutions separate from independent evidence. Do not make clicking a button, revealing a solution, or succeeding in the terminal simulation equivalent to operating a real environment. A bridge lesson may be released within a narrow declared scope; it must not imply that a whole advanced section or certification curriculum is complete. Update the expansion manifest and backlog when their coverage changes.

Use original explanations and small, attributed examples. Prefer official documentation for technical behavior and current exam information. Record the source, check date, relevance, and limitations in the appropriate catalog or [research notes](docs/RESEARCH.md). Verify prices, exam codes, retirements, and versions at their current official source; label regional or unavailable pricing instead of estimating it. A link that answers with a bot restriction is not proven broken, and an embedded video link does not establish successful playback.

Cloud practicals must distinguish design-only work from live operating evidence. Declare account authorization, expected billable components, a current pricing check, and cleanup. Do not embed keys or require broad administrator credentials in a committed example. Keep the application itself free of automatic provisioning or spending.

## Change projects or progression

Project expectations should yield reviewable artifacts: a reproducible setup, evidence, a failure-and-recovery account, limitations, and reviewer feedback. A locally entered reviewer name is not authenticated identity; keep that limitation visible.

Project IDs are currently enumerated in storage validation, and collection limits reflect the eight-project release. The learning engine currently expects five rubric items per project. Adding projects or changing that rubric shape requires checking `storage.ts`, `PROJECT_RUBRIC_COUNT` in `learning.ts`, gates, content tests, and backup compatibility together.

Keep assessment calculations pure and use explicit test times for retention behavior. A regression test should demonstrate a meaningful learner-visible failure or data-integrity issue. Do not weaken evidence gates merely to make a fixture pass. Month-4 and Month-6 labels remain planning targets; elapsed time, certificate purchase, and self-reported confidence do not satisfy the gates.

## Protect saved work

Imported JSON is untrusted input even when it was exported by an earlier Atlas version. Preserve runtime validation, finite size limits, safe-link handling, image restrictions, and atomic IndexedDB updates. Do not remove strict checks to accommodate malformed fixtures.

Version 1 backups are a public compatibility contract. A schema change needs an explicit migration design, old-backup fixtures, recovery guidance, and tests demonstrating that existing data survives. Do not reset a database on a read, quota, validation, or upgrade error. Display the failure and preserve the original record.

Maintain the defined merge behavior: immutable event conflicts reject; practical/project records use the later timestamp and reject different equal-time records; existing prior-history IDs remain authoritative. Check idempotence, failure atomicity, and concurrent writers when changing persistence. Export/import is manual transfer, not an account system or automatic sync. Any future sync adapter must address consent, authorization, deletion, conflict handling, and recovery while retaining a useful local-only mode.

Unsubmitted drafts use a separate database and do not enter assessment or backups. Preserve that boundary: navigation or refresh must not silently submit evidence, and a failed explicit submission must not destroy unfinished work. Check draft restoration, ordered saves, error messages, and clearing only after successful submission when changing the form lifecycle. Do not imply that a draft is included in a backup until the learner explicitly saves its evidence.

Test with redacted or synthetic evidence. Screenshots and exported backups can contain sensitive information; do not attach real learner backups to public issues or pull requests. A site deployment does not migrate data between browser origins.

## Verify changes

Run the relevant checks before proposing a change:

```bash
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright may require operating-system browser dependencies. Its configuration currently runs Chromium against the local Vite server at `/project-atlas-school/`. Ensure an already running server is serving the intended revision, because the configuration allows reuse. A production build can be inspected with `npm run preview` at the same base path.

The unit tests cover content contracts, learning rules, and storage with `fake-indexeddb`. Browser scenarios check the flows implemented in the suite. Passing them does not verify every Linux command, remote resource, cloud account, browser, or assistive technology. Report the commands, tested browser/environment, and any checks you could not run.

For UI changes, also check keyboard navigation, visible focus, accessible labels and errors, reduced motion, narrow screens, long text, and direct hash-route refreshes. Automated accessibility checks support this review; they do not replace it. For persistence changes, check a save followed by refresh, an export/import round trip, a malformed import that leaves existing data intact, and the applicable conflict/failure path.

## Propose and publish a change

Keep the pull request focused. Describe the concrete problem, resulting behavior, validation, and any data or content compatibility implications. Show screenshots for visual changes when they help review. Separate observed facts from assumptions and planned work; do not claim a successful deployment or a complete advanced curriculum from a local build.

GitHub Pages uses [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) and Vite's fixed `/project-atlas-school/` asset base. The workflow verifies pull requests and publishes verified non-pull-request runs on `main`. If deployment paths change, update routing/test URLs and public links together. Confirm the published commit, root assets, a direct lesson hash URL, and basic persistence after deployment.

Roll back application behavior with a revert commit and a fresh workflow deployment. Treat saved browser data separately: older code must remain compatible with the current data or provide an explicit recovery path. See [deployment and rollback details](docs/ARCHITECTURE.md#build-deployment-and-rollback).
