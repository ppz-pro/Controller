module.exports = function(ctx, vege) {
  ctx.getData = function() {
    return new Promise( (res, rej) => {
      let result = ''
      ctx.req.on('data', chunk => {
        result += chunk
      })
      ctx.req.on('end', () => {
        try {
          res(JSON.parse(result))
        } catch(e) {
          console.error('解析 json 数据失败')
          console.error(e)
          res()
        }
      })
    })
  }
  ctx.success = function(data) {
    writeJson(data)
  }
  ctx.error = function(errmsg) {
    writeJson({
      success: 0,
      errmsg
    })
  }
  function writeJson(data) {
    ctx.res.end(JSON.stringify(data))
  }
  return vege(ctx)
}