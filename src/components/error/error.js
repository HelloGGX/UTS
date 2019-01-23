import './error.less'

const Error = (($) => {
  const NAME = 'error'
  const VERSION = '1.0.0'
  const DATA_KEY = 'uts.error'
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  const DATA = new WeakMap()

  const Default = {
    type: 404,
    data: {
      404: {
        type: 404,
        imgscr: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
        txt: '抱歉，你访问的页面不存在'
      },
      403: {
        type: 403,
        imgscr: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
        txt: '抱歉，你无权访问该页面'
      },
      500: {
        type: 500,
        imgscr: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
        txt: '抱歉，服务器出错了'
      }
    }
  }
  class Base {
    // Getters
    constructor ({ type = 404 } = {}) {
      this.type = type
      DATA.set(this, Default.data)
    }
    // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
    static get VERSION () {
      return VERSION
    }
    static get Default () {
      return Default
    }
    _get (key) {
      let s = DATA.get(this)
      return this._has(key) ? s[key] : undefined
    }
    _set (key, value) {
      let s = DATA.get(this)
      if (!this._has(key)) {
        s[key] = value
      }
    }
    _has (key) {
      let s = DATA.get(this)
      return key in s
    }
    _tpls ({ type, imgscr, txt }) {
      return `<div class="container-fluid">
    <div class="uts-components-exception-exception">
        <div class="uts-components-exception-imgBlock">
            <div class="uts-components-exception-imgEle" style="background-image: url(&quot;${imgscr}&quot;);"></div>
        </div>
        <div class="uts-components-exception-content">
            <h1>${type}</h1>
            <div class="uts-components-exception-desc">${txt}</div>
            <div class="uts-components-exception-actions"><a href="/"><button type="button" class="el-button el-button--primary"><span>返回首页</span></button></a></div>
        </div>
    </div>
</div>`
    }
  }
  class Error extends Base {
    constructor ({ element = null, type = 404 } = {}) {
      super()
      this.element = element
      this.type = type
    }
    static _jQueryInterface (config) {
      return this.each(function (index, el) {
        let data = $(this).data(DATA_KEY)
        if (typeof config === 'object') {
          const cfg = $.extend(true, { element: this }, config)
          if (!data) {
            data = new Error(cfg)
            $(this).data(DATA_KEY, data)
            data.init()
          }
        }
      })
    }
    init () {
      const newTpls = this._tpls(this._get(this.type))
      $(this.element).html(newTpls)
    }
  }
  /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

  $.fn[NAME] = Error._jQueryInterface
  $.fn[NAME].Constructor = Error
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Error._jQueryInterface
  }

  return Error
})(window.jQuery)

export default Error
