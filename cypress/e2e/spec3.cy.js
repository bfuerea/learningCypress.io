// B: Tema de automatizare -> Access the following application: http://automationpractice.com/index.php
// 1. Create automated tests scripts for the scenarios that must be included in the regression test plan for the order placement process.

// reason why there is no easy way to have multiple -it- blocks in cypress for this test website: https://github.com/cypress-io/cypress/issues/17710


describe('The ORDER PLACEMENT PROCESS', () => {


  it('Verifies a purchase.', () => {
    cy.visit('http://automationpractice.com/index.php')

    // check user is not logged in
    cy.get('.login').contains('Sign in')

    // log in
    cy.get('.login').click().wait(2000)
    cy.clearAndType('#email','hogad67373@weepm.com')
    cy.clearAndType('#passwd','12345')
    cy.slowClick('#SubmitLogin > span')

    // check user is logged in
    cy.get('.account > span')
    cy.get('.logo').click().wait(2000)

    // check empty shopping cart and refresh page
    cy.get('.ajax_cart_no_product')
    cy.get('.logo').click()

    // add product to cart - search for product and quick-add to cart
    cy.clearAndType('#search_query_top', 'dress{enter}')
    cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click().wait(5000)

    // check confirmation message
    cy.get('.layer_cart_product > h2').contains('Product successfully added to your shopping cart')
    cy.get('.continue > span').click().wait(2000)

    // check cart is not empty and hover action over cart
    cy.get('[title="View my shopping cart"] > .ajax_cart_quantity').contains('1')
    cy.get('[title="View my shopping cart"]').trigger('mouseover')
    // cy.wait(1000) // allowing enough time for the image to load properly
    // cy.get('.cart-images > img').should('be.visible').screenshot('product-image')
    // cy.get('.first_item > .cart-images > img').should('be.visible').screenshot('product-image')

    // remove product from cart
    cy.get('.ajax_cart_block_remove_link').click()
    cy.get('.logo').click().wait(2000)

    // back to searching for other product - add it through its page
    cy.clearAndType('#search_query_top', 'dress{enter}').wait(2000)
    cy.get(':nth-child(2) > .product-container > .right-block > h5 > .product-name').click().wait(5000)
    cy.get('#group_1').select('M').wait(1000)
    cy.get('.exclusive > span').click().wait(5000)

    // checking for confirmation message
    cy.get('.layer_cart_product > h2').contains('Product successfully added to your shopping cart')
    cy.get('h2 > .ajax_cart_product_txt').contains('There is 1 item in your cart.')

    // enter shopping cart and check for product
    cy.get('.button-container > .button-medium > span > .icon-chevron-right').click()
    cy.wait(2000)
    cy.get('#summary_products_quantity').contains('1 Product')
    cy.get('[title="View my shopping cart"]').click()

    // check product costs
    cy.currencyUSD('#product_price_4_17_716270 > .price').should('eq', 50.99)
    cy.get('#cart_quantity_up_4_17_0_716270 > span').click().wait(2000)
    cy.get('.cart_quantity_input').should('have.value', '2')
    cy.currencyUSD('#total_product_price_4_17_716270').should('eq', 101.98)
    cy.currencyUSD('#total_product').should('eq', 101.98)
    cy.currencyUSD('#total_shipping').should('eq', 2.00)
    cy.currencyUSD('#total_price_without_tax').should('eq', 103.98)
    cy.currencyUSD('#total_price').should('eq', 103.98)

    // add one more different product
    cy.clearAndType('#search_query_top','shirt{enter}').wait(2000)
    cy.get('.lnk_view > span').click().wait(2000)
    cy.get('#quantity_wanted').should('have.value', '1')
    cy.get('.button-plus > span').dblclick()
    cy.get('#quantity_wanted').should('have.value', '3')
    cy.get('.exclusive > span').click().wait(2000)

    // check confirmation message (this time should calculate also the number of copies of the same product)
    cy.get('h2 > .ajax_cart_product_txt_s').contains('There are 5 items in your cart.')
    cy.currencyUSD('#layer_cart_product_price').should('eq', 49.53)
    cy.currencyUSD('.ajax_block_products_total').should('eq', 151.51)
    cy.currencyUSD(':nth-child(4) > .ajax_block_cart_total').should('eq', 153.51)

    // continue to cart
    cy.get('.button-medium > span').click().wait(2000)

    // check the math - calculate prices for the products and total sum to pay
    cy.currencyUSD('#product_price_4_17_716270 > .price').as('product1Price')
    cy.get('#product_4_17_0_716270 > .cart_quantity > .cart_quantity_input').invoke('val').as('product1Quantity')
    cy.currencyUSD('#total_product_price_4_17_716270').then(x => {
      cy.get('@product1Price').then(price => {
        cy.get('@product1Quantity').then(number => {
          cy.expect(x).to.eq(price * number)
        })
      })
    })
    cy.currencyUSD('#total_product_price_4_17_716270').as('product1Total')

    cy.currencyUSD('#product_price_1_1_716270 > .price').as('product2Price')
    cy.get('#product_1_1_0_716270 > .cart_quantity > .cart_quantity_input').invoke('val').as('product2Quantity')
    cy.currencyUSD('#total_product_price_1_1_716270').then(y => {
      cy.get('@product2Price').then(price => {
        cy.get('@product2Quantity').then(number => {
          cy.expect(y).to.eq(price * number)
        })
      })
    }).as('product2Total')

    cy.currencyUSD('#total_product_price_1_1_716270').as('product2Total')
    cy.currencyUSD('#total_shipping').as('shipping')

    cy.currencyUSD('#total_price').then(total => {
      cy.get('@product1Total').then(product1Total => {
        cy.get('@product2Total').then(product2Total => {
          cy.get('@shipping').then(shipping => {
            cy.expect(total).to.eq(product1Total + product2Total + shipping)
          })
        })
      })
    })

    // same as above but with the commands.js file
    cy.totalPriceCalculator('#product_price_4_17_716270 > .price', '#product_4_17_0_716270 > .cart_quantity > .cart_quantity_input', '#total_product_price_4_17_716270')
    cy.totalPriceCalculator('#product_price_1_1_716270 > .price', '#product_1_1_0_716270 > .cart_quantity > .cart_quantity_input', '#total_product_price_1_1_716270')
    cy.totalToPayCalculator('#total_product', '#total_shipping', '#total_price')

    // proceed to checkout  
    cy.get('.cart_navigation > .button > span').click()

    // deliver address verification step - out of the scope of this test
    cy.get('.cart_navigation > .button > span').click()

    // shipping options step - out of the scope of this test. Checking Terms of Service being checked as mandatory for advancing to next step
    cy.get('.cart_navigation > .button > span').click()
    cy.get('.fancybox-error').should('be.visible').and('contain', 'You must agree to the terms of service before continuing.')
    cy.get('.fancybox-item').click()

    // checking the terms of service checkbox and clicking on the next step
    cy.get('#cgv').click()
    cy.get('.cart_navigation > .button > span').click()
    
    // checkout / payment step. - select payment method and click on the next step
    cy.currencyUSD('#total_product_price_4_17_716270').should('eq', 101.98)
    cy.currencyUSD('#total_product_price_1_1_716270').should('eq', 49.53)
    cy.currencyUSD('#total_product').should('eq', 151.51)
    cy.currencyUSD('#total_shipping').should('eq', 2.00)
    cy.totalToPayCalculator('#total_product', '#total_shipping', '#total_price')
    cy.get('.bankwire').click() // selected bank-wire payment method will automatically go to next step

    // check the values on the confirmation page  
    cy.get('.navigation_page').should('contain', 'Bank-wire payment')
    cy.get('#center_column > form > div > h3').should('contain', 'Bank-wire payment')
    cy.get('.cheque-indent > .dark').should('contain', 'You have chosen to pay by bank wire.')
    cy.currencyUSD('#amount').should('eq', 153.51)
    // cy.get('.cart_navigation > .button > span').click()

    // change payment method - go back to select payment method page and select the other option
    cy.get('.button-exclusive').click()
    cy.get('.cheque').click()

    // check payment method - verify fields
    cy.get('.navigation_page').should('contain', 'Check payment')
    cy.get('#center_column > form > div > h3').should('contain', 'Check payment')
    cy.get('.cheque-indent > .dark').should('contain', 'You have chosen to pay by check.')
    cy.currencyUSD('#amount').should('eq', 153.51)
    cy.get('#cart_navigation > .button > span').click()

    // verify order confirmation page
    cy.get('.alert').should('be.visible').and('contain', 'Your order on My Store is complete.')
    cy.currencyUSD('.price > strong').should('eq', 153.51)
    // and checking name and e-mail address can't be done due to hardcoded information


  }) 

})