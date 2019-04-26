// const marked = require('marked')
const Post = require('../../models/Post/Post')
const CommentModel = require('./comments')

// contentToHtml只对Post有效
// Post.plugin('contentToHtml', {
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

// Post.plugin('addCommentsCount', {
//   afterFind: function (posts) {
//     return Promise.all(posts.map(function (post) {
//       return CommentModel.getCommentsCount(post._id).then(function (commentsCount) {
//         post.commentsCount = commentsCount
//         return post
//       })
//     }))
//   },
//   afterFindOne: function (post) {
//     CommentModel.getCommentsCount(post._id).then(function (commentsCount) {
//       post.commentsCount = commentsCount
//       return post
//     })
//   }
// })

module.exports = {
  create: function create (post) {
    return Post.create(post).exec()
  },
  getPostById: function getPostById (id) {
    return Post
      .findOne({
        _id: id
      })
      .populate({
        path: 'author',
        model: 'User'
      })
      .addCreatedAt()
      // .addCommentsCount()
      .contentToHtml()
      .exec()
  },
  // 按创建时间的倒序获取所有用户文章或者某个特定用户的文章
  getPosts: function getPosts (author) {
    const query = {}
    if (author) {
      query.author = author
    }

    return Post
      .find(query)
      .populate({
        path: 'author',
        model: 'User'
      })
      .sort({
        _id: -1
      })
      .addCreatedAt()
      // .addCommentsCount()
      .contentToHtml()
      .exec()
  },
  // 通过文章id给pv加1
  incPv: function incPv (postId) {
    return Post.update({
      _id: postId
    }, {
      $inc: {
        pv: 1
      }
    }).exec()
  },

  // 通过id获取一篇原生文章
  getRawPostById: function getRawPostById (postId) {
    return Post.findOne({
      _id: postId
    }).populate({
      path: 'author',
      model: 'User'
    }).exec()
  },

  // 通过id更新文章
  updatePostById: function updatePostById (postId, data) {
    return Post.update({
      _id: postId
    }, {
      $set: data
    }).exec()
  },

  // 通过id删除一篇文章
  deletePostById: function deletePostById (postId, author) {
    return Post.deleteOne({
      _id: postId,
      author: author
    })
      .exec()
      .then(function (res) {
        // 删除文章后，删除所有的留言
        if (res.result.ok && res.result.n > 0) {
          return CommentModel.delCommentsByPostId(postId)
        }
      })
  }

}
