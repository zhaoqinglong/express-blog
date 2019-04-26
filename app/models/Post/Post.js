const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')
const User = require('../membership/User')
// const Comment = require('./Comment');

// 定义数据模型
const Post = dbCtx.define('Posts', {
  // author: {
  //   type: Sequelize.TEXT,
  //   allowNull: false,
  // },
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT
  },
  pv: {
    type: Sequelize.INTEGER
  }
}, {
  tableName: 'blog_post',
  underscored: true,
  // 软删除
  paranoid: true
})

// 一对多，一个用户有多篇文章
User.hasMany(Post, {
  foreignKey: 'author'
})
// 一对多，一篇文章有多个评论
// Post.belongsTo(User, {
//   as: "author"
// });

// Post.sync({
//   force: true
// }).then(() => {
//   // Table created
//   console.log('Table created');
// });
// Post.sync();

module.exports = Post
