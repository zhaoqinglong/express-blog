const express=require('express');
const router=express.Router();
const checkLogin=require('../middlewares/check').checkLogin;
const CommentModel=require('../models/comments');

//post /comments 添加一条留言
router.post('/',checkLogin,function(req,res,next){
    // res.send('添加留言');
    const author=req.session.user._id;
    const {postId,content}=req.fields;

      // 校验参数
      try {
        if (!content.length) {
          throw new Error('请填写留言内容');
        }
      } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
      }

      const comment={author,postId,content};
      
      CommentModel
      .create(comment)
      .then(function(){
          req.flash('success','留言成功');
          res.redirect('back');
      })
      .catch(next);

});

//get comments/:commentId/remove  删除一条留言
router.get('/:commentId/remove',checkLogin,function(req,res,next){
    // res.send('删除留言');
    const author=req.session.user._id;
    const {commentId}=req.params;

    CommentModel
    .getCommentById(commentId)
    .then(function(comment){
        if(!comment){
            throw new Error('该留言不存在！');
        }            
        if(comment.author.toString()!==author.toString()){
            throw new Error('无权限删除该留言！');
        }
        CommentModel
        .delCommentById(commentId)
        .then(function () {
            req.flash('success', '删除留言成功');
            // 删除成功后跳转到上一页
            res.redirect('back');
          })
        .catch(next);
    })
    .catch(next);

});

module.exports=router;