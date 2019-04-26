module.exports = {
  port: 5001,
  session: {
    secret: 'mybolg',
    key: 'mybolg',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}
