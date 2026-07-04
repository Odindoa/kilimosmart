/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0faf4',
          100: '#dcf3e6',
          200: '#b8e6cc',
          300: '#7fcfaa',
          400: '#45b282',
          500: '#1a8c55',
          600: '#1a6b3c',
          700: '#155c32',
          800: '#114a29',
          900: '#0d3c22',
        },
        earth: {
          50:  '#fdf8f0',
          100: '#f9edda',
          200: '#f2d9b0',
          300: '#e8be7a',
          400: '#d9993e',
          500: '#c47c1e',
          600: '#a36318',
          700: '#854f0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
