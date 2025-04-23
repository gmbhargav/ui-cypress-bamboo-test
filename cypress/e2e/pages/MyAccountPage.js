export class MyAccountPage {
    elements = {
      pageTitle: () => cy.get('.base'),
      successMessage: () => cy.get('.message-success'),
      welcomeMessage: () => cy.get('.logged-in'),
      customerName: () => cy.get('.customer-name',{ multiple: true }).first(),
      logoutLink: () => cy.get('.authorization-link a').contains('Sign Out')
    };
  
    getPageTitle() {
      return this.elements.pageTitle();
    }
  
    getSuccessMessage() {
      return this.elements.successMessage().ti;
    }
  
    getWelcomeMessage() {
      return this.elements.welcomeMessage();
    }
  
    logout() {
      this.elements.customerName().click();
      this.elements.logoutLink().click();
      cy.get('.page-title').should('contain', 'You are signed out');
    }
  }
