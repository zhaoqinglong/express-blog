const {
  createPost,
  queryAllPost,
  getPostByAuthor,
  getPostById
} = require('../service/post/Process')

/**
 * 创建post
 */
exports.addPost = async (req, res, next) => {
  const {
    title,
    content
  } = req.fields
  const author = req.session.user.id

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('标题为空')
    }

    if (!content.length) {
      throw new Error('内容为空')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }
  createPost(author, title, content).then(post => {
    // res.status(200).json(`{post:${post}}`);
    req.flash('success', '发表成功')
    // 发表成功后，跳转到该文章页
    res.redirect(`/posts/${post.id}`)
  }).catch(err => {
    res.status(500).json(`{err:${err}}`)
  })
}

/**
 * 根据主键id查询文章详细
 */
exports.fetchPostById = async (req, res, next) => {
  const {
    postId
  } = req.params
  getPostById(postId).then(post => {
    // const post = result[0];
    //   const comments = result[1];
    if (!post) {
      throw new Error('该文章不存在！')
    }
    res.render('post', {
      post,
      comments: {}
    })
  }).catch(next)
}

/**
 * 查询某一个用户的所有post
 */
exports.getPostByAuthor = async (req, res, next) => {
  const {
    author
  } = req.query
  // 获取所有
  if (author == undefined || author == null) {
    queryAllPost().then(function (posts) {
      res.render('posts', {
        posts
      })
    })
      .catch(next)
  } else {
    getPostByAuthor(author)
      .then(function (posts) {
        res.render('posts', {
          posts
        })
      })
      .catch(next)
  }
}
