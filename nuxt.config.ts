
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  // css: ['~/assets/css/main.css'],
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
  runtimeConfig: {
    public: {
      apiBase: 'http://api-laravel/api'
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://api-laravel/api',
        changeOrigin: true,
        prependPath: true,
      }
    }
  }
})
