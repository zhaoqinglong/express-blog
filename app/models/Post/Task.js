const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')
const User = require('../membership/User')
const
  Task = dbCtx.define('task', {
    name: Sequelize.STRING
  })

var Tool = dbCtx.define('tool', {
  name: Sequelize.STRING
})

Task.belongsTo(User)
User.hasMany(Task)
User.hasMany(Tool, {
  as: 'Instruments'
})

// dbconnection.sync().then(function () {
//   // this is where we continue ...
// });
module.exports = {
  Task,
  Tool
}
