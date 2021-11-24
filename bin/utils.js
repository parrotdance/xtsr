const { join } = require('path')

module.exports = {
  outfile: join(__dirname, '..', '.cache', 'runner.js')
}