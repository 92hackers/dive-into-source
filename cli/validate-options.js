/**
 * Validate Cli Options
 */

const fs = require('fs')
const path = require('path')

function validateCliOptions(cliOptions) {
  if (cliOptions.configDir) {
    const absConfigDir = path.resolve(cliOptions.configDir)
    if (!fs.existsSync(absConfigDir)) {
      console.error(`Error: config dir: "${absConfigDir}" not existed`)
      return 1
    }
  }

  return 0
}

module.exports = validateCliOptions
