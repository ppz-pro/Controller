var allow = true
module.exports = function(ctx, vege) {
  allow = !allow
  if(allow)
    return vege(ctx)
  else
    ctx.error('没有权限')
}