import $ from 'jquery'
const Alert = (($) => {
  /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

  const NAME = 'alert'
  const VERSION = '4.0.0'
  const DATA_KEY = 'bs.alert'
  // const EVENT_KEY = `.${DATA_KEY}`
  // const DATA_API_KEY = '.data-api'
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  //   const Selector = {
  //     DISMISS: '[data-dismiss="alert"]'
  //   }

  //   const Event = {
  //     CLOSE: `close${EVENT_KEY}`,
  //     CLOSED: `closed${EVENT_KEY}`,
  //     CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
  //   }

  /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  class Alert {
    constructor (element) {
      this._element = element
    }

    // Getters

    static get VERSION () {
      return VERSION
    }
    // Public

    // Private
    _foo () {
      console.log(this)
    }
    // Static
    static _jQueryInterface (config) {
      return this.each(function () {
        const $element = $(this)
        let data = $element.data(DATA_KEY)
        if (!data) {
          data = new Alert(this)
          // 一个元素对应一个Alert实例对象，插件的功能，全部在Alert对象中
          $element.data(DATA_KEY, data)
        }

        if (config === 'close') {
          data[config](this)
        }
      })
    }
  }

  /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

  //   $(document).on(
  //     Event.CLICK_DATA_API,
  //     Selector.DISMISS,
  //     Alert._handleDismiss(new Alert())
  //   )

  /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

  $.fn[NAME] = Alert._jQueryInterface
  $.fn[NAME].Constructor = Alert
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Alert._jQueryInterface
  }

  return Alert
})($)

export default Alert
