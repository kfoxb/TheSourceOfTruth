const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'package.json',
        to: '',
        toType: 'file',
      },
    ], { debug: 'debug' }),
  ],
  target: 'node',
};
