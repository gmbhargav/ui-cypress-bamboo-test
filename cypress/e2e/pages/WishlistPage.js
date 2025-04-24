export class WishlistPage {
    elements = {
      wishlistItems: () => cy.get('.products-grid.wishlist .product-item'),
      productItem: (productName) => cy.contains('.product-item-name', productName).parents('.product-item'),
      addToCartButton: (productName) => cy.contains('.product-item-name', productName).parents('.product-item').find('.action.tocart'),
      addAllToCartButton: () => cy.get('button[data-role="all-tocart"]'),
      emptyWishlistMessage: () => cy.get('.message.info.empty'),
      successMessage: () => cy.get('.message-success')
    };
  
    navigateToWishlist() {
      cy.visit('/wishlist');
      return cy.get('.page-title').should('contain', 'My Wish List');
    }
  
    verifyProductInWishlist(productName) {
      this.elements.productItem(productName)
        .should('be.visible')
        .within(() => {
          cy.get('.product-item-name').should('contain', productName);
        });
      return this;
    }
  
    addToCart(productName) {
      return this.elements.addToCartButton(productName).click();
    }
  
    addAllToCart() {
      cy.wait(2000);
      this.elements.addAllToCartButton()
        .should('be.visible')
        .and('contain', 'Add All to Cart');
      this.elements.addAllToCartButton()
        .should('be.visible')
        .and('contain', 'Add All to Cart');
      this.elements.addAllToCartButton().click({force: true});
      return this.elements.addAllToCartButton()
        .should('not.exist'); 
    }
  
    verifyWishlistEmpty() {
      this.elements.emptyWishlistMessage()
        .should('be.visible')
        .and('contain', 'You have no items in your wish list');
      return this;
    }
  
    verifyAddToCartSuccess() {
      this.elements.successMessage()
        .should('be.visible')
        .and('contain', 'Added products to cart successfully');
      return this;
    }
  }