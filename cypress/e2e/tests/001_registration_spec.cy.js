/// <reference types="cypress" />
import { RegistrationPage } from '../pages/RegistrationPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
describe('Registration Flow with Login Validation', () => {
  let testData;
  const registrationPage = new RegistrationPage();
  const myAccountPage = new MyAccountPage();
  const loginPage = new LoginPage();

// user: testuser_23042025@example.com
// password: Test@1234

  before(() => {
    cy.fixture('registrationData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    registrationPage.navigateToRegistration();
  });

  it('should successfully register a new account', () => {
    
   // Generate unique email for each test run
   const timestamp = Date.now();
   const uniqueEmail = `testuser_${timestamp}@example.com`;
   
   // Fill registration form with test data
   registrationPage.fillRegistrationForm({
     firstName: testData.valid.firstName,
     lastName: testData.valid.lastName,
     email: uniqueEmail,
     password: testData.valid.password,
     confirmPassword: testData.valid.password
   });

    registrationPage.submitRegistration();
    
    // Add wait for page transition (better to use explicit waits for elements)
    cy.url().should('include', '/customer/account/');

     // Verify successful registration
    //  myAccountPage.getPageTitle()
    //  .should('be.visible')
    //  .and('contain', 'My Account');
    // console.log('Actual Success text:', myAccountPage.getSuccessMessage());
    // myAccountPage.getSuccessMessage()
    //   .should('be.visible')
    //   .and('contain', 'Thank you for registering');
    
    // Logout to test login functionality
    myAccountPage.logout();
    
    // Test login with newly created credentials
    loginPage.navigateToLogin();
    loginPage.fillLoginForm(uniqueEmail, testData.valid.password);
    loginPage.submitLogin();
    
    // Verify successful login
    myAccountPage.getPageTitle().should('contain', 'My Account');
    console.log('Actual Welcome text:', myAccountPage.getWelcomeMessage());
    console.log('Expected Welcome text:', `Welcome, ${testData.valid.firstName} ${testData.valid.lastName}!`);
    myAccountPage.getWelcomeMessage().should('contain', `Welcome, ${testData.valid.firstName} ${testData.valid.lastName}!`);
  });
});