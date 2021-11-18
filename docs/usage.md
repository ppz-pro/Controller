# http-router 的使用
## 环境准备
仅需要一个[普通的 node 环境](https://nodejs.org/zh-cn/download/)，最好 10 以上版本  
> 如果没有的话，点击[这个链接](https://nodejs.org/zh-cn/download/)，选择你的电脑的对应的 node 版本，下载后，双击安装就可以了

创建项目：
``` bash
mkdir http-route-test # 创建项目目录
cd http-route-test # 进入项目目录
npm init -y # 借助 npm 工具，初始化项目（npm 是随 node 一起安装的工具）
npm install @ppzp/http-router lodash # 给项目里安装 http-router 和 lodash
```

## 复习一下 node
> 目标：写一个最简单的 web 服务器  
> 如果对 node 的 http 模块很熟悉，可以[跳过这部分](#初见-http-router)

#### 基础款
创建一个文件 ```index.js```：
``` js
var Http = require('http') // 引入 node 内置的 http 模块

var server = Http.createServer(function(req, res) { // 创建一个“服务器”
  // 收到 http 请求时，执行这里的代码
  res.end('http-router says "hello, yo"') // 啥也不做，只响应一个字符串
})

server.listen(8080) // 开启服务器，并监听 8080 端口
console.log('试试访问 http://127.0.0.1:8080/')
```
运行：
``` bash
node index.js
```
访问 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)  
这样，一个最基础的 web 服务器程序，就完成了

当然，不管 ```http://127.0.0.1:8080/``` 后面加什么，响应都是一样的  
一个正经的 web 服务器肯定不能这样，而应该**根据不同的 url，执行不同的代码**  
比如，访问 ```http://127.0.0.1:8080/user``` 时，应该响应用户的相关信息  
访问 ```http://127.0.0.1:8080/order``` 时，应该响应订单信息……

#### 升级款
下面打算实现这俩“接口”：

首先是 ```user.js```：
``` js
// node 使用 exports.xxx 的方式“导出”一个函数
exports.findAll = function(req, res) {
  // 假装从数据库里，查询出了所有的用户数据……
  var users = [
    {
      name: 'sixD',
      gender: 1,
      tel: '1564xxxx4395'
    }, {
      name: '红仔',
      gender: 0,
      tel: '1564xxxx0000'
    }
  ]

  var jsonStr = JSON.stringify(users) // 转化为 json 格式
  res.end(jsonStr) // 响应
}

// exports.create = ...
// exports.deleteById = ...
```
其次是类似的 ```order.js```：
``` js
// 提示，“order” 是 sql 关键字（order by），创建“订单表”时，不要使用“order”这个名字

exports.findAll = function(req, res) {
  var orders = [
    {
      username: 'sixD', // 所属用户
      datetime: new Date(),
      price: 996, // 订单金额
      itemSum: 10 // 订单内物品数量
    }, {
      username: 'sixD',
      datetime: new Date(),
      price: 1996, // 1996 与 996 有微妙的关系
      itemSum: 3
    }
  ]

  var jsonStr = JSON.stringify(orders)
  res.end(jsonStr)
}
```
最后，在 ```index.js``` “导入” user 和 order 模块，并使用它俩：
``` js
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
```
运行：
``` bash
node index.js
```

一个像样的 web 服务器就大功告成了！  
但是，虽然挺实用，但……  
别人的服务器，可以按 http 方法（method）和 url 区分不同的请求，如果这里也要加上的话：
``` js
if (req.method == 'GET') {
  if (req.url == 'xxxx')
    // ...
  else if (req.url == 'yyyy')
    // ...
} else if (req.method == 'POST') {
  // if...
}
```
这样是可以的，但是代码看起来有点乱，而且过程好像有点繁琐  
而且随着业务的增长，“乱”与“繁琐”也会加剧  

下面有请主角登场

## 初见 http-router
上面有一句加粗的话：“**根据不同的 url，执行不同的代码**”  
这是 node 上的 web 程序要处理的重要问题  
也是上面的代码（“[复习 node”部分](#复习一下-node)）处理的主要问题，但处理得不太好

http-router 可以帮助我们处理这个问题  
> 这个问题有一个名字：路由问题  
> 一条“对应关系”（某 url 对应某些代码），可以叫做一条“路由”

当需要“用户”相关的接口时：
``` js
var HttpRouter = require('@ppzp/http-router') // 导入 http-router

var router = new HttpRouter() // 实例化一个 http-router 对象，它可以帮我们收集路由

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

// ---- 上面收集好路由，下面启动一个服务器 ---- //

var Http = require('http')

var server = Http.createServer(function(req, res) {
  var handler = router.get(req.method, req.url) // 根据 url 获取对应的函数，来处理请求
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
```

当然，实际的开发过程中，肯定不会把所有代码写在一个文件里，可以这样分：
+ ```index.js```: 启动服务器
+ ```router.js```: 实例化 http-router
+ ```user.js```: user 相关接口 
+ ```order.js```: order 相关接口 

比如 ```user.js``` 大概是这样：
``` js
var router = require('./router')

// 获取用户信息
router.get('/user', function(ctx) {
  // ...
})
// 创建用户信息
router.post('/user', function(ctx) {
  // ...
})
// 更新用户信息
// router.put('/user', ...
// 删除用户信息
// router.delete('/user', ...
```
这样就比较舒服了  
但是，```user.js``` 里写了很多次 ```'/user'```！  
使用 ```Controller``` 优化一下吧

## Controller
[案例地址](https://github.com/ppz-pro/http-router/tree/ad0e65c4ac52ba4fed282925be7cbba119220eac)