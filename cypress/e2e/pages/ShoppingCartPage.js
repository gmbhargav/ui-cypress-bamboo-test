export class ShoppingCartPage {
    // Element selectors
    elements = {
      subtotalPrice: () => cy.get('.totals.sub .price',{timeout:10000}),
      grandTotalPrice: () => cy.get('.grand.totals .price'),
      emptyCartMessage: () => cy.get('.cart-empty'),
      checkoutButton: () => cy.get('.item').children('.action.primary.checkout'),
    };

    getProductRow(productName) {
      return cy.contains(productName).parents('tbody');
    }

    getProductNames() {
      cy.wait(2000); // Wait for the cart to load
      return cy.get('.cart.item .product-item-name').then($names => {
        return Cypress._.map($names, name => name.innerText.trim());
      });
    }
  
    getSubtotal() {
      cy.wait(5000); // Wait for the cart to load
      // cy.get('.loading-mask', { timeout: 10000 }).should('not.be.visible');
      this.elements.subtotalPrice().should('not.have.class', 'loading');
      this.elements.subtotalPrice().should('not.have.class', 'loading-mask');
      this.elements.subtotalPrice().should('be.visible');
      cy.log('Subtotal element:', this.elements.subtotalPrice());
      return this.elements.subtotalPrice();
    }
  
    proceedToCheckout() {
      cy.wait(2000); // Wait for the cart to load 
      cy.get('.loading-mask', { timeout: 10000 }).should('not.exist');
      // Wait for dropdown animation to complete
      cy.get('.ui-dialog.ui-widget',{multiple: true })
      .should('have.css', 'display');
      // return cy.get('#top-cart-btn-checkout').should('be.visible').click({force: true});
      return this.elements.checkoutButton().should('be.visible').click({force: true});
      }
  }