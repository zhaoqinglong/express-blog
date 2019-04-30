const express = require('express')
const router = express.Router()

const {
  queryAllUsers,
  addUser
} = require('../controllers/UserController')

// get /singup 注册页
router.get('/', function (req, res, next) {
  // res.send('注册页')
  res.render('signup')
})

// post /singup 用户注册checkNotLogin
router.post('/', addUser)

// 创建新用户
router.post('/newUser', addUser)
// 查询所有用户
router.get('/queryAllUsers', queryAllUsers)
module.exports = router
