module.exports = {
  prefix: '',
  content: [
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
        '2xl': '1536px',
      },
      lg: {
        css: {
          'ul > li > *:last-child': {
            marginTop: '0.65rem',
            marginBottom: '0.65rem',
          },
          'table th': {
            verticalAlign: 'middle',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            textAlign: 'center',
          },
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