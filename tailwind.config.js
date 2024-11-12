/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'] },
  theme: {
    extend: {},
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

