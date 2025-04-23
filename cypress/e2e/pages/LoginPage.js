export class LoginPage {
    elements = {
      emailInput: () => cy.get('#email'),
      passwordInput: () => cy.get('#pass'),
      loginButton: () => cy.get('#send2')
    };
  
    navigateToLogin() {
      cy.get('.authorization-link a').contains('Sign In').click();
    }
  
    fillLoginForm(email, password) {
      this.elements.emailInput().type(email);
      this.elements.passwordInput().type(password);
    }
  
    submitLogin() {
      this.elements.loginButton().click();
    }
  }