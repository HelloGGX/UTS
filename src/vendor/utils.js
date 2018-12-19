export function _extends () {
  this._extends = Object.assign ||
        function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i]
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key]
              }
            }
          }
          return target
        }
  return this._extends.apply(this, arguments)
}

// 通过一个方法将现有对象扩展到另外一个对象上
export function augment (receivingClass, givingClass) {
  // 只提供特定的方法
  if (arguments[2]) {
    for (var i = 2, len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]]
    }
  } else {
    for (var methodName in givingClass.prototype) {
      // 确保接受类不包含所处理方法的同名方法
      if (!Object.hasOwnProperty(receivingClass.prototype, methodName)) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName]
      }
    }
  }
}

export function editOpts (Constr) {
  var storedInstance = null
  return function (opts) {
    function getter () { // 获取侧边栏函数实例
      if (storedInstance == null) {
        storedInstance = new Constr()
      }
      return storedInstance
    }
    function setter (opts) {
      var instance = getter()// 获取Sider函数的实例
      var i
      for (i in opts) {
        if (instance.hasOwnProperty(i)) { // 方式跟原型链上的属性冲突
          instance[i] = opts[i]
        }
      }
      return instance
    }
    return setter(opts)
  }
}
export function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
// export function debounce (func, wait, leading, trailing) {
//   var timer; var lastCall = 0; var flag = true
//   return function () {
//     var context = this
//     var args = arguments
//     var now = +new Date()
//     if (now - lastCall < wait) {
//       flag = false
//       lastCall = now
//     } else {
//       flag = true
//     }
//     if (leading && flag) {
//       lastCall = now
//       return func.apply(context, args)
//     }
//     if (trailing) {
//       clearTimeout(timer)
//       timer = setTimeout(function () {
//         flag = true
//         func.apply(context, args)
//       }, wait)
//     }
//   }
// }
var Observer = (function () {
  var _messages = {}
  return {
    // 注册信息接口
    regist (type, fn) {
      if (typeof _messages[type] === 'undefined') {
        _messages[type] = [fn]
      } else {
        _messages[type].push(fn)
      }
    },
    // 发布信息接口
    fire (type, args) {
      if (!_messages[type]) {
        return
      }
      var events = {
        type: type,
        args: args || {}
      }
      var len = _messages[type].length
      for (let i = 0; i < len; i++) {
        _messages[type][i].call(this, events)
      }
    },
    // 移除信息接口
    remove (type, fn) {
      if (_messages[type] instanceof Array) {
        var i = _messages[type].length - 1
        for (; i >= 0; i--) {
          _messages[type][i] === fn && _messages[type].splice(i, 1)
        }
      }
    }
  }
})()
export { Observer }
