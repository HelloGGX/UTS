// import * as utils from 'vendor/utils'
import $ from 'jquery'
import './login.less'
import 'components/slider/slider'

let Login = (function ($) {
  // const NAME = 'login'
  const VERSION = '1.0.0'
  // const DATA_KEY = 'uts.login'

  class Login {
    constructor (element) {
      this._element = element
    }
    // Getters
    static get VERSION () {
      return VERSION
    }
    // public
    init () {

    }
    // Static
  }
  return Login
})($)

var login = new Login()

login.init()
