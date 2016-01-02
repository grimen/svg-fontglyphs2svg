'use strict'
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    cache: true,

    entry: {
        bundle: [
            'babel-polyfill',
            'webpack/hot/dev-server',
            './src/js/index'
        ],
    },

    output: {
        path: './dist',
        filename: '[name].js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname),
        moduleDirectories: [
            'bower_components',
            'node_modules',
        ],
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015'],
                }
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'html',
            },
            {
                test: /\.css$/,
                // exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract('style', 'css'),
            },
            {
                test: /\.(svg)?$/,
                // exclude: /(node_modules|bower_components)/,
                loader: 'svg'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // exclude: /(node_modules|bower_components)/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // exclude: /(node_modules|bower_components)/,
                loader: 'file'
            },
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'SVG Font Test',
            filename: 'index.html',
            template: './src/index.html',
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new CopyWebpackPlugin([
            // css
            { from: './bower_components/font-awesome/css/font-awesome.css', to: 'css' },
            { from: './bower_components/font-awesome/fonts/fontawesome-webfont.ttf', to: 'fonts' },
            { from: './bower_components/font-awesome/fonts/fontawesome-webfont.woff', to: 'fonts' },
            { from: './bower_components/font-awesome/fonts/fontawesome-webfont.woff2', to: 'fonts' },

            // fonts
            { from: './bower_components/font-awesome/fonts/fontawesome-webfont.svg', to: 'fonts' },
            { from: './bower_components/foundation-icon-fonts/foundation-icons.svg', to: 'fonts' },
            { from: './bower_components/icomoon-bower/fonts/icomoon.svg', to: 'fonts' },
            { from: './bower_components/ionicons/fonts/ionicons.svg', to: 'fonts' },
            { from: './bower_components/material-design-icons/iconfont/MaterialIcons-Regular.svg', to: 'fonts' },
            { from: './bower_components/octicons/octicons/octicons.svg', to: 'fonts' },
        ]),
    ],

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: './dist',
        progress: true,
        colors: true,
        port: 3001
    },
}
