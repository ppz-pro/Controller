# http-router
+ 像 express、koa
+ 但只有两个单纯的功能：路由、aop

> 以**简单**为原则  

### 路由
web 框架中，“路由”是一个重要的基础功能，即要解决：
> 当服务器收到一条 http 请求，由哪个函数，来处理这条请求  

对于这个问题，**http-router** 模仿（或抄袭）了 express 的处理方式：
``` js
router.post('/user', function() {
  // ...
})
```

### AOP
另外，不同的请求，可能需要相同的处理逻辑  
因此，如果不处理好**代码复用**，就可能产生很多重复代码  
所以，web 框架中，另一个重要的功能就是要处理：
> 哪些 http 请求，要共用哪些函数  

**http-router** 是这样处理的：
``` js
function 公用函数(ctx, vege) {
  // ...
  vege(ctx) // 调用 vege，就是在调用下面的 handler666 函数，这里你可以对 ctx 进行修改，或者重新造一个 ctx
  // 调用 vege 函数前，可以做一些权限验证，如果验证未通过，则可以不调用 vege 函数，直接响应前端“权限不足”
  // ...
}
router.post('/user', 公用函数, function handler666(ctx) {
  // ...
})
```
尽管这看起来像 express 的 middleware（中间件）  
但其实只是像，用起来很不一样(目的倒是一样)  
这其实是从 [Spring](https://spring.io/) 里学到的东西，应用到 js 里  
不同于 express 的地方在于，```公用函数```其实是包裹了 ```handler666``` 函数，比如你可以这样：
``` js
function 公用函数(ctx, vege) {
  // ...
  const result = vege(ctx)
  // 对 result 处理后，再响应给前端
}
router.post('/user', 公用函数, function handler666(ctx) {
  // ...
})
```
也就是说，```handler666``` 的结果，会返回到 ```公用函数```  
就像一个三明治（或者肉夹馍，但是这种模式的原创作者说像三明治）  
上面是面包，中间是蔬菜（**vege**table）或肉，下面还是面包  

每一个公用函数都是一个三明治，它里面有一片蔬菜  
而对公用函数“前面的”其他公用函数来说：  
后面的公用函数，就是前面公用函数的“蔬菜”

# 使用
你可以看看源码（只有不到 100 行），也可以看看 demo：
+ [hello](https://github.com/ppz-pro/http-router/blob/main/demo/hello.md)
+ aop
+ [数据服务器](https://github.com/ppz-pro/http-router/blob/main/demo/http-router/)