module.exports = {
  prefix: '',
  content: [
    './public/index.html',
    './public/**/*.{html,js}',
  ],
  darkMode: 'class',
  theme: {
    div: {
      marginTop: '0.65rem',
      marginBottom: '0.65rem',
    },
    extend: {
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1025px',
        xl: '1280px',
        '2xl': '1536px',
      },

      lg: {
        css: {

          'table td': {
            paddingTop: '0',
            paddingBottom: '0',
          },
          'table td p': {
            marginTop: '0.8rem',
            marginBottom: '0.8rem',
          },
        },
      },
      sm: {
        css: {
          ul: {
            lineHeight: '1.3rem',
          },
        },
      },
    },
  },
};