export class HomePage {
    // Element selectors
  elements = {
    searchItem: () => cy.get('#search'),
    searchButton: () => cy.get('.action.search'),
    suggestionsDropdown: () => cy.get('#search_autocomplete'),
    suggestionItems: () => cy.get('.search-autocomplete li'),
    cartIcon: () => cy.get('.showcart'),
    viewCartButton: () => cy.get('.viewcart'),
    productItem: () => cy.get('.product-item'),
  };

    searchProduct(productName) {
      this.elements.searchItem().should('be.visible').clear().type(productName);;
      // this.elements.searchItem().type(productName,+ '{enter}');
      // this.elements.searchItem().type(productName);
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
    typeInSearch(term) {
      return this.elements.searchItem().clear().type(term,+'{space}');
    }
  
    verifySearchSuggestionsVisible() {
      return this.elements.suggestionsDropdown().should('be.visible');
    }
  
    verifySuggestionsContain(text) {
      return this.elements.suggestionItems().should('contain', text);
    }
  }