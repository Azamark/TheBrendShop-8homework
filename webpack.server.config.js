const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    target: "node",
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    entry: {
        server: path.resolve(__dirname, './src/server/server.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist/server'),
        publicPath: "/",
        filename: "[name].js"
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "babel-loader"
            // }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/server/db', to: path.resolve(__dirname, './dist/server/db/[name].json') }
            ]
        })
    ]
};