import './admin-index.less'
import sider from 'components/sider-left/sider-left'
import { editOpts } from 'vendor/utils'
import $ from 'jquery'

/** ************当一个操作会影响到其他多个模块函数中的数据或者功能的时候用观察者模式******************* */

/** **********js模板写法享元模式************ */
var index = (function () { // 侧边栏函数
  var Index = function () {
    /** ******需要公共调用的变量写这里**********/
    this.title = '' // 标题
    this.type = null
  }
  Index.prototype = {
    // 私有变量写这里
    scrollTop: 0,
    // 公共函数和私有函数写这里
    init: function () { // 初始化函数，公共函数这样写
      sider({}).init()

      // require.ensure([], () => { // 插件这样调用
      //   require('components/alert/alert')
      // }, 'alert')
    }
  }
  return editOpts(Index)
})()

$(function () {
  index({}).init()
})
