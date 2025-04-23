export class RegistrationPage {
    elements = {
      firstNameInput: () => cy.get('#firstname'),
      lastNameInput: () => cy.get('#lastname'),
      emailInput: () => cy.get('#email_address'),
      passwordInput: () => cy.get('#password'),
      confirmPasswordInput: () => cy.get('#password-confirmation'),
      submitButton: () => cy.get('.submit'),
      errorMessage: () => cy.get('.mage-error'),
      existingEmailError: () => cy.get('.messages div'),
      passwordError: () => cy.get('#password-error'),
      successMessage: () => cy.get('.message-success')
    };
  
    navigateToRegistration() {
      cy.get('.page-header ul').contains('Create an Account').click();
    }
  
    fillRegistrationForm({ firstName, lastName, email, password, confirmPassword }) {
      this.elements.firstNameInput().should('be.visible').type(firstName);
      this.elements.lastNameInput().type(lastName);
      this.elements.emailInput().type(email);
      this.elements.passwordInput().type(password);
      this.elements.confirmPasswordInput().type(confirmPassword);
    }
  
    submitRegistration() {
      this.elements.submitButton().click();
    }
  
    getErrorMessage() {
      return this.elements.errorMessage();
    }
    getExistingEmailErrorMessage() {
      return this.elements.existingEmailError();
    }
  
    getPasswordError() {
      return this.elements.passwordError();
    }
  }