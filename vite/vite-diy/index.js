const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const app = new Koa()

app.use(async (ctx) => {
  const {url, query} = ctx.request
  let content
  if (url === '/') {
    ctx.type = 'text/html'
    content = fs.readFileSync('./index.html', 'utf-8')
    content = content.replace(
      `<script `,
      `
      <script>
        window.process = {
          env: {
            NODE_ENV: 'dev'
          }
        }
      </script>
      <script 
    `
    )
  } else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1))
    ctx.type = 'application/javascript'
    content = fs.readFileSync(p, 'utf-8')
    content = rewriteImport(content)
  } else if (url.startsWith('/@modules/')) {
    // 第三方库对应的 ES 入口
    const prefix = path.resolve(
      __dirname,
      'node_modules',
      url.replace('/@modules/', '')
    )
    const module = require(prefix + '/package.json').module
    const p = path.resolve(prefix, module)
    ctx.type = 'application/javascript'
    content = fs.readFileSync(p, 'utf-8')
    content = rewriteImport(content)
  }
  ctx.body = content
})

app.listen(3000, () => {
  console.log('start on 3000')
})

function rewriteImport(content) {
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
    if (s1[0] !== '.' && s1[0] !== '/') {
      return ` from '/@modules/${s1}'`
    } else {
      return s0
    }
  })
}
