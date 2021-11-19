var Router = require('@ppzp/http-router') // 导入 http-router

var router = new Router() // 实例化一个 http-router 对象，它可以帮我们收集路由

router.setChildren([
  require('./user'),
  require('./order')
])

router.makeSandwich()

module.exports = router