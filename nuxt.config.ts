
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
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
        changeOrigin: true,
        prependPath: true,
      }
    }
  },
  routeRules: {
      '/api/**': {
          proxy: { to: "http://api-laravel/api/**", },
      }
    }
})
