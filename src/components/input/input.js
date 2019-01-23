import './input.less'
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
  const DATA_KEY = 'input'
  const EVENT_KEY = `.${DATA_KEY}`
  const DATA_API_KEY = '.data-api'
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const ClassName = {
    ACTIVE: 'checked',
    INPUT: 'input',
    FOCUS: 'focus',
    UP: 'uts-input-number-handler-up',
    DOWN: 'uts-input-number-handler-down'
  }

  const Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="input"]',
    DATA_TOGGLE: '[data-toggle="inputs"]',
    INPUT: 'input', // input这个标签
    ACTIVE: '.checked',
    HANDLER: '.uts-input-number-handler'
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
      // let addAriaPressed = true
      const rootElement = $(this._element).closest(
        Selector.DATA_TOGGLE
      )[0]

      if (rootElement) {
        const input = $(this._element).find(Selector.INPUT)[0]
        // const span = $(this._element).find('span')[0]
        const activeElement = $(rootElement).find(Selector.ACTIVE)[0]

        if (input) {
          if (input.type === 'radio') { // 如果是单选
            if ($(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false
            } else {
              $(input).prop('checked', true)
              $(this._element).addClass(ClassName.ACTIVE)
              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE)
                $(activeElement).find('input').prop('checked', false)
              }
            }
          } else if (input.type === 'checkbox') { // 如果是多选
            if ($(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false
              $(this._element).removeClass(ClassName.ACTIVE)
              $(input).prop('checked', false)
            } else {
              $(this._element).addClass(ClassName.ACTIVE)
              $(input).prop('checked', true)
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') ||
              rootElement.hasAttribute('disabled') ||
              $(input).hasClass('disabled') ||
              $(rootElement).hasClass('disabled')) {
              return
            }
            // input.checked = !$(this._element).hasClass(ClassName.ACTIVE)

            $(input).trigger('change')
          }
          input.focus()
          // addAriaPressed = false
        } else {
          const numInput = $(rootElement).find(Selector.INPUT)[0]
          const step = Number($(numInput).attr('step'))
          const max = Number($(numInput).attr('max'))
          const min = Number($(numInput).attr('min'))
          let val = Number($(numInput).val())
          $(numInput).on('input propertychange', function (e) {
            _.debounce(function () {
              if ($(e.target).val() >= max) {
                $(e.target).val(max)
              } else if ($(e.target).val() < min) {
                $(e.target).val(min)
              } else if ($(e.target).val() === '') {
                return false
              }
              $(numInput).trigger('change')
            }, 220)()
          })
          if (isNaN(val)) {
            $(numInput).val(0)
          } else {
            if ($(this._element).hasClass(ClassName.UP)) { // 如果按加号
              if ($(numInput).val() >= max) {
                $(numInput).val(max)
              } else if ($(numInput).val() < min) {
                $(numInput).val(min)
              } else {
                $(numInput).val(val + step)
              }
            } else if ($(this._element).hasClass(ClassName.DOWN)) { // 如果按减号
              if ($(numInput).val() <= min) {
                $(numInput).val(min)
              } else if ($(numInput).val() > max) {
                $(numInput).val(max)
              } else {
                $(numInput).val(val - step)
              }
            }
          }
          $(numInput).trigger('change')
          $(numInput).focus()
        }
      }

      // if (addAriaPressed) {
      //   this._element.setAttribute('aria-pressed',
      //     !$(this._element).hasClass(ClassName.ACTIVE))
      // }

      // if (triggerChangeEvent) {
      //   $(this._element).toggleClass(ClassName.ACTIVE)
      // }
    }

    dispose () { // 销毁元素
      $.removeData(this._element, DATA_KEY)
      this._element = null
    }
    // Static
    static _errorTpl (txt) {
      return `<label  class="input-error" for="curl">${txt}</label>`
    }

    static _validate () {
      const valiType = arguments[0].vali || ''

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
        $(this).parent().addClass('valiPass')
        $(this).parent().removeClass('has-error')
        if ($(this).next('.input-error').length > 0) {
          $(this).next('.input-error').hide()
        }
      } else {
        $(this).parent().addClass('has-error')
        $(this).parent().removeClass('valiPass')
        if ($(this).next('.input-error').length === 0) {
          $(this).after(Input._errorTpl(result))
        } else {
          $(this).next('.input-error').html(result)
          $(this).next('.input-error').show()
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
        input = $(input).closest(`.${Selector.INPUT}`)
      }

      Input._jQueryInterface.call($(input), 'toggle')
    })
    .on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, (event) => {
      const input = $(event.target).closest(Selector.INPUT)[0]
      const textarea = event.target

      if (input) {
        $(input).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type))
        const valiType = $(input).attr('data-vali')
        let val = $(input).val()
        let args = {
          vali: valiType,
          val: val
        }
        if (valiType) {
          let valitdateFn = () => Input._validate.call($(input), args)
          _.debounce(valitdateFn, 440)()
        }
      } else if (event.target.tagName === 'TEXTAREA') {
        $(textarea).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type))
        const valiType = $(textarea).attr('data-vali')
        let val = $(textarea).val()
        let args = {
          vali: valiType,
          val: val
        }
        if (valiType) {
          let valitdateFn = () => Input._validate.call($(textarea), args)
          _.debounce(valitdateFn, 440)()
        }
      }
    })
    .on(Event.INPUT_DATA_API, Selector.DATA_TOGGLE_CARROT, (event) => {
      let input = event.target
      const valiType = $(input).attr('data-vali')
      const maxLen = $(input).attr('maxLength')
      let val = $(input).val()
      let args = {
        vali: valiType,
        val: val
      }
      if (valiType) {
        var valitdateFn = () => Input._validate.call($(input), args)
        _.debounce(valitdateFn, 440)()
      }
      $(input).nextAll('.count').find('span').html(`${val.length}/${maxLen}`)
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
})(window.jQuery)

export default Input
