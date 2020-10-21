const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ 
                    /*process.env.NODE_ENV !== 'production' ? 'style-loader' :*/ MiniCssExtractPlugin.loader,
                    'css-loader', 
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        }
                    },
                ]   
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: path.resolve(__dirname, "./src/index.pug")
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            //'$.jcarousel': 'jcarousel'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        })
    ],
    devServer: {
        stats: 'errors-only'
    },
    devtool: 'source-map'
};