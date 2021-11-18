// 提示，“order” 是 sql 关键字（order by），创建“订单表”时，不要使用“order”这个名字

// node 使用 exports.xxx 的方式“导出”一个函数
exports.findAll = function(req, res) {
  // 假装从数据库里，查询出了所有的订单数据……
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

  var jsonStr = JSON.stringify(orders) // 转化为 json 格式
  res.end(jsonStr) // 响应
}

// exports.create = ...
// exports.deleteById = ...