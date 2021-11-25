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
    this.data = {}
    for(const METHOD of METHODS)
      this.data[METHOD] = {}
  }

  add(method, url, handlers) {
    url = this.baseUrl + url
    if(this.data[method][url])
      throw Error(`路由重复 ${method} ${url}`)
    else
      this.data[method][url] = this.breads.concat(handlers)
  }

  makeSandwich() {
    for(const m of METHODS)
      for(const url in this.data[m])
        this.data[m][url] = Sandwich(...this.data[m][url])
  }

  getHandler(method, url) {
    return this.data[method] && this.data[method][url]
  }

  /**
   * 添加下级 Controller（setChild 好墨迹，不要添加这个函数）
   * @param {Controller[]} list 
   */
  setChildren = function(list) {
    for(const METHOD of METHODS)
      for(const child of list)
        for(const url in child.data[METHOD])
          this.add(METHOD, url, child.data[METHOD][url])
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