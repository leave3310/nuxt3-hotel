// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
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

// Alternatively you can use CommonJS syntax:
// require('./commands')
