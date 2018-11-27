import './index.less'
import 'common/css/button.less'
// import * as utils from 'vendor/utils'
import $ from 'jquery'

let Index = (function ($) {
  // const NAME = 'login'
  const VERSION = '1.0.0'
  // const DATA_KEY = 'uts.login'
  class Index {
    // Getters
    static get VERSION () {
      return VERSION
    }
    // public
    init () {
      $('.el-button').on('click', (e) => {
        const url = $(e.currentTarget).data('url')
        this.toUrl.call(undefined, url)
      })
    }
    toUrl () {
      window.location.href = arguments[0] + '.html'
    }
    // Static
  }
  return Index
})($)

var index = new Index()

index.init()
