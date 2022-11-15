module.exports = {
  prefix: '',
  content: [
    './public/**/*.{html,ts,css,scss}',
    './public/**/**/*.{html,ts,css,scss}',

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