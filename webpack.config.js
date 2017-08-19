var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: { path: __dirname + '/dist/', filename: 'bundle.js' },
  plugins: [],
  module: {
    loaders: [
        {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        },
        { 
            test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
            loader: 'url-loader?limit=100000' 
        }
    ]
 }
};