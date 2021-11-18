var router = require('./router')

var con = router.createController({
  baseUrl: '/user'
})

// 添加一个 “方法（method）为 GET”、“路径（path）为 /user” 的路由
con.get(function(ctx) {
  // ... 从数据库里查询数据
  ctx.res.end('GET /user')
})

// 删除
con.delete(function(ctx) {
  // ...
})
// con.put(function(ctx) { ...
// con.post(function(ctx) { ...

// 添加一个 “方法（method）为 GET”、“路径（path）为 /user/xxxx” 的路由
con.get('/xxxx', function(ctx) {
  ctx.res.end('GET /user/xxxx')
})