// import * as utils from 'vendor/utils'
import $ from 'jquery'

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
      $('body').css('backgroundColor', 'red')
    }
    // Static
  }
  return Login
})($)

var login = new Login()

login.init()
