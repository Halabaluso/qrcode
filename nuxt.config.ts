// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', "notivue/nuxt"],
  css: [
    'notivue/notifications.css', // Only needed if using built-in notifications
    'notivue/animations.css' // Only needed if using built-in animations
  ],
  notivue: {
    position: 'bottom-right',
    limit: 4,
    enqueue: true,
    notifications: {
      global: {
        duration: 3000
      }
    }
  },
  devtools: { enabled: true }
})
