const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://sweetshop.netlify.app',
    headless: true,
  },
});
