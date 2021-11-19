## 案例
+ [小试牛刀](https://github.com/ppz-pro/http-router/tree/first-meet)
+ [Router 分级](https://github.com/ppz-pro/http-router/tree/usage)

## 其他
#### 为什么不检查参数
> 有些参数检查是必要的，但这里没有这种参数

多余的检查参数，会使简单的代码变复杂，而复杂不仅是编程，也是任何 * 的最大的敌人  
是的，安全是程序最基本的需求，但参数检查并不能提高安全度，反而可能降低安全度  
因为熵增

添加“常见问题”比参数检查更重要

#### 为什么不支持路径参数
+ 好像 ```/user/1``` 并不比 ```/user?id=1``` “优雅”
+ ```/user/:id``` 可能会与 ```/user/xxapi``` 冲突

## 常见问题
TODO!