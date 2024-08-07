/// <reference path="./e2e.ts" />

import type { GetDomPayload } from "@/cypress/typing/index.ts";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getDom: ({ dataName, className, force }: GetDomPayload) => Chainable<Subject>;
      setMobileSize: () => void;
    }
  }
}
