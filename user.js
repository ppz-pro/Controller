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