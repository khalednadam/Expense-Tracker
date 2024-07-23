// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    baseURL: "https://expense-tracker-indol-omega.vercel.app/",
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
  },
  imports: { autoImport: true },
  devtools: { enabled: true },
  modules: [
    "nuxt-mongoose",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "vuetify-nuxt-module",
    "@nuxt/icon",
  ],
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    globalAppMiddleware: true,
    provider: {
      type: "authjs",
    },
  },
  vuetify: {
    vuetifyOptions: "./vuetify.config.ts", // <== you can omit it
  },
});
