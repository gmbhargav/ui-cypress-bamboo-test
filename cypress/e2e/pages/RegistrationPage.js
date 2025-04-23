class RegistrationPage {
    elements = {
      firstNameInput: () => cy.get('#firstname'),
      lastNameInput: () => cy.get('#lastname'),
      emailInput: () => cy.get('#email_address'),
      passwordInput: () => cy.get('#password'),
      confirmPasswordInput: () => cy.get('#password-confirmation'),
      submitButton: () => cy.get('.submit'),
      errorMessage: () => cy.get('.message-error'),
      passwordError: () => cy.get('#password-error'),
      successMessage: () => cy.get('.message-success')
    };
  
    navigateToRegistration() {
      cy.get('.authorization-link a').contains('Create an Account').click();
    }
  
    fillRegistrationForm({ firstName, lastName, email, password, confirmPassword }) {
      this.elements.firstNameInput().type(firstName);
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
  
    getPasswordError() {
      return this.elements.passwordError();
    }
  }
  
  export default RegistrationPage;