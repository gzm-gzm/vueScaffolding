// vue.config.js
module.exports ={
    // 公共路径
    publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/' : '/',
    // 相对于打包路径index.html的路径
    indexPath: 'index.html',
    // 'dist', 生产环境构建文件的目录
    outputDir: process.env.outputDir || 'dist',
    // 相对于outputDir的静态资源(js、css、img、fonts)目录
    assetsDir: 'static',
    devServer: {
        // 让浏览器 overlay 同时显示警告和错误
        overlay: {
            warnings: true,
            errors: true
        },
        // host: 'localhost',
        // 端口号
        port: 8080,
        // https:{type:Boolean}
        https: false,
        // 配置自动启动浏览器
        open: true,
        hotOnly: true, // 热更新
        // 配置跨域处理,只有一个代理
        // proxy: 'http://localhost:8080',
        // 配置多个跨域
        proxy: {
            '/api': {
                // https://m.study.163.com/j/provider/getProviderInfo.json
                target: 'https://api.isoyu.com/gy/',
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/api2': {
                target: 'http://172.12.12.12:2018',
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    '^/api2': '/'
                }
            }
        }
    }
}