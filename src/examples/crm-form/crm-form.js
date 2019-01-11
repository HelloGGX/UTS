import './crm-form.less'
import 'common/js/base'

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
      $('.dd-single').dropdown({
        readOnly: true,
        input: '<input type="text" maxLength="20" placeholder="请输入搜索">',
        choice: function () {
          console.log(arguments, this)
        }
      })
      $('.dropdown-mul').dropdown({
        minCount: 2,
        minCountErrorMessage: 'You need to select at least 2 options!',
        limitCount: 4,
        limitCountErrorMessage: 'You cannot select more than 4 options!',
        searchable: false,
        choice: function () {
          console.log('.dropdown-mul-2 picked')
        }
      })
      $('.dropdown-mul-group').dropdown({
        limitCount: 40,
        multipleMode: 'label',
        choice: function () {
          console.log(arguments, this)
        }
      })
    }
  }
  return CrmForm
})(window.jQuery)

var crmform = new CrmForm()

$(function () {
  crmform.init()
})
