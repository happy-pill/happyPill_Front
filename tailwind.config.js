/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F7F4EB', // 베이지 색
        secondary: '#BED0A2', // 초록 색
        // bg-primary
        button: {
          primary: '#637C5A',
          secondary: '#F0A500',
          tertiary: '#888888',
          // bg-button-primary
        },
      },
    },
  },
  plugins: [],
}
