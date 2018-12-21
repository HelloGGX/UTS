import './detail.less'
import 'common/js/base'

const Detail = (function () {
  const VERSION = '1.0.0'

  class Detail {
    // Getters
    // constructor ({ name = 'form' } = {}) {
    //   this.getName = () => {
    //     return this.name
    //   }
    // }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    init () {

    }
  }
  return Detail
})()

var detail = new Detail()

$(function () {
  detail.init()
})
