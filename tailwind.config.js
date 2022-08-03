/* eslint-disable */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: {
        ...colors.red,
        DEFAULT: '#A1100F',
      },
      yellow: {
        ...colors.yellow,
        DEFAULT: '#F9D401',
      },
      green: colors.green,
      blue: {
        ...colors.blue,
        DEFAULT: '#313459',
      },
      indigo: colors.indigo,
      rose: colors.rose,
      orange: {
        ...colors.orange,
        DEFAULT: '#DB7D2F',
      }
    },
    fontFamily: {
      sans: ['sans-serif'],
    },
    extend: {
      transitionProperty: {
        'width': 'width'
      },
    },
    maxHeight: {
      'screen-40': '40vh',
      'screen-50': '50vh',
      'screen-60': '60vh',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
