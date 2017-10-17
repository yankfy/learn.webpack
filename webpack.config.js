// 引入path
const path = require('path')

module.exports = {
    // 入口配置项
    entry:{
        // 名字随表写
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