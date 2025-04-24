# ui-cypress-bamboo-test
Cypress Automation Test Suite
Overview
This repository contains automated UI tests for an e-commerce website using Cypress with Page Object Model pattern.

Test Cases Covered
Registration flow with login validation

Place order with multiple products (price calculation checks)

Add products to wishlist and checkout from wishlist

Search and validate results

Prerequisites
Node.js (v16 or higher recommended)

npm (comes with Node.js)

Git

Installation
Clone the repository:

bash
git clone https://github.com/your-username/cypress-automation.git
cd cypress-automation
Install dependencies:

bash
npm install

Running Tests
Run all tests
bash
npm test
Run specific test suite
bash
npx cypress run --spec "cypress/e2e/TC_A_registration.cy.js"
Open Cypress Test Runner
bash
npx cypress open
Reports
HTML reports with screenshots are generated in:

cypress/reports/
To view the report:

bash
npx serve cypress/reports
Then open http://localhost:3000 in your browser

Project Structure
cypress/
  e2e/               # Test specs
  fixtures/           # Test data
  pages/              # Page objects
  screenshots/        # Automatic screenshot storage
  videos/             # Test recordings
  downloads/          # File downloads
  support/            # Custom commands
cypress.config.js     # Cypress configuration