const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts= require('./config/parts');
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app,
    bootstrap: 'bootstrap-loader'
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Lambda Local',
      template: './app/public/index.html',
      inject: 'body'
    })
  ]
};
var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map'
      },
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.setupJS(PATHS.app),
      parts.setupJson(PATHS.app),
      parts.minify(),
      parts.setupCSS(PATHS.app),
      parts.setupHTML(PATHS.app)
    );
    break;
  default:
    config = merge(
      common,
      {
       devtool: 'eval-source-map'
      },
      parts.setupJS(PATHS.app),
      parts.setupJson(PATHS.app),
      parts.setupCSS(PATHS.app),
      parts.setupHTML(PATHS.app),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);
