/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#1E40AF',
          500: '#3B82F6',
          400: '#60A5FA',
        },
        green: {
          600: '#166534',
          500: '#22C55E',
          400: '#4ADE80',
        }
      }
    },
  },
  plugins: [],
}
