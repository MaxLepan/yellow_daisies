module.exports = {
  prefix: 'page-',
  purge: [
    './public/index.html',
    './public/**/*.{html,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1025px',
        xl: '1280px',
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
};