import './contract-lists.less'
import 'common/js/base'

const ContractLists = (function () {
  const VERSION = '1.0.0'

  class ContractLists {
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
      $('.dropdow-insurance-type').dropdown({
        readOnly: true,
        searchable: false,
        choice: function () {
          console.log(this.$select[0].value)
        }
      })
      $('.dropdow-trav-boundary').dropdown({
        readOnly: true,
        searchable: false,
        choice: function () {
          console.log(this.$select[0].value)
        }
      })
      $('.dropdow-trav-type').dropdown({
        readOnly: true,
        searchable: false,
        choice: function () {
          console.log(this.$select[0].value)
        }
      })
    }
  }
  return ContractLists
})()

var contractlists = new ContractLists()

$(function () {
  contractlists.init()
})
