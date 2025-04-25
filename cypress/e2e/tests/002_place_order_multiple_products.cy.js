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
    // Cypress.on('uncaught:exception', () => true);
    // Test data
    const products = [
      { name: 'Radiant Tee', size: 'M', color: 'Blue', qty: 1, price: 22.00 },
      { name: 'Argus All-Weather Tank', size: 'L', color: 'Gray', qty: 1, price: 22.00 }
    ];

    // Add products to cart
    products.forEach((product) => {
      productPage.addProductToCart(product.name,product.size,product.color);
      // Verify success message
      productPage.getSuccessMessage().should('contain', `You added ${product.name} to your shopping cart.`);
    
    });

    // Go to cart and verify products
    homePage.goToCart();
    
    // Verify all products are in cart
    products.forEach((product) => {
      cartPage.getProductNames().then(productNames => {
        expect(productNames).to.include(product.name);
        
      });
    });

    // Calculate expected totals
    const subtotal = products.reduce((sum, product) => sum + (product.price * product.qty), 0);
    // const grandTotal = parseFloat((subtotal).toFixed(2));

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
    // checkoutPage.selectShippingMethod('Flat Rate');
    
    checkoutPage.selcteNextButton();
    // Place order
    checkoutPage.placeOrder();

    // Verify success page
    checkoutPage.getSuccessMessage().should('contain', 'Thank you for your purchase!');
    checkoutPage.getOrderNumber().should('exist');
  });
  it('should verify empty cart message after removing all items', () => {
    const products = [
      { name: 'Radiant Tee', size: 'S', color: 'Purple', qty: 1, price: 22.00 },
    ];
      // Add products to cart
      products.forEach((product) => {
        productPage.addProductToCart(product.name,product.size,product.color);
        // Verify success message
        productPage.getSuccessMessage().should('contain', `You added ${product.name} to your shopping cart.`);
      });
  
    // Go to cart
    homePage.goToCart();

    // Remove all items from cart
    cartPage.getProductNames().then(productNames => {
      productNames.forEach((productName) => {
        cartPage.deleteProduct(productName);
      });
    });

    // Verify empty cart message
    cartPage.elements.emptyCartMessage().should('be.visible');
  });

});