/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: {
          50:  '#f5f6f8',
          100: '#e9ebef',
          200: '#cfd3da',
          300: '#a9b0bc',
          400: '#7b8493',
          500: '#5a6371',
          600: '#444c58',
          700: '#333a44',
          800: '#222831',
          900: '#161a21',
          950: '#0d1016',
        },
      },
    },
  },
  plugins: [],
}
