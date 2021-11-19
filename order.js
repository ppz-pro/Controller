var Router = require('@ppzp/http-router')

var order = new Router({
  baseUrl: '/order'
})

// order.get( ... )
// order.get('/xxxx', ... )
// order.post( ... )
// order.put( ... )
// order.delete( ... )

module.exports = order