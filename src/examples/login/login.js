// import * as utils from 'vendor/utils'
import $ from 'jquery'
import './login.less'
import 'components/slider/slider'
import vali from 'vendor/validate'
import _ from 'lodash'

let Login = (function ($) {
  // const NAME = 'login'
  const VERSION = '1.0.0'
  // const DATA_KEY = 'uts.login'

  class Login {
    constructor ({ userInfo = {} } = {}) {
      this.userInfo = userInfo
    }
    // Getters
    static get VERSION () {
      return VERSION
    }
    // public
    init () {
      this.inputListener()
      $('.btn-submit').on('click', () => {
        this.submit()
      })
    }
    inputListener () { // 输入监听验证
      var input = $('.input__field')
      var _thi = this

      Object.defineProperty(this.userInfo, 'info', {
        get: function () {
          return this.userInfo['info']
        },
        set: function (v) {
          _.debounce(function () {
            _thi.validate(v.type, v.val)
          }, 400)()
        }
      })
      input.keyup((e) => {
        this.userInfo['info'] = { val: e.currentTarget.value, type: e.currentTarget }
        if (e.currentTarget.value.length > 0) {
          $(e.currentTarget).next().addClass('word--active')
        } else {
          $(e.currentTarget).next().removeClass('word--active')
        }
      })
    }
    validate (type, val) { // 验证
      if ($(type).attr('id') === 'username') {
        if (vali.name().test(val)) {
          $(type).parent().addClass('pass')
          $(type).parent().removeClass('error')
          return true
        } else {
          $(type).parent().addClass('error')
          $(type).parent().removeClass('pass')
          return false
        }
      }
      if ($(type).attr('id') === 'pwd') {
        if (vali.password().test(val)) {
          $(type).parent().addClass('pass')
          $(type).parent().removeClass('error')
          return true
        } else {
          $(type).parent().addClass('error')
          $(type).parent().removeClass('pass')
          return false
        }
      }
      if ($(type).attr('id') === 'code') {
        if (vali.captcha().test(val)) {
          $(type).parent().addClass('pass')
          $(type).parent().removeClass('error')
          return true
        } else {
          $(type).parent().addClass('error')
          $(type).parent().removeClass('pass')
          return false
        }
      }
    }
    submit () {
      var _thi = this
      var input = $('.input__field')
      _.debounce(function () {
        for (let i = 0; i < input.length; i++) {
          var result = _thi.validate(input[i], $(input[i]).val())
        }
        if (result) {
          alert('登录成功')
        }
      }, 900)()
    }

    // Static
  }
  return Login
})($)

var login = new Login()

login.init()
