const express = require('express')
const router = express.Router()
const checkNotLogin = require('../middlewares/check').checkNotLogin
const UserModel = require('../models/users')

// get /singin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signin')
})

// post /singin 登录页
router.post('/', checkNotLogin, function (req, res, next) {
  const {
    name,
    password
  } = req.fields
  // 校验参数
  try {
    if (!name.length) {
      throw new Error('用户名为空')
    }
    if (!password.length) {
      throw new Error('密码为空')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }
  // 校验用户信息
  UserModel.getUserByName(name).then(function (user) {
    if (!user) {
      req.flash('error', '用户不存在')
      return res.redirect('back')
    }

    // 验证密码是否匹配
    if (password !== user.password) {
      req.flash('error', '密码错误')
      return res.redirect('back')
    }

    req.flash('success', '登录成功')
    // 用户信息写入 session
    delete user.password
    req.session.user = user
    // 跳转到主页
    res.redirect('/posts')
  })
    .catch(next)
})

module.exports = router
