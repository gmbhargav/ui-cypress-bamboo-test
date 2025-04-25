# ui-cypress-bamboo-test
## Cypress Automation Test Suite
### Overview
    This repository contains automated UI tests for an e-commerce website using Cypress with Page Object Model pattern.
## Test Cases Covered
    ** 1.Registration flow with login validation
       2.Place order with multiple products (price calculation checks)
       3. Add products to wishlist and checkout from wishlist
       4. Search and validate results
    **

## Prerequisites
* Node.js (v16 or higher recommended)
* npm (comes with Node.js)        
* Git

## Installation
* Clone the repository:
    `git clone https://github.com/gmbhargav/ui-cypress-bamboo-test`

    `cd ui-cypress-bamboo-test`
## Install dependencies:
 `npm install`
## Running Tests
 `npm test`
## Run specific test suite
 `npx cypress run --spec "cypress/e2e/001_registration_spec.cy.js"`
## Open Cypress Test Runner
 `npx cypress open`
## Reports
 * HTML reports with screenshots are generated in:
    * cypress/reports/html/index.html
## Project Structure
    **  cypress/
            e2e/tests           # Test specs
            fixtures/           # Test data
            pages/              # Page objects
            screenshots/        # Automatic screenshot storage
            videos/             # Test recordings
            support/            # Custom commands
        cypress.config.js     # Cypress configuration **
