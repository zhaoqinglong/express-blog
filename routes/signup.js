const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');

const UserModel = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

const {
  createNewUser,
  queryAllUsers,
  createNew
} = require('../controllers/UserController');


//get /singup 注册页
router.get('/',  function (req, res, next) {
  // res.send('注册页');
  res.render('signup');
});

//post /singup 用户注册checkNotLogin
router.post('/', createNew);

// 创建新用户
router.post('/newUser', createNewUser);
// 查询所有用户
router.get('/queryAllUsers', queryAllUsers);
module.exports = router;
