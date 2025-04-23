export class HomePage {
    // Element selectors
  elements = {
    searchItem: () => cy.get('#search'),
    searchButton: () => cy.get('.action.search'),
    cartIcon: () => cy.get('.showcart'),
    viewCartButton: () => cy.get('.viewcart'),
    productItem: () => cy.get('.product-item'),
  };

    searchProduct(productName) {
      this.elements.searchItem().should('be.visible').clear();
      // this.elements.searchItem().type(productName,+ '{enter}');
      this.elements.searchItem().type(productName);
      return this.elements.searchButton().should('be.visible').click();
    }
  
    selectProduct(productName) {
      // return cy.contains(productName).click();
      return  cy.get('.product-item-link',{ multiple: true }).contains(productName).first().click();
    }
  
    goToCart() {
      cy.get('.showcart').should('be.visible').click();
      return cy.get('.viewcart').should('be.visible').click();
     
    }
  }