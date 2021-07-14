# 初始化项目
``` bash
mkdir test-http-router
cd test-http-router
npm init -y
npm install @ppzp/http-router
```

# router.js
``` js
const Router = require('@ppzp/http-router')

module.exports = Router()
```

# hello.js
``` js
const Reaper = require('./router').Reaper

const reaper = Reaper('/hello')

reaper.get(function(ctx) {
  ctx.res.end('get hello')
})

reaper.post(function(ctx) {
  ctx.res.end('post hello')
})
```

# main.js
``` js
const http = require('http')
const router = require('./router')

require('./hello')

http.createServer(function(req, res) {
  const method = req.method
  const url = new URL(req.url, 'http://' + req.headers.host)
  const path = url.pathname

  const handler = router.getHandler(method, path)
  const ctx = { req, res, url }
  if(handler)
    try {
      handler(ctx)
    } catch(e) {
      // 处理 500 异常
    }
  else {
    // 处理 404 异常
  }
}).listen(3000)
```

# 运行
``` bash
node main.js
```