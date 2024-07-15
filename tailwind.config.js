/** @type {import('tailwindcss').Config} */
export default {
  content: ["./server/pages/**/*.{ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}

