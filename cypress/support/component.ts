import { mount } from "cypress/vue";
import { Suspense, h } from "vue";
import { getContext } from "unctx";
import {
  RouterLink,
  createRouter,
  createWebHistory,
  routeLocationKey,
  routerKey,
} from "vue-router";

import "@/assets/css/tailwind.css";
import "./commands";

type MountParams = Parameters<typeof mount<any>>;
type OptionsParam = MountParams[1];
type Router = ReturnType<typeof createRouter>;

declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: (component: any, options?: OptionsParam) => Chainable<any>;
      stubNuxtInject: (key: string, value: unknown) => void;
      stubNuxtRouter: (callback: ($rotuer: Router) => void) => void;
      resetNuxt: () => void;
    }
  }
}

const nuxtAppCtx = getContext("nuxt-app");
const $router = createRouter({
  routes: [],
  history: createWebHistory(),
});
function generateNuxtCTX(): Record<string, any> {
  return {
    static: { data: {} },
    payload: { data: {}, _errors: {} },
    hook: () => () => ({}),
    hooks: {
      callHook: () => Promise.resolve(),
    },
    _asyncData: {},
    _asyncDataPromises: {},
    _useHead: () => ({}),
    $router,
    _route: $router.currentRoute,
  };
}
let nuxtCTX = generateNuxtCTX();

nuxtAppCtx.set(nuxtCTX);

Cypress.Commands.add("mount", (component: any, options = {}) => {
  options.global = options.global || {};
  options.global.components = { RouterLink };
  options.global.provide = {
    [routerKey as symbol]: $router,
    [routeLocationKey as symbol]: $router.currentRoute.value,
  };

  return mount(
    () => h(Suspense, h(component, options?.props, options?.slots)),
    options,
  );
});

Cypress.Commands.add("stubNuxtInject", (key, value) => {
  nuxtCTX[`$${key}`] = value;
});

Cypress.Commands.add("stubNuxtRouter", (callback: any) => {
  callback($router);
});

Cypress.Commands.add("resetNuxt", () => {
  nuxtCTX = generateNuxtCTX();
  nuxtAppCtx.unset();
  nuxtAppCtx.set(nuxtCTX);

  $router.push("/");
});

Cypress.Commands.add("mount", mount);
