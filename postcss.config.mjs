const config = {
  plugins: {
    "@tailwindcss/postcss": {
      theme: {
        extend: {
          screens: {
            xs: '560px',
          },
        },
      },
    },
  },
};

export default config;
