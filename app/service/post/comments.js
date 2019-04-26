// const marked = require('marked')
const Comment = require('../../models/Post/Comment')

// contentToHtml只对Comment有效
// Comment.plugin('contentToHtml', {
//   afterFind: function (posts) {
//     return posts.map(function (post) {
//       post.content = marked(post.content)
//       return post
//     })
//   },
//   afterFindOne: function (post) {
//     if (post) {
//       post.content = marked(post.content)
//     }
//     return post
//   }
// })

module.exports = {
  create: function create (comment) {
    return Comment.create(comment).exec()
  },
  getCommentById: function getCommentById (id) {
    return Comment.findOne({ _id: id }).exec()
  },
  delCommentById: function delCommentById (id) {
    return Comment.deleteOne({ _id: id }).exec()
  },
  // 根据文章id删除所有的留言
  delCommentsByPostId: function delCommentsByPostId (postId) {
    return Comment.deleteMany({ postId }).exec()
  },

  // 根据文章id获取所有留言，并按照创建时间升序
  getComments: function getComments (postId) {
    return Comment.find({ postId })
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: 1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // 通过文章id获取该文章下的留言数
  getCommentsCount: function getCommentsCount (postId) {
    return Comment.count({ postId }).exec()
  }

}
