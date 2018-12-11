import './sider-left.less'
import { augment, editOpts } from 'vendor/utils'
import $ from 'jquery'
import _ from 'lodash'

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
      var _thi = this
      this._setWidth()
      $(window).on('resize', _.debounce(this._setWidth, 150))
      $('.uts-menu-submenu-title').click(function () {
        _thi._selected(this)
      })
      $('.uts-menu-item').click(function () {
        _thi._selected(this)
      })
    },
    // 根据显示器宽度设置宽度
    _setWidth: function () {
      var offsetWid = document.body.clientWidth
      $('.uts-menu-item').css('paddingLeft', '48px')
      offsetWid > 992 ? $('.uts-pro-components-sider').css({
        'flex': '0 0 256px',
        'maxWidth': '256px',
        'minWidth': '256px',
        'width': '256px'
      }) : $('.uts-pro-components-sider').css({
        'flex': '0 0 80px',
        'maxWidth': '80px',
        'minWidth': '80px',
        'width': '80px'
      })
    },
    // 鼠标单击左侧菜单栏的效果
    _selected: function (dom) {
      if ($(dom).hasClass('uts-menu-item')) {
        $(dom).addClass('uts-menu-item-selected').siblings().removeClass('uts-menu-item-selected')
        $(dom).parents('.uts-menu-submenu').siblings().find('.uts-menu-item').removeClass('uts-menu-item-selected')
      } else {
        if ($(dom).parent().hasClass('uts-menu-submenu-open')) {
          $(dom).parent().removeClass('uts-menu-submenu-open')
          $(dom).next('ul').addClass('uts-menu-hidden')
        } else {
          $(dom).parent().addClass('uts-menu-submenu-open').siblings().removeClass('uts-menu-submenu-open')
          $(dom).next('ul').removeClass('uts-menu-hidden')
          $(dom).parent().siblings().children('ul').addClass('uts-menu-hidden')
        }
      }
    }
  }
  augment(Sider, Mixin)// 继承公共方法函数Mixin
  return editOpts(Sider)
})()

export default sider
