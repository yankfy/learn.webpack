// 引入path
const path = require('path')
const webpack = require('webpack')
// 压缩JS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// HTML打包
const htmlPlugin = require('html-webpack-plugin')
// 分离CSS
const extractTextPlugin = require('extract-text-webpack-plugin')

var website = {
    publicPath: "http://192.168.3.3:8888/" // 最后的/不能省掉
}

module.exports = {
    // 入口配置项
    entry: {
        // 名字随便写,多入口文件
        entry: "./src/entry.js",
        entry2: "./src/entry2.js"
    },
    // 出口配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        // name表示名字与入口文件一样
        filename: "[name].js",
        // 公用路径 路径链接变成绝对链接
        publicPath: website.publicPath
    },
    // 模块配置项 loader
    module: {
        rules: [
            // 打包CSS 需安装 style-loader处理样式 css-loader处理标签
            {
                test: /\.css$/,
                // 写法1
                // use:['style-loader','css-loader'],
                // 写法2
                // loader:['style-loader','css-loader'],
                // 写法3
                // use:[
                //     {
                //         loader:"style-loader"
                //         // module:true
                //     },{
                //         loader:"css-loader"
                //     }
                // ]
                // 分离CSS
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    // 增加前缀设置
                    use: ['css-loader','postcss-loader']
                })
                // 可选配置项
                // include:
                // exclude:
                // query:
            }, {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: "url-loader",
                    // 小于5000字节是js中的base64，否则是生成的图片路径
                    // url-loader中包含file-loader功能，filer-loader处理路径问题
                    options: {
                        limit: 5000,
                        // 分离images文件夹
                        outputPath: 'images/'
                    }
                }]
            }, {
                test: /\.(html|htm)$/i,
                use: ['html-withimg-loader']
            }, {
                test: /\.less$/,
                // use:[{loader:'style-loader'},{loader:'css-loader'},{loader:'less-loader'}]
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
                // use:[{loader:'style-loader'},{loader:'css-loader'},{loader:'sass-loader'}]
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },
    // 插件功能项数组
    plugins: [
        // min
        new UglifyJsPlugin(),
        // html打包
        new htmlPlugin({
            // 去掉双引号
            minify: {
                removeAttributeQuotes: true
            },
            // js hash缓存
            hash: true,
            template: './src/index.html'
        }),
        // 分离CSS文件夹
        new extractTextPlugin("css/index.css")
    ],
    // 开发服务和热更新
    // 启动要安装webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '192.168.3.3', // 一般写ip地址,不写localhost
        compress: true, // 服务器压缩
        port: 8888
    }
}