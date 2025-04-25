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
// Global error handler
Cypress.on('uncaught:exception', (err, runnable) => {
    const suppressedErrors = [
      "Cannot read properties of undefined (reading 'clone')",
      "undefined is not a function",
      "Cannot read property 'clone' of null"
    ];
    // Ignore this specific error
    if (err.message.includes("AddFotoramaVideoEvents")) {
        console.log('Suppressed Fotorama video error:', err.message);
        return false; // prevents Cypress from failing the test
    }
    // Check if error should be suppressed
    if (suppressedErrors.some(msg => err.message.includes(msg))) {
      console.log('Suppressed application error:', err.message);
      return false;
    }
    
    // Log unexpected errors but still fail the test
    console.error('Uncaught exception:', err);
    return true;
});

// Global uncaught exception handler
Cypress.on('uncaught:exception', (err, runnable) => {
    const ignoredErrors = [
      'AddFotoramaVideoEvents',
      'jQuery is not defined',
      'fotorama is not defined'
    ];
    
    // Return false to prevent failing on known errors
    if (ignoredErrors.some(error => err.message.includes(error))) {
      console.warn('Suppressed application error:', err.message);
      return false;
    }
    
    // Return true to fail on other errors
    return true;
  });
  
  // Wait for Fotorama to load
  Cypress.Commands.add('waitForFotorama', () => {
    cy.window().then(win => {
      if (win.jQuery && win.jQuery.fn.fotorama) {
        return cy.get('.fotorama').should('be.visible');
      }
      return cy.log('Fotorama not loaded - proceeding anyway');
    });
  });
  