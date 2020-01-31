// eslint-disable-next-line @typescript-eslint/no-var-requires
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['src/**/*.{vue,htm,html,css,sss,less,scss,sass}'],
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/theme.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://app.asana.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
