import {
  defineConfig,
  devices,
} from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  testMatch: [
    "browser/**/*.spec.js",
    "accessibility/**/*.spec.js",
    "e2e/**/*.spec.js",
    "visual/**/*.spec.js",
  ],

  fullyParallel: true,

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  use: {
    baseURL: "http://127.0.0.1:4173",

    trace: "on-first-retry",

    screenshot: "only-on-failure",
  },

  webServer: {
    command:
      "npm run dev -- --host 127.0.0.1 --port 4173",

    url:
      "http://127.0.0.1:4173/tests/browser/fixtures/theme.html",

    reuseExistingServer:
      !process.env.CI,

    timeout: 60_000,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
}); 