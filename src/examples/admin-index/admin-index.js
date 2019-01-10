import './admin-index.less'
import 'common/js/base'
import sider from 'components/sider-left/sider-left'
import { banner } from 'components/banner/banner'
import { tab } from 'components/tab/tab'
import { editOpts, Observer } from 'vendor/utils'

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
      sider({
        callBack: function (e) {
          if ($(e).attr('id')) {
            tab({}).addTab(e)
          }
        }
      }).init()// 侧边栏函数

      banner({
        callBack: function () { // 点击触发缩小放大
          if ($('.uts-layout-sider').width() === 80) {
            Observer.fire('lg')
          } else {
            Observer.fire('ms')
          }
        }
      }).init()// 顶部导航函数

      tab({
        callBack: function (e, type) {
          if (type === 'open') { // 当打开新的tab选项卡
            sider({}).selected(e)
          } else { // 当关闭已有的tab选项卡
            sider({}).cancel(e)
          }
        }
      }).init()// 选项卡导航栏函数
    }
  }
  return editOpts(Index)
})()

$(function () {
  index({}).init()
})
