// 引入path
const path = require('path')
// 压缩JS
const uglify = require('uglifyjs-webpack-plugin')

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
        filename: "[name].js"
    },
    // 模块配置项
    module: {
        rules: [
            // 打包CSS 需安装 style-loader处理样式 css-loader处理标签
            {
                test:/\.css$/,
                // 写法1
                // use:['style-loader','css-loader'],
                // 写法2
                // loader:['style-loader','css-loader'],
                // 写法3
                use:[
                    {
                        loader:"style-loader"
                        // module:true
                    },{
                        loader:"css-loader"
                    }
                ]
                // 可选配置项
                // include:
                // exclude:
                // query:
            }
        ]
    },
    // 插件功能项数组
    plugins: [
        // min
        new uglify()
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