一个 js 框架，两个功能：路由、AOP  
``` bash
npm install @ppzp/controller
```
[皮皮仔宣言](https://github.com/ppz-pro/declaration)

#### Controller
一般来说，Controller(控制器) 经常做“页面”与“数据库”的“中间人”  
比如，有个页面需要展示用户信息:
+ 页面给后台发起请求：“给我用户信息”
+ 在后台的 controller 马上就收到请求
+ 它（controller）会找到对应的代码（handler）来处理
+ 一般，这个“处理”过程，就是从数据库里拿数据
+ 取到数据后，再由 controller 送到页面上

#### 路由
“路由”是 Controller 的一个重要功能，即要解决：
> 当服务器收到一条 http 请求，由哪个函数（handler），来处理这个请求  

**@ppzp/controller** 使用了类似 express 的处理方式：
``` js
controller.post('/user', function() {
  // ...
})
```

#### AOP
不同的请求，可能需要相同的处理逻辑  
**代码复用**是任何应用面临的重要问题  
**@ppzp/controller** 是这样处理的：
``` js
function 公用函数(ctx, vege) {
  // ...
  vege(ctx) // 执行 vege，就是在执行下面的 handler666 函数
  // ...
}
controller.post('/user', 公用函数, function handler666(ctx) {
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
controller.post('/user', 公用函数, function handler666(ctx) {
  // ...
})
```
就像一个[三明治](https://zhuanlan.zhihu.com/p/434197952)  
上面是面包，中间是蔬菜（**vege**table）或肉，下面还是面包  

每一个公用函数都是一个三明治，它里面有一些蔬菜  
而对公用函数“前面的”其他公用函数来说：  
后面的公用函数，就是前面公用函数的“蔬菜”

## 使用
#### 环境准备
仅需要一个普通的 node，最好 10 以上版本
> 如果没有，进入[这个链接](https://nodejs.org/zh-cn/download/)，下载相应版本

创建项目：
``` bash
mkdir test-controller # 创建项目目录
cd test-controller # 进入项目目录
# 到这里，只是一个普通的文件夹

npm init -y # 使用 npm，初始化一个 node 项目
# 到这里，一个空的 node 项目就创建好了

npm install @ppzp/controller # 在项目中安装 resh
```

#### 案例
TODO

#### API
TODO

#### 常见问题
TODO

## 最后
不保留任何版权（也实在没什么好保留的）  
欢迎 pr、意见、批评  