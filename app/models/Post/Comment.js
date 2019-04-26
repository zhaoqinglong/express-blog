const Sequelize = require('sequelize')
const dbContext = require('../../../database/dbCtx')
const User = require('../membership/User')
const Post = require('./Post')

const Comment = dbContext.define('Comments', {
  // author: {
  //   type: Sequelize.TEXT,
  //   allowNull: false,
  // },
  // postId: {
  //   type: Sequelize.TEXT,
  //   allowNull: false,
  // },
  content: {
    type: Sequelize.TEXT
  }
}, {
  tableName: 'comments'
})

// 一对多，一个用户有多条评论
User.hasMany(Comment, {
  foreignKey: 'author'
})
// 一对多，一篇文章有多条评论
Post.hasMany(Comment, {
  // as: "postId",
  foreignKey: 'postId'
})
// Comment.sync();
exports.Comment = Comment
