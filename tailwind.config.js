/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.js', './src/*.js'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        xl: '2rem',
      },
    },
    extend: {
      colors: {
        primary: '#000000',
      },
      textShadow: {
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
      });
    },
  ],
};
