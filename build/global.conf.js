const pages = [
  // 页面配置写在这里
  {
    title: '首页',
    pageName: 'index'
  },
  {
    title: '登录页',
    pageName: 'login'
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
