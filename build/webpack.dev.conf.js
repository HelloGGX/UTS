const webpack = require('webpack')
const path = require('path')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = {
  devtool: 'cheap-module-source-map',

  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [ { from: /.*/, to: path.posix.join('./', 'index.html') } ]
    },
    inline: true,
    hot: true, // 启用模块热更新
    // hotOnly: true, // devServer.hot在构建失败的情况下启用无需刷新页面作为回退的热模块替换
    contentBase: './',
    compress: true, // 一切服务都启用gzip 压缩
    host: HOST || 'localhost', // 指定使用一个 host。默认是 localhost
    port: PORT || '8082', // 指定一个端口号
    open: true,
    overlay: { warnings: false, errors: true },
    proxy: {},
    watchOptions: {
      poll: false
    }
  },
  plugins: [ new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin() ]
}
