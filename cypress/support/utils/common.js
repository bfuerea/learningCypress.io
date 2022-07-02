//example code
// export const loginViaUI = (username, password) => {
//     cy.get("[data-cy='login-email-field']").type(username);
//     cy.get("[data-cy='login-password-field']").type(password);
//     cy.get("[data-cy='submit-button']").submit()
//   }

//usage of example code within script
// import {
//     loginViaUI
//   } from '../support/utils/common.js';
  
//   describe("Login", () => {
//     it('should allow user to log in', () => {
//       cy.visit('/login');
//       loginViaUI('username', 'password');
//     });
//   });

export const dataCy = (value, suffix = "") => {
    return `[data-cy='${value}']${suffix}`;
  };