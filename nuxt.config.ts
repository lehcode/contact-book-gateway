import { format } from 'date-fns';
import path from 'path';

// Define DateString as a type alias for string
type DateString = string; 

const today: DateString = format(new Date(), 'yyyy-MM-dd');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
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
      apiBase: 'http://php-api/api'
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://php-api/api',
        headers: { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Headers': '*', },
        changeOrigin: true,
        prependPath: true,
      }
    },
    // alias: {
    //   'vue/server-renderer': path.resolve(
    //     __dirname,
    //     './node_modules/vue/server-renderer'
    //   ),
    //   'vue/compiler-sfc': path.resolve(
    //     __dirname,
    //     './node_modules/vue/compiler-sfc'
    //   )
    // }
  },
  compatibilityDate: {
    default: today
  },
  sourcemap: {
    server: true,
    client: true
  },
  routeRules: {
      '/api/**': {
          proxy: { to: "http://php-api/api/**", },
      }
    },
    
})
