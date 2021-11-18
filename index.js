var Http = require('http')
var router = require('./router')
require('./user')

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