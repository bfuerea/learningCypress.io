// describe('spec.cy.js', () => {
//   it('should visit', () => {
//     cy.visit('/')
//   })
// })

// example on how to use fixture files. see /cypress/fixtures/admin.json
// describe("Login", () => {
//   it("should be able to login", () => {
//     cy.visit("/");
//     cy.fixture("credentials/admin").then((user) => {
//       cy.get("[data-cy='login-email-field']").type(user.email);
//       cy.get("[data-cy='login-password-field']").type(user.password);
//     });
//     cy.get("[data-cy='submit-button']").click();
//   });
// })
// same example but for reusibility. see /cypress/fixtures/admin.json
// describe("Admin login", () => {
//   let userDetails;

//   beforeEach(() => {
//     cy.fixture("credentials/admin").then((user) => {
//       userDetails = user;
//     });
//   });

//   it("should be able to login", () => {
//     cy.get("[data-cy='login-email-field']").type(userDetails.email);
//     cy.get("[data-cy='login-password-field']").type(userDetails.password);
//     cy.get("[data-cy='submit-button']").click();
//   });
// });

// SOME SNIPPETS FROM THE FULL SCRIPT
beforeEach(() => {
    // noticed the website has 508 Resource Limit is Reached so we're gonna keep checking for its response code - makes tests faster
    // cy.intercept('http://automationpractice.com/index.php').as('getIndex')
    // cy.wait('@getIndex').then(({response}) => {
    //       expect(response.statusCode).to.eq(200)
    //     })      
})

    // cy.get('[title="View my shopping cart"]').click()
    // cy.get('.logo').click()
    // cy.get('.heading-counter').its('text').as('productCount')
    // cy.get('.heading-counter').innerText.as('productCount')
  //   cy.get('.heading-counter').invoke('text').then((text) => {
  //     var getFirst = text.left(1)
  //     cy.log(getFirst)
  //     // expect(getFirst).to.equal(1)
  // })
    // cy.get('.top-pagination-content > .product-count').its('text').should('contain', '@productCount items')
    // cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click()
        // cy.get('.continue > span').click()
    // cy.get('[title="View my shopping cart"]').click()
    // cy.get('#cart_quantity_up_5_19_0_0 > span > .icon-plus').click()  // this doesn't work properly
    // cy.get('#cart_quantity_up_5_19_0_0 > span').click() // same here. Clicking this doesn't work properly
     
    
    // cy.get(':nth-child(@itemNo) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click()

afterEach(() => {
    //   cy.wait('@getIndex').then(({response}) => {
    //     expect(response.statusCode).to.eq(200)
    //   })
    // cy.wait('@getIndex').its('response.statusCode').should('eq', 200) 
})
