const path = require('path');

module.exports = {
  entry: {
    app: ['./src/index.ts'],
    vendor: ['react'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'js/[name].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
};
