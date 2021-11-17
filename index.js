const Sandwich = require('@ppzp/sandwich')
const isString = require('lodash/isString')

class Collector {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || ''
    this.breads = options.breads || []
  }

  get() {
    this.__format('GET', arguments)
  }
  post() {
    this.__format('POST', arguments)
  }
  put() {
    this.__format('PUT', arguments)
  }
  delete() {
    this.__format('DELETE', arguments)
  }

  __format(method, args) {
    args = Array.from(args) // url 和 handlers
    const url = isString(args[0]) ? args.shift() : '' // 取出 args 里的 url
    this.add(method, url, args)
  }

  add(method, url, handlers) {
    throw Error('未实现 add 方法')
  }
}

class Controller extends Collector {
  /** @param {HttpRouter} router */
  constructor(router, options) {
    super(options)
    this.router = router
  }

  add(method, url, handlers) {
    this.router.add(method, this.baseUrl + url, this.breads.concat(handlers))
  }
}

class HttpRouter extends Collector {
  data = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  }

  constructor(options = {}) {
    super(options)
  }

  createController(options) {
    return new Controller(this, options)
  }

  add(method, url, handlers) {
    this.data[method][this.baseUrl + url] = Sandwich(...this.breads.concat(handlers))
  }

  getHandler(method, url) {
    return this.data[method] && this.data[method][url]
  }
}

module.exports = HttpRouter