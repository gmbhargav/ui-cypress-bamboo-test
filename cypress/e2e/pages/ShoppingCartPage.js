export class ShoppingCartPage {
    getProductRow(productName) {
      return cy.contains(productName).parents('tbody');
    }
  
    getSubtotal() {
      return cy.get('.subtotal .price');
    }
  
    proceedToCheckout() {
      cy.get('.checkout').click();
      return this;
    }
  }