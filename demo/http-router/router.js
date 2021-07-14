module.exports = require('@ppzp/http-router')({
  prePath: '/api',
  preHandlerList: [
    require('./handler/aop/add-util')
  ]
})

require('./handler/user')