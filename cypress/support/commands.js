// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("clearAndType", (selector, text = "") => {
    cy.get(selector).clear().type(text);
  });
// usage is cy.clearAndType("inputElement", "valueToEnter");

Cypress.Commands.add('currencyUSD', (selector) => {
    cy.get(selector)   
      .invoke('text')                                  // get text
      .then(text => +text.replace('$', '').trim())    // remove currency and convert
  })


Cypress.Commands.add('slowClick', (selector) => {
  cy.get(selector)
    .click()
    .wait(2000)
})
// usage is cy.currencyUSD('selector').should('eq', @value)

// Note .invoke('text') extracts all text in the selected element and child elements.

// If there are more children of the wallet than just the value, e.g

// <div data-testid="wallet">
//   <div>Amount: </div>
//   <div class="css-3ro84u">100 kr</div>
// </div>
// you can add a .filter() to pick the currency child

// Cypress.Commands.add('currency', (selector) => {
//   cy.get(selector)   
//     .children()
//     .filter((index, child) => child.innerText.includes('kr'))   // filter
//     .invoke('text')                                
//     .then(text => +text.replace('kr', '').trim())               // convert
// })


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

Cypress.Commands.add('totalPriceCalculator', (pricePerUnitSelector, quantitySelector, totalPriceSelector) => {
  cy.currencyUSD(pricePerUnitSelector)
    .then(price => {
      cy.get(quantitySelector).invoke('val')
        .then(quantity => {
          cy.currencyUSD(totalPriceSelector)
            .then(total => {
                expect(total).to.eq(price * quantity);
              })
            })
        })
    })
// usage is cy.totalPriceCalculator('selector1', 'selector2', 'selector3');
// made for this -------------------------------------
// cy.currencyUSD('#product_price_4_17_716270 > .price').as('product1Price')
// cy.get('#product_4_17_0_716270 > .cart_quantity > .cart_quantity_input').invoke('val').as('product1Quantity')
// cy.currencyUSD('#total_product_price_4_17_716270').then(x => {
//   cy.get('@product1Price').then(price => {
//     cy.get('@product1Quantity').then(number => {
//       cy.expect(x).to.eq(price * number)
//     })
//   })
// })
// -----------------------------------------------------

// Cypress.Commands.add('totalProductsCalculator', (selector1, selector2, selector3) => {

// })


// since tax is always 0 
Cypress.Commands.add('totalToPayCalculator', (totalProductsSelector, totalShippingSelector, totalSelector) => {
  cy.currencyUSD(totalProductsSelector)
    .then(totalProducts => {
      cy.currencyUSD(totalShippingSelector)
        .then(totalShipping => {
          cy.currencyUSD(totalSelector)
            .then(total => {
              expect(total).to.eq(totalProducts + totalShipping);
            })
        })
    })
})

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
