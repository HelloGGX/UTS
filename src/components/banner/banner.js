import './banner.less'
import $ from 'jquery'

const Banner = (function ($) {
  class Banner {
    constructor ({ callBack = () => {} } = {}) {
      this.callBack = callBack
    }
    init () {
      console.log('banner')
    }
  }
  return Banner
})($)

export function banner (opt) {
  return new Banner({
    callBack: opt.callBack
  })
}
