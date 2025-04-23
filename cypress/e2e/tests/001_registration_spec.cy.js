/// <reference types="cypress" />
import { RegistrationPage } from '../pages/RegistrationPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
describe('Registration Flow with Login Validation', () => {
  let testData;
  const registrationPage = new RegistrationPage();
  const myAccountPage = new MyAccountPage();
  const loginPage = new LoginPage();

  // Load test data from fixture file
  // This is a good practice to keep test data separate from test logic
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
     myAccountPage.getPageTitle().should('contain', 'My Account');
    console.log('Actual Success text:', myAccountPage.getSuccessMessage());
    myAccountPage.getSuccessMessage()
      .should('be.visible')
      .and('contain', 'Thank you for registering');
    
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

  it('should show error for existing email registration', () => {
    registrationPage.fillRegistrationForm({
      firstName: testData.invalid.existingEmail.firstName,
      lastName: testData.invalid.existingEmail.lastName,
      email: testData.invalid.existingEmail.email,
      password: testData.invalid.existingEmail.password,
      confirmPassword: testData.invalid.existingEmail.password
    });

    registrationPage.submitRegistration();

    // Verify error message for existing email
    registrationPage.getExistingEmailErrorMessage().should('contain', 'There is already an account with this email address');
  });

  it('should show error for password mismatch', () => {
    registrationPage.fillRegistrationForm({
      firstName: testData.invalid.passwordMismatch.firstName,
      lastName: testData.invalid.passwordMismatch.lastName,
      email: `test_${new Date().getTime()}@example.com`,
      password: testData.invalid.passwordMismatch.password,
      confirmPassword: 'different_password'
    });

    registrationPage.submitRegistration();

    // Verify error message for password mismatch
    registrationPage.getErrorMessage().should('contain', 'Please enter the same value again');
  });

  it('should show error for weak password', () => {
    registrationPage.fillRegistrationForm({
      firstName: testData.invalid.weakPassword.firstName,
      lastName: testData.invalid.weakPassword.lastName,
      email: `test_${new Date().getTime()}@example.com`,
      password: testData.invalid.weakPassword.password,
      confirmPassword: testData.invalid.weakPassword.password
    });

    registrationPage.submitRegistration();

    // Verify error message for weak password
    registrationPage.getPasswordError().should('contain', 'Minimum length of this field must be equal or greater than 8');
  });
});