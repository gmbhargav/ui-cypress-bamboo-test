export class SearchResultsPage {
    elements = {
      pageTitle: () => cy.get('.page-title'),
      searchTermHeader: () => cy.get('.search.results .search.found'),
      productItems: () => cy.get('.product-item'),
      productItemNames: () => cy.get('.product-item-link'),
      noResultsMessage: () => cy.get('.message.notice'),
      searchInput: () => cy.get('#search')
    };
  
    verifySearchResultsPage(term) {
      this.elements.pageTitle().should('contain', `Search results for: '${term}'`);
    }
  
    verifyMinimumResults(minCount) {
      this.elements.productItems().should('have.length.at.least', minCount);
    }
  
    verifyProductInResults(productName) {
      this.elements.productItemNames().contains(productName).should('exist');
    }
  
    verifyAllProductsContainTerm(term) {
      this.elements.productItemNames().each($name => {
        expect($name.text().toLowerCase()).to.include(term.toLowerCase());
      });
    }
  
    verifyNoResultsMessage(term) {
      this.elements.noResultsMessage()
        .should('contain', 'Your search returned no results');
    }
  
    verifySearchTermPersisted(term) {
      this.elements.searchInput().should('have.value', term);
    }
  }