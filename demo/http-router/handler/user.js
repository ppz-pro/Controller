const router = require('../router')
const randomAC = require('./aop/random-ac')

const reaper = router.Reaper('/user')

reaper.get(function(ctx) {
  ctx.res.end('就当这个字符串是用户数据吧')
})

reaper.post(randomAC, async function(ctx) {  
  const data = await ctx.getData()
  if(data) {
    // await ... 插入数据操作
    ctx.success({
      success: 1
    })
  } else {
    ctx.error('传入数据为空，或格式不正确')
  }
})