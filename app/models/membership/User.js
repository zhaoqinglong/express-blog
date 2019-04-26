const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

// 定义数据模型
const User = dbCtx.define('User', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  gender: {
    type: Sequelize.TEXT
  },
  bio: {
    type: Sequelize.TEXT
  },
  avatar: {
    type: Sequelize.TEXT
  }
}, {
  tableName: 'sys_user',
  underscored: true,
  // 软删除
  paranoid: true
})
// User.sync({
//   force: true
// }).then(() => {
//   // Table created
//   console.log('Table created');
// });

module.exports = User
