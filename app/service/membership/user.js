const User = require('../../models/membership/User')

// 添加用户
exports.createUser = async (name, password, gender, bio, avatar) => {
  const user = await User.create({
    name,
    password,
    gender,
    bio,
    avatar
  })
  return user
}

// 查询所有的用户
exports.queryAll = async () => {
  const users = await User.findAll()
  // console.log('users', users);
  return users
}
