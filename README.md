# Project Atlas School

**Learn. Build. Prove.**

An interactive, local-first engineering school for the path from terminal beginner to cloud support and junior cloud engineering. Atlas combines short lessons, retrieval practice, realistic practicals, troubleshooting, portfolio projects, and a competency dashboard. Progress follows evidence rather than a “mark complete” button.

[Repository](https://github.com/christopher-kiser/project-atlas-school) · [GitHub Pages deployment target](https://christopher-kiser.github.io/project-atlas-school/) · [Curriculum](docs/CURRICULUM.md) · [Architecture](docs/ARCHITECTURE.md)

The Pages address is the configured deployment target. Confirm publication through the repository’s latest successful Pages deployment; this document does not independently establish that deployment has completed.

## What is included

- **61 released lessons across a 22-section competency map**, from Linux foundations through cloud, automation, containers, security, reliability, and architecture.
- Retrieval, prediction, diagnosis, command-fill exercises, spaced review, weak-area tracking, a simulated terminal, and a diagnostic decision exercise.
- Practical submissions with output, commands, explanation, code, configuration, links, and supported screenshots.
- **8 portfolio project briefs**, including a production-style capstone, with evidence rubrics and recorded peer-review notes.
- **24 selected videos** from Harvard, MIT, Microsoft, AWS and other official educators, available in every lesson’s **Videos** tab and a separate video library.
- **12 selective certification checkpoints** and **28 curated references**.
- Existing Atlas history and a short calibration, so previously practiced material is recognized without being silently marked mastered.
- IndexedDB persistence, validated JSON export/import, and merge behavior for moving progress between computers.
- Local autosaved practical/project drafts that survive navigation and refresh without awarding progress.

The later sections contain usable bridge lessons, not a complete expert curriculum. Their topic maps are deliberately broader than their current depth. [The content backlog](docs/CONTENT-BACKLOG.md) identifies the remaining teaching, labs, and specialist preparation. The Month-4 and Month-6 gates are planning targets dependent on demonstrated skills; Atlas does not promise a job or award an external credential.

## Start learning

1. Open Atlas and visit **Existing Atlas Progress** to calibrate current recall.
2. Use **Learning path** to continue the relevant lesson. Open its **Videos** tab or **Watch this lesson** shortcut, then use **Retrieve** and **Practical** to apply what you learned.
3. Complete the real practical in the declared environment, then save evidence and your explanation.
4. Return to **Review queue** after a delay. Unaided recall and independent practical work are separate requirements.
5. Build and review projects in **Portfolio studio**, and use **Career roadmap** to see missing evidence.
6. Open **Settings & backups** and export regularly.

The public application includes a generic local record of previously reported Atlas competencies. It contains no learner account, raw private conversation, credentials, or uploaded terminal history. That starting history is reported practice, not fresh verified competence.

## Run locally

Use **Node.js 22.12 or newer within Node 22**, npm, and a current browser with IndexedDB enabled.

```bash
git clone https://github.com/christopher-kiser/project-atlas-school.git
cd project-atlas-school
npm ci
npm run dev
```

Open the address printed by Vite and include `/project-atlas-school/`, typically `http://localhost:5173/project-atlas-school/`. The development server listens on all interfaces as configured by the npm script.

```bash
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run build` type-checks and writes the production site to `dist/`. To inspect that output locally:

```bash
npm run preview
```

Open the preview address with `/project-atlas-school/`. Playwright may require operating-system browser dependencies; follow its installation output. Commands are verification instructions, not a declaration that every browser or environment has already passed.

## Your data and backups

Progress is stored in this browser profile and origin using IndexedDB. There is no account, backend, automatic cloud sync, or transmission of submissions to an Atlas server. Video players contact their credited publisher only after you select Load video. External links open the resource provider’s website; GitHub Pages still serves the application normally.

Use **Download JSON backup** before changing devices, switching browsers, clearing site data, or relying on a long-term record. Browser eviction, private-browsing behavior, storage permissions, and quota limits can affect local data. Production and local-development origins have separate stores. The backup includes screenshots and potentially sensitive text you chose to submit; redact secrets before saving or sharing it. Backups are ordinary JSON, not encrypted files.

Unsubmitted practical and project drafts are saved separately on this device. Use **Save evidence** or **Save project evidence** to assess the work and include it in JSON backups. Autosaved drafts alone do not award competence and are not transferred by export/import. If draft saving reports an error, keep the editor open and copy unfinished work before leaving.

To move from one computer to another, export on the first, transfer the file using a method you trust, then choose it under **Import a backup** on the second. Review the preview and merge. Import validates version 1 structure before changing saved data, deduplicates records, and reports conflicts rather than silently replacing conflicting immutable events. Keep both original files if a merge reports a conflict. Export a new combined backup afterward.

Current limits include 50 MiB per backup and up to six PNG/JPEG/WebP screenshots of at most 3 MiB each per practical. Large screenshots can consume browser quota well before the backup limit. The application reports storage failures; a failed save is not successful persistence.

## Deploy and roll back

The site is built for the public repository `christopher-kiser/project-atlas-school`. Vite’s asset base is fixed to `/project-atlas-school/`; application routes use fragments such as `#/lesson/terminal-map`, allowing refreshes on GitHub Pages without a server rewrite.

1. In the repository’s **Settings → Pages**, select **GitHub Actions** as the publishing source.
2. Commit the source and lockfile to `main`. [The Pages workflow](.github/workflows/deploy.yml) installs dependencies, runs lint/unit/browser checks, builds, uploads `dist/`, and deploys through GitHub Pages. Pull requests run verification without publishing; manual dispatch on `main` can also publish.
3. Confirm the successful deployment and its commit in **Actions** and the `github-pages` environment.
4. Open the published root and a direct lesson hash URL; verify navigation, assets, a local save, refresh, and a backup round trip.

For a code rollback, revert the faulty change in a new commit and let the deployment workflow rebuild the known-good behavior. Do not assume an old artifact remains available indefinitely. Browser progress is separate from the deployed assets: export data before any incompatible data-format change, and retain version-1 compatibility until an explicit migration exists. A site rollback is not a backup restore.

If you fork under a different repository name, update `base` in `vite.config.ts`, the public repository links, and any browser-test base URL before deploying. A custom domain or origin change also needs a progress export/import plan.

## Scope and verification limits

Atlas checks deterministic answers and the completeness of locally submitted evidence. It does not execute arbitrary Linux commands, inspect a real cloud account, authenticate peer reviewers, or verify external certificates. The terminal simulation models a small teaching scenario and does not confer real-lab credit. “Portfolio Verified” is a local peer-review attestation with evidence requirements, not a signed credential.

No AWS resources are created automatically. Live labs require an authorized sandbox and current cost review; design-only work is kept distinct from actual operating evidence. Free offers, exam prices, and service behavior change. Official-source research is dated **22 October 2026**; see [RESEARCH.md](docs/RESEARCH.md) for sources and restrictions. Selected videos were checked for actual playback where documented; availability can vary by publisher, region and browser. See [video sources](docs/VIDEO-SOURCES.md) and [expanded lessons](docs/CURRICULUM-EXPANSION.md) for the exact scope and verification limits.

Automated tests cover learning rules, storage/backup behavior, content contracts, and the browser scenarios implemented in the test suite. Chromium checks do not establish full Safari compatibility, exhaustive accessibility conformance, or correctness of every real-world command on every operating system. Use the documented lab environment and report specific failures.

## Maintain the school

Read [CONTRIBUTING.md](CONTRIBUTING.md) for development and content conventions. [ARCHITECTURE.md](docs/ARCHITECTURE.md) explains routing, assessment, persistence, and the future sync boundary. [CURRICULUM.md](docs/CURRICULUM.md) describes the teaching sequence, and [CONTENT-BACKLOG.md](docs/CONTENT-BACKLOG.md) distinguishes current depth from planned expansion.
