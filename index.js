module.exports = function({
  prePath = '',
  preHandlerList = [],
  log = console
} = {}) {
  log.debug('实例化 router')
  const route = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  }

  function add(method, ...args) {
    let [path, handlerList] = getParam(args)
    if(!route[method])
      throw Error('不支持的 method: ' + method)
    path = prePath + path
    if(!path)
      throw Error('path 不可为空')
    handlerList = preHandlerList.concat(handlerList)
    if(!handlerList.length)
      throw Error('请至少传入一个 handler')
    
    log.debug('添加路由', { method, path, num: handlerList.length })
    route[method][path] = makeSwch(...handlerList)
  }
  
  function Reaper() {
    log.debug('实例化 router-reaper')
    const [prePath, preHandlerList] = getParam(arguments)
    function rAdd(method, ...args) {
      const [path, handlerList] = getParam(args)
      add(method, prePath + path, ...preHandlerList, ...handlerList)
    }
    return {
      get() {
        return rAdd('GET', ...arguments)
      },
      post() {
        return rAdd('POST', ...arguments)
      },
      put() {
        return rAdd('PUT', ...arguments)
      },
      delete() {
        return rAdd('DELETE', ...arguments)
      }
    }
  }
  
  return {
    add, Reaper,
    getHandler(method, path) {
      return route[method] && route[method][path]
    }
  }
}

// ============================== util
// 制作三明治
function makeSwch(...list) {
  for(let i=0; i<list.length-1; i++) {
    const current = list[i]
    list[i] = function(ctx) {
      return current(ctx, list[i+1]) // 因为闭包，所以此处不需要倒序
    }
  }
  return list[0]
}
// 识别参数
function getParam([ path, ...handlerList ]) {
  return isString(path)
    ? [path, handlerList]
    : ['', arguments[0]]
}
// 判断是否为字符串
function isString(tar) {
  return Object.prototype.toString.call(tar) == '[object String]'
}