/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        tablet: '768px',
        labtop: '1024px',
        desktop: '1280px',
      },
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
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        12: ['0.75rem', { lineHeight: '1rem' }], // 12px
        14: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        16: ['1rem', { lineHeight: '1.5rem' }], // 16px
        22: ['1.375rem', { lineHeight: '1.75rem' }], // 22px
        24: ['1.5rem', { lineHeight: '2rem' }], // 24px
        28: ['1.75rem', { lineHeight: '2.25rem' }], // 28px
        32: ['2rem', { lineHeight: '2.5rem' }], // 32px
      },
    },
  },
  plugins: [],
}