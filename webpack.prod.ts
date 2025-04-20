import webpack from 'webpack';
import CompressionPlugin from "compression-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { merge } from 'webpack-merge';
const common = require('./webpack.common.ts');
const path = require('path');


module.exports = merge(common, {
    optimization: {
        nodeEnv: 'production',
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CompressionPlugin({
            filename: "[path][base].gz",
            test: /\.js$|\.html$/,
            algorithm: "gzip",
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],

})
