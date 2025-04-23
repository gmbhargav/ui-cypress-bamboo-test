/// <reference types="cypress" />
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';

describe('Place Order with Multiple Products (Price Calculation Checks)', () => {
    let userData;
  const homePage = new HomePage();
  const productPage = new ProductPage();
  const cartPage = new ShoppingCartPage();
  const checkoutPage = new CheckoutPage();
  const loginPage = new LoginPage();

  before(() => {
    cy.fixture('userCredentials').then((user) => {
        this,userData = user;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.clearCookies();
    cy.clearLocalStorage();
    loginPage.login(userData.email, userData.password);
  });

  it('should place order with multiple products and verify price calculations', () => {
    // Test data
    const products = [
      { name: 'Radiant Tee', size: 'M', color: 'Blue', qty: 1, price: 22.00 },
      { name: 'Argus All-Weather Tank', size: 'L', color: 'Gray', qty: 1, price: 22.00 }
    ];

    // Add products to cart
    products.forEach((product) => {
      homePage.searchProduct(product.name);
      homePage.selectProduct(product.name);
      
      productPage.selectSize(product.size);
      productPage.selectColor(product.color);
      // productPage.hoverOverProduct(product.name);
      // productPage.setQuantity(product.qty);
      // In your test file or support file
      Cypress.on('uncaught:exception', (err, runnable) => {
        // Ignore this specific error
        if (err.message.includes('AddFotoramaVideoEvents')) {
          return false; // prevent Cypress from failing the test
        }
        // return true for other errors so they still fail the test
        return true;
      });
      productPage.addToCart();
      
      // Verify success message
      productPage.getSuccessMessage().should('contain', `You added ${product.name} to your shopping cart.`);
      
    //   // Continue shopping unless it's the last product
      // if (product !== products[products.length - 1]) {
      //   productPage.continueShopping();
      // }
    });

    // Go to cart and verify products
    homePage.goToCart();
    
    // Verify all products are in cart
    products.forEach((product) => {
      cartPage.getProductRow(product.name).should('contain', product.name);
    });

    // Calculate expected totals
    const subtotal = products.reduce((sum, product) => sum + (product.price * product.qty), 0);
    const shipping = 5.00; // Example flat rate shipping
    const tax = parseFloat((subtotal * 0.08).toFixed(2)); // Example 8% tax
    const grandTotal = parseFloat((subtotal).toFixed(2));

    // Verify price calculations
    cartPage.getSubtotal().then(($el) => {
      const displayedSubtotal = parseFloat($el.text().replace('$', ''));
      expect(displayedSubtotal).to.eq(subtotal);
    });

    // Proceed to checkout
    cartPage.proceedToCheckout();

    // Fill shipping information
    checkoutPage.fillShippingAddress({
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Acme Inc',
      street1: '123 Main St',
      street2: 'Apt 1',
      city: 'New York',
      state: 'New York',
      zip: '10001',
      country: 'United States',
      phone: '5551234567'
    });

    // Select shipping method
    checkoutPage.selectShippingMethod('Flat Rate');

    // Verify order summary
    checkoutPage.getOrderSummary().within(() => {
      cy.get('.subtotal .price').should('contain', `$${subtotal.toFixed(2)}`);
      cy.get('.shipping .price').should('contain', `$${shipping.toFixed(2)}`);
      cy.get('.tax .price').should('contain', `$${tax.toFixed(2)}`);
      cy.get('.grand_total .price').should('contain', `$${grandTotal.toFixed(2)}`);
    });

    // Place order
    checkoutPage.placeOrder();

    // Verify success page
    checkoutPage.getSuccessMessage().should('contain', 'Thank you for your purchase!');
    checkoutPage.getOrderNumber().should('exist');

    // Verify order total on success page
    checkoutPage.getOrderTotal().should('contain', `$${grandTotal.toFixed(2)}`);
  });

  // it('should verify correct price calculation when updating quantities in cart', () => {
  //   // Test implementation for quantity updates
  // });

  // it('should verify price calculations when applying discount codes', () => {
  //   // Test implementation for discount codes
  // });
});