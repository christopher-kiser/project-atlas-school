import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { lessons, projects, sections } from "../src/content";
import type { AtlasData } from "../src/lib/learning";

const screenshotRoot = path.resolve(process.cwd(), "../../work/e2e");
const pngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jQksAAAAASUVORK5CYII=";
async function open(page: Page, route: string) {
  await page.goto(`./#/${route}`);
  await expect(page.locator("#main-content")).toBeVisible();
  await expect(page.locator("#main-content h1")).toHaveCount(1);
  const [kind, id] = route.split("/");
  const titles: Record<string, string> = {
    dashboard: "Welcome back, builder.",
    curriculum: "Your path to independent engineering",
    practice: "A safe place to get it wrong.",
    review: "Make it available from memory.",
    portfolio: "Proof you can point to.",
    certifications: "Credentials that support the work.",
    career: "Readiness follows the evidence.",
    resources: "Good references. Clear purpose.",
    videos: "The Atlas video library.",
    settings: "Take your progress with you.",
    migration: "Pick up where you left off.",
  };
  const expected =
    kind === "lesson"
      ? (lessons.find((l) => l.id === id)?.title ??
        "This route has no lesson yet.")
      : kind === "section"
        ? sections.find((s) => String(s.id) === id)?.title
        : kind === "portfolio" && id
          ? projects.find((p) => p.id === id)?.title
          : titles[kind];
  if (expected)
    await expect(page.locator("#main-content h1")).toHaveText(expected);
}
async function screenshot(page: Page, name: string) {
  await mkdir(screenshotRoot, { recursive: true });
  await page.screenshot({
    path: path.join(screenshotRoot, name),
    fullPage: true,
  });
}
async function readData(page: Page): Promise<AtlasData> {
  return page.evaluate(
    () =>
      new Promise<AtlasData>((resolve, reject) => {
        const request = indexedDB.open("project-atlas-school", 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction("state", "readonly");
          const get = tx.objectStore("state").get("atlas");
          get.onsuccess = () => resolve(get.result);
          get.onerror = () => reject(get.error);
          tx.oncomplete = () => db.close();
          tx.onabort = () => {
            db.close();
            reject(tx.error);
          };
        };
      }),
  );
}
async function readDraft(
  page: Page,
  key: string,
): Promise<Record<string, unknown> | undefined> {
  return page.evaluate(
    (key) =>
      new Promise<Record<string, unknown> | undefined>((resolve, reject) => {
        const request = indexedDB.open("atlas-school-drafts", 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction("drafts", "readonly");
          const get = tx.objectStore("drafts").get(key);
          get.onsuccess = () => resolve(get.result?.value);
          get.onerror = () => reject(get.error);
          tx.oncomplete = () => db.close();
          tx.onabort = () => {
            db.close();
            reject(tx.error);
          };
        };
      }),
    key,
  );
}
async function downloadBackup(page: Page) {
  await open(page, "settings");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download JSON backup" }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toMatch(/^atlas-backup-.*\.json$/);
  const stream = await download.createReadStream();
  if (!stream) throw new Error("Backup download had no readable content");
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
}

// Every test gets an isolated browser context and fresh local database.
test("all public application routes render without runtime errors or broken local assets", async ({
  page,
  baseURL,
}) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  const brokenAssets: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      new URL(response.url()).origin === new URL(baseURL!).origin
    )
      brokenAssets.push(`${response.status()} ${response.url()}`);
  });
  const routes = [
    "dashboard",
    "curriculum",
    "practice",
    "review",
    "portfolio",
    "certifications",
    "career",
    "resources",
    "videos",
    "settings",
    "migration",
    ...sections.map((s) => `section/${s.id}`),
    ...lessons.map((l) => `lesson/${l.id}`),
    ...projects.map((p) => `portfolio/${p.id}`),
  ];
  for (const route of routes) {
    await open(page, route);
    await expect(
      page.getByRole("heading", { name: "This route has no lesson yet." }),
      route,
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "Atlas could not open this view." }),
      route,
    ).toHaveCount(0);
    if (route.startsWith("lesson/")) {
      const lesson = lessons.find((l) => route === `lesson/${l.id}`)!;
      await expect(
        page.getByRole("navigation", { name: "Breadcrumb" }),
      ).toContainText(lesson.title);
      await page.getByRole("button", { name: "Videos", exact: true }).click();
      await expect(page.locator(".video-card").first()).toBeVisible();
      await expect(page.locator("iframe,video")).toHaveCount(0);
    }
  }
  await open(page, "lesson/does-not-exist");
  await expect(
    page.getByRole("heading", { name: "This route has no lesson yet." }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  expect(brokenAssets).toEqual([]);
});

test("mobile navigation and representative views fit a narrow viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, "dashboard");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => {
    const element = document.activeElement;
    const bounds = element?.getBoundingClientRect();
    return {
      text: element?.textContent,
      left: bounds?.left ?? -1,
      right: bounds?.right ?? -1,
    };
  });
  expect(
    focused.left,
    `Keyboard focus must not enter hidden navigation: ${focused.text}`,
  ).toBeGreaterThanOrEqual(0);
  expect(focused.right).toBeLessThanOrEqual(390);
  await page.getByRole("link", { name: "Skip to content" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  const contentPosition = await page.evaluate(() => ({
    heading: document.querySelector("#main-content h1")!.getBoundingClientRect()
      .top,
    header: document.querySelector(".topbar")!.getBoundingClientRect().bottom,
  }));
  expect(
    contentPosition.heading,
    "Skip-to-content must keep the heading below the sticky header",
  ).toBeGreaterThanOrEqual(contentPosition.header);
  await screenshot(page, "dashboard-mobile.png");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Learning path", exact: true }).click();
  await expect(page).toHaveURL(/#\/curriculum$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  for (const route of [
    "dashboard",
    "curriculum",
    "lesson/troubleshoot-nginx",
    "portfolio/linux-service",
    "settings",
  ]) {
    await open(page, route);
    if (route.startsWith("lesson/"))
      await page
        .getByRole("button", { name: "Practical", exact: true })
        .click();
    const widths = await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(
      widths.content,
      `${route} must not overflow horizontally`,
    ).toBeLessThanOrEqual(widths.viewport + 1);
  }
});

test("retrieval saves correct, incorrect, and supported attempts across refresh without click-complete", async ({
  page,
}) => {
  await open(page, "lesson/orientation");
  await expect(
    page.getByRole("button", { name: /mark.*complete/i }),
  ).toHaveCount(0);
  expect((await readData(page)).attempts).toHaveLength(0);
  await page.getByRole("button", { name: "Retrieve", exact: true }).click();
  const card = page
    .locator(".exercise-card")
    .filter({ has: page.locator("#orientation-recall") });
  await page.locator("#orientation-recall").fill("pwd");
  await card.getByRole("button", { name: "Check answer" }).click();
  await expect(
    card.getByText("Correct — evidence saved.", { exact: true }),
  ).toBeVisible();
  expect((await readData(page)).attempts[0]).toMatchObject({
    answer: "pwd",
    correct: true,
    hintUsed: false,
  });
  await page.reload();
  await page.getByRole("button", { name: "Retrieve", exact: true }).click();
  await expect(card.getByText("1 attempt", { exact: true })).toBeVisible();
  await page.locator("#orientation-recall").fill("ls");
  await card.getByRole("button", { name: "Check answer" }).click();
  await expect(
    card.getByText("Not quite — this is useful evidence.", { exact: true }),
  ).toBeVisible();
  await card.getByRole("button", { name: "Need a hint" }).click();
  await page.locator("#orientation-recall").fill("pwd");
  await card.getByRole("button", { name: "Check answer" }).click();
  await expect(card.getByText("3 attempts", { exact: true })).toBeVisible();
  const data = await readData(page);
  expect(data.attempts.map((a) => a.correct)).toEqual([true, false, true]);
  expect(data.attempts.at(-1)?.hintUsed).toBe(true);
  await open(page, "review");
  await expect(
    page.getByRole("heading", { name: "Weak areas & mistakes" }),
  ).toBeVisible();
});

test("practical support and PNG evidence survive backup, fresh-browser restore, deduplication, and malformed import", async ({
  page,
  browser,
}) => {
  await open(page, "lesson/orientation");
  await page.getByRole("button", { name: "Practical", exact: true }).click();
  await expect(
    page.getByRole("button", { name: /Reveal solution/ }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Save evidence & assess" }).click();
  await expect(
    page.getByText("Practical evidence saved on this device.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Reveal solution/ }),
    "An empty saved draft is not a practical attempt",
  ).toBeDisabled();
  await page
    .getByLabel("output evidence", { exact: true })
    .fill(
      "/home/atlas/atlas-labs/orientation\ncd: atlas-no-such-folder: No such file or directory",
    );
  await page
    .getByLabel(/Explain your reasoning/)
    .fill(
      "The failed directory change left the shell in the same location, which I verified by repeating pwd and comparing its output.",
    );
  const checkboxes = page
    .getByRole("group", { name: "Self-check against the evidence" })
    .getByRole("checkbox");
  for (const checkbox of await checkboxes.all()) await checkbox.check();
  await page.getByRole("button", { name: "Open hint drawer" }).click();
  await expect(
    page.getByRole("checkbox", {
      name: /I completed this attempt independently/,
    }),
  ).toBeDisabled();
  await page
    .getByText("Attach screenshots or project links", { exact: true })
    .click();
  await page
    .getByLabel("Project/reference links · one per line")
    .fill("https://example.com/atlas-evidence");
  await page.locator("input[type=file]").setInputFiles({
    name: "evidence.png",
    mimeType: "image/png",
    buffer: Buffer.from(pngBase64, "base64"),
  });
  await expect(page.getByRole("img", { name: "evidence.png" })).toBeVisible();
  await page.getByRole("button", { name: "Save evidence & assess" }).click();
  await expect(
    page.getByText("Practical evidence saved on this device.", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Reveal solution", exact: true })
    .click();
  await expect(
    page.getByText("Worked solution · support recorded", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Practical", exact: true }).click();
  await expect(page.getByLabel("output evidence", { exact: true })).toHaveValue(
    /atlas-no-such-folder/,
  );
  const saved = await readData(page);
  expect(saved.submissions).toHaveLength(1);
  expect(saved.submissions[0].hintsUsed).toBe(true);
  expect(saved.submissions[0].screenshots[0].dataUrl).toBe(
    `data:image/png;base64,${pngBase64}`,
  );
  const backup = await downloadBackup(page);
  expect(JSON.parse(backup.toString()).submissions[0].screenshots).toHaveLength(
    1,
  );
  const applicationURL = page.url().split("#")[0];
  const fresh = await browser.newContext();
  try {
    const restored = await fresh.newPage();
    await restored.goto(`${applicationURL}#/settings`);
    await expect(
      restored.getByRole("heading", { name: "Take your progress with you." }),
    ).toBeVisible();
    expect((await readData(restored)).submissions).toHaveLength(0);
    const input = restored.getByLabel("Import progress JSON");
    for (let i = 0; i < 2; i++) {
      await input.setInputFiles({
        name: "atlas-test-backup.json",
        mimeType: "application/json",
        buffer: backup,
      });
      await expect(
        restored.getByRole("heading", {
          name: "Ready to merge: atlas-test-backup.json",
        }),
      ).toBeVisible();
      await restored.getByRole("button", { name: "Merge this backup" }).click();
      await expect(
        restored.getByRole("heading", {
          name: "Ready to merge: atlas-test-backup.json",
        }),
      ).toHaveCount(0);
    }
    const imported = await readData(restored);
    expect(imported.submissions).toEqual(saved.submissions);
    expect(imported.priorHistory).toHaveLength(16);
    await input.setInputFiles({
      name: "broken.json",
      mimeType: "application/json",
      buffer: Buffer.from("{broken-json"),
    });
    await expect(
      restored.getByText(
        "This file is not valid JSON. Your saved progress was not changed.",
        { exact: true },
      ),
    ).toBeVisible();
    expect((await readData(restored)).submissions).toEqual(saved.submissions);
    await restored.goto(`${applicationURL}#/lesson/orientation`);
    await restored
      .getByRole("button", { name: "Practical", exact: true })
      .click();
    await restored
      .getByText("Attach screenshots or project links", { exact: true })
      .click();
    await expect(
      restored.getByRole("img", { name: "evidence.png" }),
    ).toBeVisible();
    await expect(
      restored.getByRole("checkbox", {
        name: /I completed this attempt independently/,
      }),
    ).toBeDisabled();
  } finally {
    await fresh.close();
  }
});

test("unsubmitted lab and project drafts survive stage, route, and reload changes without becoming assessed evidence", async ({
  page,
}) => {
  const output =
    "UNSUBMITTED-DRAFT-OUTPUT: the investigation is still in progress.";
  const commands = "pwd\nls -la ~/atlas-labs/orientation";
  const summary =
    "UNSUBMITTED-PROJECT-DRAFT: I am still assembling the evidence and have not submitted this work.";
  const evidence =
    "UNSUBMITTED-PROJECT-EVIDENCE: this is an unfinished investigation note kept on this device, excluded from assessed evidence and backups.";
  await open(page, "lesson/orientation");
  await page.getByRole("button", { name: "Practical", exact: true }).click();
  await page.getByLabel("output evidence", { exact: true }).fill(output);
  await page.getByRole("button", { name: "Commands", exact: true }).click();
  await page.getByLabel("commands evidence", { exact: true }).fill(commands);
  await page.getByRole("button", { name: "Learn", exact: true }).click();
  await page.getByRole("button", { name: "Practical", exact: true }).click();
  await expect(page.getByLabel("output evidence", { exact: true })).toHaveValue(
    output,
  );
  await expect
    .poll(async () => (await readDraft(page, "lab:orientation"))?.commands)
    .toBe(commands);
  await open(page, "dashboard");
  await open(page, "lesson/orientation");
  await page.getByRole("button", { name: "Practical", exact: true }).click();
  await expect(page.getByLabel("output evidence", { exact: true })).toHaveValue(
    output,
  );
  await page.reload();
  await page.getByRole("button", { name: "Practical", exact: true }).click();
  await expect(page.getByLabel("output evidence", { exact: true })).toHaveValue(
    output,
  );
  await page.getByRole("button", { name: "Commands", exact: true }).click();
  await expect(
    page.getByLabel("commands evidence", { exact: true }),
  ).toHaveValue(commands);
  expect((await readData(page)).submissions).toHaveLength(0);
  await expect(
    page.getByRole("button", { name: /Reveal solution/ }),
  ).toBeDisabled();

  await open(page, "portfolio/linux-service");
  await page
    .getByLabel("Public project link")
    .fill("https://example.com/draft-only");
  await page.getByLabel("What did you build and why?").fill(summary);
  await page
    .getByLabel("Verification evidence and artifact locations")
    .fill(evidence);
  await expect
    .poll(
      async () => (await readDraft(page, "project:linux-service"))?.evidence,
    )
    .toBe(evidence);
  await open(page, "portfolio");
  await expect(
    page
      .locator(".portfolio-card")
      .filter({
        has: page.getByRole("heading", {
          name: "Linux web service",
          exact: true,
        }),
      })
      .getByText("Not yet submitted", { exact: true }),
  ).toBeVisible();
  await open(page, "portfolio/linux-service");
  await expect(page.getByLabel("What did you build and why?")).toHaveValue(
    summary,
  );
  await page.reload();
  await expect(
    page.getByLabel("Verification evidence and artifact locations"),
  ).toHaveValue(evidence);
  expect((await readData(page)).projects).toHaveLength(0);
  const exported = (await downloadBackup(page)).toString();
  expect(JSON.parse(exported).submissions).toEqual([]);
  expect(JSON.parse(exported).projects).toEqual([]);
  expect(exported).not.toContain("UNSUBMITTED-");
});

test("terminal simulation requires HTTP recovery proof and grants no real competence", async ({
  page,
}) => {
  await open(page, "practice");
  const command = page.getByLabel("Simulation command");
  const run = async (text: string) => {
    await command.fill(text);
    await command.press("Enter");
  };
  await run("curl localhost");
  await expect(page.getByRole("log")).toContainText("Connection refused");
  await run("systemctl status nginx");
  await expect(page.getByRole("log")).toContainText("inactive (dead)");
  await run("sudo systemctl start nginx");
  await expect(page.getByRole("log")).toContainText("Now prove recovery.");
  await expect(
    page.getByText(
      "HTTP recovery observed. Explain the cause in your real lab.",
      { exact: true },
    ),
  ).toHaveCount(0);
  await run("curl localhost");
  await expect(page.getByRole("log")).toContainText("HTTP/1.1 200 OK");
  await expect(
    page.getByText(
      "HTTP recovery observed. Explain the cause in your real lab.",
      { exact: true },
    ),
  ).toBeVisible();
  await run("echo unimplemented-command");
  await expect(page.getByRole("log")).toContainText(
    "Unsupported in this simulation",
  );
  const data = await readData(page);
  expect(data.attempts).toHaveLength(0);
  expect(data.submissions).toHaveLength(0);
});

test("certification scores and portfolio attestations persist with explicit evidence boundaries", async ({
  page,
}) => {
  await open(page, "certifications");
  await page.getByLabel("Practice score for LPI Linux Essentials").fill("88");
  await page
    .getByLabel("Practice exam source", { exact: true })
    .fill("Legitimate practice set — browser test fixture");
  await page.getByRole("button", { name: "Record practice score" }).click();
  await expect(page.getByText("88%", { exact: true })).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("Legitimate practice set — browser test fixture"),
  ).toBeVisible();
  expect((await readData(page)).certifications[0]).toMatchObject({
    score: 88,
    certificationId: "linux-essentials",
  });
  await open(page, "portfolio/linux-service");
  await page
    .getByLabel("Public project link")
    .fill("https://example.com/atlas-linux-service");
  await page
    .getByLabel("What did you build and why?")
    .fill(
      "A test fixture representing a Linux service project with recovery evidence and reproducible operator instructions.",
    );
  await page
    .getByLabel("Verification evidence and artifact locations")
    .fill(
      "Browser test fixture: a README, incident timeline, service observations, HTTP recovery evidence, scoped commands, cleanup record, and reproducibility notes.",
    );
  for (const checkbox of await page
    .getByRole("group", { name: "Project acceptance rubric" })
    .getByRole("checkbox")
    .all())
    await checkbox.check();
  await page.getByRole("button", { name: "Save project evidence" }).click();
  await expect(
    page.getByText(
      "Project evidence saved. Verification is peer-attested, not remotely authenticated.",
      { exact: true },
    ),
  ).toBeVisible();
  await open(page, "portfolio");
  const project = page.locator(".portfolio-card").filter({
    has: page.getByRole("heading", {
      name: "Linux web service",
      exact: true,
    }),
  });
  await expect(
    project.getByText("Evidence in progress", { exact: true }),
  ).toBeVisible();
  await project.click();
  await page
    .getByText("Record an independent peer review", { exact: true })
    .click();
  await page
    .getByLabel("Reviewer name or handle")
    .fill("Browser test peer fixture");
  await page
    .getByLabel("What did the reviewer verify?")
    .fill(
      "Test-only peer attestation: reproduced the setup and checked the incident recovery and cleanup instructions against recorded evidence.",
    );
  await page.getByRole("button", { name: "Save project evidence" }).click();
  await expect(
    page.getByText(
      "Project evidence saved. Verification is peer-attested, not remotely authenticated.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect
    .poll(async () => (await readData(page)).projects[0]?.reviewer)
    .toBe("Browser test peer fixture");
  await page.reload();
  await page
    .getByText("Record an independent peer review", { exact: true })
    .click();
  await expect(page.getByLabel("Reviewer name or handle")).toHaveValue(
    "Browser test peer fixture",
  );
  await open(page, "portfolio");
  await expect(
    project.getByText("Portfolio Verified", { exact: true }),
  ).toBeVisible();
  expect((await readData(page)).projects).toHaveLength(1);
});

for (const route of [
  "dashboard",
  "lesson/troubleshoot-nginx",
  "videos",
  "settings",
  "portfolio",
]) {
  test(`WCAG accessibility scan: ${route}`, async ({ page }, testInfo) => {
    await open(page, route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    if (result.violations.length)
      await testInfo.attach("accessibility-violations", {
        body: JSON.stringify(result.violations, null, 2),
        contentType: "application/json",
      });
    expect(
      result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
    if (route === "dashboard") await screenshot(page, "dashboard-desktop.png");
  });
}
