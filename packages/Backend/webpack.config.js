require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PRODUCTION = 'production';
module.exports = {
  entry: './index.js',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: PRODUCTION,
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'package.json',
        to: '',
        toType: 'file',
      },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(PRODUCTION),
      'process.env.PG_DATABASE': JSON.stringify(process.env.PG_DATABASE),
      'process.env.PG_USER': JSON.stringify(process.env.PG_USER),
      'process.env.PG_PASSWORD': JSON.stringify(process.env.PG_PASSWORD),
      'process.env.PG_HOST': JSON.stringify(process.env.PG_HOST),
    }),
  ],
  target: 'node',
};
