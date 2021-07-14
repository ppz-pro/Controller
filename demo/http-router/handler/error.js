exports.handle404 = function({ req, res, url }) {
  console.error(`未找到 ${req.method} ${url.pathname} 对应的 handler`)
  res.end('未找到资源')
}

exports.handle500 = function({ res }, e) {
  console.error(e)
  res.end('未知错误')
}