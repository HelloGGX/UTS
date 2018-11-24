const HtmlWebpackPlugin = require('html-webpack-plugin')
const globalConfig = require('./global.conf')
const pages = globalConfig.pages

const generatePage = function ({ title = '', entry = '', template = '', name = '', chunks = [] } = {}) {
  return {
    entry,
    plugins: [
      new HtmlWebpackPlugin({
        chunks: chunks,
        template,
        title,
        filename: name + '.html',
        chunksSortMode: 'manual' // 应用文件顺序
        // minify: {
        //     collapseWhitespace: true
        // }
      })
    ]
  }
}
const normalize = (title, pageName) => {
  const entry = {}
  const url = './src/examples/' + pageName + '/' + pageName
  entry[pageName] = url
  return {
    title: title,
    entry: entry,
    template: url + '.html',
    name: pageName,
    chunks: [ 'manifest', 'libs', 'base', pageName ]
  }
}
const configPages = []
pages.map((item) => {
  configPages.push(generatePage(normalize(item.title, item.pageName)))
})

module.exports = configPages
