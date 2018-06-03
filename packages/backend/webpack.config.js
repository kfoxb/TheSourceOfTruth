const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// console.log('nodeExternals', nodeExternals());

const whitelist = [/@the-source-of-truth/];

const PRODUCTION = 'production';
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  // we need to use nodeExternals twice here,
  // once for Backend node_modules and again
  // for node_modules in the root directory
  externals: [
    nodeExternals({ whitelist }),
    nodeExternals({ modulesDir: '../../node_modules', whitelist }),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['babel-preset-env', {
                targets: {
                  node: '6.11.5',
                },
              }],
            ],
          },
        },
        // include: /@the-source-of-truth/,
        exclude: /node_modules\/(?!@the-source-of-truth)/,
      },
    ],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'package.json',
        to: '',
        toType: 'file',
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: '../shared',
        to: 'shared',
        toType: 'dir',
      },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(PRODUCTION),
      'process.env.FB_DATABASE_URL': JSON.stringify(process.env.FB_DATABASE_URL),
    }),
  ],
  resolve: {
    symlinks: false,
    alias: {
      // '@the-source-of-truth/shared': './shared',
    },
    // modules: [path.resolve(__dirname, 'node_modules')],
  },
  target: 'node',
};
