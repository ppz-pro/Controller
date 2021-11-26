const Sandwich = require('@ppzp/sandwich')

const METHODS = ['GET', 'POST', 'PUT', 'DELETE'] // 这种形式，以后好扩展，暂时认为这几种够了
const methods = ['get', 'post', 'put', 'delete']

class Controller {
  constructor(options = {}) {
    if(typeof options == 'string')
      options = {
        baseUrl: options
      }
    
    this.baseUrl = options.baseUrl || ''
    this.breads = options.breads || []
    this.__data = {}
    for(const METHOD of METHODS)
      this.__data[METHOD] = {}
  }

  add(method, url, handlers) {
    url = this.baseUrl + url
    if(this.__data[method][url])
      throw Error(`路由重复 ${method} ${url}`)
    else
      this.__data[method][url] = this.breads.concat(handlers)
  }

  makeSandwich() {
    for(const m of METHODS)
      for(const url in this.__data[m])
        this.__data[m][url] = Sandwich(...this.__data[m][url])
  }

  getHandler(method, url) {
    return this.__data[method] && this.__data[method][url]
  }

  // 添加下级 Controller（setChild 好墨迹，不要添加这个函数）
  setChildren(list) {
    for(const METHOD of METHODS)
      for(const child of list)
        for(const url in child.__data[METHOD])
          this.add(METHOD, url, child.__data[METHOD][url])
  }
}

// 给 Controller 添加 get、post、put、delete 方法
for(const i in methods)
  Controller.prototype[methods[i]] = function(...args) {
    args = Array.from(args) // url 和 handlers
    const url = (typeof args[0] == 'string') ? args.shift() : '' // 取出 args 里的 url

    this.add(METHODS[i], url, args)
  }

module.exports = Controller