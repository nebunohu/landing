//pug-loader
//var template = require("pug-loader!./src/index.pug");
/*var template = require("./src/index.pug");
var locals = { };
var html = template(locals);*/
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/dist/",
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
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin( {
        template: "./src/index.pug"
    })],
    devServer: {
        stats: 'errors-only'
    }
};