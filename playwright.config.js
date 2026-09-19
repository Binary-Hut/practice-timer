const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 15000,
  fullyParallel: false,
  workers: 1,
  use: {
    headless: true
  }
});
