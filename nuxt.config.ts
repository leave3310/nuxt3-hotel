// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiURL: "",
    },
  },
  modules: [
    "@nuxtjs/google-fonts",
    "nuxt-svgo",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
    "@nuxt/devtools",
  ],
  css: ["vue-final-modal/style.css", "~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  svgo: {
    defaultImport: "component",
  },
  googleFonts: {
    families: {
      "Noto+Serif+TC": true,
    },
    display: "swap",

  },
});
