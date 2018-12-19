import './crm-form.less'
import $ from 'jquery'

const CrmForm = (function ($) {
  const VERSION = '1.0.0'

  class CrmForm {
    // Getters
    constructor ({ name = 'form' } = {}) {
      this.getName = () => {
        return this.name
      }
    }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    init () {

    }
  }
  return CrmForm
})($)

var crmform = new CrmForm()

$(function () {
  crmform.init()
})
