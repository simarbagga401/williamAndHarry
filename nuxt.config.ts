// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      script: [{ src: "https://checkout.razorpay.com/v1/checkout.js" }],
    },
  },
  site: {
    url: "https://williamharry.com",
    name: "William and Harry",
    description:
      " Welcome to William & Harry, your premier destination for exceptional men's formal suits in Mumbai. At William & Harry, we believe that elegance and affordability should go hand in hand.",
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
  },
  runtimeConfig: {
    public: {
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-vuefire",
    "@pinia/nuxt",
    "@nuxtjs/seo",
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: false,
    },
    config: {
      apiKey: "AIzaSyDp3g2LHR97UdcsgMhAQNT9NK7KNibwOL0",
      authDomain: "williamandharry-9288e.firebaseapp.com",
      projectId: "williamandharry-9288e",
      storageBucket: "williamandharry-9288e.appspot.com",
      messagingSenderId: "346862769568",
      appId: "1:346862769568:web:4374117114cfb7841040c5",
      measurementId: "G-3KWSNNR1B2",
    },
  },
});
