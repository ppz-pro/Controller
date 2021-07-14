const http = require('http')
const getHandler = require('./router').getHandler
const { handle404, handle500 } = require('./handler/error')

http.createServer(async function(req, res) {
  const method = req.method
  const url = new URL(req.url, 'http://' + req.headers.host)
  const path = url.pathname
  const ctx = { req, res, url }
  
  const handler = getHandler(method, path)
  if(!handler)
    return handle404(ctx)
  try {
    await handler(ctx)
  } catch(e) {
    handle500(ctx, e)
  }
}).listen(3000, () => {
  console.log('\nhttp server ready!')
})