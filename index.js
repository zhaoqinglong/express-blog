const path = require('path')
const express = require('express')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('./config/config.default')
const routes = require('./app/routes/index')
const pkg = require('./package')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const dbCtx = require('./database/dbCtx')

const app = express()
// 日志
app.use(morgan('dev'))
app.use(require('./config/plugin.morgan')('log'))
// 设置存放模板文件的目录
app.set('views', path.join(__dirname, 'app', 'views'))
// 设置模板引擎为ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'app', 'public')))
// session中间件
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  }
  // store: new MongoStore({
  //   url: config.mongodb
  // })

}))

// flash中间件，用来显示通知
app.use(flash())

// 处理表单及中间件
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// 设置模板全局变量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

// 路由
routes(app)

// 全局错误处理
app.use(function (err, req, res, next) {
  console.log(err)
  req.flash('error', err.message)
  res.redirect('/posts')
})

// 监听端口，启动程序
app.listen(config.server.http.port, () => {
  console.log(`${pkg.name} listening on port ${config.server.http.port}`)
  // 同步数据库
  if (process.env.NODE_ENV === 'production') {
    dbCtx.authenticate().then(() => {
      console.log('已正常连接数据库')
    }).catch(err => {
      console.log('无法连接数据库，故障描述：', err)
    })
  } else if (process.env.NODE_ENV === 'development') {
    dbCtx.sync({ force: false }).then(_ => {
      console.log('已同步更新数据库结构')
    }).catch(err => {
      console.log('无法同步更新数据库结构，故障描述：', err)
    })
  }
})
