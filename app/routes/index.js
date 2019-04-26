// const path=require('path');
// const express=require('express');
// const session=require('express-session');
// const MongoStore=require('connect-mongo')(session);
// const flash=require('connect-flash');
// const config=require('config-lite')(__dirname);
// const routes=require('./routes');
// const pkg=require('./package');

// const app=express();

module.exports = function (app) {
  // app.get('/', function (req, res) {
  //     res.redirect('/posts');
  //   });
  app.use('/signup', require('./signup'))
  //   app.use('/signin', require('./signin'));
  //   app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'))
  //   app.use('/comments', require('./comments'));

  // 404
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}
