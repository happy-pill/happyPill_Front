/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#026242', // 베이지 색
        secondary: '#F59E0B', // 초록 색
        // bg-primary
        button: {
          primary: '#F0A500',
          secondary: '#637C5A',
          // bg-button-primary
        },
      },
    },
  },
  plugins: [],
}
