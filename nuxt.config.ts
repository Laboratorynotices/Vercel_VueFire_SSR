// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["nuxt-vuefire"],
  ssr: true,
  vuefire: {
    // Будем пользовать авторизацией
    auth: {
      enabled: true,
      // Для SSR будем хранить сессию в куках
      sessionCookie: true,
    },
    config: {
      apiKey: process.env.GOOGLE_FIREBASE_CONFIG_API_KEY,
      authDomain: process.env.GOOGLE_FIREBASE_CONFIG_AUTH_DOMAIN,
      projectId: process.env.GOOGLE_FIREBASE_CONFIG_PROJECT_ID,
      appId: process.env.GOOGLE_FIREBASE_CONFIG_APP_ID,
    },
  },
});
