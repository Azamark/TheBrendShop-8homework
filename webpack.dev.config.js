const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    target: 'web',
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, './src/public/main.js')
    },
    output: {
        clean: true,
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist/public'),
        assetModuleFilename: "asset/[hash][ext][query]",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/public/templates/index.html'),
            filename: 'index.html',
            inject: 'body',
            excludeChunks: ['server']
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            //Vue files
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            //HTML files
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            //Sass/css files
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader']
            },
            //Images files
            {
                test: /\.(png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
        ]
    }
}
