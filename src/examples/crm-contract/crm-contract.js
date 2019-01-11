import './crm-contract.less'
import 'common/js/base'

const CrmContract = (function () {
  const VERSION = '1.0.0'

  class CrmContract {
    // Getters
    // constructor ({ total = 0, pending = true, priceGroup = [], priceGroupId = 0 } = {}) {
    //   this.total = total
    //   this.pending = pending
    //   this.priceGroup = priceGroup
    //   this.priceGroupId = priceGroupId
    // }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    init () {
      // const _thi = this
      $('.dropdown-single-sex').dropdown({
        readOnly: true,
        searchable: false,
        choice: function () {
          console.log(this.$select[0].value)
        }
      })
      // $('input[data-toggle="price"]').on('change', (e) => {
      //   var el = e.currentTarget
      //   var newVal = e.currentTarget.value
      //   if (newVal !== '') {
      //     _thi.calcuPrice(el, newVal)
      //   } else {
      //     _thi.calcuPrice(el, 0)
      //   }
      // })
    }
  }
  return CrmContract
})()

var crmcontract = new CrmContract()

$(function () {
  crmcontract.init()
})
