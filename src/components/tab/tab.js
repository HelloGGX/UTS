import './tab.less'
import $ from 'jquery'
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
  var tabMap = [] // 储存tab的id
  class Tab {
    constructor ({ callBack = () => { } } = {}) {
      this.callBack = callBack // 回调函数
    }
    static get VERSION () {
      return VERSION
    }
    init () {
      var _thi = this
      $(document)
        .on(Event.CLICK, Selector.DATA_TOGGLE, function (e) {
          e.preventDefault()
          e.stopPropagation()

          var id = _thi._getId($(this).attr('id'))
          var el = $(`#menu_list_${id}`)
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
    }
    select (el) {
      this._adjust(el)
    }
    tpl () {
      return `<li  data-toggle="tabItem" id="tabs_${arguments[0].id}">
            <i class="${arguments[0].clas}"></i><cite>${arguments[0].txt}</cite>
            <i class="uts-tab-close fa fa-close"></i>
        </li>`
    }
    contentTpl () {
      return `<div id="content_${arguments[0].id}" class="uts-card">
        <div class="uts-card-body"></div>
      </div>`
    }
    // 私有函数
    _getId () {
      var id = arguments[0]
      var reg = /_(num[0-9]*)$/ig
      var result = null
      id.replace(reg, function () {
        result = arguments[1]
      })
      return result
    }
    // 公共函数
    addTab () {
      var target = arguments[0]
      var id = this._getId($(target).attr('id'))

      var appendTab = () => {
        var clas = null
        if ($(target).hasClass('uts-menu-item')) {
          clas = $(target).parent().prev().find('i:first').attr('class')
        } else {
          clas = $(target).find('i').attr('class')
        }
        var args = {
          id: id,
          txt: $(target).find('span:last').html(),
          clas: clas
        }
        var tpl = this.tpl(args)
        var contentTpl = this.contentTpl(args)
        $('#uts_tab_title').append(tpl)
        $('.uts-wrapper-grid-content').append(contentTpl)
        $(`#content_${id}`).show().siblings().hide()
        tabMap.push(id)
        $(`#tabs_${id}`).addClass('uts-tab-active').siblings().removeClass('uts-tab-active')
        this.appendMove($(`#tabs_${id}`))
      }
      if (tabMap.length === 0) {
        appendTab()
      } else {
        var i = _.findIndex(tabMap, function (o) { return o === id })
        if (i < 0) {
          appendTab()
        } else {
          $(`#tabs_${id}`).addClass('uts-tab-active').siblings().removeClass('uts-tab-active')
          $(`#content_${id}`).show().siblings().hide()
          this._adjust($(`#tabs_${id}`))
        }
      }
      // this.move($(`#tabs_${id}`))
    }
    close (element, id) {
      _.remove(tabMap, function (n) {
        return n === id
      })
      $(element).remove()
    }
    appendMove (el) {
      var titleWidth = $('#uts_title').width()
      var liLen = $('#uts_tab_title').children('li').length
      var tabWidth = liLen * 134
      if (tabWidth > titleWidth - 68) {
        $('#goLeft').removeClass('hide')
        $('#goRight').removeClass('hide')
      } else {
        $('#goLeft').addClass('hide')
        $('#goRight').addClass('hide')
      }
      var moveWidth = Math.ceil(143 - (titleWidth - el.position().left - 90))
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
})($)
export function tab (opt) {
  return new Tab({
    callBack: opt.callBack
  })
}

/**************
 *说明文档
 * **********************/
