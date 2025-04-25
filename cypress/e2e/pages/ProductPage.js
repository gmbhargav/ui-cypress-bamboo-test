export class ProductPage {
    elements = {
      searchItem: () => cy.get('#search'),
      searchButton: () => cy.get('.action.search'),
      productItem: () => cy.get('.product-item'),
      sizeOptions: () => cy.get('.swatch-option.text'),
      colorOptions: () => cy.get('.swatch-option.color'),
      quantityInput: () => cy.get('#qty'),
      // addToCartButton: () => cy.get('.product-addtocart-button',{ multiple: true }).first(),
      addToCartButton: () => cy.get('#product-addtocart-button',{timeout:10000}),
      continueShoppingButton: () => cy.get('.action.continue'),
      successMessage: () => cy.get('.message-success',{timeout:10000}),
    };
    searchProduct(productName) {
      this.elements.searchItem().should('be.visible').clear().type(productName);;
      return this.elements.searchButton().should('be.visible').click();
    }
    selectProduct(productName) {
      return  cy.get('.product-item-link',{ multiple: true }).contains(productName).first().click();
    }
  
  
    selectSize(size) {
      return this.elements.sizeOptions().contains(size).click();
    }
  
    selectColor(color) {
      return cy.get(`.swatch-option.color[option-label="${color}"]`).click();
    }

    hoverOverProduct(productItem) {
        cy.get('.product-item-link',{ multiple: true }).contains(productItem).first().realHover();
        cy.wait(2000); // Wait for the hover effect to take place
        return this;
      }
  
    setQuantity(qty) {
      this.elements.quantityInput().clear().type(qty);
      return this;
    }
  
    addToCart() {
      this.elements.addToCartButton().should('be.visible').click()
      return this.elements.addToCartButton().should('be.visible');
    }
  
    continueShopping() {
      this.elements.continueShoppingButton().click();
      return this;
    }
  
    getSuccessMessage() {
      cy.wait(2000);
      return this.elements.successMessage();
    }

    // Add these methods to your existing ProductPage class
    addToWishlist() {
      return cy.get('.product-addto-links').children('.action.towishlist').click();
    }

    verifyAddToWishlistSuccess(productName) {
      return  cy.get('.message-success',{multiple: true})
        .should('be.visible')
        .and('contain', `${productName} has been added to your Wish List`);
    }

    addProductToCart(name,size,color) { 
      this.searchProduct(name);
      this.selectProduct(name);
      this.selectSize(size);
      this.selectColor(color);
      return this.addToCart();
    }

  }