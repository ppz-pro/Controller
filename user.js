var Router = require('@ppzp/http-router')

var user = new Router({
  baseUrl: '/user'
})

// 添加一个 “方法（method）为 GET”、“路径（path）为 /user” 的路由
user.get(function(ctx) {
  // ... 从数据库里查询数据
  ctx.res.end('GET /user')
})

// 删除
user.delete(function(ctx) {
  // ...
})
// user.put(function(ctx) { ...
// user.post(function(ctx) { ...

// 添加一个 “方法（method）为 GET”、“路径（path）为 /user/xxxx” 的路由
user.get('/xxxx', function(ctx) {
  ctx.res.end('GET /user/xxxx')
})

module.exports = user