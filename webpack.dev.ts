import webpack from 'webpack';
const { merge } = require('webpack-merge');
const common = require('./webpack.common.ts');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // static: path.join(__dirname, "./public"),
        port: 3000,
        historyApiFallback: true,
        hot: true,
    },
});