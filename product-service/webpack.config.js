const sw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: sw.lib.entries,
  mode: sw.lib.webpack.isLocal ? 'development' : 'production',
  target: 'node',
  externals: [nodeExternals()]
};