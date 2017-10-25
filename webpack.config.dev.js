const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const purifyCssPlugin = require('purifycss-webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const entry = require('./webpack_config/entry.webpack');
if (process.env.type == "build") {
    var website = {
        publicPath: "http://51cco.cn:8888/"
    }
} else {
    var website = {
        publicPath: "http://192.168.3.3:8888/"
    }
}

module.exports = {
    // devtool:'source-map',
    entry: {
        entry: "./src/entry.js",
        jquery: "jquery",
        vue: "vue"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        publicPath: website.publicPath
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader', 'postcss-loader']
            })
        }, {
            test: /\.(png|jpg|gif)/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 5000,
                    outputPath: 'images/'
                }
            }]
        }, {
            test: /\.(html|htm)$/i,
            use: ['html-withimg-loader']
        }, {
            test: /\.less$/,
            use: extractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }],
                fallback: 'style-loader',
            })
        }, {
            test: /\.scss$/,
            use: extractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        }, {
            test: "/\.(jsx|js)$/",
            use: {
                loader: "babel-loader",
            },
            exclude: "/node_modules/"
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            'vue': "vue"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['jquery', 'vue'],
            filename: 'assets/js/[name].min.[ext]',
            minChunks: 2
        }),
        new uglifyJsPlugin(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new extractTextPlugin("css/index.css"),
        new purifyCssPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*html'))
        }),
        new webpack.BannerPlugin("这是破泥的版权"),
        new copyWebpackPlugin([{
            from: __dirname + '/src/public',
            to: "./public"
        }]),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '192.168.3.3',
        compress: true,
        port: 8888
    },
    watchOptions: {
        poll: 1000,
        aggregeateTimeout: 500,
        ignore: /node_modules/
    }
}