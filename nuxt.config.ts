// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "nuxt-vuefire"],
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
      sessionCookie:false,
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
