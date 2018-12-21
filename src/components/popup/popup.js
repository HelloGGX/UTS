import './popup.less'

const Popup = (function ($) {
  const NAME = 'popup'
  const VERSION = '1.0.0'
  const DATA_KEY = 'uts-popup-trigger'
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  const EVENT_KEY = `.${DATA_KEY}`

  const ClassName = {
    ACTIVE: 'active',
    popup: 'uts-popup-trigger'
  }
  const Event = {
    HIDE: `hide`,
    HIDDEN: `hidden`,
    SHOW: `show`,
    SHOWN: `shown`,
    CLICK: `click`
  }

  const Selector = {
    DATA_TOGGLE: '[data-toggle="popup"]'
  }
  class Popup {
    constructor (element) {
      this._element = element
    }
    static get VERSION () {
      return VERSION
    }

    toggle () {
      const rootElement = $(this._element).closest(
        Selector.DATA_TOGGLE
      )[0]

      var trigger = $(Selector.DATA_TOGGLE)
      var popup = new Popup()
      if (rootElement) {
        var len = trigger.length

        for (let i = 0; i < len; i++) {
          if ($(trigger[i]).is(this._element)) {
            if ($(rootElement).children('.uts-popup').is(':visible')) {
              popup._close($(trigger[i]))
            } else {
              popup._show($(rootElement))
            }
          } else {
            popup._close($(trigger[i]))
          }
        }
      } else {
        popup._close(trigger)
      }
    }
    _show (element = EVENT_KEY) {
      const showEvent = $.Event(Event.SHOW, element)
      const children = $(element).children('.uts-popup')

      $(element).trigger(showEvent)// 当调用show显示方法时，此事件会触发
      if (showEvent.isDefaultPrevented()) {
        return
      }
      children.addClass('uts-page-moveFromTop').removeClass('uts-page-moveToTopFade')
      children.show()
    }
    _close (element = EVENT_KEY) {
      const hideEvent = $.Event(Event.HIDE, element)
      const children = $(element).children('.uts-popup')

      $(element).trigger(hideEvent)// 当调用hide显示方法时，此事件会触发
      if (hideEvent.isDefaultPrevented()) {
        return
      }
      children.addClass('uts-page-moveToTopFade').removeClass('uts-page-moveFromTop')
      children.fadeOut()
    }
    static _jQueryInterface (config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)

        if (!data) {
          data = new Popup(this)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'toggle') {
          data[config]()
        } else if (config === '_close') {
          data[config]()
        }
      })
    }
  }
  $(document)
    .on(Event.CLICK, Selector.DATA_TOGGLE, function (e) {
      e.preventDefault()
      e.stopPropagation()
      let popup = e.target
      if (!$(popup).hasClass(ClassName.popup)) {
        popup = $(popup).closest(Selector.DATA_TOGGLE)
      }
      Popup._jQueryInterface.call($(popup), 'toggle')
    }).on(Event.CLICK, function (e) {
      let target = e.target
      Popup._jQueryInterface.call($(target), 'toggle')
    })

  /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

  $.fn[NAME] = Popup._jQueryInterface
  $.fn[NAME].Constructor = Popup
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Popup._jQueryInterface
  }
  return Popup
})($)

export default Popup

/**************
 *说明文档
 *dom元素含有class :uts-popup-trigger和 data-toggle="popup"
 *均会触发该dom元素的第一级子元素含有class=uts-popup的元素的隐藏和显示
 *可以在外部监听该元素class=uts-popup 的隐藏和显示，并产生回调
 * 例如： $('.uts-popup-trigger').on('show', function () { console.log('我显示啦') })
 * **********************/
