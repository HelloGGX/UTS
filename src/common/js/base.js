
import 'common/css/index.less'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Input from 'components/input/input'
import Popup from 'components/popup/popup'
import Dropdown from 'components/dropdown/dropdown'
import Canlendar from 'components/canlendar/canlendar'
import { loading } from 'components/loading/loading'

import _ from 'lodash'

const Base = (function ($) {
  const VERSION = '1.0.0'

  class Base {
    // Getters
    constructor ({ total = 0, pending = true, priceGroup = [], priceGroupId = 0 } = {}) {
      this.total = total
      this.pending = pending
      this.priceGroup = priceGroup
      this.priceGroupId = priceGroupId
    }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    init () {
      let _thi = this
      $('input[data-toggle="price"]').on('change', (e) => {
        var el = e.currentTarget
        var newVal = e.currentTarget.value
        if (newVal !== '') {
          _thi.calcuPrice(el, newVal)
        } else {
          _thi.calcuPrice(el, 0)
        }
      })
    }
    calcuPrice (el, newVal) { // 计算合同总价格
      let index = $(el).index('input[data-toggle="price"]')
      let inputVal = 0
      let groupTotal = 0
      let arr = []
      const len = $('input[data-toggle="price"]').length
      let groupId = (function findGroupId () {
        let id = 0
        for (let i = 0; i < len; i++) {
          arr.push(i)
        }
        arr = _.chunk(arr, 2)
        for (let m = 0; m < arr.length; m++) {
          for (let n = 0; n < 2; n++) {
            if (arr[m][n] === index) {
              id = m
            }
          }
        }
        return id
      })()
      if (index % 2 === 0) { // 如果是偶数
        let wrapper = $('input[data-toggle="price"]')[index + 1]
        inputVal = $(wrapper).val() === '' ? 0 : Number($(wrapper).val())
      } else {
        let wrapper = $('input[data-toggle="price"]')[index - 1]
        inputVal = $(wrapper).val() === '' ? 0 : Number($(wrapper).val())
      }
      groupTotal = Number(newVal) * inputVal // 填写的完整一组的总价格

      if (groupTotal > 0 && this.pending) { // 获取并保留第一次完整填写一组的值
        this.total = groupTotal
        this.pending = false

        let group = {
          id: groupId,
          price: groupTotal
        }
        this.priceGroup.push(group)
        return false
      }
      let i = _.findIndex(this.priceGroup, function (o) { return o.id === groupId })
      if (i >= 0) { // 如果修改的是已经填写的
        let oldVal = this.priceGroup[i].price
        this.total = this.total - oldVal + groupTotal
        this.priceGroup[i].price = groupTotal
      } else if (groupTotal > 0) { // 如果是新添加的
        let group = {
          id: groupId,
          price: groupTotal
        }
        this.priceGroup.push(group)
        this.total = this.total + groupTotal
      }
      $('#total').find('span').html(this.total)
    }
  }
  return Base
})(window.jQuery)

var base = new Base()

$(function () {
  base.init()
})

export default {
  Input,
  Popup,
  Dropdown,
  Canlendar,
  loading
}
// var deviceWidth
// setHtmlFontSize()

// if (window.addEventListener) {
//   window.addEventListener('resize', function () {
//     setHtmlFontSize()
//   }, false)
// }
// function setHtmlFontSize () {
//   // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
//   deviceWidth = document.documentElement.clientWidth > 1920 ? 1920 : document.documentElement.clientWidth
//   document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 19.2 + 'px !important'
// }

// var winWidth = document.documentElement.offsetWidth ||
//   document.body.offsetWidth
// winWidth = winWidth < 1366 ? 1366 : winWidth
// var oHtml = document.getElementsByTagName('html')[0]
// oHtml.style.fontSize = 100 * winWidth / 1920 + 'px'

// if (window.addEventListener) {
//   window.addEventListener('resize', function () {
//     var winWidth = document.documentElement.offsetWidth || document.body.offsetWidth
//     winWidth = winWidth < 1400 ? 1400 : winWidth
//     var oHtml = document.getElementsByTagName('html')[0]
//     oHtml.style.fontSize = 100 * winWidth / 1920 + 'px'
//   }, false)
// }
