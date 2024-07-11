// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
  },
  imports: { autoImport: true },
  devtools: { enabled: true },
  modules: [
    "nuxt-mongoose",
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "vuetify-nuxt-module",
  ],
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },
  vuetify: {
    vuetifyOptions: {
      defaults: {
        VTextField: {
          variant: "outlined",
          density: "compact",
        },
      },
    },
  },
});
