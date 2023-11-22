/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Poppins-Regular.ttf
        poppins: ['Poppins', 'sans-serif'],
        // BakbakOne-Regular.ttf
        bakbak: ['BakbakOne', 'sans-serif'],
        // NoiGroteskTrial-Regular.ttf
        noi: ['NoiGroteskTrial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}