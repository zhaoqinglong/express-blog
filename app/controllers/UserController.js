const fs = require('fs')
// const path = require('path')
const {
  createUser,
  queryAll
} = require('../service/membership/user')
// const {
//   createPost,
//   queryAllPost
// } = require('../service/post/Process')

exports.createNewUser = (req, res, next) => {
  let {
    name,
    password,
    gender,
    bio,
    avatar
  } = { ...req.fields }
  createUser(name, password, gender, bio, avatar).then(user => {
    res.status(200).json(`{user:${user}}`)
  }).catch(err => {
    res.status(500).json(`{err:${err}}`)
  })
}

// 创建新用户
exports.createNew = (req, res, next) => {
  const {
    name,
    gender,
    bio,
    password,
    repassword,
    avatar
  } = req.body
  // const avatar = req.files.avatar.path.split(path.sep).pop()

  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在 1-10 个字符')
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 m、f 或 x')
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符')
    }
    // if (!req.files.avatar.name) {
    //   throw new Error('缺少头像')
    // }
    // if (password.length < 6) {
    //   throw new Error('密码至少 6 个字符')
    // }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致')
    }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    // fs.unlink(req.files.avatar.path)
    req.flash('error', e.message)
    return res.redirect('/signup')
  }
  // 待写入数据库的用户信息
  let user1 = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  }
  createUser(name, password, gender, bio, avatar).then(user => {
    user1.id = user.id
    req.session.user = user1
    req.flash('success', '注册成功')
    res.redirect('/posts')
    // res.status(200).json(`{user:${user}}`);
  }).catch(err => {
    // 注册失败，异步删除上传的头像
    fs.unlink(req.files.avatar.path)
    // 用户名被占用则跳回注册页，而不是错误页
    if (err.message.match('duplicate key')) {
      req.flash('error', '用户名已被占用')
      return res.redirect('/signup')
    }
    next(err)
    // res.status(500).json(`{err:${err}}`);
  })
}

exports.queryAllUsers = async (req, res, next) => {
  let list = await queryAll()
  res.send(list)
}
