import './crm-order.less'
import 'common/js/base'

const CrmOrder = (function () {
  const VERSION = '1.0.0'

  class CrmOrder {
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
      $('.dropdown-single-dj').dropdown({
        readOnly: true,
        searchable: false,
        choice: function () {
          console.log(this.$select[0].value)
        }
      })
    }
  }
  return CrmOrder
})()

var crmorder = new CrmOrder()

$(function () {
  crmorder.init()
})
