/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.js",
    "./pages/**/*.js",
    "./components/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1a1a1a',
          input: '#222222',
        },
      },
    },
  },
  plugins: [],
}
