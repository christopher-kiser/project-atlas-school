import { defineConfig, devices } from "@playwright/test";

// Run npm run build first. An explicit URL verifies an already deployed build.
const remoteURL = process.env.ATLAS_TEST_URL;
const baseURL = `${(remoteURL ?? "http://127.0.0.1:4174/project-atlas-school/").replace(/\/$/, "")}/`;

export default defineConfig({
  testDir: "./tests",
  testMatch: "e2e.spec.ts",
  fullyParallel: true,
  workers: 2,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
  ],
  webServer: remoteURL
    ? undefined
    : {
        command: "npm run preview -- --port 4174",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 90_000,
      },
});
