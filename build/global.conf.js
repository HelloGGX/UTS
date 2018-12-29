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
  },
  {
    title: 'CRM订单',
    pageName: 'crm-order'
  },
  {
    title: '合同列表',
    pageName: 'contract-lists'
  },
  {
    title: '添加旅游产品',
    pageName: 'products-add'
  },
  {
    title: '旅游产品详情页',
    pageName: 'products-detail'
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
