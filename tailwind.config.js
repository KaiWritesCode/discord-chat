const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'dark',
  theme: {
    fontFamily: {
      'opensans': ['"Open Sans"', 'sans-serif']
    },
    extend: {
      boxShadow: {
        'profileShadow': '0px 0px 7px 5px rgba(247, 200, 81, 0.7)'
      },

      colors:
      {
        primary: '#202225',
        secondary: '#5865f2',
        gray: colors.neutral,
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5'
        }
      }
    },
  },
  plugins: [],
}
