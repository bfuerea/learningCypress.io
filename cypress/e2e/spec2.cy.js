// B: Tema de automatizare -> Access the following application: http://automationpractice.com/index.php
// 1. Create automated tests scripts for the scenarios that must be included in the regression test plan for the order placement process.



describe('The ORDER PLACEMENT PROCESS', () => {
  beforeEach(() => {
    cy.setCookie('PrestaShop-a30a9934ef476d11b6cc3c983616e364', 'WbQQhSQskmBDR4mXyNM8IzjNNgj8%2BGD0CntppQfOA5KuO%2BnnByWCeWNoqML0u%2Fa8L90RaMwVwUjgblaR3b6UT8DxDbjfOSnYDKDXqe9bfz%2Bz5beLLuy%2BQuNZUaV7cBOtKLYdQz4%2FTieJhS1LCWCqhENodFJ5bmFM34rFyCSWexY%3D000119')
  })
  
  it('Opens the page.', () => {
    cy.visit('http://automationpractice.com/index.php')
  }) 

  it('Checks user is not logged in.', () => {
    cy.get('.login').contains('Sign in')
  })

  it('logs in the user, checks it is logged in', () => {
    cy.get('.login').click().wait(2000)
    cy.clearAndType('#email','hogad67373@weepm.com')
    cy.clearAndType('#passwd','12345')
    cy.slowClick('#SubmitLogin > span')
    cy.get('.account > span')
    cy.get('.logo').click().wait(2000)
  })

  it('Checks the shopping cart is empty', () => {
    cy.get('.ajax_cart_no_product')
  })

  it('finds some products using the search field and adds to cart', () => {
    cy.get('.logo').click()
    cy.clearAndType('#search_query_top', 'dress{enter}')
    cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click().wait(5000)
  })

  it('checks the success message for adding the product to cart', () => {
    cy.get('.layer_cart_product > h2').contains('Product successfully added to your shopping cart')
    cy.get('.continue > span').click().wait(2000)
  })

  it('checks the shopping cart has been updated', () => {
    cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').contains('1')
  })

  it('hover action on cart and remove the item' , () => {
    cy.get('[title="View my shopping cart"]').trigger('mouseover')
    cy.wait(1000) // allowing enough time for the image to load properly
    cy.get('.cart-images > img').should('be.visible').screenshot('product-image')
    cy.get('.ajax_cart_block_remove_link').click()
  })


  it('finds some other product using the search field and adds to cart', () => {
    cy.get('.logo').click().wait(2000)
    cy.clearAndType('#search_query_top', 'dress{enter}').wait(2000)
    cy.get(':nth-child(2) > .product-container > .right-block > h5 > .product-name').click().wait(5000)
    cy.get('#group_1').select('M').wait(1000)
    cy.get('.exclusive > span').click().wait(5000)
  })

  it('checks the success message for adding the product to cart', () => {
    cy.get('.layer_cart_product > h2').contains('Product successfully added to your shopping cart')
    cy.get('h2 > .ajax_cart_product_txt').contains('There is 1 item in your cart.')
  })

  it ('proceeds to checkout', () => {
    cy.get('.button-container > .button-medium > span > .icon-chevron-right').click()
    cy.wait(2000)
  })

  it('checks the shopping cart number of products', () => {
    cy.get('#summary_products_quantity').contains('1 Product')
  })

  // it('opens the shopping cart page', () => {
  //   cy.get('[title="View my shopping cart"]').click()
  //   cy.get('#summary_products_quantity').contains('1 Product')
  // })

  // it('checks the amount depending on the product value and number of items', () => {
  //   cy.currencyUSD('#product_price_5_19_0 > .price').should('eq', 28.98)
  //   cy.get('#cart_quantity_up_5_19_0_0 > span').dblclick()
  //   cy.get('.cart_quantity_input').should('have.value', '2')
  //   cy.currencyUSD('#total_product_price_5_19_0').should('eq', '59.96')
  //   cy.currencyUSD('#total_shipping').should('eq', 2.00)
  //   cy.currencyUSD('#total_price').should('eq', '61.96')
  // })


  afterEach(() => {

  })
})