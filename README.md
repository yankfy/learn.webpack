# 从Webpack3.0小白到大神
---
# 配置：入口和出口
```js
// 引入path
const path = require('path')

module.exports = {
    // 入口配置项
    entry:{
        // 名字随便写,多入口文件
        entry:"./src/entry.js",
        entry2:"./src/entry2.js"
    },
    // 出口配置项
    output:{
        path:path.resolve(__dirname,'dist'),
        // name表示名字与入口文件一样
        filename:"[name].js"
    },
    // 模块配置项
    module:{

    },
    // 插件功能项数组
    plugins:[

    ],
    // 开发服务
    devServer:{

    }
}
```
---
# 服务和热更新
```js
// 引入path
const path = require('path')

module.exports = {
    // 入口配置项
    entry:{
        entry:"./src/entry.js",
        entry2:"./src/entry2.js"
    },
    // 出口配置项
    output:{
        path:path.resolve(__dirname,'dist'),
        // name表示名字与入口文件一样
        filename:"[name].js"
    },
    // 模块配置项
    module:{

    },
    // 插件功能项数组
    plugins:[

    ],
    // 开发服务和热更新
    // 启动要安装webpack-dev-server
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'192.168.3.3', // 一般写ip地址,不写localhost
        compress:true,// 服务器压缩
        port:8888
    }
}

// 在package.json中写脚本语句
// "scripts": {
//     "server":"webpack-dev-server"
// }
```
---
# 打包CSS
```js
// 引入path
const path = require('path')

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
                        // module:true 配置项
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
```
---
# 压缩JS代码（生产环境）
```js
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
```
--- 
# HTML打包
```js
// 引入path
const path = require('path')
const webpack = require('webpack')
// 压缩JS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// HTML打包
const htmlPlugin = require('html-webpack-plugin')

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
        new UglifyJsPlugin(),
        // html打包
        new htmlPlugin({
            // 去掉双引号
            minify:{
                removeAttributeQuotes:true
            },
            // js hash缓存
            hash:true,
            template:'./src/index.html'
        })
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
```
