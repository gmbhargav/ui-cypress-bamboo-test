// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-mochawesome-reporter/register';
import "cypress-real-events";
// Ensure consistent screenshot paths
// Cypress.Screenshot.defaults({
//     screenshotOnRunFailure: true,
//     capture: 'fullPage',
//     disableTimersAndAnimations: true,
//     scale: true,
//     onBeforeScreenshot() {
//       // Remove any command log
//       Cypress.$('.command-wrapper').hide();
//     },
//     onAfterScreenshot() {
//       Cypress.$('.command-wrapper').show();
//     }
//   });