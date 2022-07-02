// B: Tema de automatizare -> Access the following application: http://automationpractice.com/index.php
// 1. Create automated tests scripts for the scenarios that must be included in the regression test plan for the order placement process.



describe('The ORDER PLACEMENT PROCESS - test scenario 001: it fails due to cart emptying itself. ', () => {
  beforeEach(() => {
    cy.setCookie('PrestaShop-a30a9934ef476d11b6cc3c983616e364', 'WbQQhSQskmBDR4mXyNM8IzjNNgj8%2BGD0CntppQfOA5KuO%2BnnByWCeWNoqML0u%2Fa8L90RaMwVwUjgblaR3b6UT8DxDbjfOSnYDKDXqe9bfz%2Bz5beLLuy%2BQuNZUaV7cBOtKLYdQz4%2FTieJhS1LCWCqhENodFJ5bmFM34rFyCSWexY%3D000119')
    cy.wait(1000)
  })
  
  it('Opens the page.', () => {
    cy.visit('http://automationpractice.com/index.php')
  }) 


  it('Checks user is not logged in.', () => {
    cy.visit('http://automationpractice.com/index.php')
    cy.get('.login').contains('Sign in')
  })

  it('Checks the shopping cart is empty in both views', () => {
    cy.get('.ajax_cart_no_product')
    cy.slowClick('[title="View my shopping cart"]')
  })

  it('finds some products using the search field and adds to cart', () => {
    cy.slowClick('.logo')
    cy.get('#search_query_top').type('dress{enter}')
    cy.slowClick(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span')
  })

  it('checks the success message for adding the product to cart', () => {
    cy.get('.layer_cart_product > h2').contains('Product successfully added to your shopping cart')
  })

  it('checks the shopping cart has been updated', () => {
    cy.wait(2000)
    cy.slowClick('.continue > span')
    cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').contains('1')
  })

  it('opens the shopping cart page', () => {
    cy.slowClick('.logo')
    cy.slowClick('[title="View my shopping cart"]')
    cy.get('#summary_products_quantity').contains('1 Product')
  })

  it('checks the amount depending on the product value and number of items', () => {
    cy.currencyUSD('#product_price_5_19_0 > .price').should('eq', 28.98)
    cy.get('#cart_quantity_up_5_19_0_0 > span').dblclick()
    cy.get('.cart_quantity_input').should('have.value', '2')
    cy.currencyUSD('#total_product_price_5_19_0').should('eq', '59.96')
    cy.currencyUSD('#total_shipping').should('eq', 2.00)
    cy.currencyUSD('#total_price').should('eq', '61.96')
  })


  afterEach(() => {

  })
})