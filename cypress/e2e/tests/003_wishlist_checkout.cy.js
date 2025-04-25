/// <reference types="cypress" />
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { WishlistPage } from '../pages/WishlistPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';

describe('Wishlist Functionality and Checkout', () => {
 
  const homePage = new HomePage();
  const productPage = new ProductPage();
  const wishlistPage = new WishlistPage();
  const cartPage = new ShoppingCartPage();
  const checkoutPage = new CheckoutPage();
  const loginPage = new LoginPage();
  let products; 
  let user; 

  before(() => {
    // Load test data using cy.fixture().then()
    cy.fixture('wishlistProducts').then((data) => {
      products = data;
    });
    cy.fixture('registrationData').then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    // Login before each test
    cy.visit('/');
    cy.clearCookies();
    cy.clearLocalStorage();
    loginPage.login(user.valid.email, user.valid.password);
  });

    it('should add products to wishlist and checkout from wishlist', () => {  
         // 1. Add products to wishlist
        products.forEach((product) => {
            homePage.searchProduct(product.name);
            homePage.selectProduct(product.name);
            productPage.selectSize(product.size);
            productPage.selectColor(product.color);
            Cypress.on('uncaught:exception', (err, runnable) => {
                // Ignore this specific error
                if (err.message.includes('AddFotoramaVideoEvents')) {
                  return false; // prevent Cypress from failing the test
                }
                // return true for other errors so they still fail the test
                return true;
              });
            productPage.addToWishlist();
            productPage.verifyAddToWishlistSuccess(product.name);
        });
  
      // 2. Navigate to wishlist
      wishlistPage.navigateToWishlist();
  
      // 3. Verify all products are in wishlist
      products.forEach((product) => {
        wishlistPage.verifyProductInWishlist(product.name);
      });
  
      // 4. Add all wishlist items to cart
      wishlistPage.addAllToCart();
  
      // 5. Verify success message and navigate to cart
      productPage.getSuccessMessage().should('contain','product(s) have been added to shopping cart');
      homePage.goToCart();
  
      // 6. Verify products in cart
      products.forEach((product) => {
        cartPage.getProductNames().then(productNames => {
          expect(productNames).to.include(product.name);
        });
      });
  
      // Calculate expected totals
    const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    // const grandTotal = parseFloat((subtotal).toFixed(2));

    // 7. Verify price calculations
    cartPage.getSubtotal().then(($el) => {
      const displayedSubtotal = parseFloat($el.text().replace('$', ''));
      expect(displayedSubtotal).to.eq(subtotal);
    });

    // Proceed to checkout
    cartPage.proceedToCheckout();
  
      // 8. Fill shipping information
      checkoutPage.fillShippingAddress({
        firstName: 'Test',
        lastName: 'User',
        street1: '123 Main St',
        city: 'New York',
        state: 'New York',
        zip: '10001',
        country: 'United States',
        phone: '5551234567'
      });
  
      // 9. Place order
      checkoutPage.selcteNextButton();
      checkoutPage.placeOrder();

        // Verify success page
        checkoutPage.getSuccessMessage().should('contain', 'Thank you for your purchase!');
        checkoutPage.getOrderNumber().should('exist');
    
      // 11. Verify wishlist is now empty
      wishlistPage.navigateToWishlist();
      wishlistPage.verifyWishlistEmpty();
    });
});