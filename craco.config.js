const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#ffc13b',
              '@layout-header-background': '#1e3d59',
              '@layout-body-background': '#f5f0e1',
              '@layout-footer-background': '#ff6e40',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
