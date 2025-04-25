/// <reference types="cypress" />
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

describe('Search and Validate Results', () => {
  const homePage = new HomePage();
  const searchResultsPage = new SearchResultsPage();
  let searchData;

  before(() => {
    cy.fixture('searchTestData.json').then((data) => {
      searchData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should return valid results for search terms', () => {
    searchData.validSearches.forEach((searchCase) => {
      // Perform search
      homePage.searchProduct(searchCase.term);

      // Verify search results
      searchResultsPage.verifySearchResultsPage(searchCase.term);
      searchResultsPage.verifyMinimumResults(searchCase.minResults);
      searchResultsPage.verifyProductInResults(searchCase.expectedProduct);
      searchResultsPage.verifyAllProductsContainTerm(searchCase.term);
      searchResultsPage.verifySearchTermPersisted(searchCase.term);

      // Go back to home page for next search
      cy.visit('/');
    });
  });

  it('should handle invalid search terms', () => {
    // Perform invalid search
    homePage.searchProduct(searchData.invalidSearch.term);
    // Verify no results
    searchResultsPage.verifyNoResultsMessage(searchData.invalidSearch.term);
  });

  it('should show search suggestions', () => {
    // Type partial search term
    homePage.typeInSearch(searchData.partialSearch.term);
    // Verify suggestions
    homePage.verifySearchSuggestionsVisible();
    searchData.partialSearch.expectedSuggestions.forEach((suggestion) => {
      homePage.verifySuggestionsContain(suggestion);
    });
  });
});