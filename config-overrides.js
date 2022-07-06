const path = require('path');

module.exports = {
  paths: function (paths, env) {
    paths.appIndexJs = path.resolve(__dirname, './front-end/src/index.tsx');
    paths.appSrc = path.resolve(__dirname, '/front-end/src');
    paths.appPublic = path.resolve(__dirname, './front-end/public');
    paths.appHtml = path.resolve(__dirname, './front-end/public/index.html');
    return paths;
  },
};
