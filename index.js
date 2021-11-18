var Http = require('http') // 引入 node 内置的 http 模块

var server = Http.createServer(function(req, res) { // 创建一个“服务器”
  // 收到 http 请求时，执行这里的代码
  res.end('http-router says "hello, yo"') // 啥也不做，只响应一个字符串
})

server.listen(8080) // 开启服务器，并监听 8080 端口
console.log('试试访问 http://127.0.0.1:8080/')