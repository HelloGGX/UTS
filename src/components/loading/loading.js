import './loading.less'

const Loading = (function ($) {
  class Loading {
    constructor ({ callBack = () => { } } = {}) {
      this.callBack = callBack
    }
    init () {
      // 监听加载状态改变
      document.onreadystatechange = this.completeLoading
    }
    completeLoading () {
      // 加载状态为complete时移除loading效果
      if (document.readyState === 'complete') {
        var loadingMask = document.getElementById('loadingDiv')
        loadingMask.parentNode.removeChild(loadingMask)
      }
    }
    loadTpl () {
      return ``
    }
  }
  return Loading
})(window.jQuery)

export function loading (opt) {
  return new Loading({
    callBack: opt.callBack
  })
}
