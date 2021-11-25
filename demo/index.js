const Controller = require('@ppzp/controller')

const con = new Controller({
  baseUrl: '/api'
})

// 响应请求：GET /api/test
con.get('/test', function(ctx) {
  ctx.res.end('/api/test')
})

function checkLogin(vege, ctx) {
  if(Math.random() > .5)
    vege(ctx)
  else
    ctx.res.end('not login')
}

const userController = new Controller({
  baseUrl: '/user',
  breads: [
    checkLogin // 凡由此 controller 处理的请求，都执行 checkLogin
  ]
})

// 响应请求：GET /api/user
userController.get(function(ctx) {
  ctx.res.end('/api/user')
})

con.setChildren([
  userController
])
con.makeSandwich()

// ------------ 在 node.js 里使用 ----------------
const Http = require('http')

console.log(con.data)

Http.createServer(function(req, res) {
  const handler = con.getHandler(req.method, req.url)
  if(handler)
    handler({ // { req, res } 即上面的 ctx
      req,
      res
    })
  else
    res.end('404')
}).listen(8080, function() {
  console.log('已启动，打开浏览器试试')
  console.log('http://127.0.0.1:8080/api/test')
  console.log('http://127.0.0.1:8080/api/user')
})