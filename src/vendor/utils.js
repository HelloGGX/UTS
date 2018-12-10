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
