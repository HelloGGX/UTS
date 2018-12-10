import './sider-left.less'
import $ from 'jquery'

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
// 通过一个方法将现有对象扩展到另外一个对象上
function augment (receivingClass, givingClass) {
  // 只提供特定的方法
  if (arguments[2]) {
    for (var i = 2, len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]]
    }
  } else {
    for (var methodName in givingClass.prototype) {
      // 确保接受类不包含所处理方法的同名方法
      if (!Object.hasOwnProperty(receivingClass.prototype, methodName)) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName]
      }
    }
  }
}
/** **********js模板写法享元模式************ */
var sider = (function () { // 侧边栏函数
  var storedInstance = null
  var Sider = function () {
    /** ******需要公共调用的变量写这里**********/
    this.title = '' // 标题
    this.type = null
  }
  augment(Sider, Mixin)// 继承公共方法函数Mixin
  Sider.prototype = {
    // 私有变量写这里
    scrollTop: 0,
    // 公共函数和私有函数写这里
    init: function () { // 初始化函数，公共函数这样写

    },
    _close: function () { // 私有变量前面加下划线

    }
  }
  return {
    getSider: function () { // 获取侧边栏函数实例
      if (storedInstance == null) {
        storedInstance = new Sider()
      }
      return storedInstance
    },
    siderOpts: function (opts) {
      var instance = this.getSider()// 获取Sider函数的实例
      var i
      for (i in opts) {
        if (instance.hasOwnProperty(i)) { // 方式跟原型链上的属性冲突
          instance[i] = opts[i]
        }
      }
      return instance
    }
  }
})()

$(function () {
  sider.siderOpts({// 这里可以重新定义修改函数的公共属性
    titles: '侧边栏',
    type: 'open'
  }).init()
})
