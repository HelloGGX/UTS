import './sider-left.less'
import { augment, editOpts } from 'vendor/utils'

/** ************当一个操作会影响到其他多个模块函数中的数据或者功能的时候用观察者模式******************* */
/** ************公共方法************ */
var Mixin = function () { }
Mixin.prototype = {
  driveForward: function () {
    console.log('drive forward')
  },
  driveBackward: function () {
    console.log('drive backward')
  },
  driveSideways: function () {
    console.log('drive sideways')
  }
}
/** **********js模板写法享元模式************ */
var sider = (function () { // 侧边栏函数
  var Sider = function () {
    /** ******需要公共调用的变量写这里**********/
    this.title = '' // 标题
    this.type = null
  }
  Sider.prototype = {
    // 私有变量写这里
    scrollTop: 0,
    // 公共函数和私有函数写这里
    init: function () { // 初始化函数，公共函数这样写

    },
    _close: function () { // 私有变量前面加下划线

    }
  }
  augment(Sider, Mixin)// 继承公共方法函数Mixin
  return editOpts(Sider)
})()

export default sider
