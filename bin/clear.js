const { remove } = require('fs-extra')
const { runnerFilePath } = require('./utils')

remove(runnerFilePath)
