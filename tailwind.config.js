/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  daisyui: {
    themes: false,
  },
  mode: 'jit',
  content: [
    "./src/app/*****/****/***/**/*.{html,ts}",
    "src/app/***/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite-typography'),
    require("@tailwindcss/forms"),
    require('flowbite/plugin')
  ],
}

