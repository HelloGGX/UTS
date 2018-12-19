import './input.less'
import $ from 'jquery'
import { InputStrategy } from 'vendor/validate'
import _ from 'lodash'
const Input = (($) => {
  /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

  const NAME = 'input'
  const VERSION = '4.0.0'
  const DATA_KEY = '.uts-input'
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const ClassName = {
    ACTIVE: 'active',
    INPUT: 'uts-input',
    FOCUS: 'focus'
  }

  const Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="input"]',
    DATA_TOGGLE: '[data-toggle="inputs"]',
    INPUT: '.uts-input',
    ACTIVE: '.active'
  }

  const Event = {
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
    FOCUS_BLUR_DATA_API: `focus${EVENT_KEY}${DATA_API_KEY} ` +
            `blur${EVENT_KEY}${DATA_API_KEY}`,
    INPUT_DATA_API: `${NAME} propertychange`
  }

  /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  class Input {
    constructor (element) {
      this._element = element
    }

    // Getters

    static get VERSION () {
      return VERSION
    }

    // Public
    toggle () {
      let triggerChangeEvent = true
      let addAriaPressed = true
      const rootElement = $(this._element).closest(
        Selector.DATA_TOGGLE
      )[0]

      if (rootElement) {
        const input = $(this._element).find(Selector.INPUT)[0]
        if (input) {
          if (input.type === 'radio') { // 如果是单选
            if (input.checked &&
                $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false
            } else {
              const activeElement = $(rootElement).find(Selector.ACTIVE)[0]

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE)
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') ||
                          rootElement.hasAttribute('disabled') ||
                          input.classList.contains('disabled') ||
                          rootElement.classList.contains('disabled')) {
              return
            }
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE)
            $(input).trigger('change')
          }

          input.focus()
          addAriaPressed = false
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed',
          !$(this._element).hasClass(ClassName.ACTIVE))
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE)
      }
    }

    dispose () {
      $.removeData(this._element, DATA_KEY)
      this._element = null
    }
    // Static
    static _errorTpl (txt) {
      return `<label  class="input-error" for="curl">${txt}</label>`
    }
    static _validate () {
      const valiType = arguments[0].vali

      const typeArr = valiType.split(',')
      let result = ''
      let txt = ''
      let val = arguments[0].val

      for (let j = 0, len = typeArr.length; j < len; j++) {
        if (typeArr[j] === 'notnull') {
          result = InputStrategy.check(typeArr[j], val)
        } else {
          txt = InputStrategy.check(typeArr[j], val)
        }
      }
      if (result.length === 0) {
        result = txt
      }
      if (result.length === 0) { // 验证通过
        $(this).addClass('valiPass')
        $(this).removeClass('valiError')
        if ($(this).next().length > 0) {
          $(this).next().hide()
        }
      } else {
        $(this).addClass('valiError')
        $(this).removeClass('valiPass')
        if ($(this).next().length === 0) {
          $(this).after(Input._errorTpl(result))
        } else {
          $(this).next().html(result)
          $(this).next().show()
        }
      }
    }
    static _jQueryInterface (config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)

        if (!data) {
          data = new Input(this)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'toggle') {
          data[config]()
        }
      })
    }
  }

  /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

  $(document)
    .on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, (event) => {
      event.preventDefault()
      let input = event.target
      if (!$(input).hasClass(ClassName.INPUT)) {
        input = $(input).closest(Selector.INPUT)
      }

      Input._jQueryInterface.call($(input), 'toggle')
    })
    .on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, (event) => {
      const input = $(event.target).closest(Selector.INPUT)[0]
      $(input).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type))
      const valiType = $(input).attr('data-vali')
      let val = $(input).val()
      let args = {
        vali: valiType,
        val: val
      }
      var valitdateFn = () => Input._validate.call($(input), args)
      _.debounce(valitdateFn, 220)()
    })
    .on(Event.INPUT_DATA_API, Selector.INPUT, (event) => {
      let input = event.target
      const valiType = $(input).attr('data-vali')
      let val = $(input).val()
      let args = {
        vali: valiType,
        val: val
      }
      var valitdateFn = () => Input._validate.call($(input), args)

      _.debounce(valitdateFn, 800)()
    })

  /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

  $.fn[NAME] = Input._jQueryInterface
  $.fn[NAME].Constructor = Input
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Input._jQueryInterface
  }

  return Input
})($)

export default Input
