const Post = require('../../models/Post/Post')
const Comment = require('../../models/Post/Comment')

// 创建一条投稿信息
exports.createPost = async (author, title, content) => {
  const post = await Post.create({
    author,
    title,
    content
  })

  return post
}

/**
 * 创建一条评论信息
 */
exports.createComment = async (author, content, postId) => {
  const res = await Comment.create({
    author,
    postId,
    content
  })
  return res
}

// 查询所有的文章
exports.queryAllPost = async () => {
  const posts = await Post.findAll()
  // console.log('users', users);
  return posts
}

// 根据id查询文章信息
exports.getPostById = async (postId) => {
  let res = await Post.findOne({
    where: {
      id: postId
    },
    include: [{
      model: Comment,
      as: 'comment'
    }]
  })
  // 查询该文章的所有评论
  return res
}

// 查询某一个作者的所有文章
exports.getPostByAuthor = async (authorId) => {
  let res = await Post.findAll({
    where: {
      author: authorId
    }
    // include: [{
    //   model: Comment,
    //   as: "comment"
    // }]
  })
  // 查询该文章的所有评论
  return res
}

// 查询所有的评论
exports.queryAllComment = async () => {
  const comments = await Comment.findAll()
  // console.log('users', users);
  return comments
}
