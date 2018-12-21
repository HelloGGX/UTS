const webpack = require('webpack')
// const globalConfig = require('./global.conf')
const CleanWebpack = require('clean-webpack-plugin')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
// const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('../src/dll/libs-manifest.json'),
      name: 'libs'
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve('src/dll/libs.dll.js'),
      includeSourcemap: false,
      publicPath: './crm/dist/js/libs/',
      outputPath: './js/libs'
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    }),
    new BundleAnalyzerPlugin(), // 打包分析

    // new CopyWebpackPlugin([ // 支持输入一个数组
    //   {
    //     from: resolve('src/api'), // 将src/api
    //     to: './api', // 复制到publiv
    //     ignore: [ '*.js' ]
    //   }
    // ]),
    new CleanWebpack(['dist'], {
      root: path.resolve(__dirname, '../'), // 根目录
      verbose: true, // 开启在控制台输出信息
      dry: false // 启用删除文件
    })
  ]
}
