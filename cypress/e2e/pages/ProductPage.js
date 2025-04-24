export class ProductPage {
    elements = {
      productItem: () => cy.get('.product-item'),
      sizeOptions: () => cy.get('.swatch-option.text'),
      colorOptions: () => cy.get('.swatch-option.color'),
      quantityInput: () => cy.get('#qty'),
      // addToCartButton: () => cy.get('.product-addtocart-button',{ multiple: true }).first(),
      addToCartButton: () => cy.get('#product-addtocart-button',{timeout:10000}),
      continueShoppingButton: () => cy.get('.action.continue'),
      successMessage: () => cy.get('.message-success',{timeout:10000}),
    };
  
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
    
    //   clickAddToCart() {
    //     this.elements.addToCartButton().should('be.visible').click();
    //     return this;
    //   }
    
      // addProductToCart() {
      //   // this.hoverOverProduct();
      //   this.clickAddToCart();
      //   return this;
      // }
  
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
  }