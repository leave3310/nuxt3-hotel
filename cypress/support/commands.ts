/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import type { GetDomPayload } from "@cypress/typing/index.ts";

export function getDom({ dataName, className }: GetDomPayload) {
  const elName = (dataName ? `[data-cy='${dataName}']` : className) as string;
  return cy.get(elName);
}

export function setMobileSize() {
  cy.viewport(375, 667);
}

// 因為用下面的那個會有ts提示，上面的則是要使用到的地方才會跳提示
// Cypress.Commands.addAll({ getDom });
Cypress.Commands.add("getDom", getDom);
Cypress.Commands.add("setMobileSize", setMobileSize);
