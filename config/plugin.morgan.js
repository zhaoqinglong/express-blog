const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const fileStreamRotator = require('file-stream-rotator')
module.exports = (dir) => {
  const pathname = path.join(__dirname, '..', 'log')
  fs.existsSync(pathname) || fs.mkdirSync(pathname)
  return morgan(
    'dev',
    { stream: fileStreamRotator.getStream(
      {
        date_format: 'YYYYMMDD',
        filename: pathname + '/%DATE%.log',
        frequency: 'daily',
        verbose: false
      })
    })
}
