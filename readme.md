# http-router
两个功能：路由、AOP  
一个特色：为了保持代码简单，不检查参数

### 路由
web 应用中，“路由”是一个重要的基础功能，即要解决：
> 当服务器收到一条 http 请求，由哪个函数，来处理这条请求  

**http-router** 使用了类似 express 的处理方式：
``` js
router.post('/user', function() {
  // ...
})
```

### AOP
另外，不同的请求，可能需要相同的处理逻辑  
**代码复用**是任何应用面临的重要问题
**http-router** 是这样处理的：
``` js
function 公用函数(ctx, vege) {
  // ...
  vege(ctx) // 执行 vege，就是在执行下面的 handler666 函数
  // ...
}
router.post('/user', 公用函数, function handler666(ctx) {
  // ...
})
```
这看起来像 express，但不同的地方在于，```公用函数```其实是**包裹**了 ```handler666``` 函数  
比如你可以这样：
``` js
function 公用函数(ctx, vege) {
  // vege 之前，先做预处理
  const result = vege(ctx)
  // vege 之后，再做后续处理
}
router.post('/user', 公用函数, function handler666(ctx) {
  // ...
})
```
就像一个[三明治](https://zhuanlan.zhihu.com/p/434197952)  
上面是面包，中间是蔬菜（**vege**table）或肉，下面还是面包  

每一个公用函数都是一个三明治，它里面有一些蔬菜  
而对公用函数“前面的”其他公用函数来说：  
后面的公用函数，就是前面公用函数的“蔬菜”

### 其他
##### 为什么不检查参数
> 有些参数检查是必要的，但这里没有这种参数

多余的检查参数，会使简单的代码变复杂，而复杂不仅是编程，也是任何 * 的最大的敌人  
是的，安全是程序最基本的需求，但参数检查并不能提高安全度，反而可能降低安全度  
因为熵增

##### 不支持路径参数
+ 并不觉得 ```/user/1``` 比 ```/user?id=1``` “优雅”
+ ```/user/:id``` 可能会与 ```/user/xxapi``` 冲突
