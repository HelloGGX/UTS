const pages = [
  // 页面配置写在这里
  {
    title: '首页',
    pageName: 'index'
  },
  {
    title: '按钮演示',
    pageName: 'btn'
  }
]
const dependencies = [
  // 依赖的全局js
  'babel-polyfill',
  'jquery'
]

const globalConfig = {
  pages: pages,
  dependencies: dependencies
}

module.exports = globalConfig
