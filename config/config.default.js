exports.server = {
  http: {
    port: 5001,
    ssl: false
  }
}
exports.sequelize = {
  database: 'mybolg',
  username: 'postgres',
  password: '123456',
  host: '127.0.0.1',
  dialect: 'postgres'
}
exports.session = {
  secret: 'mybolg',
  key: 'mybolg',
  maxAge: 2592000000
}

exports.msSqlServer = {
  database: 'Test',
  username: 'sa',
  password: '123qwe!@#',
  host: '.\\ZSQLSERVER',
  dialect: 'mssql'
}
