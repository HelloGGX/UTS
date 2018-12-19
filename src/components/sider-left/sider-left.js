import './sider-left.less'
import { editOpts, debounce, Observer } from 'vendor/utils'
import $ from 'jquery'

/** **********js模板写法享元模式************ */
var sider = (function ($) { // 侧边栏函数
  var Sider = function () {
    /** ******需要公共调用的变量写这里**********/
    this.title = '' // 标题
    this.type = null
    this.callBack = function () { }
  }
  Sider.prototype = {
    // 私有变量写这里
    scrollTop: 0,
    // 公共函数和私有函数写这里
    init: function () { // 初始化函数，公共函数这样写
      var _thi = this
      // 注册sider的宽窄变化控制函数

      Observer.regist('ms', _thi.msWeb)// banner触发缩小观察者
      Observer.regist('lg', _thi.lgWeb)// banner触发放大观察者

      this._setWidth()
      $(window).on('resize', function () {
        debounce(_thi._setWidth(), 150)
      })
      $('body').on('click', '.uts-menu-submenu-title', function (e) {
        _thi.selected(e.currentTarget)
      })
      $('body').on('click', '.uts-menu-item', function (e) {
        _thi.selected(e.currentTarget)
      })
    },
    // 根据显示器宽度设置宽度
    _setWidth: function () {
      var offsetWid = document.body.clientWidth
      $('.uts-menu-item').css('paddingLeft', '48px')
      offsetWid > 992 ? this.lgWeb() : this.msWeb()
    },
    msWeb: function () { // 小屏幕
      $('.uts-pro-components-sider').css({
        'flex': '0 0 80px',
        'maxWidth': '80px',
        'minWidth': '80px',
        'width': '80px'
      })
      $('.uts-menu-submenu').removeClass('uts-menu-submenu-inline').addClass('uts-menu-submenu-vertical')
      $('.uts-menu-root').addClass('uts-menu-inline-collapsed').addClass('uts-menu-vertical').removeClass('uts-menu-inline')
      return 80
    },
    lgWeb: function () { // 大屏幕
      $('.uts-pro-components-sider').css({
        'flex': '0 0 256px',
        'maxWidth': '256px',
        'minWidth': '256px',
        'width': '256px'
      })
      $('.uts-menu-submenu').removeClass('uts-menu-submenu-vertical').addClass('uts-menu-submenu-inline')
      $('.uts-menu-root').removeClass('uts-menu-inline-collapsed').removeClass('uts-menu-vertical').addClass('uts-menu-inline')
      return 256
    },
    // 鼠标单击左侧菜单栏的效果
    selected: function (dom) {
      if (!$(dom).parents('.uts-menu-submenu').hasClass('uts-menu-submenu-open') && $(dom).hasClass('uts-menu-item')) {
        $(dom).parents('.uts-menu-submenu').addClass('uts-menu-submenu-open').siblings().removeClass('uts-menu-submenu-open')
        $(dom).parent('ul').removeClass('uts-menu-hidden')
        $(dom).parents('.uts-menu-submenu').siblings().children('ul').addClass('uts-menu-hidden')
      }
      if ($(dom).hasClass('uts-menu-item')) { // 如果点击的是子选项
        $(dom).addClass('uts-menu-item-selected').siblings().removeClass('uts-menu-item-selected')
        $(dom).parents('.uts-menu-submenu').siblings().find('.uts-menu-item').removeClass('uts-menu-item-selected')
        $(dom).parents('.uts-menu-submenu').siblings().find('.uts-menu-submenu-title').removeClass('uts-menu-submenu-active')
        this.callBack(dom)
      } else { // 如果点击的是主选项标题
        if ($(dom).next('ul').children('li').length === 0) { // 如果点击的主标题没有子选项
          $(dom).addClass('uts-menu-submenu-active').parent().siblings().children().removeClass('uts-menu-submenu-active').find('li').removeClass('uts-menu-item-selected')
          this.callBack(dom)
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
    },
    cancel: function (dom) {
      $(dom).removeClass('uts-menu-item-selected').removeClass('uts-menu-submenu-active')
    }
  }
  // augment(Sider, Mixin)// Sider继承公共方法函数Mixin
  return editOpts(Sider)
})($)

export default sider
