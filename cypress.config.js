const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://magento.softwaretestingboard.com',
    specPattern: 'cypress/e2e/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads',
    video: false,
    videoCompression: 32,
    trashAssetsBeforeRuns: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    retries: {
      runMode: 0,
      openMode: 0,
    },
    // reporter: 'mochawesome',
    // reporterOptions: {
    //   reportDir: 'cypress/reports',
    //   overwrite: false,
    //   screenshots: true,
    //   html: true,
    //   json: true,
    //   embedScreenshots: true, 
    //   timestamp: 'mmddyyyy_HHMMss',
    //   reportTitle: 'Magento Test Report',
    //   charts: true,
    //   code: true
    // },
    experimentalStudio:true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      // require('cypress-real-events/plugin')(on);
      // require('cypress-plugin-tab')(on);
      // require('cypress-plugin-snapshots/plugin')(on);
      // require('cypress-plugin-steps/plugin')(on, config);
      return config;
    }
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  }
});
