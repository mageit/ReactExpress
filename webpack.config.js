"use strict"
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const buildPath = path.join(__dirname, './build');
const sourcePath = path.join(__dirname, './src');
const jsSourcePath = path.join(__dirname, './src/js');
const plugins = [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
        tempalate: path.join(sourcePath, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new UglifyJsPlugin(),
];

const rules = [
    {
        test: path.join(__dirname, 'src'),
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: ['babel_cache'],
                    presets: [
                        ['es2015', {modules: false}],
                        "stage-0",
                        "react"
                    ]
                }
            }
        ]
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader?sourceMap',
        ],
    }
]

module.exports = {
    devtool: 'inline-sourcemap',
    context: jsSourcePath,
    devServer: {
      inline: true,
        port: 3000,
        host: '0.0.0.0',
        contentBase: sourcePath,
        hot: true,
        disableHostCheck: true,
        historyApiFallback: true,
        stats: {
          assets: true
        }
    },
    entry: {
        js: path.join(jsSourcePath, 'index.js')
    },
    output: {
        path: path.join(__dirname, 'dist', 'js'),
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    module: {
        rules
    },
    plugins
};
