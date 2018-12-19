import './drop-down.less'
import $ from 'jquery'

const DropDown = (function ($) {
  const VERSION = '1.0.0'
  const DATA_KEY = 'uts-dropdown-trigger'
  const EVENT_KEY = `.${DATA_KEY}`

  const Event = {
    HIDE: `hide${EVENT_KEY}`,
    HIDDEN: `hidden${EVENT_KEY}`,
    SHOW: `show${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`,
    CLICK: `click${EVENT_KEY}`
  }

  const Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]'
  }
  class DropDown {
    // constructor ({ type = 0 } = {}) {
    //   this.type = 0 // 0代表关闭
    // }
    static get VERSION () {
      return VERSION
    }
    init () {
      var _thi = this
      $(document)
        .on(Event.CLICK, Selector.DATA_TOGGLE, function (e) {
          e.preventDefault()
          e.stopPropagation()
          _thi._toggle(e)
        })
      $(document).click(function (e) {
        _thi._close()
      })
    }
    _toggle (e) {
      var trigger = $(EVENT_KEY)
      var len = trigger.length
      // _thi._show($(e.currentTarget))
      for (let i = 0; i < len; i++) {
        if ($(trigger[i]).is($(e.currentTarget))) {
          if ($(e.currentTarget).children('.uts-dropdown').is(':visible')) {
            this._close($(trigger[i]))
          } else {
            this._show($(e.currentTarget))
          }
        } else {
          this._close($(trigger[i]))
        }
      }
    }
    _show (element = EVENT_KEY) {
      const showEvent = $.Event(Event.SHOW, element)
      const children = $(element).children('.uts-dropdown')

      $(element).trigger(showEvent)// 当调用show显示方法时，此事件会触发
      if (showEvent.isDefaultPrevented()) {
        return
      }
      children.addClass('uts-page-moveFromTop').removeClass('uts-page-moveToTopFade')
      children.show()
    }
    _close (element = EVENT_KEY) {
      const hideEvent = $.Event(Event.HIDE, element)
      const children = $(element).children('.uts-dropdown')

      $(element).trigger(hideEvent)// 当调用hide显示方法时，此事件会触发
      if (hideEvent.isDefaultPrevented()) {
        return
      }
      children.addClass('uts-page-moveToTopFade').removeClass('uts-page-moveFromTop')
      children.fadeOut()
    }
  }

  return DropDown
})($)
export function dropdown () {
  return new DropDown()
}

/**************
 *说明文档
 *dom元素含有class :uts-dropdown-trigger，或者 data-toggle="dropdown"
 *均会触发该dom元素的第一级子元素含有class=uts-dropdown的元素的隐藏和显示
 *可以在外部监听该元素class=uts-dropdown 的隐藏和显示，并产生回调
 * 例如：$('.uts-dropdown').on('show.uts-dropdown-trigger',function(){console.log('我显示啦')})
 * **********************/
