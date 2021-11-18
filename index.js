var Http = require('http') // 引入 node 内置的 http 模块
var User = require('./user') // 引入 user 模块（自己写的模块，要通过相对路径“导入”）
var Order = require('./order')

var server = Http.createServer(function(req, res) { // 创建一个“服务器”
  // 收到 http 请求时，执行这里的代码
  if (req.url == '/user')
    User.findAll(req, res) // 执行 User 模块的 findAll 函数
  else if (req.url == '/order')
    Order.findAll(req, res)
  else
    res.end('404') // 这只是一个普通的 404 字符串
})

server.listen(8080) // 开启服务器，并监听 8080 端口
console.log('试试访问 http://127.0.0.1:8080/user')
console.log('试试访问 http://127.0.0.1:8080/order')