/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'comfortaa': ['Comfortaa', 'cursive'],
        'cormant': ['Cormorant Garamond', 'serif'],
        'ibm': ['IBM Plex Mono', 'monospace']
      },
      colors: {
        'background': '#A6D9F7',
        'dark-background': '#111D4A',
        'accent-blue': '#70C8FF',
      }
    },
  },
  plugins: [],
}