export class CheckoutPage {

    // Element selectors
    elements = {
      // Shipping Address Section
      emailInput: () => cy.get('#customer-email'),
      firstNameInput: () => cy.get('[name="firstname"]'),
      lastNameInput: () => cy.get('[name="lastname"]'),
      companyInput: () => cy.get('[name="company"]'),
      streetAddress1Input: () => cy.get('[name="street[0]"]'),
      streetAddress2Input: () => cy.get('[name="street[1]"]'),
      cityInput: () => cy.get('[name="city"]'),
      stateSelect: () => cy.get('[name="region_id"]'),
      zipInput: () => cy.get('[name="postcode"]'),
      countrySelect: () => cy.get('[name="country_id"]'),
      phoneInput: () => cy.get('[name="telephone"]'),
  
      // Shipping Method Section
      shippingMethods: () => cy.get('[name="shipping_method"]'),
      shippingMethodLabel: (method) => cy.contains('.shipping-method label', method),
  
      // Payment Method Section
      paymentMethods: () => cy.get('[name="payment[method]"]'),
      placeOrderButton: () => cy.get('.payment-method._active button.checkout'),
  
      // Order Summary Section
      orderSummary: () => cy.get('.opc-block-summary'),
      subtotalPrice: () => cy.get('.subtotal .price'),
      shippingPrice: () => cy.get('.shipping .price'),
      taxPrice: () => cy.get('.tax .price'),
      grandTotalPrice: () => cy.get('.grand_total .price'),
  
      // Order Success Section
      successMessage: () => cy.get('.page-title'),
      orderNumber: () => cy.get('.order-number'),
      continueShoppingButton: () => cy.get('.action.continue')
    };
  
    // Methods
  
    /**
     * Fill shipping address form
     * @param {Object} address - Address object containing:
     *   email, firstName, lastName, company, street1, street2, city, state, zip, country, phone
     */
    fillShippingAddress(address) {
      if (address.email) {
        this.elements.emailInput().type(address.email);
      }
  
      this.elements.firstNameInput().type(address.firstName);
      this.elements.lastNameInput().type(address.lastName);
  
      if (address.company) {
        this.elements.companyInput().type(address.company);
      }
  
      this.elements.streetAddress1Input().type(address.street1);
  
      if (address.street2) {
        this.elements.streetAddress2Input().type(address.street2);
      }
  
      this.elements.cityInput().type(address.city);
      this.elements.stateSelect().select(address.state);
      this.elements.zipInput().type(address.zip);
      this.elements.countrySelect().select(address.country);
      this.elements.phoneInput().type(address.phone);
  
      return this;
    }
  
    /**
     * Select shipping method
     * @param {string} method - Shipping method name (e.g., "Flat Rate")
     */
    selectShippingMethod(method) {
      this.elements.shippingMethodLabel(method).click();
      return this;
    }
  
    /**
     * Select payment method
     * @param {string} method - Payment method name (e.g., "Credit Card")
     */
    selectPaymentMethod(method) {
      this.elements.paymentMethods().check(method, { force: true });
      return this;
    }
  
    /**
     * Place order
     */
    placeOrder() {
      this.elements.placeOrderButton().click();
      return this;
    }
  
    /**
     * Verify order summary totals
     * @param {Object} totals - Object containing expected totals:
     *   subtotal, shipping, tax, grandTotal
     */
    verifyOrderSummary(totals) {
      this.elements.orderSummary().within(() => {
        if (totals.subtotal) {
          this.elements.subtotalPrice().should('contain', `$${totals.subtotal.toFixed(2)}`);
        }
        if (totals.shipping) {
          this.elements.shippingPrice().should('contain', `$${totals.shipping.toFixed(2)}`);
        }
        if (totals.tax) {
          this.elements.taxPrice().should('contain', `$${totals.tax.toFixed(2)}`);
        }
        if (totals.grandTotal) {
          this.elements.grandTotalPrice().should('contain', `$${totals.grandTotal.toFixed(2)}`);
        }
      });
      return this;
    }
  
    /**
     * Verify order success page
     * @param {Object} options - Verification options:
     *   orderNumber: boolean - Whether to verify order number exists
     *   continueShopping: boolean - Whether to verify continue shopping button exists
     */
    verifyOrderSuccess(options = {}) {
      this.elements.successMessage().should('contain', 'Thank you for your purchase!');
  
      if (options.orderNumber) {
        this.elements.orderNumber().should('exist');
      }
  
      if (options.continueShopping) {
        this.elements.continueShoppingButton().should('exist');
      }
  
      return this;
    }
  
    /**
     * Continue shopping after order placement
     */
    continueShopping() {
      this.elements.continueShoppingButton().click();
      return this;
    }
    getOrderSummary() {
      return cy.get('.opc-block-summary');
    }
  
    getSubtotal() {
      return cy.get('.subtotal .price');
    }
    getSuccessMessage() {
      return cy.get('.page-title');
    }
  
    getOrderNumber() {
      return cy.get('.order-number');
    }
  
    getOrderTotal() {
      return cy.get('.grand_total span.price');
    }
  }