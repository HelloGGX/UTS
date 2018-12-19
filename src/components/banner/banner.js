import './banner.less'
import $ from 'jquery'
import { debounce, Observer } from 'vendor/utils'
import { dropdown } from 'components/drop-down/drop-down'

const Banner = (function ($) {
  class Banner {
    constructor ({ callBack = () => {} } = {}) {
      this.callBack = callBack
    }
    init () {
      var _thi = this
      Observer.regist('ms', _thi.msWeb)
      Observer.regist('lg', _thi.lgWeb)
      this._setLeft()
      $(window).on('resize', () => {
        debounce(this._setLeft(), 150)
      })
      dropdown().init()
      this.siderTrigger()
    }
    siderTrigger () {
      $('.uts-components-header-trigger').on('click', (e) => {
        this.callBack(e)
      })
    }
    // 根据显示器宽度设置宽度
    _setLeft () {
      var offsetWid = document.body.clientWidth
      offsetWid > 992 ? this.lgWeb() : this.msWeb()
    }
    msWeb () {
      $('.uts-layout-right').css({ 'paddingLeft': '80px' })
    }
    lgWeb () {
      $('.uts-layout-right').css({ 'paddingLeft': '256px' })
    }
  }
  return Banner
})($)

export function banner (opt) {
  return new Banner({
    callBack: opt.callBack
  })
}
