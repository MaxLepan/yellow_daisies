module.exports = {
  prefix: 'page-',
  content: [
    './public/index.html',
    './public/**/*.{html,js}',
  ],


  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Bubble M', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1025px',
        xl: '1280px',
        '2xl': '1536px',
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