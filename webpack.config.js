const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin');

// const autoprefixer = require('autoprefixer')

module.exports = {
    target: 'node',
    mode: 'development',
    entry: ['webpack/hot/poll?100', './server.ts'],
    output: {
        filename: 'server.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'build')
    },
    watch: true,
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?100']
        })
    ],
    devServer: {
        contentBase: './build',
        hot: true,
        open: false,
        writeToDisk: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    // 'babel-loader',
                    'awesome-typescript-loader'
                ],
                exclude: /node_modules/
            },
            // {
            //     test: /\.js$/,
            //     use: [
            //         'babel-loader',
            //         'source-map-loader'
            //     ],
            //     exclude: /node_modules/
            // }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.ts']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}