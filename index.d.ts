type handler = (any) => any
type bread = (handler, any) => any
type breads = Array<bread>
type handlers = Array<bread | handler>

type METHOD = 'GET' | 'POST' | 'DELETE' | 'PUT'

type ControllerContructor = {
  baseUrl: string,
  breads: breads
}

/** @ppzp/controller: 用来处理路由和 AOP */
declare class Controller {
  constructor()
  constructor(options: ControllerContructor)
  constructor(baseUrl: string)
  
  /** 添加一条路由 */
  add(method: METHOD, url: string, handlers: handlers): void

  /** handlers 合成 handler */
  makeSandwich(): void

  /** 根据 method、url 获取相应的 handler */
  getHandler(method: METHOD, url: string): handler

  /** 添加下级 Controller */
  setChildren(list: Array<Controller>): void

  /** 添加一条 GET 路由 */
  get(url: string, ...handlers: handlers): void
  /** 添加一条 GET 路由 */
  get(...handlers: handlers): void

  /** 添加一条 POST 路由 */
  post(url: string, ...handlers: handlers): void
  /** 添加一条 POST 路由 */
  post(...handlers: handlers): void

  /** 添加一条 PUT 路由 */
  put(url: string, ...handlers: handlers): void
  /** 添加一条 PUT 路由 */
  put(...handlers: handlers): void

  /** 添加一条 DELETE 路由 */
  delete(url: string, ...handlers: handlers): void
  /** 添加一条 DELETE 路由 */
  delete(...handlers: handlers): void
}

export = Controller