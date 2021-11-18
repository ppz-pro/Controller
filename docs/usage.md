# http-router 的使用
## 环境准备
仅需要一个[普通的 node 环境](https://nodejs.org/zh-cn/download/)，最好 10 以上版本  
创建项目：
``` bash
mkdir http-route-test
cd http-route-test
npm init -y
npm install @ppzp/http-router lodash
```

## 复习一下 node
> 写一个最简单的 web 服务器  
> 如果对 node 的 http 模块很熟悉，可以跳过这部分

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
      tel: '1762xxxx4395'
    }, {
      name: '红仔',
      gender: 0,
      tel: '1762xxxx0000'
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
这样是可以的，但是好像有点繁琐  
比如想要添加一个“创建用户”的接口，却需要修改两个文件：```index.js``` 和 ```user.js```  
代码太散了！