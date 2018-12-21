const pages = [
  // 页面配置写在这里
  {
    title: '首页',
    pageName: 'index'
  },
  {
    title: '登录页',
    pageName: 'login'
  },
  {
    title: '主界面',
    pageName: 'admin-index'
  },
  {
    title: 'CRM 表单',
    pageName: 'crm-form'
  },
  {
    title: 'CRM 合同',
    pageName: 'crm-contract'
  },
  {
    title: '高级详情页',
    pageName: 'detail'
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
