export class ShoppingCartPage {
    // Element selectors
    elements = {
      subtotalPrice: () => cy.get('.totals.sub .price',{timeout:10000}),
      grandTotalPrice: () => cy.get('.grand.totals .price'),
      emptyCartMessage: () => cy.get('.cart-empty'),
      checkoutButton: () => cy.get('.item').children('.action.primary.checkout'),
      productRow: (productName) => cy.contains('.product-item-name', productName, { timeout: 15000 }).parents('tbody, tr, .cart-item'),
      removeButton: (productName) => cy.contains('.product-item-name', productName).closest('tbody, tr, .cart-item').find('.action-delete, .remove'), 
    };

    getProductRow(productName) {
      return cy.contains(productName).parents('tbody');
    }
    getProductsRows(){
      return cy.get('.cart.item .product-item-name').parents('tbody').then($names => {
        return Cypress._.map($names, name => name.innerText.trim());
      });
      // return cy.get('.cart.item .product-item-name').parents('tbody');
    }
    
    deleteProduct(productName){
      cy.wait(2000); // Wait for the cart to load
      cy.get('.loading-mask', { timeout: 10000 }).should('not.exist');
      // Wait for dropdown animation to complete
      cy.get('.ui-dialog.ui-widget',{multiple: true })
      .should('have.css', 'display');
      return cy.get('.action.action-delete',{multiple: true}).should('be.visible').first().click({force: true});
    }

    getProductNames() {
      cy.wait(2000); // Wait for the cart to load
      return cy.get('.cart.item .product-item-name').then($names => {
        return Cypress._.map($names, name => name.innerText.trim());
      });
    }
  
    getSubtotal() {
      cy.wait(5000); // Wait for the cart to load
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