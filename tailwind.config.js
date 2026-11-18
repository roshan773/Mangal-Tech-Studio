/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        evergreen: {
          DEFAULT: '#123B32',
          light: '#1B5448',
          dark: '#0C2721',
        },
        ivory: {
          DEFAULT: '#F4F0E6',
          light: '#FAF8F3',
          dark: '#E8E1D1',
        },
        copper: {
          DEFAULT: '#C47A4A',
          hover: '#B2683A',
          light: '#DE996D',
          dark: '#9E5B31',
        },
        charcoal: {
          DEFAULT: '#252820',
          light: '#3C4035',
          muted: '#5F6355',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(18, 59, 50, 0.05)',
        'premium': '0 10px 30px -4px rgba(18, 59, 50, 0.08), 0 4px 10px -2px rgba(18, 59, 50, 0.04)',
        'hover': '0 20px 40px -6px rgba(18, 59, 50, 0.12), 0 8px 16px -4px rgba(18, 59, 50, 0.06)',
      },
      borderRadius: {
        'refined': '4px',
        'subtle': '8px',
      }
    },
  },
  plugins: [],
}
