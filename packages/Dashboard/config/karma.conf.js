const webpackProdConfig = require('./webpack.config.prod.js');
const webpack = require('webpack');
const path = require('path');
const devManifest = require('../dist/devDependencies.dll.manifest.json');

webpackProdConfig.plugins = [
  new webpack.DllReferencePlugin({
    context: path.resolve(__dirname),
    manifest: devManifest,
  }),
].concat(webpackProdConfig.plugins);

const testFile = './setup.test.js';
module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    // karma only needs to know about the test bundle
    files: [
      {
        pattern: '../dist/dependencies.dll.js/',
        watched: false,
        served: true,
      },
      {
        pattern: '../dist/devDependencies.dll.js/',
        watched: false,
        served: true,
      },
      testFile,
    ],
    frameworks: ['chai', 'mocha'],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      [testFile]: ['webpack', 'sourcemap'],
    },
    reporters: ['progress'],
    singleRun: true,
    // webpack config object
    webpack: webpackProdConfig,
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
