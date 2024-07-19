import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  defaults: {
    VBtn: {
      fontWeight: "400",
      letterSpacing: 0,
      ripple: false,
      rounded: "lg",
      variant: "flat",
    },
    VTextField: {
      variant: "outlined",
      rounded: "lg",
      density: "compact",
      autocomplete: "off",
    },
    VFileInput: {
      variant: "outlined",
      rounded: "lg",
      density: "compact",
    },
    VAutocomplete: {
      variant: "outlined",
      rounded: "lg",
      density: "compact",
    },
    VTextarea: {
      rounded: "lg",
      variant: "outlined",
      density: "compact",
    },
    VCard: {
      rounded: "lg",
    },
    VListItem: {
      rounded: "lg",
    },
    VSelect: {
      rounded: "lg",
      variant: "outlined",
      density: "compact",
    },
  },

  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          // primary: "#f0ae00",
          // info: "#137100",
          // success: "#05b187",
          // accent: "#fc4b6c",
          // warning: "#fec90f",
          // error: "#fc4b6c",
          // secondary: "#f0ae00",
          primary: "#003285",
          secondary: "#FF5959",
          darkPrimary: "#6DB193",
          primaryTransparent: "#D7EAE2",
          error1: "#fa0505",
          error2: "#94354B",
          success1: "#D7EADF",
          success2: "#61A47C",
          alert1: "#F9C7A4",
          alert2: "#A1673F",
          info1: "#C5E7E8",
          info2: "#33898A",
          background: "#FAFAFA",
          onbackground: "#6DB193",
          list: "#F1F2F4",
          card: "#FAFAFA",
          gold: "#FFD700",
          opposite: "#000",
        },
      },
    },
  },
});
