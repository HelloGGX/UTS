import './crm-contract.less'
import 'common/js/base'

const CrmContract = (function () {
  const VERSION = '1.0.0'

  class CrmContract {
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
  return CrmContract
})()

var crmcontract = new CrmContract()

$(function () {
  crmcontract.init()
})
