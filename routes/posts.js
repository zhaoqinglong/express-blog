const express = require('express');
const router = express.Router();

const checkLogin = require('../middlewares/check').checkLogin;
const PostModel = require('../models/posts');
const Post = require('../models/Post/post')
const User = require('../models/Membership/User');
const {Task} = require('../models/Post/Task')
const CommentModel = require('../models/comments');
const {
  getPostByAuthor,
  addPost,
  fetchPostById
} = require('../controllers/PostController');

// GET /posts
// router.get('/', function (req, res, next) {
//   const {
//     author
//   } = req.query;

//   PostModel
//     .getPosts(author)
//     .then(function (posts) {
//       res.render('posts', {
//         posts
//       });
//     })
//     .catch(next);
// });
router.get('/', getPostByAuthor);


//post posts/create 发表文章
// router.post('/create', checkLogin, function (req, res, next) {
//   // res.send('发表文章');

//   const {
//     title,
//     content
//   } = req.fields;
//   const author = req.session.user._id;

//   //校验参数
//   try {
//     if (!title.length) {
//       throw new Error('标题为空');
//     }

//     if (!content.length) {
//       throw new Error('内容为空');
//     }

//   } catch (e) {
//     req.flash('error', e.message);
//     return res.redirect('back');
//   }

//   let post = {
//     author,
//     title,
//     content
//   };

//   PostModel.create(post).then(function (result) {
//     post = result.ops[0];
//     req.flash('success', '发表成功');
//     //发表成功后，跳转到该文章页
//     res.redirect(`/posts/${post._id}`);
//   }).catch(next);

// });

//post posts/create 发表文章
router.post('/create', checkLogin, addPost);


//get posts/create 发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.render('create');
});

// include
router.get('/post', (req, res, next) => {
  Post.findAll({
    include: ['author']
  }).then(post => {
    res.send({
      post
    });
  }).catch(err => {
    res.send({
      err
    });
  });
});

// include
router.get('/task', (req, res, next) => {
  Task.findAll({ include: [ User ] }).then(function(tasks) {
    // console.log(JSON.stringify(tasks))
    res.send({
      tasks
    });
  }).catch(err => {
    res.send({
      err
    });
  });
});

//get posts/:postId 文章详情页
// router.get('/:postId', function (req, res, next) {
//   const {
//     postId
//   } = req.params;
//   Promise.all([
//       PostModel.getPostById(postId),
//       CommentModel.getComments(postId),
//       PostModel.incPv(postId),
//     ])
//     .then(function (result) {
//       const post = result[0];
//       const comments = result[1];
//       if (!post) {
//         throw new Error('该文章不存在！');
//       }

//       res.render('post', {
//         post,
//         comments
//       });

//     })
//     .catch(next);
// });

//get posts/:postId 文章详情页
router.get('/:postId', fetchPostById);


//get posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  // res.send('更新文章页');

  const postId = req.params.postId;
  const author = req.session.user._id;

  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在');
      }

      if (author.toString() !== post.author._id.toString()) {
        throw new Error('无权限');
      }

      res.render('edit', {
        post
      });

    })
    .catch(next);

});

//post posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  const postId = req.params.postId;
  const author = req.session.user._id;
  const {
    title,
    content
  } = req.fields;

  try {
    if (!title.length) {
      throw new Error('标题不能为空');
    }
    if (!content.length) {
      throw new Error('内容不能为空');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }

  //判断权限
  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在');
      }

      if (author.toString() !== post.author._id.toString()) {
        throw new Error('无权限');
      }

      //更新文章        
      PostModel.updatePostById(postId, {
          title,
          content
        })
        .then(function () {
          req.flash('success', '编辑成功');
          res.redirect(`/posts/${postId}`);
        })
        .catch(next);
    })
    .catch(next);

});

//get posts/:postId/edit 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  // res.send('删除一篇文章');
  const postId = req.params.postId;
  const author = req.session.user._id;

  //判断权限
  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('文章不存在');
      }

      if (author.toString() !== post.author._id.toString()) {
        throw new Error('无权限');
      }

      //删除文章

      PostModel.deletePostById(postId)
        .then(function () {
          req.flash('success', '删除成功');
          res.redirect('/posts');
        })
        .catch(next);
    })
    .catch(next);

});

module.exports = router;
