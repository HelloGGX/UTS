import './loading.less'

const Loading = (function ($) {
  class Loading {
    constructor ({ callBack = () => { } } = {}) {
      this.callBack = callBack
    }
    init () {
      const tpl = this.loadTpl()
      $('.uts-wrapper-grid-content').append(tpl)
      // 监听加载状态改变
      document.onreadystatechange = () => {
        this.completeLoading()
      }
    }
    completeLoading () {
      // 加载状态为complete时移除loading效果
      if ($('#loadingDiv').length > 0) {
        if (document.readyState === 'complete') {
          var loadingMask = document.getElementById('loadingDiv')
          loadingMask.parentNode.removeChild(loadingMask)
          this.callBack(true)
        }
      }
    }
    loadTpl () {
      return `<div id="loadingDiv" class="loading-container">
    <div class="dialog"><img src="${require('./loading.gif')}"></div>
    </div>`
    }
  }
  return Loading
})(window.jQuery)

export function loading (opt) {
  return new Loading({
    callBack: opt.callBack
  })
}
