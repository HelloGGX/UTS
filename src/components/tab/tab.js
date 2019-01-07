import './tab.less'
import _ from 'lodash'

const Tab = (function ($) {
  const VERSION = '1.0.0'
  const DATA_KEY = 'uts-tab-trigger'
  const EVENT_KEY = `.${DATA_KEY}`

  const Event = {
    CLOSE: `close${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`
  }

  const Selector = {
    DATA_TOGGLE: '[data-toggle="tabItem"]'
  }
  let tabMap = [] // 储存tab的id
  class Tab {
    constructor ({ callBack = () => { }, menu = [], delMenu = '', curNav = '', liIndex = 0 } = {}) {
      this.callBack = callBack // 回调函数
      this.menu = menu
      this.delMenu = delMenu
      this.curNav = curNav
      this.liIndex = liIndex
    }
    static get VERSION () {
      return VERSION
    }
    init () {
      let _thi = this
      $(document)
        .on(Event.CLICK, Selector.DATA_TOGGLE, function (e) {
          e.preventDefault()
          e.stopPropagation()

          let id = _thi._getId($(this).attr('id'))
          let el = $(`#menu_list_${id}`)
          if ($(e.target).hasClass('uts-tab-close')) {
            _thi.close($(e.target).parent('li'), id)
            _thi.callBack(el, 'close')
          } else {
            _thi.select(this)
            _thi.callBack(el, 'open')
          }
        })
      $('.uts-tab-title li').click(function (e) {
        $(e.currentTarget).addClass('uts-tab-active').siblings().removeClass('uts-tab-active')
      })
      $('#goLeft').on('click', () => {
        this.goLeft()
      })
      $('#goRight').on('click', () => {
        this.goRight()
      })
      if (window.sessionStorage.getItem('curmenu')) { // 如果获取到session里面有值
        this.curNav = JSON.parse(window.sessionStorage.getItem('curmenu'))
        this.menu = JSON.parse(window.sessionStorage.getItem('menu'))
        for (let i = 0; i < this.menu.length; i++) {
          tabMap.push(this._getId(this.menu[i].tabId))
          let tpl = this.tpl({ id: this._getId(this.menu[i].tabId), clas: this.menu[i].icon, txt: this.menu[i].title })
          let contentTpl = this.contentTpl({ id: this._getId(this.menu[i].tabId) })
          $('#uts_tab_title').append(tpl)
          $('.uts-wrapper-grid-content').append(contentTpl)
        }
        $(`#tabs_${this._getId(this.curNav.tabId)}`).addClass('uts-tab-active').siblings().removeClass('uts-tab-active')
        $(`#content_${this._getId(this.curNav.tabId)}`).show().siblings().hide()
        this.callBack($(`#menu_list_${this._getId(this.curNav.tabId)}`), 'open')// 触发回调函数
        this.appendMove($(`#tabs_${this._getId(this.curNav.tabId)}`))
      }
    }
    select (el) {
      // 切换后获取当前窗口的内容
      let curmenu = ''
      this.menu = JSON.parse(window.sessionStorage.getItem('menu'))
      if (window.sessionStorage.getItem('menu')) {
        curmenu = this.menu[$(el).index() - 1]
      }
      if ($(el).index() === 0) {
        window.sessionStorage.setItem('curmenu', '')
      } else {
        window.sessionStorage.setItem('curmenu', JSON.stringify(curmenu))
        if (window.sessionStorage.getItem('curmenu') === 'undefined') {
          // 如果删除的不是当前选中的tab,则将curmenu设置成当前选中的tab
          if (this.curNav !== JSON.stringify(this.delMenu)) {
            window.sessionStorage.setItem('curmenu', this.curNav)
          } else {
            window.sessionStorage.setItem('curmenu', JSON.stringify(this.menu[this.liIndex - 1]))
          }
        }
      }
      this._adjust(el)
    }
    tpl () {
      return `<li  data-toggle="tabItem" id="tabs_${arguments[0].id}">
            <i class="${arguments[0].clas}"></i><cite>${arguments[0].txt}</cite>
            <i class="uts-tab-close fa fa-close"></i>
        </li>`
    }
    contentTpl () {
      return `<div id="content_${arguments[0].id}" class="uts-card" style="background:#f0f2f5">
        <div class="uts-card-body"></div>
      </div>`
    }
    // 私有函数
    _getId () {
      let id = arguments[0]
      let reg = /_(num[0-9]*)$/ig
      let result = null
      id.replace(reg, function () {
        result = arguments[1]
      })
      return result
    }
    // 公共函数
    addTab () {
      let target = arguments[0]
      let id = this._getId($(target).attr('id'))
      if (window.sessionStorage.getItem('menu')) {
        this.menu = JSON.parse(window.sessionStorage.getItem('menu'))
      }

      let appendTab = () => {
        let clas = null
        if ($(target).hasClass('uts-menu-item')) {
          clas = $(target).parent().prev().find('i:first').attr('class')
        } else {
          clas = $(target).find('i').attr('class')
        }
        const args = {
          id: id,
          txt: $(target).find('span:last').html(),
          clas: clas
        }
        let tpl = this.tpl(args)
        let contentTpl = this.contentTpl(args)
        $('#uts_tab_title').append(tpl)
        $('.uts-wrapper-grid-content').append(contentTpl)
        $(`#content_${id}`).show().siblings().hide()
        tabMap.push(id)
        $(`#tabs_${id}`).addClass('uts-tab-active').siblings().removeClass('uts-tab-active')
        this.appendMove($(`#tabs_${id}`))
        let curmenu = {
          'icon': clas,
          'title': $(target).find('span:last').html(),
          'tabId': $(target).attr('id')
        }
        this.menu.push(curmenu)
        let menu = this.menu
        window.sessionStorage.setItem('menu', JSON.stringify(menu)) // 打开的窗口
        window.sessionStorage.setItem('curmenu', JSON.stringify(curmenu)) // 当前的窗口
      }
      if (tabMap.length === 0) {
        appendTab()
      } else {
        let i = _.findIndex(tabMap, function (o) { return o === id })
        if (i < 0) {
          appendTab()
        } else {
          let icon = null
          if ($(target).hasClass('uts-menu-item')) {
            icon = $(target).parent().prev().find('i:first').attr('class')
          } else {
            icon = $(target).find('i').attr('class')
          }
          $(`#tabs_${id}`).addClass('uts-tab-active').siblings().removeClass('uts-tab-active')
          $(`#content_${id}`).show().siblings().hide()
          this._adjust($(`#tabs_${id}`))
          let curmenu = {
            'icon': icon,
            'title': $(target).find('span:last').html(),
            'tabId': $(target).attr('id')
          }
          window.sessionStorage.setItem('curmenu', JSON.stringify(curmenu)) // 当前的窗口
        }
      }
      // this.move($(`#tabs_${id}`))
    }
    close (element, id) {
      // 删除tab后重置session中的menu和curmenu
      this.liIndex = $(element).index()

      _.remove(tabMap, function (n) {
        return n === id
      })
      var menu = JSON.parse(window.sessionStorage.getItem('menu'))
      // 获取被删除元素
      this.delMenu = menu[this.liIndex - 1]

      var curmenu = window.sessionStorage.getItem('curmenu') === 'undefined'
        ? undefined : window.sessionStorage.getItem('curmenu') === ''
          ? '' : JSON.parse(window.sessionStorage.getItem('curmenu'))
      if (JSON.stringify(curmenu) !== JSON.stringify(menu[this.liIndex - 1])) { // 如果删除的不是当前选中的tab
        // window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
        this.curNav = JSON.stringify(curmenu)
        menu.splice((this.liIndex - 1), 1)
        $(element).remove()
      } else { // 如果删除的是当前选中的tab
        $(element).remove()
        let lastContent = $('.uts-wrapper-grid-content').children('.uts-card:last-child')
        let lashTab = $('.uts-tab-title').children('li:last-child')
        lastContent.show().siblings().hide()
        lashTab.addClass('uts-tab-active').siblings().removeClass('uts-tab-active')
        menu.splice((this.liIndex - 1), 1)
        window.sessionStorage.setItem('curmenu', JSON.stringify(menu[menu.length - 1]))
        this.curNav = JSON.stringify(menu[menu.length - 1])
      }

      window.sessionStorage.setItem('menu', JSON.stringify(menu))
      $(`#content_${id}`).remove()
    }
    appendMove (el) {
      let titleWidth = $('#uts_title').width()
      let liLen = $('#uts_tab_title').children('li').length
      let tabWidth = liLen * 134
      if (tabWidth > titleWidth - 68) {
        $('#goLeft').removeClass('hide')
        $('#goRight').removeClass('hide')
      } else {
        $('#goLeft').addClass('hide')
        $('#goRight').addClass('hide')
      }
      let moveWidth = Math.ceil(143 - (titleWidth - el.position().left - 90))
      if (moveWidth > 0) {
        this._adjust(el)
      }
    }
    _adjust (el) {
      const items = $('#uts_tab_title').children('li')
      const viewportWidth = $('#uts_title').width() - 108
      const tabListWidth = $('#uts_tab_title').children('li').length * $(items[0]).outerWidth()
      const minTranslate = Math.min(0, viewportWidth - tabListWidth)
      const middleTranslate = viewportWidth / 2
      let width = 0
      tabMap.every((item, index) => {
        if (`tabs_${item}` === $(el).attr('id')) {
          return false
        }
        width += $(items[index]).outerWidth()
        return true
      })
      let translate = middleTranslate - width
      translate = Math.max(minTranslate, Math.min(40, translate))
      $('#uts_tab_title').css({
        'marginLeft': `${translate}px`
      })
    }
    goLeft () {
      $('#uts_tab_title').css({
        'marginLeft': `40px`
      })
    }
    goRight () {
      const items = $('#uts_tab_title').children('li')
      const viewportWidth = $('#uts_title').width() - 108
      const tabListWidth = $('#uts_tab_title').children('li').length * $(items[0]).outerWidth()
      const minTranslate = Math.min(0, viewportWidth - tabListWidth)
      $('#uts_tab_title').css({
        'marginLeft': `${minTranslate}px`
      })
    }
  }

  return Tab
})(window.jQuery)

export function tab (opt) {
  return new Tab({
    callBack: opt.callBack
  })
}

/**************
 *说明文档
 * **********************/
