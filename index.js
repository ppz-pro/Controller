var Router = require('@ppzp/http-router') // 导入 http-router

var router = new Router() // 实例化一个 http-router 对象，它可以帮我们收集路由

// 添加一个 “方法（method）为 GET”、“路径（path）为 /user” 的路由
router.get('/user', function(ctx) {
  // ... 从数据库里查询数据
  ctx.res.end('在这里响应数据')
})

// 添加一个 “方法为 delete”、“路径为 /user” 的路由（这样的接口，一般用来删除用户）
router.delete('/user', function(ctx) {
  // ... 从数据里里删除数据
  ctx.res.end('删除成功')
})

router.makeSandwich()

// ---- 上面收集好路由，下面启动一个服务器 ---- // 
var Http = require('http')

var server = Http.createServer(function(req, res) {
  var handler = router.getHandler(req.method, req.url)
  if(handler)
    handler({
      // 这个对象就是上面的 ctx 对象
      req: req,
      res: res
    })
  else
    res.end('404')
})
server.listen(8080)
console.log('访问 http://127.0.0.1:8080/user 试试')