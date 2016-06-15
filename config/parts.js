const webpack = require('webpack');

exports.devServer = function(options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}

exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        },
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css', 'postcss', 'sass' ]
        },
        {
          // ASSET LOADER
          // Reference: https://github.com/webpack/file-loader
          // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
          // Rename the file using the asset hash
          // Pass along the updated reference to your code
          // You can add here any file extension you want to get copied to your output
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          loader: 'file'
        },
        // Bootstrap 4
        { test: /bootstrap\/dist\/js\/umd\//,
          loader: 'imports?jQuery=jquery'
        }
      ]
    }
  };
}
exports.setupJS= function(paths) {
  return {
    module:{
      loaders:[
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        }
      ]
    }
  }
}
exports.setupJson= function(paths) {
  return {
    module:{
      loaders:[
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
}
exports.setupHTML= function(paths) {
  return {
    module:{
      loaders:[
        {
          test: /\.html$/,
          loader: 'raw'
        }
      ]
    }
  }
}
exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);
  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}
