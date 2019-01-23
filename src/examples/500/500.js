
import 'common/js/base'

const Page = (function () {
  const VERSION = '1.0.0'
  class Page {
    // Getters
    constructor ({ type = 500 } = {}) {
      this.type = type
    }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    init () {
      $('body').error({ type: this.type })
    }
  }
  return new Page()
})()

$(function () {
  Page.init()
})
